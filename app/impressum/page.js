// app/impressum/page.js
export const metadata = {
  title: "Impressum | crawlerAi",
  description: "Impressum und Anbieterkennzeichnung für crawlerAi.",
};

export default function ImpressumPage() {
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

  return (
    <main style={container}>
      <article style={card}>
        <h1 style={h1}>Impressum</h1>
        <p style={small}>Stand: {new Date().toLocaleDateString("de-DE")}</p>

        {/* Anbieterkennzeichnung */}
        <h2 style={h2}>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>[Pavlos Tsavdaridis]</strong><br />
          [Straße und Hausnummer]<br />
          [12247] [Berlin], [DE]<br />
        </p>

        <h2 style={h2}>Kontakt</h2>
        <p>
          Telefon: [Telefonnummer]<br />
          E‑Mail: <a href="mailto:[email]" style={link}>[officeavisor@gmail.com]</a><br />
          Website: <a href="https://[domain]" style={link}>https://[n.A.]</a>
        </p>

        {/* Registerangaben – falls vorhanden */}
        <h2 style={h2}>Registereintrag</h2>
        <p>
          Registergericht: [das ist noch eine private Seite]<br />
          Registernummer: [n.A.]
        </p>

        {/* Umsatzsteuer – falls vorhanden */}
        <h2 style={h2}>Umsatzsteuer‑ID</h2>
        <p>Umsatzsteuer‑Identifikationsnummer gemäß § 27a UStG: [DE123456789]</p>

        {/* Verantwortlich für Inhalte */}
        <h2 style={h2}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          [Pavlos Tsavdaridis]<br />
          [Adresse wie oben]
        </p>

        {/* Haftungsausschluss */}
        <h2 style={h2}>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
          allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
          forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
          Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
          Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>

        <h2 style={h2}>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
          Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
          wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
          Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
          jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>

        <h2 style={h2}>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
          Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>

        <h2 style={h2}>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online‑Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" style={link}>
            https://ec.europa.eu/consumers/odr
          </a>.
          Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <div style={{ marginTop: "1.25rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="/" style={link}>Zur Startseite</a>
          <a href="/datenschutz" style={link}>Datenschutz</a>
        </div>
      </article>
    </main>
  );
}