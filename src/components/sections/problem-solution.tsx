"use client";

import { X, Check, ArrowRight, Phone, PhoneOff, Clock, Users, TrendingUp } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const comparisons = [
  {
    icon: PhoneOff,
    problem: "35% połączeń nieodebranych",
    solution: "0 nieodebranych połączeń",
    metric: { before: "35%", after: "0%", label: "nieodebrane" },
  },
  {
    icon: Clock,
    problem: "Średnio 4 min oczekiwania na linii",
    solution: "Odpowiedź w ciągu 2 sekund",
    metric: { before: "4 min", after: "<2s", label: "czas oczekiwania" },
  },
  {
    icon: Users,
    problem: "Rejestracja tylko w godzinach pracy",
    solution: "Rejestracja 24/7/365",
    metric: { before: "8h", after: "24h", label: "dostępność" },
  },
  {
    icon: Phone,
    problem: "1 rozmowa na raz na recepcji",
    solution: "Wiele połączeń jednocześnie",
    metric: { before: "1", after: "∞", label: "jednocześnie" },
  },
  {
    icon: TrendingUp,
    problem: "Recepcja zajęta telefonami, nie pacjentami",
    solution: "Zespół skupiony na pacjentach na miejscu",
    metric: { before: "60%", after: "5%", label: "czasu na telefony" },
  },
];

export function ProblemSolution() {
  return (
    <Section background="light">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
              Przed i po
            </span>
            <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
              Problem, który rozwiązujemy
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
              Przeciążona recepcja telefoniczna to codzienność polskich placówek medycznych. Zobacz, co zmienia VoiceLink.
            </p>
          </div>
        </FadeIn>

        {/* Header labels */}
        <FadeIn delay={0.05}>
          <div className="hidden md:grid md:grid-cols-[1fr_48px_1fr] gap-4 mb-6 px-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100">
                <X className="h-3.5 w-3.5 text-red-500" />
              </div>
              <span className="text-sm font-semibold text-red-700 uppercase tracking-wide">Przed VoiceLink</span>
            </div>
            <div />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-100">
                <Check className="h-3.5 w-3.5 text-primary-500" />
              </div>
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Z VoiceLink</span>
            </div>
          </div>
        </FadeIn>

        {/* Comparison rows */}
        <StaggerContainer className="space-y-3" delay={0.1}>
          {comparisons.map(({ icon: Icon, problem, solution, metric }) => (
            <StaggerItem key={problem}>
              <div className="group grid md:grid-cols-[1fr_48px_1fr] gap-3 md:gap-4 items-stretch">
                {/* Before */}
                <div className="rounded-2xl border border-red-100/80 bg-white p-5 md:p-6 flex items-center gap-4 transition-all duration-200 group-hover:border-red-200">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                    <Icon className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium text-primary-950">{problem}</p>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-red-500">{metric.before}</span>
                      <span className="text-xs text-surface-400">{metric.label}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-[var(--shadow-glow-primary)] transition-transform duration-200 group-hover:scale-110">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Mobile arrow */}
                <div className="flex md:hidden items-center justify-center py-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white rotate-90">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* After */}
                <div className="rounded-2xl border border-primary-100/80 bg-white p-5 md:p-6 flex items-center gap-4 transition-all duration-200 group-hover:border-primary-200 group-hover:shadow-[var(--shadow-card-hover)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                    <Icon className="h-5 w-5 text-primary-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium text-primary-950">{solution}</p>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-primary-500">{metric.after}</span>
                      <span className="text-xs text-surface-400">{metric.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
