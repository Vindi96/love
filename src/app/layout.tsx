import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Noto_Serif_Sinhala, Playfair_Display } from "next/font/google";
import { names } from "./content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
});

const sinhala = Noto_Serif_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala", "latin"],
});

export const metadata: Metadata = {
  title: `Happy Birthday, ${names.him}! ❤️`,
  description: "A special birthday mission. 5 levels stand between you and your surprise.",
};

export const viewport: Viewport = {
  themeColor: "#e8436b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${display.variable} ${hand.variable} ${sinhala.variable}`}>
      <body>{children}</body>
    </html>
  );
}
