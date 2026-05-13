import {
  Facebook,
  Instagram,
  Github,
  Linkedin,
  BookOpen,
  Feather,
} from "lucide-react";

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
              modern mobile / web engineering, game development, and immersive digital
              storytelling.
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

            <div className="space-y-5">
              {socials.map(({ name, link, Icon }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border border-[#e5d9ca]
                    bg-white/70
                    px-6
                    py-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#b79874]
                    hover:shadow-xl
                  "
                >
                  <div className="flex items-center gap-4">
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
                        transition
                        group-hover:bg-[#b79874]
                        group-hover:text-white
                      "
                    >
                      <Icon size={20} />
                    </div>

                    <div className="text-left">
                      <p className="text-lg text-[#2d2620] font-medium">
                        {name}
                      </p>

                      <p className="text-sm text-[#8f7b67]">
                        Connect & explore
                      </p>
                    </div>
                  </div>

                  <span className="text-[#a58c73] transition group-hover:translate-x-1">
                    →
                  </span>
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
      </div>
    </section>
  );
}
