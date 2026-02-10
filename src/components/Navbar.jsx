import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, Feather } from "lucide-react";

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

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50
                 bg-gradient-to-b from-white/90 to-white/75
                 backdrop-blur-md border-b border-neutral-200"
    >
      <nav className="max-w-7xl mx-auto px-8 h-22 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-3 font-serif
                     text-2xl md:text-3xl tracking-wide
                     text-neutral-900 transition-all duration-500"
        >
          <Feather
            size={22}
            className="text-neutral-500
                       group-hover:text-neutral-800
                       group-hover:-rotate-6
                       transition-all duration-500"
          />
          <span className="relative">
            Satinder Poetry
            <span
              className="absolute -bottom-1 left-0 h-px w-0 bg-neutral-400
                         group-hover:w-full transition-all duration-500"
            />
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <NavLink to="/poems" label="Poems" />

          {user ? (
            <>
              {user.role === "admin" && (
                <NavLink to="/admin" label="Admin" subtle />
              )}
              <LogoutDialog onConfirm={logout} />
            </>
          ) : (
            <>
              <NavLink to="/login" label="Login" />

              <Link
                to="/register"
                className="px-6 py-3 rounded-full
                           text-base font-light
                           bg-gradient-to-r from-neutral-900 to-neutral-700
                           text-white
                           shadow-md shadow-neutral-900/20
                           hover:shadow-lg hover:shadow-neutral-900/30
                           hover:scale-[1.03]
                           transition-all duration-300"
              >
                Join the Verse
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-neutral-700"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-700 ease-out
        ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div
          className="border-t border-neutral-200
                     bg-neutral-50/95
                     px-8 py-8 flex flex-col gap-6
                     text-lg font-light"
        >
          <MobileLink to="/poems" label="Poems" setOpen={setOpen} />

          {user ? (
            <>
              {user.role === "admin" && (
                <MobileLink to="/admin" label="Admin" setOpen={setOpen} />
              )}
              <LogoutDialog onConfirm={logout} mobile />
            </>
          ) : (
            <>
              <MobileLink to="/login" label="Login" setOpen={setOpen} />
              <MobileLink
                to="/register"
                label="Join the Verse"
                setOpen={setOpen}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ---------------- Components ---------------- */

function NavLink({ to, label, subtle = false }) {
  return (
    <Link
      to={to}
      className={`relative text-base md:text-lg font-light
        ${subtle ? "text-neutral-500" : "text-neutral-700"}
        hover:text-neutral-950 transition-all duration-300
        after:absolute after:left-0 after:-bottom-2
        after:h-px after:w-0 after:bg-neutral-500
        hover:after:w-full after:transition-all after:duration-500`}
    >
      {label}
    </Link>
  );
}

function MobileLink({ to, label, setOpen }) {
  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="text-neutral-700 hover:text-neutral-950 transition"
    >
      {label}
    </Link>
  );
}

/* 🔐 Logout Confirmation Dialog */
function LogoutDialog({ onConfirm }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="px-4 py-2 rounded-md
                     border border-neutral-300
                     text-sm font-light text-neutral-700
                     hover:bg-neutral-100 hover:text-neutral-900
                     transition"
        >
          Logout
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You’ll be signed out of your account. You can always return to
            continue reading and writing poems.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-neutral-900 hover:bg-neutral-800"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
