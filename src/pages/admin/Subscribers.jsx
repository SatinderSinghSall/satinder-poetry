import { useEffect, useState } from "react";
import API from "@/api/api";
import SubscribersTable from "@/components/admin/tables/SubscribersTable";

import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { RefreshCw, Mail, Loader2, Search } from "lucide-react";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(subscribers.filter((s) => s.email?.toLowerCase().includes(q)));
  }, [search, subscribers]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/subscribe");

      const list = Array.isArray(res.data) ? res.data : [];
      setSubscribers(list);
      setFiltered(list);
    } catch (err) {
      console.error("Subscribers fetch failed:", err);
      setSubscribers([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading subscribers…</span>
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* 🔐 Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Admin Panel
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Subscribers
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and monitor your newsletter audience
            </p>
          </div>

          {/* Search + refresh */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email"
                className="pl-9 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button variant="outline" onClick={fetchSubscribers}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-6 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-slate-900 text-white">
              <Mail className="w-5 h-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Subscribers</p>
              <p className="text-2xl font-semibold">{subscribers.length}</p>
            </div>
          </div>
        </div>

        {/* 🧾 Table / Empty state */}
        {filtered.length > 0 ? (
          <SubscribersTable subscribers={filtered} />
        ) : (
          <div className="rounded-2xl border bg-white p-10 text-center text-muted-foreground">
            No subscribers found.
          </div>
        )}
      </div>
    </div>
  );
}
