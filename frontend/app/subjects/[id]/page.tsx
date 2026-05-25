import { fetchStudySessions, fetchSubjects, fetchUsers } from "../../../services/api";
import SessionsTable from "../../components/SessionsTable";
import PageHeader from "@/app/components/PageHeader";
import ProtectedRoute from "@/app/components/ProtectedRouste";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SubjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const subjectId = Number(id);

  const [subjects, users, sessions] = await Promise.all([
    fetchSubjects(),
    fetchUsers(),
    fetchStudySessions(),
  ]);

  const subject = subjects.find((s: any) => s.id === subjectId);

  if (!subject) {
    return (
      <ProtectedRoute>
      <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Materia no encontrada</h1>
      </main>
    </ProtectedRoute>  
    );
  }

  const owner = users.find((u: any) => u.id === subject.user_id);
  const subjectSessions = sessions.filter((session: any) => session.subject_id === subjectId);

  return (
    <ProtectedRoute>
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <PageHeader title={subject.name} />

      <section style={{ marginTop: "2rem" }}>
        <h2>Información general</h2>
        <p>
          <strong>Usuario:</strong>{" "}
          {owner ? (
            <a href={`/users/${owner.id}`}>{owner.full_name}</a>
          ) : (
            "Usuario desconocido"
          )}
        </p>
        <p><strong>ID de materia:</strong> {subject.id}</p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Sesiones de esta materia</h2>

        {subjectSessions.length === 0 ? (
          <p>No hay sesiones registradas para esta materia.</p>
        ) : (
          <SessionsTable
            sessions={subjectSessions}
            users={owner ? [{ id: owner.id, full_name: owner.full_name }] : []}
            showUser={true}
            showSubject={false}
          />
        )}
      </section>
    </main>
    </ProtectedRoute> 
  );
}
