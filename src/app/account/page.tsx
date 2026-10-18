
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  if (!user) return null;

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">My Account</h1>

      <div className="space-y-3 rounded-lg border border-border p-6">
        <p>
          <span className="font-semibold">Name:</span> {user.fullName}
        </p>

        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>

        <p>
          <span className="font-semibold">Role:</span>{" "}
          <span className="capitalize">{user.role}</span>
        </p>

        {user.role === "admin" && (
          <button
            onClick={() => router.push("/admin")}
            className="rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            Open Admin Dashboard
          </button>
        )}

        <button
          onClick={handleLogout}
          className="rounded-md bg-red-600 px-4 py-2 text-white"
        >
          Sign Out
        </button>
      </div>
    </section>
  );
}
