import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Care Legal Advocates | Strategic Litigation & Advisory Chambers",
  description:
    "Care Legal Advocates delivers litigation, corporate governance, and private client counsel for high-stakes matters across India.",
  keywords: [
    "Care Legal",
    "law firm",
    "litigation",
    "corporate advisory",
    "legal counsel",
    "advocates",
  ],
  openGraph: {
    title: "Care Legal Advocates",
    description:
      "Boutique litigation-first chambers representing founders, families, and enterprises across India.",
    url: "https://carelegal.in",
    siteName: "Care Legal Advocates",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <div className="relative flex w-full items-center justify-center">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
