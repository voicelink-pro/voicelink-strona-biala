import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Plany Cenowe VoiceLink — Indywidualny Cennik Wdrożenia",
  description:
    "Porównaj plany cenowe VoiceLink. Wdrożenie podstawowe 2 500 zł, zakres 2 500 – 5 000 zł. Cennik dopasowany do wielkości placówki i liczby połączeń.",
  path: "/plany-cenowe",
  keywords: [
    "plany cenowe voicelink",
    "abonament voicebot",
    "pakiety AI recepcja",
    "cennik wdrożenia",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
