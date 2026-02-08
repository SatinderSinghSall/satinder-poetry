import { useState } from "react";
import API from "@/api/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

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

      alert("Poem added successfully!");
      setForm({ title: "", author: "", content: "" });
    } catch (err) {
      alert("Failed to add poem");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl rounded-2xl shadow">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <Input
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />

          <textarea
            rows={5}
            className="w-full border rounded-lg p-3"
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <Button className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Add Poem"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
