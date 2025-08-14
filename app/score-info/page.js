export default function Erklaerung() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Wie entsteht der CrawlerAI-Score?
      </h1>

      <p>
        Der CrawlerAI-Score bewertet, wie gut deine Website auf Traffic aus
        KI-Systemen wie ChatGPT, Perplexity oder Claude vorbereitet ist.
        Er wird auf Basis von öffentlich sichtbaren Inhalten deiner Seite
        berechnet.
      </p>

      <h2 style={{ marginTop: "2rem" }}>So funktioniert die Berechnung:</h2>
      <ol style={{ marginLeft: "1.5rem" }}>
        <li>Wir rufen den HTML-Inhalt deiner Website ab.</li>
        <li>
          Dieser Inhalt wird in einer gekürzten Form an unsere Analyse-KI
          weitergegeben.
        </li>
        <li>
          Die KI bewertet anhand verschiedener Kriterien, wie gut die Seite
          auf KI-Traffic vorbereitet ist, und vergibt einen Score zwischen 0
          und 100.
        </li>
        <li>
          Zusätzlich erhältst du 3 konkrete Empfehlungen zur Verbesserung.
        </li>
      </ol>

      <div
        style={{
          backgroundColor: "#222",
          padding: "1rem",
          borderRadius: "8px",
          marginTop: "2rem",
          border: "1px solid #ffcc00",
        }}
      >
        <strong style={{ color: "#ffcc00" }}>⚠️ Hinweis zur Genauigkeit (Free-Version)</strong>
        <p style={{ marginTop: "0.5rem" }}>
          In der kostenlosen Version werden pro Analyse nur{" "}
          <strong>maximal 50.000 Zeichen</strong> deiner Website gelesen.
          Bei wiederholten Abfragen derselben Seite kann es passieren, dass
          unterschiedliche Textabschnitte ausgewertet werden.
        </p>
        <p>
          Dadurch kann der Score um <strong>±10 Punkte</strong> variieren.
          Für eine konsistente Bewertung empfehlen wir den Premium-Scan, der
          den gesamten relevanten Inhalt berücksichtigt.
        </p>
      </div>
    </main>
  );
}