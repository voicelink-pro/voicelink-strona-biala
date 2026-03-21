"use client";

import { Container, Section } from "@/components/ui/container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const steps = [
  {
    step: 1,
    title: "Konsultacja i konfiguracja",
    description:
      "Analizujemy potrzeby Twojej placówki, konfigurujemy AI pod Twoją specyfikę — rodzaje wizyt, grafik lekarzy, FAQ pacjentów.",
  },
  {
    step: 2,
    title: "Integracja z systemami",
    description:
      "Podłączamy VoiceLink do Twojego kalendarza i systemu rezerwacyjnego. Konfigurujemy pod specyfikę Twojej placówki.",
  },
  {
    step: 3,
    title: "Testy i szkolenie",
    description:
      "Wspólnie testujemy AI na scenariuszach z Twojej placówki. Szkolimy personel z panelu zarządzania.",
  },
  {
    step: 4,
    title: "Uruchomienie",
    description:
      "Uruchamiamy system VoiceLink dla Twojej placówki. Monitorujemy jakość i optymalizujemy na bieżąco.",
  },
];

export function ProcessSteps() {
  return (
    <Section background="white">
      <Container>
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
              Jak wdrożyć VoiceLink?
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
              Każde wdrożenie jest indywidualne — projektujemy rozwiązanie pod Twoją placówkę. Cały proces trwa od 14 do 30 dni.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map(({ step, title, description }, index) => (
            <StaggerItem key={step}>
              <div className="relative text-center lg:text-left">
                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px bg-surface-200" />
                )}
                <div className="relative mx-auto lg:mx-0 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 text-white font-bold text-lg shadow-[var(--shadow-glow-primary)]">
                  {step}
                </div>
                <h3 className="text-base font-semibold text-primary-950 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-surface-500 leading-relaxed">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
