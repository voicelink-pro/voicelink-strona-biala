"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Phone,
  Mic,
  Brain,
  Search,
  CalendarCheck,
  Plug,
  BarChart3,
  Users,
  AlertTriangle,
  Shield,
  Lock,
  ClipboardList,
  Globe,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Data ─── */

const techSteps = [
  { title: "Rozpoznawanie mowy", desc: "Zamiana mowy pacjenta na tekst w czasie rzeczywistym (ASR)", icon: Mic, color: "pink" as const },
  { title: "Analiza intencji", desc: "AI rozumie kontekst i cel rozmowy, nie tylko słowa kluczowe (NLP)", icon: Brain, color: "accent" as const },
  { title: "Generowanie odpowiedzi", desc: "Model AI tworzy naturalną, kontekstową odpowiedź (LLM)", icon: Search, color: "primary" as const },
  { title: "Synteza mowy", desc: "Zamiana tekstu na naturalny głos, bliski ludzkiemu (TTS)", icon: Mic, color: "emerald" as const },
  { title: "Integracje API", desc: "Połączenie z systemem placówki, kalendarzem i SMS-ami", icon: Plug, color: "amber" as const },
];

const timelineSteps = [
  {
    num: "01", title: "Pacjent dzwoni", color: "pink" as const,
    desc: "Połączenie trafia na numer placówki. System automatycznie odbiera — 0 sekund oczekiwania, brak sygnału zajętości.",
    tags: ["Natychmiastowe połączenie", "Brak zajętości", "24/7"],
  },
  {
    num: "02", title: "AI odbiera i rozpoczyna rozmowę", color: "accent" as const,
    desc: "Przywitanie zgodne z marką Twojej placówki, naturalny głos. Brak menu \"wybierz 1, wybierz 2\" — asystent rozumie język naturalny.",
    tags: ["Personalizowane powitanie", "Naturalny głos", "Bez IVR"],
  },
  {
    num: "03", title: "Rozpoznanie intencji", color: "primary" as const,
    desc: "System analizuje czego dotyczy rozmowa. Model NLP rozpoznaje kontekst, a nie tylko słowa kluczowe.",
    tags: ["Rejestracja wizyty", "Zmiana terminu", "Pytanie o godziny", "Pilna konsultacja", "Informacja", "Odwołanie"],
    tagGrid: true,
  },
  {
    num: "04", title: "Realizacja zadania", color: "amber" as const,
    desc: "W zależności od potrzeby asystent wykonuje konkretne działania automatycznie.",
    checks: ["Sprawdza dostępne terminy", "Zapisuje wizytę w kalendarzu", "Zbiera dane (imię, PESEL, telefon)", "Wysyła SMS potwierdzający", "Przekazuje rozmowę do recepcji (jeśli trzeba)"],
  },
  {
    num: "05", title: "Integracja z systemem", color: "accent" as const,
    desc: "Asystent komunikuje się z systemami placówki. Dane zapisywane automatycznie — bez ręcznego przepisywania.",
    tags: ["System rejestracji", "CRM", "Kalendarz lekarzy", "System SMS", "Baza wiedzy"],
    tagGrid: true,
  },
  {
    num: "06", title: "Raportowanie i analiza", color: "emerald" as const,
    desc: "Po każdej rozmowie system generuje dane, które dają kontrolę i możliwość optymalizacji.",
    checks: ["Log rozmowy z detalami", "Statystyki i analityka", "Szczegółowy raport w panelu"],
  },
];

const securityFeatures = [
  { title: "Szyfrowanie danych", desc: "Wszystkie dane są szyfrowane w tranzycie (TLS 1.3) i w spoczynku (AES-256).", icon: Lock },
  { title: "Ograniczony dostęp", desc: "Dostęp do danych jest ściśle kontrolowany i logowany.", icon: Shield },
  { title: "Logowanie aktywności", desc: "Pełna historia operacji dla celów audytu i kontroli.", icon: ClipboardList },
  { title: "Serwery w UE", desc: "Dane przechowywane na serwerach w Unii Europejskiej, zgodnie z RODO.", icon: Globe },
  { title: "Pełna zgodność z RODO", desc: "System zaprojektowany zgodnie z zasadami ochrony danych osobowych.", icon: CheckCircle },
];

