import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Cennik VoiceLink — Transparentny Model Cenowy AI Recepcji",
  description:
    "Sprawdź ile kosztuje wdrożenie VoiceLink. Wdrożenie podstawowe 2 500 zł, zakres 2 500 – 5 000 zł + miesięczny abonament. Każde rozwiązanie budowane indywidualnie pod Twoją placówkę.",
  path: "/cennik",
  keywords: [
    "cennik voicelink",
    "ile kosztuje voicebot",
    "cena AI recepcji",
    "koszt wdrożenia voicebota",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
