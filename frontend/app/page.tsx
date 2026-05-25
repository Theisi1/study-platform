"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main style={container}>
      <h1 style={title}>Study Platform 🚀</h1>

      <p style={subtitle}>
        Organiza tu estudio, gana XP y mejora tu disciplina como un juego.
      </p>

      <div style={buttons}>
        <button onClick={() => router.push("/login")} style={btnPrimary}>
          Iniciar sesión
        </button>

        <button onClick={() => router.push("/register")} style={btnSecondary}>
          Registrarse
        </button>
      </div>

      <div style={features}>
        <p>📚 Registra sesiones de estudio</p>
        <p>⚡ Gana experiencia (XP)</p>
        <p>🔥 Mantén tu racha</p>
        <p>🏆 Compite en el leaderboard</p>
      </div>
    </main>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const title: React.CSSProperties = {
  fontSize: "3rem",
  marginBottom: "1rem",
};

const subtitle: React.CSSProperties = {
  fontSize: "1.2rem",
  marginBottom: "2rem",
  color: "#cbd5f5",
};

const buttons: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  marginBottom: "2rem",
};

const btnPrimary: React.CSSProperties = {
  padding: "0.8rem 1.5rem",
  background: "#6366f1",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  padding: "0.8rem 1.5rem",
  background: "transparent",
  border: "1px solid #6366f1",
  borderRadius: "8px",
  color: "#6366f1",
  cursor: "pointer",
};

const features: React.CSSProperties = {
  marginTop: "2rem",
  opacity: 0.8,
};