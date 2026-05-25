"use client";

import UserStats from "./UserStats";
import CreateUserForm from "./CreateUserForm";
import CreateSubjectForm from "./CreateSubjectForm";
import StudySessionHistory from "./StudySessionHistory";
import CreateStudySessionForm from "./CreateStudySessionForm";
import { useStudyDashboard } from "../../hooks/useStudyDashboard";

export default function StudySessionForm() {
  const {
    users,
    currentUser,
    subjects,
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
  } = useStudyDashboard();

  if (loading) {
    return <p>Cargando formulario...</p>;
  }

  return (
    <section style={containerStyle}>
      <h2 style={{ marginTop: 0 }}>Panel de estudio del usuario</h2>

      <UserStats
        xpTotal={xpTotal}
        level={level}
        rank={rank}
        rankColor={rankColor}
        streak={streak}
        totalSessions={totalSessions}
        totalHours={String(totalHours)}
        progressXP={progressXP}
        neededXP={neededXP}
        progressPercent={progressPercent}
      />

      {!currentUser && (
        <CreateUserForm
          newUserEmail={newUserEmail}
          setNewUserEmail={setNewUserEmail}
          newUsername={newUsername}
          setNewUsername={setNewUsername}
          newFullName={newFullName}
          setNewFullName={setNewFullName}
          newUniversity={newUniversity}
          setNewUniversity={setNewUniversity}
          newCareer={newCareer}
          setNewCareer={setNewCareer}
          creatingUser={creatingUser}
          handleCreateUser={handleCreateUser}
        />
      )}

      <CreateSubjectForm
        currentUserName={currentUser?.full_name ?? "No autenticado"}
        newSubjectName={newSubjectName}
        setNewSubjectName={setNewSubjectName}
        creatingSubject={creatingSubject}
        handleCreateSubject={handleCreateSubject}
      />

      <CreateStudySessionForm
        currentUserName={currentUser?.full_name ?? "No autenticado"}
        filteredSubjects={filteredSubjects}
        subjectId={subjectId}
        setSubjectId={setSubjectId}
        durationMinutes={durationMinutes}
        setDurationMinutes={setDurationMinutes}
        studyMethod={studyMethod}
        setStudyMethod={setStudyMethod}
        submitting={submitting}
        handleSubmit={handleSubmit}
        message={message}
      />

      <StudySessionHistory userSessions={userSessions} subjects={subjects} />
    </section>
  );
}

const containerStyle: React.CSSProperties = {
  marginTop: "2rem",
  padding: "1.5rem",
  border: "1px solid #333",
  borderRadius: "12px",
  backgroundColor: "#111",
  color: "#fff",
};
