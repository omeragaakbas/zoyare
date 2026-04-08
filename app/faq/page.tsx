"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

const faqs = [
  {
    category: "Kosten & Doorlooptijd",
    items: [
      {
        q: "Wat kost maatwerk software laten bouwen?",
        a: "Dat hangt af van de complexiteit. Als richtlijn: een kleine automatisering of tool kost €5.000–€20.000 (2–6 weken). Een middelgroot systeem met API-integraties €20.000–€75.000 (2–4 maanden). Een enterprise platform of mobiele app €75.000+ (4–12 maanden). Ik geef altijd een eerlijke inschatting na een gratis gesprek — zonder verborgen kosten achteraf.",
      },
      {
        q: "Hoe lang duurt een typisch project?",
        a: "Een eenvoudige automatisering: 2–6 weken. Een API-integratie: 2–8 weken. Een mobiele app of groter systeem: 3–6 maanden voor een solide MVP. Ik werk in sprints zodat je vroeg kunt bijsturen — niet 6 maanden wachten op één grote oplevering.",
      },
      {
        q: "Werk je met vaste prijs of uurtarief?",
        a: "Beide zijn mogelijk, afhankelijk van het project. Voor duidelijk afgebakende projecten werk ik liever met een vaste prijs — dat geeft jou zekerheid. Voor doorlopende samenwerking of projecten met een onduidelijke scope is een uurtarief eerlijker. Ik leg dit altijd voor aan het begin.",
      },
      {
        q: "Wat is de minimale projectgrootte?",
        a: "Er is geen strikte ondergrens, maar voor projecten onder €3.000 is maatwerk zelden de slimste keuze. Dan zijn er betere alternatieven (no-code tools, bestaande SaaS). Als ik denk dat een standaardoplossing beter past, zeg ik dat ook.",
      },
    ],
  },
  {
    category: "Samenwerking & Werkwijze",
    items: [
      {
        q: "Hoe ziet het eerste gesprek eruit?",
        a: "Een half uur, gratis en vrijblijvend. Geen verkooppraatje. We bespreken je probleem, het huidige proces en wat je wilt bereiken. Daarna geef ik een eerlijk advies: of maatwerk de juiste oplossing is, hoe ik het zou aanpakken en een globale prijsindicatie.",
      },
      {
        q: "Werk je alleen of met een team?",
        a: "Ik werk als solo engineer — dat is bewust. Geen PM-laag, geen doorschuiven naar juniors. Jij werkt direct met de persoon die de code schrijft. Voor specifieke onderdelen (design, security audit) schakel ik geselecteerde specialisten in, maar de verantwoordelijkheid en aansturing liggen altijd bij mij.",
      },
      {
        q: "Hoe verloopt de communicatie tijdens een project?",
        a: "Wekelijkse updates, directe toegang via e-mail of chat, en sprint-reviews waarbij je de voortgang ziet voordat het opgeleverd is. Ik geloof niet in maandenlange stilte gevolgd door één grote oplevering. Je weet altijd wat er gemaakt wordt en waarom.",
      },
      {
        q: "Kan ik bestaande software laten uitbreiden of verbouwen?",
        a: "Ja. Ik kijk eerst naar wat er staat — code-review, architectuur, documentatie. Dan geef ik een eerlijk oordeel: doorontwikkelen of opnieuw beginnen. Soms is een herstart goedkoper op de lange termijn. Dat oordeel geef ik zonder commercieel belang.",
      },
    ],
  },
  {
    category: "Techniek & Oplevering",
    items: [
      {
        q: "Welke technologieën gebruik je?",
        a: "Voor back-end en APIs: Node.js, TypeScript, PostgreSQL, REST. Voor mobiele apps: React Native via Expo. Voor enterprise integraties: Java, Mendix, REST APIs. Voor web: Next.js, React. Ik kies de technologie die past bij het probleem — niet bij wat toevallig mijn favoriet is.",
      },
      {
        q: "Wie beheert de software na oplevering?",
        a: "Dat spreken we vooraf af. Opties: jijzelf (ik lever volledige documentatie en broncode), een intern team, of ik via een onderhoudscontract. Ik zorg altijd voor een overdracht waarbij elke competente developer verder kan — geen vendor lock-in.",
      },
      {
        q: "Krijg ik de broncode?",
        a: "Altijd. De broncode is volledig van jou. Je bent nooit afhankelijk van mij voor toegang tot je eigen software.",
      },
      {
        q: "Hoe zit het met testing en kwaliteit?",
        a: "Automatische tests zijn standaard onderdeel van mijn opleveringen, geen extra optie. Ik lever ook een staging-omgeving zodat je kunt testen voordat iets live gaat. Bugs die na oplevering opduiken en terug te leiden zijn naar mijn code, los ik op.",
      },
    ],
  },
  {
    category: "Specifieke Situaties",
    items: [
      {
        q: "Ik weet niet zeker of ik maatwerk software nodig heb. Wat dan?",
        a: "Plan een gratis gesprek in. Ik help je objectief beoordelen of maatwerk de juiste keuze is. Als een no-code tool of SaaS-pakket beter past bij jouw situatie, zeg ik dat eerlijk — ook als dat betekent dat ik geen opdracht krijg.",
      },
      {
        q: "Werken jullie ook met NDA's en vertrouwelijkheidsovereenkomsten?",
        a: "Ja. Voor gevoelige projecten teken ik standaard een NDA voordat we inhoudelijk praten. Dat is normaal en geen enkel probleem.",
      },
      {
        q: "Kan Zoyare ook ondersteunen bij een Europese aanbesteding of enterprise inkoopproces?",
        a: "Ja. Ik heb ervaring met enterprise procurement-processen (o.a. Siemens) en kan de benodigde documentatie aanleveren. Neem contact op voor de specifieke vereisten van jouw organisatie.",
      },
    ],
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  function toggle(key: string) {
    setOpen((prev) => (prev === key ? null : key));
  }

  return (
    <div className="pt-32 px-6 md:px-12 pb-32">
      {/* Header */}
      <FadeIn className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">FAQ</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] max-w-2xl">
          Veelgestelde
          <br />
          <span className="text-accent">vragen.</span>
        </h1>
      </FadeIn>

      {/* FAQ Sections */}
      <div className="border-t border-border">
        {faqs.map((section, si) => (
          <FadeIn key={section.category} delay={si * 0.05}>
            <div className="py-16 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Category label */}
              <div className="lg:col-span-3">
                <p className="font-mono text-xs text-muted tracking-widest uppercase sticky top-24">
                  {section.category}
                </p>
              </div>

              {/* Questions */}
              <div className="lg:col-span-8 lg:col-start-5 flex flex-col divide-y divide-border">
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const isOpen = open === key;

                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${key}`}
                        className="w-full flex items-start justify-between gap-6 py-6 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                      >
                        <span
                          className={`text-base font-medium leading-snug transition-colors duration-200 ${
                            isOpen ? "text-accent" : "text-primary group-hover:text-accent"
                          }`}
                        >
                          {item.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          aria-hidden="true"
                          className={`shrink-0 text-xl leading-none mt-0.5 transition-colors duration-200 ${
                            isOpen ? "text-accent" : "text-muted group-hover:text-primary"
                          }`}
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="answer"
                            id={`faq-answer-${key}`}
                            role="region"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-secondary text-sm leading-relaxed pb-6 max-w-2xl">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* CTA */}
      <FadeIn className="pt-20 max-w-xl">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
          Staat je vraag er niet bij?
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary leading-tight mb-8">
          Stel hem direct.
        </h2>
        <Link
          href="/contact"
          className="group relative inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium overflow-hidden"
        >
          <motion.span
            className="absolute inset-0 bg-accent"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="relative group-hover:text-primary transition-colors duration-300">
            Neem contact op →
          </span>
        </Link>
      </FadeIn>
    </div>
  );
}
