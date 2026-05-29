import { AlertTriangle, X } from "lucide-react";

import { useEffect } from "react";

export default function SubscriptionErrorModal({ open, onClose, error }) {
  useEffect(() => {
    if (open) {
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
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/40
        backdrop-blur-sm
        px-4
      "
    >
      {/* modal */}
      <div
        className="
          relative w-full max-w-md
          overflow-hidden
          rounded-[32px]
          border border-white/20
          bg-white
          p-10
          shadow-[0_25px_80px_rgba(0,0,0,0.18)]
          animate-in fade-in zoom-in-95 duration-300
        "
      >
        {/* close */}
        <button
          onClick={onClose}
          className="
            absolute right-5 top-5
            rounded-full
            p-2
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
            cursor-pointer
          "
        >
          <X size={18} />
        </button>

        {/* red glow */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.10),transparent_45%)]
            pointer-events-none
          "
        />

        {/* content */}
        <div className="relative text-center">
          {/* icon */}
          <div
            className="
              mx-auto flex h-20 w-20
              items-center justify-center
              rounded-full
              bg-rose-50
              shadow-inner
            "
          >
            <AlertTriangle size={42} className="text-rose-500" />
          </div>

          {/* badge */}
          <div
            className="
              mt-6 inline-flex items-center gap-2
              rounded-full
              border border-rose-100
              bg-rose-50
              px-4 py-2
              text-xs font-medium
              tracking-[0.18em]
              text-rose-700
            "
          >
            SUBSCRIPTION FAILED
          </div>

          {/* title */}
          <h2
            className="
              mt-7
              font-serif
              text-3xl
              tracking-tight
              text-slate-900
            "
          >
            Something went wrong
          </h2>

          {/* description */}
          <p
            className="
              mt-5
              text-[15px]
              leading-7
              text-slate-500
            "
          >
            We couldn’t complete your subscription request. Please try again in
            a moment.
          </p>

          {/* error box */}
          <div
            className="
              mt-6
              rounded-2xl
              border border-rose-100
              bg-rose-50
              px-5 py-4
              text-sm
              leading-6
              text-rose-700
            "
          >
            {error}
          </div>

          {/* button */}
          <button
            onClick={onClose}
            className="
              mt-8 inline-flex h-12 items-center justify-center
              rounded-2xl
              bg-slate-900
              px-8
              text-sm font-medium
              text-white
              transition-all
              hover:bg-slate-800
              hover:scale-[1.02]
              active:scale-[0.98]
              cursor-pointer
            "
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
