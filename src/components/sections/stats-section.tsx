"use client";

import { Container, Section } from "@/components/ui/container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const stats = [
  {
    value: "85%",
    label: "połączeń obsłużonych automatycznie",
    description: "Większość spraw rozwiązywana bez udziału personelu",
  },
  {
    value: "<2s",
    label: "średni czas odpowiedzi",
    description: "Pacjent nie czeka w kolejce — AI odbiera natychmiast",
  },
  {
    value: "70%",
    label: "redukcja obciążenia personelu",
    description: "Personel skupia się na pacjentach w placówce",
  },
  {
    value: "24/7",
    label: "dostępność systemu",
    description: "Rejestracja i informacje o każdej porze",
  },
];

export function StatsSection() {
  return (
    <Section background="white" className="relative overflow-hidden">
      <Container className="relative">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
              Liczby mówią same za siebie
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
              Wyniki, które osiągają placówki korzystające z VoiceLink.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label, description }) => (
            <StaggerItem key={label}>
              <div className="text-center rounded-2xl border border-surface-200/80 bg-surface-50/50 p-8 transition-all duration-200 hover:border-primary-200 hover:shadow-[var(--shadow-card-hover)]">
                <div className="text-5xl font-extrabold tracking-tight text-primary-500 lg:text-[3.25rem]">
                  {value}
                </div>
                <div className="mt-3 text-sm font-semibold text-primary-950">
                  {label}
                </div>
                <p className="mt-1.5 text-xs text-surface-500 leading-relaxed">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
