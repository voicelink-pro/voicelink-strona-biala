"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Link2,
  MessageSquare,
  Plus,
  Shield,
  Lock,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Data ─── */

const systems = [
  {
    name: "KS SOMED",
    logo: "/images/somed.jpeg",
    desc: "VoiceLink łączy się z systemem rezerwacyjnym KS SOMED — AI sprawdza dostępność terminów i tworzy rezerwację bezpośrednio w systemie.",
    features: ["Tworzenie rezerwacji przez AI", "Sprawdzanie dostępności terminów", "Odczyt grafików lekarzy"],
  },
  {
    name: "KS PPS",
    logo: "/images/pps.webp",
    logoClass: "scale-125",
    desc: "VoiceLink integruje się z systemem rezerwacyjnym KS PPS — AI umawia pacjentów i sprawdza wolne terminy u wybranych specjalistów.",
    features: ["Tworzenie rezerwacji przez AI", "Sprawdzanie dostępności terminów", "Odczyt grafików lekarzy"],
  },
  {
    name: "MediPorta",
    logo: "/images/mediporta.jpeg",
    desc: "VoiceLink łączy się z systemem rezerwacyjnym MediPorta — pacjent dzwoni, AI sprawdza dostępność i rezerwuje wizytę w systemie.",
    features: ["Tworzenie rezerwacji przez AI", "Sprawdzanie dostępności terminów", "Odczyt grafików lekarzy"],
  },
  {
    name: "Serum",
    logo: "/images/serum.ico",
    lightBg: true,
    desc: "VoiceLink integruje się z systemem rezerwacyjnym Serum — AI zarządza rezerwacjami i sprawdza dostępność specjalistów.",
    features: ["Tworzenie rezerwacji przez AI", "Sprawdzanie dostępności terminów", "Odczyt grafików lekarzy"],
  },
  {
    name: "MyDrEDM",
    logo: "/images/dredm.png",
    desc: "VoiceLink łączy się z systemem rezerwacyjnym MyDrEDM — AI tworzy rezerwację i sprawdza kalendarz dostępności lekarzy.",
    features: ["Tworzenie rezerwacji przez AI", "Sprawdzanie dostępności terminów", "Odczyt grafików lekarzy"],
  },
];

const integrationSteps = [
  { num: "1", title: "Analiza systemu", desc: "Sprawdzamy jaki system używasz i jakie dane musimy synchronizować.", color: "accent" as const },
  { num: "2", title: "Konfiguracja połączenia", desc: "Łączymy VoiceLink z Twoim systemem medycznym przez bezpieczne API.", color: "primary" as const },
  { num: "3", title: "Testy i walidacja", desc: "Testujemy przepływ danych, rezerwacje i synchronizację na środowisku testowym.", color: "emerald" as const },
  { num: "4", title: "Uruchomienie", desc: "Włączamy produkcyjne połączenie. Monitorujemy pierwsze dni i optymalizujemy.", color: "amber" as const },
];

const securityChecks = [
  "Certyfikacja OSOZ API — zgodność z Ogólnopolskim Systemem Ochrony Zdrowia",
  "Szyfrowanie danych wrażliwych AES-256 — PESEL, dane medyczne i osobowe w pełni chronione",
  "Szyfrowane połączenia TLS 1.3 — cała komunikacja z systemami medycznymi zabezpieczona",
  "Zgodność z RODO i przepisami ochrony danych medycznych",
  "Serwery w Unii Europejskiej — dane nigdy nie opuszczają EU",
  "Minimalizacja danych — zbieramy tylko to, co niezbędne do obsługi pacjenta",
  "Regularne audyty bezpieczeństwa i testy penetracyjne",
];

