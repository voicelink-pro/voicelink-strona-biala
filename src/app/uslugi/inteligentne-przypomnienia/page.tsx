"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Bell,
  BellRing,
  Calendar as CalendarIcon,
  Calculator,
  CalendarClock,
  CheckCircle,
  Check,
  Clock,
  FileText,
  Globe,
  Link2,
  MessageCircle,
  MessageSquare,
  Phone,
  PhoneIncoming,
  RefreshCw,
  Send,
  Sparkles,
  TrendingDown,
  UserCheck,
  X as XIcon,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { generateServiceSchema } from "@/lib/schema";
import { RelatedServices } from "@/components/sections/related-services";

/* ─── Helpers ─── */

function fmt(n: number) {
  return Math.round(n).toLocaleString("pl-PL");
}

function useAnimatedNumber(target: number, duration = 600) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (target - from) * eased;
      setValue(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

function Slider({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  suffix,
  minLabel,
  maxLabel,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  minLabel: string;
  maxLabel: string;
}) {
  const display = suffix ? `${fmt(value)}${suffix}` : fmt(value);
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label htmlFor={id} className="text-sm text-surface-600 font-medium">
          {label}
        </label>
        <span className="text-primary-950 font-bold text-lg bg-surface-50 px-3 py-1 rounded-lg border border-surface-200/60 tabular-nums">
          {display}
        </span>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="calc-slider w-full"
      />
      <div className="flex justify-between text-xs text-surface-400 mt-1">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

/* ─── Static data ─── */

const heroPills = [
  { icon: TrendingDown, text: "No-show nawet do 5%" },
  { icon: BellRing, text: "Automatyczne przypomnienia" },
  { icon: Sparkles, text: "Personalizacja wiadomości" },
  { icon: Phone, text: "AI Voice 24/7" },
];

const lossStats = [
  {
    value: "20-30%",
    label: "wizyt może kończyć się no-show",
    desc: "Bez automatyzacji średnio co czwarty pacjent nie pojawia się na wizycie.",
    icon: XIcon,
    color: "red" as const,
  },
  {
    value: "do 5%",
    label: "redukcja no-show z VoiceLink",
    desc: "Inteligentne przypomnienia SMS i głosowe ograniczają nieobecności wielokrotnie.",
    icon: TrendingDown,
    color: "emerald" as const,
  },
  {
    value: "SMS + AI",
    label: "automatyczne przypomnienia",
    desc: "Wiadomości tekstowe oraz rozmowy głosowe AI wysyłane bez udziału recepcji.",
    icon: BellRing,
    color: "primary" as const,
  },
  {
    value: "1 klik",
    label: "potwierdzenie / zmiana / odwołanie",
    desc: "Pacjent reaguje SMS-em lub w rozmowie z AI — kalendarz aktualizuje się sam.",
    icon: CheckCircle,
    color: "accent" as const,
  },
];

const lossColorMap: Record<string, { bg: string; text: string; border: string }> = {
  red: { bg: "bg-red-100/80", text: "text-red-500", border: "border-red-200/60" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600", border: "border-emerald-200/60" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500", border: "border-primary-200/60" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500", border: "border-accent-200/60" },
};

const smsFeatures = [
  { icon: UserCheck, title: "Personalizacja imienia", desc: "Każda wiadomość zaczyna się imieniem pacjenta — ton bliski i ludzki.", color: "primary" as const },
  { icon: CalendarClock, title: "Dynamiczna data i godzina", desc: "Termin podstawiany automatycznie z kalendarza placówki.", color: "accent" as const },
  { icon: FileText, title: "Instrukcje przed badaniem", desc: "Zalecenia (np. nie jeść 6h, dokumenty, badania) — różne dla każdej wizyty.", color: "emerald" as const },
  { icon: CheckCircle, title: "Potwierdzenie wizyty", desc: "Pacjent odpowiada TAK lub klika link — status w systemie aktualizowany w czasie rzeczywistym.", color: "primary" as const },
  { icon: RefreshCw, title: "Odwołanie lub zmiana terminu", desc: "Słowa ZMIEŃ / ODWOŁAJ uruchamiają automatyczny przepływ obsługi.", color: "amber" as const },
  { icon: Link2, title: "Integracja z kalendarzem", desc: "Synchronizacja z Twoim systemem rezerwacyjnym — bez ręcznej pracy recepcji.", color: "accent" as const },
];

const smsColorMap: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary-100/80", text: "text-primary-500" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600" },
  red: { bg: "bg-red-100/80", text: "text-red-500" },
};

const reminderTimeline = [
  { label: "48h przed wizytą", desc: "Pierwsze przypomnienie SMS z prośbą o potwierdzenie. Pacjent ma czas zareagować z wyprzedzeniem.", color: "bg-primary-500", textColor: "text-primary-500" },
  { label: "24h przed wizytą", desc: "Kolejna wiadomość lub rozmowa głosowa AI — szczególnie jeśli brakuje potwierdzenia.", color: "bg-accent-500", textColor: "text-accent-500" },
  { label: "2h przed wizytą", desc: "Ostatnie przypomnienie z adresem i instrukcjami przygotowania. Eliminuje spóźnienia i nieobecności.", color: "bg-emerald-500", textColor: "text-emerald-600" },
];

const callActions = [
  { icon: CheckCircle, label: "Potwierdzić wizytę", color: "emerald" as const },
  { icon: XIcon, label: "Odwołać termin", color: "red" as const },
  { icon: RefreshCw, label: "Przełożyć wizytę", color: "amber" as const },
  { icon: PhoneIncoming, label: "Połączyć się z recepcją", color: "primary" as const },
  { icon: MessageCircle, label: "Uzyskać dodatkowe informacje", color: "accent" as const },
];

const callColorMap: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600", border: "border-emerald-200" },
  red: { bg: "bg-red-100/80", text: "text-red-500", border: "border-red-200" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600", border: "border-amber-200" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500", border: "border-primary-200" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500", border: "border-accent-200" },
};

const automationBenefits = [
  { icon: Clock, title: "Automatyczne przypomnienia 24/7", desc: "Wiadomości i połączenia wychodzą o właściwej porze, także w weekendy i święta.", color: "primary" as const },
  { icon: Phone, title: "Brak ręcznego dzwonienia", desc: "Recepcja przestaje wykonywać dziesiątki telefonów dziennie z przypomnieniami.", color: "accent" as const },
  { icon: RefreshCw, title: "Aktualizacja statusów wizyt", desc: "Potwierdzono / Zmieniono / Odwołano — system aktualizuje grafik automatycznie.", color: "emerald" as const },
  { icon: CalendarClock, title: "Mniej pustych okienek", desc: "Odwołane terminy wracają do puli — inny pacjent może je zająć tego samego dnia.", color: "amber" as const },
  { icon: UserCheck, title: "Szybsza obsługa pacjentów", desc: "Personel skupia się na pacjentach na miejscu, nie na powtarzalnych telefonach.", color: "primary" as const },
  { icon: Link2, title: "Integracja z systemami medycznymi", desc: "KS SOMED, KS PPS, MediPorta, Serum, MyDrEDM i inne — pełna synchronizacja.", color: "accent" as const },
];

const integrationLogos = [
  { name: "KS SOMED", color: "primary" as const },
  { name: "KS PPS", color: "accent" as const },
  { name: "MediPorta", color: "emerald" as const },
  { name: "Serum", color: "primary" as const },
  { name: "MyDrEDM", color: "amber" as const },
];

const intColorMap: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary-100/80", text: "text-primary-500" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600" },
};

