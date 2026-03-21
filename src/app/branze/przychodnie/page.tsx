"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Phone,
  Clock,
  RefreshCw,
  ArrowRightLeft,
  Bell,
  Trash2,
  Users,
  ClipboardList,
  CalendarClock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Building2,
  Link2,
  MessageSquare,
  FileText,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Animated bar ─── */
function AnimatedBar({ label, value, fill, color }: { label: string; value: string; fill: number; color: string }) {
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
        <span className="font-semibold text-primary-950">{value}</span>
      </div>
      <div className="h-3 rounded-full bg-surface-200/60 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

/* ─── Data ─── */

const challenges = [
  { title: "Przeciążona linia", desc: "2-3 linie telefoniczne na setki połączeń dziennie. Pacjenci słyszą sygnał zajętości lub czekają kilkanaście minut.", icon: Phone, color: "red" as const },
  { title: "Kolejki na linii", desc: "Średni czas obsługi połączenia to kilka minut. Przy 200+ połączeniach dziennie to ogromne obciążenie.", icon: Clock, color: "red" as const },
  { title: "Wielokrotne dzwonienie", desc: "Pacjenci dzwonią 3-5 razy zanim się dodzwonią. Mnożą ruch, generują frustrację.", icon: RefreshCw, color: "red" as const },
  { title: "Chaos w przekierowaniach", desc: "POZ, specjalista, badanie, wynik — każdy przypadek wymaga innego kierunku. Ręczna triage jest wolna.", icon: ArrowRightLeft, color: "red" as const },
  { title: "Ręczne przypomnienia", desc: "Rejestratorki tracą godziny na obdzwanianie pacjentów z przypomnieniami o wizytach i kontrolach.", icon: Bell, color: "red" as const },
  { title: "No-show pacjentów", desc: "15-30% pacjentów nie przychodzi na wizytę. Bez przypomnień puste sloty generują realne straty.", icon: Trash2, color: "red" as const },
];

const solutions = [
  { title: "Nieograniczona pojemność", desc: "AI odbiera wszystkie połączenia jednocześnie. Zero kolejek, zero zajętości. Nawet 500 połączeń na raz.", icon: Users, color: "emerald" as const },
  { title: "Kwalifikacja pacjenta", desc: "AI zbiera dane i ustala czy potrzebna jest wizyta POZ, specjalista, badanie czy recepta.", icon: ClipboardList, color: "emerald" as const },
  { title: "Rezerwacja w czasie rzeczywistym", desc: "Sprawdza terminy u odpowiedniego lekarza i zapisuje pacjenta — natychmiast podczas rozmowy.", icon: CalendarClock, color: "emerald" as const },
  { title: "Automatyczne potwierdzenia", desc: "SMS z potwierdzeniem po rezerwacji. Przypomnienie 48h i 24h przed wizytą z opcją odwołania.", icon: CheckCircle, color: "emerald" as const },
  { title: "Przypomnienia o kontrolach", desc: "AI automatycznie dzwoni z przypomnieniami o badaniach kontrolnych, szczepieniach i przeglądach.", icon: RefreshCw, color: "emerald" as const },
  { title: "Eskalacja pilnych spraw", desc: "Pilne przypadki są natychmiast przekazywane do personelu — zero opóźnień.", icon: AlertTriangle, color: "emerald" as const },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  red: { bg: "bg-red-100/80", text: "text-red-500" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600" },
  pink: { bg: "bg-pink-100/80", text: "text-pink-500" },
};

const scaleItems = [
  { symbol: "∞", title: "Równoległe połączenia", desc: "AI obsługuje wiele rozmów jednocześnie — zero kolejek, zero czekania.", color: "text-primary-500", bg: "bg-primary-100/80" },
  { symbol: "0", title: "Zero sygnału zajętości", desc: "Każdy pacjent dodzwoni się od pierwszego razu. Koniec z wielokrotnym dzwonieniem.", color: "text-accent-500", bg: "bg-accent-100/80" },
  { symbol: "24/7", title: "Całodobowa rejestracja", desc: "Pacjenci rejestrują się o dowolnej porze — wieczorem, w weekendy, w święta.", color: "text-emerald-600", bg: "bg-emerald-100/80" },
];

const dayStats = [
  { label: "Połączenia odebrane", value: "247/250", fill: 99, color: "bg-emerald-500" },
  { label: "Wizyty umówione przez AI", value: "89", fill: 72, color: "bg-primary-500" },
  { label: "Rozwiązane bez człowieka", value: "178/250", fill: 71, color: "bg-accent-500" },
  { label: "Średni czas rozmowy", value: "1m 48s", fill: 30, color: "bg-amber-500" },
];

const integrations = [
  { title: "Systemy medyczne", subtitle: "Medfile, mMedica, KS-SOMED, Drimed", label: "MED", color: "primary" as const },
  { title: "Kalendarze lekarzy", subtitle: "Google Calendar, system wewnętrzny", icon: CalendarClock, color: "accent" as const },
  { title: "SMS Gateway", subtitle: "Przypomnienia, potwierdzenia, alerty", label: "SMS", color: "emerald" as const },
  { title: "System EDM", subtitle: "Elektroniczna dokumentacja medyczna", label: "EDM", color: "amber" as const },
];

/* ─── Page ─── */

export default function PrzychodniaPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Branże", href: "/branze" }, { name: "Przychodnie", href: "/branze/przychodnie" }]} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Dla placówek</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Przychodnie <span className="text-primary-500">POZ</span>
                <br /><span className="text-surface-400 text-3xl sm:text-4xl font-light">Placówki wieloprofilowe i specjalistyczne</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Setki połączeń dziennie, przeciążona rejestracja, pacjenci na czekaniu. <span className="text-primary-950 font-medium">VoiceLink odbiera je wszystkie równolegle</span> — kwalifikuje, umawia, przypomina.
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
                Codzienne problemy <span className="text-red-500">rejestracji</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">Znasz te problemy? Twoja rejestracja radzi sobie z nimi każdego dnia.</p>
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

      {/* ── JAK AI POMAGA ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Rozwiązanie</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Jak VoiceLink <span className="text-primary-500">rozwiązuje te problemy?</span>
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

      {/* ── SKALA I WYDAJNOŚĆ ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Skala</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Wydajność, która skaluje się z Tobą</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Nie ma znaczenia czy masz 100 czy 1000 połączeń dziennie. AI obsłuży je wszystkie bez dodatkowych kosztów i etatów.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-5">
                  {scaleItems.map(({ symbol, title, desc, color, bg }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <span className={`${color} font-bold ${symbol.length > 2 ? "text-sm" : "text-lg"}`}>{symbol}</span>
                      </div>
                      <div>
                        <h4 className="text-primary-950 font-medium text-sm">{title}</h4>
                        <p className="text-surface-500 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <h4 className="font-semibold text-primary-950 mb-6 text-center">Typowy dzień przychodni z VoiceLink</h4>
                <div className="space-y-5">
                  {dayStats.map((s) => <AnimatedBar key={s.label} {...s} />)}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── NO-SHOW REDUKCJA ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4">No-show</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Odzyskaj dziesiątki <span className="text-primary-500">wizyt miesięcznie</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <FadeIn delay={0.1}>
              <div className="text-center">
                <div className="relative mx-auto w-44 h-44 mb-4">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="14" strokeDasharray="314" strokeDashoffset="242" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-red-500">23%</span>
                    <span className="text-xs text-surface-400">no-show</span>
                  </div>
                </div>
                <p className="text-surface-500 text-sm">Średni no-show <span className="text-primary-950 font-medium">bez przypomnień</span></p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-primary-200/60 bg-primary-50/30 p-6">
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-primary-950 font-medium mb-1">Obliczenia</p>
                    <p className="text-xs text-surface-500 leading-relaxed">
                      Przychodnia z <strong className="text-primary-950">800 wizytami/mies.</strong> i 23% no-show traci ~184 wizyt. Redukcja do 5% = <strong className="text-emerald-600">144 odzyskane wizyty</strong> miesięcznie.
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
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="14" strokeDasharray="314" strokeDashoffset="298" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-emerald-600">5%</span>
                    <span className="text-xs text-surface-400">no-show</span>
                  </div>
                </div>
                <p className="text-surface-500 text-sm">Z <span className="text-emerald-600 font-medium">VoiceLink przypomnieniami</span></p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── INTEGRACJE ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-500 mb-4">Integracje</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Łączy się z systemami, <span className="text-primary-500">których używasz</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {integrations.map(({ title, subtitle, label, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-3`}>
                      {Icon ? <Icon className={`h-6 w-6 ${c.text}`} /> : <span className={`${c.text} font-bold text-xs`}>{label}</span>}
                    </div>
                    <h4 className="text-primary-950 font-medium text-sm">{title}</h4>
                    <p className="text-surface-400 text-xs mt-1">{subtitle}</p>
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
                Odciąż rejestrację. <span className="text-primary-500">Obsłuż każdego pacjenta.</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Sprawdź, jak VoiceLink może usprawnić rejestrację w Twojej przychodni. Bezpłatne demo.
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
