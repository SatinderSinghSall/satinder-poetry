import { useState } from "react";
import API from "@/api/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { Loader2, PenLine } from "lucide-react";
import { toast } from "sonner";

export default function PoemForm() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await API.post("/poems", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Poem published successfully ✨");

      setForm({
        title: "",
        author: "",
        content: "",
      });
    } catch (err) {
      toast.error("Failed to publish poem");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-muted/40 via-background to-muted/30">
      {/* 🔥 Full screen loader */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <PenLine className="w-6 h-6" />
            Add New Poem
          </h1>

          <p className="text-muted-foreground">
            Write and publish a poem to your collection
          </p>
        </div>

        {/* Card */}
        <Card className="rounded-3xl border bg-background shadow-lg">
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Enter poem title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {/* Author */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Author</label>
                <Input
                  placeholder="Author name"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>

                <textarea
                  rows={9}
                  className="
                    w-full
                    rounded-2xl
                    border
                    bg-muted/30
                    px-4
                    py-3
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary
                    resize-none
                  "
                  placeholder="Write your poem here..."
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                />
              </div>

              {/* CTA */}
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-2xl bg-black text-white hover:bg-black/80 shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    Publish Poem
                    <PenLine className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
