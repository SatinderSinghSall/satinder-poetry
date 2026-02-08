import { useEffect, useState } from "react";
import API from "@/api/api";
import UsersTable from "@/components/admin/tables/UsersTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");

      const list = Array.isArray(res.data) ? res.data : res.data.users || [];

      setUsers(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Skeleton className="h-40 w-full rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <UsersTable users={users} />
    </div>
  );
}
