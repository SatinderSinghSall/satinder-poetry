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
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import API from "@/api/api";

export default function UsersTable({ users, setUsers, onView }) {
  // 📄 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // ⏳ Deleting loading state (tracks currently deleting user ID)
  const [deletingId, setDeletingId] = useState(null);

  // Reset to page 1 whenever users array length changes (e.g. searching)
  useEffect(() => {
    setCurrentPage(1);
  }, [users.length]);

  const handleDelete = async (id, e) => {
    // Prevent default dialog closing immediately so loading state can render
    if (e) e.preventDefault();
    setDeletingId(id);

    try {
      await API.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));
      toast.success("User deleted successfully");
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  if (!users?.length) {
    return (
      <Card className="rounded-2xl border bg-white p-16 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">No users found.</p>
      </Card>
    );
  }

  // 📄 Pagination Calculations
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <Card className="rounded-2xl border bg-white/90 backdrop-blur shadow-md overflow-hidden flex flex-col justify-between">
      <div className="max-h-[600px] overflow-auto">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="sticky top-0 bg-slate-50 border-b text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left w-16">S.No.</th>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((u, index) => {
              const id = u._id || u.id;
              const isDeleting = deletingId === id;

              return (
                <tr
                  key={id}
                  className="border-b last:border-0 hover:bg-slate-50/80 transition"
                >
                  {/* S.No. Calculation */}
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {startIndex + index + 1}
                  </td>

                  {/* USER */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm">
                        {u.name?.[0]?.toUpperCase() || "U"}
                      </div>

                      <span className="font-medium text-slate-900">
                        {u.name}
                      </span>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 text-slate-600">{u.email}</td>

                  {/* ROLE */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium capitalize ${
                        u.role === "admin"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      {/* View Button */}
                      <button
                        type="button"
                        onClick={() => onView?.(u)}
                        className="h-8 w-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition cursor-pointer shadow-xs"
                        title="View User"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Action Modal */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className="h-8 w-8 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white flex items-center justify-center transition cursor-pointer shadow-sm shadow-red-500/20"
                            title="Delete User"
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
                                  Delete this user?
                                </AlertDialogTitle>
                              </div>
                            </div>

                            {/* Danger Warning Container */}
                            <AlertDialogDescription asChild>
                              <div className="space-y-3 pt-1">
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                  This action cannot be undone. This will
                                  permanently remove the user account, settings,
                                  and all associated data.
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
                                  <span>Delete User</span>
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
        {/* Row count & per-page dropdown */}
        <div className="flex items-center gap-4">
          <span>
            Showing {startIndex + 1}–{Math.min(endIndex, users.length)} of{" "}
            {users.length} users
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

        {/* Page controls */}
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
