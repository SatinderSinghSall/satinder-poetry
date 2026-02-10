import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/api/api";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (loading) return;

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

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

  return (
    <section className="relative py-40">
      {/* soft paper background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100" />

      {/* gentle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04),transparent_60%)]" />

      <div className="relative max-w-2xl mx-auto px-6">
        <div
          className="
            bg-white/85 backdrop-blur
            rounded-3xl
            shadow-xl
            p-10 sm:p-12
            text-center
          "
        >
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-3">
            Stay Inspired
          </h2>

          {/* Subtext */}
          <p className="text-slate-500 mb-10 text-sm sm:text-base leading-relaxed">
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
              className="h-12 rounded-xl"
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
                transition
                flex items-center justify-center gap-2
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Subscribing...</span>
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>

          {/* Feedback message */}
          {message && (
            <p
              className={`mt-6 text-sm ${
                status === "success" ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Reassurance */}
          <p className="mt-8 text-xs text-slate-400">
            No spam • Unsubscribe anytime • Written with care
          </p>
        </div>
      </div>
    </section>
  );
}
