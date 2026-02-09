import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/api/api";
import PoemForm from "@/components/admin/forms/PoemForm";
import { toast } from "sonner";

export default function EditPoem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const res = await API.get(`/poems/${id}`);
        setPoem(res.data);
      } catch {
        toast.error("Poem not found");
        navigate("/admin/poems");
      } finally {
        setLoading(false);
      }
    };

    fetchPoem();
  }, [id]);

  if (loading) return null;

  return (
    <PoemForm
      initialData={poem}
      mode="edit"
      onSubmit={(data) =>
        API.put(`/poems/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      }
    />
  );
}
