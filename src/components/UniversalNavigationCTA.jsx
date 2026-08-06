import { Link } from "react-router-dom";
import {
  Scroll,
  BookOpen,
  Feather,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function UniversalNavigationCTA() {
  const portalCards = [
    {
      id: "poems",
      title: "Explore Poems",
      subtitle: "Curated Verses & Reflections",
      description:
        "Immerse yourself in a growing library of evocative contemporary poetry, stanzas, and literary thoughts.",
      badge: "Library",
      link: "/poems",
      icon: Scroll,
      accentColor: "from-amber-500/20 to-transparent",
      badgeColor: "text-amber-700 bg-amber-100/60 border-amber-200",
      buttonText: "Read Collection",
    },
    {
      id: "books",
      title: "Published Books",
      subtitle: "Printed & Digital Works",
      description:
        "Discover complete poetry anthologies and published works available for your personal collection.",
      badge: "Publications",
      link: "/books",
      icon: BookOpen,
      accentColor: "from-stone-400/20 to-transparent",
      badgeColor: "text-stone-700 bg-stone-100 border-stone-200",
      buttonText: "Browse Publications",
    },
    {
      id: "portal",
      title: "Poet's Access Portal",
      subtitle: "Contributor Space",
      description:
        "Share your voice. Submit poem drafts for editorial review or request direct contributor permissions.",
      badge: "Contributions",
      link: "/add-poem-portal",
      icon: Feather,
      accentColor: "from-amber-400 to-amber-600",
      badgeColor: "text-amber-900 bg-amber-300 font-semibold border-amber-400",
      buttonText: "Submit Your Draft",
      featured: true,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-[#0F172A] text-slate-100 shadow-2xl my-16 p-8 sm:p-12 lg:p-16 border border-slate-800">
      {/* Editorial Glowing Accents */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase">
          <span>Literary Experience</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
          Immerse Yourself in the Craft
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
          Whether you seek inspiration, published collections, or a stage for
          your own work—explore the pathways below.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {portalCards.map((card) => {
          const IconComp = card.icon;
          return (
            <Link
              key={card.id}
              to={card.link}
              className={`group relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 transform hover:-translate-y-1.5 ${
                card.featured
                  ? "bg-gradient-to-b from-slate-800/90 to-slate-900 border-2 border-amber-500/50 shadow-xl shadow-amber-500/5 hover:border-amber-400"
                  : "bg-slate-800/40 border border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-500/80"
              }`}
            >
              {/* Card Top Header */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3.5 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                      card.featured
                        ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                        : "bg-slate-900 text-amber-400 border border-slate-700"
                    }`}
                  >
                    <IconComp className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <span
                    className={`text-[11px] font-mono tracking-wider uppercase px-3 py-1 rounded-full border ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-amber-400/90 font-medium tracking-wide uppercase">
                    {card.subtitle}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {card.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card Bottom CTA */}
              <div className="pt-8 mt-6 border-t border-slate-700/50 flex items-center justify-between">
                <span
                  className={`text-xs font-semibold tracking-wide transition-colors ${
                    card.featured
                      ? "text-amber-400 group-hover:text-amber-300"
                      : "text-slate-300 group-hover:text-white"
                  }`}
                >
                  {card.buttonText}
                </span>

                <div
                  className={`p-2 rounded-full transition-all duration-300 ${
                    card.featured
                      ? "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950"
                      : "bg-slate-900 text-slate-400 group-hover:text-amber-400 group-hover:bg-slate-700"
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
