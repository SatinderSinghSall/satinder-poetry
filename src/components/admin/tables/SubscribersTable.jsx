import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";

export default function SubscribersTable({ subscribers }) {
  if (!subscribers?.length) {
    return (
      <Card className="rounded-3xl border bg-background p-16 text-center">
        <p className="text-sm text-muted-foreground">No subscribers found</p>
      </Card>
    );
  }

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
  };

  return (
    <Card className="rounded-3xl border bg-background overflow-hidden shadow-sm">
      <div className="max-h-[600px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-background border-b">
            <tr className="text-muted-foreground">
              <th className="text-left px-6 py-3">User</th>
              <th className="text-left px-6 py-3">Subscribed</th>
              <th className="w-20"></th>
            </tr>
          </thead>

          <tbody>
            {subscribers.map((s) => (
              <tr
                key={s._id || s.id}
                className="border-b last:border-0 hover:bg-muted/40 transition"
              >
                {/* Email with avatar */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {s.email[0].toUpperCase()}
                  </div>

                  <span className="font-medium">{s.email}</span>
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {new Date(s.subscribedAt).toLocaleString()}
                </td>

                {/* copy action */}
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => copyEmail(s.email)}
                    className="opacity-60 hover:opacity-100"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* footer */}
      <div className="border-t px-6 py-3 text-xs text-muted-foreground flex justify-between">
        <span>{subscribers.length} results</span>
        <span>Satinder Singh Sall - Admin Panel</span>
      </div>
    </Card>
  );
}
