type UserItem = {
  id: number;
  full_name: string;
  username: string;
  email?: string;
  university?: string;
  career?: string;
  xp_total?: number;
  level?: number;
};

type UsersListProps = {
  users: UserItem[];
};

export default function UsersList({ users }: UsersListProps) {
  if (users.length === 0) {
    return <p>No hay usuarios todavía.</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} style={{ marginBottom: "1rem" }}>
          <strong>
            <a href={`/users/${user.id}`}>{user.full_name}</a>
          </strong>{" "}
          (@{user.username}) <br />
          Email: {user.email} <br />
          Universidad: {user.university} <br />
          Carrera: {user.career} <br />
          XP: {user.xp_total} — Nivel: {user.level}
        </li>
      ))}
    </ul>
  );
}