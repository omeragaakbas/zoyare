import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { rateLimitByIp } from "@/lib/rate-limit";

const checklist = [
  {
    n: "01",
    question: "What is the concrete problem you're solving?",
    explanation:
      "Describe the problem, not the desired solution. 'We want an app' is not a problem. 'We manually process 200 timesheets every week and make errors doing so' is a problem.",
  },
  {
    n: "02",
    question: "Which manual steps currently take the most time?",
    explanation:
      "Map the current process step by step. This becomes the basis of the scope — and prevents you from paying for features nobody needs.",
  },
  {
    n: "03",
    question: "Which existing systems need to be connected?",
    explanation:
      "Every integration impacts timeline and budget. Know which systems have an API and which don't — and ask about it in the first conversation.",
  },
  {
    n: "04",
    question: "Who are the end users — internal or external?",
    explanation:
      "Internal use has different requirements than a consumer product. External users require more attention to onboarding, error messages and accessibility.",
  },
  {
    n: "05",
    question: "How many users do you expect — now and in 3 years?",
    explanation:
      "Software for 10 internal employees is built differently than for 10,000 external customers. Retrofitting scalability is expensive. Be honest about growth expectations.",
  },
  {
    n: "06",
    question: "Is there an internal owner who can make decisions?",
    explanation:
      "Without a decision-maker on your side, every project stalls. Appoint someone who's available for questions, feedback and go/no-go decisions.",
  },
  {
    n: "07",
    question: "Who handles maintenance after delivery?",
    explanation:
      "Software isn't a one-time purchase. Servers, updates, new browsers, bug fixes — who handles this? Is there a maintenance budget reserved?",
  },
  {
    n: "08",
    question: "What's your available budget?",
    explanation:
      "An honest budget conversation at the start saves everyone time. An engineer who knows the budget can tailor the scope accordingly — instead of creating a quote that never fits.",
  },
  {
    n: "09",
    question: "Is the deadline hard or a guideline?",
    explanation:
      "A hard deadline (contractual, event-related, regulatory) has direct impact on approach and cost. Communicate this upfront — not after the fact.",
  },
  {
    n: "10",
    question: "Do you already have specifications, wireframes or designs?",
    explanation:
      "The more concrete the input, the more accurate the estimate. A rough sketch on paper is already valuable. Having nothing is fine too — but the discovery phase will take more time.",
  },
  {
    n: "11",
    question: "What happens if the project takes twice as long?",
    explanation:
      "Software projects run over more often than not. Is your business dependent on the delivery date? Then that needs to be built into the scope and contract agreements.",
  },
  {
    n: "12",
    question: "What does success look like in 6 months?",
    explanation:
      "Define concrete criteria: 'the manual process is eliminated', 'the integration processes 500 transactions per day without errors'. Vague success leads to vague software.",
  },
];

export async function POST(req: NextRequest) {
  const { ok } = rateLimitByIp(req, "leadmagnet", 3, 60 * 60 * 1000);
  if (!ok) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  let email: string;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
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
                <p style="color: #EBEBEB; font-size: 15px; font-weight: 600; margin: 0 0 6px; letter-spacing: -0.02em; line-height: 1.3;">${item.question}</p>
                <p style="color: #585858; font-size: 13px; line-height: 1.65; margin: 0;">${item.explanation}</p>
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
      resend.emails.send({
        from: "Zoyare <hello@zoyare.com>",
        to: email,
        subject: "Checklist: 12 questions to ask before commissioning custom software",
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 40px 32px; background: #0D0D0D; color: #EBEBEB;">

            <div style="border-bottom: 1px solid #1C1C1C; padding-bottom: 24px; margin-bottom: 32px;">
              <p style="font-size: 20px; font-weight: 700; color: #EBEBEB; margin: 0 0 4px; letter-spacing: -0.03em;">Zoyare</p>
              <p style="font-family: 'Courier New', monospace; font-size: 10px; color: #444; letter-spacing: 0.15em; text-transform: uppercase; margin: 0;">Software built to scale.</p>
            </div>

            <h1 style="font-size: 22px; font-weight: 700; color: #EBEBEB; letter-spacing: -0.03em; margin: 0 0 10px; line-height: 1.2;">
              12 questions you should ask<br>before commissioning custom software.
            </h1>
            <p style="color: #585858; font-size: 14px; line-height: 1.7; margin: 0 0 36px;">
              Most software projects don't fail because of bad code — but because of unclear expectations.
              Use this checklist to prepare for any conversation with a developer or agency.
            </p>

            <table style="width: 100%; border-collapse: collapse; border-top: 1px solid #1C1C1C;">
              ${checklistRows}
            </table>

            <div style="margin-top: 40px; padding: 24px; border: 1px solid #222; background: #131313;">
              <p style="color: #9A9A9A; font-size: 13px; line-height: 1.7; margin: 0 0 20px;">
                Answered these questions and ready to get started? We're happy to give honest advice on feasibility, approach and cost — free and no strings attached.
              </p>
              <a href="https://zoyare.com/contact" style="display: inline-block; background: #F15F0E; color: #0D0D0D; font-size: 13px; font-weight: 700; padding: 12px 24px; text-decoration: none; letter-spacing: -0.01em;">
                Schedule a call →
              </a>
            </div>

            <div style="margin-top: 32px; border-top: 1px solid #1C1C1C; padding-top: 24px;">
              <p style="color: #EBEBEB; font-size: 13px; font-weight: 600; margin: 0 0 2px;">Zoyare</p>
              <p style="font-family: 'Courier New', monospace; font-size: 11px; color: #444; margin: 0 0 8px; letter-spacing: 0.04em;">Software Engineering Studio</p>
              <a href="mailto:hello@zoyare.com" style="font-family: 'Courier New', monospace; color: #444; font-size: 11px; text-decoration: none;">hello@zoyare.com</a>
            </div>

          </div>
        `,
      }),

      resend.emails.send({
        from: "Zoyare Lead Magnet <noreply@zoyare.com>",
        to: "hello@zoyare.com",
        replyTo: email,
        subject: `New checklist lead: ${email}`,
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #080808; color: #F5F5F5;">
            <div style="border-bottom: 1px solid #1C1C1C; padding-bottom: 20px; margin-bottom: 24px;">
              <span style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #444;">Zoyare — New lead via checklist</span>
            </div>
            <p style="color: #F5F5F5; font-size: 14px; margin: 0 0 8px;">
              <span style="color: #585858;">EMAIL</span>&nbsp;&nbsp;
              <a href="mailto:${email}" style="color: #F15F0E; text-decoration: none;">${email}</a>
            </p>
            <p style="color: #585858; font-size: 12px; margin: 24px 0 0;">Add to leads sheet and follow up within 48 hours.</p>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead magnet error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
