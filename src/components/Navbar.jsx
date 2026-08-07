import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  X,
  Feather,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Library,
  Compass,
  PenTool,
} from "lucide-react";

import { LogoutModal } from "./LogoutModal";
import QuickNavModal from "./QuickNavModal";

/* ======================================================
   HOOKS
====================================================== */

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

function useLockBodyScroll(locked) {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [locked]);
}

/* ======================================================
   MAIN NAVBAR COMPONENT
====================================================== */

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navModalOpen, setNavModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        <nav className="flex h-[82px] w-full items-center justify-between border-b border-[#e7dfd2] bg-[#faf7f2]/88 px-3 backdrop-blur-2xl transition-all duration-500 sm:px-6 xl:h-[86px] xl:px-10">
          <Brand />

          {/* Desktop Navigation (XL screens and above) */}
          <div className="hidden items-center gap-6 xl:flex 2xl:gap-8">
            <NavLink to="/poems" label="Poems" />

            {/* Added Poet's Portal right after Poems */}
            <NavLink to="/add-poem-portal" label="Poet's Portal" />

            <NavLink to="/books" label="Books" />

            {/* Quick Navigation Trigger */}
            <button
              onClick={() => setNavModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-amber-900/15 bg-amber-950/5 px-4 py-2.5 text-[13px] font-medium tracking-wide text-stone-800 transition-all duration-300 hover:scale-[1.03] hover:bg-amber-950/10 active:scale-[0.98]"
              title="Open Sanctuary Navigator"
            >
              <Compass className="animate-spin-slow h-4 w-4 text-amber-800" />
              <span>Navigator</span>
            </button>

            {/* Editorial Feature Button */}
            <Link
              to="/about-me"
              className="group relative flex items-center gap-4 border-2 border-stone-900 bg-[#efe6d6] px-4 py-2.5 shadow-[4px_4px_0px_0px_rgba(28,24,20,0.22)] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#e8dcc8] hover:shadow-[2px_2px_0px_0px_rgba(28,24,20,0.18)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none 2xl:px-5 2xl:py-3"
            >
              <div className="flex flex-col leading-none">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-amber-800">
                  Editorial
                </span>
                <span
                  className="mt-1 text-[22px] leading-none text-stone-900 2xl:text-[24px]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 700,
                  }}
                >
                  The Long Story
                </span>
              </div>

              <div className="w-px self-stretch bg-stone-900/20" />

              <div className="text-[20px] text-stone-700 transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-1">
                ↗
              </div>

              {/* Vintage texture overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[size:10px_10px] opacity-[0.05]" />
            </Link>

            {user ? (
              <ProfileDropdown user={user} logout={logout} />
            ) : (
              <>
                <NavLink to="/login" label="Login" />
                <Link
                  to="/register"
                  className="whitespace-nowrap rounded-full bg-[#1f1a17] px-5 py-3 text-xs uppercase tracking-[0.14em] text-[#f8f4ef] shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.03] hover:bg-[#2b2420] 2xl:px-6 2xl:text-sm"
                >
                  Join the Verse
                </Link>
              </>
            )}
          </div>

          {/* Mobile / Tablet Controls (< 1280px) */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setNavModalOpen(true)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-amber-900/20 bg-[#efe6d6] text-amber-900 shadow-sm transition-transform active:scale-95"
              aria-label="Open Navigation Modal"
            >
              <Compass size={20} />
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#e8ddd0] bg-white/60 text-[#2d2722] shadow-sm"
              aria-label="Open Mobile Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <MobileDrawer
        open={mobileOpen}
        setOpen={setMobileOpen}
        user={user}
        logout={logout}
        onOpenNavModal={() => setNavModalOpen(true)}
      />

      {/* Quick Nav Modal */}
      <QuickNavModal
        isOpen={navModalOpen}
        onClose={() => setNavModalOpen(false)}
      />
    </>
  );
}

/* ======================================================
   SUB-COMPONENTS
====================================================== */

function Brand() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e6dbcf] bg-white/65 shadow-sm sm:h-11 sm:w-11">
        <Feather size={18} className="text-[#665e57]" />
      </div>

      <div className="flex flex-col">
        <span
          className="whitespace-nowrap text-[1.55rem] leading-[1.02] pb-[2px] text-[#201b18] sm:text-[1.75rem] 2xl:text-[2.25rem]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
          }}
        >
          Satinder Poetry
        </span>
        <span className="mt-[2px] whitespace-nowrap text-[7px] uppercase tracking-[0.24em] text-[#8b8178] sm:text-[8.5px] sm:tracking-[0.3em]">
          Poetry • Stories • Reflections
        </span>
      </div>
    </Link>
  );
}

