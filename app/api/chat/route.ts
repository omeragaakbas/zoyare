import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `Je bent de digitale assistent van Zoyare — een software engineering studio opgericht door Ömer Akbas.

OVER ZOYARE:
Zoyare bouwt maatwerk software voor ondernemingen die verder willen dan standaard oplossingen. Geen kant-en-klare SaaS, maar software die exact past bij het proces van de klant.

DIENSTEN:
1. Maatwerk Software — Van requirement tot deployment. Complexe bedrijfsprocessen vertaald naar werkende software.
2. API & Integraties — Systemen die niet met elkaar praten, verbonden. REST APIs, platform-connectoren, data-pipelines.
3. Mobiele Applicaties — iOS en Android apps via React Native. Focus op snelheid, betrouwbaarheid en UX.
4. Process Automation — Handmatige workflows automatiseren. Minder fouten, minder tijd, meer controle.

PROJECTEN (voorbeelden):
- Siemens BuildingX Connector — Enterprise IoT-integratie via Mendix/Java
- StrateX Workforce Management — Back-end architectuur en RESTful APIs
- StudyBuddy — Student matching platform (mobiele app)
- ProAspect — ZZP facturatie automatisering

BESCHIKBAARHEID: Ömer is momenteel beschikbaar voor nieuwe projecten.
CONTACT: hello@zoyare.com | Reactie binnen 24 uur.

JOUW ROL:
- Beantwoord vragen over de diensten, werkwijze en projecten van Zoyare
- Help bezoekers inschatten of Zoyare de juiste partner is
- Stel gerichte vragen om het project van de bezoeker te begrijpen
- Stuur concrete aanvragen altijd door naar het contactformulier (/contact)
- Houd antwoorden kort en direct — geen onnodige opsmuk
- Spreek Nederlands, tenzij de bezoeker Engels schrijft
- Noem geen prijzen — die bespreekt Ömer in een gesprek op maat`;

export async function POST(req: NextRequest) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const { messages } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response("Ongeldige aanvraag.", { status: 400 });
  }

  try {
    const stream = client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response("Er is iets misgegaan.", { status: 500 });
  }
}
