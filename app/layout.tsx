// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CrawlerAI",
  description: "Domain KI-Score Analyse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        style={{
          minHeight: "100svh",
          background: "#000",
          color: "#fff",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}