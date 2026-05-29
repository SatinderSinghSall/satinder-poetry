import {
  AlertTriangle,
  Trash2,
  X,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";

import { useEffect } from "react";

export default function ClearHistoryModal({ open, onClose }) {
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

  const handleClearHistory = () => {
    localStorage.clear();

    window.location.reload();
  };

  return (
    <div
      className="
fixed inset-0 z-[400]


    overflow-y-auto

    bg-black/80
    backdrop-blur-md

    px-3 py-4
    sm:px-6 sm:py-8
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
        max-w-[95vw]
        sm:max-w-2xl

        overflow-hidden

        rounded-[28px]
        sm:rounded-[36px]

        border border-red-500/20

        bg-gradient-to-br
        from-[#140809]
        via-[#0f172a]
        to-[#18090b]

        shadow-[0_40px_120px_rgba(0,0,0,0.55)]

        animate-in fade-in zoom-in-95 duration-300
      "
        >
          {/* red glow */}
          <div
            className="
          absolute inset-0

          bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.16),transparent_60%)]
        "
          />

          {/* close */}
          <button
            onClick={onClose}
            className="
          absolute right-3 top-3 z-20

          rounded-full
          p-2

          text-white/50

          transition-all

          hover:bg-white/10
          hover:text-white

          sm:right-4
          sm:top-4
        "
          >
            <X size={18} />
          </button>

          <div
            className="
          relative

          px-5 py-6
          sm:px-10 sm:py-10
        "
          >
            {/* top section */}
            <div
              className="
            flex flex-col gap-5

            xl:flex-row
            xl:items-center
            xl:justify-between
          "
            >
              {/* left */}
              <div
                className="
              flex items-start gap-4
            "
              >
                {/* icon */}
                <div
                  className="
                flex h-14 w-14 shrink-0
                items-center justify-center

                rounded-full

                bg-red-500/15

                ring-1 ring-red-400/20

                sm:h-20
                sm:w-20
              "
                >
                  <AlertTriangle
                    size={28}
                    className="
                  text-red-400

                  sm:h-[34px]
                  sm:w-[34px]
                "
                  />
                </div>

                {/* text */}
                <div className="min-w-0">
                  <p
                    className="
                  text-[10px]
                  tracking-[0.24em]

                  text-red-300/80

                  sm:text-xs
                "
                  >
                    DANGER ZONE
                  </p>

                  <h3
                    className="
                  mt-2

                  text-lg
                  font-semibold

                  text-white

                  sm:text-2xl
                "
                  >
                    Permanent local reset
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
                    This action permanently removes all locally stored
                    experience data from your device.
                  </p>
                </div>
              </div>

              {/* status card */}
              <div
                className="
              rounded-3xl

              border border-red-400/10
              bg-red-500/10

              px-4 py-4
              sm:px-5 sm:py-5

              backdrop-blur-sm
            "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                  flex h-10 w-10
                  items-center justify-center

                  rounded-2xl

                  bg-red-500/15

                  sm:h-12
                  sm:w-12
                "
                  >
                    <ShieldAlert size={22} className="text-red-400" />
                  </div>

                  <div>
                    <p
                      className="
                    text-[10px]
                    tracking-[0.18em]

                    text-red-200/70

                    sm:text-xs
                  "
                    >
                      SECURITY ACTION
                    </p>

                    <h4
                      className="
                    mt-1

                    text-base
                    font-semibold

                    text-white

                    sm:text-lg
                  "
                    >
                      Irreversible
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* heading */}
            <h2
              className="
            mt-8

            text-3xl
            font-semibold
            leading-tight

            text-white

            sm:mt-10
            sm:text-5xl
          "
            >
              Clear your history?
            </h2>

            {/* description */}
            <p
              className="
            mt-5

            max-w-2xl

            text-sm
            leading-8

            text-slate-300

            sm:text-[15px]
          "
            >
              This will completely reset your saved poetry experience and remove
              all locally stored preferences associated with this browser
              session.
            </p>

            {/* warning list */}
            <div
              className="
            mt-8

            rounded-3xl

            border border-red-500/10
            bg-black/20

            p-4
            sm:p-6
          "
            >
              <p
                className="
              text-sm
              font-medium

              text-red-200
            "
              >
                The following data will be removed:
              </p>

              <div
                className="
              mt-5

              grid gap-3

              sm:grid-cols-2
            "
              >
                {[
                  "Account tracking",
                  "Newsletter preferences",
                  "Reading personalization",
                  "Saved experience data",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                  flex items-center gap-3

                  rounded-2xl

                  border border-white/5
                  bg-white/[0.03]

                  px-4 py-4

                  text-sm
                  text-slate-200
                "
                  >
                    <div
                      className="
                    h-2 w-2
                    rounded-full

                    bg-red-400
                  "
                    />

                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* developer support */}
            <div
              className="
                mt-6


                overflow-hidden

                rounded-3xl

                border border-white/5
                bg-gradient-to-r
                from-white/[0.04]
                to-white/[0.02]

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
                    SUPPORT & ASSISTANCE
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
                    Facing bugs or technical issues?
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
                    If you experience unexpected issues, broken features, or
                    need help with your poetry experience, feel free to contact
                    the developer directly.
                  </p>
                </div>

                {/* button */}
                <a
                  href="https://satinder-portfolio.vercel.app/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-2

                    rounded-2xl

                    border border-red-400/10
                    bg-red-500/10

                    px-5 py-4

                    text-sm
                    font-medium

                    text-red-200

                    transition-all

                    hover:bg-red-500/20
                    hover:text-white
                "
                >
                  Contact Developer
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* buttons */}
            <div
              className="
                mt-8

                flex flex-col gap-4

                sm:flex-row
            "
            >
              {/* cancel */}
              <button
                onClick={onClose}
                className="
                  flex-1

                  rounded-2xl

                  border border-white/10
                  bg-white/5

                  px-6 py-4

                  text-sm
                  font-medium

                  text-white

                  transition-all

                  hover:bg-white/10

                  cursor-pointer
                "
              >
                No, Cancel
              </button>

              {/* clear */}
              <button
                onClick={handleClearHistory}
                className="
                  flex-1

                  inline-flex items-center justify-center gap-2

                  rounded-2xl

                  bg-red-500

                  px-6 py-4

                  text-sm
                  font-semibold

                  text-white

                  transition-all

                  hover:bg-red-600
                  hover:scale-[1.01]

                  cursor-pointer
                "
              >
                <Trash2 size={16} />
                Yes, Clear Everything
              </button>
            </div>

            {/* footer */}
            <p
              className="
                mt-6

                text-center

                text-xs

                text-slate-500
            "
            >
              This action only clears local browser storage and does not delete
              your server account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
