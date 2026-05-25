type UserStatsProps = {
  xpTotal: number;
  level: number;
  rank: string;
  rankColor: string;
  streak: number;
  totalSessions: number;
  totalHours: string;
  progressXP: number;
  neededXP: number;
  progressPercent: number;
};

export default function UserStats({
  xpTotal,
  level,
  rank,
  rankColor,
  streak,
  totalSessions,
  totalHours,
  progressXP,
  neededXP,
  progressPercent,
}: UserStatsProps) {
  return (
    <>
      <div style={statsGridStyle}>
        <div style={cardStyle}>
          <p style={cardLabelStyle}>XP total</p>
          <h3 style={cardValueStyle}>{xpTotal}</h3>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Nivel</p>
          <h3 style={cardValueStyle}>{level}</h3>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Rango</p>
          <h3 style={{ ...cardValueStyle, color: rankColor }}>{rank}</h3>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Racha</p>
          <h3 style={cardValueStyle}>{streak} día(s)</h3>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Sesiones</p>
          <h3 style={cardValueStyle}>{totalSessions}</h3>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Horas estudiadas</p>
          <h3 style={cardValueStyle}>{totalHours}</h3>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <p style={{ marginBottom: "8px", fontWeight: 600 }}>
          Progreso al siguiente nivel
        </p>
        <div style={progressBarContainerStyle}>
          <div
            style={{
              ...progressBarFillStyle,
              width: `${progressPercent}%`,
            }}
          />
        </div>
        <p style={{ marginTop: "8px", color: "#ccc" }}>
          {progressXP} / {neededXP} XP para subir al siguiente nivel
        </p>
      </div>
    </>
  );
}

const statsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "12px",
  marginTop: "1rem",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "1rem",
};

const cardLabelStyle: React.CSSProperties = {
  margin: 0,
  color: "#bbb",
  fontSize: "0.9rem",
};

const cardValueStyle: React.CSSProperties = {
  margin: "8px 0 0 0",
  fontSize: "1.6rem",
};

const progressBarContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "14px",
  backgroundColor: "#222",
  borderRadius: "999px",
  overflow: "hidden",
};

const progressBarFillStyle: React.CSSProperties = {
  height: "100%",
  backgroundColor: "#2563eb",
  transition: "width 0.3s ease",
};