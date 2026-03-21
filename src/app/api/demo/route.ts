import { NextResponse } from "next/server";
import { z } from "zod";

const demoSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  industry: z.string().min(1),
  message: z.string().optional(),
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

    // TODO: Send to email service / CRM / webhook
    // For now, log the submission
    console.log("[DEMO REQUEST]", {
      ...result.data,
      timestamp: new Date().toISOString(),
      ip,
    });

    return NextResponse.json({ success: true, message: "Zgłoszenie zostało wysłane." });
  } catch {
    return NextResponse.json(
      { error: "Wystąpił błąd serwera. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
