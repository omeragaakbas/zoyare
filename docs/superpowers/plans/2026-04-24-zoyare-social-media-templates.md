# Zoyare Social Media Templates — Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 6 Canva-templates aanmaken (LinkedIn, Instagram, X — elk donker + licht) met Zoyare branding, klaar voor handmatige verfijning.

**Architecture:** Canva MCP genereert base templates via `generate-design`. Per platform eerst de donkere variant, dan de lichte. Gebruiker bevestigt elke kandidaat, waarna `create-design-from-candidate` het toevoegt aan het Canva-account. Logo wordt handmatig in Canva toegevoegd na achtergrond verwijdering.

**Tech Stack:** Canva MCP (`generate-design`, `list-brand-kits`, `create-design-from-candidate`), Canva web editor voor verfijning.

---

## Beperkingen (belangrijk)

- `upload-asset-from-url` vereist een publieke URL — het logo-PNG staat lokaal, dus dit is een handmatige stap
- LinkedIn heeft geen eigen design_type in de MCP — we gebruiken `facebook_post` (1200×628px, zelfde formaat)
- `generate-design` genereert kandidaten; gebruiker kiest er één; dan `create-design-from-candidate` om op te slaan

---

## Task 1: Check Canva brand kit

**Doel:** Controleer of er al een Zoyare brand kit bestaat in Canva.

- [ ] **Stap 1: Haal brand kits op**

  Roep `list-brand-kits` aan.

- [ ] **Stap 2: Beoordeel resultaat**

  - Als er een Zoyare brand kit bestaat: noteer het `brand_kit_id` — gebruik het in alle volgende `generate-design` calls.
  - Als er geen brand kit is: sla brand_kit_id over, voeg merkkleuren handmatig toe in stap 3 van de query.

---

## Task 2: Instagram — donkere template

**Formaat:** 1080 × 1080 px (`instagram_post`)

- [ ] **Stap 1: Genereer kandidaten**

  Roep `generate-design` aan met:
  ```
  design_type: "instagram_post"
  query: "Professional dark tech brand social media post template for Zoyare, a software company. Dark background #1A1916 near-black. Bold headline area at top with orange accent line (#F15F0E, 3px height). Clean sans-serif typography in white. Short body text area in grey. Bottom section with horizontal divider and logo placeholder. Tagline area bottom right: 'zoyare.com'. Minimalist, professional, B2B tech aesthetic. No people, no photos. Pure typography and geometric design."
  ```

- [ ] **Stap 2: Toon kandidaten aan gebruiker**

  Vraag welke kandidaat het meest aansluit bij het design.

- [ ] **Stap 3: Sla gekozen kandidaat op**

  Roep `create-design-from-candidate` aan met het gekozen kandidaat-ID.
  Noteer het design-ID voor de gebruiker.

---

## Task 3: Instagram — lichte template

**Formaat:** 1080 × 1080 px (`instagram_post`)

- [ ] **Stap 1: Genereer kandidaten**

  Roep `generate-design` aan met:
  ```
  design_type: "instagram_post"
  query: "Professional light tech brand social media post template for Zoyare, a software company. Light warm cream background #F8F6F2. Bold headline area at top with orange accent line (#F15F0E, 3px height). Clean sans-serif typography in near-black #1A1916. Short body text area in muted grey #5C5854. Bottom section with horizontal divider #D9D5CC and logo placeholder. Tagline area: 'zoyare.com'. Minimalist, professional, B2B tech aesthetic. No people, no photos. Pure typography and geometric design."
  ```

- [ ] **Stap 2: Toon kandidaten aan gebruiker**

- [ ] **Stap 3: Sla gekozen kandidaat op**

  Roep `create-design-from-candidate` aan. Noteer design-ID.

---

## Task 4: LinkedIn — donkere template

**Formaat:** 1200 × 628 px — gebruik `facebook_post` (zelfde dimensies)

- [ ] **Stap 1: Genereer kandidaten**

  Roep `generate-design` aan met:
  ```
  design_type: "facebook_post"
  query: "Professional dark LinkedIn social media post template for Zoyare, a B2B software company (1200x628px landscape). Dark background #1A1916 near-black. Bold headline on left side with orange accent line (#F15F0E). White sans-serif typography. Short body text in grey. Logo placeholder bottom-left. Right side clean with subtle geometric accent. Minimalist, corporate-tech aesthetic. No photos, no people. Pure layout and typography."
  ```

- [ ] **Stap 2: Toon kandidaten aan gebruiker**

