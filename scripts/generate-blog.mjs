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

// Onderwerpen die aansluiten op Zoyare's ICP en SEO-strategie.
// Houd deze lijst bij: verwijder onderwerpen zodra ze gepubliceerd zijn.
const TOPIC_SUGGESTIONS = [
  "The cost of doing nothing: when postponing custom software gets expensive",
  "React Native in 2026: an honest assessment for business apps",
];

const topic = process.argv[2] || TOPIC_SUGGESTIONS[Math.floor(Math.random() * TOPIC_SUGGESTIONS.length)];

console.log(`\n📝 Onderwerp: "${topic}"\n`);

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Bestaande titels meesturen zodat de generator geen dubbele onderwerpen maakt
const existingTitles = [];
try {
  const generated = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "posts-generated.json"), "utf-8"));
  existingTitles.push(...generated.map((p) => p.title));
  const blogTs = fs.readFileSync(path.join(ROOT, "lib", "blog.ts"), "utf-8");
  for (const m of blogTs.matchAll(/^\s*title:\s*"([^"]+)"/gm)) existingTitles.push(m[1]);
} catch {
  // geen harde fout — dedup is best-effort
}

const systemPrompt = `You are the ghostwriter for Zoyare — a one-person software engineering studio (zoyare.com).

Zoyare's audience: international SMB/enterprise decision-makers (50–500 employees) who need custom software. The site is English-only.
Services: custom software, API integrations, mobile apps, process automation.
Track record: Siemens BuildingX connector, StrateX Workforce Management.

Tone: direct, businesslike, technically credible. Write like a sharp colleague.
Forbidden: "seamless", "robust", "leveraging", "game-changer", "synergy", "holistic", "delve", vague buzzwords.
Do: short sentences, active verbs, concrete numbers/prices, honest advice.`;

const userPrompt = `Write a blog post for zoyare.com about: "${topic}"

Requirements:
- 750–1000 words
- English language
- Concrete prices or benchmarks where relevant
- End with a soft CTA ("Ready to start? / Want to know if this fits your situation?")
- SEO-optimized for English search terms
- Must NOT duplicate an existing post. Already published:
${existingTitles.map((t) => `  - ${t}`).join("\n")}
  If the topic overlaps with one of these, take a clearly different angle.

Geef de output als valide JSON (geen markdown codeblocks eromheen, puur JSON):
{
  "slug": "seo-friendly-url-slug",
  "title": "The full blog title",
  "description": "Meta description, max 155 characters",
  "date": "${new Date().toISOString().split("T")[0]}",
  "category": "Custom Software | API & Integrations | Process Automation | Mobile Applications | Software Development",
  "readTime": <integer minutes>,
  "body": "<html article — use only h2, p, ul, ol, li, strong tags. No h1.>",
  "linkedinPost": "Ready-to-publish LinkedIn post in English. Max 1200 characters. Direct, personal. End with the blog URL as placeholder: [URL]. No hashtag spam — max 3 relevant hashtags."
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
