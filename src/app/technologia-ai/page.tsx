"use client";

import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  Mic,
  Brain,
  Volume2,
  X,
  Check,
  CalendarCheck,
  Clock,
  XCircle,
  MessageSquare,
  Zap,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Data ─── */

const automations = [
  { title: "Utwórz rezerwację", sub: "Dr. Nowak, 14:00, kardiologia", icon: CalendarCheck, color: "emerald" as const, status: "aktywna", statusBg: "bg-emerald-100/80 text-emerald-600" },
  { title: "Zmień termin wizyty", sub: "Przesunięcie z wtorku na czwartek", icon: Clock, color: "amber" as const, status: "gotowa", statusBg: "bg-surface-100 text-surface-500" },
  { title: "Anuluj wizytę", sub: "Odwołanie i zwolnienie terminu", icon: XCircle, color: "red" as const, status: "gotowa", statusBg: "bg-surface-100 text-surface-500" },
  { title: "Wyślij SMS potwierdzenie", sub: "Data, godzina, adres, lekarz", icon: MessageSquare, color: "primary" as const, status: "gotowa", statusBg: "bg-surface-100 text-surface-500" },
];

const automationChecks = [
  "Zarządzanie rezerwacjami — tworzenie, zmiana, anulowanie",
  "Potwierdzenia wizyt i przypomnienia SMS",
  "Udzielanie informacji o placówce, lekarzach, godzinach",
  "Zbieranie danych pacjenta (imię, PESEL, telefon)",
  "Przekierowanie do personelu, gdy sytuacja tego wymaga",
];

const summaryCards = [
  { title: "Pacjent mówi", desc: "Naturalnym językiem, bez żadnych ograniczeń.", icon: Mic, color: "pink" as const },
  { title: "AI rozumie", desc: "Intencje, kontekst i potrzeby rozmówcy.", icon: Lightbulb, color: "accent" as const },
  { title: "AI działa", desc: "Uruchamia automatyzację w systemie placówki.", icon: Zap, color: "primary" as const },
  { title: "AI odpowiada", desc: "Naturalnym głosem ElevenLabs.", icon: Volume2, color: "emerald" as const },
];

const colorMap: Record<string, { bg: string; text: string; bgSoft: string }> = {
  pink: { bg: "bg-pink-100/80", text: "text-pink-500", bgSoft: "bg-pink-50/60" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500", bgSoft: "bg-accent-50/60" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500", bgSoft: "bg-primary-50/60" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600", bgSoft: "bg-emerald-50/60" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600", bgSoft: "bg-amber-50/60" },
  red: { bg: "bg-red-100/80", text: "text-red-500", bgSoft: "bg-red-50/60" },
};

/* ─── Page ─── */

