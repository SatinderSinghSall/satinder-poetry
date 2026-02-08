import { Card } from "@/components/ui/card";

export default function SubscribersTable({ subscribers }) {
  return (
    <Card className="p-4 rounded-2xl shadow">
      <h3 className="font-semibold mb-4">Subscribers</h3>

      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="text-left py-2">Email</th>
            <th className="text-left">Subscribed At</th>
          </tr>
        </thead>

        <tbody>
          {subscribers?.map((s) => (
            <tr key={s._id || s.id} className="border-b hover:bg-muted/50">
              <td className="py-2">{s.email}</td>
              <td>{new Date(s.subscribedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
