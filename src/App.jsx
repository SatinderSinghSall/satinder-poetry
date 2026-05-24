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

/* Admin Pages */
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Subscribers from "./pages/admin/Subscribers";
import PoemsAdmin from "./pages/admin/Poems";
import AddPoem from "./pages/admin/AddPoem";
import EditPoem from "./pages/admin/EditPoem";
import PublicLayout from "./layouts/PublicLayout";

/* Components: */
import ScrollToTopButton from "./components/ScrollToTopButton";
import EngagementModal from "./components/EngagementModal";

//! To run the frontend for DEVELOPMENT -> npm run dev
//! To run the frontend for PRODUCTION -> npm run build & npm preview

export default function App() {
  const location = useLocation();
  const [showEngagementModal, setShowEngagementModal] = useState(false);
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

    if (missingAccount || missingNewsletter) {
      const timer = setTimeout(() => {
        setShowEngagementModal(true);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

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

      <Routes>
        {/* ===== PUBLIC LAYOUT ===== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/poems/:id" element={<PoemDetail />} />
          <Route path="/newsletter" element={<NewsletterSignup />} />

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
          </Route>
        </Route>
      </Routes>
    </>
  );
}