const colorMap: Record<string, { bg: string; text: string }> = {
  accent: { bg: "bg-accent-100/80", text: "text-accent-500" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600" },
};

/* ─── Page ─── */

export default function IntegracjePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Jak to działa", href: "/jak-to-dziala" }, { name: "Integracje", href: "/integracje" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Integracje</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Łączymy się z <span className="text-primary-500">Twoim systemem</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed">
                VoiceLink integruje się z popularnymi systemami medycznymi. <span className="text-primary-950 font-medium">Bez zmiany oprogramowania</span> — dodajemy warstwę AI do tego, czego już używasz.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8">
                <Link href="/kontakt"><Button size="lg"><MessageSquare className="h-4 w-4" /> Zapytaj o integrację z Twoim systemem</Button></Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── SYSTEMY MEDYCZNE ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Wspierane systemy</span>
              <h2 id="systemy" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Systemy, z którymi <span className="text-primary-500">współpracujemy</span>
              </h2>
              <p className="mt-4 text-surface-500 text-lg max-w-2xl mx-auto">Integrujemy się z wiodącymi systemami medycznymi w Polsce. Twoja placówka działa dalej na swoim oprogramowaniu — VoiceLink automatycznie synchronizuje dane.</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {systems.map((sys) => (
              <StaggerItem key={sys.name}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-8 h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className="flex items-center gap-5 mb-6">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-surface-200/60 ${sys.lightBg ? "bg-white" : "bg-surface-50"}`}>
                      <Image src={sys.logo} alt={`${sys.name} logo`} width={80} height={80} quality={90} className={`object-contain ${sys.lightBg ? "p-2.5" : ""} ${sys.logoClass ?? ""}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-950">{sys.name}</h3>
                      <p className="text-surface-400 text-xs mt-1">System medyczny</p>
                    </div>
                  </div>
                  <p className="text-surface-500 text-sm leading-relaxed mb-5">{sys.desc}</p>
                  <div className="space-y-2.5">
                    {sys.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-surface-600 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}

            <StaggerItem>
              <div className="rounded-2xl border-2 border-dashed border-primary-200 bg-white p-8 flex flex-col items-center justify-center text-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary-100/80 flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-primary-950 mb-2">Twój system?</h3>
                <p className="text-surface-500 text-sm leading-relaxed mb-4">Korzystasz z innego oprogramowania? Skontaktuj się — sprawdzimy możliwość integracji.</p>
                <Link href="/kontakt" className="text-primary-500 text-sm font-medium hover:text-primary-600 transition-colors inline-flex items-center gap-1">
                  Zapytaj o integrację <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {/* ── JAK DZIALA INTEGRACJA ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Proces</span>
              <h2 id="proces-integracji" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Jak wygląda <span className="text-primary-500">integracja?</span>
              </h2>
              <p className="mt-4 text-surface-500 text-lg max-w-2xl mx-auto">Każdą integrację konfigurujemy indywidualnie pod Twój system. To nie gotowa wtyczka — to dedykowane połączenie AI z infrastrukturą Twojej placówki.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {integrationSteps.map((s) => {
              const c = colorMap[s.color];
              return (
                <StaggerItem key={s.num}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mx-auto mb-4`}>
                      <span className={`${c.text} font-bold text-lg`}>{s.num}</span>
                    </div>
                    <h4 className="text-primary-950 font-medium text-sm mb-2">{s.title}</h4>
                    <p className="text-surface-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── BEZPIECZENSTWO ── */}
      <section id="bezpieczenstwo" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">Bezpieczeństwo</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Dane pacjentów <span className="text-primary-500">pod pełną ochroną</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed mb-8">Integracja z systemami medycznymi wymaga najwyższych standardów bezpieczeństwa. VoiceLink spełnia wszystkie wymagania RODO, branżowe oraz wymogi certyfikacji OSOZ API.</p>
                <div className="space-y-4">
                  {securityChecks.map((check) => (
                    <div key={check} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-surface-600 text-sm">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-6 max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <div className="rounded-3xl border border-surface-200/80 bg-white p-8 text-center shadow-[var(--shadow-card)]">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-primary-100 flex items-center justify-center mx-auto mb-5">
                    <Shield className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-950 mb-2">OSOZ API</h3>
                  <p className="text-surface-500 text-sm leading-relaxed">Certyfikowana integracja z Ogólnopolskim Systemem Ochrony Zdrowia.</p>
                </div>
                <div className="rounded-3xl border border-surface-200/80 bg-white p-8 text-center shadow-[var(--shadow-card)]">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-100 to-pink-100 flex items-center justify-center mx-auto mb-5">
                    <Lock className="w-8 h-8 text-accent-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-950 mb-2">AES-256</h3>
                  <p className="text-surface-500 text-sm leading-relaxed">Szyfrowanie danych wrażliwych na poziomie bankowym. PESEL, dane medyczne i osobowe w pełni chronione.</p>
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
                Sprawdź integrację <span className="text-primary-500">z Twoim systemem</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-lg mx-auto">Każdą integrację budujemy indywidualnie. Powiedz nam jakiego systemu używasz — przygotujemy dedykowane połączenie AI z Twoją placówką.</p>
              <div className="mt-8">
                <Link href="/kontakt"><Button size="lg">Zapytaj o integrację <ArrowRight className="h-4 w-4" /></Button></Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
