import { fetchLeaderboard } from "../../services/api";
import LeaderboardList from "../components/LeaderboardList";
import PageHeader from "../components/PageHeader";

export default async function LeaderboardPage() {
  const leaderboard = await fetchLeaderboard();

  return (
        <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <PageHeader
        title="Leaderboard Global"
        description="Ranking general de estudiantes por XP."
      />
      <section style={{ marginTop: "2rem" }}>
       <LeaderboardList leaderboard={leaderboard} />
      </section>
    </main>
  );
}