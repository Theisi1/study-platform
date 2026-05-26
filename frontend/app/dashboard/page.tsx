import { fetchUsers, fetchLeaderboard } from "../../services/api";
import StudySessionForm from "../components/StudySessionForm";
import LeaderboardList from "../components/LeaderboardList";
import ProtectedRoute from "../components/ProtectedRoute";


export default async function HomePage() {
  const users = await fetchUsers();
  const leaderboard = await fetchLeaderboard();

  return (
    <ProtectedRoute>
      <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Study Platform Dashboard</h1>

      <p style={{ marginTop: "0.5rem" }}>
        <a href="/leaderboard">Ir al leaderboard completo</a>
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2>Usuarios</h2>
        {users.length === 0 ? (
          <p>No hay usuarios todavía.</p>
        ) : (
          <ul>
            {users.map((user: any) => (
              <li key={user.id}>
                {user.full_name} ({user.username}) - XP: {user.xp_total} - Nivel: {user.level}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Leaderboard</h2>
        <LeaderboardList leaderboard={leaderboard} />
      </section>
      <StudySessionForm />
    </main>
    </ProtectedRoute>
  );      
}