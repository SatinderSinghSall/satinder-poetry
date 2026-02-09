import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function PoemDetail() {
  const { id } = useParams();

  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const { data } = await API.get(`/poems/${id}`);

        if (!data || !data.title) {
          setNotFound(true);
        } else {
          setPoem(data);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPoem();
  }, [id]);

  const formattedDate = poem?.createdAt
    ? new Date(poem.createdAt).toLocaleDateString()
    : "";

  return (
    <div className="relative min-h-screen flex justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-rose-50">
      {/* ✨ soft background glow */}
      <div className="absolute inset-0 blur-3xl opacity-40 bg-[radial-gradient(circle_at_20%_20%,#fde68a,transparent_40%),radial-gradient(circle_at_80%_70%,#fbcfe8,transparent_40%)]" />

      {/* ⭐ Fixed reading width */}
      <div className="relative w-full max-w-[820px] px-4 sm:px-6 md:px-8 py-10 space-y-8">
        {/* Back button */}
        <Link
          to="/poems"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white/70 backdrop-blur border border-stone-200 shadow-sm hover:shadow-md transition"
        >
          <span className="group-hover:-translate-x-1 transition">←</span>
          Back to collection
        </Link>

        {/* ---------- Loading ---------- */}
        {loading && (
          <div className="space-y-6">
            <Skeleton className="h-8 w-2/3 bg-stone-300/60" />
            <Skeleton className="h-4 w-1/3 bg-stone-300/50" />
            <Skeleton className="h-64 w-full rounded-3xl bg-stone-300/40" />
          </div>
        )}

        {/* ---------- Not Found ---------- */}
        {!loading && notFound && (
          <div className="rounded-3xl bg-white/80 backdrop-blur border border-stone-200 shadow-lg px-8 py-16 text-center space-y-4 animate-in fade-in">
            <h2 className="font-serif text-2xl text-stone-800">
              No poem found
            </h2>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              The poem you’re looking for may have been moved, renamed, or never
              written.
            </p>

            <Link
              to="/poems"
              className="inline-block mt-4 text-sm text-stone-700 hover:text-stone-900 transition"
            >
              Browse all poems →
            </Link>
          </div>
        )}

        {/* ---------- Poem ---------- */}
        {!loading && poem && !notFound && (
          <article className="animate-in fade-in duration-700 rounded-3xl bg-white/80 backdrop-blur-xl border border-stone-200/60 shadow-xl px-6 sm:px-10 py-10">
            {/* Header */}
            <header className="text-center space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900">
                {poem.title}
              </h1>

              <p className="italic text-stone-500">— {poem.author}</p>

              <p className="text-xs text-stone-400 tracking-widest uppercase">
                {formattedDate}
              </p>
            </header>

            <div className="my-8 h-px bg-stone-200" />

            {/* Poem text */}
            <div className="whitespace-pre-line font-serif text-base sm:text-lg leading-relaxed text-stone-700 tracking-wide">
              {poem.content}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
