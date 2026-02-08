import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const poems = [
  { id: 1, title: "Whispers of the Wind", author: "Emily Rose" },
  { id: 2, title: "Midnight Sun", author: "John Doe" },
  { id: 3, title: "Echoes of Love", author: "Sarah Lynn" },
];

export default function FeaturedPoems() {
  return (
    <section className="py-28 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* section title */}
        <h2 className="text-4xl font-serif text-center text-slate-800 mb-16">
          Featured Poems
        </h2>

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {poems.map((poem) => (
            <Card
              key={poem.id}
              className="
                rounded-3xl
                border
                bg-white/80
                backdrop-blur
                shadow-sm
                hover:-translate-y-2
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              <CardContent className="p-10 text-center">
                <h3 className="text-2xl font-serif text-slate-800 mb-3 leading-relaxed">
                  “{poem.title}”
                </h3>

                <p className="text-sm text-slate-500 mb-6">— {poem.author}</p>

                <Link
                  to={`/poems/${poem.id}`}
                  className="text-slate-700 font-medium hover:text-black transition"
                >
                  Read poem →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
