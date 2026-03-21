import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "AI dla Gabinetów Specjalistycznych — VoiceLink",
  description:
    "Asystent AI dla gabinetów okulistycznych, dermatologicznych, kardiologicznych i innych. Wstępna kwalifikacja pacjentów i automatyczna rejestracja 24/7.",
  path: "/branze/gabinety-specjalistyczne",
  keywords: [
    "AI dla gabinetu specjalistycznego",
    "voicebot okulista",
    "automatyzacja gabinetu dermatologicznego",
    "rejestracja AI specjalista",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
