import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="font-serif text-2xl text-slate-800 tracking-wide"
        >
          📜 Poetry Web
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link
            to="/poems"
            className="text-slate-600 hover:text-black transition"
          >
            Poems
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin">
                  <Button size="sm">Admin</Button>
                </Link>
              )}

              <button
                onClick={logout}
                className="text-slate-600 hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-600 hover:text-black transition"
              >
                Login
              </Link>

              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-700"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white/90 backdrop-blur">
          <div className="flex flex-col p-6 gap-4 text-sm">
            <Link to="/poems" onClick={() => setOpen(false)}>
              Poems
            </Link>

            {user ? (
              <>
                {user.role === "admin" && <Link to="/admin">Admin</Link>}
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
