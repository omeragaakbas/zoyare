/* Taste-variant page builder: shared shell, sections and UI fragments.
   The markup follows public/home.html (the kit page that passed the gate). */
const BASE = "https://zoyare.com";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ARROW = '<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8"/><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5"/></svg>';
const TICK = '<svg viewBox="0 0 16 16"><path d="m4.5 8.2 2.3 2.3 4.7-5"/></svg>';
const FILE = '<svg class="ui-icon" viewBox="0 0 16 16"><path d="M4 2.5h5l3 3v8H4z"/><path d="M9 2.5v3h3"/></svg>';

/* ---------------------------------------------------------------- fragments */
const stage = (max, inner, ay = 40) =>
  `<div class="stage stage--fade-b"><div class="at-rise fit" style="--fit-max:${max}px;--ax:max(24px, 50% - ${max / 2}px);--ay:${ay}px;--ay-sm:16px">\n${inner}\n</div></div>`;

const ui = {
  checklist: (title, items, done) => stage(340, `<div class="ui ui-panel ui-checks" data-ui="checklist">
  <div class="ui-checks__head"><div class="ui-title">${esc(title)}</div><span class="ui-spacer"></span><div class="ui-meta" data-checks-count>${done} of ${items.length}</div></div>
  <div class="ui-checks__bar"><i data-checks-bar style="--k:${(done / items.length).toFixed(2)}"></i></div>
  <ul class="ui-checks__list">
${items.map((t, i) => `    <li class="ui-check${i < done ? " is-done" : ""}"><span class="ui-check__box">${TICK}</span><span class="ui-check__label">${esc(t)}</span></li>`).join("\n")}
  </ul>
</div>`),

  notify: (notes) => stage(400, `<div class="ui ui-notify" data-ui="notify">
  <ul class="ui-notify__list" data-notify-list>
${notes.map(([kind, title, time, body, btn]) => {
    const av = kind === "agent" ? '<span class="ui-agent ui-note__av" aria-hidden="true"></span>'
      : kind === "done" ? '<span class="ui-note__ico"><svg class="ui-icon" viewBox="0 0 16 16"><path d="m3.5 8.4 2.8 2.8 6.2-6.4"/></svg></span>'
      : `<span class="ui-avatar ui-note__av" data-tone="${kind[1]}">${esc(kind[0])}</span>`;
    return `    <li class="ui-note">${av}<span class="ui-note__text"><span class="ui-note__title">${esc(title)}<time>${esc(time)}</time></span><span class="ui-note__body">${esc(body)}</span></span>${btn ? `<span class="ui-btn ui-btn--sm ui-note__btn">${esc(btn)}</span>` : ""}</li>`;
  }).join("\n")}
  </ul>
</div>`, 48),

  chat: (agent, q, a, src) => stage(400, `<div class="ui ui-panel ui-chat" data-ui="chat">
  <div class="ui-head"><span class="ui-agent" aria-hidden="true"></span><div class="ui-title">${esc(agent)}</div><span class="ui-chat__online">Online</span><span class="ui-spacer"></span></div>
  <div class="ui-chat__body">
    <div class="ui-msg ui-msg--me" data-chat-q><span class="ui-msg__text">${esc(q)}</span></div>
    <div class="ui-msg ui-msg--bot" data-chat-a>
      <span class="ui-agent ui-msg__av" aria-hidden="true"></span>
      <span class="ui-msg__col">
        <span class="ui-chat__typing" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="ui-chat__answer">${a}</span>
        <span class="ui-chat__srcs"><span class="ui-chat__src">${FILE}${esc(src)}</span></span>
      </span>
    </div>
  </div>
  <div class="ui-chat__input"><span class="ui-chat__ph">Write a message</span><span class="ui-chat__send" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 13V3.5M3.8 7.5 8 3.3l4.2 4.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
</div>`),

  toggles: (title, items) => {
    const on = items.filter((i) => i[2]).length;
    return stage(380, `<div class="ui ui-panel ui-toggles" data-ui="toggles">
  <div class="ui-head"><svg class="ui-icon ui-toggles__ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8 13 4v3.6c0 3-2.1 5.4-5 6.6-2.9-1.2-5-3.6-5-6.6V4z"/><path d="m5.8 8 1.6 1.6 3-3.2"/></svg><div class="ui-title">${esc(title)}</div><span class="ui-spacer"></span><div class="ui-meta" data-tg-count>${on} of ${items.length} on</div></div>
  <ul class="ui-toggles__list">
${items.map(([l, s, o]) => `    <li class="ui-tg"><span class="ui-tg__text"><span class="ui-tg__label">${esc(l)}</span><span class="ui-tg__sub">${esc(s)}</span></span><button class="ui-switch${o ? " is-on" : ""}" type="button" role="switch" aria-checked="${o ? "true" : "false"}" aria-label="${esc(l)}"><i></i></button></li>`).join("\n")}
  </ul>
</div>`, 48);
  },

  stat: (label, from, to, sub) => {
    const hs = [70.96, 79.14, 75.05, 83.24, 77.78, 85.96, 81.87, 90.06, 84.6, 94.15, 88.69, 96.88, 92.79, 103.7];
    const bars = hs.map((h, i) => `<rect rx="3" x="${(i * 29.143).toFixed(2)}" y="${(120 - h).toFixed(2)}" width="21.14" height="${h.toFixed(2)}"/>`).join("");
    return stage(420, `<div class="ui ui-panel ui-stat" data-ui="stat" data-from="${from}" data-to="${to}" data-suffix="">
  <div class="ui-stat__head">
    <div class="ui-stat__top"><span class="ui-stat__label">${esc(label)}</span><span class="ui-stat__range">Last 14 days<svg class="ui-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="m4.5 6.5 3.5 3.5 3.5-3.5"/></svg></span></div>
    <div class="ui-stat__line"><span class="ui-stat__num" data-stat-num>${to}</span><span class="ui-chip ui-chip--plain ui-stat__delta"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 9.5v-7M3 5.5l3-3 3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>${to - from}</span><span class="ui-stat__sub">${esc(sub)}</span></div>
  </div>
  <div class="ui-stat__chart">
    <svg class="ui-stat__svg" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true"><path class="ui-stat__grid" d="M0 30.5H400M0 60.5H400M0 90.5H400"/><path class="ui-stat__cover" fill-rule="evenodd" d=""/><g class="ui-stat__bars">${bars}</g></svg>
    <div class="ui-stat__axis" aria-hidden="true"><span>Two weeks ago</span><span>Last week</span><span>Today</span></div>
  </div>
</div>`);
  },

  apps: (title, items) => stage(380, `<div class="ui ui-panel ui-apps" data-ui="integrations">
  <div class="ui-head"><div class="ui-title">${esc(title)}</div><span class="ui-spacer"></span><div class="ui-meta" data-apps-count>${items.length - 1} connected</div></div>
  <ul class="ui-apps__list">
${items.map(([icon, name, sub], i) => `    <li class="ui-app${i === 2 ? '" data-apps-target' : ' is-on"'}><span class="ui-logo ui-logo--sm"><img src="/assets/ui/icons/${icon}.svg" alt=""></span><span class="ui-app__text"><span class="ui-app__name">${esc(name)}</span><span class="ui-app__sub">${esc(sub)}</span></span><span class="ui-app__state"><span class="ui-chip ui-app__on">Connected</span><button class="ui-btn ui-btn--ghost ui-btn--sm ui-app__connect" type="button"><span class="ui-spin ui-app__spin" aria-hidden="true"></span><span>Connect</span></button></span></li>`).join("\n")}
  </ul>
</div>`, 32),

  search: (q, group, rows) => stage(400, `<div class="ui ui-panel ui-search" data-ui="search">
  <div class="ui-search__field">
    <svg class="ui-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/></svg>
    <span class="ui-search__q"><span data-search-q>${esc(q)}</span><i class="ui-search__caret"></i></span>
    <kbd class="ui-search__kbd">Ctrl K</kbd>
  </div>
  <div class="ui-search__group">${esc(group)}</div>
  <ul class="ui-search__list" data-search-list>
${rows.map(([t, m], i) => `    <li class="ui-search__row${i === 0 ? " is-sel" : ""}"><span class="ui-search__ico">${FILE}</span><span class="ui-search__t">${t}</span><span class="ui-search__m">${esc(m)}</span></li>`).join("\n")}
  </ul>
  <div class="ui-search__foot"><span><kbd>&uarr;</kbd><kbd>&darr;</kbd> to move</span><span><kbd>Enter</kbd> to open</span></div>
</div>`),
};

const diagram = (json, still) => `<div class="dg" data-diagram${still ? " data-dg-still" : ""}><script type="application/json">${JSON.stringify(json)}</script></div>`;
const lanes = (alt, input, core, ls) => ({ layout: "lanes", alt, input: { label: input[0], icon: input[1] }, core: { label: core[0], icon: core[1] }, lanes: ls.map(([label, icon, sub]) => ({ label, icon, done: true, sub })) });
const hub = (alt, center, spokes) => ({ layout: "hub", alt, center: { label: center[0], icon: center[1] }, spokes: spokes.map(([label, icon]) => ({ label, icon })) });

/* ---------------------------------------------------------------- sections */
const rows = (items, ordered) => {
  const tag = ordered ? "ol" : "ul";
  return `<${tag} class="rows">\n${items.map((r) => {
    const name = r.href ? `<a class="rows__name link" href="${r.href}">${esc(r.name)}</a>` : `<span class="rows__name">${esc(r.name)}</span>`;
    return `            <li>${name}${r.value ? `<span class="rows__value">${esc(r.value)}</span>` : ""}<p>${esc(r.text)}</p></li>`;
  }).join("\n")}\n          </${tag}>`;
};

const hero = (h) => `  <section class="hero hero--split" data-enter aria-labelledby="hero-h">
    <div class="wrap">
      <div class="hero-text grid hero-split">
        <div class="hero-copy span-6">
          <h1 id="hero-h">${esc(h.h1)}</h1>
          <p class="t-lead">${esc(h.lead)}</p>
          <div class="btn-row">
            <a class="btn btn--primary" href="/estimate">Get a price indication${ARROW}</a>
            <a class="btn btn--secondary" href="${h.second[1]}">${esc(h.second[0])}</a>
          </div>
          <dl class="hero-facts">
${h.facts.map(([dt, dd]) => `            <div><dt>${esc(dt)}</dt><dd>${esc(dd)}</dd></div>`).join("\n")}
          </dl>
        </div>
        <div class="hero-visual frame frame--lit span-6 start-7" data-ui-cycles="3" role="img" aria-label="${esc(h.diagram.alt)}">
          ${diagram(h.diagram)}
        </div>
      </div>
    </div>
  </section>`;

/* h2 + rows on the left, one panel on the right; optional counter row under it */
const split = (s) => `  <section class="section${s.inverse ? " ground-inverse" : ""}" id="${s.id}" aria-labelledby="${s.id}-h">
    <div class="wrap">
      <div class="section-head">
        <h2 id="${s.id}-h">${s.h2}</h2>
      </div>
      <div class="grid grid--top">
        <div class="span-5 stack-6">
          ${s.lead ? `<p>${s.lead}</p>\n          ` : ""}${rows(s.rows, s.ordered)}
          ${s.link ? `<p><a class="link" href="${s.link[1]}">${esc(s.link[0])}</a></p>` : ""}
        </div>
        <div class="panel span-6 start-7" role="img" aria-label="${esc(s.alt)}">
          ${s.visual}
        </div>
      </div>${s.counters ? `
      <div class="grid" data-moment="counter-rolls" style="margin-top: var(--s-7)">
${s.counters.map(([n, t]) => `        <div class="span-3"><p class="t-stat">${n}</p><p class="t-small muted">${esc(t)}</p></div>`).join("\n")}
      </div>` : ""}
    </div>
  </section>`;

/* dark band: words (and a client's quote, when the brief gives one) beside a still diagram */
const band = (s) => `  <section class="section ground-inverse" id="${s.id}" aria-labelledby="${s.id}-h">
    <div class="wrap">
      <div class="grid grid--top">
        <div class="span-5 stack-6">
          <div class="section-head">
            <h2 id="${s.id}-h">${s.h2}</h2>
            <p>${s.lead}</p>
          </div>
          ${s.rows ? rows(s.rows, s.ordered) : ""}
          ${s.quote ? `<figure class="quote"><blockquote>${esc(s.quote.text)}</blockquote><div class="person"><span>${esc(s.quote.name)}, ${esc(s.quote.company)}</span></div></figure>` : ""}
          ${s.link ? `<p><a class="link" href="${s.link[1]}">${esc(s.link[0])}</a></p>` : ""}
        </div>
        <div class="panel span-6 start-7" role="img" aria-label="${esc(s.alt)}">
          ${s.visual}
        </div>
      </div>
    </div>
  </section>`;

const faq = (s) => `  <section class="section" id="${s.id || "questions"}" aria-labelledby="${s.id || "questions"}-h">
    <div class="wrap">
      <div class="grid grid--top">
        <div class="span-5 section-head">
          <h2 id="${s.id || "questions"}-h">${esc(s.h2 || "Questions")}</h2>
          <p>${esc(s.lead)}</p>
          <p><a class="link" href="${s.link ? s.link[1] : "/faq"}">${esc(s.link ? s.link[0] : "Read all questions")}</a></p>
          ${s.visual ? `<div class="panel" role="img" aria-label="${esc(s.alt)}">${s.visual}</div>` : ""}
        </div>
        <div class="faq span-6 start-7">
${s.items.map((i, n) => `          <div class="faq__item${n > 4 ? " phone-only" : ""}"><h3>${esc(i.q)}</h3><p>${esc(i.a)}</p></div>`).join("\n")}
        </div>
      </div>
    </div>
  </section>`;

/* ---------------------------------------------------------------- shell */
// One stylesheet (public/p/kit.css, written by build.cjs from the kit's files) and
// the two fonts from public/fonts, so a page needs no request to another host.
const KIT_CSS = ["system.css", "ui/cards.css","backgrounds/backgrounds.css", "layout/layout.css", "icons/icon.css", "ui/base.css",
  ...["window", "chat", "notify", "checklist", "stat", "toggles", "integrations", "search"].map((f) => `ui/${f}/fragment.css`), "diagrams/diagram.css"];
const FONT_CSS = `@font-face{font-family:"Reddit Sans";font-style:normal;font-weight:400 700;font-display:swap;src:url(/fonts/RedditSans-latin.woff2) format("woff2")}
@font-face{font-family:"JetBrains Mono";font-style:normal;font-weight:400 500;font-display:swap;src:url(/fonts/JetBrainsMono-latin.woff2) format("woff2")}
`;
const HEAD_CSS = `<link rel="preload" href="/fonts/RedditSans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/p/kit.css">
<link rel="stylesheet" href="/assets/motion/motion.css">
<link rel="modulepreload" href="/assets/system.js"><link rel="modulepreload" href="/assets/motion/motion.js">`;
const NAV = [["Services", "/services"], ["Portfolio", "/portfolio"], ["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]];

const page = (p) => `<!doctype html>
<html lang="en" data-type="software" data-radius="soft" data-ground="sand" data-buttons="solid" data-motion>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:image" content="/opengraph-image">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#f8f6f2">
<link rel="canonical" href="${BASE}${p.path}">
<meta name="site-kind" content="software">
<meta name="page-type" content="software">
${HEAD_CSS}
<style>
:root {
  --p-bg: #f8f6f2; --p-surface: #ebe9e5; --p-ink: #1a1916; --p-muted: #656460;
  --p-accent: #f15f0e; --p-accent-ink: #111111; --p-action: #f15f0e; --p-action-ink: #111111;
  --p-inv-bg: #1a1916; --p-inv-surface: #272622; --p-inv-ink: #f8f6f2; --p-inv-muted: #9b9996;
  --p-inv-accent: #f15f0e; --p-inv-accent-ink: #111111; --p-inv-action: #f15f0e; --p-inv-action-ink: #111111;
  --font-display: "Reddit Sans", system-ui, sans-serif;
  --font-text: "Reddit Sans", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 500;
  --display-tracking: -0.03em;
  --display-tracking-xl: -0.04em;
}
</style>
<script>document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)</script>
<script>document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)</script>
<script src="/assets/backgrounds/backgrounds.js"></script>
<style>
  /* page CSS: inside visuals only */
  main .section .panel { --p-h: 440px; }
  main .section:has([data-moment]) .panel { --p-h: 320px; }
  main .section.ground-inverse .panel { --p-h: 540px; max-width: 100%; overflow: hidden; }
  main .section .section-head .panel, main .section .span-5 > .panel { --p-h: 300px; margin-top: var(--s-6); }
  @media (max-width: 1023px) { main .section .panel, main .section.ground-inverse .panel { --p-h: 300px; } main .section .span-5 > .panel { --p-h: 220px; } }
  @media (min-width: 640px) { .faq > .phone-only { display: none; } }
  @media (max-width: 639px) { main .section .span-5 > .panel { --p-h: 290px; } }
  .nav__logo img { height: 20px; width: auto; max-width: 132px; display: block; }
