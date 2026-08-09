import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Feather,
  BookOpen,
  User,
  Mail,
  UserCircle,
  LogIn,
  Compass,
  Sparkles,
  ArrowUpRight,
  Home,
  BookMarked,
  Command,
  PenTool,
  FileText,
} from "lucide-react";

export default function QuickNavModal({ isOpen, onClose, onOpen }) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Global Keyboard Shortcuts: 'Ctrl + K' (or Cmd + K) to toggle, 'Escape' to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else if (onOpen) {
          onOpen();
        }
      }

      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity duration-300" />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[85vh] flex flex-col bg-[#141210]/95 text-stone-200 rounded-2xl sm:rounded-3xl border border-amber-900/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-hidden z-10 transition-all duration-300">
        {/* Header (Pinned Top) */}
        <div className="flex-none flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-amber-900/20 bg-[#191715]/80">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-serif font-light tracking-wide text-stone-100">
                Sanctuary Navigator
              </h2>
              <p className="text-[10px] sm:text-xs text-amber-400/70 font-sans tracking-widest uppercase">
                Explore Satinder Poetry
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-stone-400 hover:text-amber-200 hover:bg-stone-800/80 transition-all duration-200 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 scrollbar-thin scrollbar-thumb-amber-900/30">
          {/* Top Row: 2 Primary Featured Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Library Card */}
            <Link
              to="/books"
              onClick={onClose}
              className="group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-950/40 via-[#1c1917] to-[#141210] border border-amber-500/30 hover:border-amber-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/20 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/25 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <Sparkles className="w-3 h-3" /> Featured Room
                  </span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400/60 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
                  <h3 className="text-lg sm:text-xl font-serif text-amber-100 group-hover:text-amber-300 transition-colors">
                    Library & Reading Room
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mt-2">
                  Curated literature, poetry collections, and reflections on
                  art, films, and storytelling.
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-amber-500/15 flex items-center justify-between text-xs text-amber-400/90 font-medium">
                <span>Explore Reading Room</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>

            {/* Author Card */}
            <Link
              to="/about-me"
              onClick={onClose}
              className="group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-950/30 via-[#1c1917] to-[#141210] border border-rose-500/25 hover:border-rose-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/20 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    <User className="w-3 h-3" /> The Author
                  </span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400/60 group-hover:text-rose-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                  <Feather className="w-5 h-5 sm:w-6 sm:h-6 text-rose-300 shrink-0" />
                  <h3 className="text-lg sm:text-xl font-serif text-rose-100 group-hover:text-rose-300 transition-colors">
                    Satinder Singh Sall
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 font-light italic leading-relaxed mt-2">
                  “Somewhere between airport windows, unfinished thoughts, and
                  rain-soaked evenings.”
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-rose-500/15 flex items-center justify-between text-xs text-rose-300/90 font-medium">
                <span>Read Story</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          </div>

          {/* NEW FULL-WIDTH HIGHLIGHTED SECTION: Poet's Access Portal */}
          <Link
            to="/add-poem-portal"
            onClick={onClose}
            className="group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#1e1b18] to-amber-950/20 border border-amber-500/40 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500 pointer-events-none" />

            <div className="space-y-1.5 relative z-10 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-widest uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <PenTool className="w-2.5 h-2.5" /> Writers Corner
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-serif text-amber-200 group-hover:text-white transition-colors flex items-center gap-2">
                Poet's Access Portal
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Submit original verses directly for editorial consideration or
                apply for author posting credentials.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-semibold text-xs transition-all duration-300 group-hover:bg-amber-400 shadow-md shrink-0 self-end sm:self-center">
              <span>Submit Draft</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>

          {/* Secondary Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Home Page */}
            <Link
              to="/"
              onClick={onClose}
              className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-800/60 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Home className="w-4 h-4 text-stone-400 group-hover:text-amber-400 transition-colors" />
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-stone-200 transition-colors" />
                </div>
                <h4 className="font-serif text-sm sm:text-base text-stone-200 group-hover:text-amber-200 transition-colors">
                  Home Sanctuary
                </h4>
                <p className="text-xs text-stone-400 font-light mt-1 line-clamp-2">
                  Welcome portal for quiet reflections and poetry.
                </p>
              </div>
            </Link>

            {/* Blogs Page Card */}
            <Link
              to="/blogs"
              onClick={onClose}
              className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-800/60 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-4 h-4 text-stone-400 group-hover:text-amber-400 transition-colors" />
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-stone-200 transition-colors" />
                </div>
                <h4 className="font-serif text-sm sm:text-base text-stone-200 group-hover:text-amber-200 transition-colors">
                  Essays & Blogs
                </h4>
                <p className="text-xs text-stone-400 font-light mt-1 line-clamp-2">
                  Literary reflections, creative insights, and long-form
                  writing.
                </p>
              </div>
            </Link>

            {/* Poetry Page */}
            <Link
              to="/poems"
              onClick={onClose}
              className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-800/60 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <BookMarked className="w-4 h-4 text-stone-400 group-hover:text-amber-400 transition-colors" />
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-stone-200 transition-colors" />
                </div>
                <h4 className="font-serif text-sm sm:text-base text-stone-200 group-hover:text-amber-200 transition-colors">
                  Poetry & Reflections
                </h4>
                <p className="text-xs text-stone-400 font-light mt-1 line-clamp-2">
                  Verses, midnight thoughts, fleeting emotions, and quiet
                  stories.
                </p>
              </div>
            </Link>

            {/* Newsletter */}
            <Link
              to="/newsletter"
              onClick={onClose}
              className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-800/60 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Mail className="w-4 h-4 text-amber-400/80" />
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-stone-200 transition-colors" />
                </div>
                <h4 className="font-serif text-sm sm:text-base text-stone-200 group-hover:text-amber-200 transition-colors">
                  Newsletter
                </h4>
                <p className="text-xs text-stone-400 font-light mt-1 line-clamp-2">
                  Quiet words, delivered gently straight to your inbox.
                </p>
              </div>
            </Link>

            {/* Profile Page */}
            <Link
              to="/profile"
              onClick={onClose}
              className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-800/60 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <UserCircle className="w-4 h-4 text-stone-400 group-hover:text-amber-400 transition-colors" />
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-stone-200 transition-colors" />
                </div>
                <h4 className="font-serif text-sm sm:text-base text-stone-200 group-hover:text-amber-200 transition-colors">
                  My Quiet Corner
                </h4>
                <p className="text-xs text-stone-400 font-light mt-1 line-clamp-2">
                  Personal profile, saved verses, and saved memories.
                </p>
              </div>
            </Link>

            {/* Auth Pages (Login & Register) */}
            <div className="sm:col-span-2 lg:col-span-2 p-4 rounded-xl bg-stone-900/40 border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <LogIn className="w-4 h-4 text-amber-400/80" />
                  <span className="text-[10px] uppercase font-mono text-amber-400/70 tracking-widest">
                    Account Portal
                  </span>
                </div>
                <h4 className="font-serif text-sm sm:text-base text-stone-200">
                  Authentication
                </h4>
                <p className="text-xs text-stone-400 font-light mt-0.5">
                  Join or sign in to your poetry sanctuary account.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="px-4 py-2 text-center text-xs font-medium text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-lg border border-stone-700/60 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="px-4 py-2 text-center text-xs font-medium text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer (Pinned Bottom) */}
        <div className="flex-none px-4 sm:px-6 py-3 sm:py-3.5 border-t border-amber-900/20 bg-[#191715]/90 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
          <p className="font-serif italic text-stone-400 text-center sm:text-left text-[11px] sm:text-xs">
            “A poet is made of memories and metaphors.”
          </p>
          <div className="hidden sm:flex items-center gap-3 text-[10px] sm:text-[11px] font-mono text-stone-500">
            <div className="flex items-center gap-1">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-stone-800 text-amber-300/80 rounded border border-stone-700 flex items-center gap-0.5">
                <Command className="w-2.5 h-2.5 inline" /> Ctrl + K
              </kbd>
              <span>to toggle</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] bg-stone-800 text-amber-300/80 rounded border border-stone-700">
                ESC
              </kbd>
              <span>to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
