import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, BookOpen, Eye } from "lucide-react";
import { toast } from "sonner";

const DRAFT_KEY = "book_draft";

export default function BookForm({ initialData, mode = "add", onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    type: "recommended", // Added type to match public tab filtering
    purchaseUrl: "",
    coverImage: "",
    genre: "",
    tags: "",
    status: "published",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  /* ---------- Load draft (ADD mode only) ---------- */
  useEffect(() => {
    if (mode === "add") {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        setForm(JSON.parse(draft));
      }
    }
  }, [mode]);

  /* ---------- Load edit data ---------- */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        title: initialData.title || "",
        author: initialData.author || "",
        description: initialData.description || "",
        price: initialData.price ?? "",
        type: initialData.type || "recommended",
        purchaseUrl: initialData.buyUrl || initialData.purchaseUrl || "",
        coverImage: initialData.coverImage || "",
        genre: initialData.genre || "",
        tags: initialData.tags ? initialData.tags.join(", ") : "",
        status: initialData.status || "published",
        featured: initialData.featured || false,
      });
    }
  }, [initialData, mode]);

  /* ---------- Autosave draft (ADD mode only) ---------- */
  useEffect(() => {
    if (mode === "add") {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    }
  }, [form, mode]);

  /* ---------- Submit handler ---------- */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!form.title || !form.author || !form.description) {
      toast.error("Please complete all required (*) fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: form.title,
        author: form.author,
        description: form.description,
        price: form.price !== "" ? Number(form.price) : 0,
        type: form.type, // Explicitly pass type to database
        genre: form.genre,
        buyUrl: form.purchaseUrl,
        coverImage: form.coverImage,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        status: form.status,
        featured: form.featured,
      };

      await onSubmit(payload);

      toast.success(
        mode === "edit"
          ? "Book updated successfully ✨"
          : "Book published successfully ✨",
      );

      if (mode === "add") {
        setForm({
          title: "",
          author: "",
          description: "",
          price: "",
          type: "recommended",
          purchaseUrl: "",
          coverImage: "",
          genre: "",
          tags: "",
          status: "published",
          featured: false,
        });

        localStorage.removeItem(DRAFT_KEY);
      }
    } catch (err) {
      toast.error("Failed to save book");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {loading && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              {mode === "edit" ? "Edit Book" : "Add New Book"}
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your published poetry books and store details
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            {preview ? "Edit" : "Preview"}
          </Button>
        </div>

        <Card className="rounded-3xl border bg-white shadow-lg">
          <CardContent className="p-10">
            {preview ? (
              <div className="space-y-6">
                {form.coverImage && (
                  <img
                    src={form.coverImage}
                    alt={form.title || "Book Cover"}
                    className="rounded-2xl max-h-80 mx-auto object-cover shadow-md"
                  />
                )}

                <h2 className="text-2xl font-serif">
                  {form.title || "Untitled Book"}
                </h2>

                <p className="text-sm text-muted-foreground">
                  By {form.author || "Unknown"}
                </p>

                {form.genre && (
                  <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                    {form.genre}
                  </span>
                )}

                <p className="whitespace-pre-line leading-relaxed text-slate-700">
                  {form.description || "No description available..."}
                </p>

                {form.price && (
                  <p className="text-lg font-semibold text-slate-900">
                    Price: ₹{form.price}
                  </p>
                )}

                {form.purchaseUrl && (
                  <a
                    href={form.purchaseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline block"
                  >
                    Buy Link: {form.purchaseUrl}
                  </a>
                )}

                {form.tags && (
                  <p className="text-sm text-muted-foreground">
                    Tags: {form.tags}
                  </p>
                )}

                {form.status === "draft" && (
                  <p className="text-xs text-amber-600 font-medium">
                    Draft (not published)
                  </p>
                )}

                {form.featured && (
                  <p className="text-xs text-emerald-600 font-medium">
                    ⭐ Featured Book
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    placeholder="Enter book title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Author *</label>
                  <Input
                    placeholder="Author name"
                    value={form.author}
                    onChange={(e) =>
                      setForm({ ...form, author: e.target.value })
                    }
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description *</label>
                  <textarea
                    rows={6}
                    className="w-full rounded-2xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                    placeholder="Write a synopsis or overview of the book..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>

                {/* Library Tab Section & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Tab</label>
                    <select
                      value={form.type}
                      onChange={(e) =>
                        setForm({ ...form, type: e.target.value })
                      }
                      className="w-full rounded-2xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="recommended">Top Recommendations</option>
                      <option value="reading-list">Reading Wishlist</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price (₹)</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 499"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Genre */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Genre</label>
                  <Input
                    placeholder="Poetry, Anthology, Romance..."
                    value={form.genre}
                    onChange={(e) =>
                      setForm({ ...form, genre: e.target.value })
                    }
                  />
                </div>

                {/* Purchase URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Purchase / Store Link
                  </label>
                  <Input
                    placeholder="https://amazon.com/..."
                    value={form.purchaseUrl}
                    onChange={(e) =>
                      setForm({ ...form, purchaseUrl: e.target.value })
                    }
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cover Image URL</label>
                  <Input
                    placeholder="https://..."
                    value={form.coverImage}
                    onChange={(e) =>
                      setForm({ ...form, coverImage: e.target.value })
                    }
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <Input
                    placeholder="Comma separated tags (e.g. bestseller, paperback)"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full rounded-2xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="published">Publish</option>
                    <option value="draft">Save Draft</option>
                  </select>
                </div>

                {/* Publishing Options */}
                <div className="border-t pt-6 space-y-4">
                  <p className="text-sm font-medium text-slate-700">
                    Publishing Options
                  </p>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm({ ...form, featured: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      ⭐ Featured Book
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || !form.description || !form.title}
                  className="w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-md cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      {mode === "edit" ? "Update Book" : "Publish Book"}
                      <BookOpen className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
