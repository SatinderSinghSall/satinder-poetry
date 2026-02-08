import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* soft background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-slate-100 to-slate-200" />

      {/* center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_60%)]" />

      <div className="relative text-center px-6 max-w-3xl">
        {/* title */}
        <h1 className="text-6xl md:text-7xl font-serif font-semibold tracking-wide text-slate-800 mb-8">
          Poetry Web
        </h1>

        {/* quote */}
        <p className="italic text-xl text-slate-600 mb-3">
          “Words that touch the soul”
        </p>

        <p className="text-sm text-slate-500 mb-12">— Satinder Singh Sall</p>

        {/* CTA */}
        <Link to="/poems">
          <Button
            size="lg"
            variant="outline"
            className="px-10 py-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            Explore Poems
          </Button>
        </Link>
      </div>
    </section>
  );
}
