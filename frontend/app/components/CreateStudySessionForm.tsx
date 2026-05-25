import { Subject } from "../../types/subject";

type CreateStudySessionFormProps = {
  currentUserName: string;
  filteredSubjects: Subject[];
  subjectId: number;
  setSubjectId: React.Dispatch<React.SetStateAction<number>>;
  durationMinutes: number;
  setDurationMinutes: React.Dispatch<React.SetStateAction<number>>;
  studyMethod: string;
  setStudyMethod: React.Dispatch<React.SetStateAction<string>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  message: string;
};

export default function CreateStudySessionForm({
  currentUserName,
  filteredSubjects,
  subjectId,
  setSubjectId,
  durationMinutes,
  setDurationMinutes,
  studyMethod,
  setStudyMethod,
  submitting,
  handleSubmit,
  message,
}: CreateStudySessionFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: "14px", marginTop: "2rem" }}
    >
      <h3 style={{ marginBottom: 0 }}>Registrar sesión de estudio</h3>

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
        <label style={labelStyle}>Materia</label>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(Number(e.target.value))}
          style={inputStyle}
          disabled={filteredSubjects.length === 0}
        >
          {filteredSubjects.length === 0 ? (
            <option value="">No hay materias para este usuario</option>
          ) : (
            filteredSubjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Duración (minutos)</label>
        <input
          type="number"
          min={1}
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(Number(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Método de estudio</label>
        <input
          type="text"
          value={studyMethod}
          onChange={(e) => setStudyMethod(e.target.value)}
          style={inputStyle}
          placeholder="Pomodoro, lectura, ejercicios..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting || filteredSubjects.length === 0}
        style={buttonStyle}
      >
        {submitting ? "Registrando..." : "Registrar estudio"}
      </button>

      {message && <p style={{ margin: 0 }}>{message}</p>}
    </form>
  );
}

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