import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Chatbot VoiceLink — Inteligentna Asystentka SMS dla Placówek Medycznych",
  description:
    "Asystentka SMS rozumiejąca naturalny język. Pacjenci potwierdzają wizyty, zmieniają terminy i zadają pytania przez SMS — bez sztywnych komend. 24/7.",
  path: "/uslugi/chatbot-voicelink",
  keywords: [
    "chatbot SMS medyczny",
    "asystentka SMS",
    "AI SMS placówka medyczna",
    "chatbot dla przychodni",
    "automatyczne odpowiedzi SMS",
    "SMS bot medyczny",
    "konwersacyjny SMS",
    "VoiceLink chatbot",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
