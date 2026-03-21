import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Plany Cenowe VoiceLink — Indywidualny Cennik Wdrożenia",
  description:
    "Porównaj plany cenowe VoiceLink. Indywidualny cennik dopasowany do wielkości placówki i liczby połączeń. Wdrożenie od 2 500 zł.",
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
