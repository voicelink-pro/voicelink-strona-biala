"use client";

import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import {
  ArrowRight,
} from "lucide-react";
import przychodnieIcon from "@/components/icons/brand-przychodnie.svg";
import gabinetyIcon from "@/components/icons/brand-gabinety.svg";
import stomatologiaIcon from "@/components/icons/brand-stomatologia.svg";
import ortodoncjaIcon from "@/components/icons/brand-ortodoncja.svg";
import estetyczneIcon from "@/components/icons/brand-estetyczne.svg";
import centraIcon from "@/components/icons/brand-centra.svg";
import specjalistyczneIcon from "@/components/icons/brand-specjalistyczne.svg";
import siecIcon from "@/components/icons/brand-siec.svg";
import { Container, Section } from "@/components/ui/container";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const iconMap: Record<string, { src: StaticImageData; alt: string }> = {
  Stethoscope: { src: przychodnieIcon, alt: "Ikona przychodni i klinik" },
  Heart: { src: gabinetyIcon, alt: "Ikona gabinetow lekarskich" },
  Smile: { src: stomatologiaIcon, alt: "Ikona stomatologii" },
  HeartPulse: { src: ortodoncjaIcon, alt: "Ikona ortodoncji" },
  Sparkles: { src: estetyczneIcon, alt: "Ikona medycyny estetycznej" },
  Hospital: { src: centraIcon, alt: "Ikona centrow medycznych" },
  Eye: { src: specjalistyczneIcon, alt: "Ikona gabinetow specjalistycznych" },
  Building2: { src: siecIcon, alt: "Ikona sieci placowek" },
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
            const iconData = iconMap[icon];
            return (
              <StaggerItem key={title}>
                <Link href={href} className="group block h-full">
                  <Card hover className="h-full flex flex-col">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-primary-50">
                      {iconData && (
                        <Image
                          src={iconData.src}
                          alt={iconData.alt}
                          width={96}
                          height={96}
                          className="h-5 w-5 object-contain"
                          quality={90}
                        />
                      )}
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
