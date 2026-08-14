import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Library,
  Edit,
  Search,
  Loader2,
  RefreshCw,
  Eye,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  BookOpen,
  X,
  ExternalLink,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import DeleteDialog from "@/components/admin/DeleteDialog";

import { Link } from "react-router-dom";

const Field = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4 border-b pb-2">
    <span className="font-medium text-slate-600">{label}</span>
    <span className="col-span-2 text-muted-foreground break-words">
      {value || "—"}
    </span>
  </div>
);

export default function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  // 📄 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    const result = books.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q),
    );
    setFiltered(result);
    setCurrentPage(1); // Reset to page 1 on search change
  }, [search, books]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/books");
      setBooks(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Book deleted");
      fetchBooks();
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔒 Lock background scroll when modal is open
  useEffect(() => {
    if (selectedBook) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedBook]);

  // 📄 Pagination Calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = filtered.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Header loader */}
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading books…</span>
          </div>

          {/* Stats skeleton */}
          <Skeleton className="h-24 w-full rounded-2xl" />

          {/* Table skeleton */}
          <div className="rounded-2xl border bg-background p-6 space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* 🔐 Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Admin Panel
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Books</h1>
            <p className="text-sm text-muted-foreground">
              Manage and monitor published books
            </p>
          </div>

          {/* Search + Refresh + Add */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                className="pl-9 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              onClick={fetchBooks}
              className="cursor-pointer"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button
              onClick={() => navigate("/admin/add-book")}
              className="inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Book</span>
            </Button>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-6 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-slate-900 text-white">
              <Library className="w-5 h-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Books</p>
              <p className="text-2xl font-semibold">{books.length}</p>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left w-16 whitespace-nowrap">
                    S.No.
                  </th>
                  <th className="p-4 text-left whitespace-nowrap">Title</th>
                  <th className="p-4 text-left whitespace-nowrap">Author</th>
                  <th className="p-4 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentBooks.map((book, index) => (
                  <tr key={book._id} className="border-t hover:bg-slate-50/50">
                    <td className="p-4 text-muted-foreground font-medium whitespace-nowrap">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-4 font-medium whitespace-nowrap">
                      {book.title}
                    </td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {book.author}
                    </td>

                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      {/* View */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedBook(book)}
                        className="cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {/* Edit */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => navigate(`/admin/edit-book/${book._id}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      {/* Delete */}
                      <DeleteDialog
                        sNo={startIndex + index + 1}
                        title={book.title}
                        author={book.author}
                        itemType="book"
                        onConfirm={() => handleDelete(book._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 px-4 text-center bg-stone-50/50 rounded-2xl border border-dashed border-stone-200 my-2">
              {/* Icon Badge with Pulse Indicator */}
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/80 shadow-sm flex items-center justify-center text-stone-700">
                  <BookOpen className="w-5 h-5 stroke-[1.75]" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>

              {/* Header & Subtitle */}
              <h3 className="text-base font-serif font-bold text-stone-900 tracking-tight">
                No books found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mt-1 leading-relaxed">
                We couldn't find any books matching your current search query or
                filter selection.
              </p>

              {/* Action Area */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to="/admin/add-book"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Book
                </Link>
              </div>
            </div>
          )}

          {/* 📄 PAGINATION CONTROLS */}
          {filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t p-4 bg-slate-50/50">
              {/* Left side: Row info & Items per page dropdown */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  Showing {startIndex + 1}–{Math.min(endIndex, filtered.length)}{" "}
                  of {filtered.length} books
                </span>

                <div className="flex items-center gap-2">
                  <span>Per page:</span>
                  <select
                    className="h-8 w-16 rounded-md border bg-white px-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-400"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>

              {/* Right side: Navigation buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="h-8 w-8 p-0 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    const prevPage = array[index - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <div key={page} className="flex items-center">
                        {showEllipsis && (
                          <span className="px-2 text-muted-foreground text-xs">
                            ...
                          </span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="h-8 w-8 p-0 text-xs cursor-pointer"
                        >
                          {page}
                        </Button>
                      </div>
                    );
                  })}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="h-8 w-8 p-0 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ================================= */}
        {/* 👁 PREMIUM VIEW BOOK MODAL */}
        {/* ================================= */}
        {selectedBook && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 animate-in zoom-in-95 duration-200">
              {/* 📌 Header with Top-Right Cross Icon */}
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20 shrink-0">
                    <BookOpen className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      Book Specification
                    </h2>
                    <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                      ID: {selectedBook._id}
                    </p>
                  </div>
                </div>

                {/* Top Cross (X) Close Button */}
                <button
                  onClick={() => setSelectedBook(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 📜 Scrollable Body Area */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
                {/* 🖼️ Hero Spotlight Card */}
                <div className="flex flex-col sm:flex-row gap-6 bg-gradient-to-br from-slate-50 to-amber-50/30 dark:from-slate-800/60 dark:to-slate-800/20 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
                  {selectedBook.coverImage ? (
                    <img
                      src={selectedBook.coverImage}
                      alt={selectedBook.title}
                      className="w-full sm:w-36 h-48 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-md shrink-0"
                    />
                  ) : (
                    <div className="w-full sm:w-36 h-48 bg-slate-200/70 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 text-xs font-semibold shrink-0 border border-dashed border-slate-300 dark:border-slate-700">
                      No Cover
                    </div>
                  )}

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status Badge */}
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                          selectedBook.status === "published"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {selectedBook.status || "published"}
                      </span>

                      {/* Category */}
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-200/80 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300">
                        {selectedBook.category || "Literature"}
                      </span>

                      {/* Featured Badge */}
                      {selectedBook.featured && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {selectedBook.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        by{" "}
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">
                          {selectedBook.author}
                        </span>
                      </p>
                    </div>

                    {/* Price & Type Info */}
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                      <div className="bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                        Price:{" "}
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {selectedBook.price
                            ? `$${selectedBook.price}`
                            : "Free"}
                        </span>
                      </div>
                      <div className="bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-medium text-slate-600 dark:text-slate-400 capitalize">
                        Type:{" "}
                        <span className="text-slate-900 dark:text-slate-100 font-semibold">
                          {selectedBook.type || "recommended"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 📊 Detailed Schema Grid */}
                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Rating & Genre Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Rating
                      </span>
                      {selectedBook.rating ? (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < selectedBook.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-300 dark:text-slate-700"
                              }`}
                            />
                          ))}
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1.5">
                            {selectedBook.rating} / 5
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">
                          No rating provided
                        </span>
                      )}
                    </div>

                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Genre
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {selectedBook.genre || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Buy URL */}
                  <Field
                    label="Purchase Link"
                    value={
                      selectedBook.buyUrl ? (
                        <a
                          href={selectedBook.buyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium break-all"
                        >
                          <span>{selectedBook.buyUrl}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      ) : null
                    }
                  />

                  {/* Description */}
                  <Field label="Description" value={selectedBook.description} />

                  {/* Review / Critical Notes */}
                  {selectedBook.review && (
                    <Field label="Review / Notes" value={selectedBook.review} />
                  )}

                  {/* Tags */}
                  <Field
                    label="Tags"
                    value={
                      selectedBook.tags && selectedBook.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {selectedBook.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono border border-slate-200 dark:border-slate-700"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      ) : null
                    }
                  />

                  {/* Created & Updated Timestamps */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t dark:border-slate-800">
                    <div>
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                        Created At
                      </span>
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {selectedBook.createdAt
                          ? new Date(selectedBook.createdAt).toLocaleString()
                          : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                        Last Updated
                      </span>
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {selectedBook.updatedAt
                          ? new Date(selectedBook.updatedAt).toLocaleString()
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 📌 Bottom Sticky Action Footer */}
              <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const id = selectedBook._id;
                    setSelectedBook(null);
                    navigate(`/admin/edit-book/${id}`);
                  }}
                  className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs font-semibold"
                >
                  <Edit className="w-3.5 h-3.5 mr-1.5" />
                  Edit Book
                </Button>

                <Button
                  onClick={() => setSelectedBook(null)}
                  className="rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white text-xs font-semibold px-5 cursor-pointer shadow-sm"
                >
                  Close Specification
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
