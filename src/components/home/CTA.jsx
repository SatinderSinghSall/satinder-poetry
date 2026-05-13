import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative py-40 overflow-hidden">
      {/* soft paper gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-white to-stone-200" />

      {/* gentle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_60%)]" />

      <div className="relative text-center max-w-3xl mx-auto px-6">
        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-slate-800 mb-6 leading-tight">
          Let Your Words Be Heard
        </h2>

        {/* Subtext */}
        <p className="text-slate-600 mb-10 text-base sm:text-lg leading-relaxed">
          Poetry Web is a quiet place to share your voice — where your verses
          can travel gently and find the hearts they were meant for.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Submit Poem – Coming Soon */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="
                  px-12 py-7 text-lg rounded-3xl
                  bg-slate-900 text-white
                  shadow-md
                  hover:shadow-xl hover:-translate-y-0.5
                  transition
                "
              >
                Submit Your Poem
              </Button>
            </DialogTrigger>

            <DialogContent
              showCloseButton={false}
              className="
    overflow-hidden
    border border-white/10
    bg-[#111111]/95
    backdrop-blur-2xl
    text-white
    sm:max-w-lg
    rounded-[32px]
    p-0
    shadow-[0_20px_80px_rgba(0,0,0,0.6)]
  "
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2b2118]/40 via-transparent to-[#1a1a1a]" />

              {/* Decorative blur */}
              <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#d6b98c]/10 blur-3xl" />

              {/* Close Button */}
              <DialogClose asChild>
                <button
                  className="
      absolute right-5 top-5 z-20
      flex h-10 w-10 items-center justify-center
      rounded-full
      border border-white/10
      bg-white/5
      text-white/70
      backdrop-blur-md
      transition-all duration-300
      hover:bg-white/10
      hover:text-white
      hover:rotate-90
    "
                >
                  ✕
                </button>
              </DialogClose>

              {/* Content */}
              <div className="relative z-10 px-8 py-12 text-center">
                {/* Small label */}
                <p
                  className="
        mb-4
        text-[11px]
        uppercase
        tracking-[0.35em]
        text-[#c7b299]
      "
                >
                  Poetry Submission Portal
                </p>

                {/* Main heading */}
                <DialogTitle
                  className="
        font-serif
        text-4xl
        md:text-5xl
        text-[#f5efe6]
        leading-tight
      "
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Coming Soon
                </DialogTitle>

                {/* Decorative line */}
                <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-[#d6b98c] to-transparent" />

                {/* Description */}
                <DialogDescription
                  className="
        mx-auto
        max-w-md
        text-base
        leading-8
        text-[#d8d1c7]
      "
                  style={{
                    fontFamily: "'Crimson Text', serif",
                  }}
                >
                  We’re quietly building a gentle corner where poets can share
                  their verses, stories, and midnight thoughts.
                  <br />
                  <br />
                  The submission experience will arrive very soon.
                </DialogDescription>

                {/* Bottom actions */}
                <div className="mt-10 flex items-center justify-center gap-4">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="
      rounded-full
      border border-[#d6b98c]/30
      bg-white/5
      px-8 py-6
      text-sm
      uppercase
      tracking-[0.2em]
      text-[#f5efe6]
      backdrop-blur-md
      transition-all duration-300
      hover:bg-white/10
      hover:border-[#d6b98c]/60
      hover:scale-105
    "
                    >
                      I’ll Be Back ✨
                    </Button>
                  </DialogClose>
                </div>

                {/* Footer text */}
                <p className="mt-8 text-xs tracking-[0.25em] uppercase text-[#8f7d68]">
                  Crafted slowly • Written softly
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {/* Read Poems */}
          <Link to="/poems">
            <Button
              size="lg"
              variant="outline"
              className="
                px-12 py-7 text-lg rounded-3xl
                border-slate-400 text-slate-700
                hover:bg-slate-900 hover:text-white
                transition
              "
            >
              Read Poems
            </Button>
          </Link>
        </div>

        {/* Soft reassurance */}
        <p className="mt-10 text-xs text-slate-500">
          Free to share • Written by humans • Read with care
        </p>
      </div>
    </section>
  );
}
