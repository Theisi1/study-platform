import { fetchSubjects, fetchUsers } from "../../services/api";
import SubjectsList from "../components/SubjectsList";
import PageHeader from "../components/PageHeader";
import ProtectedRoute from "../components/ProtectedRoute";

export default async function SubjectsPage() {
  const subjects = await fetchSubjects();
  const users = await fetchUsers();

  return (
    <ProtectedRoute>
      <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <PageHeader
          title="Materias"
          description="Listado de materias registradas en la plataforma."
        />
        <section style={{ marginTop: "2rem" }}>
          <SubjectsList subjects={subjects} users={users} showOwner={true} />
        </section>
      </main>
    </ProtectedRoute>  
  );
}
