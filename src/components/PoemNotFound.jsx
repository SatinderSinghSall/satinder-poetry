import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function PoemNotFound() {
  return (
    <div className="relative w-full py-12 sm:py-20 flex justify-center items-center">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-full max-w-2xl h-64 bg-amber-100/40 rounded-full blur-3xl opacity-60" />
      </div>

      <div
        className="
          relative z-10
          w-full
          text-center
          rounded-[34px]
          border border-white/50
          bg-white/50 backdrop-blur-2xl
          px-6 py-16 sm:px-12 sm:py-24
          shadow-[0_10px_60px_rgba(0,0,0,0.05)]
          transition-all duration-300
        "
      >
        {/* Floating Icon Container */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-amber-200/40 rounded-3xl blur-md" />
          <div className="relative p-5 rounded-3xl bg-gradient-to-b from-stone-50 to-amber-50/50 border border-stone-200/80 shadow-inner text-stone-700">
            <FileQuestion className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.25]" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight">
          Verse Lost in the Winds
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-xl mx-auto text-stone-600 text-base sm:text-lg leading-relaxed font-light">
          The poem you’re looking for may have been moved, renamed, or perhaps
          was never written at all.
        </p>

        <p className="mt-2 italic font-serif text-stone-500 text-sm sm:text-base">
          "Some lines are written only in memory."
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <Link
            to="/poems"
            className="
              group
              inline-flex items-center gap-3
              rounded-full
              bg-stone-900 text-stone-50
              px-8 py-4
              text-xs sm:text-sm font-medium uppercase tracking-[0.2em]
              shadow-xl shadow-stone-900/10
              hover:bg-black hover:shadow-2xl hover:scale-[1.02]
              active:scale-100
              transition-all duration-300
            "
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Browse All Poems</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
