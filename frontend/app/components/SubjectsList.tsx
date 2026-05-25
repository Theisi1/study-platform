type SubjectItem = {
  id: number;
  name: string;
  user_id: number;
};

type UserItem = {
  id: number;
  full_name: string;
};

type SubjectsListProps = {
  subjects: SubjectItem[];
  users?: UserItem[];
  showOwner?: boolean;
};

export default function SubjectsList({
  subjects,
  users = [],
  showOwner = true,
}: SubjectsListProps) {
  function getUserName(userId: number) {
    const user = users.find((u) => u.id === userId);
    return user ? user.full_name : "Usuario desconocido";
  }

  if (subjects.length === 0) {
    return <p>No hay materias registradas.</p>;
  }

  return (
    <ul>
      {subjects.map((subject) => (
        <li key={subject.id} style={{ marginBottom: "1rem" }}>
          <strong>
            <a href={`/subjects/${subject.id}`}>{subject.name}</a>
          </strong>
          <br />
          {showOwner && <>Usuario: {getUserName(subject.user_id)}</>}
        </li>
      ))}
    </ul>
  );
}