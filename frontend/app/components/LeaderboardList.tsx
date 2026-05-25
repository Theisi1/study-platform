type LeaderboardUser = {
  id: number;
  username: string;
  full_name: string;
  xp_total: number;
  level: number;
};

type LeaderboardListProps = {
  leaderboard: LeaderboardUser[];
};

function getLeaderboardBadge(position: number) {
  if (position === 0) return "🥇";
  if (position === 1) return "🥈";
  if (position === 2) return "🥉";
  return `#${position + 1}`;
}

export default function LeaderboardList({
  leaderboard,
}: LeaderboardListProps) {
  if (leaderboard.length === 0) {
    return <p>No hay datos en el ranking.</p>;
  }

  return (
    <ol style={{ paddingLeft: "1.5rem" }}>
      {leaderboard.map((user, index) => (
        <li key={user.id} style={{ marginBottom: "1rem" }}>
          <strong>{getLeaderboardBadge(index)}</strong>{" "}
          <a href={`/users/${user.id}`}>{user.full_name}</a> (@{user.username}) — XP:{" "}
          {user.xp_total} — Nivel: {user.level}
        </li>
      ))}
    </ol>
  );
}