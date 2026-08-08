import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50/50">
      {/* Sidebar handles mobile drawer drawer vs desktop sidebar internally */}
      <AdminSidebar />

      {/* Main Content Container */}
      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
