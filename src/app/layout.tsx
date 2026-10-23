import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juliana's 23 | The Celebration",

  description:
    "Você está convidado para celebrar o meu dia! Acesse o convite e confira a data, o local e todos os detalhes da comemoração.",

  openGraph: {
    title: "Juliana's 23 | The Celebration",
    description:
      "Você está convidado para celebrar o meu dia! Acesse o convite e confira a data, o local e todos os detalhes da comemoração.",
    siteName: "Juliana's 23 | The Celebration",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen w-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}