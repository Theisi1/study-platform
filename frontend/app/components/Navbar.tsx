"use client";

import { useEffect, useState } from "react";
import { fetchCurrentUserFromToken, removeToken } from "../../services/auth";
import { usePathname, useRouter } from "next/navigation";

type AuthUser = {
  id: number;
  email: string;
  username: string;
  full_name: string;
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await fetchCurrentUserFromToken();
      setUser(currentUser);
      setLoading(false);
    }

    loadUser();
  }, [pathname]);

  function handleLogout() {
    removeToken();
    setUser(null);
    router.push("/login");
    router.refresh();
  }

  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem 2rem",
        backgroundColor: "#111",
        borderBottom: "1px solid #333",
        marginBottom: "2rem",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {user && (
          <>
            <a href="/" style={linkStyle}>
              Dashboard
            </a>

            <a href="/users" style={linkStyle}>
              Users
            </a>

            <a href="/subjects" style={linkStyle}>
              Subjects
            </a>

            <a href="/sessions" style={linkStyle}>
              Sessions
            </a>
          </>
        )}

        <a href="/leaderboard" style={linkStyle}>
          Leaderboard
        </a>
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {loading ? (
          <span style={{ color: "#aaa" }}>Cargando...</span>
        ) : user ? (
          <>
            <span style={{ color: "#fff" }}>
              {user.full_name} (@{user.username})
            </span>
            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" style={linkStyle}>
              Login
            </a>
            <a href="/register" style={linkStyle}>
              Register
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};

const logoutButtonStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#dc2626",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};