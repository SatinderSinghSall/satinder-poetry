import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/api/api";
import { CheckCircle2, Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [loading, setLoading] = useState(false);

  /* ==============================
     Email validation (better)
  ============================== */
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  /* ==============================
     Subscribe
  ============================== */
  const handleSubscribe = async () => {
    if (loading) return;

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");
    setStatus("idle");

    try {
      const res = await API.post("/subscribe", { email });

      setStatus("success");
      setMessage(res.data.message || "You’re subscribed ✨");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err.response?.data?.message || "Subscription failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
     Enter key support
  ============================== */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubscribe();
  };

  return (
    <section id="newsletter" className="relative py-40 overflow-hidden">
      {/* soft paper gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100" />

      {/* poetic glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_65%)]" />

      <div className="relative max-w-2xl mx-auto px-6">
        <div
          className="
          bg-white/90 backdrop-blur-xl
          rounded-3xl
          shadow-2xl shadow-slate-200/60
          border border-slate-100
          p-10 sm:p-14
          text-center
          transition-all
        "
        >
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="p-3 rounded-full bg-slate-100">
              <Mail className="w-6 h-6 text-slate-600" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-3">
            Stay Inspired
          </h2>

          {/* Subtext */}
          <p className="text-slate-500 mb-10 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Receive new poems, reflections, and quiet words — delivered gently
            to your inbox.
          </p>

          {/* Form */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="you@poetry.com"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="
                h-12 rounded-xl
                focus:ring-2 focus:ring-slate-300
                transition
              "
              aria-label="Email address"
            />

            <Button
              type="button"
              onClick={handleSubscribe}
              disabled={loading}
              className="
                h-12 px-6 rounded-xl
                bg-slate-900 text-white
                hover:bg-slate-800
                transition-all
                flex items-center justify-center gap-2
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>

          {/* Feedback */}
          {message && (
            <div className="mt-6 flex justify-center">
              {status === "success" ? (
                <p className="flex items-center gap-2 text-emerald-600 text-sm animate-fade-in">
                  <CheckCircle2 size={16} />
                  {message}
                </p>
              ) : (
                <p className="text-rose-600 text-sm">{message}</p>
              )}
            </div>
          )}

          {/* Reassurance */}
          <p className="mt-10 text-xs text-slate-400">
            No spam • Unsubscribe anytime • Written with care
          </p>
        </div>
      </div>
    </section>
  );
}
