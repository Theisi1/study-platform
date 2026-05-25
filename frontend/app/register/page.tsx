"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../services/auth";
import PageHeader from "../components/PageHeader";
import { useEffect } from "react";
import { fetchCurrentUserFromToken } from "../../services/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [university, setUniversity] = useState("");
  const [career, setCareer] = useState("");
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

      await registerUser({
        email,
        username,
        full_name: fullName,
        university,
        career,
        password,
      });

      setMessage("Usuario creado correctamente");
      router.push("/login");
    } catch (error) {
      console.error(error);
      setMessage("Error al crear la cuenta");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <PageHeader
        title="Crear cuenta"
        description="Regístrate para empezar a usar la plataforma."
      />

      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Nombre completo</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Universidad</label>
          <input
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Carrera</label>
          <input
            type="text"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button type="submit" disabled={submitting} style={buttonStyle}>
          {submitting ? "Creando..." : "Crear cuenta"}
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
  backgroundColor: "#059669",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};