import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "This platform reignited my love for poetry.",
    name: "Anna Thompson",
  },
  {
    quote: "Every poem feels like a quiet conversation with the soul.",
    name: "Rahul Mehta",
  },
  {
    quote: "I come here when the world feels loud. It always helps.",
    name: "Emily Carter",
  },
  {
    quote: "Poetry Web reminds me why words still matter.",
    name: "Daniel Brooks",
  },
  {
    quote: "Reading here feels slow, intentional, and deeply human.",
    name: "Sofia Alvarez",
  },
  {
    quote: "A rare space on the internet that respects silence.",
    name: "Michael Chen",
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* soft paper background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-white" />

      {/* gentle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04),transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Section label */}
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-6">
          Voices from our readers
        </p>

        {/* Quotes */}
        <div className="relative h-40 md:h-32 flex items-center justify-center">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute transition-all duration-700 ease-out
                ${
                  i === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
            >
              <p className="text-2xl md:text-3xl font-serif italic text-slate-700 leading-relaxed mb-8">
                “{t.quote}”
              </p>

              <p className="text-sm tracking-wide text-slate-500">— {t.name}</p>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-all
                ${i === index ? "bg-slate-700 w-4" : "bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
