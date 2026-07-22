import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import { SuggestBookModal } from "../SuggestBookModal";

export function SuggestBookCallout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="w-full bg-gradient-to-b from-[#141312] via-[#1A1918] to-[#141312] text-stone-100 py-20 sm:py-24 my-20 border-y border-amber-500/20 relative overflow-hidden shadow-2xl">
        {/* Subtle Luxury Ambient Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/10 via-amber-200/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Decorative Delicate Border Accent */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16">
            {/* Left Narrative Content */}
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-sans font-semibold tracking-widest text-amber-300 uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Reader Recommendations</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-normal text-stone-50 tracking-tight leading-[1.25]">
                Is there a book that changed how you see story or verse?
              </h3>

              <p className="text-base sm:text-lg text-stone-300/90 font-light leading-relaxed pt-1">
                Suggestions are always welcome. If there's a collection, essay,
                or novel Satinder should explore next, share your recommendation
                with the room.
              </p>
            </div>

            {/* Right Action / CTA Buttons Stack */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-stretch gap-3.5 flex-shrink-0 pt-2 lg:pt-0 w-full sm:w-auto">
              {/* Primary Action Button */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-200 rounded-full blur-md opacity-30 group-hover:opacity-80 transition duration-500 group-hover:duration-200" />

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="relative w-full inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-stone-100 text-stone-950 text-sm font-semibold tracking-wide hover:bg-amber-50 transition-all duration-300 shadow-2xl active:scale-[0.98] cursor-pointer"
                >
                  <span>Suggest a Title</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-800 group-hover:text-stone-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Enhanced Premium Secondary Button */}
              <Link
                to="/books"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-stone-900/60 backdrop-blur-xl text-stone-300 hover:text-amber-100 text-sm font-medium tracking-wide border border-stone-700/50 hover:border-amber-400/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.18)] active:scale-[0.98] overflow-hidden"
              >
                {/* Light reflection sheen on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <BookOpen className="w-4 h-4 text-amber-400/70 group-hover:text-amber-300 group-hover:scale-110 transition-all duration-300" />
                <span>Explore Book List</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 opacity-60 group-hover:opacity-100" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Injection */}
      <SuggestBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
