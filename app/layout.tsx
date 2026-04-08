import type { Metadata } from "next";
import "./globals.css";
import { Mona_Sans, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Interview Assistant - Full Stack App",
  description:
    "Interview Taking AI voice assistent. Helps colleges students to practice interview questions anywhere and anytime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${monaSans.className} antialiased`}>{children}</body>
    </html>
  );
}
