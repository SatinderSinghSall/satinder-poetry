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
} from "lucide-react";

export function SuggestBookModal({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    suggestedBy: "",
    email: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Lock background body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      setError("Please provide both the book title and author.");
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
        onClose();
      }, 10000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ---------- Static Backdrop (No click-to-close) ---------- */}
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" />

      {/* ---------- Modal Content Card ---------- */}
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-xl border border-stone-200/80 p-6 sm:p-7 z-10 animate-in zoom-in-95 duration-150 font-sans">
        {/* Explicit Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-200/50 transition-colors cursor-pointer"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Success Screen */
          <div className="py-10 flex flex-col items-center text-center space-y-2 animate-in zoom-in-95 duration-200">
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-700 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Thank You for the Note!
            </h3>
            <p className="text-xs text-stone-600 max-w-xs">
              Your recommendation has been sent over to Satinder's reading list.
            </p>
          </div>
        ) : (
          /* Form Content */
          <div>
            {/* Header */}
            <div className="mb-4 space-y-1">
              <span className="text-[10px] font-semibold tracking-wider text-amber-800 uppercase bg-amber-100/70 px-2.5 py-0.5 rounded-md border border-amber-200/60 inline-block">
                Reader Recommendation
              </span>
              <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight pt-1">
                Suggest a Title
              </h2>
              <p className="text-xs text-stone-500">
                Share a book or poetry collection that Satinder should read
                next.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Row 1: Book Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                    Book Title <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Letters to a Young Poet"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                    Author <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="e.g. Rainer Maria Rilke"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Your Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      name="suggestedBy"
                      value={formData.suggestedBy}
                      onChange={handleChange}
                      placeholder="e.g. Eleanor"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                    Your Email{" "}
                    <span className="text-stone-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Personal Note */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                  Why this book? / Personal Note
                </label>
                <div className="relative">
                  <MessageSquare className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                  <textarea
                    name="note"
                    rows={2.5}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="What makes this collection or story worth exploring?"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all shadow-sm resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.99] rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      Sending Recommendation...
                    </>
                  ) : (
                    <>
                      Submit Recommendation
                      <Send className="w-3.5 h-3.5 text-amber-400" />
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
