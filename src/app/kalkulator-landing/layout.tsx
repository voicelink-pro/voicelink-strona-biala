import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

const pageMeta = generatePageMetadata({
  title: "Kalkulator VoiceLink — odzyskany czas recepcji",
  description:
    "Zobacz, ile czasu VoiceLink może uwolnić w recepcji. Wpisz numer — asystent głosowy oddzwoni i pokaże, jak brzmi rozmowa z pacjentem.",
  path: "/kalkulator-landing",
  keywords: [
    "kalkulator VoiceLink",
    "asystent głosowy VoiceLink",
    "odzyskany czas recepcji",
  ],
});

export const metadata: Metadata = {
  ...pageMeta,
  title: {
    absolute: "Kalkulator VoiceLink — odzyskany czas recepcji",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
