import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
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
  ChevronDown,
  FileText,
  Plus,
  List,
  Globe,
  ExternalLink,
} from "lucide-react";

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  /* Submenu Toggle States */
  const [poemsOpen, setPoemsOpen] = useState(
    location.pathname.includes("/admin/poem"),
  );
  const [booksOpen, setBooksOpen] = useState(
    location.pathname.includes("/admin/book"),
  );

  return (
    <>
      {/* ---------- Mobile Topbar ---------- */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 text-white shadow-sm">
            <Shield size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight text-slate-900">
              Admin Panel
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Poetry Management
            </p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* ---------- Mobile Backdrop ---------- */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* ---------- Sidebar Container ---------- */}
      <aside
        className={`
          fixed md:sticky top-0 z-50 h-screen
          flex flex-col justify-between
          bg-slate-50/80 backdrop-blur-md border-r border-slate-200
          transition-all duration-300 ease-in-out select-none shadow-sm
          
          /* Mobile Drawer */
          ${
            mobileOpen
              ? "translate-x-0 w-80 left-0"
              : "-translate-x-full md:translate-x-0"
          }

          /* Desktop Sizing */
          ${collapsed ? "md:w-24" : "md:w-72"}
        `}
      >
        {/* ---------- Header ---------- */}
        <div className="px-6 py-5 border-b border-slate-200/80 flex items-center justify-between relative bg-white/50 flex-shrink-0">
          <div
            className={`flex items-center gap-3.5 overflow-hidden ${
              collapsed ? "md:justify-center md:w-full" : ""
            }`}
          >
            <div className="p-2.5 rounded-xl bg-slate-900 text-white shadow-sm flex-shrink-0">
              <Shield size={22} />
            </div>

            {(!collapsed || mobileOpen) && (
              <div className="whitespace-nowrap transition-opacity duration-200">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                  Admin Panel
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Poetry Management
                </p>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            <X size={20} />
          </button>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex absolute -right-4 top-6 p-1.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition-all hover:scale-105 cursor-pointer z-10"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* ---------- Navigation ---------- */}
        <nav className="p-4 space-y-6 overflow-y-auto flex-1 scrollbar-thin">
          {/* VISIT MAIN WEBSITE BUTTON */}
          <div>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              title={
                collapsed && !mobileOpen ? "Visit Main Website" : undefined
              }
              className={`
                group flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-base font-semibold
                bg-amber-500/10 text-amber-900 border border-amber-300/80 hover:bg-amber-100/80
                transition-all duration-150 cursor-pointer
                ${collapsed && !mobileOpen ? "justify-center" : "justify-between"}
              `}
            >
              <div className="flex items-center gap-3.5 truncate">
                <Globe size={20} className="text-amber-600 flex-shrink-0" />
                {(!collapsed || mobileOpen) && (
                  <span className="truncate font-bold text-amber-950">
                    Visit Main Website
                  </span>
                )}
              </div>
              {(!collapsed || mobileOpen) && (
                <ExternalLink
                  size={15}
                  className="text-amber-700 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                />
              )}
            </Link>
          </div>

          {/* OVERVIEW */}
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

          {/* CONTENT */}
          <Section label="Content" collapsed={collapsed && !mobileOpen}>
            {/* Poems Management Dropdown Group */}
            <CollapsibleGroup
              label="Poems Management"
              icon={ScrollText}
              isOpen={poemsOpen}
              onToggle={() => setPoemsOpen(!poemsOpen)}
              collapsed={collapsed && !mobileOpen}
              isActive={location.pathname.includes("/admin/poem")}
            >
              <SubSideItem
                to="/admin/poems"
                icon={List}
                label="All Poems"
                collapsed={collapsed && !mobileOpen}
                onNavigate={() => setMobileOpen(false)}
              />
              <SubSideItem
                to="/admin/add-poem"
                icon={Plus}
                label="Add Poem"
                collapsed={collapsed && !mobileOpen}
                onNavigate={() => setMobileOpen(false)}
              />
            </CollapsibleGroup>

            {/* Book Management Dropdown Group */}
            <CollapsibleGroup
              label="Book Management"
              icon={Library}
              isOpen={booksOpen}
              onToggle={() => setBooksOpen(!booksOpen)}
              collapsed={collapsed && !mobileOpen}
              isActive={location.pathname.includes("/admin/book")}
            >
              <SubSideItem
                to="/admin/books"
                icon={BookOpen}
                label="All Books"
                collapsed={collapsed && !mobileOpen}
                onNavigate={() => setMobileOpen(false)}
              />
              <SubSideItem
                to="/admin/add-book"
                icon={Plus}
                label="Add Book"
                collapsed={collapsed && !mobileOpen}
                onNavigate={() => setMobileOpen(false)}
              />
            </CollapsibleGroup>

            <SideItem
              to="/admin/suggestions"
              icon={Sparkles}
              label="Suggestions"
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

          {/* AUDIENCE */}
          <Section label="Audience" collapsed={collapsed && !mobileOpen}>
            <SideItem
              to="/admin/users"
              icon={Users}
              label="Users"
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />
            <SideItem
              to="/admin/subscribers"
              icon={Mail}
              label="Subscribers"
              collapsed={collapsed && !mobileOpen}
              onNavigate={() => setMobileOpen(false)}
            />
          </Section>
        </nav>

        {/* ---------- Footer ---------- */}
        <div className="p-5 border-t border-slate-200/80 bg-white/40 flex-shrink-0">
          <div
            className={`flex items-center text-sm text-slate-500 font-semibold ${
              collapsed && !mobileOpen ? "justify-center" : "justify-between"
            }`}
          >
            {(!collapsed || mobileOpen) && <span>Poetry Admin</span>}
            <span className="px-2.5 py-1 rounded bg-slate-200/80 text-xs text-slate-700 font-mono font-bold">
              v5.0.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------- Section Header Component ---------- */
function Section({ label, children, collapsed }) {
  return (
    <div className="space-y-1.5">
      {!collapsed ? (
        <p className="px-3.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          {label}
        </p>
      ) : (
        <div className="h-px bg-slate-200/80 my-3 mx-2" />
      )}
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

/* ---------- Collapsible Group Wrapper ---------- */
function CollapsibleGroup({
  label,
  icon: Icon,
  isOpen,
  onToggle,
  children,
  collapsed,
  isActive,
}) {
  if (collapsed) {
    return <div className="space-y-1.5">{children}</div>;
  }

  return (
    <div className="space-y-1.5">
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-semibold
          transition-all duration-150 cursor-pointer
          ${
            isActive
              ? "text-slate-900 font-bold"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }
        `}
      >
        <div className="flex items-center gap-3.5 truncate">
          <Icon size={20} className="text-slate-500 flex-shrink-0" />
          <span className="truncate">{label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="pl-4 space-y-1.5 border-l-2 border-slate-200 ml-6 my-1">
          {children}
        </div>
      )}
    </div>
  );
}

/* ---------- Nav Item Component ---------- */
function SideItem({ to, icon: Icon, label, end, collapsed, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `
        group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-base font-semibold
        transition-all duration-150 cursor-pointer
        ${collapsed ? "justify-center" : ""}
        ${
          isActive
            ? "bg-slate-900 text-white font-semibold shadow-md"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }
      `
      }
    >
      <Icon size={20} className="flex-shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}

/* ---------- Nested Sub-Nav Item Component ---------- */
function SubSideItem({ to, icon: Icon, label, collapsed, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `
        group flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-semibold
        transition-all duration-150 cursor-pointer
        ${
          isActive
            ? "bg-slate-200/90 text-slate-900 font-bold"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }
      `
      }
    >
      <Icon
        size={16}
        className="flex-shrink-0 text-slate-400 group-hover:text-slate-600"
      />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}
