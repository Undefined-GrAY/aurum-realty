import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aurum Realty | Where Luxury Finds Its Address",
  description: "Exclusive properties in New York, Miami, and Los Angeles. Curated for those who expect the exceptional. Experience architectural mastery in every detail.",
  keywords: ["Luxury Real Estate", "New York Penthouse", "Miami Villa", "Los Angeles Estate", "Aurum Realty"],
  authors: [{ name: "Aurum Realty" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${workSans.variable} h-full antialiased dark`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0D0D0D] text-[#F5F0E8]">{children}</body>
    </html>
  );
}

