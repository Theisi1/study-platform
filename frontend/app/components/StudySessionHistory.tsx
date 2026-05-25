import { Subject } from "../../types/subject";
import { StudySession } from "../../types/study-session";
import SessionsTable from "./SessionsTable";

type StudySessionHistoryProps = {
  userSessions: StudySession[];
  subjects: Subject[];
};

export default function StudySessionHistory({
  userSessions,
  subjects,
}: StudySessionHistoryProps) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Historial de sesiones del usuario</h3>

      {userSessions.length === 0 ? (
        <p>No hay sesiones registradas para este usuario.</p>
      ) : (
        <SessionsTable
          sessions={userSessions}
          subjects={subjects}
          showUser={false}
          showSubject={true}
        />
      )}
    </div>
  );
}