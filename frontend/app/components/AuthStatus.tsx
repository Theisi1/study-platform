"use client";

import { useEffect, useState } from "react";
import { fetchCurrentUserFromToken, removeToken } from "../../services/auth";
import { useRouter } from "next/navigation";

type AuthUser = {
  id: number;
  email: string;
  username: string;
  full_name: string;
};

export default function AuthStatus() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await fetchCurrentUserFromToken();
      setUser(currentUser);
      setLoading(false);
    }

    loadUser();
  }, []);

  function handleLogout() {
    removeToken();
    setUser(null);
    router.push("/login");
    router.refresh();
  }

  if (loading) {
    return <span style={{ color: "#aaa" }}>Cargando...</span>;
  }

  if (!user) {
    return <span style={{ color: "#aaa" }}>No autenticado</span>;
  }

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <span style={{ color: "#fff" }}>
        {user.full_name} (@{user.username})
      </span>
      <button
        onClick={handleLogout}
        style={{
          padding: "6px 10px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#dc2626",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}