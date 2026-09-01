#!/usr/bin/env node
/**
 * Generate on-brand social assets from the blog.
 *
 *   npm run social                 latest post
 *   npm run social -- <slug>       one post
 *   npm run social -- --all        every post
 *   npm run social -- --banner     just the LinkedIn page cover
 *   npm run social -- --avatar     just the square profile picture
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

/*
 * The three faces the site is set in, read from the same public/fonts the
 * site's own OG images use so the two can never drift.
 *
 * satori ships no system fonts and cannot read woff2 — the format next/font
 * caches — so without registering these every slide came out in next/og's
 * built-in fallback. That is why the generated set never looked like zoyare.com.
 */
const FONT_DIR = `${root}public/fonts/`;
const face = (file, name, weight, style = "normal") => ({
  name,
  data: readFileSync(`${FONT_DIR}${file}`),
  weight,
  style,
});
const FONTS = [
  face("SpaceGrotesk-Regular.woff", "Space Grotesk", 400),
  face("SpaceGrotesk-Medium.woff", "Space Grotesk", 500),
  face("SpaceGrotesk-Bold.woff", "Space Grotesk", 700),
  face("SpaceMono-Regular.ttf", "Space Mono", 400),
  face("SpaceMono-Bold.ttf", "Space Mono", 700),
  face("InstrumentSerif-Italic.ttf", "Instrument Serif", 400, "italic"),
];

async function png(element, frame, path) {
  const res = new ImageResponse(element, {
    width: frame.width,
    height: frame.height,
    fonts: FONTS,
  });
  writeFileSync(path, Buffer.from(await res.arrayBuffer()));
}

/*
 * Each network gets its own folder inside the post's directory, because the two
 * are not interchangeable: LinkedIn takes the 4:5 slides as a multi-image
 * post, Instagram takes the 1:1 set as a carousel.
 * in posting order, so "upload everything in this folder, in order" is the
 * whole instruction.
 */
const PLATFORMS = {
  carousel: { dir: "linkedin", label: "LinkedIn", ratio: "4:5 (1080×1350)" },
  square: { dir: "instagram", label: "Instagram", ratio: "1:1 (1080×1080)" },
};

/** The written post that goes with the slides, straight from the drafts folder. */
function loadCaption(post) {
  const file = `${root}content/linkedin-drafts/${post.date}-${post.slug}.txt`;
  return existsSync(file) ? readFileSync(file, "utf8").trim() : null;
}

/*
 * Instagram cannot take a clickable link in the caption, so the draft's URL
 * becomes a pointer to the bio link instead of a dead string in the text.
 */
