/**
 * Integracja z ElevenLabs Conversational AI (outbound call przez SIP trunk Telnyx).
 *
 * Dokumentacja:
 * - https://elevenlabs.io/docs/api-reference/sip-trunk/outbound-call
 * - https://elevenlabs.io/docs/eleven-agents/customization/personalization/dynamic-variables
 * - https://elevenlabs.io/docs/eleven-agents/phone-numbers/telephony/telnyx
 *
 * Po wysłaniu formularza wywołujemy agenta AI, który oddzwoni do klienta
 * przez Telnyx SIP trunk i umówi spotkanie (Cal.com).
 */

const ELEVENLABS_BASE_URL = "https://api.elevenlabs.io";

export type DynamicVariableValue = string | number | boolean;

export interface OutboundCallInput {
  toNumber: string;
  customerName: string;
  customerEmail: string;
  source: string;
  firstName?: string;
  lastName?: string;
  subject?: string;
  message?: string;
  extraVariables?: Record<string, DynamicVariableValue>;
}

export interface OutboundCallResult {
  success: boolean;
  message: string;
  conversationId: string | null;
  sipCallId: string | null;
}

/**
 * Normalizuje numer telefonu do formatu E.164 (wymagany przez SIP trunk).
 *
 * Obsługuje typowe polskie formaty:
 *   - "+48 600 123 456" → "+48600123456"
 *   - "600 123 456"     → "+48600123456"
 *   - "0048600123456"   → "+48600123456"
 *   - "+44 20 1234 5678" (zagraniczne) → bez zmian (tylko spacje wycięte)
 *
 * Zwraca `null` jeśli numer wygląda na nieprawidłowy.
 */
export function normalizePhoneE164(raw: string | undefined | null): string | null {
  if (!raw) return null;

  const trimmed = raw.replace(/[\s\-().]/g, "");

  if (trimmed.startsWith("+")) {
    const digits = trimmed.slice(1).replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) return null;
    return `+${digits}`;
  }

  if (trimmed.startsWith("00")) {
    const digits = trimmed.slice(2).replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) return null;
    return `+${digits}`;
  }

  const digits = trimmed.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("48")) {
    return `+${digits}`;
  }

  if (digits.length === 9) {
    return `+48${digits}`;
  }

  if (digits.length === 10 && digits.startsWith("0")) {
    return `+48${digits.slice(1)}`;
  }

  return null;
}

function splitName(name: string): { firstName: string; lastName: string } {
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (!trimmed) return { firstName: "", lastName: "" };
  const parts = trimmed.split(" ");
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

interface ElevenLabsApiResponse {
  success?: boolean;
  message?: string;
  conversation_id?: string | null;
  sip_call_id?: string | null;
  detail?: unknown;
}

/**
 * Inicjuje rozmowę wychodzącą agenta ElevenLabs przez Telnyx SIP trunk.
 *
 * Funkcja nigdy nie rzuca — błędy są logowane i zwracane jako `success: false`.
 * Dzięki temu nieudane wywołanie AI nie blokuje potwierdzenia formularza dla
 * użytkownika (wiadomość e-mail i tak została wysłana wcześniej).
 */
export async function initiateOutboundCall(
  input: OutboundCallInput
): Promise<OutboundCallResult> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  const agentPhoneNumberId = process.env.ELEVENLABS_AGENT_PHONE_NUMBER_ID;
  const enabled = process.env.ELEVENLABS_OUTBOUND_ENABLED !== "false";

  if (!enabled) {
    return { success: false, message: "Outbound calls disabled by env flag", conversationId: null, sipCallId: null };
  }

  if (!apiKey || !agentId || !agentPhoneNumberId) {
    console.warn(
      "[ELEVENLABS] Brak konfiguracji — pomijam wywołanie. Wymagane env: ELEVENLABS_API_KEY, ELEVENLABS_AGENT_ID, ELEVENLABS_AGENT_PHONE_NUMBER_ID"
    );
    return { success: false, message: "Missing ElevenLabs configuration", conversationId: null, sipCallId: null };
  }

  const toNumber = normalizePhoneE164(input.toNumber);
  if (!toNumber) {
    console.warn("[ELEVENLABS] Nieprawidłowy numer telefonu — pomijam wywołanie:", input.toNumber);
    return { success: false, message: "Invalid phone number", conversationId: null, sipCallId: null };
  }

  const { firstName: derivedFirst, lastName: derivedLast } = splitName(input.customerName);
  const firstName = input.firstName?.trim() || derivedFirst;
  const lastName = input.lastName?.trim() || derivedLast;

  const dynamicVariables: Record<string, DynamicVariableValue> = {
    customer_name: input.customerName,
    customer_first_name: firstName,
    customer_last_name: lastName,
    customer_email: input.customerEmail,
    customer_phone: toNumber,
    form_source: input.source,
    ...(input.subject ? { form_subject: input.subject } : {}),
    ...(input.message ? { form_message: input.message } : {}),
    ...(input.extraVariables ?? {}),
  };

  const body = {
    agent_id: agentId,
    agent_phone_number_id: agentPhoneNumberId,
    to_number: toNumber,
    conversation_initiation_client_data: {
      dynamic_variables: dynamicVariables,
    },
  };

  try {
    const response = await fetch(`${ELEVENLABS_BASE_URL}/v1/convai/sip-trunk/outbound-call`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = (await response.json().catch(() => ({}))) as ElevenLabsApiResponse;

    if (!response.ok) {
      console.error("[ELEVENLABS] Outbound call failed:", response.status, json);
      return {
        success: false,
        message: typeof json?.message === "string" ? json.message : `HTTP ${response.status}`,
        conversationId: null,
        sipCallId: null,
      };
    }

    return {
      success: Boolean(json.success),
      message: typeof json.message === "string" ? json.message : "ok",
      conversationId: json.conversation_id ?? null,
      sipCallId: json.sip_call_id ?? null,
    };
  } catch (err) {
    console.error("[ELEVENLABS] Outbound call exception:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
      conversationId: null,
      sipCallId: null,
    };
  }
}
