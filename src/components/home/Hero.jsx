import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  "https://images.unsplash.com/photo-1474932430470-67c8d9aef3e8",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000
            ${i === index ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transitionProperty: "opacity, transform",
            transitionDuration: "4000ms",
          }}
        />
      ))}

      {/* Overlay layers */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl text-white">
        {/* Title */}
        <h1
          className="
            font-serif font-semibold tracking-wide
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            mb-6
          "
        >
          Satinder Poetry
        </h1>

        {/* Tagline */}
        <p
          className="
            italic text-base sm:text-lg md:text-xl
            text-slate-200 mb-2
          "
        >
          “Words that touch the soul”
        </p>

        <p className="text-xs sm:text-sm text-slate-300 mb-8">
          — Satinder Singh Sall
        </p>

        {/* Secondary poetic line */}
        <p
          className="
            text-sm sm:text-base text-slate-200
            max-w-xl mx-auto mb-10
          "
        >
          A quiet space for verses, emotions, and stories — written gently, read
          slowly.
        </p>

        {/* CTA group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/poems">
            <Button
              size="lg"
              className="
                px-10 py-6 rounded-2xl
                bg-white text-black
                hover:bg-slate-100
              "
            >
              Explore Poems
            </Button>
          </Link>

          <Link to="/register">
            <Button
              size="lg"
              variant="outline"
              className="
                px-10 py-6 rounded-2xl
                border-white/40 text-black
                hover:bg-white hover:text-black
              "
            >
              Join the Verse
            </Button>
          </Link>
        </div>

        {/* Subtle trust / mood line */}
        <p className="mt-10 text-xs text-slate-400">
          Read by lovers of words • Built for quiet minds
        </p>
      </div>
    </section>
  );
}
