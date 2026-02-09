import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100" />

      <div className="relative border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Main grid */}
          <div className="grid gap-16 md:grid-cols-3">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-2xl text-slate-900 mb-4">
                Satinder Poetry
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                A quiet space for poems, emotions, and stories — written gently,
                read slowly.
              </p>
            </div>

            {/* Explore */}
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-5">
                Explore
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <Link to="/poems" className="hover:text-slate-900 transition">
                    Poems
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-slate-900 transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-slate-900 transition">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-slate-900 transition"
                  >
                    Join the Verse
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-5">
                Information
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-slate-900 transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-slate-900 transition">
                    Terms of Use
                  </Link>
                </li>
                <li className="text-slate-400">Built with care</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-20 pt-8 border-t border-slate-300/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Satinder Poetry. All rights reserved.
            </p>

            <p className="text-xs text-slate-500 italic">
              Words linger. Silence listens.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
