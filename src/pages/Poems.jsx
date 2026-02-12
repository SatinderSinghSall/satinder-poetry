import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import API from "@/api/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
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

  /* ---------------- Fetch ---------------- */

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  /* ---------------- Derived ---------------- */

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

  /* ================================================= */
  /* UI */
  /* ================================================= */

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-stone-100 px-4 sm:px-6 py-10">
      {/* glow */}
      <div className="absolute inset-0 blur-3xl opacity-40 bg-[radial-gradient(circle_at_30%_20%,#fde68a,transparent_40%),radial-gradient(circle_at_80%_60%,#fbcfe8,transparent_40%)]" />

      <div className="relative max-w-6xl mx-auto space-y-14">
        {/* ================= Header ================= */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-800">
            Timeless Poetry Collection
          </h1>
          <p className="text-stone-500 italic text-lg">
            where words whisper and verses breathe
          </p>
        </header>

        {/* ================= Search + Filters ================= */}
        {!loading && (
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                placeholder="Search poems..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 rounded-xl border bg-white/70 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={themeFilter}
                onChange={(e) => {
                  setThemeFilter(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border bg-white/70 backdrop-blur px-3 py-2 text-sm"
              >
                <option value="all">All themes</option>
                {themes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <div className="flex items-center gap-2 text-sm">
                <SlidersHorizontal size={16} className="text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border bg-white/70 backdrop-blur px-3 py-2 text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="views">Most Viewed</option>
                  <option value="reading">Shortest Read</option>
                </select>
              </div>

              <label className="flex items-center gap-2 text-sm text-stone-600">
                <input
                  type="checkbox"
                  checked={featuredOnly}
                  onChange={(e) => {
                    setFeaturedOnly(e.target.checked);
                    setPage(1);
                  }}
                />
                Featured
              </label>
            </div>
          </div>
        )}

        {/* ================= Better Loader ================= */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card
                key={i}
                className="
                  overflow-hidden rounded-3xl
                  border border-stone-300/60
                  bg-white/80
                  shadow-md
                "
              >
                {/* FULL-BLEED image skeleton (no cut look) */}
                <div className="h-40 w-full bg-stone-300/80 animate-pulse" />

                <div className="p-6 space-y-4">
                  {/* title */}
                  <div className="h-5 w-3/4 bg-stone-300/80 rounded animate-pulse" />

                  {/* author */}
                  <div className="h-4 w-1/2 bg-stone-300/70 rounded animate-pulse" />

                  {/* lines */}
                  <div className="h-3 w-full bg-stone-300/60 rounded animate-pulse" />
                  <div className="h-3 w-5/6 bg-stone-300/60 rounded animate-pulse" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && filteredPoems.length === 0 && (
          <div className="flex justify-center py-24">
            <div className="text-center space-y-4 max-w-md animate-in fade-in duration-500">
              <div className="text-5xl opacity-40">📭</div>

              <h3 className="font-serif text-xl text-stone-800">
                No poems found
              </h3>

              <p className="text-sm text-stone-500">
                Try adjusting your search or filters. Sometimes the quietest
                words hide deeper.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setThemeFilter("all");
                  setFeaturedOnly(false);
                  setPage(1);
                }}
                className="
                mt-4 px-4 py-2 text-sm rounded-full
                bg-white/70 backdrop-blur
                border border-stone-200
                hover:bg-white transition
              "
              >
                Reset filters
              </button>
            </div>
          </div>
        )}

        {/* ================= Cards ================= */}
        {!loading && currentPoems.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPoems.map((poem) => (
                <Card
                  key={poem._id}
                  className="
                    group relative rounded-3xl
                    bg-white/75 backdrop-blur-xl
                    border border-stone-200/60
                    shadow-sm hover:shadow-2xl
                    hover:-translate-y-2
                    transition-all duration-500
                    overflow-hidden
                  "
                >
                  {/* Featured badge */}
                  {poem.featured && (
                    <span className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full z-10">
                      ⭐ Featured
                    </span>
                  )}

                  {/* Full-bleed image / fallback */}
                  <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-3xl relative">
                    {poem.coverImage ? (
                      <>
                        <img
                          src={poem.coverImage}
                          alt=""
                          className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="h-40 bg-gradient-to-br from-amber-100 via-rose-100 to-stone-100 flex items-center justify-center">
                        <span className="text-stone-500 font-serif italic">
                          {poem.theme || "Poetry"}
                        </span>
                      </div>
                    )}
                  </div>

                  <CardHeader className="space-y-2 pb-2">
                    <CardTitle className="font-serif text-xl text-stone-900">
                      {poem.title}
                    </CardTitle>
                    <p className="italic text-sm text-stone-500">
                      — {poem.author}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {poem.summary || poem.content}
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs">
                      {poem.theme && (
                        <span className="px-2 py-1 bg-stone-100 text-stone-600 rounded-full">
                          {poem.theme}
                        </span>
                      )}
                      {poem.readingTime && (
                        <span className="text-stone-400">
                          {poem.readingTime}m read
                        </span>
                      )}
                      {poem.views && (
                        <span className="text-stone-400">
                          {poem.views} views
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/poems/${poem._id}`}
                      className="inline-block text-sm font-medium text-stone-700 hover:text-black transition"
                    >
                      Read poem →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-8 pt-14">
                {/* Previous */}
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm
                  transition
                  ${
                    page === 1
                      ? "opacity-30 cursor-not-allowed text-stone-400"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                  }
                `}
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                {/* Page indicator */}
                <span className="text-sm italic text-stone-500">
                  Page {page} of {totalPages}
                </span>

                {/* Next */}
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm
                  transition
                  ${
                    page === totalPages
                      ? "opacity-30 cursor-not-allowed text-stone-400"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                  }
                `}
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
