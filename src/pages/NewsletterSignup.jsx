import { CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import SubscriptionSuccessModal from "@/components/SubscriptionSuccessModal";
import SubscriptionErrorModal from "@/components/SubscriptionErrorModal";

import API from "@/api/api";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

      setErrorMessage("Please enter a valid email address.");
      setShowErrorModal(true);

      return;
    }

    setLoading(true);
    setMessage("");
    setStatus("idle");

    try {
      const res = await API.post("/subscribe", { email });

      localStorage.setItem("hasNewsletter", "true");

      setStatus("success");
      setMessage(res.data.message || "You’re subscribed ✨");

      setSubscribedEmail(email);
      setShowSuccessModal(true);

      setEmail("");
    } catch (err) {
      const backendError =
        err.response?.data?.message || "Subscription failed. Please try again.";

      setStatus("error");
      setMessage(backendError);

      setErrorMessage(backendError);
      setShowErrorModal(true);
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
    <section
      id="newsletter"
      className="relative overflow-hidden bg-[#fafaf9] py-32"
    >
      {/* soft radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_55%)]" />

      <div className="relative mx-auto max-w-3xl px-6">
        <div
          className="
          rounded-[32px]
          border border-black/5
          bg-white
          px-8 py-16 sm:px-16
          shadow-[0_10px_60px_rgba(0,0,0,0.04)]
        "
        >
          {/* top label */}
          <div className="mb-8 flex justify-center">
            <div
              className="
              inline-flex items-center gap-2
              rounded-full
              border border-slate-200
              bg-slate-50
              px-4 py-2
              text-xs font-medium tracking-[0.2em]
              text-slate-500
            "
            >
              <Mail className="h-4 w-4" />
              NEWSLETTER
            </div>
          </div>

          {/* heading */}
          <div className="text-center">
            <h2
              className="
              font-serif
              text-4xl
              leading-tight
              tracking-tight
              text-slate-900
              sm:text-5xl
            "
            >
              Quiet words,
              <br />
              delivered gently.
            </h2>

            <p
              className="
              mx-auto mt-6 max-w-xl
              text-[15px]
              leading-8
              text-slate-500
              sm:text-base
            "
            >
              Receive newly published poems, reflections, and thoughtful writing
              — carefully sent to your inbox.
            </p>
          </div>

          {/* form */}
          <div className="mx-auto mt-14 max-w-xl">
            <div
              className="
              flex flex-col gap-4
              sm:flex-row
            "
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="
                h-14
                rounded-2xl
                border-slate-200
                bg-[#fcfcfb]
                px-5
                text-base
                shadow-none
                focus-visible:ring-1
                focus-visible:ring-slate-300
              "
              />

              <Button
                type="button"
                onClick={handleSubscribe}
                disabled={loading}
                className="
                h-14
                rounded-2xl
                bg-slate-900
                px-8
                text-sm
                font-medium
                tracking-wide
                text-white
                transition-all
                hover:bg-slate-800
                hover:scale-[1.01]
                active:scale-[0.99]
              "
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Subscribing
                  </div>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            {/* message */}
            {message && (
              <div className="mt-5 text-center">
                {status === "success" ? (
                  <p className="inline-flex items-center gap-2 text-sm text-emerald-600">
                    <CheckCircle2 size={16} />
                    {message}
                  </p>
                ) : (
                  <p className="text-sm text-rose-500">{message}</p>
                )}
              </div>
            )}
          </div>

          {/* footer note */}
          <div className="mt-12 text-center">
            <p className="text-xs tracking-wide text-slate-400">
              No spam · Unsubscribe anytime · Written with care
            </p>
          </div>
        </div>
      </div>

      <SubscriptionSuccessModal
        open={showSuccessModal}
        email={subscribedEmail}
        onClose={() => setShowSuccessModal(false)}
      />

      <SubscriptionErrorModal
        open={showErrorModal}
        error={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
    </section>
  );
}
