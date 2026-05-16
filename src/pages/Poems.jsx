import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "@/api/api";

import { Card, CardContent } from "@/components/ui/card";

import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

const POEMS_PER_PAGE = 6;

export default function Poems() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [themeFilter, setThemeFilter] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const { data } = await API.get("/poems");
        setPoems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const themes = useMemo(() => {
    return [...new Set(poems.map((p) => p.theme).filter(Boolean))];
  }, [poems]);

  const filteredPoems = useMemo(() => {
    let result = poems.filter((poem) => {
      const matchesSearch =
        poem.title?.toLowerCase().includes(search.toLowerCase()) ||
        poem.author?.toLowerCase().includes(search.toLowerCase()) ||
        poem.content?.toLowerCase().includes(search.toLowerCase());

      const matchesTheme = themeFilter === "all" || poem.theme === themeFilter;

      const matchesFeatured = !featuredOnly || poem.featured === true;

      return matchesSearch && matchesTheme && matchesFeatured;
    });

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sortBy === "views") {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    if (sortBy === "reading") {
      result.sort((a, b) => (a.readingTime || 0) - (b.readingTime || 0));
    }

    return result;
  }, [poems, search, themeFilter, featuredOnly, sortBy]);

  const totalPages = Math.ceil(filteredPoems.length / POEMS_PER_PAGE);
  const start = (page - 1) * POEMS_PER_PAGE;
  const currentPoems = filteredPoems.slice(start, start + POEMS_PER_PAGE);

  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden

      bg-[radial-gradient(circle_at_top,#fdf6ec,transparent_35%),radial-gradient(circle_at_bottom,#f8e7ec,transparent_35%),linear-gradient(to_bottom_right,#f8f5f2,#f5efe8,#f7f3f0)]

      px-3
      sm:px-6
      lg:px-8

      py-6
      sm:py-10
    "
    >
      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.15),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(244,114,182,0.12),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(120,113,108,0.08),transparent_25%)]
        blur-3xl
      "
      />

      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          pointer-events-none
        "
        style={{
          backgroundImage: `
          radial-gradient(rgba(0,0,0,0.04) 0.6px, transparent 0.6px)
        `,
          backgroundSize: "6px 6px",
        }}
      />

      <div className="relative max-w-7xl mx-auto space-y-10 sm:space-y-14">
        <header
          className="
          relative
          overflow-hidden

          min-h-[92vh]
          sm:min-h-screen

          flex
          items-center
          justify-center

          rounded-[34px]

          border
          border-white/40

          bg-white/40
          backdrop-blur-2xl

          px-6
          py-14

          sm:px-10
          sm:py-20

          text-center

          shadow-[0_10px_60px_rgba(0,0,0,0.08)]
        "
        >
          {/* ambient glow */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />

          {/* soft gradient overlay */}
          <div
            className="
            absolute
            inset-0

            bg-gradient-to-br
            from-amber-50/40
            via-transparent
            to-rose-100/30
          "
          />

          {/* content */}
          <div
            className="
            relative
            z-10

            flex
            flex-col
            items-center
            justify-center

            w-full
            max-w-5xl

            mx-auto
          "
          >
            {/* top badge */}
            <div
              className="
              mb-8

              inline-flex
              items-center
              gap-3

              rounded-full

              border
              border-stone-200/70

              bg-white/60
              backdrop-blur-xl

              px-5
              py-3

              text-[11px]
              sm:text-xs

              uppercase
              tracking-[0.35em]

              text-stone-600

              shadow-sm
            "
            >
              <Sparkles size={14} />
              Poetry • Stories • Reflections
            </div>

            {/* heading */}
            <h1
              className="
              font-serif

              text-[3.2rem]
              leading-[0.95]

              sm:text-7xl
              lg:text-8xl
              xl:text-[7rem]

              tracking-tight

              text-stone-900
            "
            >
              Timeless Poetry
              <span
                className="
                mt-2

                block

                italic
                font-light

                text-stone-500
              "
              >
                & Quiet Reflections
              </span>
            </h1>

            {/* subtitle */}
            <p
              className="
              mt-10

              max-w-3xl

              text-stone-600

              text-lg
              sm:text-xl

              leading-relaxed
              sm:leading-loose
            "
            >
              A curated sanctuary of verses, midnight thoughts, fleeting
              emotions, and stories written softly for wandering souls.
            </p>

            {/* CTA buttons */}
            <div
              className="
              mt-12

              flex
              flex-col
              sm:flex-row

              items-center
              gap-4
            "
            >
              <Link
                to="/poems"
                className="
                inline-flex
                items-center
                justify-center

                rounded-full

                bg-stone-900
                text-white

                px-8
                py-4

                text-sm
                uppercase
                tracking-[0.18em]

                transition-all
                duration-300

                hover:bg-black
                hover:scale-[1.02]

                shadow-xl
              "
              >
                Explore Poems
              </Link>

              <button
                className="
                inline-flex
                items-center
                justify-center

                rounded-full

                border
                border-stone-300/70

                bg-white/60
                backdrop-blur-xl

                px-8
                py-4

                text-sm
                uppercase
                tracking-[0.18em]

                text-stone-700

                transition-all
                duration-300

                hover:bg-white
                hover:border-stone-400
              "
              >
                Read Manifesto
              </button>
            </div>
          </div>
        </header>

        {!loading && (
          <div
            className="
            rounded-[28px]

            border
            border-white/40

            bg-white/50
            backdrop-blur-2xl

            p-4
            sm:p-6

            shadow-[0_8px_40px_rgba(0,0,0,0.05)]
          "
          >
            <div
              className="
              flex
              flex-col
              xl:flex-row

              gap-4

              xl:items-center
              xl:justify-between
            "
            >
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-black
                  "
                />

                <input
                  placeholder="Search poems, authors, emotions..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="
                    w-full
                    h-12

                    rounded-2xl

                    border
                    border-stone-200/70

                    bg-white/70
                    backdrop-blur-xl

                    pl-11
                    pr-4

                    text-sm
                    text-stone-700

                    shadow-sm

                    transition-all

                    focus:outline-none
                    focus:ring-2
                    focus:ring-amber-200
                    focus:border-amber-300
                  "
                />
              </div>

              <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:flex

                gap-3

                items-stretch
              "
              >
                <select
                  value={themeFilter}
                  onChange={(e) => {
                    setThemeFilter(e.target.value);
                    setPage(1);
                  }}
                  className="
                    h-12

                    rounded-2xl

                    border
                    border-stone-200/70

                    bg-white/70
                    backdrop-blur-xl

                    px-4

                    text-sm
                    text-stone-700

                    shadow-sm

                    focus:outline-none
                    focus:ring-2
                    focus:ring-amber-200
                  "
                >
                  <option value="all">All Themes</option>

                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>

                <div className="relative">
                  <SlidersHorizontal
                    size={16}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-black
                    "
                  />

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="
                      h-12

                      rounded-2xl

                      border
                      border-stone-200/70

                      bg-white/70
                      backdrop-blur-xl

                      pl-10
                      pr-4

                      text-sm
                      text-stone-700

                      shadow-sm

                      focus:outline-none
                      focus:ring-2
                      focus:ring-amber-200
                    "
                  >
                    <option value="newest">Newest</option>
                    <option value="views">Most Viewed</option>
                    <option value="reading">Shortest Read</option>
                  </select>
                </div>

                <label
                  className="
                  flex
                  items-center
                  justify-center
                  gap-3

                  rounded-2xl

                  border
                  border-stone-200/70

                  bg-white/70
                  backdrop-blur-xl

                  px-4

                  text-sm
                  text-stone-700

                  shadow-sm
                "
                >
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => {
                      setFeaturedOnly(e.target.checked);
                      setPage(1);
                    }}
                    className="accent-amber-500"
                  />
                  Featured
                </label>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="
                overflow-hidden

                rounded-[30px]

                border
                border-white/50

                bg-white/60

                animate-pulse
              "
              >
                <div className="h-56 bg-stone-200" />

                <div className="p-6 space-y-4">
                  <div className="h-6 rounded bg-stone-200 w-3/4" />

                  <div className="h-4 rounded bg-stone-200 w-1/3" />

                  <div className="space-y-2">
                    <div className="h-3 rounded bg-stone-200" />
                    <div className="h-3 rounded bg-stone-200 w-5/6" />
                    <div className="h-3 rounded bg-stone-200 w-4/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredPoems.length === 0 && (
          <div className="py-24 flex justify-center">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-4">📜</div>

              <h3
                className="
                font-serif
                text-3xl
                text-stone-900
              "
              >
                No Poems Found
              </h3>

              <p
                className="
                mt-4
                text-stone-500
                leading-relaxed
              "
              >
                Try adjusting your search or filters. Sometimes the quietest
                verses hide the deepest meanings.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setThemeFilter("all");
                  setFeaturedOnly(false);
                  setPage(1);
                }}
                className="
                  mt-6

                  rounded-full

                  bg-white/70
                  backdrop-blur-xl

                  border
                  border-stone-200

                  px-6
                  py-3

                  text-sm
                  text-stone-700

                  hover:bg-white

                  transition
                "
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {!loading && currentPoems.length > 0 && (
          <>
            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
            >
              {currentPoems.map((poem) => (
                <Card
                  key={poem._id}
                  className="
                  group
                  relative

                  overflow-hidden

                  rounded-[30px]

                  border
                  border-white/50

                  bg-white/60
                  backdrop-blur-2xl

                  shadow-[0_10px_40px_rgba(0,0,0,0.06)]

                  hover:shadow-[0_20px_70px_rgba(0,0,0,0.12)]

                  transition-all
                  duration-700

                  hover:-translate-y-1
                "
                >
                  {poem.featured && (
                    <div
                      className="
                      absolute
                      top-4
                      right-4
                      z-20

                      rounded-full

                      bg-white/80
                      backdrop-blur

                      border
                      border-white/70

                      px-3
                      py-1

                      text-[11px]
                      uppercase
                      tracking-[0.15em]

                      text-amber-700
                    "
                    >
                      Featured
                    </div>
                  )}

                  <div className="relative overflow-hidden">
                    {poem.coverImage ? (
                      <>
                        <img
                          src={poem.coverImage}
                          alt={poem.title}
                          className="
                          h-52
                          sm:h-56
                          w-full

                          object-cover
                          object-center

                          transition-transform
                          duration-1000

                          group-hover:scale-105
                        "
                        />

                        <div
                          className="
                          absolute
                          inset-0

                          bg-gradient-to-t
                          from-black/50
                          via-black/10
                          to-transparent
                        "
                        />
                      </>
                    ) : (
                      <div
                        className="
                        h-52
                        sm:h-56

                        bg-gradient-to-br
                        from-amber-100
                        via-rose-100
                        to-stone-100

                        flex
                        items-center
                        justify-center
                      "
                      >
                        <span
                          className="
                          font-serif
                          italic
                          text-stone-500
                          text-xl
                        "
                        >
                          {poem.theme || "Poetry"}
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6 sm:p-7">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {poem.theme && (
                        <span
                          className="
                          rounded-full

                          bg-stone-900/5
                          backdrop-blur

                          px-3
                          py-1

                          text-[11px]
                          uppercase
                          tracking-[0.18em]

                          text-stone-600
                        "
                        >
                          {poem.theme}
                        </span>
                      )}

                      {poem.readingTime && (
                        <span
                          className="
                          rounded-full

                          bg-stone-900/5

                          px-3
                          py-1

                          text-[11px]
                          uppercase
                          tracking-[0.18em]

                          text-stone-500
                        "
                        >
                          {poem.readingTime} min read
                        </span>
                      )}
                    </div>

                    <h2
                      className="
                      font-serif

                      text-2xl

                      leading-snug
                      tracking-tight

                      text-stone-900
                    "
                    >
                      {poem.title}
                    </h2>

                    <p
                      className="
                      mt-2

                      text-sm
                      italic
                      tracking-wide

                      text-stone-500
                    "
                    >
                      — {poem.author}
                    </p>

                    <p
                      className="
                      mt-5

                      text-[15px]
                      leading-7

                      text-stone-600

                      line-clamp-4
                    "
                    >
                      {poem.summary || poem.content}
                    </p>

                    <div
                      className="
                      mt-8

                      flex
                      items-center
                      justify-between
                    "
                    >
                      <span
                        className="
                        text-xs
                        text-stone-400
                      "
                      >
                        {poem.views || 0} views
                      </span>

                      <Link
                        to={`/poems/${poem._id}`}
                        className="
                        inline-flex
                        items-center
                        gap-2

                        text-sm
                        font-medium

                        text-stone-800

                        transition-all

                        hover:gap-3
                      "
                      >
                        Read Poem
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div
                className="
                flex
                flex-wrap

                items-center
                justify-center

                gap-4

                pt-8
                sm:pt-12
              "
              >
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className={`
                    inline-flex
                    items-center
                    gap-2

                    rounded-full

                    px-5
                    py-3

                    text-sm

                    transition-all

                    ${
                      page === 1
                        ? `
                          opacity-40
                          cursor-not-allowed
                          bg-white/40
                        `
                        : `
                          bg-white/70
                          backdrop-blur-xl

                          border
                          border-white/60

                          hover:bg-white
                          hover:shadow-lg
                        `
                    }
                  `}
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <div
                  className="
                  rounded-full

                  bg-white/70
                  backdrop-blur-xl

                  border
                  border-white/60

                  px-5
                  py-3

                  text-sm
                  italic
                  text-stone-600
                "
                >
                  Page {page} of {totalPages}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`
                    inline-flex
                    items-center
                    gap-2

                    rounded-full

                    px-5
                    py-3

                    text-sm

                    transition-all

                    ${
                      page === totalPages
                        ? `
                          opacity-40
                          cursor-not-allowed
                          bg-white/40
                        `
                        : `
                          bg-white/70
                          backdrop-blur-xl

                          border
                          border-white/60

                          hover:bg-white
                          hover:shadow-lg
                        `
                    }
                  `}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
