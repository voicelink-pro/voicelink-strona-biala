"use client";

import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Clock,
  Users,
  CalendarCheck,
  MessageSquare,
  Database,
  MessageCircle,
  Monitor,
  AlertCircle,
  UserCircle,
  Globe,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Data ─── */

const hours = ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"];
const days = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

const activeCalls = [
  { phone: "+48 601 *** 234", task: "Rezerwacja wizyty - 1:42", color: "emerald" as const },
  { phone: "+48 512 *** 891", task: "Pytanie o godziny - 0:38", color: "accent" as const },
  { phone: "+48 798 *** 456", task: "Zmiana terminu - 0:15", color: "primary" as const },
];

const chatMessages = [
  { side: "right" as const, text: "Dzień dobry, chciałabym umówić się do internisty na przyszły tydzień." },
  { side: "left" as const, text: "Dzień dobry! Oczywiście, z przyjemnością pomogę. Dr Nowak ma wolne terminy we wtorek o 9:00 i w czwartek o 14:30. Który termin Pani bardziej odpowiada?" },
  { side: "right" as const, text: "Czwartek o 14:30 byłby idealny." },
  { side: "left" as const, text: "Świetnie! Rezerwuję wizytę u dr. Nowaka na czwartek, 14:30. Czy mogę prosić o potwierdzenie Pani imienia i nazwiska?" },
];

const knowledgeGrid = [
  { label: "Godziny", color: "amber" as const, icon: Clock },
  { label: "Usługi", color: "accent" as const, icon: Monitor },
  { label: "Adres", color: "primary" as const, icon: Database },
  { label: "Cennik", color: "emerald" as const, icon: CalendarCheck },
];

const escalationSteps = [
  { label: "Asystent AI", sub: "Prowadzi rozmowę", icon: Monitor, color: "accent" as const },
  { label: "Wykrycie nietypowej sytuacji", sub: "Analiza kontekstu rozmowy", icon: AlertCircle, color: "amber" as const },
  { label: "Recepcja", sub: "Płynne przekazanie rozmowy", icon: UserCircle, color: "emerald" as const },
];

const languages = [
  { code: "PL", name: "Polski", bg: "bg-red-100/80", text: "text-red-600", border: "border-red-200" },
  { code: "EN", name: "English", bg: "bg-blue-100/80", text: "text-blue-600", border: "border-blue-200" },
  { code: "DE", name: "Deutsch", bg: "bg-amber-100/80", text: "text-amber-600", border: "border-amber-200" },
  { code: "UA", name: "Ukraińska", bg: "bg-sky-100/80", text: "text-sky-600", border: "border-sky-200" },
];

const colorMap: Record<string, { bg: string; text: string; bgSoft: string }> = {
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600", bgSoft: "bg-emerald-50/60" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500", bgSoft: "bg-accent-50/60" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500", bgSoft: "bg-primary-50/60" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600", bgSoft: "bg-amber-50/60" },
  pink: { bg: "bg-pink-100/80", text: "text-pink-500", bgSoft: "bg-pink-50/60" },
};

function Check({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
      <span className="text-surface-600 text-sm">{text}</span>
    </div>
  );
}

/* ─── Page ─── */

