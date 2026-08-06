import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Mail,
  ScrollText,
  Shield,
  Library,
  Sparkles,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* ---------- Mobile Topbar ---------- */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-slate-900 text-white shadow-sm">
            <Shield size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-slate-900">
              Admin Panel
            </h2>
            <p className="text-[10px] text-slate-500">Poetry Management</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-200/80 transition"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ---------- Mobile Backdrop ---------- */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* ---------- Sidebar Container ---------- */}
      <aside
        className={`
          fixed md:sticky top-0 z-50 h-screen
          flex flex-col
          bg-gradient-to-b from-slate-100 to-slate-50
          border-r shadow-xl
          transition-all duration-300 ease-in-out select-none
          
          /* Mobile Drawer */
          ${
            mobileOpen
              ? "translate-x-0 w-72"
              : "-translate-x-full md:translate-x-0"
          }

          /* Desktop Sizing */
          ${collapsed ? "md:w-20" : "md:w-72"}
        `}
      >
        {/* ---------- Header ---------- */}
        <div className="px-6 py-5 border-b flex items-center justify-between relative">
          <div
            className={`flex items-center gap-3 overflow-hidden ${
              collapsed ? "md:justify-center md:w-full" : ""
            }`}
          >
            {/* Admin Icon */}
            <div className="p-2 rounded-xl bg-slate-900 text-white shadow-sm flex-shrink-0">
              <Shield size={18} />
            </div>

            {(!collapsed || mobileOpen) && (
              <div className="whitespace-nowrap">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                  Admin Panel
                </h2>
                <p className="text-xs text-slate-500">Poetry Management</p>
              </div>
            )}
          </div>

          {/* Close button for Mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60"
          >
            <X size={18} />
          </button>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex absolute -right-3.5 top-6 p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-md transition-all hover:scale-105 cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* ---------- Navigation ---------- */}
        <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
          {/* ===== Core ===== */}
          <Section label="Overview" collapsed={collapsed && !mobileOpen}>
            <SideItem
              to="/admin"
              icon={LayoutDashboard}
              label="Dashboard"
              end
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />
          </Section>

          {/* ===== Content ===== */}
          <Section label="Content" collapsed={collapsed && !mobileOpen}>
            <SideItem
              to="/admin/poems"
              icon={ScrollText}
              label="Poems"
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />
            <SideItem
              to="/admin/add-poem"
              icon={BookOpen}
              label="Add Poem"
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />
            <SideItem
              to="/admin/books"
              icon={Library}
              label="Books"
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />
            <SideItem
              to="/admin/add-book"
              icon={BookOpen}
              label="Add Book"
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />
            <SideItem
              to="/admin/suggestions"
              icon={Sparkles}
              label="Suggestions"
              color="amber"
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />

            <SideItem
              to="/admin/poem-submissions"
              icon={FileText}
              label="Submissions"
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />
          </Section>

          {/* ===== Audience ===== */}
          <Section label="Audience" collapsed={collapsed && !mobileOpen}>
            <SideItem
              to="/admin/users"
              icon={Users}
              label="Users"
              color="blue"
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />
            <SideItem
              to="/admin/subscribers"
              icon={Mail}
              label="Subscribers"
              color="green"
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />
          </Section>
        </nav>

        {/* ---------- Footer ---------- */}
        <div className="px-6 py-4 border-t text-xs text-slate-400 whitespace-nowrap overflow-hidden">
          {collapsed && !mobileOpen ? "v1.0" : "Poetry Admin · v2.0"}
        </div>
      </aside>
    </>
  );
}

/* ---------- Section ---------- */
function Section({ label, children, collapsed }) {
  return (
    <div>
      {!collapsed && (
        <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-slate-400">
          {label}
        </p>
      )}
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

/* ---------- Nav Item ---------- */
function SideItem({
  to,
  icon: Icon,
  label,
  end,
  color,
  collapsed,
  onNavigate,
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `
        group flex items-center gap-3
        px-4 py-3 rounded-xl
        text-sm font-medium
        transition-all duration-200
        ${collapsed ? "justify-center px-2" : ""}
        ${
          isActive
            ? "bg-white shadow-md text-black font-semibold"
            : "text-slate-600 hover:bg-white hover:shadow-sm hover:text-black"
        }
      `
      }
    >
      {/* Icon */}
      <div
        className={`
          p-2.5 rounded-lg transition flex-shrink-0
          ${
            color === "blue"
              ? "bg-blue-100 text-blue-600"
              : color === "green"
                ? "bg-emerald-100 text-emerald-600"
                : color === "amber"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-200/60 text-slate-600"
          }
        `}
      >
        <Icon size={18} />
      </div>

      {!collapsed && <span className="flex-1 truncate">{label}</span>}

      {/* Active dot indicator */}
      {!collapsed && (
        <span className="h-2 w-2 rounded-full bg-slate-900 opacity-0 group-[.active]:opacity-100 transition-opacity" />
      )}
    </NavLink>
  );
}
