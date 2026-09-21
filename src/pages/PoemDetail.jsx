import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import API from "@/api/api";

import { Skeleton } from "@/components/ui/skeleton";
import PoemNotFound from "@/components/PoemNotFound";

import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Copy,
  Eye,
  Check,
  Share2,
  MessageCircle,
  Twitter,
  Linkedin,
  Facebook,
  BookOpen,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";

export default function PoemDetail() {
  const { id } = useParams();

  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* =====================================================
     FETCH POEM
  ===================================================== */

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

  /* =====================================================
     READING PROGRESS
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;

      if (total <= 0) {
        setScrollProgress(0);
        return;
      }

      setScrollProgress(Math.min(100, (window.scrollY / total) * 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =====================================================
     FORMATTED DATA
  ===================================================== */

  const formattedDate = poem?.createdAt
    ? new Date(poem.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const readingTime = poem?.readingTime ? `${poem.readingTime} min read` : "";

  const views = poem?.views ? `${poem.views} views` : "";

  /* =====================================================
     SEO — KEPT AS YOUR ORIGINAL
  ===================================================== */

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
        ...(poem.coverImage && {
          image: poem.coverImage,
        }),
        keywords: poem.tags?.join(", ") || poem.theme || "Poetry",
      }
    : null;

  /* =====================================================
     SHARE
  ===================================================== */

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : canonicalUrl;

  const shareTitle = poem?.title || "A poem from Satinder Poetry";

  const shareText =
    poem?.summary || `Read "${poem?.title || "this poem"}" on Satinder Poetry.`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);

      setCopied(true);

      toast.success("Poem link copied");

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.error(error);
      toast.error("Unable to copy the link");
    }
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(
        `${shareTitle}\n\n${shareText}\n\n${shareUrl}`,
      )}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareTitle,
      )}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl,
      )}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}`,
    },
  ];

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f5ef]">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="mx-auto mt-16 max-w-3xl space-y-7">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-20 w-4/5" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-[420px] w-full rounded-3xl" />

            <div className="space-y-4 pt-8">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-11/12" />
              <Skeleton className="h-5 w-10/12" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!poem || notFound) {
    return <PoemNotFound />;
  }

  return (
    <>
      {/* =================================================
          SEO
      ================================================= */}

      {poem && !notFound && (
        <Helmet>
          <title>{pageTitle}</title>

          <meta name="description" content={pageDescription} />

          {poem.tags?.length > 0 && (
            <meta name="keywords" content={poem.tags.join(", ")} />
          )}

          <link rel="canonical" href={canonicalUrl} />

          <meta property="og:type" content="article" />

          <meta property="og:url" content={canonicalUrl} />

          <meta property="og:title" content={pageTitle} />

          <meta property="og:description" content={pageDescription} />

          {poem.coverImage && (
            <meta property="og:image" content={poem.coverImage} />
          )}

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

          {structuredData && (
            <script type="application/ld+json">
              {JSON.stringify(structuredData)}
            </script>
          )}
        </Helmet>
      )}

      {/* =================================================
          READING PROGRESS
      ================================================= */}

      <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
        <div
          className="h-full bg-[#82705d] transition-[width] duration-150"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {/* =================================================
          PAGE
      ================================================= */}

      <main className="min-h-screen bg-[#f8f5ef] text-[#292520]">
        {/* subtle paper texture */}

        <div
          className="
            pointer-events-none
            fixed
            inset-0
            opacity-[0.025]
            [background-image:radial-gradient(#292520_0.6px,transparent_0.6px)]
            [background-size:7px_7px]
          "
        />

        <div className="relative">
          {/* =================================================
              TOP NAV
          ================================================= */}

          <div className="mx-auto max-w-5xl px-5 pt-8 sm:px-8 sm:pt-10">
            <div className="flex items-center justify-between">
              <Link
                to="/poems"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[#80776d]
                  transition-colors
                  hover:text-[#292520]
                "
              >
                <ArrowLeft
                  className="
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-300
                    group-hover:-translate-x-1
                  "
                />
                Back to Poems
              </Link>

              {/* =================================================
                  SHARE DIALOG
              ================================================= */}

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.2em]
                      text-[#80776d]
                      transition-colors
                      hover:text-[#292520]
                    "
                  >
                    Share
                    <span
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#cfc6ba]
                        transition-all
                        duration-300
                        group-hover:border-[#8d806f]
                        group-hover:bg-[#292520]
                        group-hover:text-[#f8f5ef]
                      "
                    >
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </button>
                </DialogTrigger>

                <DialogContent
                  className="
                    w-[calc(100vw-2rem)]
                    overflow-hidden
                    rounded-3xl
                    border
                    border-[#ddd5ca]
                    bg-[#f8f5ef]
                    p-0
                    shadow-2xl
                    sm:max-w-md
                  "
                >
                  <DialogHeader className="px-6 pt-6">
                    <DialogTitle
                      className="
                        font-serif
                        text-2xl
                        font-normal
                        text-[#292520]
                      "
                    >
                      Share this poem
                    </DialogTitle>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-relaxed
                        text-[#8b8176]
                      "
                    >
                      Send these words to someone who might keep them.
                    </p>
                  </DialogHeader>

                  {/* poem preview */}

                  <div className="px-6 pt-5">
                    <div
                      className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[#ded6cb]
                        bg-white/50
                      "
                    >
                      <div className="flex gap-4 p-3">
                        <div
                          className="
                            h-20
                            w-20
                            shrink-0
                            overflow-hidden
                            rounded-xl
                            bg-[#e9e3da]
                          "
                        >
                          {poem.coverImage ? (
                            <img
                              src={poem.coverImage}
                              alt=""
                              className="
                                h-full
                                w-full
                                object-cover
                              "
                            />
                          ) : (
                            <div
                              className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                                text-[#948879]
                              "
                            >
                              <BookOpen className="h-6 w-6" strokeWidth={1.2} />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 py-1">
                          <p
                            className="
                              font-serif
                              text-base
                              leading-tight
                              text-[#292520]
                            "
                          >
                            {poem.title}
                          </p>

                          <p
                            className="
                              mt-2
                              line-clamp-2
                              text-xs
                              leading-relaxed
                              text-[#8b8176]
                            "
                          >
                            {poem.summary || "A poem from Satinder Poetry."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* social */}

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-2
                      px-6
                      pt-5
                      sm:grid-cols-4
                    "
                  >
                    {socialLinks.map((item) => {
                      const Icon = item.icon;

                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-[#ded6cb]
                            bg-white/40
                            py-3
                            text-[#756b60]
                            transition-all
                            hover:border-[#bdb2a4]
                            hover:bg-white
                            hover:text-[#292520]
                          "
                        >
                          <Icon className="h-4 w-4" />

                          <span className="text-[10px]">{item.name}</span>
                        </a>
                      );
                    })}
                  </div>

                  {/* copy */}

                  <div className="px-6 pb-6 pt-4">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-[#d9d0c5]
                        bg-white/50
                        px-4
                        py-3
                        text-left
                        transition-colors
                        hover:bg-white
                      "
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {copied ? (
                          <Check
                            className="
                              h-4
                              w-4
                              shrink-0
                              text-[#66785f]
                            "
                          />
                        ) : (
                          <Copy
                            className="
                              h-4
                              w-4
                              shrink-0
                              text-[#8b8176]
                            "
                          />
                        )}

                        <span
                          className="
                            truncate
                            text-xs
                            text-[#8b8176]
                          "
                        >
                          {copied ? "Link copied" : shareUrl}
                        </span>
                      </div>

                      <span
                        className="
                          ml-3
                          shrink-0
                          text-[9px]
                          font-medium
                          uppercase
                          tracking-[0.16em]
                          text-[#6e6459]
                        "
                      >
                        {copied ? "Copied" : "Copy"}
                      </span>
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* =================================================
              POEM HEADER
          ================================================= */}

          <header className="mx-auto max-w-4xl px-5 pb-12 pt-16 text-center sm:px-8 sm:pb-16 sm:pt-20">
            {/* category */}

            <div className="mb-7 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#c9bfb2]" />

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#8b8176]
                "
              >
                {poem.theme || "Poetry"}
              </span>

              <span className="h-px w-8 bg-[#c9bfb2]" />
            </div>

            {/* title */}

            <h1
              className="
                mx-auto
                max-w-4xl
                font-serif
                text-5xl
                font-normal
                leading-[0.95]
                tracking-[-0.045em]
                text-[#211e1a]
                sm:text-6xl
                md:text-7xl
              "
            >
              {poem.title}
            </h1>

            {/* author */}

            <p
              className="
                mt-7
                font-serif
                text-sm
                italic
                text-[#84796d]
              "
            >
              — {poem.author || "Satinder Singh Sall"}
            </p>

            {/* summary */}

            {poem.summary && (
              <div className="mx-auto mt-9 max-w-2xl">
                <p
                  className="
                    font-serif
                    text-base
                    italic
                    leading-7
                    text-[#746b61]
                    sm:text-lg
                  "
                >
                  "{poem.summary}"
                </p>
              </div>
            )}

            {/* metadata */}

            <div
              className="
                mt-9
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-4
                gap-y-2
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-[#94897d]
              "
            >
              {formattedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {formattedDate}
                </span>
              )}

              {readingTime && (
                <>
                  <span className="text-[#c5bbb0]">/</span>

                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {readingTime}
                  </span>
                </>
              )}

              {views && (
                <>
                  <span className="text-[#c5bbb0]">/</span>

                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="h-3 w-3" />
                    {views}
                  </span>
                </>
              )}
            </div>

            {/* tags */}

            {poem.tags?.length > 0 && (
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {poem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      rounded-full
                      border
                      border-[#d8cfc4]
                      px-3
                      py-1
                      text-[12px]
                      tracking-[0.08em]
                      text-[#81776c]
                    "
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* =================================================
              COVER / ARTWORK
          ================================================= */}

          {poem.coverImage && (
            <div className="mx-auto max-w-5xl px-5 sm:px-8">
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  bg-[#e7e0d6]
                  shadow-[0_20px_60px_rgba(55,45,35,0.10)]
                "
              >
                <img
                  src={poem.coverImage}
                  alt={`${poem.title} cover image`}
                  loading="eager"
                  className="
                    block
                    max-h-[600px]
                    w-full
                    object-cover
                    transition-transform
                    duration-1000
                    ease-out
                    group-hover:scale-[1.015]
                  "
                />
              </div>
            </div>
          )}

          {/* =================================================
              POEM
          ================================================= */}

          <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
            {/* little poetry marker */}

            <div className="mb-12 flex items-center gap-4">
              <span
                className="
                  h-px
                  flex-1
                  bg-[#ddd4c9]
                "
              />

              <span
                className="
                  font-serif
                  text-sm
                  italic
                  text-[#9a8e81]
                "
              >
                poem
              </span>

              <span
                className="
                  h-px
                  flex-1
                  bg-[#ddd4c9]
                "
              />
            </div>

            <div
              className="
                whitespace-pre-line
                text-center
                font-serif
                text-lg
                leading-[2.05]
                tracking-[0.01em]
                text-[#39332d]
                sm:text-xl
                sm:leading-[2.15]
              "
            >
              {poem.content}
            </div>

            {/* ending mark */}

            <div className="mt-16 flex justify-center">
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#9a8e81]
                "
              />
            </div>
          </section>

          {/* =================================================
              AUTHOR FOOTER
          ================================================= */}

          <footer className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
            <div
              className="
                border-t
                border-[#ddd4c9]
                pt-10
              "
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="
                    mb-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#d2c7bb]
                    bg-[#eee8df]
                    font-serif
                    text-lg
                    italic
                    text-[#756a5e]
                  "
                >
                  {(poem.author || "Satinder Singh Sall").charAt(0)}
                </div>

                <p
                  className="
                    font-serif
                    text-lg
                    text-[#39332d]
                  "
                >
                  {poem.author || "Satinder Singh Sall"}
                </p>

                <p
                  className="
                    mt-2
                    max-w-md
                    text-xs
                    leading-6
                    text-[#8c8176]
                  "
                >
                  Words gathered here for the moments that are difficult to say
                  aloud.
                </p>

                <Link
                  to="/poems"
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-[#81776c]
                    transition-colors
                    hover:text-[#292520]
                  "
                >
                  Explore more poems
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
