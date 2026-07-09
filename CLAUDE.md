# Zoyare — zoyare.com

Marketingsite van Zoyare, een eenmans software engineering studio (Ömer Akbas, KvK 94498555). Doelgroep is **internationaal** — de site is bewust **Engelstalig only**.

## Stack

- Next.js (App Router) + TypeScript + Tailwind, framer-motion voor animaties
- Deploy via Vercel (Vercel Web Analytics actief, cookieless), Google Analytics achter cookie-consent
- Geen CMS: blogposts staan als HTML-strings in `lib/blog.ts`, overige content in `lib/content.ts` en `lib/faqs.ts`

## Structuur

- `app/` — routes; elke pagina heeft eigen metadata met canonical
- `components/` — gedeelde componenten; homepage-secties in `HomeSections.tsx`; `ProjectSchematic.tsx` bevat de handgemaakte SVG-blueprints per portfolioproject; `PageBlocks.tsx` de gedeelde editorial-blokken (InvestmentTiers, StepRail)
- `lib/dictionary.ts` — centrale copy voor Nav, Footer en homepage-secties; paginacopy staat in de pagina's zelf
- `next.config.js` — **alle 301-redirects staan hier**, plus security headers

## Belangrijke beslissingen (niet terugdraaien zonder overleg)

- **Juli 2026: Ömer blijft anoniem op de site.** Zijn naam mag nergens in de publieke sitecode staan (geen founder-blok, geen Person in JSON-LD). Het bedrijf presenteert zich als "Zoyare" / "one engineer, every project" — zonder naam. KvK-nummer in de footer blijft (wettelijk verplicht).

- **Juni 2026: NL-site verwijderd.** De site was kort tweetalig (`/nl/*` met NL-slugs zoals `/nl/diensten/maatwerk-software`), maar de doelgroep is internationaal. Alle `/nl/*` URL's én de oudere root-level NL-URL's (`/diensten/*`, NL-blogslugs) 301'en in één hop naar hun EN-tegenhanger via `next.config.js`. Verwijder die redirects niet — Google heeft deze URL's geïndexeerd.
- Geen hreflang/`languages`-alternates meer in metadata; de site is monolinguaal `en`.
- Sitemap (`app/sitemap.ts`) bevat alleen EN-routes.

## Werkafspraken

- Schrijf site-copy in het Engels; communiceer met Ömer in het Nederlands.
- **framer-motion: gebruik `m.` (niet `motion.`)** — de app draait onder `LazyMotion strict` (zie `components/MotionProvider.tsx`); `motion.` gooit een runtime error. Alleen `domAnimation`-features beschikbaar (geen drag/layout).
- Typografisch accent: laatste woord van paginakoppen in `font-display` (Instrument Serif italic). Oranje (`accent`) spaarzaam houden.
- Houd het log hieronder bij: **na elke betekenisvolle wijziging voeg je bovenaan één regel toe** (datum + wat + waarom). Maximaal ~15 regels; oudste regels mogen weg.

## Laatste wijzigingen