const wdrozenieSteps = [
  { num: 1, title: "Analiza potrzeb", desc: "Wspólnie omawiamy potrzeby Twojej placówki — ile połączeń, jakie procesy, jakie systemy wykorzystujesz.", color: "pink" as const },
  { num: 2, title: "Projekt scenariusza rozmów", desc: "Tworzymy scenariusze dialogów dopasowane do Twojej specjalizacji, z uwzględnieniem najczęstszych pytań pacjentów.", color: "accent" as const },
  { num: 3, title: "Integracja z systemem", desc: "Podłączamy asystenta do Twojego systemu rejestracji, kalendarza lekarzy i narzędzi SMS.", color: "primary" as const },
  { num: 4, title: "Testy", desc: "Przeprowadzamy dokładne testy scenariuszy, integracji i jakości rozmów. Dopracowujemy każdy szczegół.", color: "amber" as const },
  { num: 5, title: "Uruchomienie", desc: "Asystent zaczyna odbierać połączenia. Monitorujemy pierwsze dni i optymalizujemy działanie na bieżąco.", color: "emerald" as const },
];

const resultStats = [
  { value: "100%", label: "odebranych połączeń", color: "text-primary-950" },
  { value: "-70%", label: "obciążenia recepcji", color: "text-accent-500" },
  { value: "<2s", label: "czas obsługi", color: "text-primary-500" },
  { value: "-40%", label: "nieodebranych wizyt", color: "text-emerald-600" },
  { value: "+95%", label: "satysfakcji pacjentów", color: "text-pink-500" },
];

const flowNodes = [
  { label: "Pacjent", icon: Users, color: "pink" as const },
  { label: "AI", icon: Brain, color: "accent" as const },
  { label: "Analiza", icon: Search, color: "primary" as const },
  { label: "System", icon: Plug, color: "amber" as const },
  { label: "Potwierdzenie", icon: CheckCircle, color: "emerald" as const },
  { label: "Raport", icon: BarChart3, color: "accent" as const },
];

const colorMap: Record<string, { bg: string; text: string; tagBg: string; tagText: string; tagBorder: string }> = {
  pink: { bg: "bg-pink-100/80", text: "text-pink-500", tagBg: "bg-pink-50", tagText: "text-pink-600", tagBorder: "border-pink-200" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500", tagBg: "bg-accent-50", tagText: "text-accent-600", tagBorder: "border-accent-200" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500", tagBg: "bg-primary-50", tagText: "text-primary-600", tagBorder: "border-primary-200" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600", tagBg: "bg-emerald-50", tagText: "text-emerald-600", tagBorder: "border-emerald-200" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600", tagBg: "bg-amber-50", tagText: "text-amber-600", tagBorder: "border-amber-200" },
};

/* ─── Page ─── */

