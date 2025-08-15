"use client";
import React, { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [domain, setDomain] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const router = useRouter();

  function normalize(input: string): string {
    let d: string = input.trim();
    if (!d) return "";
    if (!/^https?:\/\//i.test(d)) d = "https://" + d;
    try {
      const { hostname } = new URL(d);
      return hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const host: string = normalize(domain);
    if (!host) {
      setErr("Bitte eine gültige Webadresse eingeben (z. B. example.com).");
      return;
    }
    setErr("");
    router.push(`/fragebogen?domain=${encodeURIComponent(host)}`);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setDomain(e.target.value);
  }

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "2rem",
        gap: "1rem",
        background: "black",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
        Mache unsichtbaren KI‑Traffic sichtbar
      </h1>

      <p style={{ maxWidth: "600px", lineHeight: "1.4", marginBottom: "1rem", color: "#ccc" }}>
        CrawlerAI erkennt, wie, wann und wo KI‑Systeme wie ChatGPT, Perplexity oder Claude
        deine Inhalte nutzen – und zeigt dir, wie du diesen Traffic zurückholst oder
        monetarisierst.
      </p>

      <ul style={{ listStyle: "none", padding: 0, marginBottom: "1rem", color: "#aaa" }}>
        <li>✅ Finde heraus, ob KI‑Tools deine Inhalte verwenden</li>
        <li>✅ Sieh, wie gut deine Seite auf KI‑Traffic vorbereitet ist</li>
        <li>✅ Erhalte einen individuellen KI‑Score und konkrete Handlungsempfehlungen</li>
      </ul>

      <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
        Teste jetzt deine Website – kostenlos & ohne Anmeldung
      </h3>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          type="text"
          placeholder="z. B. example.com"
          value={domain}
          onChange={handleChange}
          style={{
            padding: "0.6rem 0.8rem",
            minWidth: "260px",
            border: "1px solid #333",
            borderRadius: "8px",
            background: "#111",
            color: "white",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#1a1a1a",
            color: "white",
            cursor: "pointer",
          }}
        >
          Analysieren
        </button>
      </form>

      {err && <div style={{ color: "#ff6b6b", fontSize: ".95rem" }}>{err}</div>}
    </main>
  );
}