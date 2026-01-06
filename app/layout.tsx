import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

// IBM Plex Arabic - ideal for serious, academic Arabic reading
// Neutral, intellectual, modern, excellent RTL support
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Yunis Omar Fanous | د. يونس عمر فنوش",
  description: "Libyan Writer, Academic, and Public Intellectual | كاتب ومفكر ليبي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${ibmPlexArabic.variable} antialiased`}
        style={{ fontFamily: 'var(--font-arabic), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
