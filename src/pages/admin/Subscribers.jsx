import { useEffect, useState } from "react";
import API from "@/api/api";
import SubscribersTable from "@/components/admin/tables/SubscribersTable";

import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { RefreshCw, Mail, Loader2, Search } from "lucide-react";

// Helper field display component for modal
const Field = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4 border-b pb-2 items-center">
    <span className="font-medium text-slate-600">{label}</span>
    <span className="col-span-2 text-muted-foreground break-words">
      {value || "—"}
    </span>
  </div>
);

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

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

            <Button
              variant="outline"
              onClick={fetchSubscribers}
              className="cursor-pointer"
            >
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

        {/* 🧾 Table Component */}
        <SubscribersTable
          subscribers={filtered}
          setSubscribers={setSubscribers}
          onView={setSelectedSubscriber}
        />

        {/* 👁️ Subscriber Details Modal */}
        {selectedSubscriber && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Subscriber Details</h2>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubscriber(null)}
                  className="cursor-pointer"
                >
                  Close
                </Button>
              </div>

              {/* Fields */}
              <div className="space-y-3 text-sm">
                <Field label="Email" value={selectedSubscriber.email} />
                <Field
                  label="Subscribed At"
                  value={
                    selectedSubscriber.createdAt
                      ? new Date(selectedSubscriber.createdAt).toLocaleString()
                      : "—"
                  }
                />
                <Field
                  label="Updated At"
                  value={
                    selectedSubscriber.updatedAt
                      ? new Date(selectedSubscriber.updatedAt).toLocaleString()
                      : "—"
                  }
                />
                <Field
                  label="Subscriber ID"
                  value={selectedSubscriber._id || selectedSubscriber.id}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
