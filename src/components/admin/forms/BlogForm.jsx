import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileText, Eye, AlertCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const DRAFT_KEY = "blog_draft";

export default function BlogForm({ initialData, mode = "add", onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: "",
    status: "published",
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // State to handle individual field-level validation errors
  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    content: "",
  });

  /* ---------- Helper to update form and clear field-specific errors ---------- */
  const updateFormField = (field, value) => {
    if (errorMessage) setErrorMessage("");
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /* ---------- Load draft (ADD mode only) ---------- */
  useEffect(() => {
    if (mode === "add") {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        try {
          setForm(JSON.parse(draft));
        } catch (e) {
          console.error("Failed to parse draft", e);
        }
      }
    }
  }, [mode]);

  /* ---------- Load edit data ---------- */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        title: initialData.title || "",
        excerpt: initialData.excerpt || "",
        content: initialData.content || "",
        coverImage: initialData.coverImage || "",
        tags: initialData.tags ? initialData.tags.join(", ") : "",
        status: initialData.status || "published",
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
  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      setErrorMessage("");

      // Field-level frontend validation
      const newFieldErrors = { title: "", content: "" };
      let hasError = false;

      if (!form.title?.trim()) {
        newFieldErrors.title = "Blog title is required.";
        hasError = true;
      }
      if (!form.content?.trim()) {
        newFieldErrors.content = "Blog content is required.";
        hasError = true;
      }

      if (hasError) {
        setFieldErrors(newFieldErrors);
        const validationErrorMsg = "Please complete all required fields.";
        setErrorMessage(validationErrorMsg);
        toast.error(validationErrorMsg);
        return;
      }

      setLoading(true);

      try {
        const payload = {
          title: form.title.trim(),
          excerpt: form.excerpt?.trim(),
          content: form.content.trim(),
          coverImage: form.coverImage?.trim(),
          tags: form.tags
            ? form.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [],
          status: form.status,
        };

        // Call parent submit handler
        await onSubmit(payload);

        toast.success(
          mode === "edit"
            ? "Blog post updated successfully ✨"
            : "Blog post published successfully ✨",
        );

        if (mode === "add") {
          setForm({
            title: "",
            excerpt: "",
            content: "",
            coverImage: "",
            tags: "",
            status: "published",
          });

          localStorage.removeItem(DRAFT_KEY);
        }
      } catch (err) {
        console.error("BlogForm Submit Error:", err);

        // Extract detailed errors sent from backend controller
        const backendMessage = err.response?.data?.message;
        const backendErrors = err.response?.data?.errors;

        let extractedError = "";

        if (Array.isArray(backendErrors) && backendErrors.length > 0) {
          extractedError = `${backendMessage || "Validation Error"}: ${backendErrors.join(", ")}`;
        } else if (backendMessage) {
          extractedError = backendMessage;
        } else {
          extractedError =
            err.message || "Failed to save blog post. Please try again.";
        }

        setErrorMessage(extractedError);
        toast.error(extractedError);
      } finally {
        setLoading(false);
      }
    },
    [form, mode, onSubmit],
  );

  /* ---------- Keyboard Shortcut: Ctrl + Enter / Cmd + Enter ---------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (preview || loading) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmit, preview, loading]);

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
              <FileText className="w-6 h-6" />
              {mode === "edit" ? "Edit Blog Post" : "Add New Blog Post"}
            </h1>
            <p className="text-muted-foreground text-sm">
              Publish rich articles, news, and updates for your readers
            </p>
          </div>

          <Button
            type="button"
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
                    alt={form.title || "Blog Cover"}
                    className="rounded-2xl max-h-80 w-full object-cover shadow-md"
                  />
                )}

                <h2 className="text-3xl font-serif font-bold">
                  {form.title || "Untitled Blog Post"}
                </h2>

                {form.excerpt && (
                  <p className="text-base font-medium text-slate-600 italic border-l-4 border-slate-300 pl-4 py-1">
                    {form.excerpt}
                  </p>
                )}

                <div className="whitespace-pre-line leading-relaxed text-slate-700">
                  {form.content || "No content written yet..."}
                </div>

                {form.tags && (
                  <div className="pt-4 flex flex-wrap gap-2">
                    {form.tags.split(",").map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600"
                      >
                        #{t.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {form.status === "draft" && (
                  <p className="text-xs text-amber-600 font-medium">
                    Draft (not published)
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    placeholder="Enter blog title"
                    value={form.title}
                    onChange={(e) => updateFormField("title", e.target.value)}
                    className={
                      fieldErrors.title
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {fieldErrors.title && (
                    <p className="flex items-center gap-1.5 text-xs font-medium text-red-600 mt-1.5 animate-in fade-in">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.title}
                    </p>
                  )}
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Excerpt / Summary
                  </label>
                  <Input
                    placeholder="Brief summary for preview cards (max 300 chars)"
                    value={form.excerpt}
                    maxLength={300}
                    onChange={(e) => updateFormField("excerpt", e.target.value)}
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content *</label>
                  <textarea
                    rows={12}
                    className={`w-full rounded-2xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-y ${
                      fieldErrors.content
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-slate-900"
                    }`}
                    placeholder="Write your blog post content here..."
                    value={form.content}
                    onChange={(e) => updateFormField("content", e.target.value)}
                  />
                  {fieldErrors.content && (
                    <p className="flex items-center gap-1.5 text-xs font-medium text-red-600 mt-1.5 animate-in fade-in">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.content}
                    </p>
                  )}
                </div>

                {/* Cover Image URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cover Image URL</label>
                  <Input
                    placeholder="https://..."
                    value={form.coverImage}
                    onChange={(e) =>
                      updateFormField("coverImage", e.target.value)
                    }
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <Input
                    placeholder="Comma separated tags (e.g. poetry, inspiration, release)"
                    value={form.tags}
                    onChange={(e) => updateFormField("tags", e.target.value)}
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => updateFormField("status", e.target.value)}
                    className="w-full rounded-2xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="published">Publish</option>
                    <option value="draft">Save Draft</option>
                  </select>
                </div>

                {/* Global Error Message Banner */}
                {errorMessage && (
                  <div className="flex items-start justify-between gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="text-sm font-medium leading-relaxed">
                        {errorMessage}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setErrorMessage("")}
                      className="text-red-500 hover:text-red-700 p-0.5 rounded-lg transition-colors cursor-pointer"
                      aria-label="Dismiss error"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="space-y-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={
                      loading || !form.title?.trim() || !form.content?.trim()
                    }
                    className="w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      <>
                        {mode === "edit"
                          ? "Update Blog Post"
                          : "Publish Blog Post"}
                        <FileText className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Tip: Press{" "}
                    <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-800 bg-slate-100 border border-slate-200 rounded-md shadow-xs">
                      Ctrl
                    </kbd>{" "}
                    +{" "}
                    <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-800 bg-slate-100 border border-slate-200 rounded-md shadow-xs">
                      Enter
                    </kbd>{" "}
                    to publish quickly.
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
