import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

const pageMeta = generatePageMetadata({
  title: "Przetestuj asystenta VoiceLink — zadzwonimy do Ciebie",
  description:
    "Wpisz numer telefonu. Asystent VoiceLink oddzwoni i pokaże, jak umawia wizyty, odpowiada o placówce, dojeździe i cenach usług.",
  path: "/przetestuj",
  keywords: [
    "przetestuj voicebot",
    "asystent głosowy VoiceLink",
    "demo rozmowy VoiceLink",
    "asystent głosowy demo",
  ],
});

export const metadata: Metadata = {
  ...pageMeta,
  title: {
    absolute: "Przetestuj asystenta VoiceLink — zadzwonimy do Ciebie",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
