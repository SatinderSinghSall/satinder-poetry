import {
  CheckCircle2,
  Sparkles,
  X,
  ArrowRight,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useState } from "react";

import ClearHistoryModal from "./ClearHistoryModal";

export default function WelcomeBackModal({ open, onClose }) {
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";

      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="
            fixed inset-0 z-[300]
            bg-black/70
            backdrop-blur-md
            px-4 py-6
            overflow-y-auto
        "
      >
        <div
          className="
        min-h-full
        flex items-center justify-center
      "
        >
          <div
            role="dialog"
            aria-modal="true"
            className="
          relative

          w-full
          max-w-4xl

          overflow-hidden

          rounded-[36px]

          border border-white/10

          bg-gradient-to-br
          from-[#081229]
          via-[#0f1b46]
          to-[#050d20]

          shadow-[0_40px_120px_rgba(0,0,0,0.45)]

          animate-in fade-in zoom-in-95 duration-300
        "
          >
            {/* glow */}
            <div
              className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]
          "
            />

            {/* close */}
            <button
              aria-label="Close modal"
              onClick={onClose}
              className="
            absolute right-4 top-4 z-20

            rounded-full
            p-2

            text-white/60

            transition-all

            hover:bg-white/10
            hover:text-white
          "
            >
              <X size={20} />
            </button>

            <div
              className="
            relative

            px-6 py-8
            sm:px-10 sm:py-12
            lg:px-14 lg:py-14
          "
            >
              {/* badge */}
              <div
                className="
              inline-flex items-center gap-2

              rounded-full

              border border-white/10
              bg-white/5

              px-4 py-2

              text-[11px]
              font-medium
              tracking-[0.22em]

              text-white/85
            "
              >
                <Sparkles size={14} />
                SATINDER POETRY
              </div>

              {/* top section */}
              <div
                className="
              mt-8

              flex flex-col gap-6

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
              >
                {/* success icon */}
                <div
                  className="
                flex items-center gap-5
              "
                >
                  <div
                    className="
                  flex h-20 w-20
                  items-center justify-center

                  rounded-full

                  bg-emerald-500/15

                  ring-1 ring-emerald-400/20
                "
                  >
                    <CheckCircle2 size={42} className="text-emerald-400" />
                  </div>

                  {/* NEW PREMIUM STATUS TEXT */}
                  <div>
                    <p
                      className="
                    text-sm
                    tracking-[0.18em]

                    text-emerald-300/80
                  "
                    >
                      MEMBERSHIP ACTIVE
                    </p>

                    <h3
                      className="
                    mt-2

                    text-2xl
                    font-semibold

                    text-white
                  "
                    >
                      Welcome back, reader.
                    </h3>

                    <p
                      className="
                    mt-2

                    max-w-md

                    text-sm
                    leading-7

                    text-slate-300
                  "
                    >
                      Your poetry experience is now fully personalized and
                      connected.
                    </p>
                  </div>
                </div>

                {/* premium status card */}
                <div
                  className="
                rounded-3xl

                border border-white/10
                bg-white/5

                px-5 py-5

                backdrop-blur-sm
              "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                    flex h-12 w-12
                    items-center justify-center

                    rounded-2xl

                    bg-emerald-500/15
                  "
                    >
                      <ShieldCheck size={24} className="text-emerald-400" />
                    </div>

                    <div>
                      <p
                        className="
                      text-xs
                      tracking-[0.15em]

                      text-slate-400
                    "
                      >
                        EXPERIENCE STATUS
                      </p>

                      <h4
                        className="
                      mt-1

                      text-lg
                      font-semibold

                      text-white
                    "
                      >
                        Fully Activated
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* heading */}
              <h2
                className="
              mt-10

              max-w-2xl

              font-serif

              text-4xl
              leading-tight

              text-white

              sm:text-5xl
            "
              >
                You’re fully connected ✨
              </h2>

              {/* description */}
              <p
                className="
              mt-6

              max-w-3xl

              text-[15px]
              leading-8

              text-slate-300

              sm:text-base
            "
              >
                Your account has been created and your newsletter subscription
                is now active.
                <br />
                <br />
                You’ll now receive newly published poems, thoughtful newsletter
                reflections, exclusive writings, early access updates, and a
                more personal reading experience crafted around your poetry
                journey.
              </p>

              {/* features */}
              <div
                className="
              mt-10

              grid gap-4

              sm:grid-cols-2
            "
              >
                {[
                  "Early access to new poems",
                  "Exclusive newsletter reflections",
                  "Priority poetry updates",
                  "Personalized reading journey",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                  flex items-center gap-3

                  rounded-2xl

                  border border-white/10
                  bg-white/5

                  px-4 py-4

                  text-sm
                  text-white/90
                "
                  >
                    <CheckCircle2
                      size={18}
                      className="text-emerald-400 shrink-0"
                    />

                    {item}
                  </div>
                ))}
              </div>

              {/* preferences section */}

              <div
                className="
                    mt-8

                    overflow-hidden

                    rounded-3xl

                    border border-white/10
                    bg-white/[0.04]

                    backdrop-blur-sm
                "
              >
                <div
                  className="
                    flex flex-col gap-5

                    px-5 py-5

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
                >
                  {/* left */}

                  <div className="min-w-0">
                    <p
                      className="
                        text-[11px]
                        tracking-[0.22em]

                        text-slate-500
                    "
                    >
                      SUBSCRIPTION PREFERENCES
                    </p>

                    <h4
                      className="
                        mt-2

                        text-base
                        font-semibold

                        text-white

                        sm:text-lg
                    "
                    >
                      Manage your newsletter experience
                    </h4>

                    <p
                      className="
                        mt-2

                        max-w-md

                        text-sm
                        leading-7

                        text-slate-400
                    "
                    >
                      You can change your subscription preferences, update your
                      account settings, and manage your poetry experience
                      anytime from your profile page.
                    </p>
                  </div>

                  {/* button */}
                  <a
                    href="/profile"
                    className="
                        inline-flex items-center justify-center gap-2

                        rounded-2xl

                        border border-emerald-400/10
                        bg-emerald-500/10

                        px-5 py-4

                        text-sm
                        font-medium

                        text-emerald-200

                        transition-all

                        hover:bg-emerald-500/20
                        hover:text-white
                    "
                  >
                    Open Profile
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* buttons */}
              <div
                className="
                    mt-10

                    flex flex-col gap-4

                    sm:flex-row
                "
              >
                <button
                  onClick={onClose}
                  className="
                    inline-flex items-center justify-center gap-2

                    rounded-2xl

                    bg-white

                    px-6 py-4

                    text-sm
                    font-semibold

                    text-slate-900

                    transition-all

                    hover:scale-[1.02]

                    cursor-pointer
                "
                >
                  Okay, Continue
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => setShowClearModal(true)}
                  className="
                    inline-flex items-center justify-center gap-2

                    rounded-2xl

                    border border-red-400/20
                    bg-red-500/10

                    px-6 py-4

                    text-sm
                    font-medium

                    text-red-300

                    transition-all

                    hover:bg-red-500/20

                    cursor-pointer
                "
                >
                  <Trash2 size={18} />
                  Clear History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClearHistoryModal
        open={showClearModal}
        onClose={() => setShowClearModal(false)}
      />
    </>
  );
}
