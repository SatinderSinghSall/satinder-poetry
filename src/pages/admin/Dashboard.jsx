import { useEffect, useState } from "react";
import API from "@/api/api";
import StatCard from "@/components/admin/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    poems: 0,
    users: 0,
    subscribers: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [p, u, s] = await Promise.all([
          API.get("/poems"),
          API.get("/users/count"),
          API.get("/subscribe/count"),
        ]);

        setStats({
          poems: p.data.length,
          users: u.data.count,
          subscribers: s.data.count,
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard title="Total Poems" value={stats.poems} />
      <StatCard title="Total Users" value={stats.users} />
      <StatCard title="Subscribers" value={stats.subscribers} />
    </div>
  );
}
