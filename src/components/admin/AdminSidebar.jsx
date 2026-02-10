import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Mail,
  ScrollText,
  Shield,
} from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside
      className="
        w-72 h-screen sticky top-0
        flex flex-col
        bg-gradient-to-b from-slate-100 to-slate-50
        border-r shadow-xl
      "
    >
      {/* ---------- Header ---------- */}
      <div className="px-6 py-5 border-b flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Poetry Management</p>
        </div>

        {/* ✅ Admin Icon */}
        <div className="p-2 rounded-xl bg-slate-900 text-white shadow-sm">
          <Shield size={18} />
        </div>
      </div>

      {/* ---------- Navigation ---------- */}
      <nav className="flex-1 px-4 py-4 space-y-6">
        {/* ===== Core ===== */}
        <Section label="Overview">
          <SideItem to="/admin" icon={LayoutDashboard} label="Dashboard" end />
        </Section>

        {/* ===== Content ===== */}
        <Section label="Content">
          <SideItem to="/admin/poems" icon={ScrollText} label="Poems" />
          <SideItem to="/admin/add-poem" icon={BookOpen} label="Add Poem" />
        </Section>

        {/* ===== Audience ===== */}
        <Section label="Audience">
          <SideItem to="/admin/users" icon={Users} label="Users" color="blue" />
          <SideItem
            to="/admin/subscribers"
            icon={Mail}
            label="Subscribers"
            color="green"
          />
        </Section>
      </nav>

      {/* ---------- Footer ---------- */}
      <div className="px-6 py-4 border-t text-xs text-muted-foreground">
        Poetry Admin · v1.0
      </div>
    </aside>
  );
}

/* ---------- Section ---------- */
function Section({ label, children }) {
  return (
    <div>
      <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <div className="space-y-1.5">{children}</div>
    </div>
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
        group flex items-center gap-3
        px-4 py-3 rounded-xl
        text-sm font-medium
        transition-all duration-200
        ${
          isActive
            ? "bg-white shadow-md text-black"
            : "text-slate-600 hover:bg-white hover:shadow-sm hover:text-black"
        }
      `
      }
    >
      {/* Icon */}
      <div
        className={`
          p-2.5 rounded-lg transition
          ${
            color === "blue"
              ? "bg-blue-100 text-blue-600"
              : color === "green"
                ? "bg-emerald-100 text-emerald-600"
                : "bg-muted text-muted-foreground"
          }
        `}
      >
        <Icon size={18} />
      </div>

      <span className="flex-1">{label}</span>

      {/* Active dot indicator */}
      <span className="h-2 w-2 rounded-full bg-slate-900 opacity-0 group-[.active]:opacity-100" />
    </NavLink>
  );
}
