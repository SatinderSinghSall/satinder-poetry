import { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SuggestBookModal } from "./SuggestBookModal";

export function SuggestBookCallout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="w-full bg-[#1A1918] text-stone-100 py-16 sm:py-20 my-16 border-y border-stone-800 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-12">
            {/* Left Narrative Content */}
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-widest text-amber-200/80 uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Reader Recommendations
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-stone-100 tracking-tight leading-snug">
                Is there a book that changed how you see story or verse?
              </h3>

              <p className="text-sm sm:text-base text-stone-400 font-light leading-relaxed">
                Suggestions are always welcome. If there's a collection, essay,
                or novel Satinder should explore next, share your recommendation
                with the room.
              </p>
            </div>

            {/* Right Action / CTA Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-stone-100 text-stone-900 text-sm font-medium hover:bg-amber-100 transition-all duration-300 shadow-xl shadow-black/20 hover:scale-[1.02] cursor-pointer"
              >
                <span>Suggest a Title</span>
                <ArrowUpRight className="w-4 h-4 text-stone-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
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
