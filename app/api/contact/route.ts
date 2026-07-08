import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { rateLimitByIp } from "@/lib/rate-limit";

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  const { ok } = rateLimitByIp(req, "contact", 5, 60 * 60 * 1000);
  if (!ok) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  let name: unknown, email: unknown, company: unknown, message: unknown;
  try {
    ({ name, email, company, message } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" || !message.trim()
  ) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (company !== undefined && company !== null && typeof company !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (name.length > 200 || email.length > 254 || (company?.length ?? 0) > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const safeName = esc(name);
  const safeEmail = esc(email);
  const safeCompany = company ? esc(company) : "";
  const safeMessage = esc(message).replace(/\n/g, "<br>");

  try {
    await Promise.all([
      resend.emails.send({
        from: "Zoyare Contact <noreply@zoyare.com>",
        to: "hello@zoyare.com",
        replyTo: email,
        subject: `New message from ${name.replace(/[\r\n]/g, " ")}${company ? ` (${company.replace(/[\r\n]/g, " ")})` : ""}`,
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #080808; color: #F5F5F5;">
            <div style="border-bottom: 1px solid #1C1C1C; padding-bottom: 24px; margin-bottom: 24px;">
              <span style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #444;">Zoyare — New contact message</span>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; font-size: 12px; width: 100px;">NAME</td><td style="padding: 8px 0; color: #F5F5F5; font-size: 14px;">${safeName}</td></tr>
              <tr><td style="padding: 8px 0; color: #888; font-size: 12px;">EMAIL</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #C8FF00; text-decoration: none;">${safeEmail}</a></td></tr>
              ${safeCompany ? `<tr><td style="padding: 8px 0; color: #888; font-size: 12px;">COMPANY</td><td style="padding: 8px 0; color: #F5F5F5; font-size: 14px;">${safeCompany}</td></tr>` : ""}
            </table>
            <div style="border-top: 1px solid #1C1C1C; margin-top: 24px; padding-top: 24px;">
              <div style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #444; margin-bottom: 12px;">MESSAGE</div>
              <p style="color: #F5F5F5; font-size: 14px; line-height: 1.7; margin: 0;">${safeMessage}</p>
            </div>
            <div style="border-top: 1px solid #1C1C1C; margin-top: 32px; padding-top: 16px;">
              <span style="font-size: 11px; color: #444;">Reply directly to this email to respond to ${safeName}.</span>
            </div>
          </div>
        `,
      }),
      resend.emails.send({
        from: "Zoyare <hello@zoyare.com>",
        to: email,
        subject: "Message received — we'll be in touch soon",
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #080808; color: #F5F5F5;">
            <div style="border-bottom: 1px solid #1C1C1C; padding-bottom: 24px; margin-bottom: 32px;">
              <span style="font-size: 20px; font-weight: bold; color: #F5F5F5; letter-spacing: -0.03em;">Zoyare</span>
            </div>
            <p style="color: #F5F5F5; font-size: 16px; margin: 0 0 16px;">Hi ${safeName},</p>
            <p style="color: #888; font-size: 14px; line-height: 1.7; margin: 0 0 24px;">Thanks for your message. We've received it and will get back to you within 24 hours.</p>
            <p style="color: #888; font-size: 14px; line-height: 1.7; margin: 0 0 32px;">In the meantime, feel free to check out our approach and projects at <a href="https://zoyare.com/portfolio" style="color: #F5F5F5; text-decoration: none;">zoyare.com/portfolio</a>.</p>
            <div style="border-top: 1px solid #1C1C1C; padding-top: 24px;">
              <p style="color: #F5F5F5; font-size: 14px; margin: 0 0 4px; font-weight: bold;">Zoyare</p>
              <p style="color: #444; font-size: 12px; margin: 0;">Software Engineering Studio</p>
              <a href="mailto:hello@zoyare.com" style="color: #888; font-size: 12px; text-decoration: none;">hello@zoyare.com</a>
            </div>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Something went wrong. Try again or email hello@zoyare.com directly." }, { status: 500 });
  }
}
