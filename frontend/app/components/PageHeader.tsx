type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header style={{ marginBottom: "2rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>{title}</h1>
      {description && <p style={{ margin: 0 }}>{description}</p>}
    </header>
  );
}