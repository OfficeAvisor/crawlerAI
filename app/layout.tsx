import "./globals.css";

export const metadata = { title: "CrawlerAI", description: "Domain KI-Score Analyse" };

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",            // sicheres Viewport-Height
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000",
          color: "#fff",
          overscrollBehaviorY: "none",    // verhindert „Durchblick“-Bounce
        }}
      >
        {/* Inhalt füllt den verfügbaren Platz */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</div>

        {/* Footer klebt unten, berücksichtigt Safe-Area */}
        <footer
          style={{
            textAlign: "center",
            paddingTop: "12px",
            paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
            backgroundColor: "#111",
            borderTop: "1px solid #333",
            position: "sticky",
            bottom: 0,
          }}
        >
          <a href="/impressum" style={{ margin: "0 1rem", color: "#4db2ff", textDecoration: "underline" }}>
            Impressum
          </a>
          <a href="/datenschutz" style={{ margin: "0 1rem", color: "#4db2ff", textDecoration: "underline" }}>
            Datenschutz
          </a>
        </footer>
      </body>
    </html>
  );
}