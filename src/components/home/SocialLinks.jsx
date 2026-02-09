import { Twitter, Facebook, Instagram, Github, Linkedin } from "lucide-react";

export default function SocialLinks() {
  const socials = [
    { name: "Twitter", link: "#", Icon: Twitter },
    { name: "Facebook", link: "#", Icon: Facebook },
    { name: "Instagram", link: "#", Icon: Instagram },
    { name: "GitHub", link: "#", Icon: Github },
    { name: "LinkedIn", link: "#", Icon: Linkedin },
  ];

  return (
    <section className="relative py-24">
      {/* soft background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-white" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Section label */}
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-6">
          Find us elsewhere
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4">
          {socials.map(({ name, link, Icon }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="
                group
                flex items-center gap-2
                px-5 py-3
                rounded-full
                border border-slate-200
                bg-white
                text-slate-600
                text-sm
                shadow-sm
                transition-all
                hover:-translate-y-0.5
                hover:shadow-md
                hover:text-slate-900
              "
            >
              <Icon
                size={16}
                className="text-slate-500 group-hover:text-slate-900 transition"
              />
              <span className="hidden sm:inline">{name}</span>
            </a>
          ))}
        </div>

        {/* Soft closing line */}
        <p className="mt-10 text-xs text-slate-400">
          Words travel farther when shared
        </p>
      </div>
    </section>
  );
}
