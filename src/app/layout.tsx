import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://lgtm.live"),
  title: "AI Agents vs. Copilots vs. Chatbots — LGTM",
  description:
    "A visual explainer on what actually differentiates AI agents, copilots, and chatbots — and which one your enterprise needs. By Saheb Singh.",
  openGraph: {
    title: "AI Agents vs. Copilots vs. Chatbots — LGTM",
    description:
      "The visual guide for technical leaders. No hype, no buzzwords — just clarity.",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents vs. Copilots vs. Chatbots — LGTM",
    description:
      "A visual explainer for technical leaders. No hype — just clarity.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          defer
          data-domain="lgtm.live"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