export default function ProcesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Jak to działa", href: "/jak-to-dziala" }, { name: "Proces wdrożenia", href: "/jak-to-dziala/proces" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Jak to działa?</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Jak działa <span className="text-primary-500">Asystent Głosowy AI?</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Asystent działa jak wirtualna recepcja. Odbiera połączenie, rozumie intencję rozmówcy, prowadzi naturalną rozmowę i wykonuje konkretne działania — np. zapisuje wizytę lub przekazuje sprawę dalej.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8">
                <Link href="/demo"><Button size="lg"><Phone className="h-4 w-4" /> Poproś o demo</Button></Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── CO DZIEJE SIE W TLE ── */}
      <section className="py-16 md:py-20">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Technologia</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Co dzieje się <span className="text-primary-500">w tle?</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-2xl mx-auto">System słucha rozmowy, przekształca mowę na tekst, analizuje jej znaczenie i generuje odpowiedź w czasie rzeczywistym — w mniej niż sekundę.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {techSteps.map(({ title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4 mx-auto`}>
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

      {/* ── KROK PO KROKU ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Proces</span>
              <h2 id="krok-po-kroku" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Krok po <span className="text-primary-500">kroku</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">Od momentu połączenia do zakończenia rozmowy — każdy etap jest zautomatyzowany i przemyślany.</p>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-6">
            {timelineSteps.map((step, idx) => {
              const c = colorMap[step.color];
              return (
                <FadeIn key={step.num} delay={idx * 0.08}>
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center shrink-0`}>
                        <span className={`${c.text} text-xs font-bold`}>{step.num}</span>
                      </div>
                      {idx < timelineSteps.length - 1 && <div className="w-px flex-1 bg-surface-200 mt-2" />}
                    </div>
                    <div className="rounded-2xl border border-surface-200/80 bg-white p-6 flex-1 mb-0">
                      <h4 className="text-primary-950 font-semibold mb-2">{step.title}</h4>
                      <p className="text-surface-500 text-sm leading-relaxed mb-3">{step.desc}</p>
                      {step.tags && (
                        <div className={`flex flex-wrap gap-2 ${step.tagGrid ? "grid grid-cols-2 sm:grid-cols-3" : ""}`}>
                          {step.tags.map((tag) => (
                            <span key={tag} className={`px-3 py-1${step.tagGrid ? ".5 rounded-lg text-center" : " rounded-full"} text-xs ${c.tagBg} ${c.tagText} border ${c.tagBorder}`}>{tag}</span>
                          ))}
                        </div>
                      )}
                      {step.checks && (
                        <div className="space-y-2">
                          {step.checks.map((ch) => (
                            <div key={ch} className="flex items-center gap-2">
                              <CheckCircle className={`w-4 h-4 ${c.text} flex-shrink-0`} />
                              <span className="text-surface-600 text-sm">{ch}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── BEZPIECZENSTWO I RODO ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Bezpieczeństwo</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Zgodność z <span className="text-primary-500">RODO</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed mb-8">Bezpieczeństwo danych pacjentów to nasz priorytet. System spełnia wszystkie wymagania prawne dotyczące ochrony danych osobowych w branży medycznej.</p>
                <div className="space-y-4">
                  {securityFeatures.map(({ title, desc, icon: Icon }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-primary-950 font-medium text-sm mb-1">{title}</h4>
                        <p className="text-surface-400 text-xs leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 text-center relative overflow-hidden shadow-[var(--shadow-card)]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 to-primary-50/20" />
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-primary-100 flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-950 mb-2">100% RODO</h3>
                  <p className="text-surface-500 text-sm mb-6">Pełna zgodność z przepisami UE</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ v: "AES-256", l: "Szyfrowanie" }, { v: "TLS 1.3", l: "Połączenia" }, { v: "OSOZ API", l: "Certyfikacja" }, { v: "EU", l: "Serwery" }].map((b) => (
                      <div key={b.v} className="rounded-xl border border-surface-200/60 bg-surface-50/60 p-3">
                        <span className="text-emerald-600 text-xs font-bold block">{b.v}</span>
                        <span className="text-surface-400 text-xs">{b.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── CO JESLI AI CZEGOS NIE WIE ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-500 mb-4">Eskalacja</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Co jeśli AI <span className="text-primary-500">czegoś nie wie?</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-2xl mx-auto">Pacjent nigdy nie zostaje bez pomocy. System posiada kilka mechanizmów, które zapewniają ciągłość obsługi nawet w nietypowych sytuacjach.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <StaggerItem>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-7 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                <div className="w-14 h-14 rounded-2xl bg-pink-100/80 flex items-center justify-center mb-5 mx-auto">
                  <Users className="w-7 h-7 text-pink-500" />
                </div>
                <h3 className="text-primary-950 font-semibold mb-2">Przekierowanie do człowieka</h3>
                <p className="text-surface-500 text-sm leading-relaxed">Płynne przekazanie rozmowy do pracownika recepcji bez przerywania połączenia.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-7 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                <div className="w-14 h-14 rounded-2xl bg-accent-100/80 flex items-center justify-center mb-5 mx-auto">
                  <AlertTriangle className="w-7 h-7 text-accent-500" />
                </div>
                <h3 className="text-primary-950 font-semibold mb-2">Reguły eskalacji</h3>
                <p className="text-surface-500 text-sm leading-relaxed">Konfigurowane scenariusze, kiedy i jak przekierować rozmowę dalej.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
          <FadeIn delay={0.2}>
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/40 p-6 text-center">
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <p className="text-primary-950 font-semibold">Pacjent nigdy nie zostaje bez pomocy.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── WDROZENIE ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4">Wdrożenie</span>
              <h2 id="wdrozenie" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Jak wygląda <span className="text-primary-500">wdrożenie?</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">Prosty i przejrzysty proces, który nie wymaga wiedzy technicznej po Twojej stronie.</p>
            </div>
          </FadeIn>
          <div className="max-w-3xl mx-auto space-y-5">
            {wdrozenieSteps.map((s, idx) => {
              const c = colorMap[s.color];
              return (
                <FadeIn key={s.num} delay={idx * 0.08}>
                  <div className="flex items-start gap-5">
                    <div className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center shrink-0`}>
                      <span className={`${c.text} font-bold text-sm`}>{s.num}</span>
                    </div>
                    <div className="rounded-2xl border border-surface-200/80 bg-white p-6 flex-1">
                      <h4 className="text-primary-950 font-semibold mb-2">{s.title}</h4>
                      <p className="text-surface-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <FadeIn delay={0.4}>
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="rounded-2xl border border-primary-200/60 bg-primary-50/40 p-6 text-center">
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <p className="text-surface-600 text-sm">Średni czas wdrożenia: <span className="text-primary-950 font-bold">14-30 dni</span> <span className="text-surface-400">(w zależności od integracji)</span></p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── EFEKT PO WDROZENIU ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Rezultaty</span>
              <h2 id="efekt-wdrozenia" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Efekt po <span className="text-primary-500">wdrożeniu</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {resultStats.map(({ value, label, color }) => (
              <StaggerItem key={label}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className={`text-3xl font-bold ${color} mb-2`}>{value}</div>
                  <p className="text-surface-500 text-sm">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── SCHEMAT WIZUALNY ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Schemat</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Cały proces <span className="text-primary-500">w jednym rzucie oka</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-center gap-3">
              {flowNodes.map((node, i) => {
                const c = colorMap[node.color];
                const Icon = node.icon;
                return (
                  <div key={node.label} className="contents">
                    <div className="rounded-2xl border border-surface-200/80 bg-white px-5 py-4 text-center shadow-sm">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className={`w-5 h-5 ${c.text}`} />
                      </div>
                      <span className="text-primary-950 text-xs font-medium">{node.label}</span>
                    </div>
                    {i < flowNodes.length - 1 && <ArrowRight className="w-5 h-5 text-surface-300 shrink-0" />}
                  </div>
                );
              })}
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex flex-col items-center gap-2">
              {flowNodes.map((node, i) => {
                const c = colorMap[node.color];
                const Icon = node.icon;
                return (
                  <div key={node.label} className="contents">
                    <div className="rounded-2xl border border-surface-200/80 bg-white px-6 py-4 text-center w-48 shadow-sm">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className={`w-5 h-5 ${c.text}`} />
                      </div>
                      <span className="text-primary-950 text-xs font-medium">{node.label}</span>
                    </div>
                    {i < flowNodes.length - 1 && <ArrowDown className="w-4 h-4 text-surface-300" />}
                  </div>
                );
              })}
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
                Przekonaj się <span className="text-primary-500">na własne uszy</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">Umów bezpłatną prezentację i posłuchaj jak asystent AI obsługuje połączenia w Twojej placówce.</p>
              <div className="mt-8">
                <Link href="/demo"><Button size="lg">Poproś o demo <ArrowRight className="h-4 w-4" /></Button></Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
