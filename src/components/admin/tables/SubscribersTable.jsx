import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Copy,
  Trash2,
  Mail,
  ChevronLeft,
  ChevronRight,
  Eye,
  AlertTriangle,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import API from "@/api/api";

export default function SubscribersTable({
  subscribers,
  setSubscribers,
  onView,
}) {
  // 📄 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // ⏳ Deleting loading state (tracks currently deleting subscriber ID)
  const [deletingId, setDeletingId] = useState(null);

  // Reset to page 1 whenever filtered subscribers list length changes
  useEffect(() => {
    setCurrentPage(1);
  }, [subscribers.length]);

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied");
  };

  const handleDelete = async (id, e) => {
    // Prevent default dialog closing immediately so loading state can render
    if (e) e.preventDefault();
    setDeletingId(id);

    try {
      await API.delete(`/subscribe/${id}`);
      setSubscribers((prev) => prev.filter((s) => (s._id || s.id) !== id));
      toast.success("Subscriber removed");
    } catch {
      toast.error("Failed to delete subscriber");
    } finally {
      setDeletingId(null);
    }
  };

  if (!subscribers?.length) {
    return (
      <Card className="rounded-2xl border bg-white p-16 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">No subscribers found.</p>
      </Card>
    );
  }

  // 📄 Pagination Calculations
  const totalPages = Math.ceil(subscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubscribers = subscribers.slice(startIndex, endIndex);

  return (
    <Card className="rounded-2xl border bg-white/90 backdrop-blur shadow-md overflow-hidden flex flex-col justify-between">
      <div className="max-h-[600px] overflow-auto">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="sticky top-0 bg-slate-50 border-b text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left w-16">S.No.</th>
              <th className="px-6 py-4 text-left">Subscriber</th>
              <th className="px-6 py-4 text-left">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentSubscribers.map((s, index) => {
              const id = s._id || s.id;
              const isDeleting = deletingId === id;

              return (
                <tr
                  key={id}
                  className="border-b last:border-0 hover:bg-slate-50/80 transition"
                >
                  {/* S.NO. */}
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {startIndex + index + 1}
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 text-white flex items-center justify-center shadow-sm">
                        <Mail className="w-4 h-4" />
                      </div>

                      <span className="font-medium text-slate-900">
                        {s.email}
                      </span>
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-slate-600">
                    {s.createdAt ? new Date(s.createdAt).toLocaleString() : "—"}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      {/* View Details (Eye Button) */}
                      <button
                        type="button"
                        onClick={() => onView && onView(s)}
                        className="h-8 w-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition cursor-pointer shadow-xs"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Copy Email Button */}
                      <button
                        type="button"
                        onClick={() => copyEmail(s.email)}
                        className="h-8 w-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition cursor-pointer shadow-xs"
                        title="Copy Email"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Action Modal */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className="h-8 w-8 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white flex items-center justify-center transition cursor-pointer shadow-sm shadow-red-500/20"
                            title="Delete Subscriber"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="fixed left-[50%] top-[50%] z-50 w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-3xl border border-red-100 dark:border-red-950/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-red-500/10 p-6 sm:p-7 transition-all max-h-[90vh] overflow-y-auto">
                          {/* ✖️ Top Right Cross Close Button */}
                          <AlertDialogCancel
                            disabled={isDeleting}
                            className="absolute top-4 right-4 h-8 w-8 rounded-full border-0 p-0 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer flex items-center justify-center m-0"
                          >
                            <X className="w-4 h-4" />
                          </AlertDialogCancel>

                          <AlertDialogHeader className="sm:text-left space-y-4">
                            {/* Danger Zone Header */}
                            <div className="flex items-center gap-3.5 pr-6">
                              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-red-500/15 to-red-600/10 dark:from-red-950 dark:to-red-900/40 text-red-600 dark:text-red-400 ring-8 ring-red-500/5 dark:ring-red-950/30 shrink-0 border border-red-200/50 dark:border-red-800/40 shadow-xs">
                                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-100/80 dark:bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-200 dark:border-red-900/60 shadow-2xs">
                                  Danger Zone
                                </span>
                                <AlertDialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                  Delete this subscriber?
                                </AlertDialogTitle>
                              </div>
                            </div>

                            {/* Danger Warning Container */}
                            <AlertDialogDescription asChild>
                              <div className="space-y-3 pt-1">
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                  This email will no longer receive poem updates
                                  or news. This action cannot be undone.
                                </p>
                                <div className="p-3.5 rounded-2xl bg-red-50/80 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/50 text-xs text-red-700 dark:text-red-300 font-medium flex items-center gap-2.5 shadow-2xs">
                                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-pulse" />
                                  <span>
                                    Are you sure you want to proceed with
                                    deletion?
                                  </span>
                                </div>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          {/* Action Buttons */}
                          <AlertDialogFooter className="mt-7 flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3">
                            <AlertDialogCancel
                              disabled={isDeleting}
                              className="w-full sm:w-auto rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold h-10 px-5 cursor-pointer transition-all gap-1.5 inline-flex items-center justify-center m-0 shadow-2xs disabled:opacity-50"
                            >
                              <X className="w-3.5 h-3.5 opacity-70" />
                              <span>Cancel</span>
                            </AlertDialogCancel>

                            <AlertDialogAction
                              disabled={isDeleting}
                              onClick={(e) => handleDelete(id, e)}
                              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-[0.98] text-white text-xs font-bold h-10 px-6 cursor-pointer transition-all shadow-md shadow-red-600/30 ring-2 ring-red-600/20 inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                              {isDeleting ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>Deleting...</span>
                                </>
                              ) : (
                                <>
                                  <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                                  <span>Delete Subscriber</span>
                                </>
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 📄 PAGINATION FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t px-6 py-3 text-xs text-slate-500 bg-slate-50">
        {/* Row count & per-page selector */}
        <div className="flex items-center gap-4">
          <span>
            Showing {startIndex + 1}–{Math.min(endIndex, subscribers.length)} of{" "}
            {subscribers.length} subscribers
          </span>

          <div className="flex items-center gap-2">
            <span>Per page:</span>
            <select
              className="h-8 w-16 rounded-md border bg-white px-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
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

        {/* Navigation Buttons */}
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
    </Card>
  );
}
