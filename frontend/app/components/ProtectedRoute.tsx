"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCurrentUserFromToken } from "../../services/auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const user = await fetchCurrentUserFromToken();

      if (!user) {
        router.push("/login");
        return;
      }

      setAuthorized(true);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Verificando sesión...</p>;
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}