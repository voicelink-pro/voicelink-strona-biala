import { NextResponse } from "next/server";
import { after } from "next/server";
import { z } from "zod";
import { sendDemoNotification } from "@/lib/email";
import { initiateOutboundCall } from "@/lib/elevenlabs";

const demoSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  industry: z.string().min(1),
  message: z.string().optional(),
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
    const result = demoSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane formularza.", details: result.error.flatten() },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("[DEMO REQUEST] Brak RESEND_API_KEY");
      return NextResponse.json(
        { error: "Serwis e-mail nie jest skonfigurowany." },
        { status: 503 }
      );
    }

    const data = result.data;

    await sendDemoNotification({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      industry: data.industry,
      message: data.message,
    });

    after(async () => {
      await initiateOutboundCall({
        toNumber: data.phone,
        customerName: data.name,
        customerEmail: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        subject: `Demo — ${data.company}`,
        message: data.message,
        source: data.source || "demo-form",
        extraVariables: {
          customer_company: data.company,
          customer_industry: data.industry,
        },
      });
    });

    return NextResponse.json({ success: true, message: "Zgłoszenie zostało wysłane." });
  } catch (err) {
    console.error("[DEMO REQUEST]", err);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
