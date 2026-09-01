/**
 * Slide layouts for the generated social assets.
 *
 * THIS IS THE FILE TO TWEAK. Every visual decision lives here: type sizes,
 * spacing, which slide gets the dark background, where the logo sits. The
 * generator (render.mjs) only decides *what* copy goes in; this decides how it
 * looks.
 *
 * Rendering runs through satori (via next/og), which supports a useful subset of
 * CSS. Two rules bite most often:
 *   - any element with more than one child needs an explicit `display: "flex"`
 *   - there is no cascade, so styles are inline and nothing is inherited
 *
 * Sizes are written against a 1080px-wide frame and scaled from there, so the
 * same template works for the 1080x1350 carousel and the 1200x630 card.
 */
import React from "react";
import { brand, LogoMark, LogoSquare, FullLogo } from "./brand.mjs";

const h = React.createElement;

/** Scale a 1080-frame size to whatever frame we are actually rendering. */
const s = (frame) => (n) => Math.round((n * frame.width) / 1080);

/** The small uppercase label used as an eyebrow throughout the brand. */
function eyebrow(px, text, color = brand.secondary) {
  return h(
    "div",
    {
      style: {
        display: "flex",
        fontSize: px(26),
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color,
        fontWeight: 500,
      },
    },
    text
  );
}

/**
 * Bottom rule. Defaults to the domain on the left and whatever you pass on the
 * right; pass `left` to replace the domain (the CTA slide uses that to show one
 * long URL across the whole width instead of two colliding strings).
 */
function footer(px, frame, right = "", tone = "light", left = "zoyare.com") {
  const line = tone === "dark" ? "rgba(248,246,242,0.22)" : brand.border;
  const text = tone === "dark" ? "rgba(248,246,242,0.65)" : brand.muted;
  const long = left.length > 24;
  return h(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: `1px solid ${line}`,
        paddingTop: px(28),
        fontSize: long ? px(19) : px(22),
        letterSpacing: long ? "0.12em" : "0.2em",
        textTransform: "uppercase",
        color: text,
      },
    },
    [
      h("span", { key: "l" }, left),
      right ? h("span", { key: "r" }, right) : null,
    ]
  );
}

/** Shared page frame: padding, background, the orange spine on the left edge. */
function frameBox(frame, tone, children) {
  const px = s(frame);
  const dark = tone === "dark";
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: `${px(84)}px ${px(80)}px`,
        backgroundColor: dark ? brand.inkBg : brand.bg,
        color: dark ? brand.onInk : brand.ink,
        fontFamily: "sans-serif",
        borderLeft: `${px(16)}px solid ${brand.accent}`,
      },
    },
    children
  );
}

/* ------------------------------------------------------------------ slides */

/** Slide 1 — the hook. Big, quiet, one idea. */
export function cover({ frame, eyebrowText, title, footerRight }) {
  const px = s(frame);
  // Long titles step down through these sizes so nothing ever overflows.
  const size = title.length > 78 ? px(64) : title.length > 52 ? px(76) : px(92);
  return frameBox(frame, "light", [
    h(
      "div",
      {
        key: "top",
        style: { display: "flex", alignItems: "center", justifyContent: "space-between" },
      },
      [h(FullLogo, { key: "logo", height: px(46) }), eyebrow(px, eyebrowText)]
    ),
    h(
      "div",
      {
        key: "title",
        style: {
          display: "flex",
          fontSize: size,
          lineHeight: 1.05,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          maxWidth: "100%",
        },
      },
      title
    ),
    footer(px, frame, footerRight),
  ]);
}

