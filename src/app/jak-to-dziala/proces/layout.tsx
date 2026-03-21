import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Proces Wdrożenia VoiceLink — Krok po Kroku",
  description:
    "Jak wygląda wdrożenie VoiceLink? Od analizy potrzeb, przez konfigurację AI, testy, aż po uruchomienie — cały proces w jednym miejscu.",
  path: "/jak-to-dziala/proces",
  keywords: [
    "proces wdrożenia voicebota",
    "jak wdrożyć AI",
    "etapy wdrożenia voicelink",
    "implementacja voicebota",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
