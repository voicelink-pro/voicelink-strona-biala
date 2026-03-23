"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  ArrowDown,
  X as XIcon,
  Check,
  Clock,
  Users,
  Zap,
  Heart,
  Globe,
  CheckCircle,
  MessageSquare,
  CalendarPlus,
  CalendarX,
  CalendarClock,
  HelpCircle,
  ClipboardList,
  Bell,
  FileText,
  ArrowRightLeft,
  Mic,
  Shield,
  Brain,
  BarChart3,
} from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { generateServiceSchema } from "@/lib/schema";
import { RelatedServices } from "@/components/sections/related-services";

/* ─── Data ─── */

const callTypes = [
  { title: "Umawianie wizyt", desc: "Sprawdza dostępne terminy, umawia pacjenta, wysyła potwierdzenie SMS. Obsługuje wizyty NFZ i prywatne.", icon: CalendarPlus, color: "emerald" },
  { title: "Anulacja wizyty", desc: "Pacjent odwołuje wizytę telefonicznie. AI zwalnia termin, aktualizuje kalendarz i uruchamia listę rezerwową.", icon: CalendarX, color: "red" },
  { title: "Zmiana terminu", desc: "Pacjent chce przełożyć wizytę? AI proponuje nowe dostępne terminy i potwierdza zmianę.", icon: CalendarClock, color: "amber" },
  { title: "Pytania o placówkę", desc: "Godziny, lokalizacja, parking, usługi, specjalizacje, cennik — AI odpowiada natychmiast z bazy wiedzy.", icon: HelpCircle, color: "primary" },
  { title: "Przygotowanie do badań", desc: "Informuje jak się przygotować — czy być na czczo, co zabrać, jakie dokumenty.", icon: ClipboardList, color: "accent" },
  { title: "Potwierdzenia wizyt", desc: "Automatycznie dzwoni lub wysyła SMS z przypomnieniem. Pacjent może potwierdzić jednym kliknięciem.", icon: Bell, color: "pink" },
  { title: "Recepty i wyniki", desc: "Informuje o gotowości wyników, statusie recept, zasadach odbioru. Odciąża recepcję.", icon: FileText, color: "violet" },
  { title: "Przekierowanie do personelu", desc: "Pilne sprawy, skargi lub złożone przypadki — AI natychmiast przekazuje do odpowiedniej osoby.", icon: ArrowRightLeft, color: "sky" },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600", border: "border-emerald-200" },
  red: { bg: "bg-red-100/80", text: "text-red-500", border: "border-red-200" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600", border: "border-amber-200" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500", border: "border-primary-200" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500", border: "border-accent-200" },
  pink: { bg: "bg-pink-100/80", text: "text-pink-500", border: "border-pink-200" },
  violet: { bg: "bg-violet-100/80", text: "text-violet-500", border: "border-violet-200" },
  sky: { bg: "bg-sky-100/80", text: "text-sky-500", border: "border-sky-200" },
};

const barStats = [
  { label: "Obsłużone rozmowy", value: "1 247 / 1 280", fill: 97, color: "bg-emerald-500" },
  { label: "Udane rozmowy", value: "1 210 (97%)", fill: 97, color: "bg-primary-500" },
  { label: "Utworzone rezerwacje", value: "634", fill: 50, color: "bg-accent-500" },
  { label: "Przekierowane do personelu", value: "112 (9%)", fill: 9, color: "bg-amber-500" },
  { label: "Potwierdzone wizyty", value: "581", fill: 45, color: "bg-violet-500" },
  { label: "Redukcja no-show", value: "↓ 62%", fill: 62, color: "bg-emerald-600" },
];

/* ─── Animated bar component ─── */
function AnimatedBar({ label, value, fill, color }: typeof barStats[number]) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(fill); },
      { threshold: 0.3 }
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