- [ ] **Stap 3: Sla gekozen kandidaat op**

  Roep `create-design-from-candidate` aan. Noteer design-ID.

---

## Task 5: LinkedIn — lichte template

**Formaat:** 1200 × 628 px — gebruik `facebook_post`

- [ ] **Stap 1: Genereer kandidaten**

  Roep `generate-design` aan met:
  ```
  design_type: "facebook_post"
  query: "Professional light LinkedIn social media post template for Zoyare, a B2B software company (1200x628px landscape). Light warm cream background #F8F6F2. Bold headline on left with orange accent line (#F15F0E). Near-black typography #1A1916. Muted body text #5C5854. Logo placeholder bottom-left. Subtle border #D9D5CC. Minimalist, professional aesthetic. No photos, no people."
  ```

- [ ] **Stap 2: Toon kandidaten aan gebruiker**

- [ ] **Stap 3: Sla gekozen kandidaat op**

  Roep `create-design-from-candidate` aan. Noteer design-ID.

---

## Task 6: X / Twitter — donkere template

**Formaat:** 1200 × 675 px (`twitter_post`)

- [ ] **Stap 1: Genereer kandidaten**

  Roep `generate-design` aan met:
  ```
  design_type: "twitter_post"
  query: "Professional dark Twitter/X social media post template for Zoyare, a software company. Dark background #1A1916. Bold headline with orange accent line (#F15F0E). White clean typography. Short body text in grey. Logo placeholder bottom-left, website bottom-right. Sharp, modern tech aesthetic. Landscape format. No photos."
  ```

- [ ] **Stap 2: Toon kandidaten aan gebruiker**

- [ ] **Stap 3: Sla gekozen kandidaat op**

  Roep `create-design-from-candidate` aan. Noteer design-ID.

---

## Task 7: X / Twitter — lichte template

**Formaat:** 1200 × 675 px (`twitter_post`)

- [ ] **Stap 1: Genereer kandidaten**

  Roep `generate-design` aan met:
  ```
  design_type: "twitter_post"
  query: "Professional light Twitter/X social media post template for Zoyare, a software company. Warm cream background #F8F6F2. Bold headline with orange accent line (#F15F0E). Near-black typography #1A1916. Muted body text #5C5854. Logo placeholder bottom-left. Clean minimal layout. No photos."
  ```

- [ ] **Stap 2: Toon kandidaten aan gebruiker**

- [ ] **Stap 3: Sla gekozen kandidaat op**

  Roep `create-design-from-candidate` aan. Noteer design-ID.

---

## Task 8: Handmatige verfijning (gebruiker in Canva)

Na het aanmaken van alle 6 templates opent de gebruiker elk design in Canva en doet het volgende:

- [ ] **Stap 1: Logo transparant maken**
  - Ga naar canva.com → Uploads
  - Upload `C:\Users\OmerA\Downloads\7a52d7f7931f77ae2eaf04d5dabc28a5489bc313.png`
  - Klik op de afbeelding → **"Edit image"** → **"Background Remover"**
  - Sla op als nieuw asset

- [ ] **Stap 2: Logo toevoegen aan templates**
  - Open elk template
  - Verwijder het logo-placeholder tekstvak onderaan
  - Voeg het transparante logo-PNG toe op die plek
  - Schaal naar passende grootte (circa 20-25% van de template breedte)
  - Voor donkere templates: gebruik de witte wordmark versie (maak dit in Figma of via Canva kleurfilter)

- [ ] **Stap 3: Typography aanpassen**
  - Verander alle fonts naar **Space Grotesk** (beschikbaar in Canva)
  - Pas headline-grootte aan per platform

- [ ] **Stap 4: Templates opslaan**
  - Klik op de naam bovenaan → hernoem naar bijv. `Zoyare — Instagram Donker`
  - Gebruik "Use as template" zodat je makkelijk kopieën maakt per post

---

## Notities

- **Witte wordmark voor donkere templates:** De huidige logo-PNG heeft een zwart wordmark. Voor donkere achtergronden: open het logo in Figma, zet de tekstkleur op wit, exporteer opnieuw als PNG.
- **Brand kit aanmaken:** Na verfijning is het nuttig om in Canva een brand kit aan te maken met de Zoyare kleuren en fonts — dan worden ze automatisch toegepast in toekomstige designs.
- **Fase 2 (blog templates):** Zelfde workflow, andere query — voeg blog-titel, excerpt en CTA-knop toe aan de template structuur.
