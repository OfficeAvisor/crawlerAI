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
          display: "flex",
          flexDirection: "column",
          minHeight: "100svh",
          background: "#000",
          color: "#fff",
          margin: 0,
        }}
      >
        <main style={{ flex: 1 }}>{children}</main>
        <footer
          style={{
            backgroundColor: "#000",
            color: "#fff",
            textAlign: "center",
            padding: "1rem 0",
          }}
        >
          <a
            href="/datenschutz"
            style={{ color: "#fff", textDecoration: "underline", marginRight: "1rem" }}
          >
            Datenschutz
          </a>
          <a
            href="/impressum"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            Impressum
          </a>
        </footer>
      </body>
    </html>
  );
}