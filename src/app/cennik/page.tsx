"use client";

import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Clock,
  Tag,
  Calculator,
  TrendingUp,
  Wallet,
  Maximize2,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Data ─── */

const wdrozenieItems = [
  "Konfiguracja agenta AI",
  "Scenariusze rozmów",
  "Integracja z systemem",
  "Testy i optymalizacja",
];

const utrzymanieItems = [
  "Minuty rozmów AI",
  "Wysłane SMS-y",
  "Elastyczna stawka",
  "Bez abonamentu",
];

const roiCards = [
  { title: "ROI od 1. miesiąca", desc: "Typowa placówka zwraca koszt już w pierwszym miesiącu dzięki redukcji ruchu na recepcji.", icon: TrendingUp, color: "emerald" as const },
  { title: "Ułamek kosztu etatu", desc: "Miesięczne utrzymanie AI to ułamek kosztu jednego pracownika recepcji (6-9 tys. zł/mies.).", icon: Wallet, color: "accent" as const },
  { title: "Skalowalność", desc: "AI rośnie z Twoją placówką. Zwiększasz lub zmniejszasz wolumen bez zatrudniania.", icon: Maximize2, color: "primary" as const },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500" },
};

/* ─── Page ─── */

export default function CennikPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Cennik", href: "/cennik" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Cennik</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Transparentny model <span className="text-primary-500">cenowy</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                VoiceLink to nie gotowy voicebot z pudełka — to dedykowane rozwiązanie AI, budowane pod Twoją placówkę. Dlatego każde wdrożenie wyceniamy indywidualnie. Inwestycja zwraca się już w pierwszym miesiącu.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── PRICING GRAPHIC ── */}
      <section className="py-16 md:py-20">
        <Container size="default">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-[var(--shadow-card)] max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-transparent to-accent-50/30" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-stretch gap-6">
                  {/* Wdrozenie */}
                  <div className="flex-1 rounded-2xl p-5 border border-primary-200/60 relative overflow-hidden bg-primary-50/30">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-300" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-100/80 flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <div className="text-primary-950 text-sm font-semibold">Jednorazowe wdrożenie</div>
                        <div className="text-primary-500 text-xs font-medium">2 500 - 15 000 zł</div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {wdrozenieItems.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-surface-500 text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Plus */}
                  <div className="flex items-center justify-center shrink-0">
                    <div className="w-10 h-10 rounded-full bg-surface-100 border border-surface-200/60 flex items-center justify-center">
                      <span className="text-surface-400 text-lg font-light">+</span>
                    </div>
                  </div>

                  {/* Utrzymanie */}
                  <div className="flex-1 rounded-2xl p-5 border border-accent-200/60 relative overflow-hidden bg-accent-50/30">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-400 to-pink-300" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-100/80 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-accent-500" />
                      </div>
                      <div>
                        <div className="text-primary-950 text-sm font-semibold">Miesięczne utrzymanie</div>
                        <div className="text-accent-500 text-xs font-medium">rozliczenie minutowe</div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {utrzymanieItems.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-surface-500 text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-accent-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ROI */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-200" />
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 text-xs font-medium">ROI już od pierwszego miesiąca</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-200" />
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── TWO MAIN CARDS ── */}
      <section id="narzedzia" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Poznaj szczegóły</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Narzędzia do <span className="text-primary-500">podejmowania decyzji</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-2xl mx-auto">Sprawdź ile zaoszczędzisz i poznaj szczegóły cennika wdrożenia.</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {/* Kalkulator oszczednosci */}
            <StaggerItem>
              <Link href="/kalkulator-oszczednosci" className="block rounded-3xl border border-surface-200/80 bg-white p-8 relative overflow-hidden group h-full transition-all hover:shadow-[var(--shadow-card-hover)] hover:border-transparent">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-300" />
                <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 flex items-center justify-center mb-6">
                  <Calculator className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-primary-950 font-semibold text-xl mb-3">Kalkulator oszczędności</h3>
                <p className="text-surface-500 text-sm leading-relaxed mb-6">
                  Oblicz ile zaoszczędzisz automatyzując obsługę telefoniczną. Interaktywny kalkulator uwzględnia liczbę połączeń, pracowników recepcji, procent powtarzalnych rozmów i wskaźnik no-show.
                </p>
                <span className="inline-flex items-center gap-2 text-emerald-600 font-medium text-sm group-hover:gap-3 transition-all">
                  Oblicz oszczędności <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </StaggerItem>

            {/* Cennik wdrozenia */}
            <StaggerItem>
              <Link href="/plany-cenowe" className="block rounded-3xl border border-surface-200/80 bg-white p-8 relative overflow-hidden group h-full transition-all hover:shadow-[var(--shadow-card-hover)] hover:border-transparent">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-400 to-accent-300" />
                <div className="w-14 h-14 rounded-2xl bg-accent-100/80 flex items-center justify-center mb-6">
                  <Tag className="w-7 h-7 text-accent-500" />
                </div>
                <h3 className="text-primary-950 font-semibold text-xl mb-3">Cennik wdrożenia</h3>
                <p className="text-surface-500 text-sm leading-relaxed mb-6">
                  Każde wdrożenie budujemy od podstaw pod Twoją placówkę — scenariusze, integracje, logika obsługi. To nie gotowy produkt, lecz dedykowana infrastruktura AI. Jednorazowe wdrożenie od 2 500 do 15 000 zł.
                </p>
                <span className="inline-flex items-center gap-2 text-accent-500 font-medium text-sm group-hover:gap-3 transition-all">
                  Zobacz szczegóły <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {/* ── MODEL CENOWY ── */}
      <section id="model-cenowy" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Przejrzysty model</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Jak wygląda <span className="text-primary-500">model cenowy</span>
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {/* Jednorazowe wdrozenie */}
            <StaggerItem>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 relative overflow-hidden h-full shadow-[var(--shadow-card)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-300" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100/80 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-primary-950 font-semibold text-lg">Jednorazowe wdrożenie</h3>
                    <span className="text-primary-500 text-sm font-medium">2 500 - 15 000 zł</span>
                  </div>
                </div>
                <p className="text-surface-500 text-sm leading-relaxed">
                  To nie instalacja gotowej aplikacji. Projektujemy scenariusze rozmów, integrujemy z Twoim systemem rezerwacyjnym i konfigurujemy logikę obsługi pod specyfikę Twojej placówki. Cena zależy od złożoności projektu.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Konfiguracja AI", "Scenariusze", "Integracje"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs bg-primary-50 text-primary-600 border border-primary-200">{t}</span>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Miesieczne utrzymanie */}
            <StaggerItem>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 relative overflow-hidden h-full shadow-[var(--shadow-card)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-400 to-pink-300" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent-100/80 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="text-primary-950 font-semibold text-lg">Miesięczne utrzymanie</h3>
                    <span className="text-accent-500 text-sm font-medium">rozliczenie minutowe</span>
                  </div>
                </div>
                <p className="text-surface-500 text-sm leading-relaxed">
                  Płacisz za wykorzystane minuty rozmów i wysłane SMS-y. Im większy wolumen, tym niższa stawka. Bez stałych opłat abonamentowych — pełna elastyczność.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Minuty rozmów", "SMS-y", "Elastyczna stawka"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs bg-accent-50 text-accent-600 border border-accent-200">{t}</span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {/* ── DLACZEGO SIE OPLACA ── */}
      <section id="dlaczego-warto" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Zwrot z inwestycji</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Dlaczego to <span className="text-primary-500">się opłaca</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-3 gap-5">
            {roiCards.map(({ title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-7 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-5 mx-auto`}>
                      <Icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <h4 className="text-primary-950 font-semibold text-sm mb-2">{title}</h4>
                    <p className="text-surface-400 text-xs leading-relaxed">{desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Porozmawiajmy o <span className="text-primary-500">Twojej placówce</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">Bezpłatna konsultacja i indywidualna wycena.</p>
              <div className="mt-8">
                <Link href="/demo"><Button size="lg">Umów konsultację <ArrowRight className="h-4 w-4" /></Button></Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
