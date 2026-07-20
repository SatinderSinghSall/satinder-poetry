import { AlertOctagon, X, Loader2, ShieldAlert } from "lucide-react";

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Permanent Deletion",
  itemName = "",
  description = "You are about to permanently delete this recommendation. This action is irreversible.",
  isDeleting = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 
        Heavy Dark Backdrop 
        NOTE: No onClick handler here, preventing closing on outside click
      */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300" />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-slate-900 border border-rose-500/30 rounded-3xl shadow-[0_0_50px_-12px_rgba(244,63,94,0.35)] p-6 z-10 animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Top Crimson Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button (Explicit click required) */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all disabled:opacity-40 cursor-pointer"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          {/* Glowing Danger Icon Badge */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-rose-500/30 blur-md animate-pulse" />
            <div className="relative p-4 rounded-2xl bg-slate-950 border border-rose-500/40 text-rose-500 shadow-inner">
              <AlertOctagon className="w-8 h-8 stroke-[2.2]" />
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-3 h-3" /> Danger Zone
            </span>
            <h3 className="text-xl font-serif font-bold text-white tracking-tight pt-1">
              {title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              {description}
            </p>
          </div>

          {/* Highlighted Item Name Box */}
          {itemName && (
            <div className="w-full p-3 rounded-xl bg-slate-955/80 border border-rose-500/20 text-xs font-semibold text-rose-200/90 truncate shadow-inner">
              "{itemName}"
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-7 flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all disabled:opacity-40 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-[0.98] rounded-xl shadow-lg shadow-rose-600/30 border border-rose-400/30 transition-all disabled:opacity-40 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
