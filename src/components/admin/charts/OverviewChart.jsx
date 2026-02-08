import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverviewChart({ poems, users, subscribers }) {
  const data = [
    { name: "Poems", count: poems },
    { name: "Users", count: users },
    { name: "Subscribers", count: subscribers },
  ];

  return (
    <Card className="rounded-2xl shadow">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" barSize={45} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
