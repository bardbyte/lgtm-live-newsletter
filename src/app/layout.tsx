import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteGraphJsonLd, JsonLdScript } from "@/lib/jsonld";
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
  title: {
    default: "LGTM — The AI briefing your team won't give you",
    template: "%s — LGTM",
  },
  description:
    "Biweekly deep dives on AI architecture decisions for technical leaders who ship. No hype, no buzzwords. By Saheb Singh.",
  alternates: {
    canonical: "https://lgtm.live",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "LGTM RSS Feed" }],
    },
  },
  openGraph: {
    title: "LGTM — The AI briefing your team won't give you",
    description:
      "Biweekly deep dives on AI architecture decisions for technical leaders who ship.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LGTM — The AI briefing your team won't give you",
    description:
      "Biweekly deep dives on AI architecture decisions for technical leaders who ship.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
        <script
          defer
          data-domain="lgtm.live"
          src="https://plausible.io/js/script.tagged-events.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <JsonLdScript data={siteGraphJsonLd()} />
        {children}
      </body>
    </html>
  );
}
