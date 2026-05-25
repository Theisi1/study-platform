type SessionRow = {
  id: number;
  user_id: number;
  subject_id: number;
  duration_minutes: number;
  study_method: string;
  xp_earned: number;
  created_at: string;
};

type UserRow = {
  id: number;
  full_name: string;
};

type SubjectRow = {
  id: number;
  name: string;
};

type SessionsTableProps = {
  sessions: SessionRow[];
  users?: UserRow[];
  subjects?: SubjectRow[];
  showUser?: boolean;
  showSubject?: boolean;
};

export default function SessionsTable({
  sessions,
  users = [],
  subjects = [],
  showUser = true,
  showSubject = true,
}: SessionsTableProps) {
  function getUserName(userId: number) {
    const user = users.find((u) => u.id === userId);
    return user ? user.full_name : "Usuario desconocido";
  }

  function getSubjectName(subjectId: number) {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject ? subject.name : "Materia desconocida";
  }

  if (sessions.length === 0) {
    return <p>No hay sesiones registradas.</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {showUser && <th style={thStyle}>Usuario</th>}
            {showSubject && <th style={thStyle}>Materia</th>}
            <th style={thStyle}>Minutos</th>
            <th style={thStyle}>Método</th>
            <th style={thStyle}>XP</th>
            <th style={thStyle}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              {showUser && <td style={tdStyle}>{getUserName(session.user_id)}</td>}
              {showSubject && <td style={tdStyle}>{getSubjectName(session.subject_id)}</td>}
              <td style={tdStyle}>{session.duration_minutes}</td>
              <td style={tdStyle}>{session.study_method}</td>
              <td style={tdStyle}>{session.xp_earned}</td>
              <td style={tdStyle}>
                {new Date(session.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "1rem",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #444",
};

const tdStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid #333",
};