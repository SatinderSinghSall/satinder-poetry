import PoemForm from "@/components/admin/forms/PoemForm";

export default function AddPoem() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Poem</h1>
      <PoemForm />
    </div>
  );
}
