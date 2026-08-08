import BookForm from "@/components/admin/forms/BookForm";
import { createBook } from "@/api/api";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();

  const handleAddBook = async (data) => {
    // Calling the backend API.
    // Errors will throw and be cleanly handled by BookForm's catch block.
    const res = await createBook(data);

    // Only navigate to the list page if the API call was successful
    navigate("/admin/books");
    return res;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Book</h1>
      <BookForm mode="add" onSubmit={handleAddBook} />
    </div>
  );
}
