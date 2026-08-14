import { useEffect, useState, useMemo } from "react";
import {
  Feather,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Mail,
  User,
  AlertCircle,
  Tag,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  FileText,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import {
  getSubmissionsApi,
  approveSubmissionApi,
  rejectSubmissionApi,
  deletePoemSubmissionApi,
  resetSubmissionToPendingApi,
} from "../../api/api";
import { DeleteConfirmModal } from "../DeleteConfirmModal";

export function AdminPoemSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  // Search & Pagination States
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // View Modal State
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    item: null,
  });

  // Status Change Confirmation Modal State
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    item: null,
    newStatus: "",
    isUpdating: false,
  });

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    item: null,
    isDeleting: false,
  });

  // 🛑 Lock background body scrolling whenever ANY modal is active
  const isAnyModalOpen =
    viewModal.isOpen || statusModal.isOpen || deleteModal.isOpen;

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAnyModalOpen]);

  // Fetch Submissions
  const loadSubmissions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getSubmissionsApi();
      setSubmissions(data.data || data || []);
    } catch (err) {
      console.error("Fetch Submissions Error:", err);
      setError(
        err.response?.data?.message ||
          "Network error while connecting to server. Ensure backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // Reset pagination when search, filter, or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter, itemsPerPage]);

  // Filter & Search Logic
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((item) => {
      // 1. Status Filter
      const matchesStatus = filter === "all" || item.status === filter;

      // 2. Search Query Filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.genre?.toLowerCase().includes(query) ||
        item.content?.toLowerCase().includes(query) ||
        item.user?.name?.toLowerCase().includes(query) ||
        item.user?.username?.toLowerCase().includes(query) ||
        item.user?.email?.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [submissions, filter, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredSubmissions.slice(startIndex, endIndex);

  // Prompt Status Change Modal
  const promptStatusChange = (item, newStatus) => {
    if (item.status === newStatus) return;
    setStatusModal({
      isOpen: true,
      item,
      newStatus,
      isUpdating: false,
    });
  };

  // Perform Actual Status Update from Modal
  const confirmStatusChange = async () => {
    if (!statusModal.item || !statusModal.newStatus) return;

    setStatusModal((prev) => ({ ...prev, isUpdating: true }));
    try {
      const id = statusModal.item._id;
      const newStatus = statusModal.newStatus;

      if (newStatus === "approved") {
        await approveSubmissionApi(id);
      } else if (newStatus === "rejected") {
        await rejectSubmissionApi(id);
      } else if (newStatus === "pending") {
        await resetSubmissionToPendingApi(id);
      }

      setSubmissions((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item,
        ),
      );
      setStatusModal({
        isOpen: false,
        item: null,
        newStatus: "",
        isUpdating: false,
      });
    } catch (err) {
      console.error("Status Change Error:", err);
      alert(
        err.response?.data?.message || "Failed to update submission status.",
      );
      setStatusModal((prev) => ({ ...prev, isUpdating: false }));
    }
  };

  // Open Delete Modal
  const promptDelete = (item) => {
    setDeleteModal({ isOpen: true, item, isDeleting: false });
  };

  // Perform Actual Delete from Modal
  const confirmDelete = async () => {
    if (!deleteModal.item) return;

    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));
    try {
      if (deletePoemSubmissionApi) {
        await deletePoemSubmissionApi(deleteModal.item._id);
      }
      setSubmissions((prev) =>
        prev.filter((i) => i._id !== deleteModal.item._id),
      );
      setDeleteModal({ isOpen: false, item: null, isDeleting: false });
    } catch (err) {
      console.error("Delete Submission Error:", err);
      alert(err.response?.data?.message || "Error deleting submission record.");
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3" /> Pending Review
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3 h-3" /> Approved & Published
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const formatStatusLabel = (status) => {
    switch (status) {
      case "approved":
        return "Approve & Publish";
      case "rejected":
        return "Reject";
      case "pending":
        return "Pending";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        itemName={deleteModal.item ? `Poem "${deleteModal.item.title}"` : ""}
        isDeleting={deleteModal.isDeleting}
        onClose={() =>
          setDeleteModal({ isOpen: false, item: null, isDeleting: false })
        }
        onConfirm={confirmDelete}
      />

      {/* Status Change Confirmation Modal */}
      {statusModal.isOpen && (
        <div className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center bg-black/40 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-5 border border-stone-100 relative my-auto">
            <button
              onClick={() =>
                setStatusModal({
                  isOpen: false,
                  item: null,
                  newStatus: "",
                  isUpdating: false,
                })
              }
              disabled={statusModal.isUpdating}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3.5 pr-6">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Update Status
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  Change submission status?
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to change the status of{" "}
              <strong className="text-stone-900">
                "{statusModal.item?.title}"
              </strong>{" "}
              to{" "}
              <strong className="text-stone-900 capitalize">
                "{formatStatusLabel(statusModal.newStatus)}"
              </strong>
              ?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-100">
              <button
                type="button"
                disabled={statusModal.isUpdating}
                onClick={() =>
                  setStatusModal({
                    isOpen: false,
                    item: null,
                    newStatus: "",
                    isUpdating: false,
                  })
                }
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={statusModal.isUpdating}
                onClick={confirmStatusChange}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition cursor-pointer inline-flex items-center gap-2"
              >
                {statusModal.isUpdating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <span>Confirm Change</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {viewModal.isOpen && viewModal.item && (
        <div className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center bg-stone-900/50 backdrop-blur-md p-3 sm:p-6 overflow-hidden">
          <div className="w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-100 flex flex-col max-h-[88vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Pinned Header */}
            <div className="p-4 sm:p-6 pb-4 border-b border-stone-100 shrink-0 bg-white space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-block text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100/80">
                  Poem Submission Details
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {getStatusBadge(viewModal.item.status)}
                  <button
                    onClick={() => setViewModal({ isOpen: false, item: null })}
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
                  {viewModal.item.title}
                </h2>
                <p className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 pt-1">
                  <Tag className="w-3.5 h-3.5" />{" "}
                  {viewModal.item.genre || "Poetry"}
                </p>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto custom-scrollbar flex-1">
              {/* Poem Content */}
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-stone-400" /> Poem
                  Content
                </label>
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 text-xs sm:text-sm text-stone-800 font-serif whitespace-pre-wrap leading-relaxed shadow-inner">
                  {viewModal.item.content || "No content provided."}
                </div>
              </div>

              {/* Author Note */}
              {viewModal.item.noteToAdmin && (
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-[11px] font-bold text-amber-800/80 uppercase tracking-wider flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5 text-amber-600" /> Author's
                    Note
                  </label>
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs text-stone-700 italic leading-relaxed">
                    "{viewModal.item.noteToAdmin}"
                  </div>
                </div>
              )}

              {/* User Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 sm:p-3.5 rounded-2xl border border-stone-100 bg-stone-50/50 space-y-0.5">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                    <User className="w-3 h-3 text-stone-400" /> Submitted By
                  </span>
                  <p className="text-xs font-semibold text-stone-800 truncate">
                    {viewModal.item.user?.name ||
                      viewModal.item.user?.username ||
                      "Anonymous User"}
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl border border-stone-100 bg-stone-50/50 space-y-0.5">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-stone-400" /> Email
                  </span>
                  <p className="text-xs font-semibold text-stone-800 truncate">
                    {viewModal.item.user?.email ? (
                      <a
                        href={`mailto:${viewModal.item.user.email}`}
                        className="hover:underline text-indigo-600"
                      >
                        {viewModal.item.user.email}
                      </a>
                    ) : (
                      <span className="text-stone-400 italic">
                        Not provided
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Timestamp Meta Grid (createdAt & updatedAt) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 sm:p-3.5 rounded-2xl border border-stone-100 bg-stone-50/50 space-y-0.5">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" /> Date
                    Submitted
                  </span>
                  <p className="text-xs font-semibold text-stone-800">
                    {new Date(viewModal.item.createdAt).toLocaleString(
                      "en-US",
                      {
                        dateStyle: "medium",
                        timeStyle: "medium",
                      },
                    )}
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl border border-stone-100 bg-stone-50/50 space-y-0.5">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" /> Last Updated
                  </span>
                  <p className="text-xs font-semibold text-stone-800">
                    {viewModal.item.updatedAt
                      ? new Date(viewModal.item.updatedAt).toLocaleString(
                          "en-US",
                          {
                            dateStyle: "medium",
                            timeStyle: "medium",
                          },
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Pinned Footer with Document ID */}
            <div className="p-3.5 px-4 sm:p-4 sm:px-6 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 font-mono">
                <span className="font-bold text-stone-400">ID:</span>
                <span className="bg-stone-200/60 px-2 py-0.5 rounded-md text-stone-700 select-all">
                  {viewModal.item._id}
                </span>
              </div>
              <button
                onClick={() => setViewModal({ isOpen: false, item: null })}
                className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            User Poem Submissions
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Review draft poems submitted by registered users and manage
            publication approvals.
          </p>
        </div>

        <button
          onClick={loadSubmissions}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors w-fit cursor-pointer"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {["all", "pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all cursor-pointer ${
                filter === tab
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tab.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, genre, content, author..."
            className="w-full pl-9 pr-8 py-2 border border-stone-300 rounded-xl text-xs bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading & Items Grid */}
      {loading ? (
        <div className="py-20 text-center text-stone-400">
          Loading poem submissions...
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="py-20 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200 space-y-2">
          <p className="font-medium text-stone-600">
            No poem submissions found.
          </p>
          <p className="text-xs">
            {searchQuery
              ? `No results matching "${searchQuery}"`
              : "Try changing your status filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {getStatusBadge(item.status)}
                  <span className="text-[11px] text-stone-400">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-amber-800 mt-0.5 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {item.genre || "Poetry"}
                  </p>
                </div>

                {/* Poem Content Box */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 max-h-48 overflow-y-auto">
                  <p className="text-xs text-stone-700 font-serif whitespace-pre-wrap leading-relaxed">
                    {item.content}
                  </p>
                </div>

                {item.noteToAdmin && (
                  <p className="text-xs text-stone-600 bg-amber-50/50 p-2.5 rounded-lg italic border border-amber-100 leading-relaxed">
                    <strong className="font-semibold text-stone-800 not-italic">
                      Author's Note:
                    </strong>{" "}
                    "{item.noteToAdmin}"
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-4">
                <div className="text-xs space-y-1 text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>
                      {item.user?.name ||
                        item.user?.username ||
                        "Anonymous User"}
                    </span>
                  </div>
                  {item.user?.email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <a
                        href={`mailto:${item.user.email}`}
                        className="hover:underline text-stone-700 truncate"
                      >
                        {item.user.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <select
                    value={item.status}
                    onChange={(e) => promptStatusChange(item, e.target.value)}
                    className="text-xs border border-stone-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approve & Publish</option>
                    <option value="rejected">Reject</option>
                  </select>

                  <div className="flex items-center gap-1.5">
                    {/* View Details Button */}
                    <button
                      type="button"
                      onClick={() => setViewModal({ isOpen: true, item })}
                      className="h-8 w-8 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 flex items-center justify-center transition cursor-pointer shadow-xs"
                      title="View Submission Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => promptDelete(item)}
                      className="h-8 w-8 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white flex items-center justify-center transition cursor-pointer shadow-sm shadow-red-500/20"
                      title="Delete Submission"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Pagination Controls */}
      {!loading && filteredSubmissions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200 text-xs text-stone-600">
          {/* Item Count Summary & Per-Page Selector */}
          <div className="flex items-center gap-4">
            <span>
              Showing{" "}
              <strong className="text-stone-900">
                {startIndex + 1}-
                {Math.min(endIndex, filteredSubmissions.length)}
              </strong>{" "}
              of{" "}
              <strong className="text-stone-900">
                {filteredSubmissions.length}
              </strong>{" "}
              entries
            </span>

            <div className="flex items-center gap-1.5">
              <span>Per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-stone-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
              >
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
            </div>
          </div>

          {/* Page Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 font-medium text-stone-800">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
