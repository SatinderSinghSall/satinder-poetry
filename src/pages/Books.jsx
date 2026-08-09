import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { fetchBooks } from "../api/api";
import {
  Star,
  Bookmark,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  BookOpen,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CuratorNote } from "@/components/CuratorNote";
import { SuggestBookCallout } from "@/components/SuggestBookCallout";

export default function Books() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------- Pagination State ---------- */
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        console.error("Failed to load books:", err);
        setError(
          "Failed to fetch the library collection. Please try refreshing.",
        );
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter books based on active tab
  const filteredBooks = useMemo(() => {
    return books.filter((b) => b.type === activeTab);
  }, [books, activeTab]);

  // Reset to page 1 whenever tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Calculate total pages (at least 1)
  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / ITEMS_PER_PAGE),
  );

  // Slice array for current page
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  // Handle page change & scroll to library top
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 250, behavior: "smooth" });
  };

  /* ---------- Dynamic SEO Config ---------- */
  const canonicalUrl = "https://satinderpoetry.com/books"; // Adjust to your domain
  const seoTitle =
    activeTab === "recommended"
      ? "Recommended Books & Reading Room | Satinder Poetry"
      : "Poetry & Literature Reading Wishlist | Satinder Poetry";
  const seoDescription =
    "Explore curated literature, poetry collections, and artistic inspirations recommended by Satinder Singh Sall. Discover world poetry, philosophy, and classic reads.";

  // Schema.org Structured Data (ItemCollection / Book List)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seoTitle,
    description: seoDescription,
    url: canonicalUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: paginatedBooks.map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Book",
          name: book.title,
          author: {
            "@type": "Person",
            name: book.author || "Unknown",
          },
          ...(book.coverImage && { image: book.coverImage }),
          ...(book.genre && { genre: book.genre }),
          ...(book.buyUrl && { url: book.buyUrl }),
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-stone-200 relative">
      {/* ---------- SEO Meta Tags ---------- */}
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="keywords"
          content="Satinder Poetry books, recommended poetry books, poetry reading list, literature recommendations, Satinder Singh Sall, poetry collections, classic literature"
        />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80"
        />

        {/* JSON-LD Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Premium Full-Screen Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF9F6]/80 backdrop-blur-md transition-all duration-500">
          <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-white/70 border border-stone-200/60 shadow-2xl shadow-stone-900/10 max-w-sm w-full mx-4 text-center">
            <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-stone-300/40 blur-lg animate-pulse" />
              <div className="absolute inset-0 rounded-full border-2 border-stone-200" />
              <div className="absolute inset-0 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
              <Sparkles className="w-5 h-5 text-slate-800 animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-serif font-medium text-slate-900 tracking-wide">
                Curating the Library
              </h3>
              <p className="text-xs font-sans text-stone-500 font-light tracking-wider uppercase">
                Fetching literature & recommendations...
              </p>
            </div>

            <div className="w-24 h-0.5 mt-6 bg-stone-100 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-slate-900/40 animate-[shimmer_1.5s_infinite] -translate-x-full" />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-200/60 text-stone-700 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Curated Reading
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Library & Reading Room
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
            Curated literature, poetry collections, and reflections on art,
            films, and storytelling that inspire Satinder Poetry.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-3 mb-14">
          <button
            onClick={() => handleTabChange("recommended")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "recommended"
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 scale-105"
                : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <Star className="w-4 h-4" />
            Top Recommendations
          </button>
          <button
            onClick={() => handleTabChange("reading-list")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "reading-list"
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 scale-105"
                : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Reading Wishlist
          </button>
        </div>

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
            <h3 className="text-lg font-semibold text-red-900">
              Unable to load titles
            </h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredBooks.length === 0 && (
          <div className="relative max-w-md mx-auto my-12 text-center p-8 sm:p-12 bg-white/80 backdrop-blur-sm rounded-3xl border border-stone-200/80 shadow-xl shadow-stone-900/5 transition-all duration-300">
            <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-stone-300" />
            <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-stone-300" />

            <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-amber-200/40 blur-xl animate-pulse" />
              <div className="relative w-full h-full rounded-2xl bg-stone-900 text-stone-100 flex items-center justify-center shadow-lg shadow-stone-900/15 ring-1 ring-white/20">
                <BookOpen className="w-7 h-7 text-stone-200" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold tracking-widest text-stone-400 uppercase">
                Library Shelf Empty
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
                No Titles Found
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light max-w-sm mx-auto pt-1">
                There are currently no books added to this section. Check back
                soon for new additions to the collection.
              </p>
            </div>

            <div className="w-12 h-0.5 mx-auto mt-6 bg-stone-200/80 rounded-full" />
          </div>
        )}

        {/* Book Grid */}
        {!loading && !error && filteredBooks.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedBooks.map((book) => (
                <Card
                  key={book._id}
                  className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden flex items-center justify-center p-6">
                    <img
                      src={
                        book.coverImage ||
                        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80"
                      }
                      alt={`${book.title} cover by ${book.author}`}
                      loading="lazy"
                      className="h-full w-auto object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {book.category && (
                      <Badge className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-white font-normal text-xs px-3 py-1 border-none shadow-sm">
                        {book.category}
                      </Badge>
                    )}

                    {book.featured && (
                      <Badge className="absolute top-4 left-4 bg-amber-500 text-white font-medium text-xs px-2.5 py-0.5 border-none shadow-sm flex items-center gap-1">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>

                  <CardContent className="flex flex-col flex-grow p-6">
                    {/* Recommendation Tag */}
                    <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-900 text-[11px] font-semibold tracking-wide w-fit border border-amber-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      Recommended by Satinder Singh Sall
                    </div>

                    <div className="flex-grow space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug group-hover:text-stone-700 transition-colors">
                          {book.title}
                        </h3>
                        {book.price > 0 && (
                          <span className="text-sm font-semibold text-slate-900 bg-stone-100 px-2 py-0.5 rounded">
                            ₹{book.price}
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-medium text-stone-500">
                        by {book.author}
                      </p>

                      {(book.review || book.description) && (
                        <p className="text-slate-600 text-sm italic pt-2 line-clamp-3 leading-relaxed">
                          "{book.review || book.description}"
                        </p>
                      )}
                    </div>

                    <div className="pt-6 mt-4 border-t border-stone-100 flex items-center justify-between">
                      {book.genre ? (
                        <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                          {book.genre}
                        </span>
                      ) : (
                        <div />
                      )}

                      {book.buyUrl ? (
                        <a
                          href={book.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-stone-600 transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Get Copy{" "}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Always Visible Pagination Controls */}
            <div className="mt-16 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={
                  currentPage === 1 || filteredBooks.length <= ITEMS_PER_PAGE
                }
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full bg-white border border-stone-200 text-slate-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <div className="flex items-center gap-1.5 px-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const isDisabled = filteredBooks.length <= ITEMS_PER_PAGE;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={isDisabled}
                        className={`w-9 h-9 text-sm font-medium rounded-full transition-all ${
                          isDisabled
                            ? "bg-slate-100 text-slate-400 border border-stone-200 cursor-not-allowed"
                            : currentPage === pageNum
                              ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 font-bold cursor-pointer"
                              : "bg-white border border-stone-200 text-slate-700 hover:bg-stone-100 cursor-pointer"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  },
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === totalPages ||
                  filteredBooks.length <= ITEMS_PER_PAGE
                }
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full bg-white border border-stone-200 text-slate-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-all cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      <CuratorNote />
      <SuggestBookCallout />
    </div>
  );
}
