"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BotMessageSquare,
  Brain,
  CalendarCheck,
  CalendarClock,
  Check,
  CheckCircle,
  Clock,
  Globe,
  Heart,
  Infinity,
  Link2,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
  Sparkles,
  Stethoscope,
  Users,
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

/* ─── Static data ─── */

const heroPills = [
  { icon: Brain, text: "Rozumie naturalny język" },
  { icon: MessageCircle, text: "Prawdziwa konwersacja SMS" },
  { icon: Clock, text: "Działa 24/7" },
  { icon: Infinity, text: "Setki rozmów jednocześnie" },
];

const traditionalProblems = [
  { cmd: "TAK", status: "ok", desc: "Zaakceptowane" },
  { cmd: "tak", status: "fail", desc: "Nierozpoznane" },
  { cmd: "ok, będę", status: "fail", desc: "Nierozpoznane" },
  { cmd: "Potwierdzam :)", status: "fail", desc: "Nierozpoznane" },
  { cmd: "jasne", status: "fail", desc: "Nierozpoznane" },
  { cmd: "TAK.", status: "fail", desc: "Nierozpoznane" },
];

const voicelinkResponses = [
  { cmd: "TAK", status: "ok" },
  { cmd: "tak", status: "ok" },
  { cmd: "ok, będę", status: "ok" },
  { cmd: "Potwierdzam :)", status: "ok" },
  { cmd: "jasne", status: "ok" },
  { cmd: "a o której dokładnie?", status: "ok" },
];

const capabilities = [
  { icon: CheckCircle, title: "Potwierdzić wizytę", desc: "Niezależnie od sposobu zapisu — system rozumie intencję.", color: "emerald" as const },
  { icon: XIcon, title: "Odwołać termin", desc: "Asystentka potwierdza anulację i zwalnia slot w kalendarzu.", color: "red" as const },
  { icon: RefreshCw, title: "Przełożyć wizytę", desc: "Sprawdza wolne terminy i proponuje nowy — wszystko przez SMS.", color: "amber" as const },
  { icon: Stethoscope, title: "Zapytać o przygotowanie", desc: "Instrukcje przed badaniem — dieta, dokumenty, nawodnienie.", color: "primary" as const },
  { icon: MapPin, title: "Informacje organizacyjne", desc: "Adres, parking, godziny pracy — bez dzwonienia na recepcję.", color: "accent" as const },
  { icon: CalendarCheck, title: "Umówić nową wizytę", desc: "Pełna rezerwacja przez SMS — dostępność, lekarz, termin.", color: "primary" as const },
];

const capColorMap: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600", border: "border-emerald-200/60" },
  red: { bg: "bg-red-100/80", text: "text-red-500", border: "border-red-200/60" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600", border: "border-amber-200/60" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500", border: "border-primary-200/60" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500", border: "border-accent-200/60" },
};

const conversationMessages = [
  { from: "system", text: "Dzień dobry! Przypominamy o wizycie u dr. Kowalskiej jutro (wtorek) o 10:30. Czy potwierdzasz termin?" },
  { from: "patient", text: "tak, będę. A powiedz mi jeszcze, czy muszę być na czczo?" },
  { from: "system", text: "Wizyta potwierdzona ✓ Przed badaniem USG jamy brzusznej prosimy nie jeść i nie pić przez 6 godzin. Zalecamy lekkie nawodnienie wieczorem dnia poprzedniego." },
  { from: "patient", text: "ok dzięki. A gdzie jest wejście do kliniki?" },
  { from: "system", text: "Wejście główne od ul. Jaśminowej 16, drugie piętro, gabinet 204. Parking bezpłatny od strony podwórka. Do zobaczenia jutro!" },
];

