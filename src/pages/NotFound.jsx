import { Link } from "react-router-dom";
import { Feather } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-[75vh] flex items-center justify-center px-6">
      {/* Soft paper glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white pointer-events-none" />

      <div className="relative max-w-xl text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className="flex items-center justify-center
               w-16 h-16 rounded-full
               bg-neutral-100
               border border-neutral-200
               text-neutral-500"
          >
            <Feather size={28} strokeWidth={1.5} />
          </div>
        </div>

        {/* 404 */}
        <h1 className="font-serif text-7xl md:text-8xl text-neutral-900 tracking-wide">
          404
        </h1>

        {/* Poetic Line */}
        <p className="font-serif text-2xl md:text-3xl text-neutral-700 leading-relaxed">
          “This page was never written.”
        </p>

        {/* Subtext */}
        <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
          You followed a path that ends in silence.
          <br className="hidden md:block" />
          The rest of the verses are still waiting for you.
        </p>

        {/* Action */}
        <div className="pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2
                       px-7 py-3 rounded-full
                       border border-neutral-300
                       text-neutral-700 font-light
                       hover:bg-neutral-100 hover:text-neutral-900
                       transition-all duration-300"
          >
            Return to the beginning
          </Link>
        </div>
      </div>
    </main>
  );
}
