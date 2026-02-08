import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, Mail } from "lucide-react";

const base =
  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition";

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r bg-background p-4 space-y-2">
      <h2 className="text-lg font-semibold mb-6">Admin Panel</h2>

      <NavLink to="/admin" end className={base}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      <NavLink to="/admin/add-poem" className={base}>
        <BookOpen size={18} /> Add Poem
      </NavLink>

      <NavLink to="/admin/users" className={base}>
        <Users size={18} /> Users
      </NavLink>

      <NavLink to="/admin/subscribers" className={base}>
        <Mail size={18} /> Subscribers
      </NavLink>
    </aside>
  );
}
