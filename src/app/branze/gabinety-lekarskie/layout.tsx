import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "AI dla Gabinetów Lekarskich — Wirtualna Rejestracja Pacjentów",
  description:
    "VoiceLink dla lekarzy rodzinnych i internistów. Automatyczna obsługa telefonów, umawianie wizyt i odciążenie rejestracji — bez zatrudniania dodatkowego personelu.",
  path: "/branze/gabinety-lekarskie",
  keywords: [
    "AI dla gabinetu lekarskiego",
    "voicebot lekarz rodzinny",
    "automatyzacja gabinetu lekarskiego",
    "rejestracja AI internista",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
