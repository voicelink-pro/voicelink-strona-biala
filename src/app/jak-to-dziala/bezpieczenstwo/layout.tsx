import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Bezpieczeństwo Danych — VoiceLink",
  description:
    "Szyfrowanie AES-256 i TLS 1.3, serwery w UE, zgodność z RODO i AI Act, anonimizacja transkrypcji, privacy by design. Twoje dane medyczne są bezpieczne z VoiceLink.",
  path: "/jak-to-dziala/bezpieczenstwo",
  keywords: [
    "bezpieczeństwo danych medycznych",
    "RODO placówka medyczna",
    "AI Act ochrona zdrowia",
    "szyfrowanie danych medycznych",
    "privacy by design",
    "SOC 2 Type II",
    "ISO 27001",
    "anonimizacja danych pacjentów",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
