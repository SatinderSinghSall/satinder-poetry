import PoemForm from "@/components/admin/forms/PoemForm";
import API from "@/api/api";
import { useNavigate } from "react-router-dom";

// @desc    Admin page layout for publishing a new poem
// @route   N/A (Page Component)
// @access  Private/Admin
export default function AddPoem() {
  const navigate = useNavigate();

  // @desc    API handler to send new poem data to backend with full error handling
  // @route   POST /api/poems
  // @access  Private/Admin
  const handleAddPoem = async (data) => {
    try {
      const res = await API.post("/poems", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/admin/poems");
      return res.data;
    } catch (err) {
      // Re-throw raw error or Axios error so PoemForm can inspect status codes & messages
      throw err;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Poem</h1>

      <PoemForm mode="add" onSubmit={handleAddPoem} />
    </div>
  );
}
