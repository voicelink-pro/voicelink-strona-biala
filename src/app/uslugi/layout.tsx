import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Usługi VoiceLink — AI Recepcja, Automatyzacja, Rezerwacje",
  description:
    "Poznaj usługi VoiceLink: recepcjonistka AI, automatyzacja rozmów, rezerwacje online, obsługa 24/7 i panel analityczny. Każde rozwiązanie budowane indywidualnie.",
  path: "/uslugi",
  keywords: [
    "usługi voicelink",
    "AI recepcja usługi",
    "voicebot usługi medyczne",
    "automatyzacja placówki medycznej",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
