import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/api/api";
import BookForm from "@/components/admin/forms/BookForm";
import { toast } from "sonner";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setBook(res.data);
      } catch {
        toast.error("Book not found");
        navigate("/admin/books");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate]);

  if (loading) return null;

  return (
    <BookForm
      initialData={book}
      mode="edit"
      onSubmit={(data) =>
        API.put(`/books/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      }
    />
  );
}
