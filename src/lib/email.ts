import { Resend } from "resend";

/** Bez „noreply” — lepsza reputacja i dostarczalność (Resend Insights). */
const FROM_DEFAULT = "VoiceLink <kontakt@voicelink.pl>";
const TO_DEFAULT = "karol.kulis@voicelink.pl";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br />");
}

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("Brak zmiennej środowiskowej RESEND_API_KEY.");
  }
  return new Resend(key);
}

export function getNotificationTo(): string {
  return process.env.RESEND_TO_EMAIL?.trim() || TO_DEFAULT;
}

export function getFromAddress(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || FROM_DEFAULT;
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<{ id?: string }> {
  const resend = getResend();
  const to = getNotificationTo();
  const from = getFromAddress();

  const html = `
    <h2>Nowa wiadomość z formularza kontaktowego</h2>
    <p><strong>Imię i nazwisko:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    ${data.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    <p><strong>Temat:</strong> ${escapeHtml(data.subject)}</p>
    <p><strong>Wiadomość:</strong></p>
    <p>${escapeHtml(data.message)}</p>
  `;

  const { data: result, error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `[VoiceLink Kontakt] ${data.subject}`,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { id: result?.id };
}

export async function sendDemoNotification(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  message?: string;
}): Promise<{ id?: string }> {
  const resend = getResend();
  const to = getNotificationTo();
  const from = getFromAddress();

  const html = `
    <h2>Nowe zgłoszenie na demo</h2>
    <p><strong>Imię i nazwisko:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Firma / placówka:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    <p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Branża:</strong> ${escapeHtml(data.industry)}</p>
    ${data.message ? `<p><strong>Wiadomość:</strong></p><p>${escapeHtml(data.message)}</p>` : ""}
  `;

  const { data: result, error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `[VoiceLink Demo] ${data.company} — ${data.name}`,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { id: result?.id };
}