/* ─── Page ─── */

export default function InteligentnePrzypomnieniePage() {
  /* Calculator state */
  const [visits, setVisits] = useState(800);
  const [visitValue, setVisitValue] = useState(200);
  const [noshow, setNoshow] = useState(20);

  const currentMissed = (visits * noshow) / 100;
  const reducedMissed = visits * 0.05;
  const recovered = Math.max(0, currentMissed - reducedMissed);

  const monthlyLoss = currentMissed * visitValue;
  const monthlySavings = recovered * visitValue;
  const yearlySavings = monthlySavings * 12;

  const animatedLoss = useAnimatedNumber(monthlyLoss);
  const animatedSavings = useAnimatedNumber(monthlySavings);
  const animatedYear = useAnimatedNumber(yearlySavings);
  const animatedRecovered = useAnimatedNumber(recovered);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Usługi", href: "/uslugi" },
          { name: "Inteligentne przypomnienia", href: "/uslugi/inteligentne-przypomnienia" },
        ]}
      />
      <JsonLd
        data={generateServiceSchema({
          name: "Inteligentne przypomnienia",
          description:
            "Automatyczne przypomnienia SMS i rozmowy głosowe AI o wizytach. Redukcja no-show nawet do 5%.",
          url: "/uslugi/inteligentne-przypomnienia",
        })}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn>
              <Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
                Usługa VoiceLink
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Inteligentne <span className="text-primary-500">przypomnienia</span> o wizytach,
                <br />
                <span className="text-surface-400 text-3xl sm:text-4xl font-light">które realnie zmniejszają no-show</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                VoiceLink automatycznie przypomina pacjentom o wizytach przez <span className="text-primary-950 font-medium">SMS</span> oraz <span className="text-primary-950 font-medium">rozmowy głosowe AI</span>. Pacjent może potwierdzić, przełożyć lub odwołać wizytę bez udziału recepcji.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/demo">
                  <Button size="lg">
                    <Phone className="h-4 w-4" /> Umów demo
                  </Button>
                </Link>
                <a href="#jak-dziala">
                  <Button variant="outline" size="lg">
                    Zobacz jak działa <ArrowDown className="h-4 w-4" />
                  </Button>
                </a>
                <a href="#kalkulator">
                  <Button variant="ghost" size="lg">
                    <Calculator className="h-4 w-4" /> Policz straty no-show
                  </Button>
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-2.5">
                {heroPills.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 rounded-full border border-surface-200/80 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-surface-600"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary-500" />
                    {text}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── DLACZEGO PRZYPOMNIENIA ── */}
      <section id="jak-dziala" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-8 sm:p-10 shadow-[var(--shadow-card)]">
                <h4 className="text-primary-950 font-semibold mb-1">Wskaźnik no-show</h4>
                <p className="text-surface-400 text-xs mb-10">Przed i po wdrożeniu inteligentnych przypomnień</p>
                <div className="flex items-end gap-10 sm:gap-14 justify-center" style={{ height: 320 }}>
                  <div className="flex flex-col items-center gap-3 h-full justify-end">
                    <div className="text-3xl font-bold text-red-500">23%</div>
                    <div className="w-28 sm:w-32 rounded-t-2xl bg-gradient-to-t from-red-500 to-red-400" style={{ height: 260 }} />
                    <p className="text-surface-500 text-xs font-medium text-center mt-1">
                      Bez
                      <br />
                      przypomnień
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 pb-14">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="text-emerald-600 text-sm font-bold mt-1">-78%</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 h-full justify-end">
                    <div className="text-3xl font-bold text-emerald-600">5%</div>
                    <div className="w-28 sm:w-32 rounded-t-2xl bg-gradient-to-t from-emerald-500 to-emerald-400" style={{ height: 56 }} />
                    <p className="text-emerald-600 text-xs font-medium text-center mt-1">
                      Z
                      <br />
                      VoiceLink
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">
                  Problem no-show
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Każda nieodwołana wizyta to <span className="text-red-500">realna strata</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Nieobecności pacjentów generują tysiące złotych strat miesięcznie, dezorganizują grafik i obciążają recepcję. VoiceLink automatyzuje cały proces przypomnień — pacjenci pojawiają się na wizytach częściej, a personel odzyskuje czas.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {lossStats.map(({ value, label, desc, icon: Icon, color }) => {
                    const c = lossColorMap[color];
                    return (
                      <div
                        key={label}
                        className={`rounded-2xl border ${c.border} bg-white p-5 transition-all hover:shadow-[var(--shadow-card-hover)]`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                            <Icon className={`w-4.5 h-4.5 ${c.text}`} />
                          </div>
                          <div className={`text-xl font-bold ${c.text} tabular-nums`}>{value}</div>
                        </div>
                        <h4 className="text-sm font-semibold text-primary-950">{label}</h4>
                        <p className="mt-1 text-xs text-surface-500 leading-relaxed">{desc}</p>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── INTELIGENTNE SMS-Y ── */}
      <section id="sms" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                  Inteligentne SMS-y
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Personalizowane SMS-y dopasowane do <span className="text-primary-500">każdej wizyty</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink wysyła automatyczne, inteligentne przypomnienia SMS dopasowane do rodzaju wizyty, specjalisty oraz potrzeb placówki. Możesz dodawać własne instrukcje, zalecenia przed badaniem, lokalizację czy informacje organizacyjne.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {smsFeatures.map(({ icon: Icon, title, desc, color }) => {
                    const c = smsColorMap[color];
                    return (
                      <div
                        key={title}
                        className="rounded-2xl border border-surface-200/80 bg-white p-5 h-full transition-all hover:shadow-[var(--shadow-card-hover)]"
                      >
                        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
                          <Icon className={`w-5 h-5 ${c.text}`} />
                        </div>
                        <h4 className="text-sm font-semibold text-primary-950">{title}</h4>
                        <p className="mt-1 text-xs text-surface-500 leading-relaxed">{desc}</p>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>

            {/* Mockup phone with SMS bubble */}
            <FadeIn delay={0.2}>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm">
                  <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-primary-300/40 via-accent-200/30 to-transparent blur-3xl pointer-events-none" />
                  <div className="relative rounded-[2.5rem] border-[4px] border-primary-500 bg-primary-500 shadow-[0_30px_60px_-15px_rgba(100,164,255,0.35)] overflow-hidden">
                    {/* Screen */}
                    <div className="bg-white p-5 pb-7 min-h-[480px]">
                      {/* Status bar */}
                      <div className="flex items-center justify-between text-[11px] text-primary-950 font-semibold mb-4">
                        <span>9:41</span>
                        <div className="flex items-center gap-1.5">
                          <div className="flex gap-0.5">
                            <div className="w-1 h-2.5 bg-primary-950 rounded-sm" />
                            <div className="w-1 h-3 bg-primary-950 rounded-sm" />
                            <div className="w-1 h-3.5 bg-primary-950 rounded-sm" />
                            <div className="w-1 h-4 bg-primary-950 rounded-sm" />
                          </div>
                          <div className="w-5 h-2.5 rounded-sm border border-primary-950 relative">
                            <div className="absolute inset-0.5 right-1 bg-primary-950 rounded-[1px]" />
                          </div>
                        </div>
                      </div>

                      {/* Sender */}
                      <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-surface-100">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center shadow-sm">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-primary-950 text-xs font-semibold">VoiceMed</div>
                          <div className="text-surface-400 text-[10px]">Wiadomość SMS · teraz</div>
                        </div>
                      </div>

                      {/* SMS bubble */}
                      <div className="rounded-2xl rounded-tl-md bg-surface-50 border border-surface-100 p-4 text-[13px] leading-relaxed text-surface-700">
                        <p>
                          Dzień dobry, <strong className="text-primary-950">Marek</strong>! 👋
                        </p>
                        <p className="mt-2">
                          Cieszymy się na Twoją wizytę <strong className="text-primary-950">25 marca (poniedziałek)</strong> o godzinie <strong className="text-primary-950">14:30</strong>.
                        </p>
                        <p className="mt-2 text-surface-600">
                          Przed badaniem prosimy <strong>nie jeść przez 6 godzin</strong> oraz dobrze się nawodnić.
                        </p>
                        <p className="mt-2 text-surface-600">
                          Wejście do przychodni VoiceMed znajduje się od ulicy <strong>Jaśminowej 16</strong>.
                        </p>
                        <p className="mt-2 text-surface-600">
                          Aby potwierdzić wizytę odpowiedz <strong>TAK</strong>. Aby zmienić termin odpowiedz <strong>ZMIEŃ</strong>.
                        </p>
                      </div>
                      <div className="mt-1.5 text-[10px] text-surface-400 pl-1">Odebrano</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.3}>
            <p className="text-center text-sm text-surface-400 mt-10 max-w-2xl mx-auto">
              Każda wiadomość może być w pełni personalizowana i automatycznie dopasowana do typu wizyty.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ── TIMELINE PRZYPOMNIEŃ ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">
                Harmonogram
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Trzy momenty, w których <span className="text-primary-500">odzywamy się do pacjenta</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
                Sekwencja przypomnień jest dopasowana do rytmu pacjenta — żeby zawsze znaleźć właściwy moment, ale nigdy nie być uciążliwy.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-5 relative">
            {/* Connector line on desktop */}
            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary-200 via-accent-200 to-emerald-200 -z-0" />
            {reminderTimeline.map(({ label, desc, color, textColor }, idx) => (
              <StaggerItem key={label}>
                <div className="relative rounded-2xl border border-surface-200/80 bg-white p-7 h-full shadow-sm transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${color} text-white font-bold flex items-center justify-center shadow-[var(--shadow-glow-primary)]`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wider ${textColor}`}>Krok {idx + 1}</div>
                      <div className="text-primary-950 font-semibold">{label}</div>
                    </div>
                  </div>
                  <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── AI DZWONI DO PACJENTÓW ── */}
      <section id="ai-voice" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Animated phone call mockup */}
            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        AI
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>
                    <div>
                      <div className="text-primary-950 font-semibold text-sm">Asystentka VoiceLink</div>
                      <div className="text-surface-400 text-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Rozmowa wychodząca · 00:38
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="w-2 h-2 rounded-full bg-surface-200" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-surface-50 border border-surface-200/60 px-4 py-2.5 text-sm text-surface-700">
                      Dzień dobry, dzwonię z VoiceMed. Przypominam o wizycie u dr. Kowalskiej jutro o 14:30. Czy potwierdza Pani termin?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary-500 text-white px-4 py-2.5 text-sm">
                      Tak, potwierdzam.
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-surface-50 border border-surface-200/60 px-4 py-2.5 text-sm text-surface-700">
                      Świetnie! Wysłałam SMS z adresem i instrukcjami. Wizyta została potwierdzona. Życzę miłego dnia.
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-surface-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-surface-500">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Status: <strong className="text-emerald-600">Potwierdzono</strong>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-surface-500">
                    <RefreshCw className="w-3.5 h-3.5 text-primary-500" />
                    Synchronizacja z grafikiem
                  </div>
                </div>
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                  AI Voice Assistant
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  AI dzwoni do pacjentów <span className="text-primary-500">za Ciebie</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink może również automatycznie kontaktować się z pacjentami telefonicznie przed wizytą. Nasza asystentka AI prowadzi naturalną rozmowę, przypomina o terminie i obsługuje odpowiedzi pacjentów w czasie rzeczywistym.
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="mt-6 text-xs font-semibold uppercase tracking-wider text-surface-400 mb-3">
                  Co może zrobić pacjent podczas rozmowy?
                </div>
                <div className="space-y-3">
                  {callActions.map(({ icon: Icon, label, color }) => {
                    const c = callColorMap[color];
                    return (
                      <div
                        key={label}
                        className={`flex items-center gap-3 rounded-xl border ${c.border} bg-white p-3.5 transition-all hover:shadow-sm`}
                      >
                        <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-4 h-4 ${c.text}`} />
                        </div>
                        <span className="text-sm font-medium text-primary-950">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="mt-7 rounded-2xl border border-primary-200/60 bg-primary-50/30 p-5">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-surface-600 leading-relaxed">
                      System działa <strong className="text-primary-950">24/7</strong> i integruje się z harmonogramem placówki, automatycznie aktualizując status wizyty.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── KALKULATOR NO-SHOW ── */}
      <section id="kalkulator" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">
                Kalkulator
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Sprawdź ile <span className="text-primary-500">kosztuje Cię no-show</span>
              </h2>
              <p className="mt-4 text-surface-500 text-lg">
                Przesuń suwaki — wynik aktualizuje się w czasie rzeczywistym i pokazuje, ile Twoja placówka może odzyskać dzięki inteligentnym przypomnieniom VoiceLink.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Sliders */}
            <div className="lg:col-span-3">
              <FadeIn>
                <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)]">
                  <h3 className="text-lg font-semibold text-primary-950 mb-8 flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-emerald-600" />
                    Dane Twojej placówki
                  </h3>
                  <div className="space-y-8">
                    <Slider
                      id="visits"
                      label="Liczba wizyt miesięcznie"
                      min={50}
                      max={5000}
                      step={50}
                      value={visits}
                      onChange={setVisits}
                      minLabel="50"
                      maxLabel="5 000"
                    />
                    <Slider
                      id="visitValue"
                      label="Średnia wartość wizyty (zł)"
                      min={50}
                      max={1000}
                      step={25}
                      value={visitValue}
                      onChange={setVisitValue}
                      suffix=" zł"
                      minLabel="50 zł"
                      maxLabel="1 000 zł"
                    />
                    <Slider
                      id="noshow"
                      label="Aktualny wskaźnik no-show"
                      min={5}
                      max={50}
                      step={1}
                      value={noshow}
                      onChange={setNoshow}
                      suffix="%"
                      minLabel="5%"
                      maxLabel="50%"
                    />
                  </div>

                  <div className="mt-10 pt-7 border-t border-surface-100">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="rounded-xl bg-red-50/60 border border-red-100 p-4">
                        <div className="text-xs uppercase tracking-wider text-red-600 font-semibold mb-1">
                          Tracone wizyty / mies.
                        </div>
                        <div className="text-2xl font-bold text-red-500 tabular-nums">{fmt(currentMissed)}</div>
                      </div>
                      <div className="rounded-xl bg-emerald-50/60 border border-emerald-100 p-4">
                        <div className="text-xs uppercase tracking-wider text-emerald-600 font-semibold mb-1">
                          Odzyskane / mies.
                        </div>
                        <div className="text-2xl font-bold text-emerald-600 tabular-nums">{fmt(animatedRecovered)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Result panel */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.15}>
                <div className="lg:sticky lg:top-28 space-y-5">
                  <div className="rounded-2xl border border-red-200/60 bg-white p-6 shadow-sm">
                    <h4 className="text-xs uppercase tracking-wider text-red-500 font-semibold mb-3">
                      Miesięczna strata
                    </h4>
                    <div className="text-4xl font-bold text-red-500 tabular-nums">{fmt(animatedLoss)} zł</div>
                    <p className="text-xs text-surface-400 mt-2">
                      Przy {fmt(visits)} wizytach miesięcznie i {noshow}% no-show
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-primary-50/30 p-6">
                    <h4 className="text-xs uppercase tracking-wider text-emerald-600 font-semibold mb-3">
                      Możliwe oszczędności z VoiceLink
                    </h4>
                    <div className="text-4xl font-bold text-emerald-600 tabular-nums">{fmt(animatedSavings)} zł</div>
                    <p className="text-xs text-surface-500 mt-2">miesięcznie</p>
                    <div className="mt-4 pt-4 border-t border-emerald-200/40">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-surface-500">Rocznie</span>
                        <span className="text-2xl font-bold text-emerald-600 tabular-nums">{fmt(animatedYear)} zł</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-primary-200/60 bg-primary-50/40 p-5">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-surface-600 leading-relaxed">
                        Placówki korzystające z inteligentnych przypomnień VoiceLink redukują no-show <strong className="text-primary-950">nawet do 5%</strong>.
                      </p>
                    </div>
                  </div>

                  <Link href="/demo">
                    <Button size="lg" className="w-full">
                      Zobacz ile możesz odzyskać <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── AUTOMATYZACJA RECEPCJI ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                Automatyzacja
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Mniej telefonów. <span className="text-primary-500">Więcej czasu dla pacjentów.</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500">
                VoiceLink przejmuje powtarzalne obowiązki recepcji związane z przypomnieniami i potwierdzeniami wizyt. Personel skupia się na obsłudze pacjentów na miejscu — nie na dziesiątkach telefonów dziennie.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {automationBenefits.map(({ icon: Icon, title, desc, color }) => {
              const c = smsColorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent">
                    <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center mb-5`}>
                      <Icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <h3 className="text-[15px] font-semibold text-primary-950">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-surface-500">{desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── CHATBOT SMS ── */}
      <section className="py-16 md:py-24">
        <Container size="default">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-gradient-to-br from-accent-50/40 via-white to-primary-50/30 p-8 md:p-12 lg:p-14 shadow-[var(--shadow-card)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-accent-100/40 blur-3xl pointer-events-none" />
              <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center">
                <div>
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">
                    Asystentka SMS
                  </span>
                  <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                    Pacjenci mogą <span className="text-primary-500">odpowiadać</span> na wiadomości
                  </h2>
                  <p className="mt-5 text-[17px] text-surface-600 leading-relaxed max-w-2xl">
                    VoiceLink umożliwia także prowadzenie automatycznych konwersacji SMS z pacjentami. Inteligentna asystentka odpowiada na pytania i pomaga w obsłudze wizyt — bez angażowania recepcji.
                  </p>
                  <div className="mt-7">
                    <Link href="/uslugi/obsluga-klienta-247">
                      <Button size="lg" variant="outline">
                        Dowiedz się więcej o asystentce VoiceLink <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary-200/30 to-accent-200/20 blur-xl" />
                    <div className="relative w-44 h-44 rounded-3xl bg-white border border-surface-200/80 shadow-[var(--shadow-card)] flex items-center justify-center">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-400 to-primary-500 flex items-center justify-center shadow-[var(--shadow-glow-accent)]">
                        <MessageCircle className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── INTEGRACJE ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">
                  Integracje
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Działa z <span className="text-primary-500">Twoim systemem</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink integruje się z kalendarzem oraz systemami medycznymi placówki, dzięki czemu przypomnienia wysyłają się automatycznie bez dodatkowej pracy personelu.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  {integrationLogos.map(({ name, color }) => {
                    const c = intColorMap[color];
                    return (
                      <div
                        key={name}
                        className="flex items-center gap-3 rounded-xl border border-surface-200/80 bg-white p-3.5 transition-all hover:shadow-sm"
                      >
                        <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                          <Link2 className={`w-4 h-4 ${c.text}`} />
                        </div>
                        <span className="text-sm font-medium text-primary-950">{name}</span>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/integracje"
                  className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 transition-colors mt-6 font-medium"
                >
                  Zobacz wszystkie integracje <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-primary-950 font-semibold text-sm">Synchronizacja w czasie rzeczywistym</div>
                    <div className="text-surface-400 text-xs">Status wizyty aktualizowany automatycznie</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { time: "08:14", label: "SMS przypominający wysłany", color: "primary" as const },
                    { time: "08:18", label: "Pacjent odpowiedział TAK", color: "emerald" as const },
                    { time: "08:18", label: "Status w grafiku: Potwierdzono", color: "accent" as const },
                  ].map(({ time, label, color }) => {
                    const c = smsColorMap[color];
                    return (
                      <div
                        key={label}
                        className="flex items-center gap-3 rounded-xl border border-surface-200/80 bg-surface-50/40 p-3"
                      >
                        <span className="text-xs font-semibold text-surface-400 tabular-nums w-12">{time}</span>
                        <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center`}>
                          <CheckCircle className={`w-3.5 h-3.5 ${c.text}`} />
                        </div>
                        <span className="text-sm text-primary-950 font-medium">{label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-5 border-t border-surface-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-surface-500">
                    <Zap className="w-3.5 h-3.5" />
                    Szyfrowanie AES-256
                  </div>
                  <div className="flex items-center gap-1.5 text-surface-500">
                    <Globe className="w-3.5 h-3.5" />
                    Zgodne z RODO
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <RelatedServices currentHref="/uslugi/inteligentne-przypomnienia" />

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100/80 mb-6">
                <Bell className="w-7 h-7 text-primary-500" />
              </div>
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Zmniejsz no-show i zautomatyzuj <span className="text-primary-500">przypomnienia o wizytach</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Zobacz jak VoiceLink może automatycznie przypominać pacjentom o wizytach przez SMS i rozmowy AI.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/demo">
                  <Button size="lg">
                    Umów prezentację <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/kontakt">
                  <Button variant="outline" size="lg">
                    <Send className="h-4 w-4" /> Porozmawiaj z nami
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
