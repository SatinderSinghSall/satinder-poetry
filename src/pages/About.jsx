import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Quote,
  Coffee,
  Sparkles,
  Users,
  MapPin,
} from "lucide-react";

import aboutImage1 from "../assets/images/about-image1.png";
import aboutImage2 from "../assets/images/about-image2.jpeg";
import aboutImage3 from "../assets/images/about-image3.jpeg";
import aboutImage4 from "../assets/images/about-image4.jpeg";

const chapters = [
  {
    num: "01",
    kicker: "Origin",
    title: "Poetry arrived before I knew how to explain myself.",
    body: "Some emotions are easier to write than to speak. Long before this platform existed, there were scattered notes, unfinished paragraphs, late-night thoughts, and lines typed into empty screens. Poetry became a quiet place to keep memories alive — the beautiful ones, the painful ones, and the ones too complicated to name.",
  },
  {
    num: "02",
    kicker: "Duality",
    title: "By day I build systems. By night I build worlds.",
    body: "I’ve always lived between logic and emotion. As a full-stack developer, I spend my time building interfaces, architecting systems, and creating digital experiences. But somewhere between code editors and terminal windows, there has always been literature, stories, music, films, and poetry. Satinder Poetry became the place where both sides finally met.",
  },
  {
    num: "03",
    kicker: "Future",
    title: "I want this place to feel human.",
    body: "The internet moves fast. This space doesn’t have to. I want Satinder Poetry to remain quiet, reflective, cinematic, and deeply personal — a place where stories matter more than algorithms. Maybe one day it becomes a larger creative universe. For now, it remains a collection of thoughts, written honestly and shared gently.",
  },
];

const memories = [
  {
    image: aboutImage1,
    title: "Airport Windows",
    text: "Some stories begin while waiting for departures.",
    footer: "Movement · Silence · Transit",
  },
  {
    image: aboutImage2,
    title: "Rainy Evenings",
    text: "The kind of weather that makes old memories louder.",
    footer: "Monsoon Notes · 2AM",
  },
  {
    image: aboutImage3,
    title: "Late Night Writing",
    text: "Most poems arrived long after the world went quiet.",
    footer: "After Midnight · Draft 47",
  },
  {
    image: aboutImage4,
    title: "Passing Cities",
    text: "Some places stay with us longer than people do.",
    footer: "Windowside Thoughts",
  },
];

const aboutImages = [aboutImage1, aboutImage2, aboutImage3, aboutImage4];

function useCounter(target, durationMs = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    let start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / durationMs);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return val;
}

