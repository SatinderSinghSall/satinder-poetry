import { useEffect, useState } from "react";
import API from "@/api/api";
import SubscribersTable from "@/components/admin/tables/SubscribersTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      // ✅ call REAL list endpoint (not count)
      const res = await API.get("/subscribers");

      setSubscribers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Skeleton className="h-40 w-full rounded-xl" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Subscribers</h1>
      <SubscribersTable subscribers={subscribers} />
    </div>
  );
}
