import { NextResponse } from "next/server";
import { after } from "next/server";
import { z } from "zod";
import { sendContactNotification } from "@/lib/email";
import { initiateOutboundCall } from "@/lib/elevenlabs";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  source: z.string().optional(),
});

const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUESTS = 3;
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
        { error: "Zbyt wiele zapytań. Spróbuj ponownie za chwilę." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane formularza.", details: result.error.flatten() },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("[CONTACT FORM] Brak RESEND_API_KEY");
      return NextResponse.json(
        { error: "Serwis e-mail nie jest skonfigurowany." },
        { status: 503 }
      );
    }

    const data = result.data;

    await sendContactNotification({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });

    // Po wysłaniu emaila uruchamiamy agenta AI w tle (nie blokuje odpowiedzi).
    // Wymaga numeru telefonu — bez niego AI nie ma jak oddzwonić.
    if (data.phone) {
      after(async () => {
        await initiateOutboundCall({
          toNumber: data.phone!,
          customerName: data.name,
          customerEmail: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          subject: data.subject,
          message: data.message,
          source: data.source || "contact-form",
        });
      });
    } else {
      console.info("[CONTACT FORM] Brak telefonu — pomijam wywołanie agenta AI.");
    }

    return NextResponse.json({ success: true, message: "Wiadomość została wysłana." });
  } catch (err) {
    console.error("[CONTACT FORM]", err);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
