import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Defarhan Nugraha Fadhali | Portfolio",
  description: "Computer Science Graduate passionate in Web Development, Data Analytics, and Android Development. Portfolio with Spatial UI and Glassmorphism design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
