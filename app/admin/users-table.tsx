// app/admin/users-table.tsx
"use client";

import { useEffect, useState } from "react";

interface IUser {
  _id: string;
  name?: string;
  email: string;
  role: string;
}

export default function UsersTable() {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.users || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const res = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setUsers(users.filter((u) => u._id !== id));
      alert("User deleted");
    } else {
      alert("Failed to delete user");
    }
  };

  const handleResetPassword = async (id: string) => {
    const newPassword = prompt("Enter new password for this user:");
    if (!newPassword) return;

    const res = await fetch(`/api/admin/users/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, newPassword }),
    });

    if (res.ok) {
      alert("Password reset successfully");
    } else {
      alert("Failed to reset password");
    }
  };

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Role</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u._id} className="border-t">
            <td className="p-2">{u.name}</td>
            <td className="p-2">{u.email}</td>
            <td className="p-2">{u.role}</td>
            <td className="p-2 flex gap-2 justify-center">
              <button
                className="text-blue-600"
                onClick={() => handleResetPassword(u._id)}
              >
                Reset Password
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(u._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
