/**
 * Brand tokens and the logo mark for generated social images.
 *
 * Colours and the logo geometry are READ OUT OF lib/og-elements.tsx rather than
 * copied, so the site's OG images and these social assets can never drift apart.
 * Change a colour there and it changes here on the next run.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import React from "react";

const ogSource = readFileSync(
  fileURLToPath(new URL("../../lib/og-elements.tsx", import.meta.url)),
  "utf8"
);

function token(name) {
  const match = ogSource.match(new RegExp(`${name}:\\s*"(#[0-9A-Fa-f]{3,8})"`));
  if (!match) throw new Error(`Colour "${name}" not found in lib/og-elements.tsx`);
  return match[1];
}

export const brand = {
  bg: token("bg"),
  ink: token("ink"),
  secondary: token("secondary"),
  muted: token("muted"),
  accent: token("accent"),
  border: token("border"),
  /** Reversed palette for the slides that need contrast against the cream ones. */
  inkBg: token("ink"),
  onInk: token("bg"),
};

/** The three vector paths of the icon on its own, lifted verbatim from OgLogoMark. */
const logoPaths = [...ogSource.matchAll(/<path\s+d="([^"]+)"\s*\/>/g)].map((m) => m[1]);
if (logoPaths.length !== 3) {
  throw new Error(`Expected 3 logo paths in lib/og-elements.tsx, found ${logoPaths.length}`);
}

/** Icon only — the mark without the "ZOYARE" wordmark next to it. */
export function LogoMark({ size = 56, color = brand.accent }) {
  return React.createElement(
    "svg",
    {
      width: size,
      height: Math.round(size * 1.2),
      viewBox: "0 0 90 108",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement(
      "g",
      {
        fill: color,
        transform: "translate(2 5) scale(0.373) translate(-285 -385)",
      },
      logoPaths.map((d, i) => React.createElement("path", { key: i, d }))
    )
  );
}

/**
 * The icon cropped tight to its own bounds.
 *
 * LogoMark draws into a 90x108 box the artwork only partly fills — fine beside
 * text, wrong when the mark is alone on a square canvas, where it drifts up and
 * left.
 *
 * With that transform applied the artwork measures 69.264 x 79.289 and sits
 * at x 8.169..77.433, y -2.624..76.664. This viewBox is that box squared off
 * on its own centre with 8% room. The earlier "0 2 80 70" was guessed rather
 * than measured: it was shorter than the artwork, so it clipped the mark top
 * and bottom and still left it off-centre horizontally.
 */
export function LogoSquare({ size = 300 }) {
  return React.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "-3.186 -8.967 91.975 91.975",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement(
      "g",
      { fill: brand.accent, transform: "translate(2 5) scale(0.373) translate(-285 -385)" },
      logoPaths.map((d, i) => React.createElement("path", { key: i, d }))
    )
  );
}

/*
 * The full lockup — orange icon plus the ZOYARE wordmark — comes out of
 * public/logo-light.svg. Both public logos carry the same geometry and differ
 * only in the wordmark's fill, so one parse serves both tones.
 *
 * The source file also holds the "software built to scale" tagline as an SVG
 * <text> node below the mark. That is deliberately left out: it depends on
 * Space Grotesk being available, which it is not in this renderer, so it would
 * fall back to a different face and look wrong next to the vector letterforms.
 */
const logoSvg = readFileSync(
  fileURLToPath(new URL("../../public/logo-light.svg", import.meta.url)),
  "utf8"
);

function group(marker) {
  const start = logoSvg.indexOf(marker);
  if (start === -1) throw new Error(`"${marker}" not found in public/logo-light.svg`);
  const openTag = logoSvg.slice(logoSvg.indexOf("<g", start));
  const transform = openTag.match(/transform="([^"]+)"/)?.[1];
  const body = openTag.slice(0, openTag.indexOf("</g>"));
  const paths = [...body.matchAll(/<path\s+d="([^"]+)"\s*\/>/g)].map((m) => m[1]);
  if (!transform || paths.length === 0) throw new Error(`Could not parse group "${marker}"`);
  return { transform, paths };
}

const iconGroup = group("<!-- Orange icon -->");
const wordGroup = group("<!-- ZOYARE wordmark");

/**
 * Full logo: icon + wordmark, cropped to just those two (the tagline in the
 * source file sits below y=80, outside this viewBox).
 */
export function FullLogo({ height = 56, tone = "light" }) {
  const VB = { w: 452, h: 78 };
  const wordFill = tone === "dark" ? brand.bg : brand.ink;
  return React.createElement(
    "svg",
    {
      width: Math.round((height * VB.w) / VB.h),
      height,
      viewBox: `0 0 ${VB.w} ${VB.h}`,
      xmlns: "http://www.w3.org/2000/svg",
    },
    [
      React.createElement(
        "g",
        { key: "icon", fill: brand.accent, transform: iconGroup.transform },
        iconGroup.paths.map((d, i) => React.createElement("path", { key: i, d }))
      ),
      React.createElement(
        "g",
        { key: "word", fill: wordFill, transform: wordGroup.transform },
        wordGroup.paths.map((d, i) => React.createElement("path", { key: i, d }))
      ),
    ]
  );
}

/**
 * Output formats. Add one here and every template gets rendered at that size —
 * the templates lay out relative to the frame, so they adapt.
 */
export const formats = {
  /** LinkedIn document carousel and Instagram feed both take 4:5 portrait. */
  carousel: { width: 1080, height: 1350 },
  /** Square variant, if you prefer it for Instagram. */
  square: { width: 1080, height: 1080 },
  /** In-article visual for a blog post — same ratio as the existing OG images. */
  card: { width: 1200, height: 630 },
  /** LinkedIn company page cover image. */
  banner: { width: 1128, height: 191 },
  /** Square profile picture — Google Business Profile, Clutch, LinkedIn. */
  avatar: { width: 1080, height: 1080 },
};
