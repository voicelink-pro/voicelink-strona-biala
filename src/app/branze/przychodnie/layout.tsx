import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "AI dla Przychodni — Automatyzacja Rejestracji Pacjentów",
  description:
    "VoiceLink dla przychodni POZ i specjalistycznych. Obsługa setek połączeń dziennie, redukcja kolejek na linii i automatyczna rejestracja wizyt 24/7.",
  path: "/branze/przychodnie",
  keywords: [
    "AI dla przychodni",
    "voicebot przychodnia",
    "automatyzacja rejestracji POZ",
    "recepcja AI przychodnia",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
