import { fetchStudySessions, fetchSubjects, fetchUsers } from "../../services/api";
import SessionsTable from "../components/SessionsTable";
import PageHeader from "../components/PageHeader";
import ProtectedRoute from "../components/ProtectedRouste";

export default async function SessionsPage() {
  const [sessions, subjects, users] = await Promise.all([
    fetchStudySessions(),
    fetchSubjects(),
    fetchUsers(),
  ]);

  return (
    <ProtectedRoute>
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <PageHeader
        title="Sesiones de estudio"
        description="Listado general de sesiones registradas."
      />
      <section style={{ marginTop: "2rem" }}>
        <SessionsTable
          sessions={sessions}
          users={users}
          subjects={subjects}
          showUser={true}
          showSubject={true}
        />
      </section>
    </main>
   </ProtectedRoute> 
  );
}
