import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Jak Działa VoiceLink — Poznaj System od Środka",
  description:
    "Sprawdź jak VoiceLink obsługuje połączenia, umawia wizyty i automatyzuje pracę rejestracji. Proces wdrożenia krok po kroku.",
  path: "/jak-to-dziala",
  keywords: [
    "jak działa voicelink",
    "jak działa AI recepcja",
    "proces wdrożenia voicebota",
    "voicebot krok po kroku",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
