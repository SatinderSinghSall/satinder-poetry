import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

// Pages:
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Poems from "./pages/Poems";
import PoemDetail from "./pages/PoemDetail";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Subscribers from "./pages/admin/Subscribers";
import AddPoem from "./pages/admin/AddPoem";

// Components:
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

//! To run the frontend for DEVELOPMENT -> npm run dev
//! To run the frontend for PRODUCTION -> npm run build & npm run preview

export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/poems" element={<Poems />} />
        <Route path="/poems/:id" element={<PoemDetail />} />

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="add-poem" element={<AddPoem />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
