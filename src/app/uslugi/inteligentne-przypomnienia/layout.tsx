import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Inteligentne Przypomnienia o Wizytach — SMS i AI Voice",
  description:
    "Automatyczne przypomnienia SMS i głosowe AI o wizytach. Pacjent potwierdza, przekłada lub odwołuje wizytę bez udziału recepcji. Redukcja no-show nawet do 5%.",
  path: "/uslugi/inteligentne-przypomnienia",
  keywords: [
    "przypomnienia o wizytach",
    "automatyczne przypomnienia SMS",
    "redukcja no-show",
    "AI dla placówek medycznych",
    "automatyzacja recepcji",
    "przypomnienia dla pacjentów",
    "voicebot medyczny",
    "inteligentne przypomnienia AI",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
