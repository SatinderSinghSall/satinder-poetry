import { useEffect, useState } from "react";
import API from "@/api/api";
import SubscribersTable from "@/components/admin/tables/SubscribersTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, Loader2 } from "lucide-react";

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
    setFiltered(subscribers.filter((s) => s.email.toLowerCase().includes(q)));
  }, [search, subscribers]);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/subscribe");
      setSubscribers(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
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
              <span className="text-sm">Loading subscribers...</span>
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
    <div className="min-h-screen bg-muted/30 p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Subscribers</h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your newsletter audience
          </p>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Search email..."
            className="w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button variant="outline" onClick={fetchSubscribers}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border bg-background p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-muted">
            <Users className="w-5 h-5" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Total Subscribers</p>
            <p className="text-2xl font-bold">{subscribers.length}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <SubscribersTable subscribers={filtered} />
    </div>
  );
}
