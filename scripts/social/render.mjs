#!/usr/bin/env node
/**
 * Generate on-brand social assets from the blog.
 *
 *   npm run social                 latest post
 *   npm run social -- <slug>       one post
 *   npm run social -- --all        every post
 *   npm run social -- --banner     just the LinkedIn page cover
 *   npm run social -- <slug> --square   also render the 1:1 Instagram variant
 *
 * Output lands in social-assets/<slug>/ as numbered PNGs, ready to upload as a
 * LinkedIn document carousel or an Instagram carousel. The 4:5 carousel size
 * works for both, so one set covers both networks.
 *
 * Copy comes from the post itself on the first run and is written to
 * content/social/<slug>.json. Edit that file and re-run to change the words
 * without touching the layout; edit templates.mjs to change the layout.
 */
import { ImageResponse } from "next/og.js";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { formats } from "./brand.mjs";
import * as T from "./templates.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const OUT = `${root}social-assets`;
const COPY_DIR = `${root}content/social`;

/* ------------------------------------------------------------------- posts */

function loadPosts() {
  const generated = JSON.parse(readFileSync(`${root}content/posts-generated.json`, "utf8"));
  const fromJson = Array.isArray(generated) ? generated : generated.posts;

  // lib/blog.ts holds the hand-written posts as a TS array; pull the fields we
  // need out of the source rather than adding a TypeScript loader to the script.
  const ts = readFileSync(`${root}lib/blog.ts`, "utf8");
  const fromTs = [];
  const blockRe = /\{\s*slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?description:\s*\n?\s*"([^"]*)",[\s\S]*?date:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",[\s\S]*?readTime:\s*(\d+),[\s\S]*?body:\s*`([\s\S]*?)`,\s*\},/g;
  let m;
  while ((m = blockRe.exec(ts)) !== null) {
    fromTs.push({
      slug: m[1], title: m[2], description: m[3],
      date: m[4], category: m[5], readTime: Number(m[6]), body: m[7],
    });
  }

  const all = [...fromTs, ...fromJson];
  const seen = new Set();
  return all
    .filter((p) => (seen.has(p.slug) ? false : seen.add(p.slug)))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/* -------------------------------------------------------------------- copy */

const strip = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const firstSentence = (text, max = 190) => {
  const cut = text.split(/(?<=[.!?])\s/)[0] ?? text;
  return cut.length > max ? `${cut.slice(0, max - 1).trimEnd()}…` : cut;
};

/** Derive a first draft of the carousel copy from the post's own structure. */
function deriveCopy(post) {
  const sections = [...post.body.matchAll(/<h2>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2>|$)/g)];
  const points = sections
    .map(([, heading, rest]) => {
      const para = rest.match(/<p>([\s\S]*?)<\/p>/);
      return {
        heading: strip(heading),
        body: para ? firstSentence(strip(para[1])) : "",
      };
    })
    // Closing sections are calls to action in the article; the carousel has its own.
    .filter((p) => !/^(want|not sure|how many|next step)/i.test(p.heading))
    .slice(0, 3);

  return {
    eyebrow: post.category,
    title: post.title,
    points,
    cta: {
      headline: "The full piece is on the site.",
      sub: firstSentence(post.description, 220),
    },
    card: { quote: firstSentence(post.description, 200), attribution: post.category },
  };
}

/** Load per-post copy, scaffolding an editable file on first run. */
function loadCopy(post) {
  mkdirSync(COPY_DIR, { recursive: true });
  const file = `${COPY_DIR}/${post.slug}.json`;
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  const copy = deriveCopy(post);
  writeFileSync(file, `${JSON.stringify(copy, null, 2)}\n`);
  console.log(`  scaffolded content/social/${post.slug}.json — edit it to change the words`);
  return copy;
}

/* ------------------------------------------------------------------ render */

async function png(element, frame, path) {
  const res = new ImageResponse(element, { width: frame.width, height: frame.height });
  writeFileSync(path, Buffer.from(await res.arrayBuffer()));
}

async function renderPost(post, { square }) {
  const copy = loadCopy(post);
  const dir = `${OUT}/${post.slug}`;
  mkdirSync(dir, { recursive: true });

  const sizes = [["carousel", formats.carousel]];
  if (square) sizes.push(["square", formats.square]);

  for (const [label, frame] of sizes) {
    const suffix = label === "carousel" ? "" : `-${label}`;
    const total = copy.points.length + 2;
    let n = 1;

    await png(
      T.cover({
        frame,
        eyebrowText: copy.eyebrow,
        title: copy.title,
        footerRight: `${post.readTime} min read`,
      }),
      frame,
      `${dir}/${String(n++).padStart(2, "0")}-cover${suffix}.png`
    );

    for (const [i, p] of copy.points.entries()) {
      await png(
        T.point({ frame, index: i + 1, total: copy.points.length, heading: p.heading, body: p.body }),
        frame,
        `${dir}/${String(n++).padStart(2, "0")}-point-${i + 1}${suffix}.png`
      );
    }

    await png(
      T.cta({
        frame,
        headline: copy.cta.headline,
        sub: copy.cta.sub,
        url: `zoyare.com/blog/${post.slug}`,
      }),
      frame,
      `${dir}/${String(n++).padStart(2, "0")}-cta${suffix}.png`
    );
  }

  // In-article visual, same ratio as the post's OG image.
  await png(
    T.card({ frame: formats.card, quote: copy.card.quote, attribution: copy.card.attribution }),
    formats.card,
    `${dir}/card.png`
  );

  console.log(`✓ ${post.slug} — ${copy.points.length + 2} slides + card`);
}

async function renderBanner() {
  mkdirSync(OUT, { recursive: true });
  await png(
    T.banner({ frame: formats.banner, line: "Custom software, built by the engineer you talk to." }),
    formats.banner,
    `${OUT}/linkedin-banner.png`
  );
  console.log("✓ linkedin-banner.png (1128×191 — LinkedIn page cover)");
}

/* -------------------------------------------------------------------- main */

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const slugArg = args.find((a) => !a.startsWith("--"));
const square = flags.has("--square");

if (flags.has("--banner")) {
  await renderBanner();
} else {
  const posts = loadPosts();
  let targets;
  if (flags.has("--all")) targets = posts;
  else if (slugArg) {
    const one = posts.find((p) => p.slug === slugArg);
    if (!one) {
      console.error(`No post with slug "${slugArg}". Available: ${posts.length} posts.`);
      process.exit(1);
    }
    targets = [one];
  } else targets = [posts[0]];

  for (const post of targets) await renderPost(post, { square });
  await renderBanner();
  console.log(`\nAssets in social-assets/ — upload the numbered PNGs in order as a carousel.`);
}
