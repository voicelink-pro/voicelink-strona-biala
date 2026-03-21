"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Zap,
  ArrowDown,
  ArrowRight,
  Check,
  Phone,
  CalendarClock,
  CheckCircle,
  Info,
  PhoneCall,
  Clock,
  ClipboardList,
  BarChart3,
  Users,
  MessageSquare,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { generateServiceSchema } from "@/lib/schema";
import { RelatedServices } from "@/components/sections/related-services";

/* ─── Data ─── */

const kpiCards = [
  { value: "6,3 min", desc: "Średni czas obsługi połączenia w healthcare", badge: "Koszt = czas × etat", badgeColor: "red" as const },
  { value: "<2 min", desc: "Średni czas obsługi z VoiceLink AI", badge: "3× szybciej", badgeColor: "emerald" as const, accent: true },
  { value: "90%", desc: "Rozmów rozwiązanych bez człowieka", badge: "Odciążenie zespołu", badgeColor: "primary" as const },
  { value: "24/7", desc: "Dostępność bez dodatkowych etatów", badge: "Stały koszt", badgeColor: "accent" as const },
];

const badgeColorMap = {
  red: { bg: "bg-red-100/80", text: "text-red-600" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-600" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-600" },
};

const processes = [
  { title: "Zarządzanie rezerwacjami", desc: "Tworzenie, zmiana i anulowanie wizyt. AI zbiera dane pacjenta i rezerwuje termin w kalendarzu placówki.", icon: CalendarClock, color: "primary" as const },
  { title: "Potwierdzenia wizyt", desc: "Automatyczne potwierdzanie nadchodzących wizyt telefonicznie lub SMS-em. Redukcja no-show nawet o 60%.", icon: CheckCircle, color: "emerald" as const },
  { title: "Udzielanie informacji", desc: "Godziny pracy, dojazd, cennik, specjaliści, przygotowanie do badań — bez angażowania recepcji.", icon: Info, color: "accent" as const },
  { title: "Dzwonienie z listy oczekujących", desc: "Gdy zwolni się termin, AI kontaktuje pacjentów z listy i proponuje wolny slot.", icon: PhoneCall, color: "amber" as const },
  { title: "Przypomnienia o wizytach", desc: "Automatyczne przypomnienia dzień przed i w dniu wizyty. Pacjent może potwierdzić lub przełożyć.", icon: Clock, color: "pink" as const },
  { title: "Ankiety satysfakcji", desc: "Automatyczne ankiety po wizycie. Zbieranie opinii, NPS i sugestii — dane trafiają do raportu.", icon: ClipboardList, color: "violet" as const },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary-100/80", text: "text-primary-500" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600" },
  pink: { bg: "bg-pink-100/80", text: "text-pink-500" },
  violet: { bg: "bg-violet-100/80", text: "text-violet-500" },
};

const processSteps = [
  { title: "Powitanie i rozpoznanie", desc: "AI wita pacjenta i analizuje cel rozmowy na podstawie pierwszych zdań." },
  { title: "Klasyfikacja intencji", desc: "System kategoryzuje: rezerwacja, pytanie, skarga, status, follow-up." },
  { title: "Wykonanie scenariusza", desc: "AI prowadzi rozmowę wg drzewka decyzji z dynamicznymi rozgałęzieniami." },
  { title: "Handoff lub zamknięcie", desc: "Rozwiązuje sprawę samodzielnie lub płynnie przekazuje do odpowiedniej osoby." },
];

const barStats = [
  { label: "Czas obsługi (AHT)", value: "3× szybciej", fill: 95, color: "bg-emerald-500" },
  { label: "Konwersja zapytań → wizyty", value: "+40%", fill: 72, color: "bg-primary-500" },
  { label: "Rozmowy bez człowieka", value: "90%", fill: 90, color: "bg-accent-500" },
  { label: "Satysfakcja pacjenta", value: "4.7/5", fill: 94, color: "bg-amber-500" },
];

/* ─── Animated bar ─── */
function AnimatedBar({ label, value, fill, color }: typeof barStats[number]) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(fill); },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [fill]);

  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-surface-500">{label}</span>
        <span className="font-semibold text-primary-950">{value}</span>
      </div>
      <div className="h-3 rounded-full bg-surface-200/60 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Process flow animation ─── */
