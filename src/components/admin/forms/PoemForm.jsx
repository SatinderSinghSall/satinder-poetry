import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { Loader2, PenLine, Eye } from "lucide-react";
import { toast } from "sonner";

const DRAFT_KEY = "poem_draft";

export default function PoemForm({ initialData, mode = "add", onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
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
        content: initialData.content || "",
      });
    }
  }, [initialData, mode]);

  /* ---------- Autosave draft (ADD mode only) ---------- */
  useEffect(() => {
    if (mode === "add") {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    }
  }, [form, mode]);

  /* ---------- Keyboard shortcut ---------- */
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        handleSubmit(e);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [form]);

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.content) {
      toast.error("Please complete all fields");
      return;
    }

    setLoading(true);

    try {
      await onSubmit(form);

      toast.success(
        mode === "edit"
          ? "Poem updated successfully ✨"
          : "Poem published successfully ✨",
      );

      if (mode === "add") {
        setForm({ title: "", author: "", content: "" });
        localStorage.removeItem(DRAFT_KEY);
      }
    } catch (err) {
      toast.error("Failed to save poem");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Full screen loader */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              <PenLine className="w-6 h-6" />
              {mode === "edit" ? "Edit Poem" : "Add New Poem"}
            </h1>
            <p className="text-muted-foreground text-sm">
              Write, preview, and publish poetry
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {preview ? "Edit" : "Preview"}
          </Button>
        </div>

        {/* Card */}
        <Card className="rounded-3xl border bg-white shadow-lg">
          <CardContent className="p-10">
            {preview ? (
              /* ---------- PREVIEW MODE ---------- */
              <div className="space-y-6">
                <h2 className="text-2xl font-serif">
                  {form.title || "Untitled"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  — {form.author || "Unknown"}
                </p>
                <p className="whitespace-pre-line leading-relaxed text-slate-700">
                  {form.content || "No content yet…"}
                </p>
              </div>
            ) : (
              /* ---------- EDIT MODE ---------- */
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Enter poem title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Author</label>
                  <Input
                    placeholder="Author name"
                    value={form.author}
                    onChange={(e) =>
                      setForm({ ...form, author: e.target.value })
                    }
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Content</label>
                    <span className="text-xs text-muted-foreground">
                      {wordCount} words
                    </span>
                  </div>

                  <textarea
                    rows={10}
                    className="
                      w-full rounded-2xl border
                      bg-muted/30 px-4 py-3 text-sm
                      focus:outline-none focus:ring-2 focus:ring-slate-900
                      resize-none
                    "
                    placeholder="Write your poem here..."
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                  />
                </div>

                {/* CTA */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || !form.content}
                  className="w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      {mode === "edit" ? "Update Poem" : "Publish Poem"}
                      <PenLine className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Tip: Press Ctrl / Cmd + Enter to save
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