- 2026-07-09 — Money pages: service-specifieke FAQ's met FAQPage-schema op alle 4 service-pagina's (zero-JS `<details>`, `ServiceFaq` in PageBlocks), klant-quote per service (`PullQuote`), founder-blok op /about (Ömer + feitentabel), estimator→contact prefill via query params, Organization-logo in JSON-LD naar PNG (/apple-icon). Reden: conversie + E-E-A-T op de pagina's waar beslist wordt.
- 2026-07-08 — Meetbaarheid & UX: GA4-events op alle conversiepunten (`lib/track.ts`: estimate_completed, book_call_click, chat_opened, leadmagnet/contact_submitted, palette_opened), inhoudsopgave met h2-ankers op blogposts (≥3 koppen), RSS-feed op `/feed.xml`, ⌘K command palette (idle-deferred, entries uit layout), 404 met populaire links. Reden: marketing meetbaar maken + leesbaarheid + dev-doelgroep.
- 2026-07-08 — Consent: Google Consent Mode v2-signalen in GA-init (analytics granted na accept, ad-signalen denied tot de bannertekst om marketingconsent vraagt), cookiebanner + footer-knop tonen alleen nog als `NEXT_PUBLIC_GA_ID` gezet is. Reden: Consent Mode v2 is verplicht voor toekomstige Google Ads/remarketing in de EU; geen banner zonder tracker.
- 2026-07-08 — Features: interactieve Project Estimator op `/estimate` (3 vragen → prijsindicatie uit de gepubliceerde tiers; tiers in `EstimateWizard.tsx` synchroon houden met service-pagina's), categoriefilters op /blog (BlogExplorer, SEO-veilig via hidden-attribuut), "How it works"-strip op homepage, `/llms.txt` voor AI-crawlers. Reden: conversie + vindbaarheid.
- 2026-07-08 — Designpas: featured "Latest"-post + SEO-veilige load-more op /blog (alle links blijven in HTML, `hidden`-attribuut), "Book a call"-CTA in nav (desktop + mobiel menu), giant wordmark-watermerk in footer, testimonial-quotes in Instrument Serif, drafting-kruisjes op CTA-sectie. Reden: professionelere uitstraling + bloglijst werd te lang.
- 2026-07-08 — Grote onderhoudspas: API-routes gehard (HTML-escaping leadmagnet-mail, JSON/lengte/rol-validatie op alle drie routes, Anthropic first-message-must-be-user fix in chat), oneindige framer-animaties (marquee, hero-caret, scroll-bob, FloatingShape) → pure CSS, ChatWidget-chunk uitgesteld tot idle, edge runtime van OG-images af (nu statisch), BlogPosting-schema wees naar 404-image, related posts + share-rij op blogposts, skip-link, Amsterdam-klok in footer, dode exports verwijderd. Reden: performance/security-audit.
- 2026-07-06 — Wekelijkse blog: nieuwe post `how-long-does-custom-software-development-take` (realistische doorlooptijden per projecttype) + LinkedIn-draft. Reden: natuurlijk vervolg op de kosten-post, hoge-intentie zoekterm, nog niet behandeld. Tevens `generate-blog.mjs` naar EN omgezet (site is EN-only) + dedup tegen bestaande titels; NB: de GitHub Action faalt sinds juni op "credit balance too low" (API-key zonder tegoed).
- 2026-06-29 — Wekelijkse blog: nieuwe post `vendor-lock-in-software-code-ownership` (vendor lock-in: code/data/hosting-eigendom) + LinkedIn-draft. Reden: nog niet behandeld, hoge-intentie SEO; ondervangt tegelijk het "wat als je wegvalt"-bezwaar tegen een eenmansstudio.
- 2026-06-22 — Wekelijkse blog: nieuwe post `build-vs-buy-software-saas-or-custom` (build vs. buy: SaaS vs. maatwerk) + LinkedIn-draft. Reden: hoge-intentie SEO-onderwerp dat nog ontbrak; onderscheidt zich van de bestaande "wie bouwt het"- en "Excel→maatwerk"-posts.
- 2026-06-12 — Designpas: SVG-blueprints per project (`ProjectSchematic`), editorial-blokken op service-pagina's, per-post/case OG-images, LazyMotion (−17 à −28 kB First Load JS). Reden: portfolio miste visuals, binnenpagina's waren te uniform.
- 2026-06-12 — NL-site (`app/nl/*`, `lib/i18n/`, `lib/faqs-nl.ts`) verwijderd; 301-redirects `/nl/*` → EN in `next.config.js`; hreflang gestript; gedeelde copy verhuisd naar `lib/dictionary.ts`. Reden: internationale doelgroep, EN volstaat.
- 2026-06-05 — NL-site live gezet naast EN (commit `46e98ab`) — later teruggedraaid, zie hierboven.
- 2026-06-?? — Vercel Web Analytics toegevoegd (cookieless, geen consent nodig) (commit `545d9ba`).
