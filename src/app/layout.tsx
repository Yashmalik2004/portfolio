import type { Metadata, Viewport } from "next";
import "./globals.css";
import Shell from "@/components/Shell";
import { profile } from "@/data/portfolio";

const title = `${profile.name} — Agentic AI & Machine Learning Engineer`;
const description = "Portfolio of Yash Malik: multi-agent AI systems, machine learning and backend engineering. NIT Hamirpur Hackathon 2025 winner.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};
export const viewport: Viewport = { themeColor: "#08060f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
