import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import API from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import PoemNotFound from "@/components/PoemNotFound";

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

  const readingTime = poem?.readingTime ? `${poem.readingTime} min read` : "";
  const views = poem?.views ? `${poem.views} views` : "";

  /* ---------- Dynamic SEO Config ---------- */
  const canonicalUrl = `https://satinderpoetry.com/poems/${id}`;
  const pageTitle = poem?.title
    ? `${poem.title} — Poem by ${poem.author || "Satinder Singh Sall"}`
    : "Poem Details | Satinder Poetry";

  const rawDescription =
    poem?.summary ||
    poem?.content?.substring(0, 155).replace(/\n/g, " ") ||
    "Read this evocative poem on Satinder Poetry.";

  const pageDescription =
    rawDescription.length > 155
      ? `${rawDescription.substring(0, 152)}...`
      : rawDescription;

  // Schema.org Structured Data for individual Poem
  const structuredData = poem
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        genre: poem.theme || "Poetry",
        name: poem.title,
        author: {
          "@type": "Person",
          name: poem.author || "Satinder Singh Sall",
        },
        datePublished: poem.createdAt,
        text: poem.content,
        abstract: poem.summary || pageDescription,
        url: canonicalUrl,
        ...(poem.coverImage && { image: poem.coverImage }),
        keywords: poem.tags?.join(", ") || poem.theme || "Poetry",
      }
    : null;

  return (
    <div className="relative min-h-screen flex justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-rose-50">
      {/* ---------- Dynamic SEO Tags ---------- */}
      {poem && !notFound && (
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          {poem.tags?.length > 0 && (
            <meta name="keywords" content={poem.tags.join(", ")} />
          )}
          <link rel="canonical" href={canonicalUrl} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          {poem.coverImage && (
            <meta property="og:image" content={poem.coverImage} />
          )}

          {/* Twitter Card */}
          <meta
            name="twitter:card"
            content={poem.coverImage ? "summary_large_image" : "summary"}
          />
          <meta name="twitter:url" content={canonicalUrl} />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          {poem.coverImage && (
            <meta name="twitter:image" content={poem.coverImage} />
          )}

          {/* Schema.org JSON-LD */}
          {structuredData && (
            <script type="application/ld+json">
              {JSON.stringify(structuredData)}
            </script>
          )}
        </Helmet>
      )}

      <div className="absolute inset-0 blur-3xl opacity-40 bg-[radial-gradient(circle_at_20%_20%,#fde68a,transparent_40%),radial-gradient(circle_at_80%_70%,#fbcfe8,transparent_40%)]" />

      <div className="relative w-full max-w-[820px] px-4 sm:px-6 md:px-8 py-10 space-y-8">
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
        {!loading && notFound && <PoemNotFound />}

        {/* ---------- Poem ---------- */}
        {!loading && poem && !notFound && (
          <article className="animate-in fade-in duration-700 rounded-3xl bg-white/80 backdrop-blur-xl border border-stone-200/60 shadow-xl px-6 sm:px-10 py-10">
            {/* Cover Image */}
            {poem.coverImage && (
              <img
                src={poem.coverImage}
                alt={`${poem.title} cover image`}
                loading="eager"
                className="w-full h-64 object-cover rounded-2xl mb-8"
              />
            )}

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

            {/* Summary */}
            {poem.summary && (
              <p className="text-center italic text-stone-500 mb-8 max-w-2xl mx-auto">
                {poem.summary}
              </p>
            )}

            {/* Metadata row */}
            <div className="flex flex-wrap justify-center gap-3 mb-8 text-xs">
              {poem.featured && (
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                  ⭐ Featured
                </span>
              )}

              {poem.theme && (
                <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600">
                  {poem.theme}
                </span>
              )}

              {poem.tags?.length > 0 &&
                poem.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-stone-100 text-stone-500"
                  >
                    #{tag}
                  </span>
                ))}

              {readingTime && (
                <span className="text-stone-400">{readingTime}</span>
              )}

              {views && <span className="text-stone-400">{views}</span>}
            </div>

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
