import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function PoemDetail() {
  const { id } = useParams();

  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const { data } = await API.get(`/poems/${id}`);
        setPoem(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoem();
  }, [id]);

  const formattedDate = poem
    ? new Date(poem.createdAt).toLocaleDateString()
    : "";

  return (
    <div className="relative min-h-screen flex justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-rose-50">
      {/* ✨ soft background glow */}
      <div className="absolute inset-0 blur-3xl opacity-40 bg-[radial-gradient(circle_at_20%_20%,#fde68a,transparent_40%),radial-gradient(circle_at_80%_70%,#fbcfe8,transparent_40%)]" />

      {/* ⭐ FIXED READING WIDTH (important) */}
      <div
        className="
          relative
          w-full
          max-w-[820px] 2xl:max-w-[860px]
          px-4 sm:px-6 md:px-8
          py-10 sm:py-14 md:py-16
          space-y-8
        "
      >
        {/* ================= BACK BUTTON ================= */}
        <Link
          to="/poems"
          className="
            group inline-flex items-center gap-2
            px-3 sm:px-4 py-2
            rounded-full
            text-xs sm:text-sm
            bg-white/70 backdrop-blur
            border border-stone-200
            shadow-sm
            hover:shadow-md hover:bg-white
            transition-all
            w-fit
          "
        >
          <span className="group-hover:-translate-x-1 transition">←</span>
          Back to collection
        </Link>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="space-y-6">
            <Skeleton className="h-8 w-2/3 bg-stone-300/60" />
            <Skeleton className="h-4 w-1/3 bg-stone-300/50" />
            <Skeleton className="h-64 w-full rounded-3xl bg-stone-300/40" />
          </div>
        )}

        {/* ================= POEM ================= */}
        {!loading && poem && (
          <article
            className="
              animate-in fade-in duration-700
              rounded-3xl
              bg-white/80 backdrop-blur-xl
              border border-stone-200/60
              shadow-xl

              px-6 sm:px-10 md:px-14
              py-10 sm:py-12 md:py-14
            "
          >
            {/* ---------- Header ---------- */}
            <header className="text-center space-y-3 sm:space-y-4">
              <h1
                className="
                  font-serif
                  text-3xl sm:text-4xl md:text-5xl
                  leading-tight
                  text-stone-900
                "
              >
                {poem.title}
              </h1>

              <p className="italic text-stone-500 text-sm sm:text-base">
                — {poem.author}
              </p>

              <p className="text-[10px] sm:text-xs text-stone-400 tracking-widest uppercase">
                {formattedDate}
              </p>
            </header>

            {/* ---------- Divider ---------- */}
            <div className="my-8 sm:my-10 h-px bg-stone-200" />

            {/* ---------- Poem Text ---------- */}
            <div
              className="
                whitespace-pre-line
                font-serif

                text-base sm:text-lg md:text-xl
                leading-relaxed sm:leading-loose

                text-stone-700
                tracking-wide
              "
            >
              {poem.content}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
