import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import {
  Menu,
  X,
  Feather,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";

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
   PREMIUM EDITORIAL NAVBAR
====================================================== */

export default function Navbar() {
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        <nav
          className="
          w-full

          h-[82px] md:h-[86px]

          bg-[#faf7f2]/88
          backdrop-blur-2xl

          border-b border-[#e7dfd2]

          px-3 sm:px-4 md:px-10

          flex items-center justify-between

          transition-all duration-500
        "
        >
          <Brand />

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/poems" label="Poems" />

            {user ? (
              <ProfileDropdown user={user} logout={logout} />
            ) : (
              <>
                <NavLink to="/login" label="Login" />

                <Link
                  to="/register"
                  className="
                  px-6 py-3

                  rounded-full

                  bg-[#1f1a17]
                  text-[#f8f4ef]

                  text-sm tracking-[0.14em]
                  uppercase

                  shadow-[0_6px_20px_rgba(0,0,0,0.12)]

                  hover:scale-[1.03]
                  hover:bg-[#2b2420]

                  transition-all duration-500
                "
                >
                  Join the Verse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="
            md:hidden

            w-11 h-11 rounded-full

            bg-white/60
            border border-[#e8ddd0]

            flex items-center justify-center

            text-[#2d2722]

            shadow-sm
          "
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Premium Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        setOpen={setMobileOpen}
        user={user}
        logout={logout}
      />
    </>
  );
}

/* ======================================================
   BRAND
====================================================== */

function Brand() {
  return (
    <Link
      to="/"
      className="
      flex items-center gap-3

      min-w-0
      overflow-hidden
    "
    >
      {/* Feather circle */}
      <div
        className="
        shrink-0

        w-10 h-10
        sm:w-11 sm:h-11
        md:w-12 md:h-12

        rounded-full

        bg-white/65
        border border-[#e6dbcf]

        flex items-center justify-center

        shadow-sm
      "
      >
        <Feather size={18} className="text-[#665e57]" />
      </div>

      {/* Text */}
      <div
        className="
        flex flex-col

        min-w-0
        overflow-visible
      "
      >
        {/* Main logo */}
        <span
          className="
          text-[1.55rem]
          sm:text-[1.7rem]
          md:text-[2.65rem]

          leading-[1.02]

          pb-[2px]

          text-[#201b18]

          truncate
        "
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
          }}
        >
          Satinder Poetry
        </span>

        {/* Subtitle */}
        <span
          className="
          mt-[2px]

          text-[7px]
          sm:text-[8px]
          md:text-[10px]

          uppercase

          tracking-[0.24em]
          sm:tracking-[0.3em]
          md:tracking-[0.38em]

          text-[#8b8178]

          truncate
        "
        >
          Poetry • Stories • Reflections
        </span>
      </div>
    </Link>
  );
}

/* ======================================================
   NAV LINK
====================================================== */

function NavLink({ to, label }) {
  const location = useLocation();

  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
      relative

      text-[14px]

      uppercase
      tracking-[0.16em]

      transition-all duration-500

      ${active ? "text-[#1f1a17]" : "text-[#756b63] hover:text-[#1f1a17]"}
    `}
    >
      {label}

      <span
        className={`
        absolute left-0 -bottom-2

        h-px

        bg-[#5d534c]

        transition-all duration-500

        ${active ? "w-full" : "w-0 hover:w-full"}
      `}
      />
    </Link>
  );
}

/* ======================================================
   PREMIUM DROPDOWN
====================================================== */

function ProfileDropdown({ user, logout }) {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const ref = useRef();

  useClickOutside(ref, () => setOpen(false));

  return (
    <>
      <div ref={ref} className="relative">
        {/* Avatar Trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="
          relative

          w-12 h-12 rounded-full

          bg-gradient-to-br
          from-[#473d37]
          to-[#221d1a]

          text-white

          flex items-center justify-center

          shadow-[0_10px_25px_rgba(0,0,0,0.16)]

          hover:scale-[1.04]
          hover:shadow-[0_14px_35px_rgba(0,0,0,0.18)]

          transition-all duration-500
        "
        >
          <span className="text-sm font-medium">
            {user.name?.charAt(0).toUpperCase()}
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="
            absolute right-0 mt-5

            min-w-[430px] w-fit

            rounded-[34px]

            overflow-hidden

            bg-[#faf7f2]/96
            backdrop-blur-3xl

            border border-[#eadfce]

            shadow-[0_25px_70px_rgba(0,0,0,0.14)]

            animate-in fade-in zoom-in-95 duration-300
          "
          >
            {/* TOP SECTION */}
            <div
              className="
              px-7 py-7

              bg-gradient-to-br
              from-[#f8f1e8]
              via-[#fdfaf6]
              to-[#f8f1e8]

              border-b border-[#ece1d4]
            "
            >
              {/* USER ROW */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="
                  shrink-0

                  w-16 h-16 rounded-full

                  bg-gradient-to-br
                  from-[#473d37]
                  to-[#221d1a]

                  text-white

                  flex items-center justify-center

                  text-xl

                  shadow-[0_10px_25px_rgba(0,0,0,0.12)]
                "
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* User info */}
                <div className="flex flex-col">
                  {/* Name */}
                  <p
                    className="
                      text-[1.95rem]

                      leading-[1.05]

                      text-[#241f1b]

                      whitespace-nowrap
                    "
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}
                  >
                    {user.name}
                  </p>

                  {/* Email */}
                  <p
                    className="
                      mt-2

                      text-[14px]

                      text-[#867c73]

                      whitespace-nowrap
                    "
                  >
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* MENU ITEMS */}
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

              {/* Divider */}
              <div className="h-px bg-[#eee3d7] my-3" />

              {/* Logout */}
              <button
                onClick={() => {
                  setOpen(false);
                  setShowLogout(true);
                }}
                className="
                w-full

                flex items-center gap-4

                px-5 py-4

                rounded-2xl

                bg-gradient-to-r
                from-[#fff1f1]
                to-[#fff6f6]

                border border-[#f3d6d6]

                text-[#b14d4d]

                hover:from-[#ffe5e5]
                hover:to-[#fff0f0]

                hover:border-[#efc4c4]

                transition-all duration-300
              "
              >
                <LogOut size={18} />

                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LOGOUT DIALOG */}
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

/* ======================================================
   DROPDOWN ITEM
====================================================== */

function DropdownItem({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="
      flex items-center gap-4

      px-5 py-4

      rounded-2xl

      text-[#5e554d]

      hover:bg-[#f1e8dd]

      transition-all duration-300
    "
    >
      {icon}

      <span className="text-[15px]">{label}</span>
    </Link>
  );
}

/* ======================================================
   PREMIUM MOBILE DRAWER
====================================================== */

function MobileDrawer({ open, setOpen, user, logout }) {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      {/* PREMIUM OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`
        fixed inset-0 z-[90]

        bg-black/50
        backdrop-blur-md

        transition-all duration-500

        ${open ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
      />

      {/* PREMIUM DRAWER */}
      <div
        className={`
        fixed top-0 right-0 z-[100]

        h-screen
        w-[90%]
        max-w-[390px]

        bg-[#f8f4ee]/98
        backdrop-blur-3xl

        border-l border-[#eadfce]

        shadow-[-20px_0_60px_rgba(0,0,0,0.18)]

        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

        flex flex-col

        ${open ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* TOP HEADER */}
        <div
          className="
          relative

          px-6 pt-7 pb-6

          border-b border-[#ece1d4]

          bg-gradient-to-b
          from-[#fdfaf6]
          to-[#f8f4ee]
        "
        >
          {/* Brand */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div
              className="
              w-12 h-12 rounded-full

              bg-white

              border border-[#eadfce]

              shadow-sm

              flex items-center justify-center
            "
            >
              <Feather size={20} className="text-[#665e57]" />
            </div>

            {/* Brand Text */}
            <div>
              <p
                className="
                text-[2.2rem]

                leading-none

                text-[#1f1a17]
              "
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                }}
              >
                Satinder
              </p>

              <p
                className="
                mt-1

                text-[10px]

                uppercase

                tracking-[0.28em]

                text-[#8b8178]
              "
              >
                Poetry Space
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="
            absolute top-6 right-6

            w-11 h-11 rounded-full

            bg-white

            border border-[#eadfce]

            shadow-sm

            flex items-center justify-center

            text-[#5e554d]

            hover:scale-105

            transition-all duration-300
          "
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-7">
          {/* USER CARD */}
          {user && (
            <div
              className="
              relative

              overflow-hidden

              rounded-[30px]

              bg-gradient-to-br
              from-[#f7efe6]
              via-[#fffdfa]
              to-[#f8f1e8]

              border border-[#ebdfd2]

              p-5

              mb-8

              shadow-[0_10px_35px_rgba(0,0,0,0.04)]
            "
            >
              {/* Glow */}
              <div
                className="
                absolute -top-10 -right-10

                w-32 h-32 rounded-full

                bg-[#fff7ef]

                blur-3xl

                opacity-70
              "
              />

              <div className="relative flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="
                  shrink-0

                  w-16 h-16 rounded-full

                  bg-gradient-to-br
                  from-[#473d37]
                  to-[#221d1a]

                  text-white

                  flex items-center justify-center

                  text-xl

                  shadow-[0_10px_25px_rgba(0,0,0,0.14)]
                "
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <p
                    className="
                    text-[1.2rem]

                    text-[#201b18]

                    leading-tight

                    break-words
                  "
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                    }}
                  >
                    {user.name}
                  </p>

                  <p
                    className="
                    mt-1

                    text-[13px]

                    text-[#877d74]

                    break-all
                  "
                  >
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* NAV ITEMS */}
          <div className="flex flex-col gap-4">
            <MobileItem
              to="/poems"
              icon={<BookOpen size={20} />}
              setOpen={setOpen}
            >
              Poems
            </MobileItem>

            {!user && (
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
            )}

            {user && (
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

                {/* PREMIUM LOGOUT */}
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowLogout(true);
                  }}
                  className="
                  flex items-center gap-4

                  px-5 py-5

                  rounded-[24px]

                  bg-gradient-to-r
                  from-[#fff0f0]
                  to-[#fff6f6]

                  border border-[#f1d0d0]

                  text-[#b34b4b]

                  shadow-sm

                  hover:from-[#ffe6e6]
                  hover:to-[#fff1f1]

                  hover:border-[#e8bcbc]

                  transition-all duration-300
                "
                >
                  <LogOut size={20} />

                  <span className="font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* LOGOUT DIALOG */}
      <AlertDialog open={showLogout} onOpenChange={setShowLogout}>
        <AlertDialogContent className="rounded-[28px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Log out?</AlertDialogTitle>

            <AlertDialogDescription>
              You’ll be signed out of your poetic space.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={logout}
              className="
              bg-[#a94444]
              hover:bg-[#913b3b]

              text-white
            "
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
   MOBILE ITEM
====================================================== */

function MobileItem({ to, children, icon, setOpen }) {
  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="
      flex items-center gap-4

      px-5 py-5

      rounded-[24px]

      bg-white

      border border-[#ece1d4]

      text-[#4e463f]

      hover:bg-[#f6efe7]

      transition-all duration-300
    "
    >
      {icon}

      <span className="text-[15px] tracking-wide">{children}</span>
    </Link>
  );
}

/* ======================================================
   CLICK OUTSIDE
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