/** Slides 2..n — one point each, numbered. Dark, so the carousel has rhythm. */
export function point({ frame, index, total, heading, body }) {
  const px = s(frame);
  return frameBox(frame, "dark", [
    h(
      "div",
      { key: "num", style: { display: "flex", alignItems: "baseline", gap: px(18) } },
      [
        h(
          "span",
          {
            key: "n",
            style: { fontSize: px(30), fontWeight: 700, color: brand.accent, letterSpacing: "0.08em" },
          },
          String(index).padStart(2, "0")
        ),
        h(
          "span",
          {
            key: "t",
            style: {
              fontSize: px(22),
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(248,246,242,0.55)",
            },
          },
          `of ${String(total).padStart(2, "0")}`
        ),
      ]
    ),
    h("div", { key: "body", style: { display: "flex", flexDirection: "column", gap: px(26) } }, [
      h(
        "div",
        {
          key: "h",
          style: {
            display: "flex",
            fontSize: heading.length > 46 ? px(54) : px(64),
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: "-0.025em",
          },
        },
        heading
      ),
      body
        ? h(
            "div",
            {
              key: "p",
              style: {
                display: "flex",
                fontSize: px(30),
                lineHeight: 1.45,
                color: "rgba(248,246,242,0.72)",
                maxWidth: "92%",
              },
            },
            body
          )
        : null,
    ]),
    footer(px, frame, "", "dark"),
  ]);
}

/** Final slide — one instruction, nothing else competing with it. */
export function cta({ frame, headline, sub, url }) {
  const px = s(frame);
  return frameBox(frame, "light", [
    h("div", { key: "top", style: { display: "flex" } }, [
      h(FullLogo, { key: "logo", height: px(46) }),
    ]),
    h("div", { key: "mid", style: { display: "flex", flexDirection: "column", gap: px(28) } }, [
      h(
        "div",
        {
          key: "h",
          style: {
            display: "flex",
            fontSize: px(72),
            lineHeight: 1.06,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          },
        },
        headline
      ),
      sub
        ? h(
            "div",
            {
              key: "s",
              style: { display: "flex", fontSize: px(32), lineHeight: 1.45, color: brand.secondary },
            },
            sub
          )
        : null,
    ]),
    // One URL across the full width — no second string to collide with.
    footer(px, frame, "", "light", url ?? "zoyare.com"),
  ]);
}

/** In-article visual: a single pulled statement from the post. */
export function card({ frame, quote, attribution }) {
  const px = s(frame);
  return frameBox(frame, "light", [
    h("div", { key: "top", style: { display: "flex" } }, [
      h(FullLogo, { key: "logo", height: px(40) }),
    ]),
    h(
      "div",
      {
        key: "q",
        style: {
          display: "flex",
          fontSize: quote.length > 120 ? px(44) : px(56),
          lineHeight: 1.18,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        },
      },
      quote
    ),
    footer(px, frame, attribution ?? ""),
  ]);
}

/**
 * Square profile picture.
 *
 * Every network crops this differently — Google rounds the corners, some crop
 * to a circle — so the mark sits centred with a wide margin and nothing else
 * competes with it. The wordmark is deliberately absent: at avatar sizes it
 * shrinks to an unreadable smudge.
 */
export function avatar({ frame }) {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: brand.bg,
      },
    },
    h(LogoSquare, { size: Math.round(frame.width * 0.46) })
  );
}

/**
 * LinkedIn page cover. This one is wide and short (1128x191), so it scales off
 * the frame's HEIGHT — scaling off width the way the slides do would blow the
 * type up until it ran off the edge.
 */
export function banner({ frame, line }) {
  // Sizes written against a 191px-tall frame.
  const py = (n) => Math.round((n * frame.height) / 191);
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${py(38)}px`,
        backgroundColor: brand.inkBg,
        color: brand.onInk,
        fontFamily: "sans-serif",
        borderLeft: `${py(8)}px solid ${brand.accent}`,
      },
    },
    [
      h("div", { key: "l", style: { display: "flex", alignItems: "center", gap: py(26) } }, [
        h(FullLogo, { key: "logo", height: py(40), tone: "dark" }),
        h(
          "span",
          {
            key: "t",
            style: { fontSize: py(22), fontWeight: 500, color: "rgba(248,246,242,0.82)" },
          },
          line
        ),
      ]),
      h(
        "span",
        {
          key: "r",
          style: {
            fontSize: py(15),
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(248,246,242,0.6)",
            whiteSpace: "nowrap",
          },
        },
        "zoyare.com"
      ),
    ]
  );
}
