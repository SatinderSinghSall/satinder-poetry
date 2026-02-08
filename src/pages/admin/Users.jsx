import { useEffect, useState } from "react";
import API from "@/api/api";
import UsersTable from "@/components/admin/tables/UsersTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users as UsersIcon, Loader2 } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/users");
      // console.log(res.data);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading users...</span>
            </div>
          </div>

          {/* Stats skeleton */}
          <Skeleton className="h-24 w-full rounded-2xl bg-muted/70 animate-pulse" />

          {/* Table skeleton rows */}
          <div className="rounded-2xl border bg-background p-6 space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-12 w-full rounded-xl bg-muted/70 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
            <p className="text-sm text-muted-foreground">
              Manage platform users
            </p>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Search users..."
              className="w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button variant="outline" onClick={fetchUsers}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-background p-6 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-muted">
              <UsersIcon className="w-5 h-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <UsersTable users={filtered} />
      </div>
    </div>
  );
}
