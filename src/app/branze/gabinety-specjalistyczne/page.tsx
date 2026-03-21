"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Phone,
  ClipboardList,
  Clock,
  FileText,
  ArrowRightLeft,
  CheckCircle,
  UserCircle,
  Beaker,
  CalendarClock,
  Heart,
  Paintbrush,
  Eye,
  BookOpen,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Animated bar ─── */
function AnimatedBar({ label, value, fill, color, valueColor }: { label: string; value: string; fill: number; color: string; valueColor?: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setWidth(fill); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [fill]);
  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-surface-500">{label}</span>
        <span className={`font-semibold ${valueColor || "text-primary-950"}`}>{value}</span>
      </div>
      <div className="h-3 rounded-full bg-surface-200/60 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

/* ─── Data ─── */

const qualificationFeatures = [
  { title: "Zbieranie objawów przed wizytą", desc: "AI w trakcie rozmowy telefonicznej zbiera informacje o objawach - lekarz widzi pełny obraz już na początku wizyty.", icon: ClipboardList },
  { title: "Określenie pilności", desc: "Rutyna vs pilne - AI rozróżnia i kieruje do odpowiednich terminów. Pilne przypadki trafiają szybciej.", icon: Clock },
  { title: "Przygotowanie informacji dla lekarza", desc: "Wszystkie dane z kwalifikacji trafiają do karty pacjenta - lekarz nie traci czasu na powtarzanie pytań.", icon: FileText },
  { title: "Kierowanie do odpowiedniego specjalisty", desc: "Kardiologia vs dermatologia vs okulistyka - AI rozpoznaje i kieruje pacjenta do właściwego lekarza.", icon: ArrowRightLeft },
  { title: "Weryfikacja skierowania i dokumentów", desc: "AI pyta o skierowanie, poprzednie wyniki - weryfikuje, czy pacjent ma potrzebne dokumenty przed wizytą.", icon: CheckCircle },
  { title: "Zbieranie historii pacjenta", desc: "Pierwsza wizyta vs kontrola - AI rozróżnia i dostosowuje pytania. Pełna historia przy pierwszej wizycie.", icon: UserCircle },
];

const educationFeatures = [
  { title: "Jak przygotować się do badania", desc: "Na czczo, bez makijażu do okulisty, odstawienie leków - AI przypomina o przygotowaniu odpowiednim do procedury.", icon: Clock },
  { title: "Co zabrać na wizytę", desc: "Dokumenty, poprzednie wyniki, skierowanie - AI przed wizytą przypomina pacjentowi kompletną listę.", icon: FileText },
  { title: "Instrukcje przed zabiegiem", desc: "Specjalne przygotowanie do zabiegów - AI przekazuje szczegółowe wytyczne z wyprzedzeniem.", icon: Beaker },
  { title: "Czas trwania i przebieg wizyty", desc: "Ile trwa wizyta, czego się spodziewać - AI informuje o przebiegu, redukując stres pacjenta.", icon: CalendarClock },
];

const scheduleStats = [
  { label: "Odpowiednia długość wizyty", value: "Konsultacja 20 min / Badanie 45 min / Zabieg 90 min", fill: 92, color: "bg-primary-500", valueColor: "text-primary-950 text-xs" },
  { label: "Dopasowanie typu konsultacji", value: "98%", fill: 98, color: "bg-accent-500" },
  { label: "Redukcja błędnych rezerwacji", value: "-65%", fill: 65, color: "bg-emerald-500", valueColor: "text-emerald-600 font-bold" },
  { label: "Wykorzystanie grafiku lekarza", value: "+25%", fill: 85, color: "bg-amber-500", valueColor: "text-amber-600 font-bold" },
];

const specialties = [
  { title: "Kardiologia", desc: "EKG, Holter, echo serca - AI pyta o objawy i kwalifikuje do odpowiedniego badania. Określa pilność wizyt.", icon: Heart, color: "text-red-500", bg: "bg-red-100/80" },
  { title: "Dermatologia", desc: "Konsultacja vs zabieg - AI zbiera informacje o zmianach skórnych i kieruje na właściwy typ wizyty.", icon: Paintbrush, color: "text-pink-500", bg: "bg-pink-100/80" },
  { title: "Okulistyka", desc: "Badanie wzroku vs OCT vs zabieg - AI udziela instrukcji przygotowania (np. bez makijażu, rozszerzone źrenice).", icon: Eye, color: "text-sky-500", bg: "bg-sky-100/80" },
  { title: "Ortopedia", desc: "Konsultacja vs RTG vs rehabilitacja - AI określa pilność i kieruje do odpowiedniego typu wizyty.", icon: BookOpen, color: "text-accent-500", bg: "bg-accent-100/80" },
];

/* ─── Page ─── */

export default function GabinetySpecjalistycznePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Branże", href: "/branze" }, { name: "Gabinety specjalistyczne", href: "/branze/gabinety-specjalistyczne" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Dla placówek</Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Gabinety <span className="text-primary-500">specjalistyczne</span>
              </h1>
              <p className="mt-2 text-xl text-surface-400 sm:text-2xl font-light">Okuliści, dermatolodzy, kardiolodzy</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Wyspecjalizowane konsultacje są droższe — <span className="text-primary-950 font-medium">błędna rezerwacja oznacza stratę czasu lekarza</span> i utracony przychód. AI kwalifikuje pacjentów, edukuje i optymalizuje grafik.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/demo"><Button size="lg"><Phone className="h-4 w-4" /> Poproś o demo</Button></Link>
                <a href="#wstepna-kwalifikacja">
                  <Button variant="outline" size="lg">Poznaj rozwiązanie <ArrowDown className="h-4 w-4" /></Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── WSTEPNA KWALIFIKACJA ── */}
      <section id="wstepna-kwalifikacja" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Wstępna kwalifikacja</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                AI zbiera i kwalifikuje <span className="text-primary-500">przed wizytą</span>
              </h2>
              <p className="mt-4 text-surface-500 text-lg max-w-2xl mx-auto">Każdy pacjent jest odpowiednio przygotowany — zbieramy objawy, pilność i dokumenty zanim lekarz go zobaczy.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {qualificationFeatures.map(({ title, desc, icon: Icon }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/80 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-950 mb-2">{title}</h3>
                  <p className="text-surface-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── EDUKACJA PACJENTA ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Edukacja pacjenta</span>
              <h2 id="przygotowanie-pacjenta" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Pacjent <span className="text-primary-500">przygotowany do wizyty</span>
              </h2>
              <p className="mt-4 text-surface-500 text-lg max-w-2xl mx-auto">AI informuje pacjenta, co ma zabrać i jak się przygotować — mniej błędów, szybsze wizyty.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {educationFeatures.map(({ title, desc, icon: Icon }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className="w-12 h-12 rounded-xl bg-primary-100/80 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-950 mb-2">{title}</h3>
                  <p className="text-surface-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── OPTYMALIZACJA GRAFIKU ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Optymalizacja grafiku</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Wykorzystaj czas lekarza <span className="text-primary-500">mądrzej</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)]">
                <h4 className="text-primary-950 font-semibold mb-6 text-center">Wpływ AI na grafik gabinetu</h4>
                <div className="space-y-5">
                  {scheduleStats.map((s) => (
                    <AnimatedBar key={s.label} label={s.label} value={s.value} fill={s.fill} color={s.color} valueColor={s.valueColor} />
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-accent-200/60 bg-accent-50/40 p-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-primary-950 font-medium mb-1">Badania i doświadczenie</p>
                    <p className="text-sm text-surface-500 leading-relaxed">
                      Wyspecjalizowane konsultacje są droższe — <strong className="text-primary-950">błędna rezerwacja oznacza stratę czasu lekarza</strong> i utracony przychód. Automatyczne systemy przypomnień redukują nieobecności i poprawiają wykorzystanie grafiku.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── PRZYKLADY SPECJALIZACJI ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-500 mb-4">Przykłady specjalizacji</span>
              <h2 id="specjalnosci" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                AI dostosowane do <span className="text-primary-500">każdej specjalności</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {specialties.map(({ title, desc, icon: Icon, color, bg }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-950 mb-2">{title}</h3>
                  <p className="text-surface-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Optymalizuj grafik. <span className="text-primary-500">Kwalifikuj pacjentów automatycznie.</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">Sprawdź, jak VoiceLink może usprawnić rejestrację w Twoim gabinecie specjalistycznym. Bezpłatne demo.</p>
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
