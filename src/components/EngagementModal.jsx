import {
  BookOpen,
  Mail,
  Sparkles,
  UserPlus,
  X,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function EngagementModal({
  open,
  onClose,
  needsAccount,
  needsNewsletter,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[200]

        overflow-y-auto

        bg-black/60
        backdrop-blur-md

        px-4 py-6
        sm:px-6 sm:py-10
      "
    >
      {/* wrapper */}
      <div
        className="
          min-h-full
          flex items-center justify-center
        "
      >
        {/* modal */}
        <div
          className="
            relative

            w-full
            max-w-6xl

            overflow-hidden

            rounded-[30px] sm:rounded-[36px]

            border border-white/15
            bg-white

            shadow-[0_40px_140px_rgba(0,0,0,0.28)]

            animate-in fade-in zoom-in-95 duration-300
          "
        >
          {/* glow */}
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.05),transparent_55%)]
              pointer-events-none
            "
          />

          {/* close */}
          <button
            onClick={onClose}
            className="
              absolute right-4 top-4 z-30

              rounded-full
              p-2

              text-slate-400
              transition-all

              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={20} />
          </button>

          {/* grid */}
          <div
            className="
              grid

              lg:grid-cols-[1.05fr_1fr]
            "
          >
            {/* LEFT */}
            <div
              className="
                relative

                overflow-hidden

                bg-gradient-to-br
                from-[#0b132b]
                via-[#0f1b46]
                to-[#08112d]

                px-6 py-8
                sm:px-10 sm:py-12
                lg:px-14 lg:py-16
              "
            >
              {/* decorative */}
              <div
                className="
                  absolute -top-20 -left-20
                  h-72 w-72
                  rounded-full
                  bg-white/5
                  blur-3xl
                "
              />

              <div
                className="
                  absolute bottom-0 right-0
                  h-72 w-72
                  rounded-full
                  bg-indigo-500/10
                  blur-3xl
                "
              />

              <div className="relative">
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

                {/* heading */}
                <h2
                  className="
                    mt-7

                    max-w-md

                    font-serif

                    text-4xl
                    leading-tight

                    text-white

                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  A quieter
                  <br />
                  reading
                  <br />
                  experience.
                </h2>

                {/* description */}
                <p
                  className="
                    mt-7

                    max-w-lg

                    text-[15px]
                    leading-8

                    text-slate-300

                    sm:text-base
                  "
                >
                  Join the poetry circle to save your reading journey, receive
                  thoughtful newsletters, and discover newly published poems
                  before everyone else.
                </p>

                {/* features */}
                <div
                  className="
                    mt-10

                    grid gap-4
                  "
                >
                  {[
                    "Early access to new poems",
                    "Beautiful email reflections",
                    "Personal reading experience",
                    "Save favorite writings",
                  ].map((item) => (
                    <div
                      key={item}
                      className="
                        flex items-center gap-3

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
              </div>
            </div>

            {/* RIGHT */}
            <div
              className="
                px-5 py-7
                sm:px-8 sm:py-10
                lg:px-10 lg:py-12
              "
            >
              {/* title */}
              <div>
                <p
                  className="
                    text-xs
                    sm:text-sm

                    font-medium
                    tracking-[0.18em]

                    text-slate-400
                  "
                >
                  COMPLETE YOUR EXPERIENCE
                </p>

                <h3
                  className="
                    mt-3

                    max-w-[260px] sm:max-w-none

                    text-[32px]
                    leading-[1.08]

                    font-semibold
                    tracking-tight

                    text-slate-900

                    sm:text-4xl
                    sm:leading-tight
                  "
                >
                  <span className="block">Continue your</span>

                  <span className="mt-1 block">journey ✨</span>
                </h3>
              </div>

              {/* cards */}
              <div className="mt-8 space-y-5">
                {/* account */}
                {needsAccount && (
                  <div
                    className="
                      rounded-[28px]

                      border border-slate-200
                      bg-slate-50

                      p-5 sm:p-6
                    "
                  >
                    <div className="flex gap-4">
                      <div
                        className="
                          flex h-12 w-12 shrink-0
                          items-center justify-center

                          rounded-2xl
                          bg-white

                          shadow-sm
                        "
                      >
                        <UserPlus size={22} className="text-slate-900" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4
                          className="
                            text-lg
                            font-semibold
                            text-slate-900
                          "
                        >
                          Create your account
                        </h4>

                        <p
                          className="
                            mt-2

                            text-sm
                            leading-7

                            text-slate-500
                          "
                        >
                          Save poems, personalize your reading experience, and
                          become part of the poetry community.
                        </p>

                        <Link
                          to="/register"
                          onClick={onClose}
                          className="
                            mt-5

                            inline-flex
                            items-center gap-2

                            rounded-2xl

                            bg-slate-900

                            px-5 py-3

                            text-sm
                            font-medium

                            text-white

                            transition-all
                            hover:scale-[1.02]
                            hover:bg-slate-800
                          "
                        >
                          Create Account
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* newsletter */}
                {needsNewsletter && (
                  <div
                    className="
                      rounded-[28px]

                      border border-blue-100
                      bg-blue-50

                      p-5 sm:p-6
                    "
                  >
                    <div className="flex gap-4">
                      <div
                        className="
                          flex h-12 w-12 shrink-0
                          items-center justify-center

                          rounded-2xl
                          bg-white

                          shadow-sm
                        "
                      >
                        <Mail size={22} className="text-blue-600" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4
                          className="
                            text-lg
                            font-semibold
                            text-slate-900
                          "
                        >
                          Join the newsletter
                        </h4>

                        <p
                          className="
                            mt-2

                            text-sm
                            leading-7

                            text-slate-600
                          "
                        >
                          Receive thoughtful letters, poetry reflections, and
                          exclusive writings directly in your inbox.
                        </p>

                        <Link
                          to="/newsletter"
                          onClick={onClose}
                          className="
                            mt-5

                            inline-flex
                            items-center gap-2

                            rounded-2xl

                            bg-blue-600

                            px-5 py-3

                            text-sm
                            font-medium

                            text-white

                            transition-all
                            hover:scale-[1.02]
                            hover:bg-blue-700
                          "
                        >
                          Subscribe
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* footer */}
              <div
                className="
                  mt-8

                  text-center

                  text-xs
                  tracking-wide

                  text-slate-400
                "
              >
                No spam · Thoughtfully written · Unsubscribe anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