function NavLink({ to, label }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative text-[13px] uppercase tracking-[0.16em] transition-all duration-500 2xl:text-[14px] ${
        active ? "text-[#1f1a17]" : "text-[#756b63] hover:text-[#1f1a17]"
      }`}
    >
      {label}
      <span
        className={`absolute left-0 -bottom-2 h-px bg-[#5d534c] transition-all duration-500 ${
          active ? "w-full" : "w-0 hover:w-full"
        }`}
      />
    </Link>
  );
}

function ProfileDropdown({ user, logout }) {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <>
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#473d37] to-[#221d1a] text-white shadow-[0_10px_25px_rgba(0,0,0,0.16)] transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_14px_35px_rgba(0,0,0,0.18)] 2xl:h-12 2xl:w-12"
        >
          <span className="text-sm font-medium">
            {user.name?.charAt(0).toUpperCase()}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-5 w-fit min-w-[360px] animate-in fade-in zoom-in-95 duration-300 overflow-hidden rounded-[34px] border border-[#eadfce] bg-[#faf7f2]/96 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.14)] 2xl:min-w-[430px]">
            {/* User Profile Banner */}
            <div className="border-b border-[#ece1d4] bg-gradient-to-br from-[#f8f1e8] via-[#fdfaf6] to-[#f8f1e8] px-7 py-7">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#473d37] to-[#221d1a] text-xl text-white shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col">
                  <p
                    className="whitespace-nowrap text-[1.95rem] leading-[1.05] text-[#241f1b]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}
                  >
                    {user.name}
                  </p>
                  <p className="mt-2 whitespace-nowrap text-[14px] text-[#867c73]">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Links & Actions */}
            <div className="p-4">
              <DropdownItem
                to="/profile"
                icon={<User size={18} />}
                label="Profile"
                onClick={() => setOpen(false)}
              />

              {user.role === "admin" && (
                <DropdownItem
                  to="/admin"
                  icon={<LayoutDashboard size={18} />}
                  label="Admin Dashboard"
                  onClick={() => setOpen(false)}
                />
              )}

              <div className="my-3 h-px bg-[#eee3d7]" />

              <button
                onClick={() => {
                  setOpen(false);
                  setShowLogout(true);
                }}
                className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-[#f3d6d6] bg-gradient-to-r from-[#fff1f1] to-[#fff6f6] px-5 py-4 text-[#b14d4d] transition-all duration-300 hover:border-[#efc4c4] hover:from-[#ffe5e5] hover:to-[#fff0f0]"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <LogoutModal
        logout={logout}
        onOpenChange={setShowLogout}
        open={showLogout}
      />
    </>
  );
}

function DropdownItem({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-4 rounded-2xl px-5 py-4 text-[#5e554d] transition-all duration-300 hover:bg-[#f1e8dd]"
    >
      {icon}
      <span className="text-[15px]">{label}</span>
    </Link>
  );
}

function MobileDrawer({ open, setOpen, user, logout, onOpenNavModal }) {
  const [showLogout, setShowLogout] = useState(false);

  useLockBodyScroll(open);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-md transition-all duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Drawer Container */}
      <div
        className={`fixed top-0 right-0 z-[100] flex h-screen w-[90%] max-w-[390px] overscroll-contain flex-col border-l border-[#eadfce] bg-[#f8f4ee]/98 backdrop-blur-3xl shadow-[-20px_0_60px_rgba(0,0,0,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="relative border-b border-[#ece1d4] bg-gradient-to-b from-[#fdfaf6] to-[#f8f4ee] px-6 pt-7 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#eadfce] bg-white shadow-sm">
              <Feather size={20} className="text-[#665e57]" />
            </div>

            <div>
              <p
                className="text-[2.2rem] leading-none text-[#1f1a17]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                }}
              >
                Satinder Poetry
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[#8b8178]">
                Poetry Space
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#eadfce] bg-white text-[#5e554d] shadow-sm transition-all duration-300 hover:scale-105"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-7">
          {user && (
            <div className="relative mb-8 overflow-hidden rounded-[30px] border border-[#ebdfd2] bg-gradient-to-br from-[#f7efe6] via-[#fffdfa] to-[#f8f1e8] p-5 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#fff7ef] opacity-70 blur-3xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#473d37] to-[#221d1a] text-xl text-white shadow-[0_10px_25px_rgba(0,0,0,0.14)]">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p
                    className="break-words text-[1.2rem] leading-tight text-[#201b18]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                    }}
                  >
                    {user.name}
                  </p>
                  <p className="mt-1 break-all text-[13px] text-[#877d74]">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Links Grid */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setOpen(false);
                onOpenNavModal();
              }}
              className="flex cursor-pointer items-center gap-4 rounded-[24px] border border-amber-900/20 bg-[#efe6d6] px-5 py-5 text-stone-900 shadow-sm transition-all duration-300 hover:bg-[#e6dac4]"
            >
              <Compass size={20} className="text-amber-800" />
              <span className="text-[15px] font-medium tracking-wide">
                Sanctuary Navigator
              </span>
            </button>

            <MobileItem
              to="/poems"
              icon={<BookOpen size={20} />}
              setOpen={setOpen}
            >
              Poems
            </MobileItem>

            {/* Added Poet's Portal right after Poems in Mobile Drawer */}
            <MobileItem
              to="/add-poem-portal"
              icon={<PenTool size={20} />}
              setOpen={setOpen}
            >
              Poet's Portal
            </MobileItem>

            <MobileItem
              to="/books"
              icon={<Library size={20} />}
              setOpen={setOpen}
            >
              Books
            </MobileItem>

            <Link
              to="/about-me"
              onClick={() => setOpen(false)}
              className="group relative flex flex-col overflow-hidden border-2 border-stone-900 bg-[#efe6d6] p-6 shadow-[5px_5px_0px_0px_rgba(28,24,20,0.18)] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(28,24,20,0.14)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[size:10px_10px] opacity-[0.05]" />

              <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-amber-800">
                Editorial Feature
              </span>

              <h3
                className="relative z-10 mt-3 text-[2.4rem] leading-[0.9] text-stone-900"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                The Long Story
              </h3>

              <p className="relative z-10 mt-4 text-[14px] leading-relaxed text-stone-700">
                Poetry, airports, rain, memories, stories, and the person behind
                this space.
              </p>

              <div className="relative z-10 mt-6 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                  Enter Chapter 01
                </span>
                <span className="text-[22px] text-stone-700 transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              <div className="absolute top-3 right-3 border border-stone-900/20 bg-[#f7f0e3] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-stone-500">
                Vol. 01
              </div>
            </Link>

            {!user ? (
              <>
                <MobileItem
                  to="/login"
                  icon={<User size={20} />}
                  setOpen={setOpen}
                >
                  Login
                </MobileItem>

                <MobileItem
                  to="/register"
                  icon={<Feather size={20} />}
                  setOpen={setOpen}
                >
                  Join the Verse
                </MobileItem>
              </>
            ) : (
              <>
                <MobileItem
                  to="/profile"
                  icon={<User size={20} />}
                  setOpen={setOpen}
                >
                  Profile
                </MobileItem>

                {user.role === "admin" && (
                  <MobileItem
                    to="/admin"
                    icon={<LayoutDashboard size={20} />}
                    setOpen={setOpen}
                  >
                    Admin Dashboard
                  </MobileItem>
                )}

                <button
                  onClick={() => {
                    setOpen(false);
                    setShowLogout(true);
                  }}
                  className="flex cursor-pointer items-center gap-4 rounded-[24px] border border-[#f1d0d0] bg-gradient-to-r from-[#fff0f0] to-[#fff6f6] px-5 py-5 text-[#b34b4b] shadow-sm transition-all duration-300 hover:border-[#e8bcbc] hover:from-[#ffe6e6] hover:to-[#fff1f1]"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="relative shrink-0 border-t border-[#ece1d4] bg-gradient-to-b from-[#faf6f1] to-[#f6f1ea] px-6 py-5">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9cbbb] to-transparent" />

          <div className="flex flex-col items-center text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a8f84]">
              Crafted with Elegance
            </p>

            <p
              className="mt-2 text-[14px] text-[#2a241f]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
              }}
            >
              Developed by Satinder Singh Sall
            </p>

            <p className="mt-1 text-[11px] tracking-wide text-[#9a9085]">
              Satinder Poetry • v7.5.0
            </p>
          </div>
        </div>
      </div>

      <LogoutModal
        logout={logout}
        onOpenChange={setShowLogout}
        open={showLogout}
      />
    </>
  );
}

function MobileItem({ to, children, icon, setOpen }) {
  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="flex items-center gap-4 rounded-[24px] border border-[#ece1d4] bg-white px-5 py-5 text-[#4e463f] transition-all duration-300 hover:bg-[#f6efe7]"
    >
      {icon}
      <span className="text-[15px] tracking-wide">{children}</span>
    </Link>
  );
}
