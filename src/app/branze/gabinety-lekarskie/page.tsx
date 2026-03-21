"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  X as XIcon,
  Phone,
  Clock,
  AlignJustify,
  Users,
  HelpCircle,
  ClipboardList,
  CalendarClock,
  Heart,
  Mail,
  BarChart3,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Animated bar ─── */
function AnimatedBar({ title, value, fill, color, note }: { title: string; value: string; fill: number; color: string; note: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setWidth(fill); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [fill]);
  return (
    <div ref={ref} className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
      <h4 className="font-semibold text-primary-950 mb-4">{title}</h4>
      <div className={`text-3xl font-bold mb-3 ${color}`}>{value}</div>
      <div className="h-3 rounded-full bg-surface-200/60 overflow-hidden">
        <div className={`h-full rounded-full bg-current ${color} transition-all duration-1000 ease-out`} style={{ width: `${width}%` }} />
      </div>
      <p className="text-surface-400 text-xs mt-3">{note}</p>
    </div>
  );
}

/* ─── Data ─── */

const challenges = [
  { title: "1 rejestratorka na cały gabinet", desc: "Jedna osoba obsługuje wszystkie połączenia, pacjentów w poczekalni i dokumentację. Przeciążenie non-stop.", icon: Users },
  { title: "Telefon dzwoni w trakcie wizyty", desc: "Lekarz nie może odebrać, bo jest z pacjentem. Ignoruje połączenie lub przerywa wizytę — ktoś zawsze traci.", icon: Phone },
  { title: "Szczyty połączeń rano (8–10)", desc: "Wszyscy dzwonią tuż po otwarciu. Linia zajęta, pacjenci bez szans na połączenie.", icon: Clock },
  { title: "Brak odbioru w trakcie wizyty", desc: "Gdy recepcja jest przy pacjencie — telefon milknie. Dzwoniący tracą cierpliwość.", icon: AlignJustify },
  { title: "Wysoki no-show i puste terminy", desc: "15–20% pacjentów nie przychodzi bez uprzedzenia. Brak przypomnień = puste sloty i utracony przychód.", icon: Users },
  { title: "Powtarzalne pytania zajmują czas", desc: "Recepty, wyniki, godziny — te same odpowiedzi dziesiątki razy dziennie. Czas na ważniejsze sprawy.", icon: HelpCircle },
];

const solutions = [
  { title: "Odbiera gdy recepcja jest zajęta", desc: "Każdy numer dostaje odpowiedź. Zero sygnału zajętości — VoiceLink przejmuje gdy rejestratorka nie może.", icon: Phone },
  { title: "Zbiera powód wizyty", desc: "AI pyta, po co pacjent dzwoni — kontrola, nowy problem, recepta. Kieruje do odpowiedniej osoby.", icon: ClipboardList },
  { title: "Proponuje dostępne terminy", desc: "Sprawdza kalendarz i oferuje wolne sloty. Rezerwacja w czasie rozmowy — bez oddzwonienia.", icon: CalendarClock },
  { title: "Odciąża lekarza", desc: "Lekarz nie musi przerywać wizyty dla pytań o recepty czy godziny. AI obsłuży to w tle.", icon: Heart },
  { title: "Odpowiada na FAQ", desc: "Recepty, wyniki, godziny — automatyczne odpowiedzi na standardowe pytania.", icon: HelpCircle },
  { title: "Zapisuje wiadomości", desc: "Gdy potrzeba oddzwonienia — AI zbiera dane i przekazuje zespołowi. Nic się nie gubi.", icon: Mail },
];

