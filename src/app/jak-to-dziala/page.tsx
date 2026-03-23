"use client";

import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Monitor,
  CalendarClock,
  CheckCircle,
  Zap,
  ClipboardList,
  Link2,
  Cpu,
  PlayCircle,
  Shield,
  Calculator,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Data ─── */

const topicCards = [
  {
    href: "/funkcje",
    title: "Funkcje asystenta AI",
    desc: "Odkryj pełny zakres możliwości naszego asystenta: odbieranie połączeń, wielojęzyczność, zarządzanie rezerwacjami, udzielanie informacji, przypomnienia SMS i wiele więcej.",
    icon: Zap,
    color: "amber" as const,
  },
  {
    href: "/jak-to-dziala/proces",
    title: "Jak to działa krok po kroku",
    desc: "Szczegółowy opis procesu: od momentu połączenia pacjenta, przez rozpoznanie intencji, wykonanie akcji w systemie, aż po potwierdzenie i raportowanie.",
    icon: ClipboardList,
    color: "pink" as const,
  },
  {
    href: "/integracje",
    title: "Integracje z systemami",
    desc: "VoiceLink integruje się z popularnymi systemami medycznymi: KS SOMED, KS PPS, MediPorta, Serum, MyDrEDM. Sprawdź jak łączymy się z Twoim systemem rezerwacyjnym.",
    icon: Link2,
    color: "primary" as const,
  },
  {
    href: "/technologia-ai",
    title: "Technologia AI",
    desc: "Jak działa sztuczna inteligencja głosowa? Speech-to-Text, modele AI, Text-to-Speech — wszystko w ułamku sekundy. Koniec ery robotycznych IVR.",
    icon: Cpu,
    color: "accent" as const,
  },
];

const demoCard = {
  href: "/demo",
  title: "Demo — zobacz AI w akcji",
  desc: "Chcesz zobaczyć jak to naprawdę działa? Umów bezpłatną prezentację i porozmawiaj z asystentem VoiceLink na żywo.",
  icon: PlayCircle,
  color: "emerald" as const,
};

const colorMap: Record<string, { bg: string; text: string }> = {
  amber: { bg: "bg-amber-100/80", text: "text-amber-600" },
  pink: { bg: "bg-pink-100/80", text: "text-pink-500" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
};

const securityBadges = [
  "AES-256",
  "TLS 1.3",
  "Serwery w EU",
  "Zgodność z RODO",
  "OSOZ API",
];

const processSteps = [
  { num: "1", label: "Połączenie", sub: "Pacjent dzwoni", icon: Phone, color: "pink" as const },
  { num: "2", label: "AI analizuje", sub: "Rozpoznaje intencję", icon: Monitor, color: "accent" as const },
  { num: "3", label: "Rezerwacja", sub: "System placówki", icon: CalendarClock, color: "primary" as const },
  { num: "4", label: "Potwierdzenie", sub: "SMS do pacjenta", icon: CheckCircle, color: "emerald" as const },
];

/* ─── Page ─── */

export default function JakToDzialaPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Jak to działa", href: "/jak-to-dziala" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Jak to działa</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Poznaj VoiceLink <span className="text-primary-500">od środka</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed">
                Każde wdrożenie VoiceLink jest projektowane indywidualnie pod Twoją placówkę. Poznaj technologię, proces i możliwości — prosto i przejrzyście.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── PROCESS FLOW GRAPHIC ── */}
      <section className="py-16 md:py-20">
        <Container size="default">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-[var(--shadow-card)] max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-2">
                  {processSteps.map((step, i) => {
                    const c = colorMap[step.color];
                    const Icon = step.icon;
                    return (
                      <div key={step.num} className="contents">
                        <div className="flex flex-col items-center text-center flex-1 max-w-[140px]">
                          <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mb-3 relative`}>
                            <span className={`absolute -top-2 -right-2 w-5 h-5 rounded-full ${c.bg} border border-surface-200 flex items-center justify-center text-[9px] ${c.text} font-bold`}>{step.num}</span>
                            <Icon className={`w-6 h-6 ${c.text}`} />
                          </div>
                          <span className="text-primary-950 text-xs font-medium">{step.label}</span>
                          <span className="text-surface-400 text-[10px] mt-0.5">{step.sub}</span>
                        </div>
                        {i < processSteps.length - 1 && (
                          <>
                            <div className="hidden md:block flex-shrink-0 w-8">
                              <div className="h-px w-full bg-gradient-to-r from-surface-200 to-surface-300" />
                            </div>
                            <ChevronDown className="w-4 h-4 text-surface-300 md:hidden" />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── TOPIC CARDS ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Poznaj szczegóły</span>
              <h2 id="wszystko-o-voicelink" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Wszystko o <span className="text-primary-500">VoiceLink</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-2xl mx-auto">VoiceLink to nie gotowy voicebot — to dedykowane rozwiązanie budowane pod Twoją placówkę. Wybierz temat i poznaj szczegóły.</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {topicCards.map(({ href, title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={href}>
                  <Link href={href} className="block rounded-2xl border border-surface-200/80 bg-white p-8 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent group">
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mb-6`}>
                      <Icon className={`h-7 w-7 ${c.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-950 mb-3">{title}</h3>
                    <p className="text-surface-500 text-sm leading-relaxed mb-6">{desc}</p>
                    <span className="text-primary-500 text-sm font-medium group-hover:text-primary-600 transition-colors inline-flex items-center gap-1.5">
                      Dowiedz się więcej <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-5 max-w-lg mx-auto">
              <Link href={demoCard.href} className="block rounded-2xl border border-surface-200/80 bg-white p-8 transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent group">
                <div className={`w-14 h-14 rounded-2xl ${colorMap[demoCard.color].bg} flex items-center justify-center mb-6`}>
                  <demoCard.icon className={`h-7 w-7 ${colorMap[demoCard.color].text}`} />
                </div>
                <h3 className="text-xl font-semibold text-primary-950 mb-3">{demoCard.title}</h3>
                <p className="text-surface-500 text-sm leading-relaxed mb-6">{demoCard.desc}</p>
                <span className="text-primary-500 text-sm font-medium group-hover:text-primary-600 transition-colors inline-flex items-center gap-1.5">
                  Dowiedz się więcej <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── BEZPIECZENSTWO I RODO ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100/80 flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Bezpieczeństwo</span>
              <h2 id="bezpieczenstwo-rodo" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Bezpieczeństwo i <span className="text-primary-500">RODO</span>
              </h2>
              <p className="mt-6 text-surface-500 leading-relaxed max-w-2xl mx-auto">
                Wszystkie dane przetwarzane przez VoiceLink są szyfrowane (AES-256, TLS 1.3), przechowywane na serwerach w Unii Europejskiej i w pełni zgodne z RODO. Certyfikacja OSOZ API potwierdza bezpieczeństwo integracji z systemami medycznymi.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {securityBadges.map((badge) => (
                  <div key={badge} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-surface-200/80 bg-white text-xs shadow-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-surface-600">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Masz pytania <span className="text-primary-500">o technologię?</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Umów bezpłatną konsultację — wyjaśnimy wszystko bez technicznego żargonu.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo"><Button size="lg">Umów konsultację <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link href="/kalkulator-oszczednosci"><Button variant="outline" size="lg"><Calculator className="h-4 w-4" /> Oblicz oszczędności</Button></Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
