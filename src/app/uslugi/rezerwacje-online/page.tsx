"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  X as XIcon,
  Calendar as CalendarIcon,
  Search,
  Plus,
  RefreshCw,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Bell,
  MessageSquare,
  BarChart3,
  Link2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { generateServiceSchema } from "@/lib/schema";
import { RelatedServices } from "@/components/sections/related-services";

/* ─── Calendar ─── */

const MONTH_NAMES = [
  "Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec",
  "Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień",
];

type DayType = "outside" | "weekend" | "booked" | "available" | "today" | "normal";

function seedRand(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

function getMonthData(year: number, month: number) {
  const rand = seedRand(year * 100 + month + 7);
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const days: { day: number; type: DayType }[] = [];
  for (let i = startDay - 1; i >= 0; i--) days.push({ day: prevMonthDays - i, type: "outside" });
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = (startDay + d - 1) % 7;
    const isToday = year === today.getFullYear() && month === today.getMonth() && d === today.getDate();
    const isWeekend = dow === 5 || dow === 6;
    let type: DayType = "normal";
    if (isToday) type = "today";
    else if (isWeekend) type = "weekend";
    else { const r = rand(); if (r < 0.35) type = "booked"; else if (r < 0.75) type = "available"; }
    days.push({ day: d, type });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) days.push({ day: i, type: "outside" });
  if (days.length > 35 && days.slice(35).every((d) => d.type === "outside")) days.splice(35);
  return days;
}

const dayStyles: Record<DayType, string> = {
  outside: "text-surface-300",
  weekend: "text-surface-400",
  booked: "bg-primary-50 text-primary-500 font-medium",
  available: "bg-emerald-50 text-emerald-600 font-medium",
  today: "bg-primary-500 text-white font-bold shadow-sm",
  normal: "text-surface-600",
};

function Calendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [visible, setVisible] = useState(true);
  const days = useMemo(() => getMonthData(year, month), [year, month]);

  const navigate = useCallback((dir: number) => {
    setVisible(false);
    setTimeout(() => {
      setMonth((prev) => {
        let m = prev + dir;
        if (m > 11) { m = 0; setYear((y) => y + 1); }
        if (m < 0) { m = 11; setYear((y) => y - 1); }
        return m;
      });
      setVisible(true);
    }, 100);
  }, []);

  return (
    <div className="rounded-2xl border border-surface-200/80 bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-primary-950 font-semibold text-sm">{MONTH_NAMES[month]} {year}</h4>
        <div className="flex gap-1">
          <button onClick={() => navigate(-1)} className="w-7 h-7 rounded-lg bg-surface-100 hover:bg-surface-200 flex items-center justify-center transition-colors cursor-pointer">
            <ChevronLeft className="w-3.5 h-3.5 text-surface-500" />
          </button>
          <button onClick={() => navigate(1)} className="w-7 h-7 rounded-lg bg-surface-100 hover:bg-surface-200 flex items-center justify-center transition-colors cursor-pointer">
            <ChevronRight className="w-3.5 h-3.5 text-surface-500" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-surface-400 mb-2">
        {["Pn","Wt","Śr","Cz","Pt","Sb","Nd"].map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1 transition-all duration-300" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(6px)" }}>
        {days.map((d, i) => (
          <div key={i} className={`p-2 rounded-lg text-center text-xs ${dayStyles[d.type]}`}>{d.day}</div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-5 text-xs">
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span className="text-surface-500">Wolne</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary-400" /><span className="text-surface-500">Zajęte</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary-500" /><span className="text-surface-500">Dzisiaj</span></div>
      </div>
    </div>
  );
}

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
    <div ref={ref} className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
      <div className={`text-3xl font-bold mb-2 ${color}`}>{value}</div>
      <div className="text-surface-500 text-sm mb-4">{label}</div>
      <div className="h-2 rounded-full bg-surface-200/60 overflow-hidden">
        <div className={`h-full rounded-full bg-current ${color} transition-all duration-1000 ease-out`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

/* ─── Data ─── */

const features = [
  { title: "Sprawdzenie terminów", desc: "AI sprawdza dostępność lekarza w czasie rzeczywistym i proponuje najbliższe wolne terminy.", icon: Search, color: "emerald" as const },
  { title: "Zapis na wizytę", desc: "Automatyczny zapis do kalendarza z pełnymi danymi pacjenta i rodzajem wizyty.", icon: Plus, color: "primary" as const },
  { title: "Zmiana terminu", desc: "Pacjent może zmienić termin telefonicznie — AI przełoży wizytę automatycznie.", icon: RefreshCw, color: "accent" as const },
  { title: "Odwołanie wizyty", desc: "Odwołanie z zapisem powodu. Termin wraca do puli — inny pacjent może go zająć.", icon: Trash2, color: "red" as const },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500" },
  red: { bg: "bg-red-100/80", text: "text-red-500" },
};

const timeline = [
  { label: "Natychmiast po rezerwacji", desc: "SMS + email z potwierdzeniem terminu, adresem i instrukcjami przygotowania.", color: "bg-primary-500" },
  { label: "48h przed wizytą", desc: "Przypomnienie SMS z linkiem do potwierdzenia, przełożenia lub odwołania.", color: "bg-accent-500" },
  { label: "24h przed wizytą", desc: "Prośba o reconfirm. Brak potwierdzenia = automatyczny alert do recepcji.", color: "bg-emerald-500" },
  { label: "2h przed wizytą", desc: "Ostatnie przypomnienie z adresem placówki i informacjami o parkingu.", color: "bg-amber-500" },
];

const integrations = [
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

const stats = [
  { value: "-78%", label: "Redukcja no-show", fill: 78, color: "text-emerald-600" },
  { value: "3x", label: "Więcej rezerwacji na godzinę", fill: 90, color: "text-primary-500" },
  { value: "0 min", label: "Czekania na recepcji", fill: 100, color: "text-accent-500" },
  { value: "24/7", label: "Rezerwacje bez przerw", fill: 100, color: "text-amber-500" },
];

/* ─── Page ─── */

export default function RezerwacjeOnlinePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Usługi", href: "/uslugi" }, { name: "Rezerwacje online", href: "/uslugi/rezerwacje-online" }]} />
      <JsonLd data={generateServiceSchema({ name: "Rezerwacje online", description: "Automatyczne umawianie wizyt przez AI zintegrowane z kalendarzem placówki.", url: "/uslugi/rezerwacje-online" })} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Usługa VoiceLink</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Rezerwacje <span className="text-primary-500">online</span>
                <br /><span className="text-surface-400 text-3xl sm:text-4xl font-light">Automatyczne umawianie wizyt</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Indywidualnie skonfigurowany system AI, który umawia wizyty <span className="text-primary-950 font-medium">przez telefon w czasie rzeczywistym</span>. Zintegrowany z Twoim kalendarzem — sprawdza dostępność, zapisuje, wysyła potwierdzenie.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/demo"><Button size="lg"><CalendarIcon className="h-4 w-4" /> Poproś o demo</Button></Link>
                <a href="#co-obejmuje"><Button variant="outline" size="lg">Jak to działa? <ArrowDown className="h-4 w-4" /></Button></a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── NO-SHOW PROBLEM ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-8 sm:p-10 shadow-[var(--shadow-card)]">
                <h4 className="text-primary-950 font-semibold mb-1">Wskaźnik no-show</h4>
                <p className="text-surface-400 text-xs mb-10">Przed i po wdrożeniu VoiceLink</p>
                <div className="flex items-end gap-10 sm:gap-14 justify-center" style={{ height: 320 }}>
                  <div className="flex flex-col items-center gap-3 h-full justify-end">
                    <div className="text-3xl font-bold text-red-500">23%</div>
                    <div className="w-28 sm:w-32 rounded-t-2xl bg-gradient-to-t from-red-500 to-red-400" style={{ height: 260 }} />
                    <p className="text-surface-500 text-xs font-medium text-center mt-1">Bez<br />przypomnień</p>
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
                    <p className="text-emerald-600 text-xs font-medium text-center mt-1">Z<br />VoiceLink</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">Problem no-show</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Puste terminy kosztują Cię tysiące</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Średnio <strong className="text-primary-950">co piąty pacjent</strong> nie pojawia się na umówionej wizycie. To stracony czas lekarza, pusty gabinet i utracony przychód. Automatyczne przypomnienia VoiceLink redukują ten problem o blisko 80%.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-100/80 flex items-center justify-center shrink-0">
                      <XIcon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-primary-950 font-medium text-sm mb-1">Bez przypomnień: 23% no-show</h4>
                      <p className="text-surface-500 text-sm">Przy 100 wizytach dziennie to 23 puste sloty. Rocznie — tysiące straconych wizyt.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-primary-950 font-medium text-sm mb-1">Z VoiceLink: 5% no-show</h4>
                      <p className="text-surface-500 text-sm">Automatyczne przypomnienia SMS i telefoniczne. Pacjent potwierdza lub przełoży — termin nie przepada.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="mt-8 rounded-2xl border border-primary-200/60 bg-primary-50/30 p-5">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-primary-950 font-medium mb-1">Badania potwierdzają</p>
                      <p className="text-xs text-surface-500 leading-relaxed">Automatyczne przypomnienia SMS i telefoniczne <strong className="text-primary-950">znacząco zmniejszają</strong> wskaźnik nieobecności na wizytach w placówkach medycznych.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CO OBEJMUJE REZERWACJA ── */}
      <section id="co-obejmuje" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Funkcje</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Co obejmuje <span className="text-primary-500">rezerwacja?</span></h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-7 text-center h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-5`}>
                      <Icon className={`h-7 w-7 ${c.text}`} />
                    </div>
                    <h3 className="font-semibold text-primary-950 mb-2">{title}</h3>
                    <p className="text-surface-500 text-sm">{desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── POTWIERDZENIA I PRZYPOMNIENIA ── */}
      <section id="potwierdzenia" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Przypomnienia</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Potwierdzenia i inteligentne przypomnienia</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Automatyczne przypomnienia SMS, e-mail i telefoniczne — z możliwością potwierdzenia, przełożenia lub odwołania jednym kliknięciem.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 relative pl-8 space-y-7">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-surface-200 rounded-full" />
                  {timeline.map(({ label, desc, color }) => (
                    <div key={label} className="relative">
                      <div className={`absolute -left-8 top-1 w-5 h-5 rounded-full ${color} ring-4 ring-white`} />
                      <h4 className="text-sm font-medium text-primary-950">{label}</h4>
                      <p className="text-sm text-surface-500 mt-1">{desc}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-primary-950 text-sm font-medium">VoiceLink SMS</div>
                    <div className="text-surface-400 text-xs">Teraz</div>
                  </div>
                </div>
                <div className="rounded-2xl bg-surface-50 border border-surface-200/60 p-4 text-sm text-surface-600 leading-relaxed">
                  <p>Przypomnienie: Wizyta u <strong className="text-primary-950">dr. Kowalski</strong> jutro o <strong className="text-primary-950">10:30</strong>.</p>
                  <p className="mt-2 text-xs text-surface-400">Klinika ul. Medyczna 15, Warszawa</p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-600 text-xs font-medium">Potwierdzam</span>
                    <span className="px-3 py-1.5 rounded-full bg-amber-100/80 text-amber-600 text-xs font-medium">Przełóż</span>
                    <span className="px-3 py-1.5 rounded-full bg-red-100/80 text-red-500 text-xs font-medium">Odwołaj</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── INTEGRACJE + KALENDARZ ── */}
      <section id="integracje" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-500 mb-4">Integracje</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Łączy się z systemem, którego już używasz</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink integruje się z popularnymi systemami medycznymi. Zero ręcznej synchronizacji — AI rezerwuje bezpośrednio w Twoim systemie.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-4">
                  {integrations.map(({ name, color }) => {
                    const c = intColorMap[color];
                    return (
                      <div key={name} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                          <Link2 className={`w-4 h-4 ${c.text}`} />
                        </div>
                        <span className="text-primary-950 text-sm font-medium">{name}</span>
                      </div>
                    );
                  })}
                </div>
                <Link href="/integracje" className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 transition-colors mt-6 font-medium">
                  Zobacz wszystkie integracje <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <Calendar />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── STATYSTYKI ── */}
      <section id="korzysci" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Wyniki</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Mierzalne korzyści <span className="text-primary-500">dla Twojej placówki</span></h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s) => (
              <StaggerItem key={s.value}>
                <AnimatedBar {...s} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <RelatedServices currentHref="/uslugi/rezerwacje-online" />

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Koniec z pustymi <span className="text-primary-500">terminami</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Wypełnij kalendarz, zredukuj no-show i daj pacjentom rezerwację 24/7. Bez dodatkowych etatów.
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