/* ─── Flowchart ─── */
function Flowchart() {
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState(0);

  useEffect(() => {
    const steps = [0, 1, 2, 3, 4];
    let i = 0;
    const delays = [1500, 2000, 2000, 2000, 2500];
    let timeout: ReturnType<typeof setTimeout>;

    function next() {
      i = (i + 1) % steps.length;
      if (i === 3) setPick(Math.floor(Math.random() * 3));
      setStep(steps[i]);
      timeout = setTimeout(next, delays[i]);
    }
    timeout = setTimeout(next, delays[0]);
    return () => clearTimeout(timeout);
  }, []);

  const stepActive = (s: number) => step >= s;
  const optLabels = ["Obsługuje", "Zapisuje", "Łączy"];
  const optSubs = ["FAQ, rezerwacje", "Wiadomość", "Pilne przypadki"];
  const optColors = ["text-emerald-600", "text-amber-600", "text-red-500"];

  return (
    <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
      <div className="space-y-3">
        <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-500 ${stepActive(1) ? "border-accent-200 bg-accent-50/50" : "border-surface-200/80 bg-surface-50/50"}`}>
          <div className={`w-3 h-3 rounded-full transition-all duration-500 ${stepActive(1) ? "bg-accent-500" : "bg-surface-300"}`} />
          <span className={`text-sm transition-all duration-500 ${stepActive(1) ? "text-primary-950 font-medium" : "text-surface-400"}`}>Połączenie przychodzące</span>
        </div>

        <div className="flex justify-center"><ArrowDown className={`h-5 w-5 transition-colors duration-500 ${stepActive(1) ? "text-accent-400" : "text-surface-300"}`} /></div>

        <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-500 ${stepActive(2) ? "border-primary-200 bg-primary-50/50" : "border-surface-200/80 bg-surface-50/50"}`}>
          <div className={`w-3 h-3 rounded-full transition-all duration-500 ${stepActive(2) ? "bg-primary-500" : "bg-surface-300"}`} />
          <span className={`text-sm transition-all duration-500 ${stepActive(2) ? "text-primary-950 font-medium" : "text-surface-400"}`}>AI analizuje intencję</span>
        </div>

        <div className="flex justify-center"><ArrowDown className={`h-5 w-5 transition-colors duration-500 ${stepActive(2) ? "text-primary-400" : "text-surface-300"}`} /></div>

        <div className="grid grid-cols-3 gap-2">
          {optLabels.map((label, i) => (
            <div key={label} className={`p-3 rounded-xl border text-center transition-all duration-500 ${stepActive(3) && pick === i ? `${i === 0 ? "border-emerald-200 bg-emerald-50/50" : i === 1 ? "border-amber-200 bg-amber-50/50" : "border-red-200 bg-red-50/50"}` : "border-surface-200/80 bg-surface-50/50"}`}>
              <div className={`text-xs font-medium transition-all duration-300 ${stepActive(3) && pick === i ? optColors[i] : "text-surface-400"}`}>{label}</div>
              <div className="text-[10px] text-surface-400 mt-1">{optSubs[i]}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center"><ArrowDown className={`h-5 w-5 transition-colors duration-500 ${stepActive(4) ? "text-emerald-400" : "text-surface-300"}`} /></div>

        <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-500 ${stepActive(4) ? "border-emerald-200 bg-emerald-50/50" : "border-surface-200/80 bg-surface-50/50"}`}>
          <BarChart3 className={`h-5 w-5 transition-all duration-500 ${stepActive(4) ? "text-emerald-600" : "text-surface-300"}`} />
          <span className={`text-sm transition-all duration-500 ${stepActive(4) ? "text-primary-950 font-medium" : "text-surface-400"}`}>Raport do panelu</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */

export default function RecepcjonistkaAIPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Usługi", href: "/uslugi" }, { name: "Recepcjonistka AI", href: "/uslugi/recepcjonistka-ai" }]} />
      <JsonLd data={generateServiceSchema({ name: "Recepcjonistka AI", description: "Wirtualna recepcjonistka AI odbierająca połączenia 24/7 — umawia wizyty, odpowiada na pytania, przekierowuje pilne sprawy.", url: "/uslugi/recepcjonistka-ai" })} />

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
                Recepcjonistka <span className="text-primary-500">AI</span>
                <br />
                <span className="text-surface-400 text-3xl sm:text-4xl font-light">dla placówek medycznych</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Nie gotowy voicebot z pudełka, a <span className="text-primary-950 font-medium">dedykowane rozwiązanie AI</span> budowane pod Twoją placówkę. Odbiera każde połączenie, zbiera dane, umawia wizyty. Brzmi naturalnie — nie jak bot. Pracuje 24/7.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/demo"><Button size="lg"><Phone className="h-4 w-4" /> Poproś o demo</Button></Link>
                <a href="#problem"><Button variant="outline" size="lg">Zobacz jak działa <ArrowDown className="h-4 w-4" /></Button></a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── PROBLEM — NIEODEBRANE POŁĄCZENIA ── */}
      <section id="problem" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">Problem</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Ile połączeń <span className="text-red-500">tracisz?</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
                Placówki medyczne tracą nawet co 4. połączenie w godzinach szczytu. Pacjent, który nie dodzwoni się dziś — zadzwoni do konkurencji.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <FadeIn delay={0.1}>
              <div className="text-center">
                <p className="text-surface-400 text-sm font-medium mb-6 uppercase tracking-wider">Bez VoiceLink</p>
                <div className="relative mx-auto w-40 h-40 mb-4">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="314" strokeDashoffset="236" strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-red-500">25%</span>
                    <span className="text-xs text-surface-400">nieodebrane</span>
                  </div>
                </div>
                <p className="text-surface-500 text-sm">Nawet <span className="text-primary-950 font-medium">co 4. pacjent</span> nie dodzwania się</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-2xl border border-surface-200/80 bg-white p-5">
                  <p className="text-xs text-primary-950 font-medium mb-1">Dane z placówek medycznych</p>
                  <p className="text-xs text-surface-500 leading-relaxed">
                    Placówki tracą średnio <strong className="text-primary-950">20–30%</strong> połączeń w szczycie. Przy 100 połączeniach dziennie — to 25 utraconych pacjentów.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-surface-300">
                  <div className="w-12 h-px bg-gradient-to-r from-red-300 to-transparent" />
                  <span className="text-xs font-medium uppercase tracking-wider">vs</span>
                  <div className="w-12 h-px bg-gradient-to-l from-emerald-300 to-transparent" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="text-center">
                <p className="text-emerald-600 text-sm font-medium mb-6 uppercase tracking-wider">Z VoiceLink</p>
                <div className="relative mx-auto w-40 h-40 mb-4">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="314" strokeDashoffset="3" strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-emerald-600">99%</span>
                    <span className="text-xs text-surface-400">odebrane</span>
                  </div>
                </div>
                <p className="text-surface-500 text-sm">Praktycznie <span className="text-emerald-600 font-medium">każde połączenie</span> obsłużone</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── JAKIE POŁĄCZENIA OBSŁUGUJE ── */}
      <section id="typy-polaczen" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Możliwości</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Jakie połączenia <span className="text-primary-500">obsługuje?</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {callTypes.map(({ title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-5`}>
                      <Icon className={`h-6 w-6 ${c.text}`} />
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

      {/* ── DOSTĘPNOŚĆ I WYDAJNOŚĆ ── */}
      <section id="dostepnosc" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Dostępność i wydajność</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Zawsze dostępna. Nigdy nie zajęta.</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Tradycyjna recepcja to jedna osoba, jedna linia, ograniczone godziny. Wirtualna recepcja AI nie ma takich limitów.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-6">
                  {[
                    { icon: Clock, title: "Dostępność 24/7", desc: "Odbiera telefony o każdej porze — w nocy, weekendy, święta. Cały rok na okrągło.", color: "primary" },
                    { icon: Users, title: "Wiele rozmów jednocześnie", desc: "Prowadzi kilkanaście rozmów naraz. Koniec z kolejkami w szczycie.", color: "accent" },
                    { icon: Zap, title: "Natychmiastowa odpowiedź", desc: "Zero czekania. Pacjent od razu rozmawia z asystentem i załatwia sprawę.", color: "amber" },
                  ].map(({ icon: Icon, title, desc, color }) => {
                    const c = colorMap[color];
                    return (
                      <div key={title} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`h-5 w-5 ${c.text}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary-950">{title}</h4>
                          <p className="text-sm text-surface-500 leading-relaxed mt-1">{desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-2xl border border-surface-200/80 bg-white p-6 text-center">
                  <div className="text-5xl font-bold text-primary-500 mb-2">24/7</div>
                  <p className="text-surface-500 text-sm">Dostępność — noce, weekendy, święta</p>
                </div>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center">
                  <div className="text-4xl font-bold text-accent-500 mb-2">15+</div>
                  <p className="text-surface-500 text-xs">Rozmów jednocześnie</p>
                </div>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center">
                  <div className="text-4xl font-bold text-amber-500 mb-2">&lt;2s</div>
                  <p className="text-surface-500 text-xs">Czas do odebrania</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── JAKOŚĆ OBSŁUGI ── */}
      <section id="jakosc" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-500 mb-4">Jakość obsługi</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Jakość rozmowy <span className="text-primary-500">na najwyższym poziomie</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">Każdy pacjent traktowany z taką samą uwagą — niezależnie od pory dnia.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Zawsze uprzejma i cierpliwa", desc: "Nigdy się nie denerwuje. Każdy pacjent traktowany z życzliwością — o 8 rano i o 23.", color: "pink" },
              { icon: CheckCircle, title: "Spójne i aktualne informacje", desc: "Tylko zweryfikowane informacje. Brak pomyłek, nieścisłości czy zapomnianych szczegółów.", color: "primary" },
              { icon: Globe, title: "Mówi w kilku językach", desc: "Obsługa w wielu językach jednocześnie — polski, ukraiński, angielski. Bez dodatkowych kosztów.", color: "accent" },
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
        </Container>
      </section>

      {/* ── WSPARCIE ZESPOŁU ── */}
      <section id="wsparcie-zespolu" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.1}>
              <div className="space-y-4">
                <div className="rounded-2xl border border-red-200/80 bg-red-50/30 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><XIcon className="w-4 h-4 text-red-500" /></div>
                    <span className="text-sm font-semibold text-red-600">Bez recepcjonistki AI</span>
                  </div>
                  <ul className="space-y-2 text-sm text-surface-600">
                    {["Recepcja przeciążona w godzinach szczytu", "Pacjenci czekają na linii lub się rozłączają", "Brak odbioru po godzinach i w weekendy", "Ręczne potwierdzanie wizyt — czasochłonne"].map((t) => (
                      <li key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><Check className="w-4 h-4 text-emerald-600" /></div>
                    <span className="text-sm font-semibold text-emerald-600">Z recepcjonistką AI</span>
                  </div>
                  <ul className="space-y-2 text-sm text-surface-600">
                    {["AI przejmuje powtarzalne rozmowy — recepcja ma czas", "Pacjent nigdy nie czeka — natychmiastowy odbiór", "Nietypowe sprawy płynnie przekierowane do człowieka", "Automatyczne SMS — potwierdzenia, przypomnienia, zmiany"].map((t) => (
                      <li key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Wsparcie zespołu</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Odciąża recepcję. Nie zastępuje ludzi.</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Asystent AI przejmuje powtarzalne zadania, żeby Twój zespół mógł skupić się na obsłudze pacjentów na miejscu.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-6">
                  {[
                    { icon: Shield, title: "Odciąża zespół recepcji", desc: "Przejmuje FAQ, rezerwacje, potwierdzenia — uwalnia czas na obsługę na miejscu.", color: "emerald" },
                    { icon: ArrowRightLeft, title: "Przekierowanie do pracownika", desc: "W nietypowych sytuacjach płynnie przekazuje rozmowę z pełnym kontekstem.", color: "red" },
                    { icon: MessageSquare, title: "Automatyczne potwierdzenia", desc: "SMS z datą, godziną i adresem. Mniej nieobecności, mniej pracy dla recepcji.", color: "primary" },
                  ].map(({ icon: Icon, title, desc, color }) => {
                    const c = colorMap[color];
                    return (
                      <div key={title} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`h-5 w-5 ${c.text}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary-950">{title}</h4>
                          <p className="text-sm text-surface-500 mt-1">{desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── INTELIGENTNY ROUTING — FLOWCHART ── */}
      <section id="routing" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Inteligentny routing</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Kiedy AI obsługuje, kiedy łączy z człowiekiem?</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  System wie, co może rozwiązać sam, a co wymaga ludzkiej interwencji.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-4">
                  {[
                    { title: "AI obsługuje samodzielnie", desc: "FAQ, godziny, cennik, umawianie wizyt, przypomnienia", color: "emerald" },
                    { title: "Przekierowuje rozmowę", desc: "Gdy pacjent chce konkretną osobę lub sprawa wykracza poza zakres AI", color: "amber" },
                    { title: "Natychmiast łączy z człowiekiem", desc: "Pilne przypadki medyczne, skargi, nagłe sytuacje", color: "red" },
                  ].map(({ title, desc, color }) => {
                    const c = colorMap[color];
                    return (
                      <div key={title} className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Check className={`w-4 h-4 ${c.text}`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-primary-950">{title}</h4>
                          <p className="text-sm text-surface-500">{desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <Flowchart />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── ZBIERANIE DANYCH ── */}
      <section id="zbieranie-danych" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Zbieranie danych</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Inteligentnie zbiera dane <span className="text-primary-500">potrzebne do rezerwacji</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">Podczas naturalnej rozmowy AI zbiera dokładnie te informacje, których potrzebuje Twoja placówka.</p>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-5 gap-8">
            <StaggerContainer className="lg:col-span-3 space-y-4">
              {[
                { num: 1, title: "Dane osobowe pacjenta", desc: "Imię, nazwisko, telefon, PESEL — w zależności od wymagań placówki" },
                { num: 2, title: "Cel wizyty i specjalizacja", desc: "Rodzaj wizyty, lekarz, opis objawów, stopień pilności" },
                { num: 3, title: "Preferowany termin", desc: "Konkretna data, dzień tygodnia, pora dnia, elastyczność" },
                { num: 4, title: "Typ finansowania", desc: "NFZ czy prywatnie, ubezpieczenie, skierowanie" },
                { num: 5, title: "Zgody i potwierdzenie", desc: "Zgoda na SMS, potwierdzenie danych, RODO" },
              ].map(({ num, title, desc }) => (
                <StaggerItem key={num}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-5 flex items-start gap-4 transition-all hover:border-emerald-200 hover:shadow-[var(--shadow-card-hover)]">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center shrink-0">
                      <span className="text-emerald-600 font-bold text-sm">{num}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-950">{title}</h4>
                      <p className="text-sm text-surface-500">{desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.2} className="lg:col-span-2 flex items-start justify-center lg:sticky lg:top-28">
              <div className="w-full max-w-sm">
                <div className="rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-[var(--shadow-card)]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-sm">AK</div>
                    <div>
                      <div className="text-primary-950 font-medium text-sm">Anna Kowalska</div>
                      <div className="text-surface-400 text-xs">Nowa rezerwacja · właśnie teraz</div>
                    </div>
                    <div className="ml-auto"><Badge variant="primary" className="text-[10px]">Potwierdzona</Badge></div>
                  </div>
                  <div className="space-y-0 text-sm">
                    {[
                      { label: "Wizyta", value: "Konsultacja kardiologiczna" },
                      { label: "Lekarz", value: "dr Marek Wiśniewski" },
                      { label: "Termin", value: "Śr 19.02, godz. 10:30" },
                      { label: "Finansowanie", value: "NFZ", accent: true },
                      { label: "SMS", value: "✓ Wysłane", green: true },
                    ].map(({ label, value, accent, green }) => (
                      <div key={label} className="flex justify-between py-2.5 border-b border-surface-100 last:border-0">
                        <span className="text-surface-400 text-xs">{label}</span>
                        <span className={`text-xs font-medium ${green ? "text-emerald-600" : accent ? "text-primary-500" : "text-primary-950"}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-surface-400 text-center mt-3">Dane zbierane automatycznie podczas rozmowy</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── JAKOŚĆ GŁOSU ── */}
      <section id="glos" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Jakość</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Nie brzmi jak bot. <span className="text-primary-500">Brzmi jak człowiek.</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Mic, title: "Naturalny głos", desc: "Synteza mowy nowej generacji. Intonacja, pauzy, emocje.", color: "primary" },
              { icon: MessageSquare, title: "Ton Twojej marki", desc: "Dostosowany styl komunikacji. Profesjonalny, ciepły, empatyczny.", color: "accent" },
              { icon: Brain, title: "Rozumie kontekst", desc: "Dopytuje, pamięta wcześniejsze wypowiedzi, nie gubi wątku.", color: "emerald" },
              { icon: Zap, title: "Odpowiedź <2s", desc: "Błyskawiczny czas reakcji. Brak niezręcznych pauz.", color: "amber" },
            ].map(({ icon: Icon, title, desc, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-4`}>
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

      {/* ── RAPORTOWANIE ── */}
      <section id="raportowanie" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between mb-7">
                  <h4 className="font-semibold text-primary-950 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary-500" /> Raport miesięczny
                  </h4>
                  <span className="text-xs text-surface-400 px-2.5 py-1 rounded-full bg-surface-50 border border-surface-200/80">Styczeń 2026</span>
                </div>
                <div className="space-y-5">
                  {barStats.map((s) => <AnimatedBar key={s.label} {...s} />)}
                </div>
              </div>
            </FadeIn>
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Miesięczne raporty</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Pełna kontrola nad obsługą pacjentów</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Co miesiąc szczegółowy raport z pracy AI. Widzisz dokładnie ile rozmów obsłużyła, ile rezerwacji utworzyła i jak wpłynęła na efektywność.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-3">
                  {[
                    "Ilość obsłużonych i udanych rozmów",
                    "Ilość utworzonych rezerwacji i potwierdzeń",
                    "Procent przekierowań do personelu",
                    "Wpływ na redukcję no-show",
                    "Pełne logi rozmów",
                    "Powiadomienia e-mail i SMS",
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

      <RelatedServices currentHref="/uslugi/recepcjonistka-ai" />

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Nie trać kolejnego <span className="text-primary-500">połączenia</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-lg mx-auto">
                Każde wdrożenie projektujemy od podstaw pod Twoją placówkę. Umów bezpłatne demo i sprawdź, jak dedykowany asystent AI może odciążyć Twoją recepcję.
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
