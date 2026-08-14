import { useEffect, useState } from "react";
import API from "@/api/api";
import SubscribersTable from "@/components/admin/tables/SubscribersTable";

import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  RefreshCw,
  Mail,
  Loader2,
  Search,
  X,
  Copy,
  Check,
  Calendar,
  Clock,
  Key,
} from "lucide-react";
import { toast } from "sonner";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  // Copy state trackers
  const [copiedId, setCopiedId] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(subscribers.filter((s) => s.email?.toLowerCase().includes(q)));
  }, [search, subscribers]);

  // 🔒 Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedSubscriber) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedSubscriber]);

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

  const handleCopy = (text, type) => {
    if (!text || text === "—") return;
    navigator.clipboard.writeText(text);

    if (type === "id") {
      setCopiedId(true);
      toast.success("Subscriber ID copied to clipboard");
      setTimeout(() => setCopiedId(false), 2000);
    } else if (type === "email") {
      setCopiedEmail(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50">
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

  const subscriberId = selectedSubscriber
    ? selectedSubscriber._id || selectedSubscriber.id || "—"
    : "";

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
              Subscribers
            </h1>
            <p className="text-sm text-slate-500">
              Manage and monitor your newsletter audience
            </p>
          </div>

          {/* Search + Refresh */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by email..."
                className="pl-9 w-64 rounded-xl border-slate-200 bg-white focus-visible:ring-slate-900 shadow-2xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              onClick={fetchSubscribers}
              className="cursor-pointer rounded-xl border-slate-200 bg-white hover:bg-slate-50 shadow-2xs text-slate-700"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 flex items-center gap-4 shadow-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-md shadow-slate-900/10">
              <Mail className="w-5 h-5" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Total Subscribers
              </p>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">
                {subscribers.length}
              </p>
            </div>
          </div>
        </div>

        {/* 🧾 Table Component */}
        <SubscribersTable
          subscribers={filtered}
          setSubscribers={setSubscribers}
          onView={setSelectedSubscriber}
        />

        {/* 💎 Polished Light-Mode Modal */}
        {selectedSubscriber && (
          <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-900/15 p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
              {/* Top Right Close Icon Button */}
              <button
                type="button"
                onClick={() => setSelectedSubscriber(null)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-slate-200/80 bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Subscriber Header Card */}
              <div className="flex items-center gap-4 pr-8 pb-2">
                <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-base font-bold shadow-sm shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight truncate">
                      Subscriber Details
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200/60">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    View newsletter audience information
                  </p>
                </div>
              </div>

              {/* Information Rows */}
              <div className="space-y-2.5 text-sm">
                {/* Email Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-500 text-xs uppercase tracking-wider shrink-0">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>Email</span>
                  </div>
                  <div className="flex items-center gap-2 max-w-[240px]">
                    <span className="text-slate-900 font-medium text-xs break-all truncate">
                      {selectedSubscriber.email || "—"}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(selectedSubscriber.email, "email")
                      }
                      className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition cursor-pointer shrink-0"
                      title="Copy Email"
                    >
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Subscribed At Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Subscribed At</span>
                  </div>
                  <span className="text-slate-700 text-xs font-medium">
                    {selectedSubscriber.createdAt
                      ? new Date(selectedSubscriber.createdAt).toLocaleString()
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
                    {selectedSubscriber.updatedAt
                      ? new Date(selectedSubscriber.updatedAt).toLocaleString()
                      : "—"}
                  </span>
                </div>

                {/* Subscriber ID Row */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-500 text-xs uppercase tracking-wider shrink-0">
                    <Key className="w-4 h-4 text-slate-400" />
                    <span>Subscriber ID</span>
                  </div>
                  <div className="flex items-center gap-2 max-w-[220px]">
                    <span className="text-[11px] font-mono text-slate-500 truncate">
                      {subscriberId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(subscriberId, "id")}
                      className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition cursor-pointer shrink-0"
                      title="Copy Subscriber ID"
                    >
                      {copiedId ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-2 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedSubscriber(null)}
                  className="rounded-xl border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold h-9 px-5 cursor-pointer shadow-2xs"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
