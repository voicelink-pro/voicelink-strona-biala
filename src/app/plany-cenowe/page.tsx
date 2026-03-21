"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Settings,
  RefreshCw,
  Code2,
  Link2,
  Layers,
  MessageSquare,
  TrendingUp,
  DollarSign,
  BarChart3,
  AlertCircle,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { generateFAQSchema } from "@/lib/schema";

/* ─── Data ─── */

const wdrozenieFactors = [
  { icon: Code2, title: "Zakres czynności agenta", desc: "Scenariusze rozmów, automatyzacje, reguły działania" },
  { icon: Link2, title: "Liczba systemów do integracji", desc: "Systemy rezerwacyjne, kalendarze, bazy danych placówki" },
  { icon: Layers, title: "Złożoność projektu", desc: "Liczba lokalizacji, wielojęzyczność, specyficzne procesy" },
];

const utrzymanieFactors = [
  { icon: Phone, title: "Wolumen minut rozmów", desc: "Im więcej minut, tym niższa stawka za minutę" },
  { icon: MessageSquare, title: "Wysłane SMS-y", desc: "Przypomnienia, potwierdzenia wizyt, powiadomienia" },
  { icon: TrendingUp, title: "Skalowalność", desc: "Brak sztywnych limitów — skalujesz w górę i w dół" },
];

const tradItems = [
  "Koszt stały pracownika",
  "Ograniczone godziny pracy",
  "1 rozmowa na raz",
  "Błędy ludzkie",
  "Urlopy i L4",
  "Szkolenie nowych pracowników",
];

const aiItems = [
  "Koszt zmienny",
  "Dostępność 24/7",
  "Wiele rozmów jednocześnie",
  "Spójny standard obsługi",
  "Zero przerw",
  "Natychmiastowe wdrożenie",
];

const benefits = [
  { icon: TrendingUp, color: "accent" as const, title: "Skalowalność", desc: "AI rośnie razem z Twoją firmą. Zwiększasz minuty lub scenariusze bez zatrudniania kolejnych osób." },
  { icon: DollarSign, color: "primary" as const, title: "Ułamek kosztu etatu", desc: "Miesięczne utrzymanie asystenta AI to ułamek kosztu pracownika — przy 6-9 tys. zł za pełny etat różnica jest ogromna." },
  { icon: BarChart3, color: "emerald" as const, title: "ROI od pierwszego miesiąca", desc: "Typowa placówka zwraca koszt pakietu już w pierwszym miesiącu dzięki redukcji ruchu na recepcji." },
];

