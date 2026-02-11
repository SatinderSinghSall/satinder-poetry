import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, Feather, User, LogOut, LayoutDashboard } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

/* ======================================================
   Navbar
====================================================== */

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50
      bg-gradient-to-b from-white/95 to-white/80
      backdrop-blur-md border-b border-neutral-200"
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-24 flex items-center justify-between">
        <Brand />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-14">
          <NavLink to="/poems" label="Poems" />

          {user ? (
            <ProfileDropdown user={user} logout={logout} />
          ) : (
            <>
              <NavLink to="/login" label="Login" />

              <Link
                to="/register"
                className="px-7 py-3 rounded-full
                text-base font-light
                bg-neutral-900 text-white
                shadow-md hover:shadow-lg
                hover:scale-[1.04]
                transition-all duration-300"
              >
                Join the Verse
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-neutral-700"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <MobileMenu
        open={mobileOpen}
        setOpen={setMobileOpen}
        user={user}
        logout={logout}
      />
    </header>
  );
}

/* ======================================================
   Brand
====================================================== */

function Brand() {
  return (
    <Link
      to="/"
      className="group relative flex items-center gap-3
      font-serif text-3xl md:text-4xl tracking-wide text-neutral-900"
    >
      <Feather
        size={24}
        className="text-neutral-500 group-hover:-rotate-6 transition"
      />

      <span className="relative">
        Satinder Poetry
        <span
          className="absolute left-0 -bottom-1 h-px w-0 bg-neutral-400
          group-hover:w-full transition-all duration-500"
        />
      </span>
    </Link>
  );
}

/* ======================================================
   NavLink
====================================================== */

function NavLink({ to, label }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative font-light text-lg md:text-xl transition
      ${active ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"}
      after:absolute after:left-0 after:-bottom-1
      after:h-px after:w-0 after:bg-neutral-400
      hover:after:w-full after:transition-all after:duration-500`}
    >
      {label}
    </Link>
  );
}

/* ======================================================
   Profile Dropdown (FINAL FIXED VERSION)
====================================================== */

function ProfileDropdown({ user, logout }) {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const ref = useRef();

  useClickOutside(ref, () => setOpen(false));

  return (
    <>
      <div ref={ref} className="relative">
        {/* Avatar */}
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-full
          bg-gradient-to-br from-rose-400 to-amber-400
          text-white font-semibold flex items-center justify-center
          shadow-md hover:scale-105 transition"
        >
          {user.name?.charAt(0).toUpperCase()}
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-0 mt-4 w-56
            bg-white border border-neutral-200
            rounded-2xl shadow-xl py-2"
          >
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-neutral-500 truncate">{user.email}</p>
            </div>

            <DropdownItem
              to="/profile"
              icon={<User size={16} />}
              label="Profile"
              onClick={() => setOpen(false)}
            />

            {user.role === "admin" && (
              <DropdownItem
                to="/admin"
                icon={<LayoutDashboard size={16} />}
                label="Admin"
                onClick={() => setOpen(false)}
              />
            )}

            {/* 🔥 IMPORTANT: NOT dialog trigger */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setShowLogout(true);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-neutral-100"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* 🔥 DIALOG OUTSIDE DROPDOWN (BUG FIX) */}
      <AlertDialog open={showLogout} onOpenChange={setShowLogout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You’ll be signed out of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => logout()}
              className="bg-neutral-900 hover:bg-neutral-800"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/* ======================================================
   Dropdown Item
====================================================== */

function DropdownItem({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-neutral-100"
    >
      {icon}
      {label}
    </Link>
  );
}

/* ======================================================
   Mobile Menu (Improved + Modal + Icons)
====================================================== */

function MobileMenu({ open, setOpen, user, logout }) {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <div
        className={`md:hidden overflow-hidden transition-all duration-500
        ${open ? "max-h-[650px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div
          className="
          border-t border-neutral-200
          bg-white/95 backdrop-blur-md
          px-6 py-8
          flex flex-col
          space-y-6
        "
        >
          {/* ======================
              USER HEADER (new)
          ====================== */}
          {user && (
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50">
              <div
                className="
                w-11 h-11 rounded-full
                bg-gradient-to-br from-rose-400 to-amber-400
                text-white font-semibold
                flex items-center justify-center
              "
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-neutral-900">
                  {user.name}
                </span>
                <span className="text-xs text-neutral-500 truncate">
                  {user.email}
                </span>
              </div>
            </div>
          )}

          {/* ======================
              MAIN LINKS
          ====================== */}
          <div className="flex flex-col gap-3">
            <MobileItem
              to="/poems"
              icon={<Feather size={18} />}
              setOpen={setOpen}
            >
              Poems
            </MobileItem>

            {user && (
              <MobileItem
                to="/profile"
                icon={<User size={18} />}
                setOpen={setOpen}
              >
                Profile
              </MobileItem>
            )}

            {user?.role === "admin" && (
              <MobileItem
                to="/admin"
                icon={<LayoutDashboard size={18} />}
                setOpen={setOpen}
              >
                Admin
              </MobileItem>
            )}

            {!user && (
              <>
                <MobileItem
                  to="/login"
                  icon={<User size={18} />}
                  setOpen={setOpen}
                >
                  Login
                </MobileItem>

                <MobileItem
                  to="/register"
                  icon={<Feather size={18} />}
                  setOpen={setOpen}
                >
                  Join the Verse
                </MobileItem>
              </>
            )}
          </div>

          {/* ======================
              DIVIDER (new)
          ====================== */}
          {user && <div className="h-px bg-neutral-200 my-2" />}

          {/* ======================
              LOGOUT (separate)
          ====================== */}
          {user && (
            <button
              onClick={() => {
                setOpen(false);
                setShowLogout(true);
              }}
              className="
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-neutral-700
              hover:bg-neutral-100
              transition
            "
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Logout dialog */}
      <AlertDialog open={showLogout} onOpenChange={setShowLogout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You’ll be signed out of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={logout}
              className="bg-neutral-900 hover:bg-neutral-800"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function MobileItem({ to, children, icon, setOpen }) {
  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="
        flex items-center gap-3
        px-4 py-3
        rounded-xl
        bg-neutral-50
        hover:bg-neutral-100
        transition
      "
    >
      {icon}
      <span className="text-neutral-700">{children}</span>
    </Link>
  );
}

function MobileLink({ to, children, setOpen }) {
  return (
    <Link to={to} onClick={() => setOpen(false)}>
      {children}
    </Link>
  );
}

/* ======================================================
   Click Outside
====================================================== */

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}
