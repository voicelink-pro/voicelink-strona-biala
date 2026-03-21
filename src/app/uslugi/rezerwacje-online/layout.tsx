import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Rezerwacje Online — Automatyczne Umawianie Wizyt przez AI",
  description:
    "System rezerwacji online zintegrowany z kalendarzem Twojej placówki. Pacjenci umawiają wizyty telefonicznie z AI — 24/7, bez czekania na linii.",
  path: "/uslugi/rezerwacje-online",
  keywords: [
    "rezerwacje online",
    "umawianie wizyt AI",
    "automatyczna rejestracja wizyt",
    "rezerwacja telefoniczna AI",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
