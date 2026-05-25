type CreateSubjectFormProps = {
  currentUserName: string;
  newSubjectName: string;
  setNewSubjectName: React.Dispatch<React.SetStateAction<string>>;
  creatingSubject: boolean;
  handleCreateSubject: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function CreateSubjectForm({
  currentUserName,
  newSubjectName,
  setNewSubjectName,
  creatingSubject,
  handleCreateSubject,
}: CreateSubjectFormProps) {
  return (
    <div style={sectionBoxStyle}>
      <h3 style={{ marginTop: 0 }}>Crear materia</h3>

      <form onSubmit={handleCreateSubject} style={{ display: "grid", gap: "14px" }}>
        <div>
          <label style={labelStyle}>Usuario autenticado</label>
          <input
            type="text"
            value={currentUserName}
            disabled
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Nombre de la materia</label>
          <input
            type="text"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            style={inputStyle}
            placeholder="Ejemplo: Física, Redes, Programación"
          />
        </div>

        <button
          type="submit"
          disabled={creatingSubject}
          style={secondaryButtonStyle}
        >
          {creatingSubject ? "Creando..." : "Crear materia"}
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