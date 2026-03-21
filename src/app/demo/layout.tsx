import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Demo VoiceLink — Zobacz AI Recepcjonistkę w Akcji",
  description:
    "Umów bezpłatne demo i przekonaj się jak VoiceLink automatyzuje obsługę telefoniczną Twojej placówki. Rozmowa na żywo z asystentem AI.",
  path: "/demo",
  keywords: [
    "demo voicelink",
    "demo voicebot",
    "test AI recepcja",
    "prezentacja voicebot medyczny",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
