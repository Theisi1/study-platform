export function getRankFromXP(xp: number) {
  if (xp >= 500) return "Diamond";
  if (xp >= 300) return "Platinum";
  if (xp >= 200) return "Gold";
  if (xp >= 100) return "Silver";
  return "Bronze";
}

export function getRankColor(rank: string) {
  if (rank === "Diamond") return "#38bdf8";
  if (rank === "Platinum") return "#a78bfa";
  if (rank === "Gold") return "#facc15";
  if (rank === "Silver") return "#cbd5e1";
  return "#b45309";
}

export function calculateStreak(sessions: { created_at: string }[]) {
  if (sessions.length === 0) return 0;

  const uniqueDates = Array.from(
    new Set(
      sessions.map((session) => {
        const date = new Date(session.created_at);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      })
    )
  )
    .map((dateStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month, day).getTime();
    })
    .sort((a, b) => b - a);

  let streak = 1;

  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = uniqueDates[i];
    const next = uniqueDates[i + 1];
    const diffDays = (current - next) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}