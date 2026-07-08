import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { rateLimitByIp } from "@/lib/rate-limit";

const SYSTEM_PROMPT = `You are the digital assistant of Zoyare — a software engineering studio.

ABOUT ZOYARE:
Zoyare builds custom software for businesses that need more than off-the-shelf solutions. No ready-made SaaS, but software that fits the client's process exactly.

SERVICES:
1. Custom Software — From requirement to deployment. Complex business processes translated into working software.
2. API & Integrations — Systems that don't talk to each other, connected. REST APIs, platform connectors, data pipelines.
3. Mobile Applications — iOS and Android apps via React Native. Focus on speed, reliability and UX.
4. Process Automation — Automate manual workflows. Fewer errors, less time, more control.

PROJECTS (examples):
- Siemens BuildingX Connector — Enterprise IoT integration via Mendix/Java
- StrateX Workforce Management — Back-end architecture and RESTful APIs
- StudyBuddy — Student matching platform (mobile app)
- ProAspect — Freelancer invoicing automation

AVAILABILITY: The team is currently available for new projects.
CONTACT: hello@zoyare.com | Response within 24 hours.

YOUR ROLE:
- Answer questions about Zoyare's services, approach and projects
- Help visitors assess whether Zoyare is the right partner
- Ask targeted questions to understand the visitor's project
- Always direct concrete inquiries to the contact form (/contact)
- Keep answers short and direct — no unnecessary fluff
- Respond in English by default, unless the visitor writes in another language
- Don't mention prices — the team discusses those in a tailored conversation`;

export async function POST(req: NextRequest) {
  const { ok } = rateLimitByIp(req, "chat", 30, 60 * 60 * 1000);
  if (!ok) {
    return new Response("Too many requests. Try again later.", { status: 429 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  let messages: unknown;
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response("Invalid request.", { status: 400 });
  }

  const valid =
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.every(
      (msg) =>
        msg &&
        typeof msg === "object" &&
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string" &&
        msg.content.length <= 2000
    );
  if (!valid) {
    return new Response("Invalid request.", { status: 400 });
  }

  // The API requires the first message to be from the user — drop the
  // widget's assistant greeting (and anything else) before the first user turn.
  const recent = (messages as { role: "user" | "assistant"; content: string }[]).slice(-10);
  const firstUser = recent.findIndex((msg) => msg.role === "user");
  if (firstUser === -1) {
    return new Response("Invalid request.", { status: 400 });
  }

  try {
    const stream = client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: recent.slice(firstUser),
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
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response("Something went wrong.", { status: 500 });
  }
}
