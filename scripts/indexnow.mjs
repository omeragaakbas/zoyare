#!/usr/bin/env node
/**
 * Submit the site's URLs to IndexNow (Bing, Yandex, Seznam).
 *
 * Usage:
 *   node scripts/indexnow.mjs                     # every URL in the live sitemap
 *   node scripts/indexnow.mjs /blog/some-post ... # only these paths
 *
 * Run it after a deploy that adds or meaningfully changes pages. Submitting the whole
 * sitemap on every deploy is allowed but pointless — IndexNow rewards precision, and
 * repeatedly re-submitting unchanged URLs is what gets a host throttled.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// lib/indexnow.ts is the single source of truth, but it is TypeScript and this script
// runs on bare node — so read the constants out of it rather than importing them.
const libSrc = readFileSync(fileURLToPath(new URL("../lib/indexnow.ts", import.meta.url)), "utf8");
const constant = (name) => {
  const match = libSrc.match(new RegExp(`${name} = "([^"]+)"`));
  if (!match) throw new Error(`${name} not found in lib/indexnow.ts`);
  return match[1];
};

const INDEXNOW_KEY = constant("INDEXNOW_KEY");
const INDEXNOW_HOST = constant("INDEXNOW_HOST");
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

const ENDPOINT = "https://api.indexnow.org/IndexNow";
const SITEMAP = `https://${INDEXNOW_HOST}/sitemap.xml`;

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `https://${INDEXNOW_HOST}${p.startsWith("/") ? p : `/${p}`}`))
  : await urlsFromSitemap();

if (!urlList.length) {
  console.error("Nothing to submit.");
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  }),
});

// 200 = accepted, 202 = accepted but key still being validated. Both are fine.
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URL(s)`);
if (!res.ok && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
