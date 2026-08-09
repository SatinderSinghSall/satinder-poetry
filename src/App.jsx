import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import ScrollToTop from "./components/ScrollToTop";

/* Layouts */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/admin/AdminLayout";

/* Route protection */
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";

/* Public Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Poems from "./pages/Poems";
import PoemDetail from "./pages/PoemDetail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import NewsletterSignup from "./pages/NewsletterSignup";
import About from "./pages/About";
import Books from "./pages/Books";
import AddPoemPortal from "./pages/AddPoemPortal";
import Blogs from "@/pages/Blogs";
import BlogDetail from "@/pages/BlogDetail";

/* Admin Pages */
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Subscribers from "./pages/admin/Subscribers";
import PoemsAdmin from "./pages/admin/Poems";
import AddPoem from "./pages/admin/AddPoem";
import EditPoem from "./pages/admin/EditPoem";
import PublicLayout from "./layouts/PublicLayout";
import BooksAdmin from "./pages/admin/Books";
import AddBook from "./pages/admin/AddBook";
import EditBook from "./pages/admin/EditBook";
import { AdminBookSuggestions } from "./components/admin/AdminBookSuggestions";
import { AdminPoemSubmissions } from "./components/admin/AdminPoemSubmissions";
import BlogsAdmin from "./pages/admin/Blogs";
import AddBlog from "./pages/admin/AddBlog";
import EditBlog from "./pages/admin/EditBlog";

/* Components: */
import ScrollToTopButton from "./components/ScrollToTopButton";
import EngagementModal from "./components/EngagementModal";
import WelcomeBackModal from "./components/WelcomeBackModal";
import QuickNavModal from "./components/QuickNavModal";

//! To run the frontend for DEVELOPMENT -> npm run dev
//! To run the frontend for PRODUCTION -> npm run build & npm preview

export default function App() {
  const location = useLocation();

  const [showEngagementModal, setShowEngagementModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const [needsAccount, setNeedsAccount] = useState(false);
  const [needsNewsletter, setNeedsNewsletter] = useState(false);

  useEffect(() => {
    const excludedRoutes = ["/login", "/register", "/newsletter"];

    const isExcludedRoute = excludedRoutes.includes(location.pathname);

    const isAdminRoute = location.pathname.startsWith("/admin");

    if (isExcludedRoute || isAdminRoute) return;

    const hasAccount = localStorage.getItem("hasAccount");

    const hasNewsletter = localStorage.getItem("hasNewsletter");

    const missingAccount = !hasAccount;

    const missingNewsletter = !hasNewsletter;

    setNeedsAccount(missingAccount);

    setNeedsNewsletter(missingNewsletter);

    const timer = setTimeout(() => {
      // USER COMPLETED EVERYTHING
      if (hasAccount && hasNewsletter) {
        setShowWelcomeModal(true);
      }

      // USER STILL MISSING SOMETHING
      else if (missingAccount || missingNewsletter) {
        setShowEngagementModal(true);
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const [showQuickNavModal, setShowQuickNavModal] = useState(false);
  // Keyboard shortcut (Ctrl + K or Cmd + K) to open QuickNav
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowQuickNavModal((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Toaster richColors position="top-right" />

      <ScrollToTop />
      <ScrollToTopButton />
      <EngagementModal
        open={showEngagementModal}
        onClose={() => setShowEngagementModal(false)}
        needsAccount={needsAccount}
        needsNewsletter={needsNewsletter}
      />
      <WelcomeBackModal
        open={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />
      <QuickNavModal
        isOpen={showQuickNavModal}
        onClose={() => setShowQuickNavModal(false)}
      />

      <Routes>
        {/* ===== PUBLIC LAYOUT ===== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/poems/:id" element={<PoemDetail />} />
          <Route path="/newsletter" element={<NewsletterSignup />} />
          <Route path="/about-me" element={<About />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add-poem-portal" element={<AddPoemPortal />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />

          {/* protected profile */}
          <Route element={<AuthRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ===== ADMIN ===== */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="poems" element={<PoemsAdmin />} />
            <Route path="add-poem" element={<AddPoem />} />
            <Route path="edit-poem/:id" element={<EditPoem />} />
            <Route path="users" element={<Users />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route
              path="/admin/suggestions"
              element={<AdminBookSuggestions />}
            />
            <Route
              path="/admin/poem-submissions"
              element={<AdminPoemSubmissions />}
            />

            {/* ===== BOOK ADMIN ROUTES ===== */}
            <Route path="books" element={<BooksAdmin />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="edit-book/:id" element={<EditBook />} />

            {/* ===== BLOG ADMIN ROUTES ===== */}
            <Route path="blogs" element={<BlogsAdmin />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="edit-blog/:id" element={<EditBlog />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
