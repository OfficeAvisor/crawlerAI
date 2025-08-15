// @ts-nocheck
'use client';
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


function ErgebnisWrapper() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "";
  const answers = searchParams.get("answers") || "{}";

  const [score, setScore] = useState(null);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!domain) {
      setError("Domain fehlt.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain, answers }),
          cache: "no-store",
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

        setScore(data.score ?? null);
        setNotes(Array.isArray(data.notes) ? data.notes : []);
      } catch (err) {
        setError(String(err.message || err));
      } finally {
        setLoading(false);
      }
    })();
  }, [domain, answers]);

  return (
    <main
      style={{
        minHeight: "100svh",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 800 }}>
        <h1>Analyse-Ergebnis für {domain}</h1>

        {loading && <p>Analyse läuft… bitte warten</p>}

        {!loading && error && (
          <>
            <p style={{ color: "#ff5555" }}>Fehler: {error}</p>
            <div style={{ marginTop: "1rem" }}>
              <a href="/" style={{ color: "#ffcc00" }}>Neue Analyse starten</a>
            </div>
          </>
        )}

        {!loading && !error && (
          <>
            <h2>Score: {score ?? "n/a"}</h2>

            <div
              style={{
                margin: "1rem auto 0",
                padding: "1rem",
                background: "#111",
                border: "1px solid #333",
                borderRadius: 8,
                textAlign: "left",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Empfehlungen für KI‑Sichtbarkeit</h3>
              <ul>
                {notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>

              {/* Free-Version Hinweis */}
              <p
                style={{
                  marginTop: "1rem",
                  color: "#bbb",
                  fontSize: ".95rem",
                  lineHeight: 1.4,
                }}
              >
                <strong>Hinweis (Free-Version):</strong> Du siehst hier nur eine Kurz­auswertung mit 3
                kompakten Maßnahmen. In der Premium-Version erhältst du einen vollständigen Maßnahmen­katalog
                mit detaillierten Schritten, Vorlagen und Beispielen, wie du deine Website so optimierst, dass
                sie in Antworten von KI-Assistenten (ChatGPT, Perplexity, Claude &amp; Co.) häufiger genannt
                wird – mit klarer Quellen­angabe.
              </p>
            </div>

            <div style={{ marginTop: "1.25rem" }}>
              <a href="/" style={{ color: "#ffcc00" }}>Neue Analyse</a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function ErgebnisPage() {
  return (
    <Suspense fallback={<div>Bitte warten…</div>}>
      <ErgebnisWrapper />
    </Suspense>
  );
}