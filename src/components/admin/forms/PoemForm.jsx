import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { Loader2, PenLine, Eye, AlertCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const DRAFT_KEY = "poem_draft";

// @desc    Form component for creating, editing, and previewing poetry posts
// @route   N/A (UI Component)
// @access  Private/Admin
export default function PoemForm({ initialData, mode = "add", onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    summary: "",
    theme: "",
    tags: "",
    coverImage: "",
    status: "published",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [sendNotification, setSendNotification] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // @desc    Load saved draft from localStorage on initial render (Add mode only)
  // @route   N/A (Effect)
  // @access  Internal
  useEffect(() => {
    if (mode === "add") {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        try {
          setForm(JSON.parse(draft));
        } catch (e) {
          console.error("Failed to parse local draft", e);
        }
      }
    }
  }, [mode]);

  // @desc    Populate form fields with initial data when editing an existing poem
  // @route   N/A (Effect)
  // @access  Internal
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        title: initialData.title || "",
        author: initialData.author || "",
        content: initialData.content || "",
        summary: initialData.summary || "",
        theme: initialData.theme || "",
        tags: initialData.tags ? initialData.tags.join(", ") : "",
        coverImage: initialData.coverImage || "",
        status: initialData.status || "published",
        featured: initialData.featured || false,
      });
    }
  }, [initialData, mode]);

  // @desc    Autosave active form inputs to localStorage as a draft (Add mode only)
  // @route   N/A (Effect)
  // @access  Internal
  useEffect(() => {
    if (mode === "add") {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    }
  }, [form, mode]);

  // @desc    Register global keyboard shortcut (Ctrl/Cmd + Enter) to trigger submission
  // @route   N/A (Effect)
  // @access  Internal
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

  // @desc    Update field value and clear associated field/global errors
  // @route   N/A (Helper)
  // @access  Internal
  const handleInputChange = (field, value) => {
    if (errorMessage) setErrorMessage("");
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // @desc    Handle poem form validation, data formatting, and submission handling
  // @route   POST /api/poems OR PUT /api/poems/:id
  // @access  Private/Admin
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrorMessage("");

    const errors = {};
    if (!form.title?.trim()) errors.title = "Poem title is required";
    if (!form.author?.trim()) errors.author = "Author name is required";
    if (!form.content?.trim()) errors.content = "Poem content cannot be empty";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const valErrorMsg = "Please fill in all required fields";
      setErrorMessage(valErrorMsg);
      toast.error(valErrorMsg);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      await onSubmit(
        mode === "add"
          ? {
              ...form,
              tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
              sendNotification,
            }
          : {
              ...form,
              tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
            },
      );

      toast.success(
        mode === "edit"
          ? "Poem updated successfully ✨"
          : "Poem published successfully ✨",
      );

      if (mode === "add") {
        setForm({
          title: "",
          author: "",
          content: "",
          summary: "",
          theme: "",
          tags: "",
          coverImage: "",
          status: "published",
          featured: false,
        });

        setSendNotification(true);
        localStorage.removeItem(DRAFT_KEY);
      }
    } catch (err) {
      console.error("Submission Error:", err);

      const backendMessage = err.response?.data?.message;
      const backendErrors = err.response?.data?.errors;
      let extractedError = "";

      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        extractedError = `${backendMessage || "Validation Error"}: ${backendErrors.join(", ")}`;
      } else if (backendMessage) {
        extractedError = backendMessage;
      } else {
        extractedError =
          err.message || "Failed to save poem. Please try again.";
      }

      setErrorMessage(extractedError);
      toast.error(extractedError);
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
              <PenLine className="w-6 h-6" />
              {mode === "edit" ? "Edit Poem" : "Add New Poem"}
            </h1>
            <p className="text-muted-foreground text-sm">
              Write, preview, and publish poetry
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
                    alt="Cover"
                    className="rounded-2xl w-full"
                  />
                )}

                <h2 className="text-2xl font-serif">
                  {form.title || "Untitled"}
                </h2>

                <p className="text-sm text-muted-foreground">
                  — {form.author || "Unknown"}
                </p>

                {form.summary && (
                  <p className="italic text-slate-500">{form.summary}</p>
                )}

                <p className="whitespace-pre-line leading-relaxed text-slate-700">
                  {form.content || "No content yet…"}
                </p>

                {form.theme && (
                  <p className="text-sm text-muted-foreground">
                    Theme: {form.theme}
                  </p>
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
                    ⭐ Featured Poem
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    placeholder="Enter poem title"
                    value={form.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={
                      fieldErrors.title
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {fieldErrors.title && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.title}</span>
                    </div>
                  )}
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Author *</label>
                  <Input
                    placeholder="Author name"
                    value={form.author}
                    onChange={(e) =>
                      handleInputChange("author", e.target.value)
                    }
                    className={
                      fieldErrors.author
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {fieldErrors.author && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.author}</span>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Summary</label>
                  <Input
                    placeholder="Short preview text"
                    value={form.summary}
                    onChange={(e) =>
                      handleInputChange("summary", e.target.value)
                    }
                  />
                </div>

                {/* Theme */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Theme</label>
                  <Input
                    placeholder="Love, Life, Nature..."
                    value={form.theme}
                    onChange={(e) => handleInputChange("theme", e.target.value)}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <Input
                    placeholder="comma separated tags"
                    value={form.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cover Image URL</label>
                  <Input
                    placeholder="https://..."
                    value={form.coverImage}
                    onChange={(e) =>
                      handleInputChange("coverImage", e.target.value)
                    }
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full rounded-2xl border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="published">Publish</option>
                    <option value="draft">Save Draft</option>
                  </select>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Content *</label>
                    <span className="text-xs text-muted-foreground">
                      {wordCount} words
                    </span>
                  </div>

                  <textarea
                    rows={10}
                    className={`
                      w-full rounded-2xl border
                      bg-muted/30 px-4 py-3 text-sm
                      focus:outline-none focus:ring-2 focus:ring-slate-900
                      resize-none
                      ${fieldErrors.content ? "border-red-500 focus:ring-red-500" : ""}
                    `}
                    placeholder="Write your poem here..."
                    value={form.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                  />
                  {fieldErrors.content && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.content}</span>
                    </div>
                  )}
                </div>

                {/* Publishing Options */}
                <div className="border-t pt-6 space-y-4">
                  <p className="text-sm font-medium text-slate-700">
                    Publishing Options
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    {/* Featured */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={form.featured}
                        onChange={(e) =>
                          handleInputChange("featured", e.target.checked)
                        }
                        className="h-4 w-4 rounded border-slate-300 cursor-pointer"
                      />
                      <label
                        htmlFor="featured"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        ⭐ Featured Poem
                      </label>
                    </div>

                    {/* Email notification */}
                    {mode === "add" && (
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="sendNotification"
                          checked={sendNotification}
                          onChange={(e) =>
                            setSendNotification(e.target.checked)
                          }
                          className="h-4 w-4 rounded border-slate-300 cursor-pointer"
                        />
                        <label
                          htmlFor="sendNotification"
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          Send email notification to all users
                        </label>
                      </div>
                    )}
                  </div>
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
                      loading ||
                      !form.title?.trim() ||
                      !form.author?.trim() ||
                      !form.content?.trim()
                    }
                    className="w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900"
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
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
