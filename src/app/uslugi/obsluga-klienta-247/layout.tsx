import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Obsługa Klienta 24/7 — AI dla Placówek Medycznych",
  description:
    "Zapewnij pacjentom obsługę telefoniczną przez całą dobę. AI odpowiada na pytania, informuje o usługach i eskaluje pilne sprawy — bez przerw i dni wolnych.",
  path: "/uslugi/obsluga-klienta-247",
  keywords: [
    "obsługa klienta 24/7",
    "AI call center",
    "całodobowa obsługa pacjentów",
    "voicebot 24h",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
