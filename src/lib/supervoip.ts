/**
 * SuperVoIP REST API — wysyłka SMS z formularza kontaktowego.
 *
 * Dokumentacja:
 * - https://pomoc.supervoip.pl/5182951714333-supervoip-api/
 * - https://restapi.supervoip.pl/ (POST /api/sms_messages)
 *
 * Wymagane env:
 * - SUPERVOIP_API_TOKEN — Bearer z panelu (Usługi → SuperVoIP API → REST)
 * - SUPERVOIP_VOIP_NUMBER_ID — ID numeru komórkowego na koncie (nie MSISDN)
 *
 * Nadawca musi być sender=voipNumber + voipNumber=/api/voip_numbers/{id}.
 * Inaczej SuperVoIP wyśle SMS z losowego nadawcy.
 */

const SUPERVOIP_BASE_URL = "https://restapi.supervoip.pl";
const POLAND_COUNTRY_IRI = "/api/countries/96";

const DEFAULT_SMS_RECIPIENTS = ["+48603076043", "+48735025087"];

export interface ContactSmsInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function getApiToken(): string | null {
  return process.env.SUPERVOIP_API_TOKEN?.trim() || null;
}

function getVoipNumberIri(): string | null {
  const raw = process.env.SUPERVOIP_VOIP_NUMBER_ID?.trim();
  if (!raw) return null;
  if (raw.startsWith("/api/voip_numbers/")) return raw;
  return `/api/voip_numbers/${raw}`;
}

function getSmsRecipients(): string[] {
  const fromEnv = process.env.SUPERVOIP_SMS_TO?.trim();
  if (fromEnv) {
    const parsed = fromEnv
      .split(",")
      .map((value) => value.replace(/[\s\-().]/g, ""))
      .filter(Boolean);
    if (parsed.length > 0) return parsed;
  }
  return DEFAULT_SMS_RECIPIENTS;
}

function toMsisdn(raw: string): string {
  const trimmed = raw.replace(/[\s\-().]/g, "");
  if (trimmed.startsWith("+")) return trimmed.slice(1).replace(/\D/g, "");
  if (trimmed.startsWith("00")) return trimmed.slice(2).replace(/\D/g, "");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 9) return `48${digits}`;
  return digits;
}

function buildContactSms(data: ContactSmsInput): string {
  const phone = data.phone?.trim() || "brak tel.";
  const message = data.message.replace(/\s+/g, " ").trim();
  const clipped = message.length > 80 ? `${message.slice(0, 77)}...` : message;
  return `VoiceLink kontakt: ${data.name}, ${phone}, ${data.email}. Temat: ${data.subject}. ${clipped}`;
}

export async function sendContactSms(data: ContactSmsInput): Promise<{ sent: boolean; message: string }> {
  const token = getApiToken();
  const voipNumber = getVoipNumberIri();

  if (!token || !voipNumber) {
    console.warn(
      "[SUPERVOIP] Brak konfiguracji SMS — pomijam. Wymagane: SUPERVOIP_API_TOKEN, SUPERVOIP_VOIP_NUMBER_ID"
    );
    return { sent: false, message: "Missing SuperVoIP configuration" };
  }

  const recipients = getSmsRecipients().map(toMsisdn).filter((value) => value.length >= 8);
  if (recipients.length === 0) {
    return { sent: false, message: "No SMS recipients" };
  }

  const country = process.env.SUPERVOIP_SMS_COUNTRY?.trim() || POLAND_COUNTRY_IRI;
  const body = {
    sender: "voipNumber",
    recipients,
    voipNumber,
    text: buildContactSms(data),
    country,
  };

  try {
    const response = await fetch(`${SUPERVOIP_BASE_URL}/api/sms_messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = (await response.json().catch(() => ({}))) as {
      status?: string;
      queuedMessages?: Array<{ status?: string; errorDescription?: string; recipient?: string }>;
    };

    if (!response.ok) {
      console.error("[SUPERVOIP] SMS failed:", response.status, json);
      return { sent: false, message: `HTTP ${response.status}` };
    }

    const failed = json.queuedMessages?.filter((item) => item.status && item.status !== "queued" && item.status !== "ok");
    if (failed && failed.length > 0) {
      console.error("[SUPERVOIP] SMS queued with errors:", failed);
    }

    return { sent: true, message: json.status ?? "ok" };
  } catch (err) {
    console.error("[SUPERVOIP] SMS exception:", err);
    return { sent: false, message: err instanceof Error ? err.message : "Unknown error" };
  }
}
