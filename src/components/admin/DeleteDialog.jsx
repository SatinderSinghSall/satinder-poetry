import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Loader2,
  ShieldAlert,
  Feather,
  BookOpen,
  FileText,
  X,
} from "lucide-react";

export default function DeleteDialog({
  onConfirm,
  sNo = 1,
  title = "Untitled",
  author = "Unknown",
  itemType = "poem", // 'poem' | 'book' | 'blog' | or custom string
}) {
  const [deleting, setDeleting] = useState(false);

  const getItemDetails = () => {
    const type = itemType.toLowerCase();
    switch (type) {
      case "book":
        return {
          label: "Book",
          icon: <BookOpen className="w-4 h-4 shrink-0 stroke-[2]" />,
        };
      case "blog":
      case "post":
        return {
          label: "Blog Post",
          icon: <FileText className="w-4 h-4 shrink-0 stroke-[2]" />,
        };
      case "poem":
      default:
        return {
          label: "Poem",
          icon: <Feather className="w-4 h-4 shrink-0 stroke-[2]" />,
        };
    }
  };

  const { label, icon } = getItemDetails();

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      setDeleting(true);
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog>
      {/* 🔴 Trigger Button */}
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-xs cursor-pointer transition-all duration-200 hover:scale-105 shrink-0"
          title={`Delete ${label}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>

      {/* 🚨 Responsive Alert Dialog Content Wrapper */}
      <AlertDialogContent className="!p-0 !max-w-md w-[92vw] sm:w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-red-500/30 dark:border-red-900/50 shadow-2xl bg-white dark:bg-slate-900 flex flex-col focus:outline-none">
        {/* 🚨 Banner Header with Close (X) Icon */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/15 text-white backdrop-blur-md ring-1 ring-white/25 shrink-0">
              <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-red-200 bg-red-950/40 px-2 py-0.5 rounded-md border border-red-400/20">
                Critical Danger
              </span>
              <AlertDialogTitle className="text-base sm:text-xl font-serif font-bold text-white mt-0.5 leading-tight truncate">
                Delete {label}?
              </AlertDialogTitle>
            </div>
          </div>

          {/* ❌ Header Close (X) Button */}
          <AlertDialogCancel
            asChild
            className="m-0 p-1.5 h-auto w-auto border-none bg-white/10 hover:bg-white/20 text-white hover:text-white rounded-full transition-colors cursor-pointer shrink-0 shadow-none"
          >
            <button aria-label="Close dialog">
              <X className="w-4 h-4" />
            </button>
          </AlertDialogCancel>
        </div>

        {/* 📄 Item Preview Area */}
        <div className="p-5 sm:p-6 space-y-4 flex-1">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
            Target Item For Permanent Deletion:
          </p>

          <div className="bg-red-50/70 dark:bg-red-950/30 border-l-4 border-red-600 rounded-r-xl sm:rounded-r-2xl p-3.5 sm:p-4 flex items-center gap-3 shadow-inner min-w-0">
            <div className="flex flex-col items-center justify-center bg-red-600 text-white font-mono font-bold text-xs rounded-lg sm:rounded-xl h-9 w-9 sm:h-10 sm:w-10 shrink-0 shadow-sm">
              <span className="text-[8px] sm:text-[9px] opacity-75 font-sans leading-none uppercase">
                S.No
              </span>
              <span className="text-xs sm:text-sm leading-none mt-0.5">
                #{sNo}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-red-700 dark:text-red-400 font-serif font-bold text-sm sm:text-base min-w-0">
                {icon}
                <span className="truncate" title={title}>
                  {title}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                Author:{" "}
                <span className="text-slate-700 dark:text-slate-300 font-semibold">
                  {author || "Unknown"}
                </span>
              </p>
            </div>
          </div>

          <AlertDialogDescription className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            Are you sure you want to delete this {label.toLowerCase()}? This
            action{" "}
            <strong className="text-red-600 dark:text-red-400 font-semibold">
              cannot be restored or undone
            </strong>{" "}
            and will purge all associated data immediately.
          </AlertDialogDescription>
        </div>

        {/* 🔘 Footer Buttons */}
        <AlertDialogFooter className="px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex flex-row items-center justify-end gap-2 sm:gap-3 shrink-0">
          <AlertDialogCancel
            disabled={deleting}
            className="m-0 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer text-xs font-semibold px-4 py-2"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleting}
            className="m-0 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 cursor-pointer inline-flex items-center justify-center gap-2 transition-all px-4 py-2"
          >
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Purging {label}...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Permanently
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
