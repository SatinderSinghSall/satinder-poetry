import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

export default function BlogNavigationCTA({
  kicker = "The Blog Archive",
  title = "Explore More Thoughts & Writings",
  description = "Dive into our full collection of articles, essays, and stories on life, literature, and creative process.",
  buttonText = "Read All Blogs",
  blogUrl = "/blogs",
}) {
  return (
    <aside className="my-12 mx-auto max-w-[1240px] px-4 sm:px-6">
      <div
        className="
          relative 
          overflow-hidden 
          rounded-2xl 
          border-2 
          border-stone-900 
          bg-[#f4efe4] 
          p-6 
          sm:p-10 
          md:p-12 
          shadow-[6px_6px_0px_0px_rgba(28,24,20,1)] 
          transition-all 
          duration-300
        "
      >
        {/* Subtle Background Halftone/Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1c1814 1.2px, transparent 1.2px)",
            backgroundSize: "14px 14px",
          }}
        />

        {/* Large Faded Decorative Serif Watermark */}
        <span
          aria-hidden="true"
          className="
            absolute 
            -right-4 
            -bottom-8 
            text-[90px] 
            sm:text-[140px] 
            md:text-[180px] 
            leading-none 
            font-bold 
            text-stone-900/[0.04] 
            pointer-events-none 
            select-none
          "
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontStyle: "italic",
          }}
        >
          Stories
        </span>

        {/* Main Content Layout */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left Text Block */}
          <div className="max-w-2xl">
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/10 border border-amber-800/20 text-amber-900 font-mono text-[10.5px] tracking-[0.22em] uppercase mb-4">
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>{kicker}</span>
            </div>

            {/* Title with Serif Highlight */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight leading-[1.15]">
              Explore More{" "}
              <span
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#b45309",
                }}
              >
                Thoughts & Writings.
              </span>
            </h3>

            {/* Description */}
            <p className="mt-3 text-stone-700 text-sm sm:text-base leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* Right Action Area */}
          <div className="w-full md:w-auto shrink-0">
            <Link to={blogUrl} className="block w-full md:w-auto">
              <button
                className="
                  group 
                  relative 
                  w-full 
                  md:w-auto 
                  inline-flex 
                  items-center 
                  justify-center 
                  gap-4 
                  bg-stone-900 
                  text-[#ede7d6] 
                  font-mono 
                  text-[12px] 
                  tracking-[0.2em] 
                  uppercase 
                  px-8 
                  py-4 
                  rounded-xl 
                  border-2 
                  border-stone-900 
                  shadow-[4px_4px_0px_0px_rgba(180,83,9,1)] 
                  hover:-translate-y-[2px] 
                  hover:translate-x-[2px] 
                  hover:shadow-[6px_6px_0px_0px_rgba(180,83,9,1)] 
                  active:translate-y-0 
                  active:shadow-none 
                  transition-all 
                  duration-200 
                  cursor-pointer
                "
              >
                <span className="relative z-10 font-semibold">
                  {buttonText}
                </span>
                <div className="relative z-10 w-7 h-7 rounded-full bg-amber-700/30 flex items-center justify-center transition-colors group-hover:bg-amber-600">
                  <ArrowRight className="w-4 h-4 text-amber-400 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
