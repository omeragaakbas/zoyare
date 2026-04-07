import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, company, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Velden naam, e-mail en bericht zijn verplicht." }, { status: 400 });
  }

  try {
    await Promise.all([
      // Notificatie aan Ömer
      resend.emails.send({
        from: "Zoyare Contact <noreply@zoyare.com>",
        to: "hello@zoyare.com",
        replyTo: email,
        subject: `Nieuw bericht van ${name}${company ? ` (${company})` : ""}`,
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #080808; color: #F5F5F5;">
            <div style="border-bottom: 1px solid #1C1C1C; padding-bottom: 24px; margin-bottom: 24px;">
              <span style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #444;">Zoyare — Nieuw contactbericht</span>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; font-size: 12px; width: 100px;">NAAM</td><td style="padding: 8px 0; color: #F5F5F5; font-size: 14px;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888; font-size: 12px;">E-MAIL</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C8FF00; text-decoration: none;">${email}</a></td></tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #888; font-size: 12px;">BEDRIJF</td><td style="padding: 8px 0; color: #F5F5F5; font-size: 14px;">${company}</td></tr>` : ""}
            </table>
            <div style="border-top: 1px solid #1C1C1C; margin-top: 24px; padding-top: 24px;">
              <div style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #444; margin-bottom: 12px;">BERICHT</div>
              <p style="color: #F5F5F5; font-size: 14px; line-height: 1.7; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            <div style="border-top: 1px solid #1C1C1C; margin-top: 32px; padding-top: 16px;">
              <span style="font-size: 11px; color: #444;">Reageer direct op deze e-mail om ${name} te antwoorden.</span>
            </div>
          </div>
        `,
      }),
      // Bevestigingsmail aan de lead
      resend.emails.send({
        from: "Ömer Akbas — Zoyare <hello@zoyare.com>",
        to: email,
        subject: "Bericht ontvangen — ik neem snel contact op",
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #080808; color: #F5F5F5;">
            <div style="border-bottom: 1px solid #1C1C1C; padding-bottom: 24px; margin-bottom: 32px;">
              <span style="font-size: 20px; font-weight: bold; color: #F5F5F5; letter-spacing: -0.03em;">Zoyare</span>
            </div>
            <p style="color: #F5F5F5; font-size: 16px; margin: 0 0 16px;">Hoi ${name},</p>
            <p style="color: #888; font-size: 14px; line-height: 1.7; margin: 0 0 24px;">Bedankt voor je bericht. Ik heb het goed ontvangen en neem binnen 24 uur contact met je op.</p>
            <p style="color: #888; font-size: 14px; line-height: 1.7; margin: 0 0 32px;">In de tussentijd kun je alvast meer lezen over mijn werkwijze en projecten op <a href="https://zoyare.com/portfolio" style="color: #F5F5F5; text-decoration: none;">zoyare.com/portfolio</a>.</p>
            <div style="border-top: 1px solid #1C1C1C; padding-top: 24px;">
              <p style="color: #F5F5F5; font-size: 14px; margin: 0 0 4px; font-weight: bold;">Ömer Akbas</p>
              <p style="color: #444; font-size: 12px; margin: 0;">Software Engineer & Founder — Zoyare</p>
              <a href="mailto:hello@zoyare.com" style="color: #888; font-size: 12px; text-decoration: none;">hello@zoyare.com</a>
            </div>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Er is iets misgegaan. Probeer het opnieuw of mail direct naar hello@zoyare.com." }, { status: 500 });
  }
}
