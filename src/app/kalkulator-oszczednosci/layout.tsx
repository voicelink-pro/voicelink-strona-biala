import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Kalkulator Oszczędności — Oblicz ile Zaoszczędzisz z VoiceLink",
  description:
    "Policz ile Twoja placówka zaoszczędzi dzięki AI recepcji. Porównaj koszty pracownika rejestracji z VoiceLink — oszczędności nawet do 70%.",
  path: "/kalkulator-oszczednosci",
  keywords: [
    "kalkulator oszczędności",
    "ROI voicebot",
    "oszczędności AI recepcja",
    "koszt recepcji vs AI",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
