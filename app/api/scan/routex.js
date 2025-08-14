export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Doppel-Request-Schutz (Dev-Mode/Mehrfachklicks)
let isProcessing = false;

// Inhalt hart kürzen
function truncateContent(content, maxLength = 50000) {
  if (!content) return "";
  return content.length > maxLength ? content.slice(0, maxLength) : content;
}

// Sehr einfache Domain-Prüfung
function isValidDomain(domain) {
  const regex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  return regex.test(domain);
}

export async function GET(req) {
  if (isProcessing) {
    return NextResponse.json({ error: "Analyse läuft bereits." }, { status: 429 });
  }
  isProcessing = true;

  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");
    const answersParam = searchParams.get("answers") || "{}";

    if (!domain || !isValidDomain(domain)) {
      return NextResponse.json({ error: "Ungültige Domain." }, { status: 400 });
    }

    // IP (lokal oft leer)
    const ip = req.headers.get("x-forwarded-for") || "Unbekannt";

    // Seite abrufen (15s Timeout)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(`https://${domain}`, { signal: controller.signal }).catch(() => null);
    clearTimeout(timeout);

    if (!res || !res.ok) {
      return NextResponse.json({ error: "Seite konnte nicht geladen werden." }, { status: 400 });
    }

    // HTML lesen und begrenzen
    let html = await res.text();
    const originalCharCount = html.length;
    const shortenedHtml = truncateContent(html, 50000);

    // Fragebogen-Antworten dekodieren (robust gegen doppelte Kodierung)
    let answersDecoded = "{}";
    try {
      answersDecoded = decodeURIComponent(answersParam);
    } catch {
      answersDecoded = answersParam;
    }

    // Branch-Instruktion anhand der Antworten
    const aLower = answersDecoded.toLowerCase();
    let branchInstruction = "Allgemein: Erhöhe Zitierfähigkeit in KI‑Antworten mit klaren, eigenständigen Kurzantworten (80–120 Wörter), JSON‑LD für Entitäten/Antworten und expliziter Freigabe für GPTBot/PerplexityBot in robots.txt.";

if (aLower.includes("online-shop") || aLower.includes("shop") || aLower.includes("e-commerce")) {
  branchInstruction =
    "Online‑Shop: KIs brauchen maschinenlesbare Produkt-Signale. Liefere pro Kernprodukt eine kompakte Kaufberatung (80–120 Wörter) als eigenständigen Absatz, nenne Marke/Modell/Preis/Verfügbarkeit im HTML‑Text (nicht nur JS). JSON‑LD: Product mit brand, sku, offers (price, availability), aggregateRating. Lege eine kompakte Vergleichsseite („Modell X vs Y“) an. Erlaube GPTBot/PerplexityBot in robots.txt.";

} else if (aLower.includes("lokaler service") || aLower.includes("handwerk") || aLower.includes("service") || aLower.includes("unternehmens")) {
  branchInstruction =
    "Lokaler Service: KIs bevorzugen eindeutige Anbieter-Antworten. Erstelle pro Leistung + Gebiet eine kurze Antwort (80–120 Wörter) mit Name, Standort, Einsatzgebiet, Angebotsumfang und Kontakt. JSON‑LD: LocalBusiness mit address/geo/areaServed/telephone + FAQPage für typische Fragen. Sichtbare Kundenstimmen im Text. GPTBot/PerplexityBot explizit erlauben.";

} else if (aLower.includes("blog") || aLower.includes("news") || aLower.includes("redaktion")) {
  branchInstruction =
    "Redaktion/Content: KIs ziehen prägnante Erklärstücke vor. Baue pro Thema eine zitierfähige TL;DR‑Antwort (80–120 Wörter) an den Anfang, ergänze 3–5 Bullet‑Kernaussagen. JSON‑LD: QAPage/HowTo (falls passend) und Person/Organization für Autor/Quelle. Klare Entitätennamen im Text. GPTBot/PerplexityBot zulassen.";

}

    // ---------- OpenAI-Aufruf (robust, kurzes Format) ----------
    let raw = "";
    let tokenUsage = 0;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
  "Du bist ein Analyse‑Tool für KI‑Sichtbarkeit (ChatGPT, Perplexity, Claude, AI Overviews). Liefere eine kompakte Bewertung und GENAU 3 Maßnahmen, wie diese Seite in Antworten von KI‑Assistenten häufiger MIT ATTRIBUTION genannt wird. Fokus: KI‑freundliche Struktur (JSON‑LD für Entitäten & Antworten), zitierfähige Kurzantworten (80–120 Wörter), klare Entitäten/Marken/Produkte/Orte im Text, KI‑Crawler‑Freigaben (GPTBot/PerplexityBot). Kein klassisches SEO‑Vokabular (keine Title/H1/Meta‑Description Tipps), keine Code‑Beispiele, keine langen Erklärungen.",
          },
          {
            role: "user",
            content: [
              "Betreiber-Infos:",
              answersDecoded || "{}",
              "",
              "Kontext/Branch:",
              branchInstruction,
              "",
              "Website-Inhalt (gekürzt auf 50.000 Zeichen):",
              shortenedHtml || "",
              "",
              "FORMAT (unbedingt einhalten):",
              "SCORE: <0-100>",
              "- Maßnahme 1 (max. 25 Wörter)",
              "- Maßnahme 2 (max. 25 Wörter)",
              "- Maßnahme 3 (max. 25 Wörter)",
            ].join("\n"),
          },
        ],
        max_tokens: 240,
      });

      raw = completion.choices?.[0]?.message?.content ?? "";
      tokenUsage = completion.usage?.total_tokens || 0;
    } 
      catch (e) 
	{
      console.error("OpenAI Fehler:", e);
      return NextResponse.json({ error: "KI-Auswertung fehlgeschlagen." }, { status: 502 });
    }

    // ---------- Parsing des festen Formats ----------
    const scoreMatch = raw.match(/SCORE:\s*(\d{1,3})/i);
    const score = scoreMatch ? Math.min(100, Math.max(0, parseInt(scoreMatch[1], 10))) : null;

    const lines = raw.split("\n").map((s) => s.trim()).filter(Boolean);
    const afterScoreIdx = lines.findIndex((l) => /^SCORE:/i.test(l));
    const notes = (afterScoreIdx >= 0 ? lines.slice(afterScoreIdx + 1) : lines)
      .filter((l) => l.startsWith("-"))
      .slice(0, 3);

    // ---------- Logging ----------
    const logFolder = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logFolder)) fs.mkdirSync(logFolder);

    const now = new Date();
    const fileName = `${now.toISOString().replace(/[:.]/g, "-")}_${domain}.txt`;
    const logPath = path.join(logFolder, fileName);

    const costPerToken = 0.0000005; // Beispielpreis (an dein echtes Modell/Preise anpassen)
    const estimatedCost = (tokenUsage * costPerToken).toFixed(6);

    const logContent = `
Datum/Zeit: ${now.toLocaleString()}
IP: ${ip}
Domain: ${domain}
SCORE: ${score ?? "n/a"}
Zeichen untersucht (original): ${originalCharCount}
Zeichen an GPT gesendet: ${shortenedHtml.length}
Token-Verbrauch: ${tokenUsage}
Geschätzte Kosten (USD): $${estimatedCost}

Empfehlungen:
${notes.join("\n")}

Fragebogen-Antworten:
${answersDecoded}

Branch-Instruktion:
${branchInstruction}
`;
    fs.writeFileSync(logPath, logContent.trim(), "utf-8");

    // ---------- API-Response (Frontend zeigt nur Score + Notes) ----------
    return NextResponse.json({ score, notes });
  } catch (err) {
    console.error("Scan API Fehler:", err);
    return NextResponse.json({ error: "Analyse fehlgeschlagen oder Timeout." }, { status: 500 });
  } finally {
    isProcessing = false;
  }
}