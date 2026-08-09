import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/api/api";
import BlogForm from "@/components/admin/forms/BlogForm";
import { toast } from "sonner";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/blogs/id/${id}`);

        setBlog(res.data.data || res.data);
      } catch (err) {
        toast.error("Blog post not found");
        navigate("/admin/blogs");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id, navigate]);

  if (loading) return null;

  return (
    <BlogForm
      initialData={blog}
      mode="edit"
      onSubmit={(data) =>
        API.put(`/blogs/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      }
    />
  );
}
