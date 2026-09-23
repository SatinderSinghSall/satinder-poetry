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
  DialogDescription,
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
      <main
        className="
        min-h-screen
        bg-[#f8f5ef]
        text-[#292520]

        [&_[data-slot=skeleton]]:animate-pulse
        [&_[data-slot=skeleton]]:bg-[#d8d0c5]
      "
      >
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
          {/* Top navigation skeleton */}
          <div className="mx-auto max-w-5xl px-5 pt-8 sm:px-8 sm:pt-10">
            <div className="flex items-center justify-between">
              {/* Back */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-3 w-24 rounded-full" />
              </div>

              {/* Share */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-12 rounded-full" />
                <Skeleton className="h-7 w-7 rounded-full" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="mx-auto max-w-4xl px-5 pb-20 pt-16 sm:px-8 sm:pt-20">
            {/* Category */}
            <div className="mb-7 flex items-center justify-center gap-3">
              <Skeleton className="h-px w-8" />
              <Skeleton className="h-3 w-16 rounded-full" />
              <Skeleton className="h-px w-8" />
            </div>

            {/* Title */}
            <div className="flex flex-col items-center gap-3">
              <Skeleton
                className="
                h-12
                w-[85%]
                max-w-2xl
                rounded-xl
                sm:h-16
              "
              />

              <Skeleton
                className="
                h-12
                w-[65%]
                max-w-xl
                rounded-xl
                sm:h-16
              "
              />
            </div>

            {/* Author */}
            <div className="mt-7 flex justify-center">
              <Skeleton className="h-4 w-32 rounded-full" />
            </div>

            {/* Summary */}
            <div className="mx-auto mt-9 max-w-2xl space-y-2">
              <Skeleton className="mx-auto h-4 w-[90%] rounded-full" />
              <Skeleton className="mx-auto h-4 w-[65%] rounded-full" />
            </div>

            {/* Metadata */}
            <div className="mt-9 flex justify-center gap-4">
              <Skeleton className="h-3 w-20 rounded-full" />
              <Skeleton className="h-3 w-16 rounded-full" />
              <Skeleton className="h-3 w-20 rounded-full" />
            </div>

            {/* Tags */}
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              <Skeleton className="h-7 w-16 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
          </div>

          {/* Cover skeleton */}
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <Skeleton
              className="
              h-[280px]
              w-full
              rounded-[2rem]
              sm:h-[500px]
            "
            />
          </div>

          {/* Poem skeleton */}
          <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
            {/* poem marker */}
            <div className="mb-12 flex items-center gap-4">
              <Skeleton className="h-px flex-1" />
              <Skeleton className="h-4 w-10 rounded-full" />
              <Skeleton className="h-px flex-1" />
            </div>

            {/* poem lines */}
            <div className="space-y-5">
              <Skeleton className="mx-auto h-5 w-[85%] rounded-full" />
              <Skeleton className="mx-auto h-5 w-[70%] rounded-full" />
              <Skeleton className="mx-auto h-5 w-[78%] rounded-full" />

              <div className="h-3" />

              <Skeleton className="mx-auto h-5 w-[75%] rounded-full" />
              <Skeleton className="mx-auto h-5 w-[88%] rounded-full" />
              <Skeleton className="mx-auto h-5 w-[62%] rounded-full" />

              <div className="h-3" />

              <Skeleton className="mx-auto h-5 w-[80%] rounded-full" />
              <Skeleton className="mx-auto h-5 w-[68%] rounded-full" />
            </div>

            {/* ending mark */}
            <div className="mt-16 flex justify-center">
              <Skeleton className="h-2 w-2 rounded-full" />
            </div>
          </section>

          {/* Footer skeleton */}
          <footer className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
            <div className="border-t border-[#ddd4c9] pt-10">
              <div className="flex flex-col items-center">
                <Skeleton className="mb-5 h-12 w-12 rounded-full" />

                <Skeleton className="h-5 w-32 rounded-full" />

                <Skeleton className="mt-3 h-3 w-64 max-w-full rounded-full" />

                <Skeleton className="mt-2 h-3 w-48 max-w-full rounded-full" />
              </div>
            </div>
          </footer>
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
                      cursor-pointer
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
                    w-[calc(100vw-1rem)]
                    max-w-lg
                    max-h-[calc(100dvh-1rem)]
                    overflow-y-auto
                    rounded-[1.75rem]
                    border
                    border-[#ddd5ca]
                    bg-[#f8f5ef]
                    p-0
                    shadow-[0_24px_80px_rgba(55,45,35,0.18)]
                    sm:max-w-lg
                    sm:rounded-[2rem]
                  "
                >
                  {/* Header */}
                  <DialogHeader
                    className="
                      px-6
                      pb-0
                      pt-8
                      pr-12
                      text-left

                      sm:px-7
                      sm:pb-0
                      sm:pt-7
                      sm:pr-7
                      sm:text-left
                    "
                  >
                    <DialogTitle
                      className="
                        font-serif
                        text-[1.55rem]
                        font-normal
                        leading-[1.15]
                        tracking-[-0.02em]
                        text-[#292520]

                        sm:text-3xl
                        sm:leading-tight
                      "
                    >
                      Share this poem
                    </DialogTitle>

                    <DialogDescription
                      className="
                        mt-2.5
                        max-w-[270px]
                        text-[11px]
                        leading-[1.6]
                        text-[#8b8176]

                        sm:mt-1.5
                        sm:max-w-sm
                        sm:text-xs
                        sm:leading-relaxed
                      "
                    >
                      Send these words to someone who might keep them.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Poem preview */}
                  <div className="px-5 pt-5 sm:px-7 sm:pt-6">
                    <div
                      className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[#ded6cb]
                        bg-white/60
                        transition-colors
                        hover:bg-white/80
                      "
                    >
                      <div className="flex gap-3.5 p-3 sm:gap-4 sm:p-3.5">
                        {/* Cover */}
                        <div
                          className="
                            h-[72px]
                            w-[72px]
                            shrink-0
                            overflow-hidden
                            rounded-xl
                            bg-[#e9e3da]
                            sm:h-20
                            sm:w-20
                          "
                        >
                          {poem.coverImage ? (
                            <img
                              src={poem.coverImage}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[#948879]">
                              <BookOpen
                                className="h-5 w-5 sm:h-6 sm:w-6"
                                strokeWidth={1.2}
                              />
                            </div>
                          )}
                        </div>

                        {/* Text */}
                        <div className="min-w-0 self-center">
                          <p
                            className="
                              line-clamp-2
                              font-serif
                              text-[15px]
                              leading-tight
                              text-[#292520]
                              sm:text-base
                            "
                          >
                            {poem.title}
                          </p>

                          <p
                            className="
                              mt-1.5
                              line-clamp-2
                              text-[11px]
                              leading-relaxed
                              text-[#8b8176]
                              sm:mt-2
                              sm:text-xs
                            "
                          >
                            {poem.summary || "A poem from Satinder Poetry."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social sharing */}
                  <div className="px-5 pt-5 sm:px-7 sm:pt-6">
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {socialLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              group
                              flex
                              min-h-[68px]
                              flex-col
                              items-center
                              justify-center
                              gap-2
                              rounded-2xl
                              border
                              border-[#ded6cb]
                              bg-white/40
                              px-2
                              py-3
                              text-[#756b60]
                              transition-all
                              duration-200
                              hover:-translate-y-0.5
                              hover:border-[#bdb2a4]
                              hover:bg-white
                              hover:text-[#292520]
                              active:scale-[0.98]
                              sm:min-h-[76px]
                            "
                          >
                            <span
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                bg-[#eee8df]
                                transition-colors
                                group-hover:bg-[#e4ddd3]
                              "
                            >
                              <Icon className="h-4 w-4" strokeWidth={1.7} />
                            </span>

                            <span className="text-[10px] font-medium tracking-wide">
                              {item.name}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Copy link */}
                  <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-7 sm:pt-5">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="
                        group
                        flex
                        min-h-[52px]
                        w-full
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        border-[#d9d0c5]
                        bg-white/50
                        px-3.5
                        text-left
                        transition-all
                        hover:border-[#c7bcae]
                        hover:bg-white
                        active:scale-[0.99]
                        sm:px-4
                      "
                    >
                      <span
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#eee8df]
                        "
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-[#66785f]" />
                        ) : (
                          <Copy className="h-4 w-4 text-[#8b8176]" />
                        )}
                      </span>

                      <span className="min-w-0 flex-1 truncate text-xs text-[#8b8176]">
                        {copied ? "Link copied successfully" : shareUrl}
                      </span>

                      <span
                        className="
                          shrink-0
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.14em]
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
