import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Funkcje VoiceLink — Co Potrafi Asystent AI",
  description:
    "Poznaj możliwości VoiceLink: obsługa 24/7, rezerwacje wizyt, SMS-y, baza wiedzy, naturalny głos, wielojęzyczność i inteligentne przekierowanie rozmów.",
  path: "/funkcje",
  keywords: [
    "funkcje voicelink",
    "możliwości voicebota",
    "co potrafi AI recepcja",
    "funkcje asystenta AI",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