export default function TechnologiaAIPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Jak to działa", href: "/jak-to-dziala" }, { name: "Technologia AI", href: "/technologia-ai" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Technologia AI</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Nowa era <span className="text-primary-500">obsługi głosowej</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Skończyła się era robotycznych systemów IVR i gotowych voicebotów z pudełka. VoiceLink to dedykowane rozwiązanie AI — budowane pod Twoją placówkę, z technologią, która rozumie naturalną mowę tak, jak rozmówca ją wypowiada.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8">
                <Link href="/demo"><Button size="lg"><PlayCircle className="h-4 w-4" /> Posłuchaj jak brzmi</Button></Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── KONIEC ERY IVR ── */}
      <section id="koniec-ivr" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-500 mb-4">Rewolucja</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Koniec ery <span className="text-primary-500">robotycznych IVR</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed mb-4">Tradycyjne systemy IVR zmuszały pacjentów do nawigowania po menu numerycznym — "wciśnij 1, wciśnij 2" — lub powtarzania sztywnych fraz, które system ledwo rozpoznawał.</p>
                <p className="text-surface-500 leading-relaxed mb-8">Nasz asystent AI prowadzi <span className="text-primary-950 font-medium">naturalną rozmowę</span>. Pacjent mówi swoimi słowami, a system rozumie intencje — niezależnie od sposobu sformułowania.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-red-200/80 bg-red-50/50 p-4 text-center">
                    <div className="text-red-500 text-xs font-bold uppercase mb-2">Stare IVR</div>
                    <p className="text-surface-500 text-xs leading-relaxed">"Aby umówić wizytę, wciśnij 1. Aby odwołać, wciśnij 2..."</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 text-center">
                    <div className="text-emerald-600 text-xs font-bold uppercase mb-2">VoiceLink AI</div>
                    <p className="text-surface-500 text-xs leading-relaxed">"Dzień dobry, chciałbym umówić wizytę do kardiologa na przyszły tydzień"</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 relative overflow-hidden shadow-[var(--shadow-card)]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-accent-50/20" />
                <div className="relative z-10 space-y-6">
                  <div className="opacity-40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100/80 border border-red-200 flex items-center justify-center"><X className="w-4 h-4 text-red-500" /></div>
                      <span className="text-red-500 text-xs font-bold uppercase">Tradycyjne IVR</span>
                    </div>
                    <div className="bg-red-50/60 border border-red-200/60 rounded-xl p-4 font-mono text-xs text-surface-400 leading-relaxed">
                      <span className="text-red-400">&gt;</span> Witamy. Wybierz 1 aby...<br />
                      <span className="text-red-400">&gt;</span> Nie rozpoznano. Powtórz...<br />
                      <span className="text-red-400">&gt;</span> Błąd. Łączenie z operatorem...
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-surface-300" />
                    <span className="text-primary-500 text-xs font-bold">VS</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-surface-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/80 border border-emerald-200 flex items-center justify-center"><Check className="w-4 h-4 text-emerald-600" /></div>
                      <span className="text-emerald-600 text-xs font-bold uppercase">VoiceLink AI</span>
                    </div>
                    <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-4 text-xs text-surface-600 leading-relaxed space-y-2">
                      <div className="flex gap-2"><span className="text-accent-500 flex-shrink-0">AI:</span><span>Dzień dobry, tu przychodnia MedCare. W czym mogę pomóc?</span></div>
                      <div className="flex gap-2"><span className="text-primary-500 flex-shrink-0">Pacjent:</span><span>Chciałbym umówić się do kardiologa, najlepiej w przyszłym tygodniu.</span></div>
                      <div className="flex gap-2"><span className="text-accent-500 flex-shrink-0">AI:</span><span>Oczywiście. Mam wolny termin w środę o 10:30 u dr. Kowalskiego. Pasuje Panu?</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── PIPELINE: STT → AI → TTS ── */}
      <section id="jak-dziala" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Trzy etapy w ułamku sekundy</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Jak AI rozumie <span className="text-primary-500">i odpowiada</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-2xl mx-auto">Każde zdanie wypowiedziane przez pacjenta przechodzi przez trzy etapy przetwarzania — a cały proces trwa mniej niż sekundę.</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid lg:grid-cols-3 gap-6">
            {/* STT */}
            <StaggerItem>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 relative overflow-hidden h-full shadow-[var(--shadow-card)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-pink-300" />
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-pink-300 text-4xl font-bold">01</span>
                  <div>
                    <h3 className="text-primary-950 font-semibold text-lg">Speech-to-Text</h3>
                    <span className="text-pink-500 text-xs font-medium">Zamiana mowy na tekst</span>
                  </div>
                </div>
                <div className="flex items-center justify-center h-12 mb-6">
                  <Mic className="w-10 h-10 text-pink-400" />
                </div>
                <p className="text-surface-500 text-sm leading-relaxed mb-4">Pacjent mówi do telefonu. Zaawansowany system rozpoznawania mowy (STT) natychmiast przekształca dźwięk w tekst — z dokładnością powyżej 95%.</p>
                <div className="rounded-xl border border-surface-200/60 bg-surface-50 p-3 text-center">
                  <div className="text-surface-400 text-xs mb-1">Pacjent mówi:</div>
                  <div className="text-primary-950 text-sm font-medium italic">"Chcę umówić wizytę do okulisty"</div>
                </div>
              </div>
            </StaggerItem>

            {/* AI / LLM */}
            <StaggerItem>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 relative overflow-hidden h-full shadow-[var(--shadow-card)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-400 to-accent-300" />
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-accent-300 text-4xl font-bold">02</span>
                  <div>
                    <h3 className="text-primary-950 font-semibold text-lg">Model AI</h3>
                    <span className="text-accent-500 text-xs font-medium">Analiza i generowanie odpowiedzi</span>
                  </div>
                </div>
                <div className="flex items-center justify-center h-12 mb-6">
                  <Brain className="w-10 h-10 text-accent-400" />
                </div>
                <p className="text-surface-500 text-sm leading-relaxed mb-4">Model sztucznej inteligencji analizuje tekst, rozumie intencje pacjenta i generuje odpowiedź. Bazuje na informacjach o placówce, dozwolonych zakresach i scenariuszach rozmów.</p>
                <div className="rounded-xl border border-surface-200/60 bg-surface-50 p-3">
                  <div className="text-surface-400 text-xs mb-1">AI rozumie:</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-accent-100/80 text-accent-500 border border-accent-200">intencja: rezerwacja</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-primary-100/80 text-primary-500 border border-primary-200">specjalista: okulista</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* TTS */}
            <StaggerItem>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 relative overflow-hidden h-full shadow-[var(--shadow-card)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-primary-300" />
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-emerald-300 text-4xl font-bold">03</span>
                  <div>
                    <h3 className="text-primary-950 font-semibold text-lg">Text-to-Speech</h3>
                    <span className="text-emerald-600 text-xs font-medium">Generowanie naturalnego głosu</span>
                  </div>
                </div>
                <div className="flex items-center justify-center h-12 mb-6">
                  <Volume2 className="w-10 h-10 text-emerald-400" />
                </div>
                <p className="text-surface-500 text-sm leading-relaxed mb-4">Odpowiedź AI zamieniana jest na naturalny głos przy użyciu technologii <span className="text-primary-950 font-medium">ElevenLabs</span> — polskiej firmy specjalizującej się w generowaniu mowy. Głos brzmi naturalnie i płynnie.</p>
                <div className="rounded-xl border border-surface-200/60 bg-surface-50 p-3 text-center">
                  <div className="text-surface-400 text-xs mb-1">AI odpowiada głosem:</div>
                  <div className="text-primary-950 text-sm font-medium italic">"Mam wolny termin w czwartek o 14:00..."</div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="rounded-2xl border border-primary-200/60 bg-primary-50/40 p-6 text-center">
                <div className="flex items-center justify-center gap-3">
                  <Zap className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <p className="text-surface-600 text-sm">Cały proces — od słowa pacjenta do odpowiedzi AI — trwa <span className="text-primary-950 font-bold">mniej niż sekundę</span>.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── INTELIGENTNE AUTOMATYZACJE ── */}
      <section id="automatyzacje" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 relative overflow-hidden shadow-[var(--shadow-card)]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-accent-50/20" />
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-100/80 border border-accent-200">
                      <Brain className="w-4 h-4 text-accent-500" />
                      <span className="text-accent-600 text-xs font-medium">AI analizuje rozmowę</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {automations.map((a) => {
                      const c = colorMap[a.color];
                      const Icon = a.icon;
                      return (
                        <div key={a.title} className="flex items-center gap-3 rounded-xl border border-surface-200/60 bg-surface-50/60 p-3">
                          <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-4 h-4 ${c.text}`} />
                          </div>
                          <div><div className="text-primary-950 text-xs font-medium">{a.title}</div><div className="text-surface-400 text-xs">{a.sub}</div></div>
                          <div className={`ml-auto px-2 py-0.5 rounded-full ${a.statusBg} text-xs font-medium`}>{a.status}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Automatyzacje</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Inteligentne <span className="text-primary-500">automatyzacje</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed mb-4">Asystent AI to nie tylko rozmowa. To przede wszystkim <span className="text-primary-950 font-medium">inteligencja, która wie co zrobić</span>. Na podstawie rozmowy sam zbiera potrzebne dane i decyduje, którą automatyzację uruchomić.</p>
                <p className="text-surface-500 leading-relaxed mb-8">Każda automatyzacja jest podpięta pod system rezerwacyjny Twojej placówki. AI może utworzyć wizytę, zmienić termin, anulować rezerwację, wysłać potwierdzenie SMS — i wiele więcej.</p>
                <div className="space-y-4">
                  {automationChecks.map((c) => (
                    <div key={c} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-surface-600 text-sm">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── ELEVENLABS & GLOS ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Głos</span>
                <h2 id="naturalny-glos" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Naturalny głos od <span className="text-primary-500">ElevenLabs</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed mb-4">Głos asystenta generowany jest przez <span className="text-primary-950 font-medium">ElevenLabs</span> — polską firmę, światowego lidera w syntezie mowy AI. To nie jest monotonny robot — to głos, który brzmi jak prawdziwy człowiek.</p>
                <p className="text-surface-500 leading-relaxed mb-8">Naturalna intonacja, odpowiedni ton i płynność wypowiedzi sprawiają, że pacjenci często nie zdają sobie sprawy, że rozmawiają ze sztuczną inteligencją.</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl border border-surface-200/80 bg-white p-4 text-center shadow-sm"><div className="text-2xl font-bold text-primary-950 mb-1">32</div><div className="text-surface-400 text-xs">języki</div></div>
                  <div className="rounded-xl border border-surface-200/80 bg-white p-4 text-center shadow-sm"><div className="text-2xl font-bold text-accent-500 mb-1">&lt;1s</div><div className="text-surface-400 text-xs">latencja</div></div>
                  <div className="rounded-xl border border-surface-200/80 bg-white p-4 text-center shadow-sm"><div className="text-2xl font-bold text-primary-500 mb-1">99%</div><div className="text-surface-400 text-xs">naturalność</div></div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 relative overflow-hidden shadow-[var(--shadow-card)]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 to-primary-50/20" />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-primary-100 flex items-center justify-center mx-auto mb-6">
                    <Mic className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-primary-950 font-semibold text-xl mb-2">ElevenLabs</h3>
                  <p className="text-surface-400 text-xs mb-6">Polska firma, światowy lider AI Voice</p>
                  <div className="space-y-3">
                    {[
                      { label: "Naturalność", pct: 99, color: "bg-emerald-500", textColor: "text-emerald-600" },
                      { label: "Emocjonalność", pct: 92, color: "bg-accent-500", textColor: "text-accent-500" },
                      { label: "Wyrazistość", pct: 96, color: "bg-primary-500", textColor: "text-primary-500" },
                    ].map((bar) => (
                      <div key={bar.label} className="flex items-center justify-between rounded-xl border border-surface-200/60 bg-surface-50/60 px-4 py-3">
                        <span className="text-surface-600 text-sm">{bar.label}</span>
                        <div className="flex-1 mx-4 h-2 rounded-full bg-surface-200/60 overflow-hidden"><div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.pct}%` }} /></div>
                        <span className={`${bar.textColor} text-xs font-bold`}>{bar.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── PODSUMOWANIE ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Podsumowanie</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Prosta zasada, <span className="text-primary-500">potężna technologia</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {summaryCards.map(({ title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <h4 className="text-primary-950 font-semibold text-sm mb-2">{title}</h4>
                    <p className="text-surface-400 text-xs leading-relaxed">{desc}</p>
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
                Przekonaj się <span className="text-primary-500">na własne uszy</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">Każde wdrożenie konfigurujemy indywidualnie. Umów bezpłatną prezentację i posłuchaj, jak AI dopasowane do Twojej placówki obsługuje połączenia.</p>
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
