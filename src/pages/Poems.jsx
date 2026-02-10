import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "@/api/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

const POEMS_PER_PAGE = 6;

export default function Poems() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

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

  const totalPages = Math.ceil(poems.length / POEMS_PER_PAGE);
  const start = (page - 1) * POEMS_PER_PAGE;
  const currentPoems = poems.slice(start, start + POEMS_PER_PAGE);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-stone-100 px-4 sm:px-6 py-10">
      {/* soft background glow */}
      <div className="absolute inset-0 blur-3xl opacity-40 bg-[radial-gradient(circle_at_30%_20%,#fde68a,transparent_40%),radial-gradient(circle_at_80%_60%,#fbcfe8,transparent_40%)]" />

      <div className="relative max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <header className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-wide text-stone-800">
            Timeless Poetry Collection
          </h1>

          <p className="text-stone-500 italic text-base sm:text-lg">
            where words whisper and verses breathe
          </p>
        </header>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl p-6 bg-white/50 backdrop-blur-md shadow-lg space-y-4"
              >
                <Skeleton className="h-6 w-3/4 bg-stone-300/70" />
                <Skeleton className="h-4 w-1/2 bg-stone-300/60" />
                <Skeleton className="h-10 w-full bg-stone-300/50 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && poems.length === 0 && (
          <div className="text-center text-stone-500 italic text-lg py-20">
            No poems yet — the pages are still blank.
          </div>
        )}

        {/* Poems */}
        {!loading && currentPoems.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentPoems.map((poem) => (
                <Card
                  key={poem._id}
                  className="
                    group relative rounded-3xl
                    bg-white/70 backdrop-blur-xl
                    border border-stone-200/60
                    shadow-sm hover:shadow-xl
                    hover:-translate-y-1
                    transition-all duration-500
                    overflow-hidden
                  "
                >
                  {/* hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-amber-100/40 via-transparent to-rose-100/40" />

                  <CardHeader className="relative space-y-3 pb-2">
                    <CardTitle className="font-serif text-xl sm:text-2xl text-stone-900">
                      {poem.title}
                    </CardTitle>

                    <div className="flex items-center gap-2 text-stone-500 italic text-sm">
                      <span className="h-px w-6 bg-stone-300" />
                      {poem.author}
                    </div>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    <p className="text-[15px] leading-relaxed text-stone-600 line-clamp-3 font-light">
                      {poem.content}
                    </p>

                    <Link
                      to={`/poems/${poem._id}`}
                      className="
                        inline-flex items-center gap-2
                        text-sm font-medium text-stone-700
                        relative w-fit
                        after:absolute after:left-0 after:-bottom-1
                        after:h-[1px] after:w-0 after:bg-stone-800
                        after:transition-all after:duration-300
                        hover:after:w-full hover:text-black
                      "
                    >
                      Read poem
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
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
                  className="
        flex items-center gap-2
        px-4 py-2 rounded-full
        text-sm text-stone-600
        hover:text-stone-900
        hover:bg-white/60
        disabled:opacity-40 disabled:hover:bg-transparent
        transition
      "
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page indicator */}
                <span className="text-sm italic text-stone-500">
                  Page {page} of {totalPages}
                </span>

                {/* Next */}
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="
                    flex items-center gap-2
                    px-4 py-2 rounded-full
                    text-sm text-stone-600
                    hover:text-stone-900
                    hover:bg-white/60
                    disabled:opacity-40 disabled:hover:bg-transparent
                    transition
                  "
                >
                  <span className="hidden sm:inline">Next</span>
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
