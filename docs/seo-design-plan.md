# Zoyare — SEO & Design boost-plan

> Doel: betere vindbaarheid (organic), strakkere visuele identiteit, hogere conversie van bezoek → call.
> Looptijd: 4 weken voor Phase 1–3, doorlopend voor Phase 4.

---

## TL;DR — wat is er nu en wat ontbreekt

**Goed**:
- Solide metadata, sitemap, robots, OG-tags, GA4
- Organization + WebSite + ProfessionalService JSON-LD in `layout.tsx`
- Per-page metadata met canonicals, OG, en `metadataBase`
- Static export-vriendelijke Next 14 setup

**Kritiek (Phase 1)**:
- `/og-image.png` bestaat **niet** in `/public` → social sharing toont kapotte preview
- Logo's zijn inconsistent: `Logo.tsx` (vectorized brand) ≠ `logo.svg`/`logo-light.svg` (simpele geometrische letters) ≠ `favicon.svg` (isometrische kubus)
- Geen `FAQPage` schema → mist potentiële rich-result in SERP
- Service-pagina's hebben geen `Service` schema
- Blog `Article` schema mist `image` en `dateModified`
- Geen `BreadcrumbList`
- Geen `site.webmanifest` of `apple-touch-icon`

**Verbeterruimte (Phase 2+)**:
- Geen `prefers-reduced-motion` handling — toegankelijkheid + iOS Safari hick-ups
- Custom cursor verbergt native cursor globaal — risico op verlies van click-affordance
- Geen interne linking-strategie tussen blog/services/portfolio
- Sitemap heeft geen `lastModified` per blog-post
- Site is `lang="en"` maar `areaServed: NL` — niet expliciet voor NL-zoekers

---

## Phase 1 — Direct (deze sessie, ~2u werk)

| # | Action | Bestand(en) | Impact |
|---|--------|-------------|--------|
| 1 | Logo's gelijktrekken met `Logo.tsx` | `public/logo.svg`, `public/logo-light.svg`, `public/favicon.svg` | Brand consistency |
| 2 | Dynamische OG-image (Next 14 native) | `app/opengraph-image.tsx` | Social sharing fixed |
| 3 | FAQ JSON-LD | `app/faq/page.tsx` | Rich result kandidaat |
| 4 | Service JSON-LD per service | `app/services/*/page.tsx` | Service rich snippets |
| 5 | BreadcrumbList JSON-LD | shared helper in `lib/` | SERP breadcrumbs |
| 6 | Blog `Article` → `BlogPosting` + image/dateModified | `app/blog/[slug]/page.tsx` | Article cards in Discover |
| 7 | Webmanifest + apple-touch-icon | `app/manifest.ts` | PWA-readiness, iOS bookmark |

---

## Phase 2 — Week 1 (design polish + technische SEO)

- [ ] `prefers-reduced-motion` respecteren in `framer-motion` (centrale wrapper)
- [ ] Custom cursor: alleen op `(hover: hover) and (pointer: fine)` én via `data-cursor="off"` opt-out
- [ ] Image audit: alle `<img>`/`Image` checks op `alt`, dimensies en `priority` op hero
- [ ] `lib/blog.ts`: `dateModified` uit frontmatter ondersteunen
- [ ] Sitemap per-blog `lastModified` op echte mtime
- [ ] Internal linking helper: per blog-post 2–3 contextual links naar relevante services
- [ ] 404-pagina styling check (`app/not-found.tsx`)
- [ ] `humans.txt` + `security.txt` (klein, maar professioneel)

## Phase 3 — Week 2–3 (zichtbaarheid extern)

- [ ] Google Search Console verifiëren + sitemap submitten
- [ ] Bing Webmaster Tools verifiëren
- [ ] Google Business Profile (NL) aanmaken — locatie + categorieën + 3 foto's
- [ ] Core Web Vitals via PageSpeed Insights → fix ≥ 90 op LCP/CLS/INP voor home, /services/*, /portfolio
- [ ] LinkedIn Company Page → optimaliseren met dezelfde tagline + link
- [ ] 1× gastblog pitchen op een Mendix-community of NL-dev blog (backlink)

## Phase 4 — Week 3–4 + doorlopend (content & conversie)

- [ ] Content cadence: 1 blog/week. Topics op long-tail intent ("mendix BuildingX connector tutorial", "react native vs flutter MKB", "API integratie kosten")
- [ ] Per case in portfolio: detailpagina uitbouwen tot mini case-study (problem → approach → result → metrics)
- [ ] CTA A/B-test: huidige "View work / Schedule a call" vs "Free 30-min call / View work"
- [ ] GA4 events: `cta_click`, `nav_to_contact`, `form_submit`, `outbound_cal`
- [ ] Lead magnet conversie meten — als <5%, nieuwe hook testen
- [ ] Backlinks: 3 outreach-mails per week (Mendix partners, NL software-directories, podcasts)

---

## KPI's om te volgen

| Metric | Waar | Doel 30 dagen | Doel 90 dagen |
|--------|------|---------------|---------------|
| Indexed pages | Search Console | ≥ 15 | ≥ 30 (incl. blog) |
| Organic clicks/week | Search Console | 5 | 25 |
| Avg. position top-5 keywords | Search Console | 30 | 15 |
| Calls scheduled | Cal.com | 1 | 4 |
| LCP (mobile, home) | PSI | < 2.5s | < 2.0s |

---

## Risico's & open keuzes

1. **NL vs EN content**: site is volledig EN, maar je werkt NL/B2B. Optie: tweede taal (`/nl/...`) + hreflang. Beslissing parkeren tot Phase 2.
2. **`cursor: none` globaal**: kan client-irritatie geven op trackpads / nieuwe bezoekers. Phase 2 fix.
3. **OG-image styling**: Phase 1 = generieke template. Later (Phase 4) → per-page dynamic OG met titel.
4. **Logo "exact" reproduceren**: huidige bron-of-truth = `components/Logo.tsx` (de vectorized brand letterforms). De drie SVG-bestanden in `/public` worden daarop afgestemd.
