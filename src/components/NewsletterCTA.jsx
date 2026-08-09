import { ArrowRight, Feather, Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewsletterCTA() {
  return (
    <div className="relative my-16 overflow-hidden rounded-[32px] bg-[#0d131a] p-8 sm:p-14 md:p-16 text-white shadow-2xl shadow-slate-950/20 border border-slate-800/80">
      {/* 1. Luxurious Ambient Glow Backgrounds */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-500/10 blur-[90px] pointer-events-none" />

      {/* 2. Elegant Background Pattern Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Editorial Pill Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-amber-300 uppercase backdrop-blur-md mb-8">
          <span>The Literary Circle</span>
        </div>

        {/* Decorative Floating Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/60 shadow-inner shadow-white/10 ring-1 ring-white/10">
          <Feather className="h-7 w-7 text-amber-200" />
        </div>

        {/* Headline with Serif Styling */}
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-100 leading-[1.15]">
          Quiet words, <br className="hidden sm:inline" />
          <span className="italic font-light text-amber-200/90">
            delivered gently.
          </span>
        </h3>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-slate-400 font-light">
          Join readers receiving newly published poems, quiet reflections, and
          editorial journal entries directly in their inbox.
        </p>

        {/* Value Micro-Points */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-amber-400" /> Weekly poetry
            updates
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-amber-400" /> Exclusive excerpts
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-amber-400" /> No spam ever
          </span>
        </div>

        {/* Primary Action Button */}
        <div className="mt-9 flex justify-center">
          <Link
            to="/newsletter"
            className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 px-8 py-4 text-sm font-semibold tracking-wide text-slate-950 shadow-xl shadow-amber-500/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-400/20 active:scale-[0.98]"
          >
            <span>Subscribe to Newsletter</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950/10 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-3.5 w-3.5 text-slate-950" />
            </div>
          </Link>
        </div>

        {/* Subtext */}
        <p className="mt-5 text-[11px] tracking-wider text-slate-500 uppercase font-medium">
          Free subscription • Unsubscribe anytime
        </p>
      </div>
    </div>
  );
}
