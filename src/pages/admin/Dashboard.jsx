import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/api";
import StatCard from "@/components/admin/StatCard";

import { Button } from "@/components/ui/button";
import { Loader2, Plus, Users, Mail } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    poems: 0,
    users: 0,
    subscribers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [p, u, s] = await Promise.all([
        API.get("/poems"),
        API.get("/users/count"),
        API.get("/subscribe/count"),
      ]);

      setStats({
        poems: p.data.length,
        users: u.data.count,
        subscribers: s.data.count,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/40 to-background">
      <div className="max-w-7xl mx-auto p-8 space-y-10">
        {/* 🔥 Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Overview of your poetry platform
            </p>
          </div>

          {/* 🔥 CTAs */}
          <div className="flex gap-3">
            {/* 🔥 Primary */}
            <Button
              onClick={() => navigate("/admin/add-poem")}
              className="bg-black text-white hover:bg-black/80 shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Poem
            </Button>
            {/* Users */}
            <Button
              onClick={() => navigate("/admin/users")}
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Users
            </Button>

            {/* Subscribers */}
            <Button
              onClick={() => navigate("/admin/subscribers")}
              className="bg-green-600 text-white hover:bg-green-700 shadow-sm"
            >
              <Mail className="w-4 h-4 mr-2" />
              Subscribers
            </Button>
          </div>
        </div>

        {/* 🔥 Stats grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard title="Total Poems" value={stats.poems} />
          <StatCard title="Total Users" value={stats.users} />
          <StatCard title="Subscribers" value={stats.subscribers} />
        </div>

        {/* 🔥 Quick actions section */}
        <div className="grid md:grid-cols-3 gap-6">
          <QuickCard
            title="Create new poem"
            desc="Add fresh content to your library"
            action="Add Poem"
            onClick={() => navigate("/admin/add-poem")}
          />

          <QuickCard
            title="Manage users"
            desc="View and manage platform accounts"
            action="View Users"
            onClick={() => navigate("/admin/users")}
          />

          <QuickCard
            title="Email subscribers"
            desc="Grow and manage your audience"
            action="Subscribers"
            onClick={() => navigate("/admin/subscribers")}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Quick card component ---------- */
function QuickCard({ title, desc, action, onClick }) {
  return (
    <div className="rounded-2xl border bg-background p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>

      <Button variant="secondary" className="mt-5" onClick={onClick}>
        {action}
      </Button>
    </div>
  );
}
