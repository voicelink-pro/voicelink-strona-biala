"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  X as XIcon,
  Clock,
  HelpCircle,
  ClipboardList,
  CheckCircle,
  AlertTriangle,
  CalendarClock,
  Mail,
  Shield,
  Globe,
  FileText,
  Database,
  BarChart3,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { generateServiceSchema } from "@/lib/schema";
import { RelatedServices } from "@/components/sections/related-services";

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
        <span className={`font-bold ${color}`}>{value}</span>
      </div>
      <div className="h-3 rounded-full bg-surface-200/60 overflow-hidden">
        <div className={`h-full rounded-full bg-current ${color} transition-all duration-1000 ease-out`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

/* ─── Data ─── */

const topics = [
  { title: "FAQ i informacje", desc: "Odpowiedzi na najczęstsze pytania: godziny, lokalizacja, cennik, specjalizacje, przygotowanie do wizyty.", icon: HelpCircle, color: "primary" as const },
  { title: "Oferta i usługi", desc: "Szczegóły oferty, dostępne badania, zabiegi, informacje o NFZ vs prywatnie.", icon: ClipboardList, color: "accent" as const },
  { title: "Status wizyt i badań", desc: "Potwierdzenie terminu, informacje o wynikach, status skierowania.", icon: CheckCircle, color: "emerald" as const },
  { title: "Reklamacje i zgłoszenia", desc: "Przyjmowanie reklamacji, kategoryzacja, tworzenie ticketów do obsługi.", icon: AlertTriangle, color: "amber" as const },
  { title: "Rezerwacje poza godzinami", desc: "Pacjent dzwoni o 23:00 — AI zbiera dane i tworzy rezerwację. Gdy API nie działa, zapisuje zgłoszenie i rezerwuje automatycznie po powrocie systemu.", icon: CalendarClock, color: "pink" as const },
  { title: "Przekierowanie do personelu", desc: "Gdy temat wykracza poza kompetencje AI — połączenie z dyżurnym lub zapisanie wiadomości do kontaktu w godzinach pracy.", icon: Mail, color: "violet" as const },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary-100/80", text: "text-primary-500" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600" },
  pink: { bg: "bg-pink-100/80", text: "text-pink-500" },
  violet: { bg: "bg-violet-100/80", text: "text-violet-500" },
};

const boundaries = [
  { positive: false, title: "Nie udziela porad medycznych", desc: "Nie diagnozuje, nie zaleca leków, nie interpretuje wyników badań." },
  { positive: false, title: "Nie modyfikuje danych medycznych", desc: "Nie ma dostępu do kart pacjentów, recept czy dokumentacji medycznej." },
  { positive: true, title: "Natychmiast eskaluje do człowieka", desc: "Pilne przypadki, skargi, niezrozumiałe prośby — natychmiastowe przekierowanie do personelu." },
  { positive: true, title: "Ciągłe doskonalenie scenariuszy", desc: "Regularnie analizujemy i optymalizujemy scenariusze rozmów na podstawie danych." },
];

const slaItems = [
  { label: "Czas odpowiedzi", value: "<2 sekundy", fill: 99, color: "text-emerald-600" },
  { label: "Uptime systemu", value: "99,9%", fill: 99, color: "text-primary-500" },
  { label: "Spójność odpowiedzi", value: "100%", fill: 100, color: "text-accent-500" },
  { label: "Alerty eskalacji", value: "Real-time", fill: 100, color: "text-amber-500" },
];

const knowledgeSources = [
  { title: "Strona WWW", desc: "Automatycznie skanuje Twoją stronę i uczy się treści.", icon: Globe, color: "primary" as const },
  { title: "Dokumenty PDF", desc: "Upload cennika, regulaminu, instrukcji — AI się ich uczy.", icon: FileText, color: "accent" as const },
  { title: "System placówki", desc: "Dostępność terminów, grafiki lekarzy, specjalizacje — pobierane z systemu.", icon: Database, color: "emerald" as const },
];

const compTraditional = [
  "Dostępna 8-16 / 8-18",
  "Weekendy i święta — zamknięte",
  "1-2 linie telefoniczne",
  "Zmęczenie, emocje, zły dzień",
  "62% nieodebranych połączeń",
  "Koszty etatów, L4, urlopy",
];

const compVoiceLink = [
  "Dostępne 24/7/365",
  "Każdy dzień, każda godzina",
  "Nieograniczona pojemność",
  "Stały standard, zero zmęczenia",
  "99% odebranych połączeń",
  "Stały, przewidywalny koszt",
];

const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

/* ─── Page ─── */

