
"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/context/AuthContext";

type Props = {
  children: ReactNode;
  role?: UserRole;
};

export default function ProtectedRoute({ children, role }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (role && user.role !== role) {
      router.replace("/");
    }
  }, [user, loading, role, router]);

  if (loading) {
    return <p className="p-8 text-center">Loading account...</p>;
  }

  if (!user || (role && user.role !== role)) {
    return <p className="p-8 text-center">Checking access...</p>;
  }

  return children;
}
