/**
 * Shared building blocks for dynamic OG images (next/og ImageResponse).
 * Keep styles inline — satori doesn't read globals.css.
 */
import { readFileSync } from "fs";
import path from "path";

export const og = {
  bg: "#F8F6F2",
  ink: "#1A1916",
  secondary: "#5C5854",
  muted: "#8A8680",
  accent: "#F15F0E",
  border: "#D9D5CC",
};

export function OgLogoMark({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.2)}
      viewBox="0 0 90 108"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#f15f0e" transform="translate(2 5) scale(0.373) translate(-285 -385)">
        <path d="M 349.29 551.02 l -47.75 -26.09 0 -52.06 0 -52.18 20.06 10.46 c 25.72 13.54 67.20 36.18 69.42 38.03 1.23 0.98 1.60 3.45 1.35 8.12 l -0.37 6.89 -8.62 5.05 c -4.68 2.83 -18.71 10.95 -31.14 17.85 l -22.52 12.68 3.45 2.09 c 9.11 5.54 65.60 35.69 66.71 35.69 0.86 0 1.48 -14.89 1.60 -44.55 l 0.37 -44.55 8 -4.55 c 4.43 -2.58 8.37 -4.31 8.86 -3.82 0.49 0.49 0.98 3.08 1.23 5.78 l 0.37 4.92 4.68 -8.86 c 4.92 -9.35 6.52 -10.83 19.69 -18.09 6.03 -3.45 8.25 -4.18 8.25 -2.83 0 1.60 -10.22 23.75 -30.28 65.48 -2.71 5.78 -2.95 7.63 -3.20 31.88 l -0.37 25.85 -5.54 3.20 c -3.08 1.72 -8 4.68 -11.08 6.52 l -5.54 3.20 -47.63 -26.09 z m 1.48 -64 c 7.14 -4.06 13.91 -8 15.14 -8.86 1.85 -1.35 0.37 -2.46 -12.31 -9.60 -24 -13.17 -33.11 -18.09 -33.97 -18.09 -0.49 0 -0.86 12.18 -0.86 27.20 l 0 27.08 9.60 -5.17 c 5.17 -2.83 15.26 -8.49 22.40 -12.55 z" />
        <path d="M 429.54 547.69 c 0 -9.85 0 -9.97 3.82 -12.06 2.09 -1.11 11.08 -6.40 19.94 -11.57 l 16.25 -9.48 0.62 -42.83 0.62 -42.71 8 -4.68 8 -4.55 0.37 51.82 c 0.25 40.49 -0.12 52.31 -1.23 53.42 -1.35 1.23 -44.80 26.46 -53.54 31.14 -2.83 1.48 -2.83 1.48 -2.83 -8.49 z" />
        <path d="M 392.49 456.74 l -3.20 -2.46 0.12 -32.12 c 0 -17.60 -0.25 -32 -0.62 -32 -0.49 0 -4.92 2.46 -9.85 5.42 -23.38 13.78 -49.11 27.82 -50.95 27.82 -2.09 0 -16.62 -7.51 -16.62 -8.62 0 -0.37 19.45 -11.82 43.32 -25.48 l 43.32 -24.74 4.68 2.34 4.68 2.34 0 32 c 0 17.60 0.49 32 0.98 32 0.98 0 42.58 -23.51 50.22 -28.31 2.22 -1.35 3.57 -0.98 11.32 3.08 4.92 2.58 8.86 4.92 8.86 5.42 -0.12 1.11 -77.42 44.80 -80.49 45.29 -1.48 0.37 -4.06 -0.62 -5.78 -1.97 z" />
      </g>
    </svg>
  );
}

/*
 * Full brand lockup — the orange icon together with the ZOYARE wordmark.
 *
 * The wordmark is six vector paths, not type: setting the name as letter-spaced
 * capitals (which these images used to do) renders a different shape from the
 * real logo. Both groups are read out of public/logo-light.svg at build time so
 * there is exactly one source for the geometry.
 *
 * The tagline that sits below the mark in that file is left out on purpose: it
 * is an SVG <text> node in Space Grotesk, and satori has no such font here, so
 * it would fall back to another face right beside the vector letterforms.
 */
const logoSvg = readFileSync(path.join(process.cwd(), "public", "logo-light.svg"), "utf8");

function logoGroup(marker: string) {
  const start = logoSvg.indexOf(marker);
  const open = logoSvg.slice(logoSvg.indexOf("<g", start));
  const body = open.slice(0, open.indexOf("</g>"));
  return {
    transform: open.match(/transform="([^"]+)"/)![1],
    paths: [...body.matchAll(/<path\s+d="([^"]+)"\s*\/>/g)].map((m) => m[1]),
  };
}

const ICON = logoGroup("<!-- Orange icon -->");
const WORD = logoGroup("<!-- ZOYARE wordmark");

/** Icon + wordmark, cropped to the lockup (the tagline sits below y=80). */
export function OgFullLogo({
  height = 56,
  tone = "light",
}: {
  height?: number;
  tone?: "light" | "dark";
}) {
  const VB = { w: 452, h: 78 };
  return (
    <svg
      width={Math.round((height * VB.w) / VB.h)}
      height={height}
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={og.accent} transform={ICON.transform}>
        {ICON.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill={tone === "dark" ? og.bg : og.ink} transform={WORD.transform}>
        {WORD.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

/**
 * The icon alone, cropped tight to its own bounds.
 *
 * OgLogoMark draws into a 90x108 box that the mark only partly fills, which is
 * fine beside text but leaves the mark hanging off-centre when it is the only
 * thing on a square canvas — the favicon, or a profile avatar. This viewBox is
 * trimmed to the artwork so centring actually centres it.
 */
export function OgLogoSquare({ size = 112 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round((size * 70) / 80)}
      viewBox="0 2 80 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={og.accent} transform={ICON.transform}>
        {ICON.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
