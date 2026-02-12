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

import { Copy, Trash2, Mail } from "lucide-react";
import { toast } from "sonner";
import API from "@/api/api";

export default function SubscribersTable({ subscribers, setSubscribers }) {
  if (!subscribers?.length) {
    return (
      <Card className="rounded-2xl border bg-white p-16 text-center shadow-sm">
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
    } catch {
      toast.error("Failed to delete subscriber");
    }
  };

  return (
    <Card
      className="
        rounded-2xl
        border
        bg-white/90
        backdrop-blur
        shadow-md
        overflow-hidden
      "
    >
      <div className="max-h-[600px] overflow-auto">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="sticky top-0 bg-slate-50 border-b text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left">Subscriber</th>
              <th className="px-6 py-4 text-left">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {subscribers.map((s) => {
              const id = s._id || s.id;

              return (
                <tr
                  key={id}
                  className="
                    border-b
                    last:border-0
                    hover:bg-slate-50/80
                    transition
                  "
                >
                  {/* EMAIL */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* avatar */}
                      <div
                        className="
                          h-9 w-9
                          rounded-full
                          bg-gradient-to-br
                          from-indigo-600 to-indigo-400
                          text-white
                          flex items-center justify-center
                          shadow-sm
                        "
                      >
                        <Mail className="w-4 h-4" />
                      </div>

                      <span className="font-medium text-slate-900">
                        {s.email}
                      </span>
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(s.createdAt).toLocaleString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* copy */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyEmail(s.email)}
                        className="hover:bg-slate-100"
                      >
                        <Copy className="w-4 h-4 text-slate-600" />
                      </Button>

                      {/* delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
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
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t px-6 py-3 text-xs text-slate-500 bg-slate-50">
        {subscribers.length} results
      </div>
    </Card>
  );
}
