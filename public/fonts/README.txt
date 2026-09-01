Fonts vendored for server-side image rendering (satori / next/og).

Why these files exist alongside next/font: next/font caches woff2, which satori
cannot read, and satori has no access to system fonts. Every ImageResponse —
the OG images under app/ and the social slides from scripts/social — reads these
files so the generated images are set in the same faces as the site itself.

  Space Grotesk      Florian Karsten          SIL Open Font License 1.1
                     https://fonts.google.com/specimen/Space+Grotesk
  Space Mono         Colophon Foundry         SIL Open Font License 1.1
                     https://fonts.google.com/specimen/Space+Mono
  Instrument Serif   Rodrigo Fuenzalida,      SIL Open Font License 1.1
                     Jordan Egstad
                     https://fonts.google.com/specimen/Instrument+Serif

All three are licensed under the SIL Open Font License, Version 1.1, which
permits bundling and redistribution with this software. Full licence text:
https://openfontlicense.org

Do not rename these files: lib/og-elements.tsx and scripts/social/render.mjs
both look them up by name.
