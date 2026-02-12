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
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import DeleteDialog from "@/components/admin/DeleteDialog";

const Field = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4 border-b pb-2">
    <span className="font-medium text-slate-600">{label}</span>
    <span className="col-span-2 text-muted-foreground break-words">
      {value || "—"}
    </span>
  </div>
);

export default function Poems() {
  const navigate = useNavigate();
  const [poems, setPoems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPoem, setSelectedPoem] = useState(null);

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
                    {/* View */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPoem(poem)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    {/* Edit */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/edit-poem/${poem._id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    {/* Delete */}
                    <DeleteDialog
                      onConfirm={() => handleDelete(poem._id)}
                      label="Delete Poem"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ================================= */}
          {/* 👁 VIEW POEM MODAL */}
          {/* ================================= */}

          {selectedPoem && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
              <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Poem Details</h2>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPoem(null)}
                  >
                    Close
                  </Button>
                </div>

                {/* Content */}
                <div className="grid gap-4 text-sm">
                  <Field label="Title" value={selectedPoem.title} />
                  <Field label="Author" value={selectedPoem.author} />
                  <Field label="Summary" value={selectedPoem.summary} />
                  <Field label="Theme" value={selectedPoem.theme} />
                  <Field
                    label="Tags"
                    value={(selectedPoem.tags || []).join(", ")}
                  />
                  <Field label="Status" value={selectedPoem.status} />
                  <Field
                    label="Featured"
                    value={selectedPoem.featured ? "Yes" : "No"}
                  />
                  <Field
                    label="Reading Time"
                    value={`${selectedPoem.readingTime || 0} min`}
                  />
                  <Field label="Views" value={selectedPoem.views} />
                  <Field label="Likes" value={selectedPoem.likes} />
                  <Field
                    label="Added By (User ID)"
                    value={selectedPoem.addedBy}
                  />
                  <Field
                    label="Created At"
                    value={new Date(selectedPoem.createdAt).toLocaleString()}
                  />
                  <Field
                    label="Updated At"
                    value={new Date(selectedPoem.updatedAt).toLocaleString()}
                  />

                  {/* Cover image */}
                  {selectedPoem.coverImage && (
                    <div>
                      <p className="font-medium mb-2">Cover Image</p>
                      <img
                        src={selectedPoem.coverImage}
                        className="rounded-xl w-full max-h-60 object-cover border"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div>
                    <p className="font-medium mb-2">Content</p>
                    <div className="whitespace-pre-line text-muted-foreground border rounded-xl p-4 bg-slate-50">
                      {selectedPoem.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
