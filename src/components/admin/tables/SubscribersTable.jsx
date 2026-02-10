import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import API from "@/api/api";

export default function SubscribersTable({ subscribers, setSubscribers }) {
  if (!subscribers?.length) {
    return (
      <Card className="rounded-3xl border bg-background p-16 text-center">
        <p className="text-sm text-muted-foreground">No subscribers found</p>
      </Card>
    );
  }

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied");
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/subscribe/${id}`);

      setSubscribers((prev) => prev.filter((s) => (s._id || s.id) !== id));

      toast.success("Subscriber removed");
    } catch (err) {
      toast.error("Failed to delete subscriber");
    }
  };

  return (
    <Card className="rounded-3xl border bg-background overflow-hidden shadow-sm">
      <div className="max-h-[600px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-background border-b">
            <tr className="text-muted-foreground">
              <th className="text-left px-6 py-3">User</th>
              <th className="text-left px-6 py-3">Subscribed</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {subscribers.map((s) => {
              const id = s._id || s.id;

              return (
                <tr
                  key={id}
                  className="border-b last:border-0 hover:bg-muted/40 transition"
                >
                  {/* email */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                      {s.email[0].toUpperCase()}
                    </div>

                    <span className="font-medium">{s.email}</span>
                  </td>

                  {/* date */}
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(s.subscribedAt || s.createdAt).toLocaleString()}
                  </td>

                  {/* actions */}
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    {/* copy */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyEmail(s.email)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>

                    {/* delete */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete this subscriber?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            This email will no longer receive poem updates.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleDelete(id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t px-6 py-3 text-xs text-muted-foreground flex justify-between">
        <span>{subscribers.length} results</span>
        <span>Satinder Singh Sall - Admin Panel</span>
      </div>
    </Card>
  );
}
