import type { Metadata } from "next";
import "../globals.css";
import QueryProvider from "../Provider/UseQuery";
import MainLayout from "../Layout/RootLayout"

export const metadata: Metadata = {
  title: "Bina.az Clone",
  description: "Daşınmaz əmlak saytı",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body className="antialiased font-sans">
        <QueryProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </QueryProvider>
      </body>
    </html>
  );
}