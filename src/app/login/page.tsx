"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = login(
      String(formData.get("email") || ""),
      String(formData.get("password") || "")
    );

    setMessage(result.message);
    setIsError(!result.success);

    if (result.success) {
      router.push("/account");
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-bold">Welcome back</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email address"
          autoComplete="email"
          required
          className="w-full rounded-md border border-border bg-background p-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-border bg-background p-3"
        />

        {message && (
          <p role={isError ? "alert" : "status"}>
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 p-3 text-white"
        >
          Login
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>

      <div className="rounded-md border border-border p-3 text-sm">
        <p className="font-semibold">Demo admin credentials</p>
        <p>Email: admin@gebeya.demo</p>
        <p>Password: Admin123!</p>
      </div>
    </div>
  );
}
