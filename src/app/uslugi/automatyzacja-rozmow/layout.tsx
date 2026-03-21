import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Automatyzacja Rozmów Telefonicznych — VoiceLink AI",
  description:
    "Zautomatyzuj obsługę telefoniczną placówki medycznej. AI przejmuje powtarzalne rozmowy — rejestracja, potwierdzenia wizyt, informacje o godzinach pracy.",
  path: "/uslugi/automatyzacja-rozmow",
  keywords: [
    "automatyzacja rozmów",
    "automatyzacja telefonów",
    "voicebot dla przychodni",
    "automatyczna obsługa połączeń",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
