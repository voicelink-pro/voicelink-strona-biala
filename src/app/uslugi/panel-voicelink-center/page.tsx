"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowDown,
  BarChart3,
  Clock,
  TrendingUp,
  Phone,
  Check,
  Eye,
  MessageSquareText,
  CalendarCheck,
  Ticket,
  PieChart,
  Activity,
  LineChart,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  CheckCircle,
} from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { generateServiceSchema } from "@/lib/schema";
import { RelatedServices } from "@/components/sections/related-services";

/* ─── Data ─── */

const keyFeatures = [
  {
    icon: Clock,
    title: "Oszczędność czasu",
    desc: "Zobacz ile godzin asystent AI zaoszczędził Twojemu zespołowi. Dokładne dane, nie szacunki.",
    color: "primary",
    metric: "127h",
    metricLabel: "zaoszczędzonych / mies.",
  },
  {
    icon: BarChart3,
    title: "Skuteczność rozmów",
    desc: "Procent interakcji zakończonych sukcesem, szybkość odpowiedzi i średni czas rozmowy.",
    color: "emerald",
    metric: "97%",
    metricLabel: "udanych rozmów",
  },
  {
    icon: Ticket,
    title: "Tickety w czasie rzeczywistym",
    desc: "Rezerwacje, odwołania i zapytania pojawiają się natychmiast — bez opóźnień.",
    color: "accent",
    metric: "Live",
    metricLabel: "aktualizacje na żywo",
  },
  {
    icon: TrendingUp,
    title: "ROI i zwrot z inwestycji",
    desc: "Konkretne liczby pokazujące wartość, jaką generuje VoiceLink dla Twojej placówki.",
    color: "amber",
    metric: "3,2×",
    metricLabel: "zwrot z inwestycji",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: "bg-primary-100/80", text: "text-primary-500", border: "border-primary-200" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600", border: "border-emerald-200" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500", border: "border-accent-200" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600", border: "border-amber-200" },
  violet: { bg: "bg-violet-100/80", text: "text-violet-500", border: "border-violet-200" },
  cyan: { bg: "bg-cyan-100/80", text: "text-cyan-500", border: "border-cyan-200" },
  rose: { bg: "bg-rose-100/80", text: "text-rose-500", border: "border-rose-200" },
  sky: { bg: "bg-sky-100/80", text: "text-sky-500", border: "border-sky-200" },
};

const panelCards: { icon: typeof Phone; label: string; value: string; trend: string | null; up: boolean; iconBg: string; iconColor: string; wide?: boolean }[] = [
  { icon: Phone, label: "Odebrane połączenia", value: "151", trend: "+67.8%", up: true, iconBg: "bg-violet-100", iconColor: "text-violet-500" },
  { icon: CheckCircle, label: "Skuteczność", value: "82.0%", trend: "+1.2%", up: true, iconBg: "bg-emerald-100", iconColor: "text-emerald-500" },
  { icon: TrendingUp, label: "Wskaźnik eskalacji", value: "9.0%", trend: "+4.3%", up: true, iconBg: "bg-orange-100", iconColor: "text-orange-500" },
  { icon: CalendarCheck, label: "Umówione wizyty", value: "62", trend: "+87.9%", up: true, iconBg: "bg-blue-100", iconColor: "text-blue-500" },
  { icon: Activity, label: "Niepowodzenia", value: "27", trend: "+58.8%", up: true, iconBg: "bg-red-100", iconColor: "text-red-500" },
  { icon: Sparkles, label: "Śr. czas odpowiedzi", value: "478 ms", trend: "-2.5%", up: false, iconBg: "bg-pink-100", iconColor: "text-pink-500" },
  { icon: Clock, label: "Śr. czas rozmowy", value: "4 min 48s", trend: "+1.4%", up: true, iconBg: "bg-violet-100", iconColor: "text-violet-500" },
  { icon: MessageSquareText, label: "Najczęstszy temat", value: "appointment_booking", trend: null, up: false, iconBg: "bg-sky-100", iconColor: "text-sky-500", wide: true },
];

const topicData = [
  { topic: "appointment_booking", pct: 46, color: "bg-primary-500", count: 70 },
  { topic: "complaint", pct: 17, color: "bg-accent-500", count: 26 },
  { topic: "general_inquiry", pct: 17, color: "bg-emerald-500", count: 25 },
  { topic: "appointment_cancellation", pct: 12, color: "bg-amber-500", count: 18 },
  { topic: "appointment_reschedule", pct: 8, color: "bg-violet-500", count: 12 },
];

const errorData = [
  { reason: "pacjent się rozmyślił", pct: 16, color: "bg-red-500", count: 7 },
  { reason: "Awaria połączenia w trakcie rejestracji", pct: 14, color: "bg-orange-500", count: 6 },
  { reason: "Błąd systemu rezerwacji", pct: 14, color: "bg-rose-500", count: 6 },
  { reason: "system niedostępny", pct: 14, color: "bg-amber-500", count: 6 },
  { reason: "brak danych pacjenta", pct: 12, color: "bg-pink-500", count: 5 },
  { reason: "brak wolnych terminów", pct: 12, color: "bg-violet-500", count: 5 },
];

const liveTickets = [
  { time: "Teraz", type: "Rezerwacja", detail: "Kardiolog — wtorek 15:30", sub: "Nowa wizyta utworzona automatycznie", status: "success" as const },
  { time: "2 min temu", type: "Odwołanie", detail: "Ortopeda — piątek 10:00", sub: "Termin zwolniony, lista rezerwowa aktywna", status: "warning" as const },
  { time: "5 min temu", type: "Zapytanie", detail: "Godziny otwarcia w sobotę", sub: "Odpowiedź udzielona przez AI", status: "info" as const },
  { time: "8 min temu", type: "Rezerwacja", detail: "Dentysta — środa 9:00", sub: "SMS z potwierdzeniem wysłany", status: "success" as const },
  { time: "12 min temu", type: "Przekierowanie", detail: "Pilna konsultacja medyczna", sub: "Połączenie przekazane do recepcji", status: "redirect" as const },
];

const statusColors = {
  success: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500" },
  warning: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" },
  info: { bg: "bg-sky-50", text: "text-sky-600", dot: "bg-sky-500" },
  redirect: { bg: "bg-violet-50", text: "text-violet-600", dot: "bg-violet-500" },
};

/* ─── Donut segment (SVG) ─── */

function DonutSegment({ offset, pct, color }: { offset: number; pct: number; color: string }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeLen = (pct / 100) * circumference;
  const strokeOffset = (offset / 100) * circumference;

  return (
    <circle
      cx="60"
      cy="60"
      r={radius}
      fill="none"
      stroke={color}
      strokeWidth="18"
      strokeDasharray={`${strokeLen} ${circumference - strokeLen}`}
      strokeDashoffset={-strokeOffset}
      strokeLinecap="round"
    />
  );
}

/* ─── Animated bar ─── */

function AnimatedTopicBar({ topic, pct, color }: { topic: string; pct: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(pct); },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref}>
      {topic && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-surface-600 font-medium">{topic}</span>
          <span className="font-semibold text-primary-950">{pct}%</span>
        </div>
      )}
      <div className="h-3 rounded-full bg-surface-200/60 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Live ticket pulse ─── */

function PulsingDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`} />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}

/* ─── Page ─── */

export default function PanelVoiceLinkCenterPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Usługi", href: "/uslugi" }, { name: "Panel VoiceLink Center", href: "/uslugi/panel-voicelink-center" }]} />
      <JsonLd data={generateServiceSchema({ name: "Panel VoiceLink Center", description: "Zaawansowany panel analityczny — statystyki, trendy i raporty ROI.", url: "/uslugi/panel-voicelink-center" })} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
                Panel analityczny
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                VoiceLink <span className="text-primary-500">Center</span>
                <br />
                <span className="text-surface-400 text-3xl sm:text-4xl font-light">
                  Pełna kontrola nad Twoją recepcją AI
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Zaawansowany panel analityczny, który daje placówce{" "}
                <span className="text-primary-950 font-medium">pełny wgląd w rzeczywiste efekty</span>{" "}
                działania asystenta AI. Wszystkie kluczowe dane w jednym miejscu — przejrzyście i zrozumiale.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/demo">
                  <Button size="lg">
                    <LayoutDashboard className="h-4 w-4" /> Zobacz demo panelu
                  </Button>
                </Link>
                <a href="#funkcje">
                  <Button variant="outline" size="lg">
                    Poznaj funkcje <ArrowDown className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── KLUCZOWE KORZYŚCI ── */}
      <section id="funkcje" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                Dlaczego VoiceLink Center
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Koniec z <span className="text-primary-500">przypuszczeniami</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
                Nie musisz już zgadywać czy AI działa. VoiceLink Center pokazuje konkretne liczby i efekty.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyFeatures.map(({ icon: Icon, title, desc, color, metric, metricLabel }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent group">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-5`}>
                      <Icon className={`h-6 w-6 ${c.text}`} />
                    </div>
                    <h3 className="text-[15px] font-semibold text-primary-950 mb-2">{title}</h3>
                    <p className="text-sm leading-relaxed text-surface-500 mb-4">{desc}</p>
                    <div className="pt-4 border-t border-surface-100">
                      <span className={`text-2xl font-bold ${c.text}`}>{metric}</span>
                      <p className="text-xs text-surface-400 mt-1">{metricLabel}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── SCREENSHOT / PODGLĄD PANELU ── */}
      <section id="interfejs" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">
                Podgląd
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Intuicyjny interfejs <span className="text-primary-500">zaprojektowany dla placówek</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
                Przejrzysty dashboard z najważniejszymi danymi — bez potrzeby szkolenia.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative mx-auto max-w-5xl">
              <div className="rounded-2xl border border-surface-200/80 bg-white p-2 shadow-[var(--shadow-card)] overflow-hidden">
                <div className="relative rounded-xl bg-surface-50 overflow-hidden">
                  <Image
                    src="/images/panel-voicelink.png"
                    alt="VoiceLink Center — panel analityczny dla placówek medycznych"
                    width={3420}
                    height={1894}
                    className="w-full h-auto"
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-surface-50/80 opacity-0 hover:opacity-0 transition-opacity" />
                </div>
              </div>

              {/* Floating mini-cards around the screenshot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -left-4 bottom-8 hidden lg:flex items-center gap-2 rounded-xl border border-surface-200/80 bg-white px-4 py-3 shadow-lg"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary-950">Real-time</p>
                  <p className="text-[10px] text-surface-400">Widok na żywo</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -right-4 top-4 hidden lg:flex items-center gap-2 rounded-xl border border-surface-200/80 bg-white px-4 py-3 shadow-lg"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                  <PieChart className="w-4 h-4 text-primary-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary-950">Analityka</p>
                  <p className="text-[10px] text-surface-400">Szczegółowe raporty</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -left-4 top-8 hidden lg:flex items-center gap-2 rounded-xl border border-surface-200/80 bg-white px-4 py-3 shadow-lg"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <LineChart className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary-950">Trendy</p>
                  <p className="text-[10px] text-surface-400">Analiza historyczna</p>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── ANALITYKA — KLUCZOWE METRYKI ── */}
      <section id="analityka" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                  Analityka
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Dokładne dane o <span className="text-primary-500">każdej rozmowie</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Panel pozwala zobaczyć ile czasu asystent zaoszczędził zespołowi, ile rozmów obsłużył
                  samodzielnie, a ile wymagało przekierowania do człowieka. Łatwo ocenisz, jak duże
                  odciążenie przynosi wdrożenie VoiceLink.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-3">
                  {[
                    "Procent interakcji zakończonych sukcesem",
                    "Szybkość odpowiedzi i czas reakcji AI",
                    "Średni czas trwania rozmów",
                    "Stosunek rozmów AI vs. przekierowanych",
                    "Liczba utworzonych rezerwacji",
                    "Oszczędność czasu pracy recepcji",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-sm text-surface-600">{text}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {panelCards.map(({ icon: Icon, label, value, trend, up, iconBg, iconColor, wide }) => (
                  <StaggerItem key={label} className={wide ? "col-span-2" : ""}>
                    <div className={`rounded-2xl border border-surface-200/80 bg-white px-6 transition-all hover:shadow-[var(--shadow-card-hover)] ${wide ? "py-4 flex items-center gap-5" : "py-6"}`}>
                      <div className={`${wide ? "w-10 h-10" : "w-11 h-11 mb-5"} rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-5 w-5 ${iconColor}`} />
                      </div>
                      <div>
                      <p className="text-sm text-surface-400 mb-1">{label}</p>
                      <p className={`${wide ? "text-lg" : "text-2xl"} font-bold text-primary-950 leading-tight`}>{value}</p>
                      {trend && (
                        <p className={`text-sm font-medium mt-1.5 ${up ? "text-emerald-600" : "text-red-500"}`}>
                          {up ? "↑" : "↓"} {trend} <span className="text-surface-400 font-normal">vs poprz.</span>
                        </p>
                      )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>
        </Container>
      </section>


      {/* ── NAJCZĘSTSZE TEMATY ROZMÓW ── */}
      <section id="tematy-rozmow" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">
                Intencje i błędy
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Rozkład intencji i <span className="text-primary-500">ranking niepowodzeń</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500">
                Dokładna analiza czego dotyczą rozmowy pacjentów i dlaczego niektóre kończą się niepowodzeniem — na jednym ekranie.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Ranking intencji */}
            <FadeIn>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] h-full">
                <div className="flex items-center justify-between mb-7">
                  <h4 className="font-semibold text-primary-950 flex items-center gap-2">
                    <MessageSquareText className="h-5 w-5 text-primary-500" /> Ranking intencji
                  </h4>
                  <span className="text-xs text-surface-400 px-2.5 py-1 rounded-full bg-surface-50 border border-surface-200/80">
                    151 łącznie
                  </span>
                </div>
                <div className="space-y-4">
                  {topicData.map((t) => (
                    <div key={t.topic}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-surface-600 font-medium">{t.topic}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-surface-400">{t.pct}%</span>
                          <span className="font-semibold text-primary-950 bg-surface-50 border border-surface-200/80 px-2 py-0.5 rounded-lg text-xs tabular-nums">{t.count}</span>
                        </div>
                      </div>
                      <AnimatedTopicBar topic="" pct={t.pct} color={t.color} />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Ranking błędów */}
            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] h-full">
                <div className="flex items-center justify-between mb-7">
                  <h4 className="font-semibold text-primary-950 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-red-500" /> Ranking błędów
                  </h4>
                  <span className="text-xs text-surface-400 px-2.5 py-1 rounded-full bg-surface-50 border border-surface-200/80">
                    43 łącznie
                  </span>
                </div>
                <div className="space-y-4">
                  {errorData.map((e) => (
                    <div key={e.reason}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-surface-600 font-medium truncate max-w-[70%]">{e.reason}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-surface-400">{e.pct}%</span>
                          <span className="font-semibold text-red-500 bg-red-50 border border-red-200/60 px-2 py-0.5 rounded-lg text-xs tabular-nums">{e.count}</span>
                        </div>
                      </div>
                      <AnimatedTopicBar topic="" pct={e.pct} color={e.color} />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Donut charts */}
          <FadeIn delay={0.25}>
            <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Donut intencji */}
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <h4 className="font-semibold text-primary-950 mb-1">Rozkład intencji</h4>
                <p className="text-xs text-surface-400 mb-6">Procentowy udział poszczególnych zapytań</p>
                <div className="flex items-center gap-8">
                  <div className="relative w-36 h-36 shrink-0">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <DonutSegment offset={0} pct={46} color="var(--color-primary-500)" />
                      <DonutSegment offset={46} pct={17} color="var(--color-accent-500)" />
                      <DonutSegment offset={63} pct={17} color="var(--color-emerald-500)" />
                      <DonutSegment offset={80} pct={12} color="var(--color-amber-500)" />
                      <DonutSegment offset={92} pct={8} color="var(--color-violet-500)" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-primary-950">151</span>
                      <span className="text-[10px] text-surface-400">łącznie</span>
                    </div>
                  </div>
                  <div className="space-y-2.5 flex-1">
                    {topicData.map((t) => (
                      <div key={t.topic} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                          <span className="text-xs text-surface-600 truncate max-w-[120px]">{t.topic}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-surface-400">{t.pct}%</span>
                          <span className="text-xs font-semibold text-primary-950 tabular-nums">{t.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Donut błędów */}
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <h4 className="font-semibold text-primary-950 mb-1">Rozkład błędów</h4>
                <p className="text-xs text-surface-400 mb-6">Najczęstsze przyczyny niepowodzeń</p>
                <div className="flex items-center gap-8">
                  <div className="relative w-36 h-36 shrink-0">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <DonutSegment offset={0} pct={16} color="var(--color-red-500)" />
                      <DonutSegment offset={16} pct={14} color="#f97316" />
                      <DonutSegment offset={30} pct={14} color="#e11d48" />
                      <DonutSegment offset={44} pct={14} color="var(--color-amber-500)" />
                      <DonutSegment offset={58} pct={12} color="#ec4899" />
                      <DonutSegment offset={70} pct={12} color="var(--color-violet-500)" />
                      <DonutSegment offset={82} pct={18} color="#d1d5db" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-primary-950">43</span>
                      <span className="text-[10px] text-surface-400">łącznie</span>
                    </div>
                  </div>
                  <div className="space-y-2.5 flex-1">
                    {errorData.map((e) => (
                      <div key={e.reason} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${e.color}`} />
                          <span className="text-xs text-surface-600 truncate max-w-[120px]">{e.reason}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-surface-400">{e.pct}%</span>
                          <span className="text-xs font-semibold text-red-500 tabular-nums">{e.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── DODATKOWE FUNKCJE ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">
                Funkcje panelu
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Wszystko w <span className="text-primary-500">jednym miejscu</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: MessageSquareText, title: "Transkrypcje rozmów", desc: "Pełny tekst każdej rozmowy AI z pacjentem — do wglądu i analizy.", color: "primary" },
              { icon: PieChart, title: "Wykresy intencji", desc: "Kolorowe wizualizacje rozkładu zapytań pacjentów — donut i bar chart.", color: "accent" },
              { icon: Activity, title: "Analiza niepowodzeń", desc: "Ranking przyczyn błędów i nieukończonych rozmów — identyfikuj problemy.", color: "rose" },
              { icon: Ticket, title: "Zgłoszenia na żywo", desc: "Tickety i rezerwacje pojawiające się w czasie rzeczywistym.", color: "emerald" },
              { icon: LineChart, title: "Wykresy dzienne", desc: "Połączenia i skuteczność dziennie — z porównaniem do poprzednich okresów.", color: "violet" },
              { icon: Eye, title: "Podgląd szczegółów", desc: "Każde połączenie z datą, czasem, intencją i wynikiem — pełna transparentność.", color: "sky" },
              { icon: BarChart3, title: "Eksport danych", desc: "CSV i PDF — pobierz raporty do dalszej analizy lub prezentacji.", color: "amber" },
              { icon: ShieldCheck, title: "Kontrola jakości", desc: "Monitoruj jak AI radzi sobie z trudnymi rozmowami i eskalacjami.", color: "cyan" },
            ].map(({ icon: Icon, title, desc, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`h-5 w-5 ${c.text}`} />
                    </div>
                    <h4 className="text-sm font-semibold text-primary-950">{title}</h4>
                    <p className="mt-1.5 text-xs text-surface-500 leading-relaxed">{desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── DANE HISTORYCZNE I TRENDY ── */}
      <section id="trendy" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-500 mb-4">
                Analiza historyczna
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Śledź trendy. <span className="text-primary-500">Optymalizuj placówkę.</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
                Dane dostępne w ujęciu bieżącym i historycznym — od jednego dnia do całego miesiąca.
                Kontroluj AI i świadomie zarządzaj ruchem pacjentów.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: LineChart,
                title: "Trendy i wzrosty",
                desc: "Śledź jak zmienia się liczba rozmów, rezerwacji i skuteczność AI w czasie. Identyfikuj szczyty i optymalizuj grafik.",
                color: "violet",
              },
              {
                icon: BarChart3,
                title: "Porównanie okresów",
                desc: "Zestawiaj dane tydzień do tygodnia lub miesiąc do miesiąca. Mierz postęp i efekty wdrożonych zmian.",
                color: "primary",
              },
              {
                icon: Activity,
                title: "Alerty i anomalie",
                desc: "Automatyczne powiadomienia o spadkach efektywności, nietypowych wzorcach ruchu lub problemach technicznych.",
                color: "rose",
              },
            ].map(({ icon: Icon, title, desc, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-8 text-center h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-16 h-16 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-6`}>
                      <Icon className={`h-8 w-8 ${c.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-950 mb-3">{title}</h3>
                    <p className="text-surface-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Mini stat row */}
          <FadeIn delay={0.15}>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "365", label: "Dni danych historycznych" },
                { value: "12", label: "Typów raportów" },
                { value: "CSV / PDF", label: "Eksport danych" },
                { value: "E-mail", label: "Automatyczne raporty" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-surface-200/80 bg-white p-4 text-center">
                  <div className="text-xl font-bold text-primary-500">{value}</div>
                  <p className="text-[11px] text-surface-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── NIE TYLKO STATYSTYKI ── */}
      <section id="roi" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.1}>
              <div className="space-y-4">
                <div className="rounded-2xl border border-surface-200/80 bg-white p-6 shadow-[var(--shadow-card)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100/80 flex items-center justify-center">
                      <LayoutDashboard className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-950">Narzędzie biznesowe</h4>
                      <p className="text-xs text-surface-400">Nie zwykły panel statystyk</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Zaoszczędzony czas recepcji", value: "127h / mies.", accent: true },
                      { label: "Wartość obsłużonych rozmów", value: "18 400 zł" },
                      { label: "Zwrot z inwestycji", value: "320%", accent: true },
                      { label: "Redukcja nieodebranych", value: "↓ 96%" },
                    ].map(({ label, value, accent }) => (
                      <div key={label} className="flex justify-between items-center py-3 border-b border-surface-100 last:border-0">
                        <span className="text-sm text-surface-500">{label}</span>
                        <span className={`text-sm font-semibold ${accent ? "text-primary-500" : "text-primary-950"}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                  Realne narzędzie
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Nie statystyki, a <span className="text-primary-500">decyzje biznesowe</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink Center to realne narzędzie biznesowe, które pokazuje konkretne liczby,
                  efekty i zwrot z inwestycji. Daje pełną kontrolę nad każdym połączeniem i każdą
                  interakcją pacjenta z placówką.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-4">
                  {[
                    "Pełny wgląd w efekty działania AI",
                    "Konkretne dane ROI do raportów zarządu",
                    "Kontrola nad każdą interakcją pacjenta",
                    "Optymalizacja pracy recepcji na podstawie danych",
                    "Świadome zarządzanie ruchem pacjentów",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-sm text-surface-600">{text}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <RelatedServices currentHref="/uslugi/panel-voicelink-center" />

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Przejmij kontrolę nad <span className="text-primary-500">swoją recepcją</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-lg mx-auto">
                Umów się na bezpłatne demo i sprawdź jak VoiceLink Center działa w praktyce.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link href="/demo">
                  <Button size="lg">
                    Zobacz demo <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/kontakt">
                  <Button variant="outline" size="lg">
                    Porozmawiaj z nami
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