const stats = [
  { value: "24/7", label: "Dostępność", desc: "Pacjenci piszą o każdej porze — asystentka odpowiada natychmiast.", icon: Clock },
  { value: "100+", label: "Jednoczesnych rozmów", desc: "Bez kolejki, bez czekania — każdy pacjent obsłużony od razu.", icon: Users },
  { value: "<3s", label: "Czas odpowiedzi", desc: "Błyskawiczna reakcja — szybciej niż człowiek sięgnie po telefon.", icon: Zap },
  { value: "0", label: "Angażowania recepcji", desc: "Pełna automatyzacja rutynowej komunikacji SMS.", icon: Heart },
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

/* ─── Animated conversation component ─── */

function AnimatedConversation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleCount(count);
            if (count >= conversationMessages.length) clearInterval(interval);
          }, 900);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-accent-300/30 via-primary-200/20 to-transparent blur-3xl pointer-events-none" />
      <div className="relative rounded-[2rem] border-[4px] border-primary-500 bg-primary-500 shadow-[0_30px_60px_-15px_rgba(100,164,255,0.35)] overflow-hidden">
        {/* Screen */}
        <div className="bg-white p-5 pb-6 min-h-[520px] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-surface-100 mb-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                AI
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <div className="text-primary-950 text-sm font-semibold">Asystentka VoiceLink</div>
              <div className="text-surface-400 text-[11px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Online · SMS
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-hidden">
            {conversationMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "patient" ? "justify-end" : "justify-start"} transition-all duration-500 ${
                  idx < visibleCount ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                    msg.from === "patient"
                      ? "rounded-tr-md bg-primary-500 text-white"
                      : "rounded-tl-md bg-surface-50 border border-surface-100 text-surface-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="mt-4 pt-3 border-t border-surface-100 flex items-center gap-2">
            <div className="flex-1 rounded-full border border-surface-200 bg-surface-50 px-4 py-2.5 text-xs text-surface-400">
              Napisz wiadomość...
            </div>
            <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */

export default function ChatbotVoiceLinkPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Usługi", href: "/uslugi" },
          { name: "Chatbot VoiceLink", href: "/uslugi/chatbot-voicelink" },
        ]}
      />
      <JsonLd
        data={generateServiceSchema({
          name: "Chatbot VoiceLink",
          description:
            "Inteligentna asystentka SMS rozumiejąca naturalny język. Pacjenci komunikują się z placówką tekstowo — 24/7, bez sztywnych komend.",
          url: "/uslugi/chatbot-voicelink",
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
                Chatbot <span className="text-primary-500">VoiceLink</span>
                <br />
                <span className="text-surface-400 text-3xl sm:text-4xl font-light">Inteligentna asystentka SMS</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Pełnoprawna AI-asystentka placówki medycznej działająca w wiadomościach tekstowych. Rozumie <span className="text-primary-950 font-medium">naturalny język</span>, prowadzi prawdziwe konwersacje i jest podłączona do tego samego systemu co asystent głosowy.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/demo">
                  <Button size="lg">
                    <MessageCircle className="h-4 w-4" /> Umów demo
                  </Button>
                </Link>
                <a href="#jak-dziala">
                  <Button variant="outline" size="lg">
                    Zobacz w akcji <ArrowDown className="h-4 w-4" />
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

      {/* ── PROBLEM: TRADYCYJNE SYSTEMY ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">
                Problem
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Tradycyjne systemy SMS <span className="text-red-500">nie rozumieją</span> pacjentów
              </h2>
              <p className="mt-4 text-lg text-surface-500">
                Pacjenci odpisują na SMS-y, ale standardowe systemy wymagają dokładnie określonej frazy. Wystarczy kropka, emotikon czy naturalna odpowiedź — i system się gubi.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Traditional system */}
            <FadeIn>
              <div className="rounded-2xl border border-red-200/60 bg-red-50/20 p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-100/80 flex items-center justify-center">
                    <XIcon className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-primary-950 font-semibold">Tradycyjny system</h3>
                    <p className="text-xs text-surface-400">Rozumie tylko jedną frazę</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {traditionalProblems.map(({ cmd, status, desc }) => (
                    <div
                      key={cmd}
                      className="flex items-center justify-between rounded-xl border border-surface-200/80 bg-white px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <code className="text-sm font-medium text-primary-950 bg-surface-50 px-2.5 py-0.5 rounded-lg border border-surface-100">
                          {cmd}
                        </code>
                      </div>
                      <div className="flex items-center gap-2">
                        {status === "ok" ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <Check className="w-3.5 h-3.5" /> OK
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-semibold text-red-500">
                            <XIcon className="w-3.5 h-3.5" /> {desc}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* VoiceLink */}
            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/20 p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-primary-950 font-semibold">VoiceLink SMS</h3>
                    <p className="text-xs text-surface-400">Rozumie naturalny język</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {voicelinkResponses.map(({ cmd }) => (
                    <div
                      key={cmd}
                      className="flex items-center justify-between rounded-xl border border-surface-200/80 bg-white px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <code className="text-sm font-medium text-primary-950 bg-surface-50 px-2.5 py-0.5 rounded-lg border border-surface-100">
                          {cmd}
                        </code>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <Check className="w-3.5 h-3.5" /> Rozumiem
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-10 rounded-2xl border border-primary-200/60 bg-primary-50/30 p-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-100/80 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-950 mb-1">Jak to działa?</h4>
                  <p className="text-sm text-surface-600 leading-relaxed">
                    VoiceLink analizuje treść każdej wiadomości, rozpoznaje intencję użytkownika i odpowiednio reaguje — niezależnie od sposobu zapisu, wielkości liter, emotikon czy dodatkowych pytań w tej samej wiadomości.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── ANIMOWANA ROZMOWA ── */}
      <section id="jak-dziala" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">
                  Prawdziwa konwersacja
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Nie automat — <span className="text-primary-500">inteligentna rozmowa</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink SMS Assistant prowadzi prawdziwą rozmowę z pacjentem. Analizuje kontekst, rozumie pytania dodatkowe i odpowiada merytorycznie — dokładnie jak doświadczony pracownik recepcji, tylko szybciej i bez przerwy.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-100/80 flex items-center justify-center shrink-0">
                      <Brain className="w-5 h-5 text-accent-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary-950">Ten sam system co asystent głosowy</h4>
                      <p className="text-sm text-surface-500 mt-0.5">Podłączona do identycznej bazy danych, harmonogramu i logiki. Zmiana kanału — nie jakości.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100/80 flex items-center justify-center shrink-0">
                      <CalendarClock className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary-950">Czas rzeczywisty</h4>
                      <p className="text-sm text-surface-500 mt-0.5">Sprawdza dostępne terminy i aktualizuje kalendarz natychmiast — bez opóźnień.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary-950">Kontekst rozmowy</h4>
                      <p className="text-sm text-surface-500 mt-0.5">Pamięta wcześniejsze wiadomości i odpowiada w kontekście — jak prawdziwy człowiek.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <AnimatedConversation />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── CO MOŻE PACJENT ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                Możliwości
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Co może zrobić pacjent <span className="text-primary-500">przez SMS?</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500">
                Wszystko to, co mógłby załatwić przez telefon — ale szybciej, dyskretniej i wtedy, kiedy ma chwilę czasu.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map(({ icon: Icon, title, desc, color }) => {
              const c = capColorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className={`rounded-2xl border ${c.border} bg-white p-7 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent`}>
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

      {/* ── DLA KOGO ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="rounded-3xl border border-surface-200/80 bg-gradient-to-br from-accent-50/60 via-white to-primary-50/40 p-8 sm:p-10 shadow-[var(--shadow-card)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-accent-200/30 blur-3xl pointer-events-none" />
                <div className="relative space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-surface-200/80 shadow-sm flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-surface-300" />
                    </div>
                    <div className="pt-1">
                      <div className="text-xs uppercase tracking-wider text-surface-400 font-semibold">Nie muszę dzwonić</div>
                      <p className="text-sm text-surface-500 mt-1 leading-relaxed">Wielu pacjentów nie lubi rozmawiać przez telefon lub nie ma możliwości odebrania połączenia w ciągu dnia.</p>
                    </div>
                  </div>
                  <div className="h-px bg-surface-100" />
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-surface-200/80 shadow-sm flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-surface-300" />
                    </div>
                    <div className="pt-1">
                      <div className="text-xs uppercase tracking-wider text-surface-400 font-semibold">Kiedy mi pasuje</div>
                      <p className="text-sm text-surface-500 mt-1 leading-relaxed">Pacjenci komunikują się wtedy, kiedy mają chwilę — w przerwie, wieczorem, w autobusie.</p>
                    </div>
                  </div>
                  <div className="h-px bg-surface-100" />
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-surface-200/80 shadow-sm flex items-center justify-center shrink-0">
                      <MessageCircle className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="pt-1">
                      <div className="text-xs uppercase tracking-wider text-primary-500 font-semibold">Szybko i dyskretnie</div>
                      <p className="text-sm text-surface-500 mt-1 leading-relaxed">VoiceLink pozwala placówkom być dostępnymi dokładnie w taki sposób, jakiego oczekują pacjenci.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                  Perspektywa pacjenta
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Dla tych, którzy wolą <span className="text-primary-500">napisać</span> niż zadzwonić
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  To rozwiązanie szczególnie ważne dla osób, które nie lubią rozmawiać przez telefon lub nie mają możliwości odebrania połączenia w ciągu dnia. Wielu pacjentów znacznie chętniej komunikuje się tekstowo — szybko, dyskretnie i wtedy, kiedy mają chwilę czasu.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-4 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink pozwala placówkom być dostępnymi <strong className="text-primary-950">dokładnie w taki sposób, jakiego oczekują pacjenci</strong> — bez zmuszania ich do dzwonienia, czekania na linii czy odpowiadania według sztywnego schematu.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="mt-8 rounded-2xl border border-accent-200/60 bg-accent-50/30 p-5">
                  <div className="flex items-start gap-3">
                    <BotMessageSquare className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-surface-600 leading-relaxed">
                      To <strong className="text-primary-950">nie jest</strong> zwykły system wysyłający SMS-y. To pełnoprawna AI-asystentka placówki medycznej — działająca w wiadomościach tekstowych.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── STATYSTYKI ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">
                Efektywność
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Skala, na którą recepcja <span className="text-primary-500">nie jest w stanie</span> odpowiedzieć
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(({ value, label, desc, icon: Icon }) => (
              <StaggerItem key={label}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-7 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100/80 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="text-3xl font-extrabold text-primary-500 mb-1">{value}</div>
                  <h4 className="text-sm font-semibold text-primary-950">{label}</h4>
                  <p className="mt-2 text-xs text-surface-500 leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── INTEGRACJE ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">
                  Jeden system
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Ten sam mózg, <span className="text-primary-500">inny kanał</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Chatbot VoiceLink jest podłączony do dokładnie tego samego systemu, bazy danych i logiki co asystent głosowy. Zmienia się tylko kanał komunikacji — jakość i możliwości pozostają identyczne.
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
                  Wszystkie integracje <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-400 shadow-[var(--shadow-glow-primary)] mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-primary-950 font-semibold">Jeden system AI</h4>
                  <p className="text-xs text-surface-400 mt-1">Wspólna baza wiedzy i logika</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-primary-200/60 bg-primary-50/40 p-4 text-center">
                    <Phone className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                    <div className="text-xs font-semibold text-primary-950">Głos</div>
                    <div className="text-[10px] text-surface-400 mt-0.5">Rozmowy telefoniczne</div>
                  </div>
                  <div className="rounded-xl border border-accent-200/60 bg-accent-50/40 p-4 text-center">
                    <MessageSquare className="w-5 h-5 text-accent-500 mx-auto mb-2" />
                    <div className="text-xs font-semibold text-primary-950">SMS</div>
                    <div className="text-[10px] text-surface-400 mt-0.5">Wiadomości tekstowe</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-surface-500">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
                  Synchronizacja w czasie rzeczywistym
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <RelatedServices currentHref="/uslugi/chatbot-voicelink" />

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-100/80 mb-6">
                <MessageCircle className="w-7 h-7 text-accent-500" />
              </div>
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Daj pacjentom możliwość <span className="text-primary-500">pisania</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Asystentka SMS VoiceLink obsłuży setki konwersacji jednocześnie, 24/7, bez angażowania recepcji — w naturalnym, ludzkim języku.
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
