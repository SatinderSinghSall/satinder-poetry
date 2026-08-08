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

  // Reset to page 1 whenever filtered subscribers list length changes
  useEffect(() => {
    setCurrentPage(1);
  }, [subscribers.length]);

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied");
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/subscribe/${id}`);
      setSubscribers((prev) => prev.filter((s) => (s._id || s.id) !== id));
      toast.success("Subscriber removed");
    } catch {
      toast.error("Failed to delete subscriber");
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
                    <div className="flex justify-end gap-2">
                      {/* View Details (Eye Button) */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView && onView(s)}
                        className="hover:bg-slate-100 cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-slate-600" />
                      </Button>

                      {/* Copy */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyEmail(s.email)}
                        className="hover:bg-slate-100 cursor-pointer"
                        title="Copy Email"
                      >
                        <Copy className="w-4 h-4 text-slate-600" />
                      </Button>

                      {/* Delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-50 cursor-pointer"
                            title="Delete Subscriber"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete this subscriber?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              This email will no longer receive poem updates.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700 cursor-pointer"
                              onClick={() => handleDelete(id)}
                            >
                              Delete
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