function instagramCaption(linkedinCaption) {
  return linkedinCaption
    .replace(/https?:\/\/\S+/g, "link in bio")
    .replace(/^(#.*)$/m, "$1 #Zoyare");
}

function writeCaptions(post, dir, { square }) {
  const caption = loadCaption(post);
  if (!caption) return null;
  writeFileSync(`${dir}/linkedin/caption.txt`, `${caption}\n`);
  if (square) writeFileSync(`${dir}/instagram/caption.txt`, `${instagramCaption(caption)}\n`);
  return caption;
}

/** A per-post README so the folder explains itself without this script. */
function writePostGuide(post, copy, dir, { square, hasCaption }) {
  const slides = copy.points.length + 2;
  const pad = (name) => name.padEnd(18);
  const order = [
    `${pad("01-cover.png")}— opening slide, the title`,
    ...copy.points.map((pt, n) => `${pad(`0${n + 2}-point-${n + 1}.png`)}— ${pt.heading}`),
    `${pad(`0${slides}-cta.png`)}— closing slide with the blog URL`,
  ];

  const lines = [
    `${post.title}`,
    `${post.date} · zoyare.com/blog/${post.slug}`,
    "",
    "=".repeat(72),
    "1. LINKEDIN — post this as a multi-image post",
    "=".repeat(72),
    "Order matters: LinkedIn keeps the order you add them in.",
    `Folder:  linkedin/     ${PLATFORMS.carousel.ratio}`,
    hasCaption ? "Caption: linkedin/caption.txt (paste as-is, the link is clickable)" : "Caption: none on file",
    "",
    `Upload these ${slides} images in this order:`,
    ...order.map((l) => `  ${l}`),
    "",
    "  share-card.png    — NOT part of the carousel. Use this one instead if you",
    "                      post the blog link as a normal link post.",
    "",
  ];

  if (square) {
    lines.push(
      "=".repeat(72),
      "2. INSTAGRAM — post this as a carousel",
      "=".repeat(72),
      `Folder:  instagram/    ${PLATFORMS.square.ratio}`,
      hasCaption ? "Caption: instagram/caption.txt (link replaced by 'link in bio')" : "Caption: none on file",
      "",
      `Upload these ${slides} images in this order:`,
      ...order.map((l) => `  ${l}`),
      ""
    );
  }

  writeFileSync(`${dir}/POST.txt`, `${lines.join("\n")}\n`);
}

async function renderPost(post, { square }) {
  const copy = loadCopy(post);
  const dir = `${OUT}/${post.slug}`;

  const sizes = [["carousel", formats.carousel]];
  if (square) sizes.push(["square", formats.square]);

  for (const [key, frame] of sizes) {
    const out = `${dir}/${PLATFORMS[key].dir}`;
    mkdirSync(out, { recursive: true });
    let n = 1;
    const name = (label) => `${out}/${String(n++).padStart(2, "0")}-${label}.png`;

    await png(
      T.cover({
        frame,
        eyebrowText: copy.eyebrow,
        title: copy.title,
        footerRight: `${post.readTime} min read`,
      }),
      frame,
      name("cover")
    );

    for (const [i, pt] of copy.points.entries()) {
      await png(
        T.point({ frame, index: i + 1, total: copy.points.length, heading: pt.heading, body: pt.body }),
        frame,
        name(`point-${i + 1}`)
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
      name("cta")
    );
  }

  // Link-post / in-article visual, same ratio as the post's OG image. Not a
  // carousel slide, so it sits beside them rather than in the numbered run.
  await png(
    T.card({ frame: formats.card, quote: copy.card.quote, attribution: copy.card.attribution }),
    formats.card,
    `${dir}/linkedin/share-card.png`
  );

  const caption = writeCaptions(post, dir, { square });
  writePostGuide(post, copy, dir, { square, hasCaption: Boolean(caption) });

  const where = square ? "linkedin/ + instagram/" : "linkedin/";
  console.log(`✓ ${post.slug} — ${copy.points.length + 2} slides → ${where}`);
}

/**
 * The brand line. This is the slogan, not a piece of campaign copy — it stays
 * "software built to scale" and matches the tagline set into public/logo-light.svg.
 */
const SLOGAN = "software built to scale";

async function renderAvatar() {
  mkdirSync(OUT, { recursive: true });
  await png(T.avatar({ frame: formats.avatar }), formats.avatar, `${OUT}/brand-avatar.png`);
  console.log("✓ brand-avatar.png (1080×1080 — Google Business Profile, Clutch, LinkedIn)");
}

async function renderBanner() {
  mkdirSync(OUT, { recursive: true });
  await png(
    T.banner({ frame: formats.banner, line: SLOGAN }),
    formats.banner,
    `${OUT}/linkedin-banner.png`
  );
  console.log("✓ linkedin-banner.png (1128×191 — LinkedIn page cover)");
}

/*
 * A single sheet listing every post in publishing order, so the schedule reads
 * without opening 22 folders. Written only on a full run; rendering one post
 * leaves the existing sheet alone.
 */
function writeIndex(posts, { square }) {
  const ordered = [...posts].sort((a, b) => (a.date < b.date ? -1 : 1));

  const header = [
    "# Posting guide",
    "",
    `${ordered.length} posts, oldest first. Every post folder repeats these`,
    "instructions in its own POST.txt.",
    "",
    "**Per post the order is always LinkedIn first, then Instagram.** Slides are",
    "numbered in upload order: 01 is the cover, the last one is the call to action.",
    "",
    "Brand assets that belong to no single post:",
    "",
    "- `brand-avatar.png` — 1080x1080 profile picture (LinkedIn, Instagram, Google Business Profile, Clutch)",
    "- `linkedin-banner.png` — 1128x191 LinkedIn page cover",
    "",
    "---",
    "",
  ];

  const body = ordered.map((post, i) => {
    const dir = `social-assets/${post.slug}`;
    return [
      `### ${i + 1}. ${post.date} — ${post.title}`,
      "",
      "| # | Network | Upload | Caption |",
      "| --- | --- | --- | --- |",
      `| 1 | LinkedIn | \`${dir}/linkedin/\` — numbered PNGs in order, as a multi-image post | \`linkedin/caption.txt\` |`,
      square
        ? `| 2 | Instagram | \`${dir}/instagram/\` — numbered PNGs in order, as a carousel | \`instagram/caption.txt\` |`
        : "| 2 | Instagram | not rendered — re-run with --square | — |",
      "",
    ].join("\n");
  });

  writeFileSync(`${OUT}/POSTING-GUIDE.md`, `${[...header, ...body].join("\n")}\n`);
  console.log(`✓ POSTING-GUIDE.md — ${ordered.length} posts in publishing order`);
}

/* -------------------------------------------------------------------- main */

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const slugArg = args.find((a) => !a.startsWith("--"));
const square = flags.has("--square");

if (flags.has("--banner")) {
  await renderBanner();
} else if (flags.has("--avatar")) {
  await renderAvatar();
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
  await renderAvatar();
  if (flags.has("--all")) writeIndex(targets, { square });
  console.log(
    "\nsocial-assets/POSTING-GUIDE.md lists every post in order; each post folder" +
      " holds linkedin/ and instagram/ plus its own POST.txt."
  );
}