export default function ObslugaKlienta247Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Usługi", href: "/uslugi" }, { name: "Obsługa klienta 24/7", href: "/uslugi/obsluga-klienta-247" }]} />
      <JsonLd data={generateServiceSchema({ name: "Obsługa klienta 24/7", description: "Całodobowy asystent AI odpowiadający na pytania pacjentów i eskalujący pilne sprawy.", url: "/uslugi/obsluga-klienta-247" })} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Usługa VoiceLink</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Obsługa klienta <span className="text-primary-500">24/7</span>
                <br /><span className="text-surface-400 text-3xl sm:text-4xl font-light">Bez przerw i dni wolnych</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Dedykowany asystent AI budowany pod Twoją placówkę — dostępny <span className="text-primary-950 font-medium">zawsze</span>. W nocy, w weekendy, w święta. Odpowiada natychmiast, spójnie, i nigdy nie ma złego dnia.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/demo"><Button size="lg"><Clock className="h-4 w-4" /> Włącz 24/7</Button></Link>
                <a href="#dostepnosc"><Button variant="outline" size="lg">Dlaczego to ważne? <ArrowDown className="h-4 w-4" /></Button></a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── DOSTĘPNOŚĆ - PROBLEM ── */}
      <section id="dostepnosc" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">Problem branży</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Tylko <span className="text-red-500">19%</span> call center działa 24/7
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
                W sektorze healthcare pełna dostępność to wyjątek. Pacjenci dzwonią poza godzinami — i nikt nie odbiera.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-6">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="14" strokeDasharray="314" strokeDashoffset="60" strokeLinecap="round" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="14" strokeDasharray="314" strokeDashoffset="254" strokeLinecap="round" style={{ transform: "rotate(291.6deg)", transformOrigin: "center" }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-red-500">81%</span>
                    <span className="text-xs text-surface-400">bez 24/7</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-surface-500 text-sm">Brak 24/7</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-surface-500 text-sm">Działa 24/7</span></div>
                </div>
              </div>
            </FadeIn>

            <div>
              <FadeIn delay={0.15}>
                <div className="rounded-2xl border border-primary-200/60 bg-primary-50/30 p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-primary-950 font-medium mb-1">Dane branżowe — Healthcare</p>
                      <p className="text-xs text-surface-500 leading-relaxed">
                        Tylko <strong className="text-primary-950">19% healthcare call center</strong> działa 24/7. Spora część połączeń przychodzi poza godzinami pracy — kończąc bez odpowiedzi.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-6">
                  <h4 className="text-primary-950 font-semibold text-sm mb-4">Dostępność VoiceLink — 24h</h4>
                  <div className="grid grid-cols-12 gap-1">
                    {hours.map((h) => (
                      <div key={h} className="rounded-lg bg-emerald-100/80 p-1.5 text-center">
                        <span className="text-[9px] text-emerald-600 font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-surface-400">Pełna dostępność 0:00 — 24:00</span>
                    <span className="text-[10px] text-emerald-600 font-medium px-2 py-0.5 rounded-full bg-emerald-100/80">ONLINE</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── JAKIE TEMATY OBSŁUGUJE ── */}
      <section id="tematy" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Zakres</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Jakie tematy obsługuje <span className="text-primary-500">AI 24/7?</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map(({ title, desc, icon: Icon, color }) => {
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

      {/* ── GRANICE AI + SLA ── */}
      <section id="eskalacja" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4">Bezpieczeństwo</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">AI wie, czego nie powinno robić</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink jest zaprojektowane z wyraźnymi granicami. AI nigdy nie udziela porad medycznych, nie diagnozuje i nie podejmuje decyzji klinicznych.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-5">
                  {boundaries.map((b) => (
                    <div key={b.title} className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-lg ${b.positive ? "bg-emerald-100/80" : "bg-red-100/80"} flex items-center justify-center shrink-0 mt-0.5`}>
                        {b.positive
                          ? <Check className="w-4 h-4 text-emerald-600" />
                          : <XIcon className="w-4 h-4 text-red-500" />
                        }
                      </div>
                      <div>
                        <h4 className="text-primary-950 font-medium text-sm">{b.title}</h4>
                        <p className="text-surface-500 text-sm">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <h4 className="font-semibold text-primary-950 mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600" /> SLA VoiceLink 24/7
                </h4>
                <div className="space-y-5">
                  {slaItems.map((s) => <AnimatedBar key={s.label} {...s} />)}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                  <p className="text-xs text-surface-500">
                    <span className="text-emerald-600 font-medium">Gwarancja:</span> AI odpowiada tak samo dobrze o 3:00 w nocy jak o 10:00 rano. Zero zmęczenia, stały standard.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── BAZA WIEDZY ── */}
      <section id="baza-wiedzy" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Źródła wiedzy</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Skąd AI bierze <span className="text-primary-500">informacje?</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
                AI nie wymyśla odpowiedzi. Korzysta z aktualnej bazy wiedzy Twojej placówki, którą łatwo aktualizujesz.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-3 gap-5">
            {knowledgeSources.map(({ title, desc, icon: Icon, color }) => {
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

      {/* ── PORÓWNANIE ── */}
      <section id="porownanie" className="py-16 md:py-24">
        <Container size="default">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Porównanie</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Tradycyjna recepcja <span className="text-primary-500">vs VoiceLink</span>
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
                  <h3 className="text-primary-950 font-semibold">Tradycyjna recepcja</h3>
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
                  <h3 className="text-primary-950 font-semibold">VoiceLink AI 24/7</h3>
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

      <RelatedServices currentHref="/uslugi/obsluga-klienta-247" />

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Twoja placówka nigdy <span className="text-primary-500">nie śpi</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Dołącz do elitarnych 19% placówek, które są dostępne 24/7. Bez dodatkowych etatów.
              </p>
              <div className="mt-8">
                <Link href="/demo"><Button size="lg">Włącz obsługę 24/7 <ArrowRight className="h-4 w-4" /></Button></Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
