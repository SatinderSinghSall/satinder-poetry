import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;

  // ❌ not logged in
  if (!user) return <Navigate to="/login" replace />;

  // ❌ not admin (optional but recommended)
  if (user.role !== "admin") return <Navigate to="/" replace />;

  // ✅ allowed
  return <Outlet />;
}
