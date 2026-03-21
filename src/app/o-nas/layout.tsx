import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "O Nas — Zespół VoiceLink",
  description:
    "Poznaj zespół stojący za VoiceLink. Tworzymy dedykowane rozwiązania AI dla placówek medycznych — każde wdrożenie projektujemy indywidualnie.",
  path: "/o-nas",
  keywords: [
    "o nas voicelink",
    "zespół voicelink",
    "twórcy voicebota medycznego",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
