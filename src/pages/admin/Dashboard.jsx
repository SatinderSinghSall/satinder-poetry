import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Users, Mail, FileText, Eye, Heart } from "lucide-react";

import API from "@/api/api";
import { Button } from "@/components/ui/button";

/* ---------- Stat Card ---------- */
function AdminStat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition">
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

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    poems: 0,
    users: 0,
    subscribers: 0,
    views: 0,
    likes: 0,
  });

  const [recentPoems, setRecentPoems] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [poemsRes, usersRes, subsRes] = await Promise.all([
        API.get("/poems"),
        API.get("/users"),
        API.get("/subscribe"),
      ]);

      const poems = poemsRes.data;
      const users = usersRes.data;
      const subs = subsRes.data;

      /* totals */
      const totalViews = poems.reduce((a, b) => a + (b.views || 0), 0);
      const totalLikes = poems.reduce((a, b) => a + (b.likes || 0), 0);

      setStats({
        poems: poems.length,
        users: users.length,
        subscribers: subs.length,
        views: totalViews,
        likes: totalLikes,
      });

      /* recent lists */
      setRecentPoems(poems.slice(0, 5));
      setRecentUsers(users.slice(0, 5));
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
        {/* 🔐 Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Overview of your poetry platform
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => navigate("/admin/add-poem")}
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Poem
            </Button>

            <Button onClick={() => navigate("/admin/users")} variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Users
            </Button>

            <Button
              onClick={() => navigate("/admin/subscribers")}
              variant="outline"
            >
              <Mail className="w-4 h-4 mr-2" />
              Subscribers
            </Button>
          </div>
        </div>

        {/* ================================= */}
        {/* 📊 ORIGINAL STATS (UNCHANGED) */}
        {/* ================================= */}

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

        {/* ================================= */}
        {/* ⭐ NEW MINI STATS (ADDED ONLY) */}
        {/* ================================= */}

        <div className="grid md:grid-cols-2 gap-6">
          <AdminStat title="Total Views" value={stats.views} icon={Eye} />
          <AdminStat title="Total Likes" value={stats.likes} icon={Heart} />
        </div>

        {/* ================================= */}
        {/* ⚡ ORIGINAL QUICK MANAGEMENT */}
        {/* ================================= */}

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

        {/* ================================= */}
        {/* ✅ NEW SECTIONS (ADDED BELOW ONLY) */}
        {/* ================================= */}

        {/* Welcome Banner */}
        <div className="rounded-xl bg-slate-900 text-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Welcome back 👋</h2>
          <p className="text-sm opacity-80 mt-1">
            You currently have {stats.poems} poems, {stats.users} users and{" "}
            {stats.subscribers} subscribers.
          </p>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Poems */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="font-medium mb-4">Recent Poems</h3>

            <div className="space-y-3 text-sm">
              {recentPoems.map((p) => (
                <div key={p._id} className="flex justify-between border-b pb-2">
                  <span className="truncate">{p.title}</span>
                  <span className="text-muted-foreground">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="font-medium mb-4">Recent Users</h3>

            <div className="space-y-3 text-sm">
              {recentUsers.map((u) => (
                <div key={u._id} className="flex justify-between border-b pb-2">
                  <span>{u.name}</span>
                  <span className="text-muted-foreground">{u.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
