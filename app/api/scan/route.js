import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import dns from "dns/promises";
import net from "net";
import crypto from "crypto";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🔹 Rate-Limit Speicher
const rateLimitMap = new Map();
const MAX_REQUESTS = 3;
const WINDOW_MS = 15 * 60 * 1000; // 15 Minuten

// 🔹 Private IP-Check
function isPrivateIP(ip) {
  return (
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("127.") ||
    ip.startsWith("169.254.") ||
    (ip.startsWith("172.") &&
      parseInt(ip.split(".")[1], 10) >= 16 &&
      parseInt(ip.split(".")[1], 10) <= 31) ||
    ip === "::1"
  );
}

function truncateContent(content, maxLength = 50000) {
  if (!content) return "";
  return content.length > maxLength ? content.slice(0, maxLength) : content;
}

export async function POST(req) {
  let isProcessing = false;

  try {
    // 1️⃣ Rate-Limit prüfen
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const reqLog = rateLimitMap.get(ip) || [];
    const recent = reqLog.filter((ts) => now - ts < WINDOW_MS);
    if (recent.length >= MAX_REQUESTS) {
      return NextResponse.json({ error: "Zu viele Anfragen. Bitte später erneut versuchen." }, { status: 429 });
    }
    recent.push(now);
    rateLimitMap.set(ip, recent);

    // 2️⃣ Domain & Antworten aus POST-Body lesen
    const { domain, answers } = await req.json();
    if (!domain) {
      return NextResponse.json({ error: "Keine Domain angegeben." }, { status: 400 });
    }

    // 3️⃣ Domain validieren (nur https)
    let url;
    try {
      url = new URL(`https://${domain}`);
    } catch {
      return NextResponse.json({ error: "Ungültige Domain." }, { status: 400 });
    }
    if (url.protocol !== "https:") {
      return NextResponse.json({ error: "Nur HTTPS erlaubt." }, { status: 400 });
    }

    // 4️⃣ DNS-Lookup & Private-IP-Block (SSRF-Schutz)
    const addresses = await dns.lookup(url.hostname, { all: true });
    for (const addr of addresses) {
      if (net.isIP(addr.address) && isPrivateIP(addr.address)) {
        return NextResponse.json({ error: "Private IPs sind blockiert." }, { status: 400 });
      }
    }

    // 5️⃣ HTML mit Größenlimit laden
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const resp = await fetch(url, { redirect: "follow", signal: controller.signal });
    clearTimeout(timeout);

    if (!resp.ok) {
      return NextResponse.json({ error: "Seite konnte nicht geladen werden." }, { status: 400 });
    }

    const reader = resp.body.getReader();
    let received = 0;
    let chunks = [];
    const MAX_BYTES = 1_000_000; // 1MB
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > MAX_BYTES) break;
      chunks.push(value);
    }
    const html = new TextDecoder("utf-8").decode(Buffer.concat(chunks));

    // ⬇️ Dein unveränderter Original-Code ab hier
    const originalCharCount = html.length;
    const shortenedHtml = truncateContent(html, 50000);

    const answersDecoded = decodeURIComponent(answers || "{}");

    let branchInstruction = "Allgemein: Erhöhe Zitierfähigkeit in KI‑Antworten mit klaren, eigenständigen Kurzantworten (80–120 Wörter), JSON‑LD für Entitäten/Antworten und expliziter Freigabe für GPTBot/PerplexityBot in robots.txt.";

    const lowerAnswers = answersDecoded.toLowerCase();
    if (lowerAnswers.includes("online-shop") || lowerAnswers.includes("shop") || lowerAnswers.includes("e-commerce")) {
      branchInstruction =
        "Online‑Shop: KIs brauchen maschinenlesbare Produkt-Signale. Liefere pro Kernprodukt eine kompakte Kaufberatung (80–120 Wörter) als eigenständigen Absatz, nenne Marke/Modell/Preis/Verfügbarkeit im HTML‑Text (nicht nur JS). JSON‑LD: Product mit brand, sku, offers (price, availability), aggregateRating. Lege eine kompakte Vergleichsseite („Modell X vs Y“) an. Erlaube GPTBot/PerplexityBot in robots.txt.";

    } else if (
      lowerAnswers.includes("lokaler service") || lowerAnswers.includes("handwerk") ||
      lowerAnswers.includes("service") || lowerAnswers.includes("unternehmens")
    ) {
      branchInstruction =
 "Lokaler Service: KIs bevorzugen eindeutige Anbieter-Antworten. Erstelle pro Leistung + Gebiet eine kurze Antwort (80–120 Wörter) mit Name, Standort, Einsatzgebiet, Angebotsumfang und Kontakt. JSON‑LD: LocalBusiness mit address/geo/areaServed/telephone + FAQPage für typische Fragen. Sichtbare Kundenstimmen im Text. GPTBot/PerplexityBot explizit erlauben.";

    } else if (lowerAnswers.includes("blog") || lowerAnswers.includes("news") || lowerAnswers.includes("redaktion")) {
      branchInstruction =
        "Redaktion/Content: KIs ziehen prägnante Erklärstücke vor. Baue pro Thema eine zitierfähige TL;DR‑Antwort (80–120 Wörter) an den Anfang, ergänze 3–5 Bullet‑Kernaussagen. JSON‑LD: QAPage/HowTo (falls passend) und Person/Organization für Autor/Quelle. Klare Entitätennamen im Text. GPTBot/PerplexityBot zulassen.";

    }

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

    const raw = completion.choices?.[0]?.message?.content ?? "";
    const tokenUsage = completion.usage?.total_tokens || 0;

    const scoreMatch = raw.match(/SCORE:\s*(\d{1,3})/i);
    const score = scoreMatch ? Math.min(100, Math.max(0, parseInt(scoreMatch[1], 10))) : null;

    const lines = raw.split("\n").map((s) => s.trim()).filter(Boolean);
    const afterScoreIdx = lines.findIndex((l) => /^SCORE:/i.test(l));
    const notes = (afterScoreIdx >= 0 ? lines.slice(afterScoreIdx + 1) : lines)
      .filter((l) => l.startsWith("-"))
      .slice(0, 3);

    const logFolder = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logFolder)) fs.mkdirSync(logFolder);

    const nowLog = new Date();
    const fileName = `${nowLog.toISOString().replace(/[:.]/g, "-")}_${domain}.txt`;
    const logPath = path.join(logFolder, fileName);

    const costPerToken = 0.0000005; // Beispielpreis
    const estimatedCost = (tokenUsage * costPerToken).toFixed(6);
    
// PII-Schutz: E-Mail aus answers hashen (falls vorhanden)
let safeAnswers = answersDecoded;
try {
  const obj = JSON.parse(answersDecoded);
  if (obj && typeof obj === "object" && obj.email) {
    const salt = process.env.LOG_SALT || "change-me-in-prod";
    const hash = crypto.createHash("sha256").update(String(obj.email) + salt).digest("hex");
    obj.email = `hashed:${hash.slice(0, 12)}`; // nur Kurz-Hash loggen
  }
  safeAnswers = JSON.stringify(obj);
} catch {
  // answersDecoded war kein JSON – dann unverändert lassen
}
    const logContent = `
Datum/Zeit: ${nowLog.toLocaleString()}
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

    return NextResponse.json({ score, notes });
  } catch (err) {
    console.error("Scan API Fehler:", err);
    return NextResponse.json({ error: "Analyse fehlgeschlagen oder Timeout." }, { status: 500 });
  } finally {
    isProcessing = false;
  }
}