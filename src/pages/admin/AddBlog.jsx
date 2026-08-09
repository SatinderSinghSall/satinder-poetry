import BlogForm from "@/components/admin/forms/BlogForm";
import { createBlog } from "@/api/api";
import { useNavigate } from "react-router-dom";

export default function AddBlog() {
  const navigate = useNavigate();

  const handleAddBlog = async (data) => {
    // Calling the backend API.
    // Errors throw and get caught cleanly by BlogForm's try/catch block.
    const res = await createBlog(data);

    // Navigate to admin blogs list on success
    navigate("/admin/blogs");
    return res;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Blog Post</h1>
      <BlogForm mode="add" onSubmit={handleAddBlog} />
    </div>
  );
}
