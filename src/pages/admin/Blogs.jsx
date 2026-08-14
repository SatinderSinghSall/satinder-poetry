import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "@/api/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  FileText,
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
  Tag,
  Calendar,
  User,
  Globe,
  Image as ImageIcon,
  Link2,
  Clock,
  X,
} from "lucide-react";
import { toast } from "sonner";
import DeleteDialog from "@/components/admin/DeleteDialog";

const Field = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4 border-b pb-2">
    <span className="font-medium text-slate-600">{label}</span>
    <span className="col-span-2 text-muted-foreground break-words">
      {value || "—"}
    </span>
  </div>
);

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // 📄 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    const result = blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.status?.toLowerCase().includes(q) ||
        (Array.isArray(b.tags) &&
          b.tags.some((tag) => tag.toLowerCase().includes(q))),
    );
    setFiltered(result);
    setCurrentPage(1); // Reset to page 1 on search change
  }, [search, blogs]);

  // 1. In fetchBlogs: safely extract the array regardless of backend response shape
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/blogs");

      // Check if res.data is an array or nested inside an object (e.g., res.data.blogs or res.data.data)
      const blogsData = Array.isArray(res.data)
        ? res.data
        : res.data.blogs || res.data.data || [];

      setBlogs(blogsData);
      setFiltered(blogsData);
    } catch {
      toast.error("Failed to load blog posts");
      setBlogs([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  // 2. In the search filter useEffect: add Array.isArray check
  useEffect(() => {
    const q = search.toLowerCase();

    if (!Array.isArray(blogs)) {
      setFiltered([]);
      return;
    }

    const result = blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.status?.toLowerCase().includes(q) ||
        (Array.isArray(b.tags) &&
          b.tags.some((tag) => tag.toLowerCase().includes(q))),
    );
    setFiltered(result);
    setCurrentPage(1);
  }, [search, blogs]);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Blog post deleted");
      fetchBlogs();
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔒 Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedBlog]);

  // 📄 Pagination Calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = filtered.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Header loader */}
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading blog posts…</span>
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
            <h1 className="text-2xl font-semibold tracking-tight">
              Blog Posts
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and publish articles, news, and posts
            </p>
          </div>

          {/* Search + Refresh + Add */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blogs or tags..."
                className="pl-9 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              onClick={fetchBlogs}
              className="cursor-pointer"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button
              onClick={() => navigate("/admin/add-blog")}
              className="inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Blog</span>
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
              <p className="text-sm text-muted-foreground">Total Articles</p>
              <p className="text-2xl font-semibold">{blogs.length}</p>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left w-16 whitespace-nowrap">
                    S.No.
                  </th>
                  <th className="p-4 text-left whitespace-nowrap">Title</th>
                  <th className="p-4 text-left whitespace-nowrap">Tags</th>
                  <th className="p-4 text-left whitespace-nowrap">Status</th>
                  <th className="p-4 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentBlogs.map((blog, index) => (
                  <tr key={blog._id} className="border-t hover:bg-slate-50/50">
                    <td className="p-4 text-muted-foreground font-medium whitespace-nowrap">
                      {startIndex + index + 1}
                    </td>
                    <td className="p-4 font-medium max-w-xs truncate whitespace-nowrap">
                      {blog.title}
                    </td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {Array.isArray(blog.tags) && blog.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {blog.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium whitespace-nowrap"
                            >
                              <Tag className="w-3 h-3 text-slate-400" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          blog.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {blog.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      {/* View */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedBlog(blog)}
                        className="cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {/* Edit */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      {/* Delete */}
                      <DeleteDialog
                        sNo={startIndex + index + 1}
                        title={blog.title}
                        author={blog.author}
                        itemType="blog"
                        onConfirm={() => handleDelete(blog._id)}
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
                No blog posts found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mt-1 leading-relaxed">
                We couldn't find any articles matching your current search query
                or filter selection.
              </p>

              {/* Action Area */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to="/admin/add-blog"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Blog
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
                  of {filtered.length} blogs
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
        {/* 👁 ULTRA-PREMIUM VIEW BLOG MODAL */}
        {/* ================================= */}
        {selectedBlog && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 transition-all duration-300 animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col overflow-hidden ring-1 ring-black/5">
              {/* 📌 Sticky Hero Header */}
              <div className="px-6 sm:px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
                        Blog Article
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 hidden sm:inline">
                        ID: {selectedBlog._id}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100 truncate mt-0.5 tracking-tight">
                      {selectedBlog.title || "Untitled Post"}
                    </h2>
                  </div>
                </div>

                {/* Header Close Control */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 📄 Scrollable Content Container */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 flex-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                {/* 📊 Glassmorphic Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Status */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </p>
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          selectedBlog.status === "published"
                            ? "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60"
                            : "bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            selectedBlog.status === "published"
                              ? "bg-emerald-500 animate-pulse"
                              : "bg-amber-500"
                          }`}
                        />
                        {selectedBlog.status === "published"
                          ? "Published"
                          : "Draft"}
                      </span>
                    </div>
                  </div>

                  {/* Views */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-indigo-500" /> Total
                      Views
                    </p>
                    <p className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 mt-1.5 font-mono">
                      {(selectedBlog.views || 0).toLocaleString()}
                    </p>
                  </div>

                  {/* Published At */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />{" "}
                      Published Date
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1.5 truncate">
                      {selectedBlog.publishedAt
                        ? new Date(selectedBlog.publishedAt).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : "Not Published"}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-indigo-500" /> Author
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1.5 truncate">
                      {typeof selectedBlog.author === "object"
                        ? selectedBlog.author?.name ||
                          selectedBlog.author?.email ||
                          "Admin User"
                        : selectedBlog.author || "Admin User"}
                    </p>
                  </div>
                </div>

                {/* 🖼 Cover Image Banner */}
                {selectedBlog.coverImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md aspect-video sm:aspect-[21/9] group">
                    <img
                      src={selectedBlog.coverImage}
                      alt={selectedBlog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5">
                      <a
                        href={selectedBlog.coverImage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white text-xs font-bold hover:underline flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20"
                      >
                        View Full Banner <Globe className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="h-36 sm:h-44 rounded-2xl bg-slate-100/80 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 gap-2">
                    <ImageIcon className="w-8 h-8 opacity-40" />
                    <span className="text-xs font-semibold">
                      No Cover Image Attached
                    </span>
                  </div>
                )}

                {/* 🏷 Slug & Tags Meta Grid */}
                <div className="grid sm:grid-cols-2 gap-4 bg-slate-50/80 dark:bg-slate-800/30 p-4 sm:p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                  {/* Slug */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Link2 className="w-3.5 h-3.5 text-indigo-500" /> Slug
                      Parameter
                    </span>
                    <p className="text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 break-all bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                      /{selectedBlog.slug || "n-a"}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-indigo-500" /> Category
                      Tags
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {Array.isArray(selectedBlog.tags) &&
                      selectedBlog.tags.length > 0 ? (
                        selectedBlog.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center px-3 py-1 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/80 dark:border-slate-800 shadow-2xs"
                          >
                            #{tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          No tags associated
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 📝 Excerpt Section */}
                {selectedBlog.excerpt && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Summary Excerpt
                    </h4>
                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-l-4 border-amber-500 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-serif italic">
                      "{selectedBlog.excerpt}"
                    </div>
                  </div>
                )}

                {/* 📖 Full Article Content Body */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Article Full Body
                  </h4>
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto font-sans shadow-inner scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                    {selectedBlog.content ||
                      "No content available for this post."}
                  </div>
                </div>

                {/* 🕒 Timestamp Footer Meta */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-400 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      Created:{" "}
                      <strong className="text-slate-600 dark:text-slate-300 font-semibold">
                        {selectedBlog.createdAt
                          ? new Date(selectedBlog.createdAt).toLocaleString()
                          : "—"}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      Updated:{" "}
                      <strong className="text-slate-600 dark:text-slate-300 font-semibold">
                        {selectedBlog.updatedAt
                          ? new Date(selectedBlog.updatedAt).toLocaleString()
                          : "—"}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* 🔘 Sticky Footer Controls (Mobile Vertical Stack + Desktop Inline) */}
              <div className="px-6 sm:px-8 py-4 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
                <span className="text-[11px] text-slate-400 hidden sm:inline font-mono">
                  Press ESC or click close to dismiss
                </span>

                {/* Action Buttons Group */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2.5 sm:ml-auto w-full sm:w-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      navigate(`/admin/edit-blog/${selectedBlog._id}`)
                    }
                    className="w-full sm:w-auto justify-center px-5 h-10 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-all shadow-2xs gap-2 text-indigo-600 dark:text-indigo-400"
                  >
                    <Edit className="w-4 h-4 text-indigo-500" />
                    Edit Article
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => setSelectedBlog(null)}
                    className="w-full sm:w-auto justify-center px-6 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white text-xs font-bold cursor-pointer transition-colors shadow-md"
                  >
                    Close Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
