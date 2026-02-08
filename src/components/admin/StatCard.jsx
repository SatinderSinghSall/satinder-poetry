import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ title, value }) {
  return (
    <Card className="rounded-2xl shadow">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
}
