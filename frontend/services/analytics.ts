import { getToken } from "./auth";

const API_BASE_URL = "http://localhost:8000/api";

export async function fetchMyAnalytics() {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}/analytics/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error fetching analytics");
  }

  return res.json();
}