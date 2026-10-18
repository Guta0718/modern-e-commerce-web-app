"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  fullName: string;
  email: string;
  role: "customer" | "admin";
};

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("gebeya_demo_users");
      const registeredUsers: User[] = storedUsers
        ? JSON.parse(storedUsers)
        : [];

      const safeUsers = registeredUsers.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }));

      setUsers(safeUsers);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="mt-2 text-gray-500">
          View registered customers and administrator accounts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-5 dark:border-gray-700">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="mt-2 text-3xl font-bold">{users.length}</p>
        </div>

        <div className="rounded-xl border p-5 dark:border-gray-700">
          <p className="text-sm text-gray-500">Customers</p>
          <p className="mt-2 text-3xl font-bold">
            {users.filter((user) => user.role === "customer").length}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Registered Users</h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:max-w-sm"
        />
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="rounded-xl border p-6 text-gray-500 dark:border-gray-700">
          No users found. Register a demo account to see it here.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
          <table className="w-full min-w-[550px] text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t dark:border-gray-700"
                >
                  <td className="p-4 font-medium">{user.fullName}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
