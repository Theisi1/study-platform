import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Study Platform",
  description: "Gamified study platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          backgroundColor: "#0b0b0b",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}