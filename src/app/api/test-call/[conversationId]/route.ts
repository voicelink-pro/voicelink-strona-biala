import { NextResponse } from "next/server";
import { getConversationDetails } from "@/lib/elevenlabs";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/test-call/[conversationId]">
) {
  const { conversationId } = await params;

  if (!conversationId) {
    return NextResponse.json({ error: "Brak conversation id." }, { status: 400 });
  }

  const details = await getConversationDetails(conversationId);
  if (!details) {
    return NextResponse.json({ error: "Nie znaleziono rozmowy." }, { status: 404 });
  }

  return NextResponse.json(details);
}
