import { useState, useEffect } from "react";
import { fetchBooks } from "../api/api";
import {
  Star,
  Bookmark,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CuratorNote } from "@/components/CuratorNote";
import { SuggestBookCallout } from "@/components/SuggestBookCallout";

export default function Books() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        console.error("Failed to load books:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredBooks = books.filter((b) => b.type === activeTab);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-stone-200 relative">
      {/* Premium Full-Screen Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF9F6]/80 backdrop-blur-md transition-all duration-500">
          <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-white/70 border border-stone-200/60 shadow-2xl shadow-stone-900/10 max-w-sm w-full mx-4 text-center">
            {/* Elegant Dual-Ring Animated Spinner */}
            <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
              {/* Soft ambient glow behind spinner */}
              <div className="absolute inset-0 rounded-full bg-stone-300/40 blur-lg animate-pulse" />

              {/* Outer decorative track */}
              <div className="absolute inset-0 rounded-full border-2 border-stone-200" />

              {/* Inner active spinning gradient ring */}
              <div className="absolute inset-0 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />

              {/* Center icon feature */}
              <Sparkles className="w-5 h-5 text-slate-800 animate-pulse" />
            </div>

            {/* Premium Text Content */}
            <div className="space-y-1.5">
              <h3 className="text-lg font-serif font-medium text-slate-900 tracking-wide">
                Curating the Library
              </h3>
              <p className="text-xs font-sans text-stone-500 font-light tracking-wider uppercase">
                Fetching literature & recommendations...
              </p>
            </div>

            {/* Shimmer line indicator */}
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
            onClick={() => setActiveTab("recommended")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "recommended"
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 scale-105"
                : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <Star className="w-4 h-4" />
            Top Recommendations
          </button>
          <button
            onClick={() => setActiveTab("reading-list")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === "reading-list"
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 scale-105"
                : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Reading Wishlist
          </button>
        </div>

        {/* Content State */}
        {/* Empty State */}
        {!loading && filteredBooks.length === 0 ? (
          <div className="relative max-w-md mx-auto my-12 text-center p-8 sm:p-12 bg-white/80 backdrop-blur-sm rounded-3xl border border-stone-200/80 shadow-xl shadow-stone-900/5 transition-all duration-300">
            {/* Subtle Decorative Accent Dots */}
            <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-stone-300" />
            <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-stone-300" />

            {/* Floating Animated Icon Container */}
            <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              {/* Soft Ambient Glow */}
              <div className="absolute inset-0 rounded-2xl bg-amber-200/40 blur-xl animate-pulse" />

              {/* Icon Badge */}
              <div className="relative w-full h-full rounded-2xl bg-stone-900 text-stone-100 flex items-center justify-center shadow-lg shadow-stone-900/15 ring-1 ring-white/20">
                <BookOpen className="w-7 h-7 text-stone-200" />
              </div>
            </div>

            {/* Typography & Copy */}
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

            {/* Subtle Bottom Divider */}
            <div className="w-12 h-0.5 mx-auto mt-6 bg-stone-200/80 rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <Card
                key={book._id}
                className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Book Cover Container */}
                <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden flex items-center justify-center p-6">
                  <img
                    src={
                      book.coverImage ||
                      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80"
                    }
                    alt={book.title}
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

                {/* Card Content */}
                <CardContent className="flex flex-col flex-grow p-6">
                  <div className="flex-grow space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug group-hover:text-stone-700 transition-colors">
                        {book.title}
                      </h3>
                      {book.price > 0 && (
                        <span className="text-sm font-semibold text-slate-900 bg-stone-100 px-2 py-0.5 rounded">
                          ${book.price}
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

                  {/* Footer Actions */}
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
        )}
      </div>

      <CuratorNote />
      <SuggestBookCallout />
    </div>
  );
}
