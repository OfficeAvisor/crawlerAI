// @ts-nocheck
"use client";
import { Suspense } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function FragebogenInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "";

  const [formData, setFormData] = useState({
    email: "",
    siteType: "",
    audience: "",
    mainGoal: "",
    updateFrequency: "",
    aiContentUsage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    e.preventDefault();
    const answersString = encodeURIComponent(JSON.stringify(formData));
    router.push(`/ergebnis?domain=${domain}&answers=${answersString}`);
  };

  return (
    <main
      data-page="fragebogen"
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <h1>Fragebogen zur Website</h1>
      <p>Beantworte ein paar Fragen, damit wir die Analyse personalisieren können.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        {/* E-Mail-Feld */}
        <div className="row">
          <label htmlFor="email">E-Mail-Adresse (für Ergebnis-Report)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="z. B. name@domain.de"
          />
        </div>

        {/* Seitentyp */}
        <div className="row">
          <label>Was beschreibt deine Website am besten?</label>
          <select name="siteType" value={formData.siteType} onChange={handleChange}>
            <option value="">Bitte auswählen</option>
            <option value="Online-Shop">Online-Shop</option>
            <option value="Lokaler Service/Handwerk">Lokaler Service / Handwerk</option>
            <option value="Blog/News/Redaktion">Blog / News / Redaktion</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
        </div>

        {/* Zielgruppe */}
        <div className="row">
          <label>Wer ist deine Hauptzielgruppe?</label>
          <select name="audience" value={formData.audience} onChange={handleChange}>
            <option value="">Bitte auswählen</option>
            <option value="Privatkunden">Privatkunden</option>
            <option value="Geschäftskunden">Geschäftskunden</option>
            <option value="Beides">Beides</option>
          </select>
        </div>

        {/* Hauptziel */}
        <div className="row">
          <label>Was ist dein Hauptziel mit der Website?</label>
          <select name="mainGoal" value={formData.mainGoal} onChange={handleChange}>
            <option value="">Bitte auswählen</option>
            <option value="Verkäufe generieren">Verkäufe generieren</option>
            <option value="Anfragen erhalten">Anfragen erhalten</option>
            <option value="Reichweite steigern">Reichweite steigern</option>
            <option value="Information bereitstellen">Information bereitstellen</option>
          </select>
        </div>

        {/* Update-Häufigkeit */}
        <div className="row">
          <label>Wie oft aktualisierst du deine Website?</label>
          <select name="updateFrequency" value={formData.updateFrequency} onChange={handleChange}>
            <option value="">Bitte auswählen</option>
            <option value="Täglich">Täglich</option>
            <option value="Wöchentlich">Wöchentlich</option>
            <option value="Monatlich">Monatlich</option>
            <option value="Seltener">Seltener</option>
          </select>
        </div>

        {/* AI Content Nutzung */}
        <div className="row">
          <label>Wird KI-generierter Inhalt auf deiner Website genutzt?</label>
          <select name="aiContentUsage" value={formData.aiContentUsage} onChange={handleChange}>
            <option value="">Bitte auswählen</option>
            <option value="Ja, häufig">Ja, häufig</option>
            <option value="Ja, gelegentlich">Ja, gelegentlich</option>
            <option value="Nein">Nein</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "0.75rem",
            background: "#fff",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.6 : 1,
          }}
        >
          {isSubmitting ? "Wird gesendet…" : "Analyse starten"}
        </button>
      </form>
      <style jsx global>{`
        [data-page="fragebogen"] {
          --bg: #000; --fg: #fff; --muted: #bfbfbf; --line: #1a1a1a; --focus: #ffffff;
        }
        [data-page="fragebogen"] h1 {
          margin: 0 0 0.5rem; font-size: 1.8rem; line-height: 1.2; color: var(--fg);
          text-align: center;
        }
        [data-page="fragebogen"] p {
          margin: 0 0 2rem; color: var(--muted); text-align: center;
        }
        [data-page="fragebogen"] form {
          width: 100%; max-width: 680px; display: flex; flex-direction: column; gap: 1rem;
        }
        [data-page="fragebogen"] .row {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 0.8rem 1.2rem;
          align-items: center;
        }
        @media (max-width: 640px) {
          [data-page="fragebogen"] .row { grid-template-columns: 1fr; }
        }
        [data-page="fragebogen"] label {
          display: block; font-weight: 600; color: var(--fg); margin: 0 0 0.4rem;
          text-align: right; margin-bottom: 0;
        }
        @media (max-width: 640px) {
          [data-page="fragebogen"] label { text-align: left; }
        }
        [data-page="fragebogen"] input[type="email"],
        [data-page="fragebogen"] select,
        [data-page="fragebogen"] textarea {
          width: 100%;
          padding: 0.8rem 0.95rem;
          background: #0a0a0a;
          color: var(--fg);
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          outline: 2px solid transparent;
          transition: border-color 160ms ease, outline-color 160ms ease, box-shadow 160ms ease;
        }
        [data-page="fragebogen"] select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.8rem center;
          background-size: 14px 14px;
          padding-right: 2.2rem;
        }
        [data-page="fragebogen"] select:focus { background-color: #0f0f0f; }
        [data-page="fragebogen"] input::placeholder { color: #777; }
        [data-page="fragebogen"] select option { background: var(--bg); color: var(--fg); }
        [data-page="fragebogen"] input:focus,
        [data-page="fragebogen"] select:focus,
        [data-page="fragebogen"] textarea:focus {
          border-color: #666;
          outline-color: var(--focus);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        [data-page="fragebogen"] button[type="submit"] {
          display: inline-block; width: 100%;
          padding: 0.95rem 1.1rem;
          font-weight: 700;
          border-radius: 10px;
          border: 1px solid #fff;
          background: #fff; color: #000;
          transition: transform 120ms ease, opacity 120ms ease, background 120ms ease, color 120ms ease;
        }
        [data-page="fragebogen"] button[type="submit"]:hover:not([disabled]) { transform: translateY(-1px); }
        [data-page="fragebogen"] button[type="submit"]:active:not([disabled]) { transform: translateY(0); }
        [data-page="fragebogen"] button[disabled] { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </main>
  );
}

export default function FragebogenPage() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', background: '#000', minHeight: '100svh', display: 'grid', placeItems: 'center' }}>Bitte warten…</div>}>
      <FragebogenInner />
    </Suspense>
  );
}