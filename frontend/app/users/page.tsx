import { fetchUsers } from "../../services/api";
import UsersList from "../components/UsersList";
import PageHeader from "../components/PageHeader";
import ProtectedRoute from "../components/ProtectedRouste";

export default async function UsersPage() {
  const users = await fetchUsers();

  return (
    <ProtectedRoute>
      <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <PageHeader
          title="Usuarios"
          description="Listado general de usuarios registrados."
        />
        <section style={{ marginTop: "2rem" }}>
        <UsersList users={users} />
        </section>
      </main>
    </ProtectedRoute> 
  );
}