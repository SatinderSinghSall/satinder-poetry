import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative py-40 overflow-hidden">
      {/* soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-slate-100 to-stone-200" />

      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06),transparent_60%)]" />

      <div className="relative text-center max-w-3xl mx-auto px-6">
        <h2 className="text-5xl font-serif text-slate-800 mb-6">
          Share Your Poetry
        </h2>

        <p className="text-slate-600 mb-12 text-lg">
          Let your words inspire hearts around the world.
        </p>

        <Link to="/submit">
          <Button
            size="lg"
            className="px-12 py-7 text-lg rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
          >
            Submit Your Poem
          </Button>
        </Link>
      </div>
    </section>
  );
}
