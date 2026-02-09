import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  FileText,
  Edit,
  Trash2,
  Search,
  Mail,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import DeleteDialog from "@/components/admin/DeleteDialog";

export default function Poems() {
  const navigate = useNavigate();
  const [poems, setPoems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPoems();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      poems.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q),
      ),
    );
  }, [search, poems]);

  const fetchPoems = async () => {
    try {
      setLoading(true);
      const res = await API.get("/poems");
      setPoems(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("Failed to load poems");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // if (!confirm("Delete this poem?")) return;

    try {
      await API.delete(`/poems/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Poem deleted");
      fetchPoems();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Header loader */}
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading poems…</span>
          </div>

          {/* Stats skeleton */}
          <Skeleton className="h-24 w-full rounded-2xl" />

          {/* Table skeleton */}
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
        {/* Header */}
        {/* 🔐 Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Admin Panel
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Poems</h1>
            <p className="text-sm text-muted-foreground">
              Manage and monitor published poems
            </p>
          </div>

          {/* Search + refresh */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search poems..."
                className="pl-9 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button variant="outline" onClick={fetchPoems}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button onClick={() => navigate("/admin/add-poem")}>
              Add Poem
            </Button>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-6 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-slate-900 text-white">
              <FileText className="w-5 h-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Poems</p>
              <p className="text-2xl font-semibold">{poems.length}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Author</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((poem) => (
                <tr key={poem._id} className="border-t">
                  <td className="p-4 font-medium">{poem.title}</td>
                  <td className="p-4 text-muted-foreground">{poem.author}</td>

                  <td className="p-4 text-right space-x-2">
                    {/* Edit */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/edit-poem/${poem._id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    {/* Delete (Modal) */}
                    <DeleteDialog
                      onConfirm={() => handleDelete(poem._id)}
                      label="Delete Poem"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-10 text-center text-muted-foreground">
              No poems found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
