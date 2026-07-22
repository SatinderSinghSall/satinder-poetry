import { useState, useEffect } from "react";
import {
  BookOpen,
  User,
  Mail,
  MessageSquare,
  X,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export function SuggestBookModal({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    suggestedBy: "",
    email: "",
    note: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Lock background body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as soon as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Book title is required.";
    }

    if (!formData.author.trim()) {
      errors.author = "Author name is required.";
    }

    if (!formData.suggestedBy.trim()) {
      errors.suggestedBy = "Your name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.note.trim()) {
      errors.note = "Please add a short note or reason.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_BASE_URL}/book-suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit recommendation.");

      setSubmitted(true);
      if (onSubmitSuccess) onSubmitSuccess();

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          title: "",
          author: "",
          suggestedBy: "",
          email: "",
          note: "",
        });
        setFieldErrors({});
        onClose();
      }, 5000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* ---------- Static Backdrop ---------- */}
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" />

      {/* ---------- Modal Content Card ---------- */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200/80 p-6 sm:p-8 md:p-10 z-10 animate-in zoom-in-95 duration-150 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer z-20"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Success Screen */
          <div className="py-12 sm:py-16 flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="p-4 rounded-full bg-emerald-100 text-emerald-700 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Thank You for the Note!
            </h3>
            <p className="text-sm text-stone-600 max-w-md leading-relaxed">
              Your recommendation has been sent over to Satinder's reading list.
            </p>
          </div>
        ) : (
          /* Form Content */
          <div>
            {/* Header */}
            <div className="mb-6 sm:mb-8 space-y-1.5">
              <span className="text-xs font-semibold tracking-wider text-amber-800 uppercase bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-200 inline-block">
                Reader Recommendation
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight pt-1">
                Suggest a Title
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Share a book or poetry collection that Satinder should read
                next.
              </p>
            </div>

            {/* General Server Error Banner */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4 sm:space-y-5"
            >
              {/* Row 1: Book Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Book Title */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Book Title <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen
                      className={`w-4 h-4 absolute left-3.5 top-3.5 transition-colors ${
                        fieldErrors.title ? "text-rose-400" : "text-stone-400"
                      }`}
                    />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Letters to a Young Poet"
                      className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-xl text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none transition-all shadow-sm ${
                        fieldErrors.title
                          ? "border-rose-400 ring-2 ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                          : "border-stone-200 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                      }`}
                    />
                  </div>
                  {fieldErrors.title && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.title}
                    </p>
                  )}
                </div>

                {/* Author */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Author <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User
                      className={`w-4 h-4 absolute left-3.5 top-3.5 transition-colors ${
                        fieldErrors.author ? "text-rose-400" : "text-stone-400"
                      }`}
                    />
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="e.g. Rainer Maria Rilke"
                      className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-xl text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none transition-all shadow-sm ${
                        fieldErrors.author
                          ? "border-rose-400 ring-2 ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                          : "border-stone-200 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                      }`}
                    />
                  </div>
                  {fieldErrors.author && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.author}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Your Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Your Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User
                      className={`w-4 h-4 absolute left-3.5 top-3.5 transition-colors ${
                        fieldErrors.suggestedBy
                          ? "text-rose-400"
                          : "text-stone-400"
                      }`}
                    />
                    <input
                      type="text"
                      name="suggestedBy"
                      value={formData.suggestedBy}
                      onChange={handleChange}
                      placeholder="e.g. Eleanor"
                      className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-xl text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none transition-all shadow-sm ${
                        fieldErrors.suggestedBy
                          ? "border-rose-400 ring-2 ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                          : "border-stone-200 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                      }`}
                    />
                  </div>
                  {fieldErrors.suggestedBy && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.suggestedBy}
                    </p>
                  )}
                </div>

                {/* Your Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      className={`w-4 h-4 absolute left-3.5 top-3.5 transition-colors ${
                        fieldErrors.email ? "text-rose-400" : "text-stone-400"
                      }`}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-xl text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none transition-all shadow-sm ${
                        fieldErrors.email
                          ? "border-rose-400 ring-2 ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                          : "border-stone-200 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                      }`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Personal Note */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                  Why this book? / Personal Note{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare
                    className={`w-4 h-4 absolute left-3.5 top-3.5 transition-colors ${
                      fieldErrors.note ? "text-rose-400" : "text-stone-400"
                    }`}
                  />
                  <textarea
                    name="note"
                    rows={4}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="What makes this collection or story worth exploring?"
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-xl text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none transition-all shadow-sm resize-none ${
                      fieldErrors.note
                        ? "border-rose-400 ring-2 ring-rose-500/20 focus:border-rose-500 bg-rose-50/20"
                        : "border-stone-200 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                    }`}
                  />
                </div>
                {fieldErrors.note && (
                  <p className="flex items-center gap-1 text-xs font-medium text-rose-600 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {fieldErrors.note}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-6 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.99] rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      Sending Recommendation...
                    </>
                  ) : (
                    <>
                      Submit Recommendation
                      <Send className="w-4 h-4 text-amber-400" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
