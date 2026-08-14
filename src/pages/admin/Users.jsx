import { useEffect, useState } from "react";
import API from "@/api/api";
import UsersTable from "@/components/admin/tables/UsersTable";

import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  RefreshCw,
  Users as UsersIcon,
  Loader2,
  Search,
  X,
  Copy,
  Check,
  User,
  Mail,
  Shield,
  Calendar,
  Clock,
  Key,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingRole, setUpdatingRole] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [copied, setCopied] = useState(false);

  // State for Role Change Confirmation Modal
  const [pendingRole, setPendingRole] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      users.filter(
        (u) =>
          u.name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q),
      ),
    );
  }, [search, users]);

  // 🔒 Prevent background scrolling when any modal is open
  useEffect(() => {
    if (selectedUser || pendingRole) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedUser, pendingRole]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/users");

      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.users)
          ? res.data.users
          : [];

      setUsers(list);
      setFiltered(list);
    } catch (err) {
      console.error("Users fetch failed:", err);
      setUsers([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Trigger confirmation modal when user selects a new role
  const handleSelectRole = (newRole) => {
    if (!selectedUser || selectedUser.role === newRole) return;
    setPendingRole(newRole);
  };

  // Step 2: Execute actual API call on confirmation
  const confirmRoleChange = async () => {
    if (!selectedUser || !pendingRole) return;

    try {
      setUpdatingRole(true);
      const userId = selectedUser._id || selectedUser.id;

      const res = await API.patch(`/users/${userId}/role`, {
        role: pendingRole,
      });

      const updatedUser = res.data?.user || {
        ...selectedUser,
        role: pendingRole,
      };

      setUsers((prev) =>
        prev.map((u) => ((u._id || u.id) === userId ? updatedUser : u)),
      );

      setSelectedUser(updatedUser);
      toast.success(`Role updated to ${pendingRole}`);
    } catch (err) {
      console.error("Role update failed:", err);
      toast.error(err.response?.data?.message || "Failed to update user role");
    } finally {
      setUpdatingRole(false);
      setPendingRole(null);
    }
  };

  const handleCopyId = (id) => {
    if (!id || id === "—") return;
    navigator.clipboard.writeText(id);
    setCopied(true);
    toast.success("User ID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading users…</span>
          </div>

          <Skeleton className="h-24 w-full rounded-2xl" />

          <div className="rounded-2xl border bg-background p-6 space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const userId = selectedUser ? selectedUser._id || selectedUser.id || "—" : "";

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* 🔐 Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Admin Panel
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Users
            </h1>
            <p className="text-sm text-slate-500">
              Manage platform users and access controls
            </p>
          </div>

          {/* Search + refresh */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name or email..."
                className="pl-9 w-64 rounded-xl border-slate-200 bg-white focus-visible:ring-slate-900 shadow-2xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              onClick={fetchUsers}
              className="cursor-pointer rounded-xl border-slate-200 bg-white hover:bg-slate-50 shadow-2xs text-slate-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 flex items-center gap-4 shadow-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-md shadow-slate-900/10">
              <UsersIcon className="w-5 h-5" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Total Users
              </p>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">
                {users.length}
              </p>
            </div>
          </div>
        </div>

        {/* 🧾 Table Component */}
        <UsersTable
          users={filtered}
          setUsers={setUsers}
          onView={setSelectedUser}
        />

        {/* 💎 Polished Light-Mode Modal */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-900/15 p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
              {/* Top Right Close Icon */}
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-slate-200/80 bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Profile Card Header */}
              <div className="flex items-center gap-4 pr-8 pb-2">
                <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-base font-bold shadow-sm shrink-0">
                  {selectedUser.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight truncate">
                      {selectedUser.name || "User Details"}
                    </h2>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        selectedUser.role === "admin"
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200/60"
                          : "bg-slate-100 text-slate-600 border-slate-200/80"
                      }`}
                    >
                      {selectedUser.role || "user"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    View and manage user details
                  </p>
                </div>
              </div>

              {/* Information Row List */}
              <div className="space-y-2.5 text-sm">
                {/* Name Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Name</span>
                  </div>
                  <span className="text-slate-900 font-semibold text-sm">
                    {selectedUser.name || "—"}
                  </span>
                </div>

                {/* Email Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>Email</span>
                  </div>
                  <span className="text-slate-900 font-medium text-xs break-all">
                    {selectedUser.email || "—"}
                  </span>
                </div>

                {/* Role Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span>Role</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select
                        value={selectedUser.role || "user"}
                        disabled={updatingRole}
                        onChange={(e) => handleSelectRole(e.target.value)}
                        className="appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-8 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer disabled:opacity-50 transition shadow-2xs"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {updatingRole && (
                      <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                    )}
                  </div>
                </div>

                {/* Created At Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Created At</span>
                  </div>
                  <span className="text-slate-700 text-xs font-medium">
                    {selectedUser.createdAt
                      ? new Date(selectedUser.createdAt).toLocaleString()
                      : "—"}
                  </span>
                </div>

                {/* Updated At Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Updated At</span>
                  </div>
                  <span className="text-slate-700 text-xs font-medium">
                    {selectedUser.updatedAt
                      ? new Date(selectedUser.updatedAt).toLocaleString()
                      : "—"}
                  </span>
                </div>

                {/* User ID Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-500 text-xs uppercase tracking-wider shrink-0">
                    <Key className="w-4 h-4 text-slate-400" />
                    <span>User ID</span>
                  </div>
                  <div className="flex items-center gap-2 max-w-[220px]">
                    <span className="text-[11px] font-mono text-slate-500 truncate">
                      {userId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyId(userId)}
                      className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition cursor-pointer shrink-0"
                      title="Copy ID"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedUser(null)}
                  className="rounded-xl border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold h-9 px-5 cursor-pointer shadow-2xs"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ⚠️ Role Change Confirmation Modal */}
        {pendingRole && selectedUser && (
          <div className="fixed inset-0 z-60 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Confirm Role Change
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Are you sure you want to change{" "}
                    <span className="font-semibold text-slate-900">
                      {selectedUser.name}
                    </span>
                    ’s role from{" "}
                    <span className="font-semibold uppercase text-slate-700">
                      {selectedUser.role}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold uppercase text-indigo-600">
                      {pendingRole}
                    </span>
                    ?
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={updatingRole}
                  onClick={() => setPendingRole(null)}
                  className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold h-9 px-4 cursor-pointer"
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  disabled={updatingRole}
                  onClick={confirmRoleChange}
                  className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold h-9 px-5 cursor-pointer shadow-sm flex items-center gap-2"
                >
                  {updatingRole ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Confirm Change</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
