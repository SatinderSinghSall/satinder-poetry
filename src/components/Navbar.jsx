import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-serif text-xl tracking-wide
                     text-slate-900 hover:text-slate-700 transition"
        >
          <Feather size={18} className="text-slate-500" />
          <span className="font-semibold">Satinder Poetry</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <NavLink to="/poems" label="Poems" />

          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin">
                  <Button size="sm" variant="outline">
                    Admin
                  </Button>
                </Link>
              )}

              {/* Logout Modal */}
              <LogoutDialog onConfirm={logout} />
            </>
          ) : (
            <>
              <NavLink to="/login" label="Login" />

              <Link to="/register">
                <Button
                  size="sm"
                  className="rounded-full px-5 bg-slate-900 text-white 
                             hover:bg-slate-800 shadow-sm"
                >
                  Join the Verse
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-600"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden
        ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="border-t bg-white px-6 py-6 flex flex-col gap-4 text-sm">
          <MobileLink to="/poems" setOpen={setOpen} label="Poems" />

          {user ? (
            <>
              {user.role === "admin" && (
                <MobileLink to="/admin" setOpen={setOpen} label="Admin" />
              )}

              {/* Mobile Logout */}
              <LogoutDialog onConfirm={logout} mobile />
            </>
          ) : (
            <>
              <MobileLink to="/login" setOpen={setOpen} label="Login" />
              <MobileLink
                to="/register"
                setOpen={setOpen}
                label="Join the Verse"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ---------------- Components ---------------- */

function NavLink({ to, label }) {
  return (
    <Link to={to} className="text-slate-600 hover:text-slate-900 transition">
      {label}
    </Link>
  );
}

function MobileLink({ to, label, setOpen }) {
  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="text-slate-700 hover:text-slate-900 transition"
    >
      {label}
    </Link>
  );
}

/* 🔐 Logout Confirmation Dialog */
function LogoutDialog({ onConfirm, mobile = false }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {mobile ? (
          <button className="text-left text-slate-600">Logout</button>
        ) : (
          <button className="text-slate-500 hover:text-slate-900 transition">
            Logout
          </button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out of Satinder Poetry?</AlertDialogTitle>
          <AlertDialogDescription>
            You’ll be signed out of your account. You can always return to
            continue reading and writing poems.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-slate-900 hover:bg-slate-800"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
