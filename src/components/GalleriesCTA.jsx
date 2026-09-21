import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_PORTFOLIO_API_URL || "/api";

const WORLDS = [
  {
    number: "01",
    title: "Literature",
  },
  {
    number: "02",
    title: "Stories",
  },
  {
    number: "03",
    title: "Music",
  },
  {
    number: "04",
    title: "Films",
  },
  {
    number: "05",
    title: "Poetry",
    italic: true,
  },
];

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85",
];

export default function GalleriesCTA({
  images: externalImages = [],
  href = "/gallery",
}) {
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeSet, setActiveSet] = useState(0);
  const [previousSet, setPreviousSet] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ============================================================
     FETCH GALLERY IMAGES
  ============================================================ */

  useEffect(() => {
    if (externalImages?.length > 0) {
      return;
    }

    let mounted = true;

    const fetchGalleryImages = async () => {
      try {
        const res = await axios.get(`${API}/gallery`);

        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.galleries)
            ? res.data.galleries
            : Array.isArray(res.data?.data)
              ? res.data.data
              : [];

        const images = list
          .filter((item) => item?.imageUrl)
          .map((item) => ({
            src: item.imageUrl,
            alt: item.title || "Gallery image",
            title: item.title || "",
          }));

        if (mounted && images.length) {
          setGalleryImages(images);
        }
      } catch (error) {
        console.error("GalleriesCTA image fetch error:", error);
      }
    };

    fetchGalleryImages();

    return () => {
      mounted = false;
    };
  }, [externalImages]);

  /* ============================================================
     REDUCED MOTION
  ============================================================ */

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setReducedMotion(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  /* ============================================================
     PAGE VISIBILITY
  ============================================================ */

  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  /* ============================================================
     NORMALIZE IMAGES
  ============================================================ */

  const images = useMemo(() => {
    if (externalImages?.length > 0) {
      return externalImages
        .filter(Boolean)
        .map((item) => {
          if (typeof item === "string") {
            return {
              src: item,
              alt: "Gallery image",
              title: "",
            };
          }

          return {
            src: item.src || item.imageUrl,
            alt: item.alt || item.title || "Gallery image",
            title: item.title || "",
          };
        })
        .filter((item) => item.src);
    }

    if (galleryImages.length) {
      return galleryImages;
    }

    return FALLBACK_IMAGES.map((src) => ({
      src,
      alt: "Gallery image",
      title: "",
    }));
  }, [externalImages, galleryImages]);

  /* ============================================================
     CREATE ROTATING GROUPS
  ============================================================ */

  const imageSets = useMemo(() => {
    if (!images.length) return [];

    if (images.length <= 4) {
      return [images];
    }

    const sets = [];

    /*
     * Move by 2 images each time.
     * This gives the collage a more organic editorial rhythm
     * instead of completely replacing every photograph.
     */

    for (let i = 0; i < images.length; i += 2) {
      const set = [
        images[i % images.length],
        images[(i + 1) % images.length],
        images[(i + 2) % images.length],
        images[(i + 3) % images.length],
      ];

      sets.push(set);
    }

    return sets;
  }, [images]);

  /* ============================================================
     ROTATION
  ============================================================ */

  useEffect(() => {
    if (reducedMotion || !isVisible || imageSets.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSet((current) => {
        const next = (current + 1) % imageSets.length;

        setPreviousSet(current);

        return next;
      });
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [imageSets.length, reducedMotion, isVisible]);

  /* ============================================================
     SAFE INDEX
  ============================================================ */

  useEffect(() => {
    if (activeSet >= imageSets.length) {
      setActiveSet(0);
    }
  }, [activeSet, imageSets.length]);

  const activeImages = imageSets[activeSet] || [];

  const previousImages = imageSets[previousSet] || [];

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <section className="relative overflow-hidden border-t border-[#d8d0c4] bg-[#eee9e0]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          {/* ==================================================
              TOP LABEL
          ================================================== */}

          <div className="mb-10 flex items-center gap-3 sm:mb-12 sm:gap-4">
            <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#91877b] sm:text-[9px]">
              Beyond the frame
            </span>

            <span className="h-px w-7 bg-[#aaa095] sm:w-10" />

            <span className="text-[8px] uppercase tracking-[0.2em] text-[#aaa095] sm:text-[9px]">
              The wider archive
            </span>
          </div>

          {/* ==================================================
              MAIN GRID
          ================================================== */}

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-20 xl:gap-24">
            {/* =================================================
                IMAGE COLLAGE
            ================================================= */}

            <div className="relative h-[420px] w-full sm:h-[530px] md:h-[570px] lg:h-[550px]">
              {/* subtle frame */}

              <div className="absolute inset-[4%_4%_3%_2%] border border-[#d5cdc1]" />

              {/* ==============================================
                  IMAGE 01 — LARGE
              ============================================== */}

              <div className="absolute left-0 top-[4%] h-[63%] w-[68%] overflow-hidden bg-[#ddd6ca]">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    key={`large-${activeSet}`}
                    src={activeImages[0]?.src}
                    alt={activeImages[0]?.alt}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${
                      reducedMotion ? "" : "animate-gallery-main"
                    }`}
                  />
                </div>
              </div>

              {/* ==============================================
                  IMAGE 02 — PORTRAIT
              ============================================== */}

              <div className="absolute right-0 top-[10%] h-[39%] w-[29%] overflow-hidden bg-[#ddd6ca]">
                <img
                  key={`portrait-${activeSet}`}
                  src={activeImages[1]?.src}
                  alt={activeImages[1]?.alt}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover ${
                    reducedMotion ? "" : "animate-gallery-side"
                  }`}
                />
              </div>

              {/* ==============================================
                  IMAGE 03 — LANDSCAPE
              ============================================== */}

              <div className="absolute bottom-[7%] right-[7%] h-[39%] w-[43%] overflow-hidden bg-[#ddd6ca]">
                <img
                  key={`landscape-${activeSet}`}
                  src={activeImages[2]?.src}
                  alt={activeImages[2]?.alt}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover ${
                    reducedMotion ? "" : "animate-gallery-side"
                  }`}
                />
              </div>

              {/* ==============================================
                  IMAGE 04 — SMALL PRINT
              ============================================== */}

              <div className="absolute bottom-0 left-[9%] h-[25%] w-[25%] overflow-hidden border-[5px] border-[#eee9e0] bg-[#ddd6ca] shadow-[0_8px_25px_rgba(40,34,28,0.08)]">
                <img
                  key={`small-${activeSet}`}
                  src={activeImages[3]?.src}
                  alt={activeImages[3]?.alt}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover ${
                    reducedMotion ? "" : "animate-gallery-small"
                  }`}
                />
              </div>

              {/* ==============================================
                  ARCHIVE MARK
              ============================================== */}

              {/* <div className="absolute bottom-0 left-0">
                <span className="font-serif text-[11px] italic text-[#8c8377]">
                  Visual archive
                </span>
              </div> */}

              {/* ==============================================
                  ROTATION INDICATOR
              ============================================== */}

              <div className="absolute right-0 bottom-0 flex items-center gap-2">
                {imageSets.map((_, index) => (
                  <span
                    key={index}
                    className={`h-px transition-all duration-700 ${
                      index === activeSet
                        ? "w-6 bg-[#4c463f]"
                        : "w-2 bg-[#c5bdb1]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* =================================================
                EDITORIAL CONTENT
            ================================================= */}

            <div className="lg:pl-2">
              <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#91877b] sm:text-[9px]">
                A world of words &amp; images
              </p>

              <h2 className="mt-6 max-w-[600px] font-serif text-[3.35rem] font-normal leading-[0.9] tracking-[-0.055em] text-[#201d19] sm:mt-7 sm:text-6xl md:text-[4.7rem] lg:text-[5.1rem] xl:text-[5.55rem]">
                The image is
                <br />
                <span className="italic">only the beginning.</span>
              </h2>

              <p className="mt-7 max-w-[470px] text-[13px] leading-6 text-[#756d63] sm:mt-8 sm:text-sm sm:leading-7 md:text-[15px]">
                Wander beyond the visual archive into the places where poetry,
                literature, stories, music and cinema meet.
              </p>

              {/* =================================================
                  WORLD LIST
              ================================================= */}

              <div className="mt-8 border-t border-[#d4ccc0] sm:mt-10">
                {WORLDS.map((world) => (
                  <div
                    key={world.number}
                    className="group border-b border-[#d4ccc0]"
                  >
                    <div className="flex items-center justify-between py-3.5 sm:py-4">
                      <span
                        className={`font-serif text-[19px] leading-none text-[#29251f] transition-transform duration-500 group-hover:translate-x-1.5 sm:text-[21px] ${
                          world.italic ? "italic" : ""
                        }`}
                      >
                        {world.title}
                      </span>

                      <span className="text-[8px] tracking-[0.2em] text-[#aaa095]">
                        {world.number}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* =================================================
                  CTA
              ================================================= */}

              <a
                href={href}
                className="
    group
    relative
    mt-8
    inline-flex
    items-center
    gap-4
    overflow-hidden
    rounded-full
    border
    border-[#3c3731]
    bg-transparent
    px-5
    py-3
    text-[9px]
    font-medium
    uppercase
    tracking-[0.22em]
    text-[#27231f]
    transition-all
    duration-500
    hover:border-[#27231f]
    hover:text-[#f7f4ee]
    sm:mt-9
    sm:px-6
    sm:py-3.5
    sm:text-[10px]
  "
              >
                {/* Animated background */}

                <span
                  className="
      absolute
      inset-0
      origin-left
      scale-x-0
      bg-[#27231f]
      transition-transform
      duration-500
      ease-[cubic-bezier(0.22,1,0.36,1)]
      group-hover:scale-x-100
    "
                />

                {/* Label */}

                <span className="relative z-10 whitespace-nowrap">
                  Enter the gallery
                </span>

                {/* Icon */}

                <span
                  className="
      relative
      z-10
      flex
      h-7
      w-7
      shrink-0
      items-center
      justify-center
      rounded-full
      border
      border-[#bdb4a8]
      bg-transparent
      transition-all
      duration-500
      group-hover:translate-x-1
      group-hover:border-[#8f867b]
      group-hover:bg-[#f7f4ee]
      group-hover:text-[#27231f]
    "
                >
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    className="
        block
        transition-transform
        duration-500
        group-hover:translate-x-[1px]
        group-hover:-translate-y-[1px]
      "
                  />
                </span>
              </a>
            </div>
          </div>

          {/* ==================================================
              BOTTOM SIGNATURE
          ================================================== */}

          <div className="mt-14 border-t border-[#d6cec2] pt-5 sm:mt-20 sm:pt-6">
            <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#9a9186]">
                Satinder Poetry
              </p>

              <p className="font-serif text-[13px] italic text-[#8a8176] sm:text-sm">
                Literature · Stories · Music · Films · Poetry
              </p>

              <p className="text-[8px] uppercase tracking-[0.2em] text-[#9a9186]">
                Visual Archive
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          ANIMATION
      ====================================================== */}

      <style>{`

        @keyframes galleryMain {

          0% {
            opacity: 0;
            transform: scale(1.035);
          }

          16% {
            opacity: 1;
            transform: scale(1);
          }

          82% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 0;
            transform: scale(1.012);
          }

        }


        @keyframes gallerySide {

          0% {
            opacity: 0;
            transform: scale(1.025);
          }

          18% {
            opacity: 1;
            transform: scale(1);
          }

          80% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 0;
            transform: scale(1.01);
          }

        }


        @keyframes gallerySmall {

          0% {
            opacity: 0;
            transform: translateY(5px) scale(1.02);
          }

          20% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          80% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          100% {
            opacity: 0;
            transform: translateY(-2px) scale(1.01);
          }

        }


        .animate-gallery-main {
          animation: galleryMain 3s ease-in-out both;
        }


        .animate-gallery-side {
          animation: gallerySide 3s ease-in-out both;
        }


        .animate-gallery-small {
          animation: gallerySmall 3s ease-in-out both;
        }


        @media (prefers-reduced-motion: reduce) {

          .animate-gallery-main,
          .animate-gallery-side,
          .animate-gallery-small {
            animation: none !important;
          }

        }


        @media (max-width: 640px) {

          .animate-gallery-main,
          .animate-gallery-side,
          .animate-gallery-small {
            animation-duration: 3s;
          }

        }

      `}</style>
    </section>
  );
}
