/**
 * Zoyare Blog Generator
 * Gebruik: node scripts/generate-blog.mjs "Jouw onderwerp hier"
 * Zonder argument: kiest automatisch een onderwerp uit de lijst.
 *
 * Vereiste env var: ANTHROPIC_API_KEY (in .env.local of als systeem-variabele)
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// Lees .env.local als die bestaat
const envPath = path.join(ROOT, ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const eqIdx = line.indexOf("=");
    if (eqIdx > 0) {
      const key = line.slice(0, eqIdx).trim();
      const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

// Onderwerpen die aansluiten op Zoyare's ICP en SEO-strategie
const TOPIC_SUGGESTIONS = [
  "Mendix development: wanneer kies je voor low-code en wanneer niet?",
  "Waarom maatwerk software op lange termijn goedkoper is dan een SaaS-abonnement",
  "5 signalen dat je huidige systemen je bedrijfsgroei remmen",
  "Software intern bouwen of uitbesteden: wanneer kies je wat?",
  "Hoe een goede discovery-fase je duizenden euro's kan besparen",
  "MVP vs. volledig product: wanneer stop je met bouwen?",
  "React Native in 2026: de eerlijke stand van zaken voor zakelijke apps",
  "Wat kost een API-integratie en wanneer is het de moeite waard?",
  "Hoe je een softwareproject in scope houdt (en waarom het toch uitloopt)",
  "Enterprise software valkuilen: de 6 meest gemaakte fouten",
  "Van Excel naar maatwerk: wanneer is de stap gerechtvaardigd?",
  "Back-end architectuur: wat moet je weten als niet-technische opdrachtgever?",
];

const topic = process.argv[2] || TOPIC_SUGGESTIONS[Math.floor(Math.random() * TOPIC_SUGGESTIONS.length)];

console.log(`\n📝 Onderwerp: "${topic}"\n`);

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const systemPrompt = `Je bent de ghostwriter voor Zoyare — een software engineering studio in Nederland.

Zoyare's doelgroep: MKB/enterprise (50–500 medewerkers), Nederlandse ondernemingen die maatwerk software nodig hebben.
Diensten: maatwerk software, API-integraties, mobiele apps, process automation.
Track record: Siemens BuildingX connector, StrateX Workforce Management.

Toon: direct, zakelijk, technisch geloofwaardig. Schrijf als een scherpe collega.
Verboden: "seamless", "robust", "leveraging", "game-changer", "synergy", "holistic", "delve", vage buzzwords.
Doe wel: korte zinnen, actieve werkwoorden, concrete getallen/prijzen, eerlijk advies.`;

const userPrompt = `Schrijf een blogpost voor zoyare.com over: "${topic}"

Eisen:
- 750–1000 woorden
- Nederlandse taal
- Concrete prijzen of benchmarks waar relevant
- Eindig met een zachte CTA ("Klaar om te starten? / Wil je weten of dit bij jouw situatie past?")
- SEO-geoptimaliseerd voor Nederlandse zoektermen

Geef de output als valide JSON (geen markdown codeblocks eromheen, puur JSON):
{
  "slug": "seo-vriendelijke-url-slug",
  "title": "De volledige blogtitel",
  "description": "Meta description max 155 tekens",
  "date": "${new Date().toISOString().split("T")[0]}",
  "category": "Maatwerk Software | API & Integraties | Process Automation | Mobiele Applicaties | Engineering",
  "readTime": <integer minuten>,
  "body": "<html artikel — gebruik alleen h2, p, ul, ol, li, strong tags. Geen h1.>",
  "linkedinPost": "Klaar-voor-publicatie LinkedIn post. Max 1200 tekens. Direct, persoonlijk. Eindig met de blog-URL als placeholder: [URL]. Geen hashtag spam — max 3 relevante hashtags."
}`;

let raw;
try {
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });
  raw = response.content[0].text.trim();
} catch (err) {
  console.error("Claude API fout:", err.message);
  process.exit(1);
}

// Parseer JSON — verwijder eventuele markdown codeblock wrappers
const jsonStr = raw.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();
let post;
try {
  post = JSON.parse(jsonStr);
} catch {
  console.error("Kon JSON niet parsen. Ruwe output:\n", raw);
  process.exit(1);
}

// Valideer verplichte velden
const required = ["slug", "title", "description", "date", "category", "readTime", "body", "linkedinPost"];
for (const field of required) {
  if (!post[field]) {
    console.error(`Ontbrekend veld: ${field}`);
    process.exit(1);
  }
}

// Voeg toe aan posts-generated.json
const postsPath = path.join(ROOT, "content", "posts-generated.json");
const existing = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

if (existing.find((p) => p.slug === post.slug)) {
  console.warn(`⚠️  Slug "${post.slug}" bestaat al — sla samenvoegen over.`);
} else {
  const { linkedinPost, ...blogPost } = post;
  existing.push(blogPost);
  fs.writeFileSync(postsPath, JSON.stringify(existing, null, 2), "utf-8");
  console.log(`✅ Post toegevoegd aan content/posts-generated.json`);
}

// Sla LinkedIn draft op
const draftsDir = path.join(ROOT, "content", "linkedin-drafts");
if (!fs.existsSync(draftsDir)) fs.mkdirSync(draftsDir, { recursive: true });
const linkedinFile = path.join(draftsDir, `${post.date}-${post.slug}.txt`);
const linkedinContent = post.linkedinPost.replace(
  "[URL]",
  `https://zoyare.com/blog/${post.slug}`
);
fs.writeFileSync(linkedinFile, linkedinContent, "utf-8");
console.log(`✅ LinkedIn draft: content/linkedin-drafts/${post.date}-${post.slug}.txt`);

console.log(`\n🔗 Blog URL: https://zoyare.com/blog/${post.slug}`);
console.log(`\n🚀 Push om live te zetten:`);
console.log(`   git add content/ && git commit -m "blog: ${post.title}" && git push\n`);
