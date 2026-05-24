import { CheckCircle2, Sparkles, X, Mail } from "lucide-react";

export default function SubscriptionSuccessModal({ open, onClose, email }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/50
        backdrop-blur-sm
        p-4
      "
    >
      {/* modal */}
      <div
        className="
          relative

          w-full
          max-w-md sm:max-w-lg

          rounded-[28px]
          bg-white

          px-5 py-7
          sm:px-8 sm:py-9

          shadow-[0_25px_80px_rgba(0,0,0,0.18)]

          animate-in fade-in zoom-in-95 duration-300
        "
      >
        {/* top glow */}
        <div
          className="
            absolute inset-0
            rounded-[28px]
            bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_45%)]
            pointer-events-none
          "
        />

        {/* close */}
        <button
          onClick={onClose}
          className="
            absolute right-4 top-4
            rounded-full
            p-2
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
        >
          <X size={18} />
        </button>

        {/* content */}
        <div className="relative text-center">
          {/* icon */}
          <div
            className="
              mx-auto
              flex h-16 w-16
              sm:h-20 sm:w-20
              items-center justify-center

              rounded-full
              bg-emerald-50

              shadow-inner
            "
          >
            <CheckCircle2
              size={38}
              className="text-emerald-500 sm:h-11 sm:w-11"
            />
          </div>

          {/* badge */}
          <div
            className="
              mt-5
              inline-flex items-center gap-2

              rounded-full
              border border-emerald-100
              bg-emerald-50

              px-4 py-2

              text-[10px]
              sm:text-xs

              font-semibold
              tracking-[0.18em]

              text-emerald-700
            "
          >
            <Sparkles size={13} />
            SUCCESSFULLY SUBSCRIBED
          </div>

          {/* title */}
          <h2
            className="
              mt-6

              font-serif
              text-3xl
              sm:text-4xl

              leading-tight
              tracking-tight

              text-slate-900
            "
          >
            Welcome to the
            <br />
            poetry circle ✨
          </h2>

          {/* description */}
          <p
            className="
              mx-auto
              mt-5

              max-w-md

              text-sm
              sm:text-[15px]

              leading-7
              text-slate-500
            "
          >
            You’ll now receive new poems, reflections, thoughtful letters, and
            beautifully written stories directly in your inbox.
          </p>

          {/* onboarding card */}
          <div
            className="
              mt-6

              rounded-2xl

              border border-blue-100
              bg-blue-50

              p-4
              sm:p-5

              text-left
            "
          >
            <div className="flex items-start gap-3">
              {/* icon */}
              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center

                  rounded-xl
                  bg-white

                  shadow-sm
                "
              >
                <Mail size={18} className="text-blue-600" />
              </div>

              {/* text */}
              <div>
                <p className="text-sm font-semibold text-blue-950">
                  Check your inbox
                </p>

                <p
                  className="
                    mt-1

                    text-sm
                    leading-6

                    text-blue-700
                  "
                >
                  We’ve sent you a welcome email with your newsletter onboarding
                  and future poetry updates.
                </p>
              </div>
            </div>
          </div>

          {/* email */}
          <div
            className="
              mt-5

              rounded-2xl

              border border-slate-200
              bg-slate-50

              px-4 py-4

              text-sm
              text-slate-700

              break-all
            "
          >
            {email}
          </div>

          {/* button */}
          <button
            onClick={onClose}
            className="
              mt-7

              inline-flex
              h-12

              items-center justify-center

              rounded-2xl
              bg-slate-900

              px-8

              text-sm
              font-medium

              text-white

              transition-all
              duration-300

              hover:scale-[1.02]
              hover:bg-slate-800

              active:scale-[0.98]
            "
          >
            Continue Reading
          </button>
        </div>
      </div>
    </div>
  );
}
