import PoemForm from "@/components/admin/forms/PoemForm";
import API from "@/api/api";
import { useNavigate } from "react-router-dom";

export default function AddPoem() {
  const navigate = useNavigate();

  const handleAddPoem = async (data) => {
    const res = await API.post("/poems", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Poem</h1>

      <PoemForm mode="add" onSubmit={handleAddPoem} />
    </div>
  );
}