${p.css || ""}</style>
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://zoyare.com/#organization","name":"Zoyare","url":"https://zoyare.com","logo":{"@type":"ImageObject","url":"https://zoyare.com/apple-icon","width":180,"height":180},"email":"hello@zoyare.com","description":"Dutch engineering studio that builds and runs AI agents, automations and custom software. Based in the Netherlands, working with businesses across the Benelux and worldwide.","foundingDate":"2024","legalName":"Zoyare","identifier":{"@type":"PropertyValue","name":"KvK","value":"94498555"},"address":{"@type":"PostalAddress","addressCountry":"NL"},"knowsLanguage":["nl-NL","en-GB"],"contactPoint":{"@type":"ContactPoint","email":"hello@zoyare.com","url":"https://cal.eu/zoyare","contactType":"customer service","availableLanguage":["English","Dutch"]},"sameAs":["https://www.linkedin.com/company/zoyare/","https://www.instagram.com/zoyarehq/"],"knowsAbout":["AI Agents","Business Process Automation","Custom Software Development","API Integration","Mobile App Development"]},{"@type":"WebSite","@id":"https://zoyare.com/#website","url":"https://zoyare.com","name":"Zoyare","publisher":{"@id":"https://zoyare.com/#organization"},"inLanguage":"en"}]}</script>
${(p.jsonLd || []).map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
</head>
<body>
<!-- type: software. Built by scripts/taste/build.cjs with the homepage's deal:
     hero split, nav nav-centre, close close-type, footer footer-dark, buttons solid, type reddit,
     moment counter-rolls. Edit the data in scripts/taste, not this file. -->

<header class="nav nav--centre">
  <div class="wrap nav__bar">
    <a class="skip-link" href="#top">Skip to content</a>
    <a class="nav__logo" href="/"><img src="/logo-light.svg" alt="Zoyare"></a>
    <nav class="nav__links" aria-label="Main">
${NAV.map(([t, h]) => `      <div class="nav__item"><a class="nav__link" href="${h}"${p.path.startsWith(h) ? ' aria-current="page"' : ""}>${t}</a></div>`).join("\n")}
    </nav>
    <div class="nav__actions">
      <a class="btn btn--primary" href="/estimate">Get a price indication</a>
    </div>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>

<main id="top">
${p.sections.join("\n\n")}
</main>

<footer class="footer closing footer--dark ground-inverse" id="contact" aria-labelledby="close-h">
  <div class="wrap">
    <div class="closing__cta close--type">
      <div class="section-head">
        <h2 id="close-h">${esc(p.close ? p.close[0] : "Know the cost before the first call")}</h2>
        <p class="t-small muted">${esc(p.close ? p.close[1] : "Three questions, an honest range, and a fixed quote within 48 hours of the intake.")}</p>
      </div>
      <a class="btn btn--primary btn--xl btn--wide" href="/estimate">Get a price indication${ARROW}</a>
    </div>
    <div class="closing__links">
      <div class="grid">
        <div class="span-4 stack-4">
          <a class="nav__logo" href="/"><img src="/logo.svg" alt="Zoyare"></a>
          <p class="footer__lede">Dutch engineering studio for AI agents, automations and custom software.</p>
        </div>
        <div class="span-2 footer__col"><h3>AI services</h3><ul><li><a href="/services/ai-agents">AI agents</a></li><li><a href="/services/ai-customer-support">Customer support</a></li><li><a href="/services/creative-production">Ads and video</a></li><li><a href="/services/growth-reporting">Growth reports</a></li></ul></div>
        <div class="span-2 footer__col"><h3>Builds</h3><ul><li><a href="/services/custom-software">Custom software</a></li><li><a href="/services/api-integrations">Integrations</a></li><li><a href="/services/mobile-applications">Mobile apps</a></li><li><a href="/services/process-automation">Automation</a></li></ul></div>
        <div class="span-2 footer__col"><h3>Company</h3><ul><li><a href="/about">About</a></li><li><a href="/portfolio">Portfolio</a></li><li><a href="/blog">Blog</a></li><li><a href="/software-development-netherlands">Netherlands</a></li></ul></div>
        <div class="span-2 footer__col"><h3>Contact</h3><ul><li><a href="/contact">Contact</a></li><li><a href="/estimate">Estimator</a></li><li><a href="/faq">Questions</a></li></ul></div>
      </div>
      <div class="footer__legal">
        <span>&copy; 2026 Zoyare &nbsp; <a href="/privacy">Privacy</a> &nbsp; <a href="/terms">Terms</a></span>
        <span>KvK 94498555</span>
        <div class="socials"></div>
      </div>
    </div>
  </div>
</footer>

<script type="module" src="/assets/system.js"></script>
<script defer src="/site-config.js"></script>
<script defer src="/site-shell.js"></script>
<script type="module" src="/assets/motion/motion.js"></script>
<script type="module" src="/assets/layout/layout.js"></script>
<script type="module" src="/assets/diagrams/mount.js"></script>
</body>
</html>
`;

/* ---------------------------------------------------------------- JSON-LD */
const ld = {
  faq: (items) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) }),
  service: (name, description, path) => ({ "@context": "https://schema.org", "@type": "Service", name, description, serviceType: name, url: BASE + path, areaServed: { "@type": "Country", name: "Netherlands" }, provider: { "@type": "Organization", "@id": BASE + "/#organization", name: "Zoyare", url: BASE } }),
  crumbs: (list) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: list.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: BASE + path })) }),
  webPage: (name, description, path) => ({ "@context": "https://schema.org", "@type": "WebPage", name, description, url: BASE + path, isPartOf: { "@id": BASE + "/#website" }, about: { "@id": BASE + "/#organization" } }),
};

module.exports = { KIT_CSS, FONT_CSS, HEAD_CSS, ui, diagram, lanes, hub, rows, hero, split, band, faq, page, ld, esc };
