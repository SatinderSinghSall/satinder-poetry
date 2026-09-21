import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const API = import.meta.env.VITE_PORTFOLIO_API_URL || "/api";

const SITE_URL =
  import.meta.env.VITE_SITE_URL ||
  (typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:5173");

const PAGE_URL = `${SITE_URL}/gallery`;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=85";

export default function Gallery() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  /* ============================================================
     FETCH GALLERY
  ============================================================ */

  const fetchGalleries = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API}/gallery`);

      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.galleries)
          ? res.data.galleries
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

      setGalleries(list);
    } catch (err) {
      console.error("Gallery fetch error:", err);

      setError(
        err.response?.data?.message || "Unable to load the gallery right now.",
      );

      setGalleries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  /* ============================================================
     BODY SCROLL LOCK
  ============================================================ */

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  /* ============================================================
     CATEGORIES
  ============================================================ */

  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        galleries.map((item) => item.category?.trim()).filter(Boolean),
      ),
    ];

    return ["All", ...unique];
  }, [galleries]);

  /* ============================================================
     FILTERED GALLERY
  ============================================================ */

  const filteredGalleries = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return galleries.filter((item) => {
      const matchesSearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [galleries, searchTerm, selectedCategory]);

  /* ============================================================
     LIGHTBOX INDEX
  ============================================================ */

  const currentIndex = selectedImage
    ? filteredGalleries.findIndex((item) => item._id === selectedImage._id)
    : -1;

  /* ============================================================
     LIGHTBOX NAVIGATION
  ============================================================ */

  const showPrevious = () => {
    if (filteredGalleries.length < 2) return;

    const index =
      currentIndex <= 0 ? filteredGalleries.length - 1 : currentIndex - 1;

    setSelectedImage(filteredGalleries[index]);
  };

  const showNext = () => {
    if (filteredGalleries.length < 2) return;

    const index =
      currentIndex >= filteredGalleries.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(filteredGalleries[index]);
  };

  /* ============================================================
     KEYBOARD CONTROLS
  ============================================================ */

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, currentIndex, filteredGalleries]);

  /* ============================================================
     SEO IMAGE
  ============================================================ */

  const seoImage =
    galleries.find((item) => item.imageUrl)?.imageUrl || FALLBACK_IMAGE;

  /* ============================================================
     STRUCTURED DATA
     KEEPING EXISTING SEO STRUCTURE
  ============================================================ */

  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Galleries & Images",
    description:
      "A curated collection of photographs, places, experiences, and moments from Satinder Singh Sall's portfolio.",
    url: PAGE_URL,
    image: galleries
      .filter((item) => item.imageUrl)
      .map((item) => item.imageUrl),
    hasPart: galleries
      .filter((item) => item.imageUrl)
      .map((item) => ({
        "@type": "ImageObject",
        name: item.title || "Gallery image",
        description: item.description || undefined,
        contentUrl: item.imageUrl,
        url: item.imageUrl,
      })),
  };

  return (
    <>
      {/* ========================================================
          SEO
          INTENTIONALLY PRESERVED
      ======================================================== */}

      <Helmet>
        {/* =====================================================
            PAGE SEO
        ===================================================== */}

        <title>Galleries & Images | Satinder Singh Sall</title>

        <meta
          name="description"
          content="Explore Galleries & Images by Satinder Singh Sall — a curated visual collection of photographs, places, experiences, projects, and memorable moments."
        />

        <meta
          name="keywords"
          content="Satinder Singh Sall, gallery, galleries, images, photography, visual portfolio, photographs, creative portfolio, portfolio gallery"
        />

        <meta name="author" content="Satinder Singh Sall" />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta name="theme-color" content="#f7f4ee" />

        <link rel="canonical" href={PAGE_URL} />

        {/* =====================================================
            OPEN GRAPH
        ===================================================== */}

        <meta
          property="og:title"
          content="Galleries & Images | Satinder Singh Sall"
        />

        <meta
          property="og:description"
          content="A curated visual collection of photographs, places, experiences, and moments."
        />

        <meta property="og:type" content="website" />

        <meta property="og:url" content={PAGE_URL} />

        <meta property="og:site_name" content="Satinder Singh Sall" />

        <meta property="og:image" content={seoImage} />

        <meta
          property="og:image:alt"
          content="Galleries & Images — Satinder Singh Sall"
        />

        {/* =====================================================
            TWITTER / X
        ===================================================== */}

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Galleries & Images | Satinder Singh Sall"
        />

        <meta
          name="twitter:description"
          content="Explore a curated visual collection of photographs, places, experiences, and moments."
        />

        <meta name="twitter:image" content={seoImage} />

        <meta
          name="twitter:image:alt"
          content="Galleries & Images — Satinder Singh Sall"
        />

        {/* =====================================================
            IMAGE GALLERY STRUCTURED DATA
        ===================================================== */}

        <script type="application/ld+json">
          {JSON.stringify(imageGallerySchema)}
        </script>
      </Helmet>

      {/* ========================================================
          PAGE
      ======================================================== */}

      <main className="min-h-screen bg-[#f7f4ee] text-[#1b1916] selection:bg-[#1b1916] selection:text-white">
        {/* ======================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-[#dcd5ca] bg-[#f7f4ee]">
          <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-10 sm:px-10 sm:pb-20 sm:pt-12 lg:px-12 lg:pb-20 lg:pt-14">
            <div className="mx-auto max-w-[1180px]">
              {/* =====================================================
          TOP LABEL
      ===================================================== */}

              <div className="flex items-center gap-4 text-[9px] font-medium uppercase tracking-[0.32em] text-[#8e8579]">
                <span>Gallery</span>

                <span className="h-px w-9 bg-[#aaa195]" />

                <span>Visual Archive</span>
              </div>

              {/* =====================================================
          MAIN HERO
      ===================================================== */}

              <div className="mt-9 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.65fr)] lg:gap-20 xl:gap-28">
                {/* =================================================
            LEFT
        ================================================= */}

                <div className="min-w-0">
                  <h1 className="max-w-[780px] font-serif text-[clamp(4.5rem,8.5vw,8rem)] font-normal leading-[0.84] tracking-[-0.065em] text-[#171513]">
                    Galleries
                    <br />
                    <span className="italic">&amp; Images</span>
                  </h1>

                  {/* Small editorial statement */}

                  <div className="mt-10 max-w-[520px] border-t border-[#d7cfc3] pt-6 sm:mt-12">
                    <p className="font-serif text-xl leading-[1.25] text-[#332e28] sm:text-2xl">
                      A visual collection.
                    </p>

                    <p className="mt-3 max-w-md text-sm leading-7 text-[#776f65]">
                      A selection of photographs, places, experiences, and
                      moments collected along the way.
                    </p>
                  </div>
                </div>

                {/* =================================================
            RIGHT — THE WORLD BEYOND THE FRAME
        ================================================= */}

                <div className="mt-12 lg:mt-0">
                  <div className="border-l border-[#d5cdc1] pl-7 sm:pl-9">
                    {/* Label */}

                    <div className="mb-6 flex items-center justify-between">
                      <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#91877b]">
                        Beyond the frame
                      </p>

                      <span className="font-serif text-xs italic text-[#aaa095]">
                        05
                      </span>
                    </div>

                    {/* =================================================
                ARCHIVE WORLDS
            ================================================= */}

                    <div>
                      {/* Literature */}

                      <div className="group border-t border-[#d8d0c4]">
                        <div className="flex items-center justify-between py-4 sm:py-[18px]">
                          <span className="font-serif text-[23px] leading-none text-[#27231f] transition-transform duration-300 group-hover:translate-x-1.5">
                            Literature
                          </span>

                          <span className="text-[8px] tracking-[0.2em] text-[#aaa095]">
                            01
                          </span>
                        </div>
                      </div>

                      {/* Stories */}

                      <div className="group border-t border-[#d8d0c4]">
                        <div className="flex items-center justify-between py-4 sm:py-[18px]">
                          <span className="font-serif text-[23px] leading-none text-[#27231f] transition-transform duration-300 group-hover:translate-x-1.5">
                            Stories
                          </span>

                          <span className="text-[8px] tracking-[0.2em] text-[#aaa095]">
                            02
                          </span>
                        </div>
                      </div>

                      {/* Music */}

                      <div className="group border-t border-[#d8d0c4]">
                        <div className="flex items-center justify-between py-4 sm:py-[18px]">
                          <span className="font-serif text-[23px] leading-none text-[#27231f] transition-transform duration-300 group-hover:translate-x-1.5">
                            Music
                          </span>

                          <span className="text-[8px] tracking-[0.2em] text-[#aaa095]">
                            03
                          </span>
                        </div>
                      </div>

                      {/* Films */}

                      <div className="group border-t border-[#d8d0c4]">
                        <div className="flex items-center justify-between py-4 sm:py-[18px]">
                          <span className="font-serif text-[23px] leading-none text-[#27231f] transition-transform duration-300 group-hover:translate-x-1.5">
                            Films
                          </span>

                          <span className="text-[8px] tracking-[0.2em] text-[#aaa095]">
                            04
                          </span>
                        </div>
                      </div>

                      {/* Poetry */}

                      <div className="group border-y border-[#d8d0c4]">
                        <div className="flex items-center justify-between py-4 sm:py-[18px]">
                          <span className="font-serif text-[23px] italic leading-none text-[#27231f] transition-transform duration-300 group-hover:translate-x-1.5">
                            Poetry
                          </span>

                          <span className="text-[8px] tracking-[0.2em] text-[#aaa095]">
                            05
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}

                    <p className="mt-7 max-w-[300px] font-serif text-[14px] italic leading-6 text-[#80776c]">
                      Words, images, sounds and stories — different ways of
                      keeping a moment alive.
                    </p>
                  </div>
                </div>
              </div>

              {/* =====================================================
          ARCHIVE META
      ===================================================== */}

              <div className="mt-16 border-t border-[#dcd5ca] pt-7 sm:mt-20">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                  {/* Stats */}

                  <div className="flex items-end gap-8 sm:gap-10">
                    <div>
                      <p className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] text-[#171513]">
                        {galleries.length}
                      </p>

                      <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.25em] text-[#938a7f]">
                        Images
                      </p>
                    </div>

                    <div className="h-10 w-px bg-[#d4ccc0]" />

                    <div>
                      <p className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] text-[#171513]">
                        {Math.max(categories.length - 1, 0)}
                      </p>

                      <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.25em] text-[#938a7f]">
                        Collections
                      </p>
                    </div>
                  </div>

                  {/* Closing line */}

                  <p className="max-w-[330px] font-serif text-sm italic leading-6 text-[#91877b] sm:text-right">
                    A growing archive of places, fragments, memories and
                    moments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            ARCHIVE INTRO
        ====================================================== */}

        <section className="border-b border-[#dcd5ca] bg-[#eee9e0]">
          <div className="mx-auto max-w-7xl px-6 py-7 sm:px-10 lg:px-12">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#91877a]">
                  The Archive
                </span>

                <span className="h-px w-8 bg-[#bdb4a7]" />

                <span className="font-serif text-sm italic text-[#635c53]">
                  photographs, stories, fragments & memories
                </span>
              </div>

              <p className="text-[9px] uppercase tracking-[0.22em] text-[#978e83]">
                Satinder Poetry
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            FILTER / SEARCH BAR
        ====================================================== */}

        <section className="border-b border-[#dcd5ca] bg-[#f7f4ee]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <div className="flex min-h-[86px] flex-col justify-center gap-5 py-5 md:flex-row md:items-center md:justify-between">
              {/* Categories */}

              <div className="flex min-w-0 items-center gap-4">
                <span className="hidden shrink-0 text-[9px] font-medium uppercase tracking-[0.24em] text-[#938a7e] sm:block">
                  Browse
                </span>

                <span className="hidden h-4 w-px bg-[#d0c7bb] sm:block" />

                <div className="flex min-w-0 items-center gap-5 overflow-x-auto scrollbar-none">
                  {categories.map((category) => {
                    const active = selectedCategory === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`relative shrink-0 cursor-pointer py-2 text-[10px] font-medium uppercase tracking-[0.17em] transition-colors duration-300 ${
                          active
                            ? "text-[#171513]"
                            : "text-[#8d857a] hover:text-[#171513]"
                        }`}
                      >
                        {category}

                        {active && (
                          <span className="absolute bottom-0 left-0 right-0 h-px bg-[#171513]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search */}

              <div className="relative w-full md:w-64">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#968d81]" />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search the archive"
                  aria-label="Search gallery"
                  className="h-10 w-full border-b border-[#cfc6b9] bg-transparent pl-7 pr-2 text-xs text-[#292520] outline-none transition-colors placeholder:text-[#9b9287] hover:border-[#948a7d] focus:border-[#171513]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            GALLERY
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
          {/* ====================================================
              LOADING
          ==================================================== */}

          {loading ? (
            <div className="columns-1 gap-x-8 sm:columns-2 lg:columns-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="mb-12 break-inside-avoid">
                  <div
                    className={`animate-pulse bg-[#e9e4da] ${
                      item % 3 === 0
                        ? "h-[430px]"
                        : item % 2 === 0
                          ? "h-[340px]"
                          : "h-[270px]"
                    }`}
                  />

                  <div className="border-b border-[#ddd5c9] py-5">
                    <div className="h-2.5 w-12 animate-pulse bg-[#ddd6cc]" />

                    <div className="mt-3 h-5 w-2/3 animate-pulse bg-[#e1dbd1]" />

                    <div className="mt-3 h-2.5 w-1/2 animate-pulse bg-[#e5dfd6]" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* ==================================================
               ERROR
            ================================================== */

            <div className="mx-auto max-w-lg py-28 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#d4ccc0]">
                <PhotoIcon className="h-6 w-6 text-[#968d82]" />
              </div>

              <p className="mt-7 text-[9px] font-medium uppercase tracking-[0.25em] text-[#93897d]">
                Archive
              </p>

              <h2 className="mt-3 font-serif text-3xl font-normal text-[#201d19]">
                Gallery unavailable
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#776f65]">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchGalleries}
                className="mt-7 cursor-pointer border-b border-[#171513] pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#171513] transition-opacity hover:opacity-60"
              >
                Try again
              </button>
            </div>
          ) : filteredGalleries.length === 0 ? (
            /* ==================================================
               EMPTY
            ================================================== */

            <div className="mx-auto max-w-lg py-28 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#d4ccc0]">
                <PhotoIcon className="h-6 w-6 text-[#968d82]" />
              </div>

              <p className="mt-7 text-[9px] font-medium uppercase tracking-[0.25em] text-[#93897d]">
                Nothing found
              </p>

              <h2 className="mt-3 font-serif text-3xl font-normal text-[#201d19]">
                Nothing here yet
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#776f65]">
                No gallery images match your current selection.
              </p>

              {(searchTerm || selectedCategory !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-7 cursor-pointer border-b border-[#171513] pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#171513] transition-opacity hover:opacity-60"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            /* ==================================================
               IMAGE ARCHIVE
            ================================================== */

            <>
              <div className="columns-1 gap-x-8 sm:columns-2 lg:columns-3">
                {filteredGalleries.map((gallery, index) => (
                  <article
                    key={gallery._id}
                    className="group mb-14 break-inside-avoid cursor-pointer"
                    onClick={() => setSelectedImage(gallery)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedImage(gallery);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${gallery.title || "gallery image"}`}
                  >
                    {/* Image */}

                    <div className="relative overflow-hidden bg-[#e7e1d7]">
                      {gallery.imageUrl ? (
                        <img
                          src={gallery.imageUrl}
                          alt={
                            gallery.description
                              ? `${gallery.title} — ${gallery.description}`
                              : gallery.title || "Gallery image"
                          }
                          title={gallery.title || "Gallery image"}
                          loading={index < 3 ? "eager" : "lazy"}
                          decoding="async"
                          className="block h-auto w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                        />
                      ) : (
                        <div className="flex min-h-[280px] items-center justify-center">
                          <PhotoIcon className="h-10 w-10 text-[#aaa094]" />
                        </div>
                      )}

                      {/* Image hover veil */}

                      <div className="pointer-events-none absolute inset-0 bg-[#171513]/0 transition-all duration-700 group-hover:bg-[#171513]/[0.035]" />

                      {/* Archive number */}

                      <div className="pointer-events-none absolute left-4 top-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <span className="bg-[#f7f4ee]/90 px-2.5 py-1.5 text-[9px] font-medium tracking-[0.15em] text-[#39342e] backdrop-blur-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Caption */}

                    <div className="border-b border-[#d8d0c4] px-1 pb-5 pt-5">
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          {/* Number */}

                          <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#a0978b]">
                            {String(index + 1).padStart(2, "0")}
                          </p>

                          {/* Title */}

                          <h3 className="font-serif text-xl font-normal leading-tight tracking-[-0.02em] text-[#201d19] transition-opacity duration-300 group-hover:opacity-60">
                            {gallery.title}
                          </h3>

                          {/* Description */}

                          {gallery.description && (
                            <p className="mt-2 line-clamp-2 max-w-sm text-xs leading-5 text-[#7d756b]">
                              {gallery.description}
                            </p>
                          )}
                        </div>

                        {/* Category */}

                        <span className="shrink-0 pt-1 text-[8px] font-medium uppercase tracking-[0.17em] text-[#93897d]">
                          {gallery.category || "General"}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Archive footer */}

              <div className="mt-6 border-t border-[#d8d0c4] pt-7">
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#9a9185]">
                    Visual Archive
                  </p>

                  <p className="font-serif text-sm italic text-[#81786d]">
                    {filteredGalleries.length}{" "}
                    {filteredGalleries.length === 1 ? "image" : "images"}
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#9a9185]">
                    Satinder Poetry
                  </p>
                </div>
              </div>
            </>
          )}
        </section>

        {/* ======================================================
            CLOSING EDITORIAL SECTION
        ====================================================== */}

        {!loading && !error && filteredGalleries.length > 0 && (
          <section className="border-t border-[#dcd5ca] bg-[#eee9e0]">
            <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_360px] md:items-end">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#91877b]">
                    The collection continues
                  </p>

                  <h2 className="mt-5 max-w-3xl font-serif text-4xl font-normal leading-[0.98] tracking-[-0.04em] text-[#211e1a] sm:text-5xl lg:text-6xl">
                    Some photographs
                    <br />
                    <span className="italic">become memories.</span>
                  </h2>
                </div>

                <p className="max-w-sm text-sm leading-7 text-[#756d63] md:pb-1">
                  A growing collection of places, people, fragments, stories,
                  music, films, and moments gathered along the way.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================
            LIGHTBOX
        ====================================================== */}

        {selectedImage && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#11100e]/[0.97] p-3 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedImage(null);
              }
            }}
          >
            {/* Close */}

            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-30 flex h-11 w-11 cursor-pointer items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#f7f4ee] hover:text-[#171513] sm:right-7 sm:top-7"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Previous */}

            {filteredGalleries.length > 1 && (
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#f7f4ee] hover:text-[#171513] sm:left-7"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            )}

            {/* Next */}

            {filteredGalleries.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#f7f4ee] hover:text-[#171513] sm:right-7"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            )}

            {/* ==================================================
                LIGHTBOX CONTENT
            ================================================== */}

            <div className="flex max-h-[94vh] max-w-[1400px] flex-col overflow-hidden bg-[#f7f4ee] shadow-2xl lg:flex-row">
              {/* Image */}

              <div className="relative flex min-h-[45vh] flex-1 items-center justify-center bg-[#161513] lg:min-h-[78vh]">
                {selectedImage.imageUrl ? (
                  <img
                    src={selectedImage.imageUrl}
                    alt={
                      selectedImage.description
                        ? `${selectedImage.title} — ${selectedImage.description}`
                        : selectedImage.title || "Gallery image"
                    }
                    title={selectedImage.title || "Gallery image"}
                    className="max-h-[78vh] max-w-full object-contain"
                  />
                ) : (
                  <PhotoIcon className="h-16 w-16 text-[#625d56]" />
                )}

                {/* Image counter */}

                {filteredGalleries.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                    {String(currentIndex + 1).padStart(2, "0")}

                    {" / "}

                    {String(filteredGalleries.length).padStart(2, "0")}
                  </div>
                )}
              </div>

              {/* Editorial details */}

              <aside className="w-full shrink-0 overflow-y-auto bg-[#f7f4ee] p-7 sm:p-9 lg:w-[370px] lg:p-10">
                {/* Category */}

                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#91877b]">
                    {selectedImage.category || "General"}
                  </span>

                  <span className="h-px w-6 bg-[#c9c0b4]" />

                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#aaa196]">
                    Archive
                  </span>
                </div>

                {/* Title */}

                <h2 className="mt-7 font-serif text-4xl font-normal leading-[0.98] tracking-[-0.035em] text-[#1d1a17]">
                  {selectedImage.title}
                </h2>

                {/* Description */}

                {selectedImage.description && (
                  <p className="mt-6 text-sm leading-7 text-[#756d63]">
                    {selectedImage.description}
                  </p>
                )}

                {/* Divider */}

                <div className="my-8 h-px bg-[#dcd5ca]" />

                {/* Image position */}

                {filteredGalleries.length > 1 && (
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#948a7f]">
                      Image
                    </span>

                    <span className="font-serif text-lg text-[#3b352f]">
                      {String(currentIndex + 1).padStart(2, "0")}

                      <span className="mx-1 text-[#aaa095]">/</span>

                      {String(filteredGalleries.length).padStart(2, "0")}
                    </span>
                  </div>
                )}

                {/* Quote-like detail */}

                <div className="mt-10 border-l border-[#bdb3a6] pl-5">
                  <p className="font-serif text-base italic leading-7 text-[#625a50]">
                    A fragment from the visual archive.
                  </p>
                </div>

                {/* Navigation */}

                {filteredGalleries.length > 1 && (
                  <div className="mt-10 grid grid-cols-2 border-t border-[#dcd5ca]">
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="group flex cursor-pointer items-center gap-3 border-r border-[#dcd5ca] py-5 text-left"
                    >
                      <ChevronLeftIcon className="h-4 w-4 text-[#8d8377] transition-transform group-hover:-translate-x-1" />

                      <span>
                        <span className="block text-[8px] uppercase tracking-[0.2em] text-[#a0988d]">
                          Previous
                        </span>

                        <span className="mt-1 block text-xs text-[#38332d]">
                          Image
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={showNext}
                      className="group flex cursor-pointer items-center justify-end gap-3 py-5 text-right"
                    >
                      <span>
                        <span className="block text-[8px] uppercase tracking-[0.2em] text-[#a0988d]">
                          Next
                        </span>

                        <span className="mt-1 block text-xs text-[#38332d]">
                          Image
                        </span>
                      </span>

                      <ChevronRightIcon className="h-4 w-4 text-[#8d8377] transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}

                {/* Close */}

                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="mt-7 w-full cursor-pointer border border-[#cfc6ba] bg-transparent px-5 py-3.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#403a33] transition-all duration-300 hover:border-[#171513] hover:bg-[#171513] hover:text-white"
                >
                  Close Archive
                </button>
              </aside>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
