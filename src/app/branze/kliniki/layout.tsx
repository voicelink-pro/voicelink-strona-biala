import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "AI dla Klinik Prywatnych — Premium Obsługa Pacjentów",
  description:
    "VoiceLink dla klinik prywatnych i wieloprofilowych. Profesjonalna obsługa telefoniczna AI dopasowana do wizerunku placówki premium.",
  path: "/branze/kliniki",
  keywords: [
    "AI dla kliniki",
    "voicebot klinika prywatna",
    "automatyzacja kliniki",
    "recepcja AI klinika",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
