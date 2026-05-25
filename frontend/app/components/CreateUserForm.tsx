type CreateUserFormProps = {
  newUserEmail: string;
  setNewUserEmail: (value: string) => void;
  newUsername: string;
  setNewUsername: (value: string) => void;
  newFullName: string;
  setNewFullName: (value: string) => void;
  newUniversity: string;
  setNewUniversity: (value: string) => void;
  newCareer: string;
  setNewCareer: (value: string) => void;
  creatingUser: boolean;
  handleCreateUser: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function CreateUserForm({
  newUserEmail,
  setNewUserEmail,
  newUsername,
  setNewUsername,
  newFullName,
  setNewFullName,
  newUniversity,
  setNewUniversity,
  newCareer,
  setNewCareer,
  creatingUser,
  handleCreateUser,
}: CreateUserFormProps) {
  return (
    <div style={sectionBoxStyle}>
      <h3 style={{ marginTop: 0 }}>Crear usuario</h3>

      <form onSubmit={handleCreateUser} style={{ display: "grid", gap: "14px" }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            style={inputStyle}
            placeholder="usuario@email.com"
          />
        </div>

        <div>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={inputStyle}
            placeholder="isaac01"
          />
        </div>

        <div>
          <label style={labelStyle}>Nombre completo</label>
          <input
            type="text"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
            style={inputStyle}
            placeholder="Isaac Gonzalez"
          />
        </div>

        <div>
          <label style={labelStyle}>Universidad</label>
          <input
            type="text"
            value={newUniversity}
            onChange={(e) => setNewUniversity(e.target.value)}
            style={inputStyle}
            placeholder="EPN"
          />
        </div>

        <div>
          <label style={labelStyle}>Carrera</label>
          <input
            type="text"
            value={newCareer}
            onChange={(e) => setNewCareer(e.target.value)}
            style={inputStyle}
            placeholder="Ingeniería en Ciencias de la Computación"
          />
        </div>

        <button
          type="submit"
          disabled={creatingUser}
          style={secondaryButtonStyle}
        >
          {creatingUser ? "Creando..." : "Crear usuario"}
        </button>
      </form>
    </div>
  );
}

const sectionBoxStyle: React.CSSProperties = {
  marginTop: "2rem",
  padding: "1rem",
  border: "1px solid #333",
  borderRadius: "10px",
  backgroundColor: "#161616",
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

const secondaryButtonStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#059669",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};