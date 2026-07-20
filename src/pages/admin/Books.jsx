import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { Library, Edit, Search, Loader2, RefreshCw, Eye } from "lucide-react";
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

export default function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      books.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q),
      ),
    );
  }, [search, books]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/books");
      setBooks(res.data);
      setFiltered(res.data);
    } catch {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Book deleted");
      fetchBooks();
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
            <span className="text-sm">Loading books…</span>
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
        {/* 🔐 Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Admin Panel
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Books</h1>
            <p className="text-sm text-muted-foreground">
              Manage and monitor published books
            </p>
          </div>

          {/* Search + Refresh + Add */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                className="pl-9 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button variant="outline" onClick={fetchBooks} className="cursor-pointer">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button onClick={() => navigate("/admin/add-book")} className="cursor-pointer">
              Add Book
            </Button>
          </div>
        </div>

        {/* 📊 Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-6 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-slate-900 text-white">
              <Library className="w-5 h-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Books</p>
              <p className="text-2xl font-semibold">{books.length}</p>
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
              {filtered.map((book) => (
                <tr key={book._id} className="border-t">
                  <td className="p-4 font-medium">{book.title}</td>
                  <td className="p-4 text-muted-foreground">{book.author}</td>

                  <td className="p-4 text-right space-x-2">
                    {/* View */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedBook(book)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    {/* Edit */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/edit-book/${book._id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    {/* Delete */}
                    <DeleteDialog
                      onConfirm={() => handleDelete(book._id)}
                      label="Delete Book"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ================================= */}
          {/* 👁 VIEW BOOK MODAL */}
          {/* ================================= */}

          {selectedBook && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
              <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Book Details</h2>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedBook(null)}
                  >
                    Close
                  </Button>
                </div>

                {/* Content */}
                <div className="grid gap-4 text-sm">
                  <Field label="Title" value={selectedBook.title} />
                  <Field label="Author" value={selectedBook.author} />
                  <Field label="Description" value={selectedBook.description} />
                  <Field
                    label="Price"
                    value={
                      selectedBook.price ? `$${selectedBook.price}` : "Free"
                    }
                  />
                  <Field
                    label="Purchase Link"
                    value={
                      selectedBook.purchaseLink ? (
                        <a
                          href={selectedBook.purchaseLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          {selectedBook.purchaseLink}
                        </a>
                      ) : null
                    }
                  />
                  <Field
                    label="Created At"
                    value={
                      selectedBook.createdAt
                        ? new Date(selectedBook.createdAt).toLocaleString()
                        : "—"
                    }
                  />
                  <Field
                    label="Updated At"
                    value={
                      selectedBook.updatedAt
                        ? new Date(selectedBook.updatedAt).toLocaleString()
                        : "—"
                    }
                  />

                  {/* Cover image */}
                  {selectedBook.coverImage && (
                    <div>
                      <p className="font-medium mb-2">Cover Image</p>
                      <img
                        src={selectedBook.coverImage}
                        alt={selectedBook.title}
                        className="rounded-xl w-full max-h-60 object-cover border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="p-10 text-center text-muted-foreground">
              No books found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