function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let running = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function runCycle() {
      let step = -1;
      function next() {
        if (!running) return;
        step++;
        if (step < processSteps.length) {
          setActiveStep(step);
          timeoutId = setTimeout(next, 1200);
        } else {
          timeoutId = setTimeout(() => {
            setActiveStep(-1);
            timeoutId = setTimeout(() => { if (running) runCycle(); }, 800);
          }, 2000);
        }
      }
      timeoutId = setTimeout(next, 400);
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          runCycle();
        } else if (!entry.isIntersecting && running) {
          running = false;
          clearTimeout(timeoutId);
          setActiveStep(-1);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(container);
    return () => { obs.disconnect(); running = false; clearTimeout(timeoutId); };
  }, []);

  const progressHeight = activeStep >= 0 ? `${((activeStep + 1) / processSteps.length) * 100}%` : "0%";

  return (
    <div ref={containerRef} className="relative pl-8 space-y-8">
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-surface-200 rounded-full" />
      <div
        className="absolute left-[11px] top-2 w-0.5 bg-primary-400 rounded-full transition-all duration-700 ease-out"
        style={{ height: progressHeight }}
      />
      {processSteps.map((step, i) => (
        <div key={step.title} className="relative">
          <div className={`absolute -left-8 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${i <= activeStep ? "border-primary-400 bg-primary-50" : "border-surface-300 bg-white"}`}>
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${i <= activeStep ? "bg-primary-500" : "bg-surface-300"}`} />
          </div>
          <h4 className={`font-medium text-sm transition-colors duration-300 ${i <= activeStep ? "text-primary-950" : "text-surface-400"}`}>{step.title}</h4>
          <p className={`text-sm mt-1 transition-colors duration-300 ${i <= activeStep ? "text-surface-600" : "text-surface-400"}`}>{step.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ─── */

export default function AutomatyzacjaRozmowPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Usługi", href: "/uslugi" }, { name: "Automatyzacja rozmów", href: "/uslugi/automatyzacja-rozmow" }]} />
      <JsonLd data={generateServiceSchema({ name: "Automatyzacja rozmów telefonicznych", description: "Zautomatyzuj powtarzalne scenariusze telefoniczne — rejestracja, potwierdzenia wizyt, informacje.", url: "/uslugi/automatyzacja-rozmow" })} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Usługa VoiceLink</Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Automatyzacja <span className="text-primary-500">rozmów</span>
                <br />
                <span className="text-surface-400 text-3xl sm:text-4xl font-light">Inteligentna obsługa połączeń</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Nie gotowy voicebot z pudełka, a <span className="text-primary-950 font-medium">dedykowana automatyzacja procesów</span> budowana pod Twoją placówkę. Kwalifikacja, follow-up, ankiety, statusy — wszystko dopasowane do Twojej specyfiki.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/kalkulator-oszczednosci"><Button size="lg"><Zap className="h-4 w-4" /> Sprawdź oszczędności</Button></Link>
                <a href="#procesy"><Button variant="outline" size="lg">Co automatyzujemy? <ArrowDown className="h-4 w-4" /></Button></a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── KPI / ROI ── */}
      <section className="py-16 md:py-20">
        <Container>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {kpiCards.map(({ value, desc, badge, badgeColor, accent }) => {
              const bc = badgeColorMap[badgeColor];
              return (
                <StaggerItem key={value}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center h-full flex flex-col items-center transition-all hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`text-3xl font-bold mb-2 ${accent ? "text-primary-500" : "text-primary-950"}`}>{value}</div>
                    <div className="text-surface-500 text-sm flex-1">{desc}</div>
                    <div className={`mt-3 px-2.5 py-1 rounded-full ${bc.bg}`}>
                      <span className={`${bc.text} text-xs font-medium`}>{badge}</span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── PROCESY ── */}
      <section id="procesy" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Procesy</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Co możesz <span className="text-primary-500">zautomatyzować?</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {processes.map(({ title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-5`}>
                      <Icon className={`h-6 w-6 ${c.text}`} />
                    </div>
                    <h3 className="text-[15px] font-semibold text-primary-950 mb-2">{title}</h3>
                    <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── SCENARIUSZE — Process Flow + Donut ── */}
      <section id="drzewko-decyzji" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Scenariusze</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Drzewko decyzji + rozpoznawanie intencji
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  AI nie działa na sztywnym skrypcie. Rozpoznaje intencję rozmówcy i dynamicznie wybiera najlepszą ścieżkę obsługi.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8">
                  <ProcessFlow />
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)]">
                <h4 className="font-semibold text-primary-950 mb-6 text-center">Podział obsługi rozmów</h4>
                <div className="flex justify-center mb-6">
                  <div className="relative w-44 h-44">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-primary-500)" strokeWidth="14" strokeDasharray="314" strokeDashoffset="31" strokeLinecap="round" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--color-accent-500)" strokeWidth="14" strokeDasharray="314" strokeDashoffset="295" strokeDashoffset-start="283" strokeLinecap="round" style={{ strokeDashoffset: "295", transform: "rotate(324deg)", transformOrigin: "center" }} />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#f59e0b" strokeWidth="14" strokeDasharray="314" strokeDashoffset="301" strokeLinecap="round" style={{ strokeDashoffset: "301", transform: "rotate(345.6deg)", transformOrigin: "center" }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-primary-950">100%</span>
                      <span className="text-xs text-surface-400">połączeń</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { color: "bg-primary-500", label: "Rozwiązane przez AI", value: "90%" },
                    { color: "bg-accent-500", label: "Przekazane do personelu", value: "6%" },
                    { color: "bg-amber-500", label: "Pilne — natychmiastowy handoff", value: "4%" },
                  ].map(({ color, label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${color}`} />
                        <span className="text-surface-600 text-sm">{label}</span>
                      </div>
                      <span className="text-primary-950 font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── KPI — Wyniki ── */}
      <section id="rezultaty" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between mb-7">
                  <h4 className="font-semibold text-primary-950 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary-500" /> Spodziewane wyniki
                  </h4>
                </div>
                <div className="space-y-5">
                  {barStats.map((s) => <AnimatedBar key={s.label} {...s} />)}
                </div>
              </div>
            </FadeIn>
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Wyniki</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Zauważalne rezultaty od pierwszego miesiąca</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Efekty automatyzacji widać od razu — krótszy czas oczekiwania, więcej obsłużonych pacjentów i mniej obciążony zespół.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-3">
                  {[
                    "Nawet 3× krótszy czas obsługi połączenia",
                    "Więcej zapytań przekształconych w rezerwacje",
                    "Do 90% rozmów obsłużonych bez angażowania personelu",
                    "Wyższa satysfakcja pacjentów — szybka i profesjonalna obsługa",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-sm text-surface-600">{text}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <RelatedServices currentHref="/uslugi/automatyzacja-rozmow" />

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Zautomatyzuj rozmowy. <span className="text-primary-500">Odciąż zespół.</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Sprawdź, ile możesz zaoszczędzić dzięki automatyzacji połączeń w Twojej placówce.
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
