import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const poems = [
  {
    id: 1,
    title: "Whispers of the Wind",
    author: "Emily Rose",
    excerpt: "The wind remembers every name we never said aloud.",
  },
  {
    id: 2,
    title: "Midnight Sun",
    author: "John Doe",
    excerpt: "Even in darkness, the sun learns how to wait.",
  },
  {
    id: 3,
    title: "Echoes of Love",
    author: "Sarah Lynn",
    excerpt: "Love never leaves, it only learns to echo.",
  },
];

export default function FeaturedPoems() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-serif text-slate-800 mb-4">
            Featured Poems
          </h2>
          <p className="text-slate-500 text-sm">
            A small collection of verses chosen for quiet moments.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {poems.map((poem) => (
            <Card
              key={poem.id}
              className="
                rounded-3xl
                border border-slate-200
                bg-white/80
                backdrop-blur
                shadow-sm
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-lg
              "
            >
              <CardContent className="p-10 flex flex-col h-full text-center">
                <h3 className="text-2xl font-serif text-slate-800 mb-3 leading-snug">
                  “{poem.title}”
                </h3>

                <p className="text-sm text-slate-500 mb-4">— {poem.author}</p>

                {/* Excerpt */}
                <p className="text-sm text-slate-600 italic mb-8">
                  {poem.excerpt}
                </p>

                {/* CTA */}
                <Link
                  to={`/poems/${poem.id}`}
                  className="mt-auto inline-flex items-center justify-center
                             text-slate-700 font-medium
                             hover:text-black transition"
                >
                  Read poem →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <Link
            to="/poems"
            className="text-sm text-slate-600 hover:text-slate-900 transition"
          >
            View all poems →
          </Link>
        </div>
      </div>
    </section>
  );
}
