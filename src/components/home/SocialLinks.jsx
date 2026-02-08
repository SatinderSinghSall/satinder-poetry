import { Twitter, Facebook, Instagram, Github, Linkedin } from "lucide-react";

export default function SocialLinks() {
  const socials = [
    ["Twitter", "#", Twitter],
    ["Facebook", "#", Facebook],
    ["Instagram", "#", Instagram],
    ["GitHub", "#", Github],
    ["LinkedIn", "#", Linkedin],
  ];

  return (
    <section className="py-16 text-center">
      <div className="flex flex-wrap justify-center gap-8 text-slate-500">
        {socials.map(([name, link, Icon]) => (
          <a
            key={name}
            href={link}
            className="
              flex items-center gap-2
              hover:text-slate-900
              transition-colors
              text-sm
            "
          >
            <Icon size={18} />
            {name}
          </a>
        ))}
      </div>
    </section>
  );
}
