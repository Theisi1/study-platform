"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchMyAnalytics } from "@/services/analytics";

import {
  createStudySession,
  createSubject,
  createUser,
  fetchStudySessions,
  fetchSubjects,
  fetchUsers,
} from "../services/api";

import { fetchCurrentUserFromToken } from "@/services/auth";

import { User } from "../types/user";
import { Subject } from "../types/subject";
import { StudySession } from "../types/study-session";
import {
  calculateStreak,
  getRankColor,
  getRankFromXP,
} from "../utils/gamification";

export function useStudyDashboard() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<number>(1);
  const [subjectId, setSubjectId] = useState<number>(1);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [studyMethod, setStudyMethod] = useState<string>("Pomodoro");

  const [analytics, setAnalytics] = useState<any>(null);

  const [newSubjectName, setNewSubjectName] = useState<string>("");

  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newUniversity, setNewUniversity] = useState("");
  const [newCareer, setNewCareer] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [creatingSubject, setCreatingSubject] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [message, setMessage] = useState("");

  async function loadData() {
    try {
      setLoading(true);

      const [usersData, subjectsData, sessionsData, me, analyticsData] =
        await Promise.all([
          fetchUsers(),
          fetchSubjects(),
          fetchStudySessions(),
          fetchCurrentUserFromToken(),
          fetchMyAnalytics(),
        ]);

      setUsers(usersData);
      setSubjects(subjectsData);
      setStudySessions(sessionsData);
      setCurrentUser(me);
      setAnalytics(analyticsData);

      if (me?.id) {
        setUserId(me.id);
      } else if (
        usersData.length > 0 &&
        !usersData.some((u: User) => u.id === userId)
      ) {
        setUserId(usersData[0].id);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error cargando usuarios, materias o sesiones");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const selectedUser = useMemo(() => {
    const activeUserId = currentUser?.id ?? userId;
    return users.find((u) => u.id === activeUserId) || null;
  }, [users, currentUser, userId]);

  const filteredSubjects = useMemo(() => {
    const activeUserId = currentUser?.id ?? userId;
    return subjects.filter((subject) => subject.user_id === activeUserId);
  }, [subjects, currentUser, userId]);

  useEffect(() => {
    if (filteredSubjects.length > 0) {
      const exists = filteredSubjects.some(
        (subject) => subject.id === subjectId,
      );
      if (!exists) {
        setSubjectId(filteredSubjects[0].id);
      }
    }
  }, [filteredSubjects, subjectId]);

  const userSessions = useMemo(() => {
    const activeUserId = currentUser?.id ?? userId;

    return studySessions
      .filter((session) => session.user_id === activeUserId)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  }, [studySessions, userId]);

  const totalSessions = analytics?.total_sessions ?? userSessions.length;
  const totalHours = analytics?.total_hours ?? 0;
  const xpTotal = analytics?.xp_total ?? selectedUser?.xp_total ?? 0;
  const level = analytics?.level ?? selectedUser?.level ?? 1;
  const streak = analytics?.streak_days ?? calculateStreak(userSessions);

  const rank = getRankFromXP(xpTotal);
  const rankColor = getRankColor(rank);

  const currentLevelBaseXP = (level - 1) * 100;
  const nextLevelXP = level * 100;
  const progressXP = xpTotal - currentLevelBaseXP;
  const neededXP = nextLevelXP - currentLevelBaseXP;
  const progressPercent =
    neededXP > 0 ? Math.min((progressXP / neededXP) * 100, 100) : 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");

      await createStudySession({
        subject_id: subjectId,
        duration_minutes: durationMinutes,
        study_method: studyMethod,
      });

      setMessage("Sesión registrada correctamente");
      await loadData();
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("Error al registrar la sesión");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreateSubject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newSubjectName.trim()) {
      setMessage("Escribe un nombre para la materia");
      return;
    }

    try {
      setCreatingSubject(true);
      setMessage("");

      const createdSubject = await createSubject({
        name: newSubjectName.trim(),
      });

      setNewSubjectName("");
      setMessage("Materia creada correctamente");

      await loadData();
      router.refresh();

      if (createdSubject?.id) {
        setSubjectId(createdSubject.id);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error al crear la materia");
    } finally {
      setCreatingSubject(false);
    }
  }

  async function handleCreateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !newUserEmail.trim() ||
      !newUsername.trim() ||
      !newFullName.trim() ||
      !newUniversity.trim() ||
      !newCareer.trim()
    ) {
      setMessage("Completa todos los campos del usuario");
      return;
    }

    try {
      setCreatingUser(true);
      setMessage("");

      const createdUser = await createUser({
        email: newUserEmail.trim(),
        username: newUsername.trim(),
        full_name: newFullName.trim(),
        university: newUniversity.trim(),
        career: newCareer.trim(),
      });

      setNewUserEmail("");
      setNewUsername("");
      setNewFullName("");
      setNewUniversity("");
      setNewCareer("");
      setMessage("Usuario creado correctamente");

      await loadData();
      router.refresh();

      if (createdUser?.id) {
        setUserId(createdUser.id);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error al crear el usuario");
    } finally {
      setCreatingUser(false);
    }
  }

  return {
    users,
    subjects,
    studySessions,
    currentUser,
    userId,
    setUserId,
    subjectId,
    setSubjectId,
    durationMinutes,
    setDurationMinutes,
    studyMethod,
    setStudyMethod,
    newSubjectName,
    setNewSubjectName,
    newUserEmail,
    setNewUserEmail,
    newUsername,
    setNewUsername,
    newFullName,
    setNewFullName,
    newUniversity,
    setNewUniversity,
    newCareer,
    setNewCareer,
    loading,
    submitting,
    creatingSubject,
    creatingUser,
    message,
    filteredSubjects,
    userSessions,
    totalHours,
    totalSessions,
    xpTotal,
    level,
    rank,
    streak,
    rankColor,
    progressXP,
    neededXP,
    progressPercent,
    handleSubmit,
    handleCreateSubject,
    handleCreateUser,
    analytics,
  };
}
