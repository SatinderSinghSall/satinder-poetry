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

            <Link
              to="/about-me"
              className="
              group
              relative

              flex
              items-center
              gap-4

              px-5
              py-3

              border-2
              border-stone-900

              bg-[#efe6d6]

              transition-all
              duration-300

              hover:bg-[#e8dcc8]

              shadow-[4px_4px_0px_0px_rgba(28,24,20,0.22)]

              hover:translate-x-[2px]
              hover:translate-y-[2px]

              hover:shadow-[2px_2px_0px_0px_rgba(28,24,20,0.18)]

              active:translate-x-[4px]
              active:translate-y-[4px]

              active:shadow-none
            "
            >
              {/* Left Label */}
              <div className="flex flex-col leading-none">
                <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-amber-800">
                  Editorial
                </span>

                <span
                  className="
                    mt-1

                    text-[24px]

                    leading-none

                    text-stone-900
                  "
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 700,
                  }}
                >
                  The Long Story
                </span>
              </div>

              {/* Divider */}
              <div className="w-px self-stretch bg-stone-900/20" />

              {/* Arrow */}
              <div
                className="
                text-stone-700

                text-[20px]

                transition-transform
                duration-300

                group-hover:translate-x-1
                group-hover:-translate-y-[1px]
              "
              >
                ↗
              </div>

              {/* Vintage texture */}
              <div
                className="
                absolute inset-0 opacity-[0.05]

                bg-[radial-gradient(circle,#000_1px,transparent_1px)]
                bg-[size:10px_10px]

                pointer-events-none
              "
              />
            </Link>

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

          cursor-pointer
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

                cursor-pointer
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
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={logout}
              className="bg-neutral-900 hover:bg-neutral-800 cursor-pointer"
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

  useEffect(() => {
    if (open) {
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
  }, [open]);

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

        overscroll-contain

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
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-7">
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

            <Link
              to="/about-me"
              onClick={() => setOpen(false)}
              className="
              group
              relative
              overflow-hidden

              flex flex-col

              p-6

              border-2
              border-stone-900

              bg-[#efe6d6]

              shadow-[5px_5px_0px_0px_rgba(28,24,20,0.18)]

              transition-all
              duration-300

              hover:translate-x-[2px]
              hover:translate-y-[2px]

              hover:shadow-[2px_2px_0px_0px_rgba(28,24,20,0.14)]
            "
            >
              {/* Vintage texture */}
              <div
                className="
                absolute inset-0 opacity-[0.05]

                bg-[radial-gradient(circle,#000_1px,transparent_1px)]
                bg-[size:10px_10px]

                pointer-events-none
              "
              />

              {/* Small Label */}
              <span className="relative z-10 font-mono text-[10px] tracking-[0.3em] uppercase text-amber-800">
                Editorial Feature
              </span>

              {/* Main Heading */}
              <h3
                className="
                relative z-10

                mt-3

                text-[2.4rem]

                leading-[0.9]

                text-stone-900
              "
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                The Long Story
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-4 text-[14px] leading-relaxed text-stone-700">
                Poetry, airports, rain, memories, stories, and the person behind
                this space.
              </p>

              {/* Footer */}
              <div className="relative z-10 mt-6 flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone-500">
                  Enter Chapter 01
                </span>

                <span
                  className="
                  text-[22px]

                  text-stone-700

                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                  group-hover:-translate-y-[1px]
                "
                >
                  ↗
                </span>
              </div>

              {/* Corner stamp */}
              <div
                className="
                  absolute top-3 right-3

                  border border-stone-900/20

                  px-2 py-1

                  font-mono text-[8px]

                  tracking-[0.2em]
                  uppercase

                  text-stone-500

                  bg-[#f7f0e3]
                "
              >
                Vol. 01
              </div>
            </Link>

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

        {/* PREMIUM FOOTER */}
        <div
          className="
          relative

          shrink-0

          px-6 py-5

          border-t border-[#ece1d4]

          bg-gradient-to-b
          from-[#faf6f1]
          to-[#f6f1ea]
        "
        >
          {/* Soft glow */}
          <div
            className="
            absolute inset-x-0 top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-[#d9cbbb]
            to-transparent
          "
          />

          {/* Content */}
          <div className="flex flex-col items-center text-center">
            {/* Small poetic line */}
            <p
              className="
              text-[10px]

              uppercase

              tracking-[0.28em]

              text-[#9a8f84]
            "
            >
              Crafted with Elegance
            </p>

            {/* Developer */}
            <p
              className="
              mt-2

              text-[14px]

              text-[#2a241f]
            "
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
              }}
            >
              Developed by Satinder Singh Sall
            </p>

            {/* Version */}
            <p
              className="
              mt-1

              text-[11px]

              tracking-wide

              text-[#9a9085]
            "
            >
              Satinder Poetry • v7.5.0
            </p>
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