export default function FunkcjePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Jak to działa", href: "/jak-to-dziala" }, { name: "Funkcje", href: "/funkcje" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Funkcje</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Co potrafi <span className="text-primary-500">nasz asystent AI</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Pełna obsługa telefoniczna placówki medycznej — od odebrania połączenia po wysłanie SMS z potwierdzeniem wizyty.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8">
                <Link href="/demo"><Button size="lg"><Phone className="h-4 w-4" /> Poproś o demo</Button></Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── FEATURE 1: 24/7 ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-pink-500 mb-4">Dostępność</span>
                <h2 id="dostepnosc-247" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Odbiera każde połączenie <span className="text-primary-500">o każdej porze</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed">Asystent AI odbiera telefony 24/7 — bez urlopów, zwolnień i przerw. Pacjent nigdy nie usłyszy sygnału zajętości ani nie trafi na automatyczną sekretarkę.</p>
                <div className="mt-8 space-y-4">
                  <Check text="Bez przerw i dni wolnych" />
                  <Check text="Natychmiastowe odebranie połączenia" />
                  <Check text="Zero nieodebranych telefonów" />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)]">
                <h4 className="text-primary-950 font-semibold text-sm mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-500" /> Dostępność — 24h / 7 dni
                </h4>
                <div className="grid grid-cols-12 gap-1 mb-3">
                  {hours.map((h) => (
                    <div key={h} className="rounded bg-emerald-100/60 border border-emerald-200/50 p-1 text-center">
                      <span className="text-[9px] text-emerald-600 font-medium">{h}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {days.map((d) => (
                    <div key={d} className="rounded bg-emerald-100/60 border border-emerald-200/50 p-1.5 text-center">
                      <span className="text-[9px] text-emerald-600 font-medium">{d}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-surface-400">Pełna dostępność 0:00 — 24:00</span>
                  <span className="text-[10px] text-emerald-600 font-medium px-2 py-0.5 rounded-full bg-emerald-100/80">ZAWSZE DOSTĘPNY</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── FEATURE 2: Wiele rozmow ── */}
      <section id="wielokanalowosc" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)] order-2 lg:order-1">
                <h4 className="text-primary-950 font-semibold text-sm mb-5">Aktywne rozmowy</h4>
                <div className="space-y-3">
                  {activeCalls.map((call) => {
                    const c = colorMap[call.color];
                    return (
                      <div key={call.phone} className={`flex items-center gap-3 p-3 rounded-xl ${c.bgSoft} border border-surface-200/60`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${c.text.replace("text-", "bg-")} animate-pulse`} />
                        <div className="flex-1">
                          <div className="text-primary-950 text-xs font-medium">{call.phone}</div>
                          <div className="text-[10px] text-surface-400">{call.task}</div>
                        </div>
                        <span className={`text-[10px] ${c.text} font-medium px-2 py-0.5 rounded-full ${c.bg}`}>W toku</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-surface-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-surface-400">Pojemność: nieograniczona</span>
                  <span className="text-[10px] text-primary-950 font-medium">3 jednoczesne rozmowy</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="order-1 lg:order-2">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Skalowalność</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Wiele rozmów <span className="text-primary-500">w tym samym czasie</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed">AI nie ma ograniczeń pojemności — prowadzi kilka rozmów jednocześnie. Koniec z kolejkami i sygnałem zajętości.</p>
                <div className="mt-8 space-y-4">
                  <Check text="Bez ograniczeń pojemności" />
                  <Check text="Koniec z kolejkami telefonicznymi" />
                  <Check text="Każdy pacjent obsłużony natychmiast" />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── FEATURE 3: Rejestracja wizyt ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Rezerwacje</span>
                <h2 id="rezerwacje-ai" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Umawia wizyty <span className="text-primary-500">w czasie rozmowy</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed">Asystent prowadzi naturalną rozmowę, rozpoznaje potrzeby pacjenta i rezerwuje wizytę bezpośrednio w systemie medycznym placówki.</p>
                <div className="mt-8 space-y-4">
                  <Check text="Rezerwacja w systemie medycznym" />
                  <Check text="Dobór lekarza i terminu" />
                  <Check text="Inteligentne zbieranie danych pacjenta" />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-primary-950 font-semibold text-sm">Nowa rezerwacja</h4>
                  <span className="text-[10px] text-emerald-600 font-semibold px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200">Zarezerwowano</span>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Anna Kowalska", sub: "Pacjentka", icon: Users, color: "accent" as const },
                    { name: "dr Tomasz Nowak", sub: "Internista", icon: UserCircle, color: "primary" as const },
                    { name: "14.02.2026 — 10:30", sub: "Piątek", icon: CalendarCheck, color: "amber" as const },
                  ].map((item) => {
                    const c = colorMap[item.color];
                    return (
                      <div key={item.name} className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                          <item.icon className={`w-5 h-5 ${c.text}`} />
                        </div>
                        <div>
                          <div className="text-primary-950 text-sm font-medium">{item.name}</div>
                          <div className="text-[10px] text-surface-400">{item.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── FEATURE 4: SMS ── */}
      <section id="sms" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)] order-2 lg:order-1">
                <div className="flex items-center gap-2 mb-5">
                  <MessageSquare className="w-5 h-5 text-primary-500" />
                  <h4 className="text-primary-950 font-semibold text-sm">Potwierdzenie SMS</h4>
                </div>
                <div className="bg-surface-50 rounded-2xl p-5 border border-surface-200/60">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100/80 flex items-center justify-center">
                      <span className="text-primary-500 text-[10px] font-bold">VL</span>
                    </div>
                    <div><div className="text-primary-950 text-xs font-medium">VoiceLink</div><div className="text-[9px] text-surface-400">Teraz</div></div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-surface-200/60">
                    <p className="text-surface-600 text-xs leading-relaxed">
                      Potwierdzenie wizyty:<br /><br />
                      <span className="text-primary-950 font-medium">dr Tomasz Nowak</span><br />
                      14.02.2026, godz. 10:30<br />
                      ul. Zdrowia 12, Warszawa<br /><br />
                      Aby odwołać, odpowiedz ANULUJ.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] text-surface-400">Wysłano automatycznie po rozmowie</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="order-1 lg:order-2">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Potwierdzenia</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Wysyła SMS <span className="text-primary-500">z potwierdzeniem</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed">Po zakończeniu rozmowy pacjent automatycznie otrzymuje SMS z datą, godziną i adresem wizyty. Przed wizytą wysyłane są przypomnienia redukujące no-show.</p>
                <div className="mt-8 space-y-4">
                  <Check text="SMS natychmiast po rezerwacji" />
                  <Check text="Przypomnienia przed wizytą" />
                  <Check text="Redukcja no-show o 78%" />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── FEATURE 5: Baza wiedzy ── */}
      <section id="baza-wiedzy" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4">Baza wiedzy</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Zawsze aktualne <span className="text-primary-500">informacje</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed">AI udziela wyłącznie zweryfikowanych odpowiedzi na podstawie danych z systemu placówki i bazy wiedzy. Żadnych pomyłek ani zapomnianych szczegółów.</p>
                <div className="mt-8 space-y-4">
                  <Check text="Godziny otwarcia i adres" />
                  <Check text="Dostępne usługi i specjalizacje" />
                  <Check text="Cennik i informacje o dojeździe" />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)]">
                <h4 className="text-primary-950 font-semibold text-sm mb-5 flex items-center gap-2">
                  <Database className="w-5 h-5 text-amber-500" /> Baza wiedzy placówki
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {knowledgeGrid.map(({ label, color, icon: Icon }) => {
                    const c = colorMap[color];
                    return (
                      <div key={label} className={`p-4 rounded-xl ${c.bgSoft} border border-surface-200/60 text-center`}>
                        <Icon className={`w-7 h-7 ${c.text} mx-auto mb-2`} />
                        <span className="text-primary-950 text-xs font-medium">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── FEATURE 6: Naturalny kontakt ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)] order-2 lg:order-1">
                <h4 className="text-primary-950 font-semibold text-sm mb-5 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-accent-500" /> Fragment rozmowy
                </h4>
                <div className="space-y-3">
                  {chatMessages.map((msg, i) =>
                    msg.side === "right" ? (
                      <div key={i} className="rounded-2xl rounded-br-sm p-3 ml-8 bg-primary-50 border border-primary-200/60">
                        <p className="text-xs text-surface-600">{msg.text}</p>
                      </div>
                    ) : (
                      <div key={i} className="rounded-2xl rounded-bl-sm p-3 mr-8 bg-accent-50/60 border border-accent-200/60">
                        <p className="text-xs text-surface-600">{msg.text}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="order-1 lg:order-2">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Jakość</span>
                <h2 id="naturalny-glos" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Rozmawia <span className="text-primary-500">jak człowiek</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed">Asystent prowadzi naturalny dialog z pauzami, kontekstem i empatią. Pacjent słyszy profesjonalną, uprzejmą rozmowę — nie robota.</p>
                <div className="mt-8 space-y-4">
                  <Check text="Naturalny dialog z kontekstem" />
                  <Check text="Profesjonalny i uprzejmy ton" />
                  <Check text="Zrozumienie intencji pacjenta" />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── FEATURE 7: Przekierowanie ── */}
      <section id="przekierowanie" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">Eskalacja</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Płynne przekierowanie <span className="text-primary-500">do pracownika</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed">W sytuacjach nietypowych lub wymagających interwencji człowieka, rozmowa jest płynnie przekazana pracownikowi recepcji. Pacjent nigdy nie zostaje bez pomocy.</p>
                <div className="mt-8 space-y-4">
                  <Check text="Automatyczna detekcja nietypowych sytuacji" />
                  <Check text="Płynne połączenie z recepcją" />
                  <Check text="Pacjent zawsze otrzymuje pomoc" />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)]">
                <h4 className="text-primary-950 font-semibold text-sm mb-6">Proces eskalacji</h4>
                <div className="flex flex-col items-center gap-3">
                  {escalationSteps.map((step, i) => {
                    const c = colorMap[step.color];
                    const Icon = step.icon;
                    return (
                      <div key={step.label}>
                        <div className={`w-full p-4 rounded-xl ${c.bgSoft} border border-surface-200/60 flex items-center gap-3`}>
                          <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${c.text}`} />
                          </div>
                          <div>
                            <div className="text-primary-950 text-xs font-medium">{step.label}</div>
                            <div className="text-[10px] text-surface-400">{step.sub}</div>
                          </div>
                        </div>
                        {i < escalationSteps.length - 1 && (
                          <div className="flex justify-center py-1">
                            <svg className="w-5 h-5 text-surface-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── FEATURE 8: Wielojezycznosc ── */}
      <section id="wielojezycznosc" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)] order-2 lg:order-1">
                <h4 className="text-primary-950 font-semibold text-sm mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" /> Obsługiwane języki
                </h4>
                <div className="flex flex-wrap gap-3 justify-center">
                  {languages.map((lang) => (
                    <div key={lang.code} className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm ${lang.bg} border ${lang.border} ${lang.text}`}>
                      <span className="text-xs font-bold uppercase">{lang.code}</span> {lang.name}
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 text-center">
                  <p className="text-xs text-surface-500"><span className="text-blue-600 font-medium">Auto-detect:</span> AI automatycznie rozpoznaje język rozmówcy i przełącza się w czasie rzeczywistym.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="order-1 lg:order-2">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4">Języki</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Mówi w wielu <span className="text-primary-500">językach</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed">Asystent rozpoznaje język rozmówcy i automatycznie przełącza się na odpowiedni język. Pomoc dla pacjentów spoza Polski bez dodatkowych kosztów.</p>
                <div className="mt-8 space-y-4">
                  <Check text="Automatyczne rozpoznawanie języka" />
                  <Check text="Obsługa w kilku językach" />
                  <Check text="Pomoc dla pacjentów zagranicznych" />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Sprawdź możliwości <span className="text-primary-500">w Twojej placówce</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">Umów bezpłatną prezentację i zobacz jak asystent AI obsługuje połączenia Twojej placówki.</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo"><Button size="lg">Poproś o demo <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link href="/kalkulator-oszczednosci"><Button variant="outline" size="lg">Oblicz oszczędności</Button></Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
