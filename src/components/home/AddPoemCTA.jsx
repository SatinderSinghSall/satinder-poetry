import { Link } from "react-router-dom";
import { Feather, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

import AddPoemCTA_Main from "../AddPoemCTA_Main";

export default function AddPoemCTA() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-stone-100 shadow-2xl my-12">
      {/* Subtle Background Glow Accent */}
      <div className="absolute -top-24 -left-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-stone-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Grid / Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 text-center max-w-3xl mx-auto space-y-6">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase">
          <span>Author Contributions</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
          Have a Poem Worth Sharing with the World?
        </h2>

        {/* Subtitle */}
        <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
          Submit your work directly to curator{" "}
          <strong className="text-amber-300 font-normal">
            Satinder Singh Sall
          </strong>{" "}
          for editorial review, or request direct author posting permissions.
        </p>

        {/* Action Button & Link */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/add-poem-portal" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-8 py-6 rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2 group cursor-pointer">
              <Feather className="w-4 h-4 text-slate-950" />
              <span>Enter Poet's Portal</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 font-light">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Full Author Attribution</span>
          </div>
          <span className="hidden sm:inline text-stone-700">•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Editorial Guidance</span>
          </div>
        </div>
      </div>

      <AddPoemCTA_Main />
    </section>
  );
}
