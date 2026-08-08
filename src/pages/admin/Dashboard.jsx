import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Plus,
  Users,
  Mail,
  FileText,
  Eye,
  Heart,
  Library,
  Sparkles,
  Send,
} from "lucide-react";

import API from "@/api/api";
import { Button } from "@/components/ui/button";

/* ---------- Stat Card ---------- */
function AdminStat({ title, value, icon: Icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border bg-white p-6 shadow-sm flex items-center gap-4 transition ${
        onClick ? "cursor-pointer hover:shadow-md hover:border-slate-300" : ""
      }`}
    >
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
      <Button
        onClick={onClick}
        className="mt-5 w-full cursor-pointer"
        variant="secondary"
      >
        {action}
      </Button>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submissionsCount, setSubmissionsCount] = useState(0);

  const [stats, setStats] = useState({
    poems: 0,
    books: 0,
    suggestions: 0,
    users: 0,
    subscribers: 0,
    views: 0,
    likes: 0,
  });

  /* States for recent activity across all 6 collections */
  const [recentPoems, setRecentPoems] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [recentSuggestions, setRecentSuggestions] = useState([]);
  const [recentSubscribers, setRecentSubscribers] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        poemsRes,
        usersRes,
        booksRes,
        subsRes,
        suggestionsRes,
        submissionsRes,
      ] = await Promise.all([
        API.get("/poems").catch(() => ({ data: [] })),
        API.get("/users").catch(() => ({ data: [] })),
        API.get("/books").catch(() => ({ data: [] })),
        API.get("/subscribe").catch(() => ({ data: [] })),
        API.get("/book-suggestions").catch(() => ({ data: [] })),
        API.get("/submissions")
          .catch(() => API.get("/poem-submissions"))
          .catch(() => ({ data: [] })),
      ]);

      const poems = Array.isArray(poemsRes.data) ? poemsRes.data : [];
      const users = Array.isArray(usersRes.data) ? usersRes.data : [];
      const subs = Array.isArray(subsRes.data) ? subsRes.data : [];
      const books = Array.isArray(booksRes.data) ? booksRes.data : [];

      // Parse suggestions
      const suggData = suggestionsRes.data;
      const suggestionsList = Array.isArray(suggData)
        ? suggData
        : suggData?.suggestions || suggData?.data || [];

      // Parse poem submissions
      const submData = submissionsRes.data;
      const submissionsList = Array.isArray(submData)
        ? submData
        : submData?.submissions || submData?.data || [];

      const totalViews = poems.reduce((a, b) => a + (b.views || 0), 0);
      const totalLikes = poems.reduce((a, b) => a + (b.likes || 0), 0);

      setStats({
        poems: poems.length,
        users: users.length,
        subscribers: subs.length,
        views: totalViews,
        likes: totalLikes,
        books: books.length,
        suggestions: suggestionsList.length,
      });

      setSubmissionsCount(submissionsList.length);

      /* Set slice(0, 5) for all 6 database collections */
      setRecentPoems(poems.slice(0, 5));
      setRecentUsers(users.slice(0, 5));
      setRecentBooks(books.slice(0, 5));
      setRecentSuggestions(suggestionsList.slice(0, 5));
      setRecentSubscribers(subs.slice(0, 5));
      setRecentSubmissions(submissionsList.slice(0, 5));
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

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
        {/* Header */}
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
              className="bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Poem
            </Button>

            <Button
              onClick={() => navigate("/admin/add-book")}
              className="cursor-pointer"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Book
            </Button>

            <Button
              onClick={() => navigate("/admin/suggestions")}
              className="cursor-pointer"
              variant="outline"
            >
              <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
              Suggestions
            </Button>

            <Button
              onClick={() => navigate("/admin/submissions")}
              className="cursor-pointer"
              variant="outline"
            >
              <FileText className="w-4 h-4 mr-2 text-indigo-600" />
              Submissions
            </Button>

            <Button
              onClick={() => navigate("/admin/users")}
              variant="outline"
              className="cursor-pointer"
            >
              <Users className="w-4 h-4 mr-2" />
              Users
            </Button>

            <Button
              onClick={() => navigate("/admin/subscribers")}
              variant="outline"
              className="cursor-pointer"
            >
              <Mail className="w-4 h-4 mr-2" />
              Subscribers
            </Button>
          </div>
        </div>

        {/* 📊 STATS CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          <AdminStat
            title="Total Poems"
            value={stats.poems}
            icon={FileText}
            onClick={() => navigate("/admin/poems")}
          />
          <AdminStat
            title="Registered Users"
            value={stats.users}
            icon={Users}
            onClick={() => navigate("/admin/users")}
          />
          <AdminStat
            title="Email Subscribers"
            value={stats.subscribers}
            icon={Mail}
            onClick={() => navigate("/admin/subscribers")}
          />
          <AdminStat
            title="Total Books"
            value={stats.books}
            icon={Library}
            onClick={() => navigate("/admin/books")}
          />
          <AdminStat
            title="Book Suggestions"
            value={stats.suggestions}
            icon={Sparkles}
            onClick={() => navigate("/admin/suggestions")}
          />
          <AdminStat
            title="User Poem Submissions"
            value={submissionsCount}
            icon={Send}
            onClick={() => navigate("/admin/poem-submissions")}
          />
        </div>

        {/* ⭐ VIEWS & LIKES STATS */}
        <div className="grid md:grid-cols-2 gap-6">
          <AdminStat title="Total Views" value={stats.views} icon={Eye} />
          <AdminStat title="Total Likes" value={stats.likes} icon={Heart} />
        </div>

        {/* ⚡ QUICK MANAGEMENT */}
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
            <QuickCard
              title="Create Book"
              desc="Add a new poetry book or collection"
              action="Add Book"
              onClick={() => navigate("/admin/add-book")}
            />
            <QuickCard
              title="Book Suggestions"
              desc="Review recommendations submitted by readers"
              action="View Suggestions"
              onClick={() => navigate("/admin/suggestions")}
            />
            <QuickCard
              title="Poem Submissions"
              desc="Review user-submitted poems"
              action="View Submissions"
              onClick={() => navigate("/admin/submissions")}
            />
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="rounded-xl bg-slate-900 text-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Welcome back 👋</h2>
          <p className="text-sm opacity-80 mt-1">
            You currently have {stats.poems} poems, {stats.books} books,{" "}
            {stats.suggestions} book suggestions, {submissionsCount} poem
            submissions, {stats.users} registered users, and {stats.subscribers}{" "}
            subscribers.
          </p>
        </div>

        {/* ================================= */}
        {/* 🕒 RECENT ACTIVITY (6 SCHEMAS) */}
        {/* ================================= */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Recent Activity</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Recent Poems (poems) */}
            <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-700" /> Recent Poems
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                    {stats.poems}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  {recentPoems.length === 0 ? (
                    <p className="text-muted-foreground text-xs italic py-2">
                      No poems found.
                    </p>
                  ) : (
                    recentPoems.map((p) => (
                      <div
                        key={p._id || p.id}
                        className="flex justify-between border-b pb-2 gap-2"
                      >
                        <span className="truncate font-medium text-slate-700">
                          {p.title || "Untitled"}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {p.createdAt
                            ? new Date(p.createdAt).toLocaleDateString()
                            : "—"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 2. Recent Books (books) */}
            <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-slate-900 flex items-center gap-2">
                    <Library className="w-4 h-4 text-slate-700" /> Recent Books
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                    {stats.books}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  {recentBooks.length === 0 ? (
                    <p className="text-muted-foreground text-xs italic py-2">
                      No books found.
                    </p>
                  ) : (
                    recentBooks.map((b) => (
                      <div
                        key={b._id || b.id}
                        className="flex justify-between border-b pb-2 gap-2"
                      >
                        <span className="truncate font-medium text-slate-700">
                          {b.title || b.name || "Untitled Book"}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {b.createdAt
                            ? new Date(b.createdAt).toLocaleDateString()
                            : "—"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 3. Recent Users (users) */}
            <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-700" /> Recent Users
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                    {stats.users}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  {recentUsers.length === 0 ? (
                    <p className="text-muted-foreground text-xs italic py-2">
                      No users registered yet.
                    </p>
                  ) : (
                    recentUsers.map((u) => (
                      <div
                        key={u._id || u.id}
                        className="flex justify-between border-b pb-2 gap-2"
                      >
                        <span className="font-medium text-slate-700 truncate">
                          {u.name || "User"}
                        </span>
                        <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                          {u.email}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 4. Book Suggestions (booksuggestions) */}
            <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Book
                    Suggestions
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                    {stats.suggestions}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  {recentSuggestions.length === 0 ? (
                    <p className="text-muted-foreground text-xs italic py-2">
                      No suggestions submitted.
                    </p>
                  ) : (
                    recentSuggestions.map((s) => (
                      <div
                        key={s._id || s.id}
                        className="flex justify-between border-b pb-2 gap-2"
                      >
                        <span className="truncate font-medium text-slate-700">
                          {s.title || s.bookTitle || s.name || "Suggestion"}
                        </span>
                        <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                          {s.author || s.suggestedBy || "Anonymous"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 5. Poem Submissions (poemsubmissions) */}
            <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-slate-900 flex items-center gap-2">
                    <Send className="w-4 h-4 text-indigo-600" /> Poem
                    Submissions
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                    {submissionsCount}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  {recentSubmissions.length === 0 ? (
                    <p className="text-muted-foreground text-xs italic py-2">
                      No submissions found.
                    </p>
                  ) : (
                    recentSubmissions.map((sub) => (
                      <div
                        key={sub._id || sub.id}
                        className="flex justify-between border-b pb-2 gap-2"
                      >
                        <span className="truncate font-medium text-slate-700">
                          {sub.title || sub.poemTitle || "Submitted Poem"}
                        </span>
                        <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                          {sub.author || sub.submittedBy || sub.email || "User"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 6. Email Subscribers (emails) */}
            <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-slate-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-700" /> Newsletter
                    Subscribers
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                    {stats.subscribers}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  {recentSubscribers.length === 0 ? (
                    <p className="text-muted-foreground text-xs italic py-2">
                      No subscribers found.
                    </p>
                  ) : (
                    recentSubscribers.map((e) => (
                      <div
                        key={e._id || e.id}
                        className="flex justify-between border-b pb-2 gap-2"
                      >
                        <span className="truncate font-medium text-slate-700">
                          {e.email || e.address}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {e.createdAt
                            ? new Date(e.createdAt).toLocaleDateString()
                            : "Subscribed"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