const benefitColors = {
  accent: { bg: "bg-accent-50", text: "text-accent-500", border: "border-accent-100" },
  primary: { bg: "bg-primary-50", text: "text-primary-500", border: "border-primary-100" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
};

const faqItems = [
  { q: "Czym VoiceLink różni się od tanich voicebotów?", a: "VoiceLink to nie gotowy produkt z pudełka. Każde wdrożenie projektujemy indywidualnie — scenariusze rozmów, integracja z Twoim konkretnym systemem, logika obsługi dopasowana do specyfiki placówki. To dedykowana infrastruktura AI, nie uniwersalny bot z jednym skryptem dla wszystkich." },
  { q: "Dlaczego wdrożenie kosztuje 2 500 – 15 000 zł?", a: "Bo to nie instalacja gotowej aplikacji. Projektujemy scenariusze rozmów pod Twoją placówkę, integrujemy system z Twoim kalendarzem i bazą danych, konfigurujemy logikę obsługi i testujemy z Twoim zespołem. To praca specjalistów AI, nie kliknięcie 'zainstaluj'." },
  { q: "Jak wygląda rozliczenie miesięczne?", a: "Miesięczny koszt utrzymania jest rozliczany minutowo — płacisz za faktycznie wykorzystane minuty rozmów oraz wysłane SMS-y. Im większy wolumen, tym niższa stawka za minutę." },
  { q: "Czy trzeba kupować sprzęt?", a: "Nie. VoiceLink działa w chmurze — wystarczy połączenie internetowe i numer telefonu." },
  { q: "Jak długo trwa wdrożenie?", a: "Średni czas wdrożenia to 14–30 dni. Zależy od złożoności integracji i liczby scenariuszy do zaprogramowania. Każdy projekt jest budowany od podstaw pod Twoją placówkę." },
  { q: "Czy działa z naszym systemem rezerwacyjnym?", a: "Integrujemy się z popularnymi systemami medycznymi: KS SOMED, KS PPS, MediPorta, Serum, MyDrEDM i inne. Jeśli Twój system nie jest na liście — porozmawiajmy, sprawdzimy możliwości. Każdą integrację konfigurujemy indywidualnie." },
  { q: "Czy mogę w każdej chwili zrezygnować?", a: "Tak. Umowy miesięczne z 30-dniowym okresem wypowiedzenia. Nie wiążemy długoterminowymi kontraktami." },
];

/* ─── Page ─── */

export default function PlanyCenowePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Breadcrumbs items={[{ name: "Cennik", href: "/cennik" }, { name: "Plany cenowe", href: "/plany-cenowe" }]} />
      <JsonLd data={generateFAQSchema(faqItems.map((f) => ({ question: f.q, answer: f.a, category: "pricing" as const })))} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="text-center max-w-3xl mx-auto">
            <FadeIn>
              <Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Cennik</Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Indywidualny <span className="text-primary-500">cennik</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-xl text-surface-600 leading-relaxed">Każda placówka jest inna — cenę dostosowujemy do Twoich potrzeb</p>
              <p className="mt-3 text-surface-500 max-w-xl mx-auto leading-relaxed">Wdrożenie asystenta AI to inwestycja, która zwraca się już w pierwszym miesiącu. Przejrzysty model: jednorazowe wdrożenie + miesięczne utrzymanie.</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── MODEL CENOWY ── */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Wdrozenie */}
            <FadeIn>
              <div className="rounded-3xl border border-accent-200/60 bg-gradient-to-br from-accent-50/40 to-white p-8 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-accent-50 border border-accent-100 mb-6">
                  <Settings className="w-7 h-7 text-accent-500" />
                </div>
                <div className="inline-flex items-center rounded-full px-3 py-1 mb-4 border border-accent-200/60 bg-accent-50/60 w-fit">
                  <span className="text-xs text-accent-600 font-medium">Opłata jednorazowa</span>
                </div>
                <h2 className="text-2xl font-semibold text-primary-950 mb-2">Wdrożenie asystenta AI</h2>
                <div className="text-3xl font-bold text-accent-500 mb-4 mt-2">5 000 – 25 000 zł</div>
                <p className="text-surface-500 text-sm leading-relaxed mb-6">Jednorazowy koszt konfiguracji i uruchomienia asystenta. Cena zależy od złożoności projektu.</p>
                <div className="space-y-4 flex-1">
                  <p className="text-xs text-surface-400 uppercase tracking-wider font-medium mb-2">Cena zależy od:</p>
                  {wdrozenieFactors.map((f) => (
                    <div key={f.title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent-50 border border-accent-100 flex-shrink-0 mt-0.5">
                        <f.icon className="w-4 h-4 text-accent-500" />
                      </div>
                      <div>
                        <h4 className="text-primary-950 text-sm font-medium">{f.title}</h4>
                        <p className="text-surface-400 text-xs mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Utrzymanie */}
            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/40 to-white p-8 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-50 border border-emerald-100 mb-6">
                  <RefreshCw className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="inline-flex items-center rounded-full px-3 py-1 mb-4 border border-emerald-200/60 bg-emerald-50/60 w-fit">
                  <span className="text-xs text-emerald-700 font-medium">Opłata miesięczna</span>
                </div>
                <h2 className="text-2xl font-semibold text-primary-950 mb-2">Utrzymanie i rozmowy</h2>
                <div className="text-3xl font-bold text-emerald-600 mb-4 mt-2">Rozliczenie minutowe</div>
                <p className="text-surface-500 text-sm leading-relaxed mb-6">Miesięczny koszt utrzymania zależy od wolumenu minut rozmów i wysłanych SMS-ów. Płacisz za realne wykorzystanie.</p>
                <div className="space-y-4 flex-1">
                  <p className="text-xs text-surface-400 uppercase tracking-wider font-medium mb-2">Składniki kosztu miesięcznego:</p>
                  {utrzymanieFactors.map((f) => (
                    <div key={f.title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 border border-emerald-100 flex-shrink-0 mt-0.5">
                        <f.icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-primary-950 text-sm font-medium">{f.title}</h4>
                        <p className="text-surface-400 text-xs mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* CTA pod kartami */}
          <FadeIn delay={0.25}>
            <div className="rounded-2xl border border-primary-200/60 bg-gradient-to-br from-primary-50/30 to-accent-50/20 p-8 max-w-2xl mx-auto text-center">
              <p className="text-surface-500 text-sm mb-3">Każdy projekt wyceniamy indywidualnie po bezpłatnej konsultacji.</p>
              <p className="text-primary-950 font-medium mb-6">Porozmawiajmy o Twoich potrzebach — przygotujemy ofertę dopasowaną do Twojej placówki.</p>
              <Link href="/demo">
                <Button size="lg"><Phone className="h-4 w-4" /> Poproś o indywidualną wycenę</Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── COMPARISON ── */}
      <section id="porownanie" className="py-16 md:py-20">
        <Container size="default">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Tradycyjna rejestracja <span className="text-primary-500">vs Asystent AI</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="rounded-2xl border border-red-200/60 bg-red-50/30 p-6 h-full">
                <h3 className="text-lg font-semibold text-red-500 mb-6 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Tradycyjna rejestracja
                </h3>
                <ul className="space-y-3 text-surface-600 text-sm">
                  {tradItems.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">&bull;</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/30 p-6 h-full">
                <h3 className="text-lg font-semibold text-emerald-600 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Asystent AI VoiceLink
                </h3>
                <ul className="space-y-3 text-surface-600 text-sm">
                  {aiItems.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">&#10003;</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── DLACZEGO SIE OPLACA ── */}
      <section id="dlaczego-warto" className="py-16 md:py-20">
        <Container size="default">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Inwestycja</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Dlaczego to się <span className="text-primary-500">opłaca?</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => {
              const c = benefitColors[b.color];
              return (
                <StaggerItem key={b.title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 shadow-sm h-full">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.bg} ${c.border} border mb-4`}>
                      <b.icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-950 mb-2">{b.title}</h3>
                    <p className="text-surface-500 text-sm">{b.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Pytania</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Najczęstsze <span className="text-primary-500">pytania</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-surface-200/80 bg-white overflow-hidden shadow-sm">
              {faqItems.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="border-b border-surface-200/60 last:border-b-0">
                    <button type="button" onClick={() => setOpenFaq(isOpen ? null : i)} className="w-full text-left cursor-pointer px-6 py-4 flex justify-between items-center gap-4 text-surface-600 hover:text-primary-950 transition-colors">
                      <h4 className="text-sm font-medium m-0">{f.q}</h4>
                      <ChevronDown className={`w-4 h-4 text-surface-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? "200px" : "0px" }}>
                      <div className="px-6 pb-4 text-surface-500 text-[0.9375rem] leading-relaxed">{f.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Porozmawiajmy <span className="text-primary-500">o Twojej placówce</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">Bezpłatna konsultacja, indywidualna wycena i analiza potencjalnych oszczędności.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/demo"><Button size="lg">Umów bezpłatną konsultację <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link href="/kalkulator-oszczednosci"><Button variant="outline" size="lg">Oblicz oszczędności</Button></Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
