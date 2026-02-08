import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, Mail } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside
      className="
      w-64 h-screen sticky top-0 flex flex-col
      bg-gradient-to-b from-slate-100 to-slate-50
      border-r shadow-lg
      "
    >
      {/* ---------- Header ---------- */}
      <div className="px-6 py-6 border-b">
        <h2 className="text-lg font-semibold tracking-tight">Admin Panel</h2>
        <p className="text-xs text-muted-foreground">Poetry Management</p>
      </div>

      {/* ---------- Navigation ---------- */}
      <nav className="flex-1 p-3 space-y-1">
        <SideItem to="/admin" icon={LayoutDashboard} label="Dashboard" end />
        <SideItem to="/admin/add-poem" icon={BookOpen} label="Add Poem" />
        <SideItem to="/admin/users" icon={Users} label="Users" color="blue" />
        <SideItem
          to="/admin/subscribers"
          icon={Mail}
          label="Subscribers"
          color="green"
        />
      </nav>

      {/* ---------- Footer ---------- */}
      <div className="px-6 py-4 border-t text-xs text-muted-foreground">
        Poetry Admin v1.0
      </div>
    </aside>
  );
}

/* ---------- Nav Item ---------- */

function SideItem({ to, icon: Icon, label, end, color }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
        relative group flex items-center gap-3 px-3 py-2.5 rounded-xl
        text-sm font-medium transition-all duration-200

        ${
          isActive
            ? "bg-white shadow-sm text-black"
            : "text-slate-600 hover:bg-white hover:shadow-sm hover:text-black"
        }
      `
      }
    >
      {/* Active left indicator */}
      <span
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r
          ${
            color === "blue"
              ? "bg-blue-500"
              : color === "green"
                ? "bg-emerald-500"
                : "bg-primary"
          }
        `}
      />

      {/* Icon bubble */}
      <div
        className={`
        p-2 rounded-lg transition
        ${
          color === "blue"
            ? "bg-blue-100 text-blue-600"
            : color === "green"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-muted text-muted-foreground"
        }
        group-hover:scale-105
      `}
      >
        <Icon size={16} />
      </div>

      {label}
    </NavLink>
  );
}
