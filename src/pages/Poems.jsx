import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "@/api/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Poems() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-stone-100 p-8">
      {/* soft background glow */}
      <div className="absolute inset-0 blur-3xl opacity-40 bg-[radial-gradient(circle_at_30%_20%,#fde68a,transparent_40%),radial-gradient(circle_at_80%_60%,#fbcfe8,transparent_40%)]" />

      <div className="relative max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <header className="text-center space-y-4 animate-in fade-in duration-700">
          <h1 className="text-5xl font-serif font-semibold tracking-wide text-stone-800">
            📜 Timeless Poetry Collection
          </h1>

          <p className="text-stone-500 italic text-lg">
            where words whisper and verses breathe
          </p>
        </header>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(10)].map((_, i) => (
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
            🌿 No poems yet — Admin will add them soon.
          </div>
        )}

        {/* Poems */}
        {!loading && poems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poems.map((poem, i) => (
              <Card
                key={poem._id}
                className="
                  group
                  relative
                  rounded-3xl
                  bg-white/70
                  backdrop-blur-xl
                  border border-stone-200/60
                  shadow-sm
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all duration-500
                  overflow-hidden
                "
              >
                {/* soft hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-amber-100/40 via-transparent to-rose-100/40" />

                <CardHeader className="relative space-y-3 pb-2">
                  {/* Title */}
                  <CardTitle className="font-serif text-2xl leading-snug text-stone-900 group-hover:text-black transition">
                    {poem.title}
                  </CardTitle>

                  {/* author line */}
                  <div className="flex items-center gap-2 text-stone-500 italic text-sm">
                    <span className="h-px w-6 bg-stone-300" />
                    {poem.author}
                  </div>
                </CardHeader>

                <CardContent className="relative space-y-6">
                  {/* preview text */}
                  {poem.content && (
                    <p
                      className="
                      text-[15px]
                      leading-relaxed
                      text-stone-600
                      line-clamp-3
                      font-light
                    "
                    >
                      {poem.content}
                    </p>
                  )}

                  {/* elegant link (NOT heavy button) */}
                  <Link
                    to={`/poems/${poem._id}`}
                    className="
                    group inline-flex items-center gap-2
                    text-sm font-medium text-stone-700
                    relative w-fit
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[1px] after:w-0
                    after:bg-stone-800
                    after:transition-all after:duration-300
                    hover:after:w-full
                    hover:text-black
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
        )}
      </div>
    </div>
  );
}
