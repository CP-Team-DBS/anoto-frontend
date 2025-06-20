import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ConditionalFooter from "@/components/conditional-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anoto",
  description: "Anoto - Mental Health Detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicons/icon-144.png" />
        <link rel="apple-touch-icon" href="/favicons/icon-144.png" />
        <link rel="shortcut icon" href="/favicons/icon-144.png" />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
