import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: {
    default: "PUZEXA — Free Browser Brain & Puzzle Games",
    template: "%s | PUZEXA",
  },

  description:
    "Play free original browser games on PUZEXA. Challenge your memory, logic, math, words, reaction speed and more — no download required.",

  keywords: [
    "browser games",
    "brain games",
    "puzzle games",
    "logic games",
    "memory games",
    "reaction games",
    "math games",
    "word games",
    "free online games",
  ],

  applicationName: "PUZEXA",

  authors: [
    {
      name: "PUZEXA",
    },
  ],

  creator: "PUZEXA",
  publisher: "PUZEXA",

  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: "/",
  },

  openGraph: {
    url: "/",
    type: "website",
    siteName: "PUZEXA",
    title: "PUZEXA — Free Browser Brain & Puzzle Games",
    description:
      "Play quick original browser games and challenge your memory, logic, math, words and reaction speed.",
  },

  twitter: {
    card: "summary_large_image",
    title: "PUZEXA — Free Browser Brain & Puzzle Games",
    description:
      "Play quick original browser games and beat your best score.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
