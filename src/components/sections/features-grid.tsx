"use client";

import Image from "next/image";
import {
  CalendarCheck,
  PhoneIncoming,
  TrendingUp,
  AlertTriangle,
  Clock,
  BarChart3,
} from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const metrics = [
  {
    icon: CalendarCheck,
    title: "Umówione wizyty",
    description: "Ile wizyt agent zarezerwował automatycznie — dziennie, tygodniowo i miesięcznie.",
  },
  {
    icon: PhoneIncoming,
    title: "Odbyte rozmowy",
    description: "Pełna historia połączeń z czasem trwania, statusem i wynikiem każdej rozmowy.",
  },
  {
    icon: TrendingUp,
    title: "Procent skuteczności",
    description: "Jaki odsetek rozmów zakończył się realizacją celu — umówienie wizyty, odpowiedź na pytanie.",
  },
  {
    icon: AlertTriangle,
    title: "Eskalacje do człowieka",
    description: "Ile rozmów wymagało przekazania do personelu — i z jakiego powodu.",
  },
  {
    icon: Clock,
    title: "Średni czas rozmowy",
    description: "Ile trwa przeciętna interakcja z pacjentem. Krótszy czas = wyższa efektywność.",
  },
  {
    icon: BarChart3,
    title: "Trendy i raporty",
    description: "Porównania okresowe, godziny szczytu, najczęstsze pytania, wykresy i eksport danych.",
  },
];

export function FeaturesGrid() {
  return (
    <Section background="light">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
              Panel VoiceLink
            </span>
            <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
              Pełna kontrola i transparentność
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
              Miej pełen wgląd w pracę agenta AI. Panel VoiceLink pokazuje statystyki w czasie rzeczywistym, abyś miał pewność, że performance jest na najwyższym poziomie.
            </p>
          </div>
        </FadeIn>

        {/* Panel screenshot */}
        <FadeIn delay={0.1}>
          <div className="relative mb-16">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary-200/20 via-accent-200/10 to-transparent blur-2xl pointer-events-none" />
            <div className="relative overflow-hidden rounded-2xl border border-surface-200/80 shadow-[var(--shadow-elevated)] bg-white">
              <Image
                src="/images/panel-voicelink-center.png"
                alt="VoiceLink Center — panel analityczny dla placówek medycznych"
                width={1200}
                height={700}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </FadeIn>

        {/* Metrics grid */}
        <FadeIn delay={0.15}>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-primary-950">
              Co zobaczysz w panelu?
            </h3>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" delay={0.15}>
          {metrics.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 h-full transition-all duration-200 hover:border-primary-200 hover:shadow-[var(--shadow-card-hover)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 mb-4">
                  <Icon className="h-5 w-5 text-primary-500" />
                </div>
                <h4 className="text-[15px] font-semibold text-primary-950">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-surface-500">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
