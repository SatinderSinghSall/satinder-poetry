import BookForm from "@/components/admin/forms/BookForm";
import API from "@/api/api";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();

  const handleAddBook = async (data) => {
    const res = await API.post("/books", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Book</h1>

      <BookForm mode="add" onSubmit={handleAddBook} />
    </div>
  );
}
