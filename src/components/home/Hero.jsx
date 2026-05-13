import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  // "https://images.unsplash.com/photo-1474932430470-67c8d9aef3e8",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#0f0d0b]">
      {/* Background Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-[5000ms]
          ${i === index ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Dark cinematic overlays */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0f0d0b]" />

      {/* Vintage grain texture */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.9)]" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center max-w-4xl text-[#f5f1ea]">
        {/* Small literary label */}
        <p
          className="
            uppercase tracking-[0.45em]
            text-[10px] sm:text-xs
            text-[#d8cfc1]
            mb-6
          "
        >
          Poetry • Stories • Reflections
        </p>

        {/* Main heading */}
        <h1
          className="
            font-serif
            font-semibold
            leading-none
            tracking-wide
            text-5xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            mb-8
          "
          style={{
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Satinder Poetry
        </h1>

        {/* Poetic quote */}
        <div className="space-y-4 mb-10">
          <p
            className="
              italic
              text-xl
              sm:text-2xl
              md:text-3xl
              text-[#f3eee6]
              leading-relaxed
            "
            style={{
              fontFamily: "'Crimson Text', serif",
            }}
          >
            “Some feelings arrive quietly.
            <br />
            Others become poems.”
          </p>

          <p className="text-sm sm:text-base text-[#c9b8a5] tracking-wide">
            — Satinder Singh Sall
          </p>
        </div>

        {/* Secondary line */}
        <p
          className="
            max-w-2xl
            mx-auto
            text-base
            sm:text-lg
            md:text-xl
            leading-relaxed
            text-[#ddd2c3]
            mb-14
          "
          style={{
            fontFamily: "'Crimson Text', serif",
          }}
        >
          Between silence and memory,
          <br className="hidden sm:block" />
          these verses learned to breathe.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link to="/poems">
            <Button
              size="lg"
              className="
                px-10 py-6
                rounded-full
                bg-white/10
                border border-white/20
                backdrop-blur-md
                text-white
                hover:bg-white/20
                transition-all duration-500
                tracking-[0.18em]
                uppercase
                text-xs
              "
            >
              Explore Poems
            </Button>
          </Link>

          <Link to="/register">
            <Button
              size="lg"
              variant="ghost"
              className="
                px-10 py-6
                rounded-full
                border border-[#d5c4ae]/30
                text-[#f3ede5]
                hover:bg-white/10
                hover:text-white
                tracking-[0.18em]
                uppercase
                text-xs
                transition-all duration-500
              "
            >
              Join the Verse
            </Button>
          </Link>
        </div>

        {/* Bottom subtle line */}
        <p
          className="
            mt-16
            text-xs
            tracking-[0.25em]
            uppercase
            text-[#9f8f7b]
          "
        >
          Written for quiet minds & restless hearts
        </p>
      </div>
    </section>
  );
}