const EditorialAbout = () => {
  const yrs = useCounter(3);
  const issues = useCounter(32);
  const subs = useCounter(14820);
  const hands = useCounter(4);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % aboutImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-[#ede7d6] text-stone-900 min-h-screen"
      style={{ fontFamily: '"Space Grotesk", ui-sans-serif, system-ui' }}
    >
      {/* Top strip */}
      <div className="border-b border-stone-900/20">
        <div className="mx-auto max-w-[1240px] px-6 py-3 flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase text-stone-600">
          <span>Satinder Poetry · Est. Quietly</span>
          <span className="hidden sm:inline">Vol. 01 · About the Author</span>
          <span>↳ somewhere between stories & silence</span>
        </div>
      </div>

      {/* Author Header */}
      <section className="px-6 pt-20 sm:pt-24 pb-8 overflow-hidden">
        <div className="mx-auto max-w-[1240px]">
          {/* Small Top Label */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-12 bg-stone-400" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-stone-500">
              Editorial Feature · Volume 01
            </p>
            <div className="h-px w-12 bg-stone-400" />
          </div>

          {/* Main Typography Block */}
          <div className="relative text-center">
            {/* Background Word */}
            <h1
              className="absolute left-1/2 -translate-x-1/2 top-0 text-[90px] sm:text-[150px] md:text-[220px] lg:text-[300px] leading-none font-bold text-stone-900/[0.04] pointer-events-none select-none"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Poetry
            </h1>

            {/* Foreground */}
            <div className="relative z-10">
              <h2 className="text-[52px] sm:text-[82px] md:text-[120px] lg:text-[150px] leading-[0.9] tracking-[-0.06em] font-bold text-stone-900">
                About the
              </h2>

              <h1
                className="-mt-2 sm:-mt-4 text-[64px] sm:text-[110px] md:text-[160px] lg:text-[200px] leading-[0.85]"
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#b45309",
                }}
              >
                Author
              </h1>

              {/* Name */}
              <div className="mt-8 sm:mt-10">
                <h2
                  className="mt-8 text-[28px] sm:text-[42px] md:text-[54px] lg:text-[68px] leading-none tracking-[-0.04em] text-stone-900"
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontWeight: 500,
                  }}
                >
                  Satinder Singh Sall
                </h2>

                <p
                  className="mt-4 text-[26px] sm:text-[38px] md:text-[48px] text-stone-800"
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  Author · Storyteller · Poet
                </p>

                {/* Small poetic line */}
                <p className="mt-5 max-w-xl mx-auto text-[14px] sm:text-[16px] leading-relaxed text-stone-600">
                  Somewhere between airport windows, unfinished thoughts,
                  rain-soaked evenings, and the quiet need to turn emotions into
                  words.
                </p>
              </div>
            </div>

            {/* Decorative Line */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="h-px w-16 sm:w-24 bg-stone-400" />
              <div className="w-2 h-2 rounded-full bg-amber-700" />
              <div className="h-px w-16 sm:w-24 bg-stone-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="px-6 pt-16 pb-20">
        <div className="mx-auto max-w-[1240px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-amber-800 mb-5">
              ◆ About · the long version
            </p>
            <h1 className="text-[56px] sm:text-[88px] leading-[0.92] tracking-[-0.04em] font-bold">
              Words became the place{" "}
              <span
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#b45309",
                }}
              >
                I returned to.
              </span>
            </h1>
            <p className="mt-7 text-[17.5px] leading-[1.6] max-w-xl text-stone-700">
              Satinder Poetry began quietly — somewhere between late-night
              thoughts, unfinished stories, airport windows, rain, music, and
              the need to put emotions into words. What started as private
              reflections slowly became a space for poetry, storytelling,
              memories, and the fragile human moments we often leave unspoken.
              This isn’t just a poetry website. It’s a digital archive of
              feelings, silence, imagination, and the stories that stay with us.
            </p>
          </div>
          <div className="lg:col-span-5">
            {/* Halftone block */}
            <div
              className="aspect-[5/6] w-full border-2 border-stone-900 relative overflow-hidden"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #1c1814 1.4px, transparent 1.6px), radial-gradient(circle, #1c1814 1px, transparent 1.2px)",
                backgroundSize: "14px 14px, 7px 7px",
                backgroundPosition: "0 0, 7px 7px",
                backgroundColor: "#d3cab2",
              }}
            >
              {/* Image Layer */}
              <img
                src={aboutImages[currentImage]}
                alt="Satinder Poetry"
                className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-1000"
              />

              {/* Vintage Overlay */}
              <div className="absolute inset-0 bg-[#d3cab2]/20 mix-blend-multiply" />

              {/* Bottom Label */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#ede7d6] border border-stone-900 px-3 py-2 font-mono text-[10.5px] tracking-[0.18em] uppercase flex justify-between">
                <span>Plate 04-A</span>
                <span className="text-amber-800">
                  Fragments, memories & transit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y-2 border-stone-900 bg-[#e2dcc9]">
        <div className="mx-auto max-w-[1240px] px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { v: yrs, suffix: "yrs+", label: "Writing quietly" },
            { v: 120, suffix: null, label: "Poems & reflections" },
            { v: 3, suffix: null, label: "Worlds explored" },
            { v: 1, suffix: null, label: "Human behind it all" },
          ].map((s) => (
            <div key={s.label} className="border-t-2 border-stone-900 pt-3">
              <div className="text-[44px] sm:text-[56px] leading-none tracking-[-0.04em] font-bold">
                {s.v.toLocaleString()}
                {s.suffix && (
                  <span
                    className="ml-1 text-amber-700"
                    style={{
                      fontFamily: '"Instrument Serif", serif',
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    {s.suffix}
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-[10.5px] tracking-[0.22em] uppercase text-stone-600">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex items-end justify-between mb-12 border-b border-stone-900 pb-3">
            <h2 className="font-mono text-[12px] tracking-[0.3em] uppercase">
              The whole story · in three pieces
            </h2>
            <span className="hidden sm:inline font-mono text-[11px] text-stone-600">
              §§ 01 — 03
            </span>
          </div>

          <div className="space-y-16">
            {chapters.map((c, i) => (
              <article
                key={c.num}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <div className="md:col-span-3">
                  <div
                    className="text-[88px] leading-[0.85] tracking-[-0.05em] font-bold text-stone-900/15"
                    style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                  >
                    {c.num}
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-amber-800 mt-2">
                    ◆ {c.kicker}
                  </p>
                </div>
                <div className="md:col-span-9 border-t border-stone-900 pt-4">
                  <h3 className="text-[34px] sm:text-[42px] leading-[1.05] tracking-[-0.025em] font-bold max-w-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-5 text-[16px] leading-[1.7] text-stone-700 max-w-2xl">
                    {c.body}
                  </p>
                  {i === 1 && (
                    <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.2em] uppercase border border-stone-900 px-3 py-1.5">
                      <Sparkles className="w-3 h-3 text-amber-700" />A method,
                      not a brand
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-stone-900 text-[#ede7d6]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Quote className="w-9 h-9 mx-auto text-amber-300" strokeWidth={1.5} />
          <blockquote
            className="mt-6 text-[28px] sm:text-[40px] leading-[1.18]"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            “We write because some emotions deserve a safer place to exist.”
          </blockquote>
          <p className="mt-6 font-mono text-[11px] tracking-[0.3em] uppercase text-stone-400">
            — Satinder Singh Sall, founding editor
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex items-end justify-between mb-10 border-b border-stone-900 pb-3">
            <h2 className="font-mono text-[12px] tracking-[0.3em] uppercase">
              ◆ Hands on deck
            </h2>
            <span className="hidden sm:inline font-mono text-[11px] text-stone-600">
              {memories.length} people · 1 kitchen
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {memories.map((m, i) => (
              <div
                key={m.title}
                className="border-2 border-stone-900 bg-[#fefbf2] p-5 relative"
                style={{
                  boxShadow: "4px 4px 0 0 rgba(0,0,0,0.12)",
                }}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber-800">
                  No. {String(i + 1).padStart(2, "0")}
                </div>

                {/* Image */}
                <div
                  className="mt-4 aspect-square w-full border border-stone-900/40 overflow-hidden relative"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #1c1814 1.2px, transparent 1.4px)",
                    backgroundSize: "10px 10px",
                    backgroundColor: "#d3cab2",
                  }}
                >
                  <img
                    src={m.image}
                    alt={m.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                </div>

                <h4 className="mt-4 text-[20px] tracking-[-0.02em] font-bold">
                  {m.title}
                </h4>

                <p className="mt-2 text-[14px] leading-relaxed text-stone-600">
                  {m.text}
                </p>

                <p className="mt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-stone-500 pt-3 border-t border-stone-300">
                  {m.footer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="border-t-2 border-stone-900 bg-[#e2dcc9] py-16 px-6">
        <div className="mx-auto max-w-[1240px] grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            {
              Icon: Coffee,
              t: "Built slowly",
              d: "Not everything meaningful needs to scale fast.",
            },
            {
              Icon: Users,
              t: "Made with emotion",
              d: "Every poem, story begins with something deeply felt.",
            },
            {
              Icon: MapPin,
              t: "Inspired by movement",
              d: "Airports, airplanes, cities, rain, and passing moments live inside these words.",
            },
          ].map((v) => (
            <div key={v.t}>
              <v.Icon className="w-5 h-5 text-amber-800" strokeWidth={1.5} />
              <h4 className="mt-4 text-[20px] tracking-[-0.02em] font-bold">
                {v.t}
              </h4>
              <p className="mt-1.5 text-[14.5px] text-stone-700 leading-relaxed">
                {v.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-amber-800">
          ◆ Next move
        </p>
        <h3 className="mt-3 text-[44px] sm:text-[64px] leading-[0.95] tracking-[-0.035em] font-bold">
          Maybe{" "}
          <span
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            you'll find a piece of yourself here.
          </span>
        </h3>
        <div className="mt-8 inline-flex items-center gap-5">
          <Link to="/poems">
            <button
              className="
                group
                relative
                inline-flex
                items-center
                gap-3
                overflow-hidden
                bg-stone-900
                text-[#ede7d6]
                font-mono
                text-[12px]
                tracking-[0.18em]
                uppercase
                px-7
                py-3.5
                border-2
                border-stone-900
                cursor-pointer
                transition-all
                duration-300
                shadow-[5px_5px_0px_0px_rgba(120,113,108,0.7)]
                hover:-translate-y-[2px]
                hover:translate-x-[2px]
                hover:shadow-[8px_8px_0px_0px_rgba(120,113,108,0.45)]
                active:translate-y-[2px]
                active:shadow-[2px_2px_0px_0px_rgba(120,113,108,0.4)]
            "
            >
              {/* Vintage texture overlay */}
              <span className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[size:10px_10px]" />

              {/* Text */}
              <span className="relative z-10">Browse Poems</span>

              {/* Arrow */}
              <ArrowRight
                className="
                    relative
                    z-10
                    w-4
                    h-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-[1px]
                "
              />
            </button>
          </Link>

          <Link to="/newsletter">
            <button
              className="
                relative
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3.5
                font-mono
                text-[12px]
                tracking-[0.18em]
                uppercase
                border-2
                border-stone-900
                bg-[#f3eee2]
                text-stone-900
                transition-all
                duration-150
                cursor-pointer
                shadow-[4px_4px_0px_0px_rgba(28,24,20,1)]
                hover:translate-x-[2px]
                hover:translate-y-[2px]
                hover:shadow-[2px_2px_0px_0px_rgba(28,24,20,1)]
                active:translate-x-[4px]
                active:translate-y-[4px]
                active:shadow-none
            "
            >
              Subscribe to Newsletter
            </button>
          </Link>
        </div>
      </section>

      {/* Portfolio CTA */}
      <section className="px-6 py-28 border-t border-stone-900/20 bg-[#e7e0cf] overflow-hidden">
        <div className="mx-auto max-w-[1240px] relative">
          {/* Background Word */}
          <h2
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[120px] sm:text-[180px] lg:text-[260px] leading-none text-stone-900/[0.04] pointer-events-none select-none"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Portfolio
          </h2>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left */}
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-amber-800 mb-5">
                ◆ Beyond the poetry
              </p>

              <h3 className="text-[42px] sm:text-[64px] md:text-[82px] leading-[0.92] tracking-[-0.05em] font-bold text-stone-900">
                The developer{" "}
                <span
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#b45309",
                  }}
                >
                  behind
                </span>{" "}
                the words.
              </h3>

              <p className="mt-7 text-[16px] sm:text-[18px] leading-[1.8] text-stone-700 max-w-2xl">
                Satinder Poetry is only one side of the story. Beyond literature
                and storytelling, I build immersive digital experiences through
                full-stack engineering, cinematic UI design, and modern web
                technologies.
              </p>

              <p className="mt-5 text-[15px] leading-[1.8] text-stone-600 max-w-2xl">
                From scalable platforms to emotionally-driven interfaces — my
                portfolio explores the intersection of technology, creativity,
                interaction, and storytelling.
              </p>
            </div>

            {/* Right */}
            <div className="lg:col-span-5 flex lg:justify-end">
              <a
                href="https://satinder-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                    group
                    relative
                    inline-flex
                    items-center
                    gap-4
                    overflow-hidden
                    bg-stone-900
                    text-[#ede7d6]
                    font-mono
                    text-[12px]
                    tracking-[0.18em]
                    uppercase
                    px-8
                    py-5
                    border-2
                    border-stone-900
                    transition-all
                    duration-300
                    shadow-[6px_6px_0px_0px_rgba(120,113,108,0.55)]
                    hover:-translate-y-[2px]
                    hover:translate-x-[2px]
                    hover:shadow-[10px_10px_0px_0px_rgba(120,113,108,0.35)]
                "
              >
                {/* Texture */}
                <span className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[size:10px_10px]" />

                <span className="relative z-10">Explore Full Portfolio</span>

                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-900/30">
        <div className="mx-auto max-w-[1240px] px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10.5px] tracking-[0.22em] uppercase text-stone-600">
          <span>Satinder Singh Sall</span>
          <span>Storyteller · Writer · Aviation Enthusiast</span>
          <span>satinderpoetry.com</span>
        </div>
      </footer>
    </div>
  );
};

export default EditorialAbout;