const benefits = [
  { title: "Więcej zapisanych wizyt", value: "+35%", fill: 100, color: "text-emerald-600", note: "Więcej pacjentów zamiast sygnału zajętości" },
  { title: "Mniej przerywania lekarza", value: "-80%", fill: 80, color: "text-primary-500", note: "AI odbiera — lekarz skupia się na pacjentach" },
  { title: "Doświadczenie pacjenta", value: "4.8/5", fill: 96, color: "text-accent-500", note: "Natychmiastowa odpowiedź, brak frustracji" },
  { title: "Nowoczesny wizerunek", value: "Premium", fill: 100, color: "text-amber-500", note: "Technologia AI buduje zaufanie" },
];

const compTraditional = [
  "1 rejestratorka — przeciążona",
  "Sygnał zajętości w szczycie",
  "Lekarz przerywa wizytę",
  "Pacjent bez odpowiedzi → inny gabinet",
  "Powtarzalne pytania zajmują czas",
];

const compVoiceLink = [
  "AI odbiera gdy recepcja zajęta",
  "Każdy pacjent dostaje odpowiedź",
  "Lekarz nie przerywa wizyty",
  "Zbieranie powodu, terminy, FAQ",
  "Więcej zapisanych wizyt",
];

/* ─── Page ─── */

export default function GabinetyLekarskiePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Branże", href: "/branze" }, { name: "Gabinety lekarskie", href: "/branze/gabinety-lekarskie" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Dla placówek</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Gabinety <span className="text-primary-500">lekarskie</span>
                <br /><span className="text-surface-400 text-3xl sm:text-4xl font-light">Lekarze rodzinni i interniści</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Mały zespół, jedna rejestratorka na cały gabinet. Gdy ona zajęta — pacjent słyszy sygnał zajętości. <span className="text-primary-950 font-medium">VoiceLink odbiera każdy numer</span>, zbiera powód wizyty i odciąża zarówno recepcję, jak i lekarza.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/demo"><Button size="lg"><Phone className="h-4 w-4" /> Poproś o demo</Button></Link>
                <a href="#wyzwania"><Button variant="outline" size="lg">Poznaj rozwiązanie <ArrowDown className="h-4 w-4" /></Button></a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── WYZWANIA ── */}
      <section id="wyzwania" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">Wyzwania</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Wyzwania <span className="text-red-500">małego gabinetu</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">Typowy dzień w gabinecie jednoosobowym lub z małym zespołem.</p>
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

      {/* ── JAK VOICELINK POMAGA ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Rozwiązanie</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Jak VoiceLink <span className="text-primary-500">pomaga?</span>
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

      {/* ── KORZYŚCI ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Korzyści</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Co zyskujesz <span className="text-primary-500">z VoiceLink?</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <AnimatedBar {...b} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── RESEARCH CALLOUT ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-2xl border border-primary-200/60 bg-primary-50/30 p-8">
              <div className="flex items-start gap-4">
                <BarChart3 className="w-6 h-6 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-950 font-medium mb-2">Dane branżowe</p>
                  <p className="text-surface-600 leading-relaxed">
                    Według raportów branżowych (Accenture, Salesforce Healthcare Trends), pacjenci coraz częściej oczekują <strong className="text-primary-950">cyfrowej i natychmiastowej komunikacji</strong> z placówką. Jeśli pacjent nie dodzwoni się dziś — zadzwoni do innego gabinetu.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── PORÓWNANIE ── */}
      <section className="py-16 md:py-24">
        <Container size="default">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Porównanie</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Tradycyjny gabinet <span className="text-primary-500">vs Gabinet z VoiceLink</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-red-200/80 bg-red-50/30 p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <XIcon className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-primary-950 font-semibold">Tradycyjny gabinet</h3>
                </div>
                <div className="space-y-3">
                  {compTraditional.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <XIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="text-surface-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-primary-950 font-semibold">Gabinet z VoiceLink</h3>
                </div>
                <div className="space-y-3">
                  {compVoiceLink.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-surface-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Nie trać pacjentów przez <span className="text-primary-500">zajętą linię</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                VoiceLink odbiera każdy numer, zbiera powód wizyty i odciąża Twój gabinet. Bezpłatne demo.
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
