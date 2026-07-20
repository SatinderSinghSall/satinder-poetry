import { BookMarked } from "lucide-react";

export function CuratorNote() {
  return (
    <div className="mt-20 mb-12 w-full border-y border-stone-200/80 bg-[#F5F3EF]/60 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Minimal Badge */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-300/60 mb-8">
          <div className="flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-stone-600" />
            <span className="text-xs font-semibold tracking-widest text-stone-500 uppercase">
              About This Shelf
            </span>
          </div>
          <span className="text-xs font-serif italic text-stone-500">
            Curated by Satinder
          </span>
        </div>

        {/* Human Narrative Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          <h3 className="md:col-span-4 text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Why these books?
          </h3>

          <div className="md:col-span-8 space-y-4">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Every piece of poetry or prose on this site draws from something
              read, re-read, or underlined. These are the books, poetry
              collections, and essays that shaped how I think about art,
              language, and feeling.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Whether you’re looking for quiet inspiration or your next
              late-night read, this shelf is a personal log of stories worth
              keeping close.
            </p>
          </div>
        </div>

        {/* Footer Info & Signature */}
        <div className="mt-10 pt-6 border-t border-stone-300/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            Updated periodically
          </div>
          <p className="font-serif italic text-base text-slate-900 font-medium">
            — Satinder Singh Sall
          </p>
        </div>
      </div>
    </div>
  );
}
