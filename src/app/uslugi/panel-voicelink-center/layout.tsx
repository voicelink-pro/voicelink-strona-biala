import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Panel VoiceLink Center — Analityka i Zarządzanie Rozmowami",
  description:
    "Zaawansowany panel analityczny do zarządzania asystentem AI. Statystyki, trendy i raporty ROI — wszystko w jednym miejscu.",
  path: "/uslugi/panel-voicelink-center",
  keywords: [
    "panel VoiceLink",
    "analityka rozmów AI",
    "dashboard voicebot",
    "zarządzanie AI recepcją",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
