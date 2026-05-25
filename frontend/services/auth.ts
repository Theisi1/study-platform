const API_BASE_URL = "http://localhost:8000/api";

export async function registerUser(payload: {
  email: string;
  username: string;
  full_name: string;
  university: string;
  career: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error registering user");
  }

  return res.json();
}

export async function loginUser(payload: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error logging in");
  }

  return res.json();
}

export async function fetchMe(token: string) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error fetching current user");
  }

  return res.json();
}

export function saveToken(token: string) {
  localStorage.setItem("access_token", token);
}

export function getToken() {
  return localStorage.getItem("access_token");
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export async function fetchCurrentUserFromToken() {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    return await fetchMe(token);
  } catch (error) {
    console.error(error);
    removeToken();
    return null;
  }
}