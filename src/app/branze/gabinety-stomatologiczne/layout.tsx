import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "AI dla Gabinetów Stomatologicznych — Automatyczna Rejestracja",
  description:
    "VoiceLink dla dentystów, ortodontów i chirurgów. Redukcja no-show dzięki automatycznym przypomnieniom, rejestracja pacjentów 24/7 przez AI.",
  path: "/branze/gabinety-stomatologiczne",
  keywords: [
    "AI dla dentysty",
    "voicebot stomatologia",
    "automatyzacja gabinetu stomatologicznego",
    "rejestracja AI dentysta",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
