"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Phone,
  Clock,
  DollarSign,
  CalendarClock,
  ClipboardList,
  Trash2,
  Users,
  Bell,
  RefreshCw,
  HelpCircle,
  Zap,
  BarChart3,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Data ─── */

const challenges = [
  { title: "Długie zabiegi (1–2h)", desc: "Fotel na godzinę lub dwie bez pacjenta to droga strata — nie da się szybko nadrobić innym zabiegiem.", icon: Clock },
  { title: "Wysoka wartość wizyty", desc: "200–2000 zł za wizytę — każdy no-show to realna strata setek czy tysięcy złotych.", icon: DollarSign },
  { title: "Częste zmiany terminów", desc: "Pacjenci przełożą wizytę, odwołają na ostatnią chwilę — chaos w grafiku i trudność z wypełnieniem luk.", icon: CalendarClock },
  { title: "Konsultacje + leczenie", desc: "Różne typy wizyt — ortodontyczna vs kontrolna vs leczenie — wymagają właściwej kwalifikacji.", icon: ClipboardList },
  { title: "No-show kosztuje więcej niż w POZ", desc: "Średnia wizyta stomatologiczna jest wielokrotnie droższa — strata przy no-show jest proporcjonalnie wyższa.", icon: Trash2 },
  { title: "Pacjenci odkładają wizyty", desc: "Tracą się z bazy — brak przypomnień i follow-up powoduje, że klienci znikają na miesiące lub lata.", icon: Users },
];

const solutions = [
  { title: "Zapisuje na konsultacje i zabiegi", desc: "AI umawia zarówno proste kontrole, jak i dłuższe zabiegi — z pełną świadomością typu wizyty.", icon: CalendarClock },
  { title: "Wielokrotne przypomnienia SMS", desc: "72h, 48h, 24h, 2h przed wizytą — pacjent dostaje SMS z opcją potwierdzenia lub przełożenia.", icon: Bell },
  { title: "Szybkie przełożenie terminu", desc: "Pacjent dzwoni i w kilka sekund zmienia termin telefonicznie — bez czekania na recepcję.", icon: Phone },
  { title: "Odzyskiwanie anulowanych slotów", desc: "Lista rezerwowa — gdy pacjent odwoła, AI automatycznie proponuje termin osobom czekającym.", icon: RefreshCw },
  { title: "Wstępna kwalifikacja", desc: "Rozróżnia konsultację ortodontyczną, kontrolę i leczenie — kieruje do właściwego typu wizyty.", icon: ClipboardList },
  { title: "Odpowiedzi na FAQ", desc: "Cennik, przygotowanie do zabiegu, czas trwania — AI odpowiada na typowe pytania podczas rozmowy.", icon: HelpCircle },
];

/* ─── Page ─── */

export default function GabinetyStomatologicznePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Branże", href: "/branze" }, { name: "Gabinety stomatologiczne", href: "/branze/gabinety-stomatologiczne" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Dla placówek</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Gabinety <span className="text-primary-500">stomatologiczne</span>
                <br /><span className="text-surface-400 text-3xl sm:text-4xl font-light">Dentyści i ortodonci</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Wysoka wartość wizyty, drogie no-show i częste zmiany terminów. <span className="text-primary-950 font-medium">W stomatologii pusty fotel kosztuje znacznie więcej niż w POZ</span> — VoiceLink umawia, przypomina i odzyskuje utracone sloty.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/demo"><Button size="lg"><Phone className="h-4 w-4" /> Poproś o demo</Button></Link>
                <a href="#specyfika"><Button variant="outline" size="lg">Poznaj rozwiązanie <ArrowDown className="h-4 w-4" /></Button></a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── SPECYFIKA STOMATOLOGII ── */}
      <section id="specyfika" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">Wyzwania</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Specyfika <span className="text-red-500">stomatologii</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">Dlaczego no-show i puste sloty w gabinecie stomatologicznym bolą bardziej?</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {challenges.map(({ title, desc, icon: Icon }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className="w-12 h-12 rounded-xl bg-red-100/80 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-primary-950 mb-2">{title}</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── CO ROBI VOICELINK ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Rozwiązanie</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Co robi VoiceLink <span className="text-primary-500">dla stomatologii?</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map(({ title, desc, icon: Icon }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/80 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-primary-950 mb-2">{title}</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── KOSZT NO-SHOW ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4">Koszt no-show</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Ile tracisz na <span className="text-primary-500">pustych fotelach?</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <FadeIn delay={0.1}>
              <div className="text-center">
                <div className="relative mx-auto w-44 h-44 mb-4">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="14" strokeDasharray="314" strokeDashoffset="251" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-red-500">20%</span>
                    <span className="text-xs text-surface-400">no-show</span>
                  </div>
                </div>
                <p className="text-surface-500 text-sm">Bez VoiceLink</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-primary-200/60 bg-primary-50/30 p-6">
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-primary-950 font-medium mb-1">Obliczenia</p>
                    <p className="text-xs text-surface-500 leading-relaxed">
                      Gabinet z <strong className="text-primary-950">30 pacjentami/dzień</strong> i średnią wizytą 300 zł traci przy 20% no-show: <strong className="text-red-500">6 wizyt × 300 zł = 1800 zł dziennie</strong>. Z VoiceLink: redukcja do 4% = <strong className="text-emerald-600">odzyskane 1440 zł/dzień</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="text-center">
                <div className="relative mx-auto w-44 h-44 mb-4">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="14" strokeDasharray="314" strokeDashoffset="301" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-emerald-600">4%</span>
                    <span className="text-xs text-surface-400">no-show</span>
                  </div>
                </div>
                <p className="text-surface-500 text-sm">Z VoiceLink</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── LISTA REZERWOWA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Lista rezerwowa</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Odwołany termin? <span className="text-primary-500">Automatycznie wypełniony</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">Gdy pacjent anuluje wizytę, VoiceLink od razu proponuje wolny slot osobom z listy rezerwowej.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)] max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-primary-950 font-medium text-sm mb-0.5">Wolny termin u dr. Kowalski 14:00</p>
                    <p className="text-emerald-600 text-xs">Auto-SMS do 3 pacjentów z listy rezerwowej</p>
                  </div>
                </div>

                <div className="pl-4 border-l-2 border-primary-200 space-y-2">
                  <p className="text-surface-400 text-xs italic">Otrzymany SMS:</p>
                  <p className="text-surface-600 text-sm">
                    „Pojawił się wolny termin w gabinecie Stomatologia Kowalski — piątek 14:00. Potwierdź odbierając połączenie lub odpisz TAK."
                  </p>
                </div>

                <div className="flex items-center gap-2 text-surface-400 text-xs pt-2">
                  <RefreshCw className="w-4 h-4 shrink-0" />
                  <span>Anulowana wizyta → wolny slot → auto-SMS do listy rezerwowej → pierwsza osoba potwierdza</span>
                </div>
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
                Każdy pusty fotel <span className="text-primary-500">to strata przychodu</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Zobacz, jak VoiceLink zmniejszy no-show i odzyska utracone sloty w Twoim gabinecie. Bezpłatne demo.
              </p>
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
