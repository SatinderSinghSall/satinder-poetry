import { Link } from "react-router-dom";
import { Scroll, BookOpen, Feather, ArrowUpRight, Images } from "lucide-react";

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
      badgeColor: "text-amber-900 bg-amber-300 font-semibold border-amber-400",
      buttonText: "Submit Your Draft",
      featured: true,
    },

    {
      id: "gallery",
      title: "Galleries & Images",
      subtitle: "Visual Archive",
      description:
        "Explore photographs, places, experiences, fragments, and memories collected along the way.",
      badge: "Gallery",
      link: "/gallery",
      icon: Images,
      badgeColor: "text-sky-700 bg-sky-100/60 border-sky-200",
      buttonText: "Explore Gallery",
    },
  ];

  return (
    <section
      className="
        relative
        my-16
        overflow-hidden
        rounded-[2.5rem]
        border
        border-slate-800
        bg-[#0F172A]
        p-8
        text-slate-100
        shadow-2xl
        sm:p-12
        lg:p-16
      "
    >
      {/* Editorial Glowing Accents */}
      <div
        className="
          pointer-events-none
          absolute
          -top-32
          left-1/2
          h-[300px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-amber-500/10
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -right-20
          h-80
          w-80
          rounded-full
          bg-amber-600/10
          blur-[100px]
        "
      />

      {/* Header Section */}
      <div
        className="
          relative
          z-10
          mx-auto
          mb-12
          max-w-2xl
          space-y-4
          text-center
        "
      >
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-amber-500/20
            bg-amber-500/10
            px-4
            py-1.5
            text-xs
            font-semibold
            uppercase
            tracking-widest
            text-amber-400
          "
        >
          <span>Literary Experience</span>
        </div>

        <h2
          className="
            font-serif
            text-3xl
            font-bold
            leading-tight
            tracking-tight
            text-white
            sm:text-4xl
            lg:text-5xl
          "
        >
          Immerse Yourself in the Craft
        </h2>

        <p
          className="
            mx-auto
            max-w-xl
            text-sm
            font-light
            leading-relaxed
            text-slate-300
            sm:text-base
          "
        >
          Whether you seek inspiration, published collections, visual stories,
          or a stage for your own work—explore the pathways below.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        className="
          relative
          z-10
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
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
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`shrink-0 rounded-2xl p-3.5 transition-transform duration-300 group-hover:scale-110 ${
                      card.featured
                        ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                        : "border border-slate-700 bg-slate-900 text-amber-400"
                    }`}
                  >
                    <IconComp className="h-6 w-6" strokeWidth={1.75} />
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-wider ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-amber-400/90">
                    {card.subtitle}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-white transition-colors group-hover:text-amber-300">
                    {card.title}
                  </h3>
                </div>

                <p className="text-xs font-light leading-relaxed text-slate-300 sm:text-sm">
                  {card.description}
                </p>
              </div>

              {/* Card Bottom CTA */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-8">
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
                  className={`rounded-full p-2 transition-all duration-300 ${
                    card.featured
                      ? "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950"
                      : "bg-slate-900 text-slate-400 group-hover:bg-slate-700 group-hover:text-amber-400"
                  }`}
                >
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
