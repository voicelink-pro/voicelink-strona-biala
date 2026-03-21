import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Recepcjonistka AI — Wirtualna Recepcja Głosowa 24/7",
  description:
    "Wirtualna recepcjonistka AI dla placówek medycznych. Odbiera połączenia 24/7, umawia wizyty, odpowiada na pytania pacjentów — bez kolejek i nieodebranych telefonów.",
  path: "/uslugi/recepcjonistka-ai",
  keywords: [
    "recepcjonistka AI",
    "wirtualna recepcja",
    "AI dla przychodni",
    "automatyczna rejestracja pacjentów",
    "voicebot medyczny",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
