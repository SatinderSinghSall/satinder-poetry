import { CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

export default function AuthToast({ type = "success", title, message }) {
  const isSuccess = type === "success";

  return (
    <div
      className={`
        relative overflow-hidden
        min-w-[320px]
        rounded-3xl
        border
        backdrop-blur-xl
        px-5 py-5
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        transition-all
        duration-300
        ${
          isSuccess
            ? "border-emerald-200 bg-white/95"
            : "border-rose-200 bg-white/95"
        }
      `}
    >
      {/* glow */}
      <div
        className={`
          absolute inset-0 opacity-60
          ${
            isSuccess
              ? "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.10),transparent_50%)]"
          }
        `}
      />

      <div className="relative flex items-start gap-4">
        {/* icon */}
        <div
          className={`
            flex h-12 w-12 shrink-0 items-center justify-center
            rounded-2xl
            ${
              isSuccess
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            }
          `}
        >
          {isSuccess ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
        </div>

        {/* content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>

            {isSuccess && <Sparkles size={14} className="text-emerald-500" />}
          </div>

          <p className="mt-1 text-sm leading-6 text-slate-500">{message}</p>
        </div>
      </div>
    </div>
  );
}
