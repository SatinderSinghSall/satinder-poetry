import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  FileText,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  Eye,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Feather,
  X,
  Heart,
  Clock,
  Sparkles,
  User,
  Calendar,
  Tag,
  Loader2,
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

export default function Poems() {
  const navigate = useNavigate();
  const [poems, setPoems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPoem, setSelectedPoem] = useState(null);

  // 📄 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchPoems();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    const result = poems.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.author?.toLowerCase().includes(q),
    );
    setFiltered(result);
    setCurrentPage(1); // Reset to page 1 whenever search query changes
  }, [search, poems]);

  const fetchPoems = async () => {
    try {
      setLoading(true);
      const res = await API.get("/poems");
      setPoems(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("Failed to load poems");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/poems/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Poem deleted");
      fetchPoems();
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🚫 Prevent background page scrolling when modal is open
  useEffect(() => {
    if (selectedPoem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPoem]);

  // 📄 Pagination Calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPoems = filtered.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Header loader */}
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading poems…</span>
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Admin Panel
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Poems</h1>
            <p className="text-sm text-muted-foreground">
              Manage and monitor published poems
            </p>
          </div>

          {/* Search + refresh */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search poems..."
                className="pl-9 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              onClick={fetchPoems}
              className="cursor-pointer"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button
              onClick={() => navigate("/admin/add-poem")}
              className="inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Poem</span>
            </Button>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-6 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-slate-900 text-white">
              <FileText className="w-5 h-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Poems</p>
              <p className="text-2xl font-semibold">{poems.length}</p>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col justify-between">
          {/* Horizontal Scroll Wrapper */}
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
                {currentPoems.map((poem, index) => (
                  <tr key={poem._id} className="border-t hover:bg-slate-50/50">
                    <td className="p-4 text-muted-foreground font-medium whitespace-nowrap">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-4 font-medium whitespace-nowrap">
                      {poem.title}
                    </td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {poem.author}
                    </td>

                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      {/* View Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setSelectedPoem(poem)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {/* Edit Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => navigate(`/admin/edit-poem/${poem._id}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      {/* Delete Dialog */}
                      <DeleteDialog
                        sNo={startIndex + index + 1}
                        title={poem.title}
                        author={poem.author}
                        itemType="poem"
                        onConfirm={() => handleDelete(poem._id)}
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
                  <Feather className="w-5 h-5 stroke-[1.75]" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>

              {/* Header & Subtitle */}
              <h3 className="text-base font-serif font-bold text-stone-900 tracking-tight">
                No poems found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mt-1 leading-relaxed">
                We couldn't find any published poems matching your search filter
                or query.
              </p>

              {/* Action Area */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to="/admin/add-poem"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create New Poem
                </Link>
              </div>
            </div>
          )}

          {/* 📄 PAGINATION CONTROLS */}
          {filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t p-4 bg-slate-50/50">
              {/* Left side: Row count & Items per page dropdown */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  Showing {startIndex + 1}–{Math.min(endIndex, filtered.length)}{" "}
                  of {filtered.length} poems
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
                    // Display current page, first, last, and immediate neighbours
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

        {/* 👁 VIEW POEM MODAL */}
        {selectedPoem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Feather className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      Poem Overview
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ID:{" "}
                      <span className="font-mono text-[11px]">
                        {selectedPoem._id || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Close ONLY via X button */}
                <button
                  onClick={() => setSelectedPoem(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body (Internal scroll only) */}
              <div className="overflow-y-auto p-6 space-y-6 flex-1 max-h-[calc(90vh-130px)]">
                {/* Header Badges & Title */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        selectedPoem.status === "published"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                      }`}
                    >
                      {selectedPoem.status || "N/A"}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        selectedPoem.featured
                          ? "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      {selectedPoem.featured ? "Featured" : "Not Featured"}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      Theme: {selectedPoem.theme || "N/A"}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    {selectedPoem.title || "N/A"}
                  </h1>

                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    By{" "}
                    <span className="text-slate-900 dark:text-slate-200 font-semibold">
                      {selectedPoem.author || "N/A"}
                    </span>
                  </p>
                </div>

                {/* Schema Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 p-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                        Views
                      </p>
                      <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                        {selectedPoem.views ?? 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                        Likes
                      </p>
                      <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                        {selectedPoem.likes ?? 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                        Read Time
                      </p>
                      <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                        {selectedPoem.readingTime != null
                          ? `${selectedPoem.readingTime} min`
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                        Added By
                      </p>
                      <p
                        className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate"
                        title={String(selectedPoem.addedBy)}
                      >
                        {selectedPoem.addedBy
                          ? typeof selectedPoem.addedBy === "object"
                            ? selectedPoem.addedBy?.name ||
                              selectedPoem.addedBy?.email ||
                              "Admin"
                            : selectedPoem.addedBy
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary Field */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Summary
                  </h3>
                  {selectedPoem.summary ? (
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic bg-amber-50/40 dark:bg-amber-950/20 border-l-2 border-amber-400 p-3 rounded-r-xl">
                      "{selectedPoem.summary}"
                    </p>
                  ) : (
                    <p className="text-xs font-medium text-slate-400 italic bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
                      N/A — No summary provided.
                    </p>
                  )}
                </div>

                {/* Cover Image & Scrollable Poem Body */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Cover Image Container (with Default Fallback) */}
                  <div className="md:col-span-5 space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Cover Image
                    </h3>
                    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-inner h-64 flex items-center justify-center">
                      {selectedPoem.coverImage ? (
                        <img
                          src={selectedPoem.coverImage}
                          alt={selectedPoem.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 space-y-2 p-4 text-center">
                          <Feather className="w-8 h-8 stroke-[1.5] text-slate-300" />
                          <span className="text-xs font-medium">
                            Default Image (No Cover Uploaded)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Poem Body (Custom Internal Scrollbar) */}
                  <div className="md:col-span-7 space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Poem Body
                    </h3>
                    <div className="whitespace-pre-line text-slate-800 dark:text-slate-200 font-serif text-base leading-relaxed border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-stone-50/60 dark:bg-slate-900/80 shadow-inner max-h-[256px] overflow-y-auto">
                      {selectedPoem.content ||
                        "N/A — No poem content available."}
                    </div>
                  </div>
                </div>

                {/* Tags Field */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Tags
                  </h3>
                  {selectedPoem.tags && selectedPoem.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPoem.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      N/A
                    </span>
                  )}
                </div>

                {/* Timestamps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Created:{" "}
                      {selectedPoem.createdAt
                        ? new Date(selectedPoem.createdAt).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:justify-end">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Last Updated:{" "}
                      {selectedPoem.updatedAt
                        ? new Date(selectedPoem.updatedAt).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer (Close only via button or X) */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPoem(null)}
                  className="rounded-xl cursor-pointer"
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedPoem(null);
                    navigate(`/admin/edit-poem/${selectedPoem._id}`);
                  }}
                  className="rounded-xl cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit Poem
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
