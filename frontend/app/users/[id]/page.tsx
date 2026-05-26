import { fetchStudySessions, fetchSubjects, fetchUsers } from "../../../services/api";
import SessionsTable from "../../components/SessionsTable";
import PageHeader from "@/app/components/PageHeader";
import ProtectedRoute from "@/app/components/ProtectedRoute";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const userId = Number(id);

  const [users, subjects, sessions] = await Promise.all([
    fetchUsers(),
    fetchSubjects(),
    fetchStudySessions(),
  ]);

  const user = users.find((u: any) => u.id === userId);
  const userSubjects = subjects.filter((subject: any) => subject.user_id === userId);
  const userSessions = sessions.filter((session: any) => session.user_id === userId);


  if (!user) {
    return (
      <ProtectedRoute>
      <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Usuario no encontrado</h1>
      </main>
    </ProtectedRoute>  
    );
  }

  return (
    <ProtectedRoute>
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <PageHeader
        title={user.full_name}
        description={`@${user.username}`}
      />

      <section style={{ marginTop: "2rem" }}>
        <h2>Información general</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Universidad:</strong> {user.university}</p>
        <p><strong>Carrera:</strong> {user.career}</p>
        <p><strong>XP total:</strong> {user.xp_total}</p>
        <p><strong>Nivel:</strong> {user.level}</p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Materias</h2>
        {userSubjects.length === 0 ? (
          <p>No tiene materias registradas.</p>
        ) : (
          <ul>
            {userSubjects.map((subject: any) => (
              <li key={subject.id}>{subject.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Sesiones de estudio</h2>
        {userSessions.length === 0 ? (
          <p>No tiene sesiones registradas.</p>
        ) : (
          <SessionsTable
            sessions={userSessions}
            subjects={subjects}
            showUser={false}
            showSubject={true}
          />
        )}
      </section>
    </main>
  </ProtectedRoute>  
  );
}

