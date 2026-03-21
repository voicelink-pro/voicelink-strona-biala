import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Technologia AI VoiceLink — Jak Działa Nasza Sztuczna Inteligencja",
  description:
    "Dowiedz się jak działa technologia AI w VoiceLink. Koniec z IVR — naturalny głos, rozumienie kontekstu i automatyzacja procesów w placówkach medycznych.",
  path: "/technologia-ai",
  keywords: [
    "technologia AI",
    "jak działa voicebot",
    "sztuczna inteligencja medycyna",
    "NLP voicebot",
    "synteza mowy AI",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
