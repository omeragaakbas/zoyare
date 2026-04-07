import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const checklist = [
  {
    n: "01",
    vraag: "Wat is het concrete probleem dat je oplost?",
    toelichting:
      "Beschrijf het probleem, niet de gewenste oplossing. 'We willen een app' is geen probleem. 'We verwerken elke week handmatig 200 urenstaten en maken daarbij fouten' is een probleem.",
  },
  {
    n: "02",
    vraag: "Welke handmatige stappen kosten nu de meeste tijd?",
    toelichting:
      "Breng het huidige proces stap voor stap in kaart. Dit wordt de basis van de scope — en voorkomt dat je betaalt voor features die niemand nodig heeft.",
  },
  {
    n: "03",
    vraag: "Welke bestaande systemen moeten gekoppeld worden?",
    toelichting:
      "Elke integratie heeft impact op doorlooptijd en budget. Weet welke systemen een API hebben en welke niet — en vraag ernaar bij het eerste gesprek.",
  },
  {
    n: "04",
    vraag: "Wie zijn de eindgebruikers — intern of extern?",
    toelichting:
      "Intern gebruik stelt andere eisen dan een consumentenproduct. Externe gebruikers vereisen meer aandacht voor onboarding, foutmeldingen en toegankelijkheid.",
  },
  {
    n: "05",
    vraag: "Hoeveel gebruikers verwacht je — nu en over 3 jaar?",
    toelichting:
      "Software voor 10 interne medewerkers bouw je anders dan voor 10.000 externe klanten. Schaalbaarheid achteraf inbouwen is duur. Wees eerlijk over groeiverwachtingen.",
  },
  {
    n: "06",
    vraag: "Is er een interne eigenaar die beslissingen kan nemen?",
    toelichting:
      "Zonder een beslisser aan jouw kant loopt elk project vast. Wijs iemand aan die beschikbaar is voor vragen, feedback en go/no-go beslissingen.",
  },
  {
    n: "07",
    vraag: "Wie doet het onderhoud na oplevering?",
    toelichting:
      "Software is geen eenmalige aankoop. Servers, updates, nieuwe browsers, bugfixes — wie pakt dit op? Is er een onderhoudsbudget gereserveerd?",
  },
  {
    n: "08",
    vraag: "Wat is je beschikbare budget?",
    toelichting:
      "Een eerlijk budgetgesprek aan het begin bespaart iedereen tijd. Een engineer die weet wat het budget is, kan de scope daarop afstemmen — in plaats van een offerte te maken die nooit past.",
  },
  {
    n: "09",
    vraag: "Is de deadline hard of een richtlijn?",
    toelichting:
      "Een harde deadline (contractueel, event-gerelateerd, wettelijk) heeft directe impact op aanpak en kosten. Communiceer dit vooraf — niet achteraf.",
  },
  {
    n: "10",
    vraag: "Heb je al specificaties, wireframes of designs?",
    toelichting:
      "Hoe concreter de input, hoe nauwkeuriger de schatting. Een grove schets op papier is al waardevol. Niets hebben is ook prima — maar dan kost de discovery-fase meer tijd.",
  },
  {
    n: "11",
    vraag: "Wat gebeurt er als het project 2× zo lang duurt?",
    toelichting:
      "Software-projecten lopen vaker uit dan gepland. Is je bedrijfsvoering afhankelijk van de opleverdatum? Dan moet dat in de scope en contractafspraken verwerkt worden.",
  },
  {
    n: "12",
    vraag: "Hoe ziet succes er over 6 maanden uit?",
    toelichting:
      "Definieer concrete criteria: 'het handmatige proces is geëlimineerd', 'de koppeling verwerkt 500 transacties per dag zonder fouten'. Vaag succes leidt tot vage software.",
  },
];

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  let email: string;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Ongeldig e-mailadres." }, { status: 400 });
  }

  const checklistRows = checklist
    .map(
      (item) => `
      <tr>
        <td style="padding: 20px 0; border-bottom: 1px solid #1C1C1C; vertical-align: top;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="width: 36px; vertical-align: top; padding-top: 3px;">
                <span style="font-family: 'Courier New', monospace; font-size: 10px; color: #444; letter-spacing: 0.12em;">${item.n}</span>
              </td>
              <td style="vertical-align: top;">
                <p style="color: #EBEBEB; font-size: 15px; font-weight: 600; margin: 0 0 6px; letter-spacing: -0.02em; line-height: 1.3;">${item.vraag}</p>
                <p style="color: #585858; font-size: 13px; line-height: 1.65; margin: 0;">${item.toelichting}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
    )
    .join("");

  try {
    await Promise.all([
      // Checklist aan de lead
      resend.emails.send({
        from: "Ömer Akbas — Zoyare <hello@zoyare.com>",
        to: email,
        subject: "Checklist: 12 vragen voordat je maatwerk software laat bouwen",
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 40px 32px; background: #0D0D0D; color: #EBEBEB;">

            <div style="border-bottom: 1px solid #1C1C1C; padding-bottom: 24px; margin-bottom: 32px;">
              <p style="font-size: 20px; font-weight: 700; color: #EBEBEB; margin: 0 0 4px; letter-spacing: -0.03em;">Zoyare</p>
              <p style="font-family: 'Courier New', monospace; font-size: 10px; color: #444; letter-spacing: 0.15em; text-transform: uppercase; margin: 0;">Software built to scale.</p>
            </div>

            <h1 style="font-size: 22px; font-weight: 700; color: #EBEBEB; letter-spacing: -0.03em; margin: 0 0 10px; line-height: 1.2;">
              12 vragen die je moet stellen<br>voordat je maatwerk software laat bouwen.
            </h1>
            <p style="color: #585858; font-size: 14px; line-height: 1.7; margin: 0 0 36px;">
              De meeste software-projecten mislukken niet door slechte code — maar door onduidelijke verwachtingen.
              Gebruik deze checklist als voorbereiding op elk gesprek met een developer of agency.
            </p>

            <table style="width: 100%; border-collapse: collapse; border-top: 1px solid #1C1C1C;">
              ${checklistRows}
            </table>

            <div style="margin-top: 40px; padding: 24px; border: 1px solid #222; background: #131313;">
              <p style="color: #9A9A9A; font-size: 13px; line-height: 1.7; margin: 0 0 20px;">
                Heb je deze vragen beantwoord en ben je klaar om te starten? Ik geef graag een eerlijk advies over haalbaarheid, aanpak en kosten — gratis en vrijblijvend.
              </p>
              <a href="https://zoyare.com/contact" style="display: inline-block; background: #F15F0E; color: #0D0D0D; font-size: 13px; font-weight: 700; padding: 12px 24px; text-decoration: none; letter-spacing: -0.01em;">
                Plan een gesprek →
              </a>
            </div>

            <div style="margin-top: 32px; border-top: 1px solid #1C1C1C; padding-top: 24px;">
              <p style="color: #EBEBEB; font-size: 13px; font-weight: 600; margin: 0 0 2px;">Ömer Akbas</p>
              <p style="font-family: 'Courier New', monospace; font-size: 11px; color: #444; margin: 0 0 8px; letter-spacing: 0.04em;">Software Engineer & Founder — Zoyare</p>
              <a href="mailto:hello@zoyare.com" style="font-family: 'Courier New', monospace; color: #444; font-size: 11px; text-decoration: none;">hello@zoyare.com</a>
            </div>

          </div>
        `,
      }),

      // Notificatie aan Ömer
      resend.emails.send({
        from: "Zoyare Lead Magnet <noreply@zoyare.com>",
        to: "hello@zoyare.com",
        replyTo: email,
        subject: `Nieuwe checklist-lead: ${email}`,
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #080808; color: #F5F5F5;">
            <div style="border-bottom: 1px solid #1C1C1C; padding-bottom: 20px; margin-bottom: 24px;">
              <span style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #444;">Zoyare — Nieuwe lead via checklist</span>
            </div>
            <p style="color: #F5F5F5; font-size: 14px; margin: 0 0 8px;">
              <span style="color: #585858;">E-MAIL</span>&nbsp;&nbsp;
              <a href="mailto:${email}" style="color: #F15F0E; text-decoration: none;">${email}</a>
            </p>
            <p style="color: #585858; font-size: 12px; margin: 24px 0 0;">Voeg toe aan de leads sheet en follow-up binnen 48 uur.</p>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead magnet error:", err);
    return NextResponse.json({ error: "Er is iets misgegaan." }, { status: 500 });
  }
}
