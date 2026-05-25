"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, saveToken } from "../../services/auth";
import PageHeader from "../components/PageHeader";
import { useEffect } from "react";
import { fetchCurrentUserFromToken } from "../../services/auth";


export default function LoginPage() {
  const router = useRouter();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
  async function checkAuth() {
    const user = await fetchCurrentUserFromToken();

    if (user) {
      router.push("/dashboard");
    }
  }

  checkAuth();
}, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");

      const result = await loginUser({
        email,
        password,
      });

      saveToken(result.access_token);
      setMessage("Login correcto");
      router.push("/dashboard");

    } catch (error) {
      console.error(error);
      setMessage("Credenciales inválidas");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <PageHeader
        title="Iniciar sesión"
        description="Accede a tu cuenta para registrar estudio y ver tu progreso."
      />

      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="usuario@email.com"
          />
        </div>

        <div>
          <label style={labelStyle}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="Tu contraseña"
          />
        </div>

        <button type="submit" disabled={submitting} style={buttonStyle}>
          {submitting ? "Entrando..." : "Entrar"}
        </button>

        {message && <p style={{ margin: 0 }}>{message}</p>}
      </form>
    </main>
  );
}

const formStyle: React.CSSProperties = {
  display: "grid",
  gap: "14px",
  maxWidth: "500px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #555",
  backgroundColor: "#1a1a1a",
  color: "#fff",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};