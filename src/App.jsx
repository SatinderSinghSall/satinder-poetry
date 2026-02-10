import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import ScrollToTop from "./components/ScrollToTop";

/* Layouts */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/admin/AdminLayout";

/* Route protection */
import ProtectedRoute from "./components/ProtectedRoute";

/* Public Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Poems from "./pages/Poems";
import PoemDetail from "./pages/PoemDetail";
import NotFound from "./pages/NotFound";

/* Admin Pages */
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Subscribers from "./pages/admin/Subscribers";
import PoemsAdmin from "./pages/admin/Poems";
import AddPoem from "./pages/admin/AddPoem";
import EditPoem from "./pages/admin/EditPoem";

export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />

      <ScrollToTop />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/poems" element={<Poems />} />
                <Route path="/poems/:id" element={<PoemDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>

              <Footer />
            </>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />

            {/* Poems */}
            <Route path="poems" element={<PoemsAdmin />} />
            <Route path="add-poem" element={<AddPoem />} />
            <Route path="edit-poem/:id" element={<EditPoem />} />

            {/* Users & Subscribers */}
            <Route path="users" element={<Users />} />
            <Route path="subscribers" element={<Subscribers />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
