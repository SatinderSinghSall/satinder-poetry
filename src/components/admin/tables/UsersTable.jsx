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

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import API from "@/api/api";

export default function UsersTable({ users, setUsers }) {
  if (!users?.length) {
    return (
      <Card className="rounded-2xl border bg-background p-16 text-center">
        <p className="text-sm text-muted-foreground">No users found</p>
      </Card>
    );
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`);

      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));

      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <Card className="rounded-2xl border bg-background overflow-hidden shadow-sm">
      <div className="max-h-[600px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-background border-b text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-3">User</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => {
              const id = u._id || u.id;

              return (
                <tr
                  key={id}
                  className="border-b last:border-0 hover:bg-muted/40 transition"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                      {u.name?.[0]?.toUpperCase() || "U"}
                    </div>

                    <span className="font-medium">{u.name}</span>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">{u.email}</td>

                  {/* ✅ shadcn delete modal */}
                  <td className="px-6 py-4 text-right">
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
                          <AlertDialogTitle>Delete this user?</AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            remove the user account.
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

      <div className="border-t px-6 py-3 text-xs text-muted-foreground">
        {users.length} results
      </div>
    </Card>
  );
}
