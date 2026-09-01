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

/** The three vector paths of the wordmark's icon, lifted verbatim from OgLogoMark. */
const logoPaths = [...ogSource.matchAll(/<path\s+d="([^"]+)"\s*\/>/g)].map((m) => m[1]);
if (logoPaths.length !== 3) {
  throw new Error(`Expected 3 logo paths in lib/og-elements.tsx, found ${logoPaths.length}`);
}

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
};
