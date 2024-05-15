import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swiss Army Legends",
  description: "Willkommen bei Swiss Army Legends, deiner ultimativen Quelle für Schweizer Militärgeschichten, Blogbeiträge und mehr. Tauche ein in die faszinierende Welt des Schweizer Militärdienstes, während du auf unserer Plattform bloggen, Fragen stellen und beantworten kannst. Entdecke persönliche Erfahrungen, historische Einblicke und aktuelle Informationen rund um das Schweizer Militär. Werde Teil unserer Community und teile deine eigenen Geschichten und Fragen über den legendären Schweizer Militärdienst",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
