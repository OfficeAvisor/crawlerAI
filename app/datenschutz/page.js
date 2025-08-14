// app/datenschutz/page.js
export const metadata = {
  title: "Datenschutz | crawlerAi",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei crawlerAi.",
};

export default function DatenschutzPage() {
  const container = {
    minHeight: "100svh",
    background: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  };
  const card = {
    width: "100%",
    maxWidth: 900,
    background: "#0f0f0f",
    border: "1px solid #222",
    borderRadius: 12,
    padding: "2rem",
    lineHeight: 1.6,
  };
  const h1 = { marginTop: 0, marginBottom: "0.5rem" };
  const h2 = { marginTop: "1.5rem", marginBottom: "0.5rem" };
  const small = { color: "#aaa", fontSize: ".9rem" };
  const link = { color: "#ffcc00", textDecoration: "none" };
  const list = { paddingLeft: "1.25rem", margin: 0 };

  return (
    <main style={container}>
      <article style={card}>
        <h1 style={h1}>Datenschutzerklärung</h1>
        <p style={small}>Stand: {new Date().toLocaleDateString("de-DE")}</p>

        <p>
          Diese Hinweise informieren Sie über die Verarbeitung personenbezogener Daten bei der Nutzung von
          <strong> crawlerAi</strong> (Domain‑Analyse &amp; KI‑Sichtbarkeits‑Score).
        </p>

        <h2 style={h2}>1. Verantwortlicher</h2>
        <p>
          <strong>Firma/Name:</strong> [Pavlos Tsavdaridis]<br />
          <strong>Adresse:</strong> [...]<br />
          <strong>E‑Mail:</strong> [officeavisor@gmail.com]
        </p>

        <h2 style={h2}>2. Verarbeitete Datenkategorien</h2>
        <ul style={list}>
          <li>Angaben aus dem Fragebogen (z. B. Seitentyp, Ziele, optional E‑Mail‑Adresse)</li>
          <li>Domain, die Sie zur Analyse eingeben</li>
          <li>Technische Protokolldaten: IP‑Adresse, Zeitstempel, Token‑/Kosten‑Metriken der KI‑Abfrage</li>
        </ul>

        <h2 style={h2}>3. Zwecke der Verarbeitung</h2>
        <ul style={list}>
          <li>Durchführung der Domain‑Analyse und Anzeige des KI‑Sichtbarkeits‑Scores</li>
          <li>Missbrauchs‑ und Betrugsprävention (Rate‑Limits, Sicherheit)</li>
          <li>Verbesserung und Stabilisierung unseres Dienstes (Fehleranalyse, Statistik)</li>
          <li>Optional: Kontaktaufnahme mit Ihnen (nur, wenn Sie eine E‑Mail angeben und einwilligen)</li>
        </ul>

        <h2 style={h2}>4. Rechtsgrundlagen (Art. 6 DSGVO)</h2>
        <ul style={list}>
          <li>Art. 6 Abs. 1 b: zur Erfüllung Ihrer Anfrage (Analyse/Ergebnisbereitstellung)</li>
          <li>Art. 6 Abs. 1 f: berechtigtes Interesse (Betrieb, Sicherheit, Missbrauchsprävention)</li>
          <li>Art. 6 Abs. 1 a: Einwilligung (z. B. E‑Mail‑Kontakt, Newsletter – sofern abgefragt)</li>
        </ul>

        <h2 style={h2}>5. Weitergabe / Auftragsverarbeitung</h2>
        <p>
          Zur Analyse nutzen wir externe Dienste als Auftragsverarbeiter:
        </p>
        <ul style={list}>
          <li>
            <strong>OpenAI API</strong>: Verarbeitung des von uns gekürzten Seiteninhalts und Ihrer Fragebogen‑Angaben
            zur Generierung der Auswertung.
          </li>
          <li>
            <strong>Hosting/Deployment</strong> (z. B. Vercel): Ausführung der Server‑Funktionen und Auslieferung der App.
          </li>
        </ul>

        <h2 style={h2}>6. Drittlandtransfer</h2>
        <p>
          Je nach Dienst kann eine Verarbeitung in Drittländern (z. B. USA) stattfinden. Wir achten auf geeignete Garantien
          (z. B. EU‑Standardvertragsklauseln). Details entnehmen Sie bitte den Hinweisen der jeweiligen Anbieter.
        </p>

        <h2 style={h2}>7. Protokollierung &amp; Pseudonymisierung</h2>
        <ul style={list}>
          <li>Die E‑Mail‑Adresse wird in Logs <strong>gehasht</strong> (SHA‑256 + Salt), nicht im Klartext gespeichert.</li>
          <li>Optional kann auch die IP in Logs nur als Hash abgelegt werden.</li>
          <li>Logs enthalten u. a. Zeitstempel, Domain, Score, gekürzte Zeichenanzahl, Token‑Metriken.</li>
        </ul>

        <h2 style={h2}>8. Speicherdauer</h2>
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie es für die oben genannten Zwecke erforderlich ist.
          Technische Logs werden regelmäßig geprüft und gelöscht bzw. anonymisiert.
        </p>

        <h2 style={h2}>9. Cookies / Tracking</h2>
        <p>
          Wir setzen derzeit keine optionalen Tracking‑Cookies. Funktionale Cookies können für den Betrieb erforderlich sein.
          Bei Änderungen informieren wir Sie in dieser Erklärung.
        </p>

        <h2 style={h2}>10. Ihre Rechte</h2>
        <p>
          Sie haben nach DSGVO u. a. das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit sowie Widerspruch. Zur Ausübung wenden Sie sich bitte an die oben genannten Kontaktdaten.
          Sie haben zudem das Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde.
        </p>

        <h2 style={h2}>11. Einwilligungen widerrufen</h2>
        <p>
          Sofern eine Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft
          widerrufen (z. B. E‑Mail‑Kommunikation).
        </p>

        <h2 style={h2}>12. Sicherheit</h2>
        <p>
          Wir treffen technische und organisatorische Maßnahmen (z. B. HTTPS, Rate‑Limits, SSRF‑Schutz, CSP‑Header),
          um Ihre Daten vor Verlust und unbefugtem Zugriff zu schützen.
        </p>

        <h2 style={h2}>13. Aktualisierungen</h2>
        <p>
          Wir können diese Datenschutzhinweise anpassen, um sie an geänderte Rechtslagen oder den
          Funktionsumfang unseres Dienstes anzupassen.
        </p>

        <div style={{ marginTop: "1.25rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="/" style={link}>Zur Startseite</a>
          <a href="/impressum" style={link}>Impressum</a>
        </div>
      </article>
    </main>
  );
}