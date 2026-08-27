import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Kalkulator VoiceLink — Odzyskany czas recepcji i przychód",
  description:
    "Zobacz, ile czasu Twojego zespołu pochłania telefon i jaką część tego obciążenia może przejąć VoiceLink. Kalkulator pokazuje odzyskane godziny, przepustowość i potencjalny przychód — bez założenia redukcji etatów.",
  path: "/kalkulator-oszczednosci",
  keywords: [
    "kalkulator oszczędności",
    "odzyskany czas recepcji",
    "ROI voicebot",
    "przepustowość recepcji AI",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
