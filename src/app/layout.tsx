import "./globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "My NextAuth App",
  description: "Projeto Next.js + Tailwind + NextAuth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
