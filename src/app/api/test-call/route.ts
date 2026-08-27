import { NextResponse } from "next/server";
import { z } from "zod";
import { initiateOutboundCall, normalizePhoneE164 } from "@/lib/elevenlabs";

const testCallSchema = z.object({
  phone: z.string().min(9),
  source: z.enum(["kalkulator-test", "lp-przetestuj", "lp-kalkulator"]).optional(),
});

const RATE_LIMIT_WINDOW = 5 * 60_000;
const MAX_REQUESTS = 2;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  requestLog.set(ip, recent);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Zbyt wiele prób. Spróbuj ponownie za kilka minut." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = testCallSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Podaj poprawny numer telefonu." }, { status: 400 });
    }

    const toNumber = normalizePhoneE164(parsed.data.phone);
    if (!toNumber) {
      return NextResponse.json(
        { error: "Podaj poprawny numer telefonu, np. 600 123 456." },
        { status: 400 }
      );
    }

    const result = await initiateOutboundCall({
      toNumber,
      source: parsed.data.source ?? "kalkulator-test",
      extraVariables: {
        call_purpose: "demo_recepcja",
      },
      agentId: process.env.ELEVENLABS_TEST_AGENT_ID,
      agentPhoneNumberId: process.env.ELEVENLABS_TEST_AGENT_PHONE_NUMBER_ID,
    });

    if (!result.success) {
      const missingConfig = result.message.includes("Missing") || result.message.includes("disabled");
      return NextResponse.json(
        {
          error: missingConfig
            ? "Połączenia testowe nie są jeszcze skonfigurowane."
            : "Nie udało się zainicjować połączenia. Spróbuj ponownie za chwilę.",
        },
        { status: missingConfig ? 503 : 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Asystent VoiceLink właśnie dzwoni. Odbierz telefon.",
      conversationId: result.conversationId,
    });
  } catch (err) {
    console.error("[TEST CALL]", err);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
