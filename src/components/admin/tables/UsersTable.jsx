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

import { Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import API from "@/api/api";

export default function UsersTable({ users, setUsers, onView }) {
  if (!users?.length) {
    return (
      <Card className="rounded-2xl border bg-white p-16 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">No users found</p>
      </Card>
    );
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));
      toast.success("User deleted successfully");
    } catch {
      toast.error("Failed to delete user");
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
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => {
              const id = u._id || u.id;

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
                  {/* USER */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div
                        className="
                          h-9 w-9
                          rounded-full
                          bg-gradient-to-br
                          from-slate-800 to-slate-600
                          text-white
                          flex items-center justify-center
                          text-xs font-semibold
                          shadow-sm
                        "
                      >
                        {u.name?.[0]?.toUpperCase() || "U"}
                      </div>

                      <span className="font-medium text-slate-900">
                        {u.name}
                      </span>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 text-slate-600">{u.email}</td>

                  {/* ROLE */}
                  <td className="px-6 py-4">
                    <span
                      className={`
                        px-3 py-1 text-xs rounded-full font-medium
                        ${
                          u.role === "admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {u.role}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* View */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView?.(u)}
                        className="hover:bg-slate-100"
                      >
                        <Eye className="w-4 h-4 text-slate-600" />
                      </Button>

                      {/* Delete */}
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
                              Delete this user?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently remove the user account.
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
        {users.length} results
      </div>
    </Card>
  );
}
