import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Branże — VoiceLink AI dla Placówek Medycznych",
  description:
    "VoiceLink obsługuje przychodnie, kliniki, gabinety lekarskie, stomatologiczne i centra medyczne. Sprawdź jak AI automatyzuje obsługę w Twojej branży.",
  path: "/branze",
  keywords: [
    "AI dla placówek medycznych",
    "voicebot dla przychodni",
    "AI dla klinik",
    "automatyzacja medyczna",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
