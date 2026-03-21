import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "AI dla Centrów Medycznych — Automatyczna Obsługa Telefoniczna",
  description:
    "VoiceLink dla dużych placówek medycznych i centrów zdrowia. Obsługa setek połączeń dziennie, routing między oddziałami, integracja z systemami HIS.",
  path: "/branze/centra-medyczne",
  keywords: [
    "AI dla centrów medycznych",
    "voicebot szpital",
    "automatyzacja centrum medycznego",
    "obsługa telefoniczna NZOZ",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
