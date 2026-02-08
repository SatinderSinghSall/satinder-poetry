import { Card } from "@/components/ui/card";

export default function UsersTable({ users }) {
  return (
    <Card className="p-4 rounded-2xl shadow">
      <h3 className="font-semibold mb-4">Users</h3>

      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="text-left py-2">Name</th>
            <th className="text-left">Email</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((u) => (
            <tr key={u._id || u.id} className="border-b hover:bg-muted/50">
              <td className="py-2">{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
