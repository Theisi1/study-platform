import { getToken } from "./auth";

const API_BASE_URL = "http://localhost:8000/api";

export async function fetchUsers() {
  const res = await fetch(`${API_BASE_URL}/users/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error fetching users");
  }

  return res.json();
}

export async function fetchSubjects() {
  const res = await fetch(`${API_BASE_URL}/subjects/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error fetching subjects");
  }

  return res.json();
}

export async function fetchLeaderboard() {
  const res = await fetch(`${API_BASE_URL}/leaderboard/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error fetching leaderboard");
  }

  return res.json();
}

export async function fetchStudySessions() {
  const res = await fetch(`${API_BASE_URL}/study-sessions/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error fetching study sessions");
  }

  return res.json();
}

export async function createStudySession(payload: {
  subject_id: number;
  duration_minutes: number;
  study_method: string;
}) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}/study-sessions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error creating study session");
  }

  return res.json();
}

export async function createSubject(payload: {
  name: string;
}) {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}/subjects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error creating subject");
  }

  return res.json();
}

export async function createUser(payload: {
  email: string;
  username: string;
  full_name: string;
  university: string;
  career: string;
}) {
  const res = await fetch(`${API_BASE_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error creating user");
  }

  return res.json();
}