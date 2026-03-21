import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Integracje VoiceLink — Systemy Medyczne i Kalendarze",
  description:
    "VoiceLink integruje się z popularnymi systemami medycznymi, kalendarzami i platformami rezerwacyjnymi. Sprawdź listę obsługiwanych integracji.",
  path: "/integracje",
  keywords: [
    "integracje voicelink",
    "voicebot integracja CRM",
    "AI integracja kalendarz",
    "systemy medyczne integracja",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
