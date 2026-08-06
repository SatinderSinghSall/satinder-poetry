import { Link } from "react-router-dom";
import {
  PenTool,
  Sparkles,
  ArrowUpRight,
  HelpCircle,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function AddPoemCTA() {
  return (
    <section className="relative my-12 overflow-hidden rounded-[32px] border-2 border-stone-900 bg-[#efe6d6] p-8 sm:p-12 shadow-[6px_6px_0px_0px_rgba(28,24,20,0.22)] transition-all">
      {/* Background Vintage Texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[size:12px_12px] opacity-[0.05]" />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Editorial Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-800 sm:text-xs">
                Poem Portal Guidelines
              </span>
            </div>

            <h2
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 700,
              }}
            >
              Turn your raw thoughts into timeless poetry.
            </h2>

            <p className="mt-3 text-base text-stone-700 leading-relaxed">
              Become a contributor to the sanctuary. Follow our quick
              step-by-step process below to prepare and submit your work for
              publication.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 shrink-0 w-full lg:w-auto">
            <Link
              to="/add-poem-portal"
              className="group flex items-center justify-center gap-3 rounded-full bg-[#1f1a17] px-7 py-4 text-xs sm:text-sm font-medium uppercase tracking-[0.16em] text-[#f8f4ef] shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-[#2b2420] active:scale-[0.98]"
            >
              <PenTool size={16} />
              <span>Open Poem Portal</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              to="/about-me"
              className="flex items-center justify-center gap-2 rounded-full border border-stone-900/20 bg-stone-900/5 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-stone-800 transition-all duration-300 hover:bg-stone-900/10"
            >
              <HelpCircle size={15} className="text-amber-900" />
              <span>Know More</span>
            </Link>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="border-t border-stone-900/15 pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-900 font-semibold mb-6">
            How to Publish Your Poem (Step-by-Step Instructions)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="rounded-2xl border border-stone-900/10 bg-white/50 p-5 backdrop-blur-sm">
              <span className="font-mono text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                STEP 01
              </span>
              <h4 className="mt-1 font-semibold text-stone-900 text-sm">
                Account Creation & Login
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                Create a free account on Satinder Poetry and ensure you are
                logged in. Unauthenticated submissions are automatically
                restricted.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-stone-900/10 bg-white/50 p-5 backdrop-blur-sm">
              <span className="font-mono text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                STEP 02
              </span>
              <h4 className="mt-1 font-semibold text-stone-900 text-sm">
                Subscribe to Newsletter
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                Join our reader community by subscribing to the newsletter. This
                verifies active readership before requesting publishing rights.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-stone-900/10 bg-white/50 p-5 backdrop-blur-sm">
              <span className="font-mono text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                STEP 03
              </span>
              <h4 className="mt-1 font-semibold text-stone-900 text-sm">
                Request Admin Authorization
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                You cannot add poems directly without authorization. Contact
                founder and curator Satinder Singh Sall to request author
                permissions.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-stone-900/10 bg-white/50 p-5 backdrop-blur-sm">
              <span className="font-mono text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                STEP 04
              </span>
              <h4 className="mt-1 font-semibold text-stone-900 text-sm">
                Alternative Draft Review
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                Or, send your poem directly through Option A or email it to
                Satinder Singh Sall. He will personally review, refine, and
                publish your work.
              </p>
            </div>
          </div>

          {/* Access Privileges Note */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-900/20 bg-amber-900/5 p-4 text-stone-800 text-xs leading-relaxed">
            <ShieldAlert size={18} className="text-amber-800 shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold text-stone-900">
                Note on Access Privileges:
              </strong>{" "}
              Direct access to post poems without prior approval is granted
              manually by Satinder Singh Sall. After reviewing your account
              activity and poem quality, full contributor status will be issued
              to your account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
