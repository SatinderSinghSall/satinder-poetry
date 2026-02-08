import { Card } from "@/components/ui/card";

export default function UsersTable({ users }) {
  if (!users?.length) {
    return (
      <Card className="rounded-2xl border bg-background p-16 text-center">
        <p className="text-sm text-muted-foreground">No users found</p>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border bg-background overflow-hidden shadow-sm">
      <div className="max-h-[600px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-background border-b text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-3">User</th>
              <th className="text-left px-6 py-3">Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id || u.id}
                className="border-b last:border-0 hover:bg-muted/40 transition"
              >
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {u.name?.[0]?.toUpperCase() || "U"}
                  </div>

                  <span className="font-medium">{u.name}</span>
                </td>

                <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t px-6 py-3 text-xs text-muted-foreground">
        {users.length} results
      </div>
    </Card>
  );
}
