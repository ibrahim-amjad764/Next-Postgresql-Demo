"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../src/store/useStore";

type User = { id: number; name: string; email: string; active: boolean };

export default function Dashboard() {
  const queryClient = useQueryClient();

  const darkMode = useStore((state) => state.dark);
  const toggleDarkMode = useStore((state) => state.toggleDark);

  const { data: usersData, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  const createUser = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "New User", email: "newuser@example.com" }),
      });
      if (!res.ok) throw new Error("Failed to create user");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) return <p className="text-center mt-8">Loading users...</p>;
  if (error) return <p className="text-center mt-8">Error loading users.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-2">Next-JS + PostgreSQL Dashboard</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Manage users and their status with ease. Toggle active state or delete users directly from this dashboard. </p>
      <div className="flex justify-center items-center mb-4 gap-4 flex-wrap">

        <button onClick={toggleDarkMode} className="px-4 py-2  bg-blue-600  text-white rounded-md">
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
      <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">ID</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Name</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Email</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Status</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {usersData?.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() =>
                      fetch(`/api/user/${user.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ active: !user.active }),
                      }).then(() => queryClient.invalidateQueries({ queryKey: ["users"] }))
                    }
                    className="px-3 py-1 bg-[#6da0a5] text-white rounded-md text-sm">Toggle
                  </button>
                  <button
                    onClick={() =>
                      fetch(`/api/user/${user.id}`, { method: "DELETE" }).then(() =>
                        queryClient.invalidateQueries({ queryKey: ["users"] })
                      )
                    }
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm">Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
