import { useEffect, useState } from "react";
import {
  BookOpen,
  Trash2,
  CheckCircle,
  Clock,
  Archive,
  RefreshCw,
  Mail,
  User,
  AlertCircle,
} from "lucide-react";
import {
  fetchBookSuggestions,
  updateBookSuggestionStatus,
  deleteBookSuggestion,
} from "../../api/api";
import { DeleteConfirmModal } from "../DeleteConfirmModal";

export function AdminBookSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  // Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    item: null,
    isDeleting: false,
  });

  // Fetch Suggestions
  const loadSuggestions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchBookSuggestions();
      setSuggestions(data.data || data || []);
    } catch (err) {
      console.error("Fetch Suggestions Error:", err);
      setError(
        err.response?.data?.message ||
          "Network error while connecting to server. Ensure backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  // Update Suggestion Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBookSuggestionStatus(id, newStatus);
      setSuggestions((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
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
      await deleteBookSuggestion(deleteModal.item._id);
      setSuggestions((prev) =>
        prev.filter((i) => i._id !== deleteModal.item._id),
      );
      setDeleteModal({ isOpen: false, item: null, isDeleting: false });
    } catch (err) {
      console.error(err);
      alert("Error deleting record.");
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  // Filter Logic
  const filteredSuggestions = suggestions.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case "reviewed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3" /> Reviewed
          </span>
        );
      case "added_to_shelf":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            <BookOpen className="w-3 h-3" /> On Shelf
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-200 text-stone-700">
            <Archive className="w-3 h-3" /> Archived
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Premium Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        itemName={
          deleteModal.item
            ? `${deleteModal.item.title} by ${deleteModal.item.author}`
            : ""
        }
        isDeleting={deleteModal.isDeleting}
        onClose={() =>
          setDeleteModal({ isOpen: false, item: null, isDeleting: false })
        }
        onConfirm={confirmDelete}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            Book Recommendations
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage suggestions sent in by readers from the storefront.
          </p>
        </div>

        <button
          onClick={loadSuggestions}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors w-fit cursor-pointer"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
        {["all", "pending", "reviewed", "added_to_shelf", "archived"].map(
          (tab) => (
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
          ),
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading & Items */}
      {loading ? (
        <div className="py-20 text-center text-stone-400">
          Loading suggestions...
        </div>
      ) : filteredSuggestions.length === 0 ? (
        <div className="py-20 text-center text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
          No recommendations found under this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuggestions.map((item) => (
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
                  <p className="text-sm font-medium text-amber-800 mt-0.5">
                    by {item.author}
                  </p>
                </div>

                {item.note && (
                  <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl italic border border-stone-100 leading-relaxed">
                    "{item.note}"
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-4">
                <div className="text-xs space-y-1 text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.suggestedBy || "Anonymous"}</span>
                  </div>
                  {item.email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <a
                        href={`mailto:${item.email}`}
                        className="hover:underline text-stone-700"
                      >
                        {item.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(item._id, e.target.value)
                    }
                    className="text-xs border border-stone-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="added_to_shelf">Add to Shelf</option>
                    <option value="archived">Archive</option>
                  </select>

                  {/* Trigger Modal on Click */}
                  <button
                    onClick={() => promptDelete(item)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete suggestion"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
