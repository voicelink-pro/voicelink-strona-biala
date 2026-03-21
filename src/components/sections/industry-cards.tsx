"use client";

import Link from "next/link";
import {
  Stethoscope,
  Building2,
  Smile,
  HeartPulse,
  Heart,
  Hospital,
  Eye,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  Building2,
  Smile,
  HeartPulse,
  Heart,
  Hospital,
  Eye,
  Sparkles,
};

const industryItems = [
  {
    icon: "Stethoscope",
    title: "Przychodnie i kliniki",
    description: "Triaż telefoniczny, kolejkowanie połączeń, automatyczna rejestracja do wielu specjalistów.",
    features: ["Triaż AI", "Multi-specjalista", "Kolejkowanie"],
    href: "/branze/przychodnie",
  },
  {
    icon: "Heart",
    title: "Gabinety lekarskie",
    description: "Recepcja AI dla lekarzy rodzinnych i internistów — odbiera telefony, umawia wizyty, odpowiada na FAQ.",
    features: ["Rejestracja 24/7", "FAQ pacjentów", "Przypomnienia SMS"],
    href: "/branze/gabinety-lekarskie",
  },
  {
    icon: "Smile",
    title: "Stomatologia",
    description: "Umawianie wizyt do konkretnych lekarzy, informacje o zabiegach i cenach, przypomnienia redukujące no-shows.",
    features: ["Cennik zabiegów", "Dopasowanie lekarza", "Redukcja no-shows"],
    href: "/branze/gabinety-stomatologiczne",
  },
  {
    icon: "HeartPulse",
    title: "Ortodoncja",
    description: "Zarządzanie długoterminowymi planami leczenia, kontrole okresowe, koordynacja wizyt follow-up.",
    features: ["Plan leczenia", "Wizyty kontrolne", "Follow-up AI"],
    href: "/branze/placowki-specjalistyczne",
  },
  {
    icon: "Sparkles",
    title: "Medycyna estetyczna",
    description: "Dyskretna obsługa zapytań o zabiegi, konsultacje cenowe, zarządzanie listą oczekujących na popularne terminy.",
    features: ["Konsultacje cenowe", "Lista oczekujących", "Dyskretna obsługa"],
    href: "/branze/placowki-specjalistyczne",
  },
  {
    icon: "Hospital",
    title: "Centra medyczne",
    description: "Wielooddziałowy triaż, routing do odpowiednich działów, integracja z HIS i systemami szpitalnymi.",
    features: ["Triaż wielooddziałowy", "Integracja HIS", "Routing AI"],
    href: "/branze/centra-medyczne",
  },
  {
    icon: "Eye",
    title: "Gabinety specjalistyczne",
    description: "Okuliści, dermatolodzy, kardiolodzy — AI dopasowuje pacjenta do specjalisty i informuje o przygotowaniu do badań.",
    features: ["Matching specjalisty", "Instrukcje badań", "Eskalacja pilna"],
    href: "/branze/placowki-specjalistyczne",
  },
  {
    icon: "Building2",
    title: "Sieci placówek",
    description: "Jeden system AI dla wielu lokalizacji — centralne zarządzanie, spójne standardy, skalowalna infrastruktura.",
    features: ["Multi-lokalizacja", "Centralne zarządzanie", "Skalowalne API"],
    href: "/branze/centra-medyczne",
  },
];

export function IndustryCards() {
  return (
    <Section background="white">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
              Branże
            </span>
            <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
              Dla kogo tworzymy
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
              VoiceLink jest konfigurowany indywidualnie pod specyfikę każdego typu placówki — od małego gabinetu po sieć szpitali.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industryItems.map(({ icon, title, description, features, href }) => {
            const Icon = iconMap[icon];
            return (
              <StaggerItem key={title}>
                <Link href={href} className="group block h-full">
                  <Card hover className="h-full flex flex-col">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50">
                      {Icon && <Icon className="h-5 w-5 text-primary-500" />}
                    </div>
                    <CardTitle className="text-[15px]">{title}</CardTitle>
                    <CardDescription className="mt-2 flex-1">{description}</CardDescription>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {features.map((f) => (
                        <span
                          key={f}
                          className="inline-block rounded-full bg-primary-50 px-2.5 py-0.5 text-[11px] font-medium text-primary-600"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary-500 group-hover:gap-2.5 transition-all duration-200">
                      Dowiedz się więcej
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
