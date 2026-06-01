import {
  Facebook,
  Instagram,
  Github,
  Linkedin,
  BookOpen,
  Feather,
  Twitter,
  Youtube,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function SocialLinks() {
  const socials = [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/satinder-singh-sall-b62049204/",
      Icon: Linkedin,
    },
    {
      name: "GitHub",
      link: "https://github.com/SatinderSinghSall",
      Icon: Github,
    },
    {
      name: "X",
      link: "https://x.com/SallSatinder",
      Icon: Twitter,
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/@satindersinghsall.3841/featured",
      Icon: Youtube,
    },
    {
      name: "Facebook",
      link: "https://www.facebook.com/satinder.singhsall",
      Icon: Facebook,
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/satindersinghsall",
      Icon: Instagram,
    },
  ];

  return (
    <section className="relative overflow-hidden py-32 bg-[#f6f1ea]">
      {/* Vintage texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/old-wall.png')",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#c7a97b]/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Top label */}
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#9c856d] mb-5">
            Beyond The Poetry
          </p>

          <h2
            className="
              font-serif
              text-5xl
              md:text-6xl
              text-[#1d1b19]
              leading-tight
              mb-6
            "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            A Developer <span className="italic">&</span> Storyteller
          </h2>

          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#b89d7a] to-transparent" />
        </div>

        {/* Main content */}
        <div
          className="
            grid
            lg:grid-cols-2
            gap-14
            items-center
          "
        >
          {/* Left Side */}
          <div className="space-y-8">
            <p
              className="
                text-lg
                leading-9
                text-[#4a4036]
              "
              style={{
                fontFamily: "'Crimson Text', serif",
              }}
            >
              I build high-performance full-stack applications with a strong
              focus on modern UI/UX, scalability, security, and meaningful user
              experiences.
            </p>

            <p
              className="
                text-lg
                leading-9
                text-[#4a4036]
              "
              style={{
                fontFamily: "'Crimson Text', serif",
              }}
            >
              Beyond engineering, I’m deeply drawn to literature, poetry,
              stories, reflections, and the quiet emotional spaces words can
              create.
            </p>

            <p
              className="
                text-lg
                leading-9
                text-[#4a4036]
              "
              style={{
                fontFamily: "'Crimson Text', serif",
              }}
            >
              Currently pursuing an MCA at KIIT University while exploring
              modern mobile / web engineering, game development, and immersive
              digital storytelling.
            </p>

            {/* Literary Quote Card */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
                border border-[#d8c7b0]
                bg-white/70
                backdrop-blur-md
                p-8
                shadow-[0_10px_40px_rgba(0,0,0,0.05)]
              "
            >
              <div className="absolute top-0 left-0 h-full w-1 bg-[#c4a484]" />

              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#9f7f5b]">
                  <BookOpen size={22} />
                </div>

                <div>
                  <p
                    className="
                      italic
                      text-xl
                      text-[#2d2620]
                      leading-9
                    "
                    style={{
                      fontFamily: "'Crimson Text', serif",
                    }}
                  >
                    “Some stories are written in code.
                    <br />
                    Others are written in silence.”
                  </p>

                  <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[#9a846b]">
                    — Satinder Singh Sall
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div
            className="
            relative
            rounded-[36px]
            border border-[#ddcfbc]
            bg-white/60
            backdrop-blur-xl
            p-10
            shadow-[0_20px_80px_rgba(0,0,0,0.08)]
          "
          >
            {/* Floating feather */}
            <div className="absolute -top-5 -right-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d7c2a8] bg-[#fffaf5] shadow-lg">
              <Feather size={24} className="text-[#9b7d5d]" />
            </div>

            <p className="text-[11px] uppercase tracking-[0.4em] text-[#9b8469] mb-8">
              Find Me Elsewhere
            </p>

            {/* Social Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socials.map(({ name, link, Icon }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border border-[#e5d9ca]
                  bg-white/70
                  px-5
                  py-5
                  transition-all
                  duration-500
                  hover:-translate-y-1.5
                  hover:border-[#b79874]
                  hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
                "
                >
                  {/* Hover shine */}
                  <div
                    className="
                    absolute
                    inset-0
                    opacity-0
                    bg-gradient-to-r
                    from-transparent
                    via-white/40
                    to-transparent
                    -translate-x-full
                    transition-all
                    duration-700
                    group-hover:opacity-100
                    group-hover:translate-x-full
                  "
                  />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Social Icon */}
                      <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-[#f5ede4]
                        text-[#7b6247]
                        transition-all
                        duration-500
                        group-hover:bg-[#b79874]
                        group-hover:text-white
                        group-hover:scale-110
                        group-hover:rotate-6
                      "
                      >
                        <Icon size={20} />
                      </div>

                      <div>
                        <p className="text-lg font-medium text-[#2d2620]">
                          {name}
                        </p>

                        <p className="text-sm text-[#8f7b67]">
                          Connect & explore
                        </p>
                      </div>
                    </div>

                    {/* Animated Arrow */}
                    <ArrowUpRight
                      size={18}
                      className="
                      text-[#a58c73]
                      transition-all
                      duration-300
                      group-hover:text-[#7b6247]
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                    />
                  </div>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-10 pt-8 border-t border-[#e6d8c8]">
              <p
                className="
                  text-center
                  text-base
                  italic
                  text-[#7f6b57]
                "
                style={{
                  fontFamily: "'Crimson Text', serif",
                }}
              >
                “Words travel farther when shared.”
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-26 flex justify-center">
          <Link
            to="/about-me"
            className="
            group
            relative
            inline-flex
            items-center
            justify-center

            w-[340px]
            md:w-[420px]

            gap-4
            overflow-hidden

            border-2
            border-stone-900

            bg-[#f6efe2]

            px-10
            py-5

            font-mono
            text-[13px]
            tracking-[0.25em]
            uppercase

            text-stone-900

            transition-all
            duration-300

            shadow-[5px_5px_0px_0px_rgba(28,24,20,0.18)]

            hover:translate-x-[2px]
            hover:translate-y-[2px]

            hover:shadow-[2px_2px_0px_0px_rgba(28,24,20,0.12)]
          "
          >
            {/* Texture */}
            <div
              className="
                    absolute inset-0 opacity-[0.05]

                    bg-[radial-gradient(circle,#000_1px,transparent_1px)]
                    bg-[size:10px_10px]

                    pointer-events-none
                  "
            />

            <span className="relative z-10">Enter the Story</span>

            <ArrowRight
              className="
                    relative z-10

                    w-4 h-4

                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                    group-hover:-translate-y-[1px]
                  "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
