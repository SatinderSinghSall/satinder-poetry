import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Users, Mail, FileText } from "lucide-react";

import API from "@/api/api";
import { Button } from "@/components/ui/button";

/* ---------- Admin Stat Card ---------- */
function AdminStat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm flex items-center gap-4">
      <div className="h-12 w-12 rounded-lg bg-slate-900 text-white flex items-center justify-center">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

/* ---------- Quick Action ---------- */
function QuickCard({ title, desc, action, onClick }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      <Button onClick={onClick} className="mt-5 w-full" variant="secondary">
        {action}
      </Button>
    </div>
  );
}

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-8 space-y-10">
        {/* 🔐 Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Overview of your poetry platform
            </p>
          </div>

          {/* Admin Actions */}
          <div className="flex flex-wrap gap-3">
            {/* Primary */}
            <Button
              onClick={() => navigate("/admin/add-poem")}
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Poem
            </Button>

            {/* Users */}
            <Button
              onClick={() => navigate("/admin/users")}
              variant="outline"
              className="border-slate-300"
            >
              <Users className="w-4 h-4 mr-2" />
              Users
            </Button>

            {/* Subscribers */}
            <Button
              onClick={() => navigate("/admin/subscribers")}
              variant="outline"
              className="border-slate-300"
            >
              <Mail className="w-4 h-4 mr-2" />
              Subscribers
            </Button>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <AdminStat title="Total Poems" value={stats.poems} icon={FileText} />
          <AdminStat
            title="Registered Users"
            value={stats.users}
            icon={Users}
          />
          <AdminStat
            title="Email Subscribers"
            value={stats.subscribers}
            icon={Mail}
          />
        </div>

        {/* ⚡ Admin Actions */}
        <div>
          <h2 className="text-lg font-medium mb-4">Quick Management</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <QuickCard
              title="Create Poem"
              desc="Add new poetry to the platform"
              action="Add Poem"
              onClick={() => navigate("/admin/add-poem")}
            />
            <QuickCard
              title="Manage Users"
              desc="View and manage user accounts"
              action="View Users"
              onClick={() => navigate("/admin/users")}
            />
            <QuickCard
              title="Subscribers"
              desc="View newsletter subscribers"
              action="View Subscribers"
              onClick={() => navigate("/admin/subscribers")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
