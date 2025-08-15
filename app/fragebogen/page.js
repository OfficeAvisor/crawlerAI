import { Suspense } from "react";
import { useState } from "react";

function FragebogenInner() {
  "use client";
  const { useRouter, useSearchParams } = require("next/navigation");

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const answersString = encodeURIComponent(JSON.stringify(formData));
    router.push(`/ergebnis?domain=${domain}&answers=${answersString}`);
  };

  return (
    <main
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
        <div>
          <label htmlFor="email">E-Mail-Adresse (für Ergebnis-Report)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="z. B. name@domain.de"
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Seitentyp */}
        <div>
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
        <div>
          <label>Wer ist deine Hauptzielgruppe?</label>
          <select name="audience" value={formData.audience} onChange={handleChange}>
            <option value="">Bitte auswählen</option>
            <option value="Privatkunden">Privatkunden</option>
            <option value="Geschäftskunden">Geschäftskunden</option>
            <option value="Beides">Beides</option>
          </select>
        </div>

        {/* Hauptziel */}
        <div>
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
        <div>
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
        <div>
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
          style={{
            padding: "0.75rem",
            background: "#ffcc00",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Analyse starten
        </button>
      </form>
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