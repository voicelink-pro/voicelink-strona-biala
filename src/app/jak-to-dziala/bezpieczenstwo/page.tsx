"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  CheckCircle,
  Database,
  Eye,
  FileCheck,
  Fingerprint,
  Globe,
  KeyRound,
  Lock,
  Monitor,
  RefreshCw,
  Send,
  Server,
  Shield,
  ShieldCheck,
  Timer,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { generateServiceSchema } from "@/lib/schema";

/* ─── Static data ─── */

const heroBadges = [
  "AES-256",
  "TLS 1.3",
  "SOC 2 Type II",
  "ISO 27001",
  "RODO / GDPR",
  "AI Act Ready",
];

const coreFeatures = [
  {
    icon: Lock,
    title: "Szyfrowanie end-to-end",
    desc: "AES-256 w spoczynku, TLS 1.3 w transmisji. Każdy bajt danych chroniony na każdym etapie — od telefonu pacjenta po system placówki.",
    color: "primary" as const,
  },
  {
    icon: Server,
    title: "Infrastruktura w Unii Europejskiej",
    desc: "Serwery w centrach danych na terenie UE. Brak transferu danych poza Europejski Obszar Gospodarczy. Pełna kontrola nad lokalizacją danych.",
    color: "emerald" as const,
  },
  {
    icon: Shield,
    title: "Pełna zgodność z RODO",
    desc: "Umowy DPA, minimalizacja danych, prawo do usunięcia, ograniczenie celu przetwarzania. Dane przetwarzane wyłącznie w zakresie niezbędnym do realizacji usługi.",
    color: "accent" as const,
  },
  {
    icon: FileCheck,
    title: "Gotowość na AI Act",
    desc: "System projektowany z uwzględnieniem wymogów europejskiego AI Act — nadzór człowieka, transparentność, kontrola ryzyka, bezpieczeństwo danych.",
    color: "amber" as const,
  },
  {
    icon: Eye,
    title: "Anonimizacja transkrypcji",
    desc: "Dane identyfikujące pacjentów są automatycznie usuwane lub maskowane przed udostępnieniem w Panelu VoiceLink. Zero ryzyka przypadkowego ujawnienia.",
    color: "primary" as const,
  },
  {
    icon: Timer,
    title: "Minimalizacja przechowywania",
    desc: "Dane nie są przechowywane w pamięci długoterminowej przez asystentów. Wykorzystywane wyłącznie w kontekście bieżącej rozmowy.",
    color: "emerald" as const,
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: "bg-primary-100/80", text: "text-primary-500", border: "border-primary-200/60" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600", border: "border-emerald-200/60" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500", border: "border-accent-200/60" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600", border: "border-amber-200/60" },
};

const privacyPrinciples = [
  { icon: Database, title: "Privacy by Design", desc: "Ochrona danych uwzględniona już na etapie projektowania systemu i konfiguracji usług." },
  { icon: Fingerprint, title: "Privacy by Default", desc: "Domyślne ustawienia zawsze gwarantują najwyższy poziom ochrony prywatności." },
  { icon: KeyRound, title: "Kontrola uprawnień", desc: "Dostęp do danych ograniczony mechanizmami autoryzacji i kluczami API." },
  { icon: RefreshCw, title: "Separacja środowisk", desc: "Izolacja danych pomiędzy placówkami. Twoje dane nigdy nie mieszają się z innymi." },
];

const aiActPoints = [
  "Mechanizmy kontroli i ograniczania ryzyka",
  "Nadzór człowieka nad działaniem AI",
  "Transparentne informowanie o wykorzystaniu AI",
  "Minimalizacja zakresu przetwarzanych danych",
  "Monitoring poprawności działania asystentów",
  "Zabezpieczenia przed nieautoryzowanym dostępem",
];

const certifications = [
  { name: "SOC 2 Type II", desc: "Audyt bezpieczeństwa, dostępności i poufności danych", icon: BadgeCheck },
  { name: "ISO 27001", desc: "Międzynarodowy standard zarządzania bezpieczeństwem informacji", icon: ShieldCheck },
  { name: "GDPR / RODO", desc: "Pełna zgodność z europejskimi przepisami ochrony danych", icon: Globe },
  { name: "AI Act Ready", desc: "Zgodność z wymaganiami europejskiego aktu o sztucznej inteligencji", icon: Brain },
];

const commitments = [
  { icon: CheckCircle, text: "Dane pacjentów NIE są używane do trenowania publicznych modeli AI" },
  { icon: CheckCircle, text: "System NIE podejmuje autonomicznych decyzji wywołujących skutki prawne" },
  { icon: CheckCircle, text: "AI NIE zastępuje personelu medycznego w decyzjach klinicznych" },
  { icon: CheckCircle, text: "Dane NIE są udostępniane podmiotom trzecim bez podstawy prawnej" },
];

/* ─── Page ─── */

export default function BezpieczenstwoPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Jak to działa", href: "/jak-to-dziala" },
          { name: "Bezpieczeństwo", href: "/jak-to-dziala/bezpieczenstwo" },
        ]}
      />
      <JsonLd
        data={generateServiceSchema({
          name: "Bezpieczeństwo danych VoiceLink",
          description:
            "Szyfrowanie AES-256, TLS 1.3, serwery w UE, RODO, AI Act, anonimizacja transkrypcji, privacy by design.",
          url: "/jak-to-dziala/bezpieczenstwo",
        })}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
                Bezpieczeństwo
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Twoje dane są <span className="text-primary-500">bezpieczne</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed">
                W VoiceLink bezpieczeństwo danych oraz poufność komunikacji to fundament całego rozwiązania. Systemy zaprojektowane tak, aby <span className="text-primary-950 font-medium">minimalizować ryzyko</span> i zapewniać <span className="text-primary-950 font-medium">pełną zgodność z RODO i AI Act</span>.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap justify-center gap-2.5">
                {heroBadges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 rounded-full border border-surface-200/80 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-surface-600 shadow-sm"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    {badge}
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-wrap justify-center gap-3.5">
                <a href="#szczegoly">
                  <Button size="lg">
                    <Shield className="h-4 w-4" /> Poznaj szczegóły
                  </Button>
                </a>
                <Link href="/demo">
                  <Button variant="outline" size="lg">
                    Umów konsultację <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── KLUCZOWE ZABEZPIECZENIA + ZDJĘCIE ── */}
      <section id="szczegoly" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">
                  Zabezpieczenia
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Ochrona na <span className="text-primary-500">każdym etapie</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Asystenci głosowi VoiceLink działają w oparciu o nowoczesną infrastrukturę chmurową spełniającą najwyższe standardy bezpieczeństwa. Komunikacja pomiędzy systemami jest szyfrowana TLS/SSL — dane chronione od momentu wypowiedzenia słowa do zapisu w systemie placówki.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 space-y-4">
                  {coreFeatures.slice(0, 3).map(({ icon: Icon, title, desc, color }) => {
                    const c = colorMap[color];
                    return (
                      <div key={title} className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-5 h-5 ${c.text}`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-primary-950">{title}</h4>
                          <p className="text-sm text-surface-500 mt-0.5 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-accent-200/20 via-primary-200/10 to-transparent blur-2xl pointer-events-none" />
                <Image
                  src="/images/security.png"
                  alt="VoiceLink — bezpieczeństwo danych medycznych"
                  width={1600}
                  height={1600}
                  className="relative w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, min(800px, 50vw)"
                  quality={95}
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── PEŁNA SIATKA ZABEZPIECZEŃ ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                Architektura
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Zaprojektowane z myślą o <span className="text-primary-500">bezpieczeństwie</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
                Każdy element VoiceLink — od infrastruktury po interfejs — jest budowany zgodnie z zasadami privacy by design.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreFeatures.map(({ icon: Icon, title, desc, color }) => {
              const c = colorMap[color];
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

      {/* ── PRIVACY BY DESIGN ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="rounded-3xl border border-surface-200/80 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/30 p-8 sm:p-10 shadow-[var(--shadow-card)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-primary-100/40 blur-3xl pointer-events-none" />
                <div className="relative space-y-6">
                  {privacyPrinciples.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white border border-surface-200/80 shadow-sm flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-primary-950">{title}</h4>
                        <p className="text-sm text-surface-500 mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">
                  Zasady
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Privacy by Design <span className="text-primary-500">&amp; Default</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Cała architektura VoiceLink została zaprojektowana zgodnie z podejściem privacy by design oraz privacy by default. Ochrona danych jest uwzględniana od pierwszego dnia — nie jako dodatek, lecz jako fundament systemu.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-4 text-[17px] text-surface-600 leading-relaxed">
                  Obejmuje to kontrolę uprawnień, szyfrowanie danych, separację środowisk, monitorowanie bezpieczeństwa oraz ograniczanie zakresu danych do minimum niezbędnego do realizacji usługi.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="mt-8 rounded-2xl border border-emerald-200/60 bg-emerald-50/30 p-5">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-surface-600 leading-relaxed">
                      Systemy automatyzacji mogą być konfigurowane w środowiskach <strong className="text-primary-950">self-hosted</strong> — pełna kontrola nad danymi i miejscem ich przetwarzania.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── NASZE ZOBOWIĄZANIA ── */}
      <section className="py-16 md:py-24">
        <Container size="default">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white p-8 md:p-12 shadow-[var(--shadow-card)] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100/80 mb-5">
                    <UserCheck className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                    Nasze <span className="text-emerald-600">zobowiązania</span>
                  </h2>
                  <p className="mt-3 text-surface-500 max-w-xl mx-auto">
                    Jasne zasady, których się trzymamy. Bez drobnego druku.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {commitments.map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-start gap-3 rounded-xl border border-emerald-200/60 bg-emerald-50/20 p-4"
                    >
                      <Icon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-primary-950 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── AI ACT ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4">
                  Regulacje
                </span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Zgodność z <span className="text-primary-500">AI Act</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink rozwija rozwiązania zgodnie z założeniami europejskiego AI Act — pierwszego kompleksowego aktu prawnego UE regulującego wykorzystanie sztucznej inteligencji. Systemy AI w środowisku medycznym są traktowane jako rozwiązania podwyższonego ryzyka.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-4 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink wykorzystuje AI wyłącznie jako narzędzie wspierające — system <strong className="text-primary-950">nie podejmuje autonomicznych decyzji</strong> wywołujących skutki prawne wobec pacjentów ani nie zastępuje personelu medycznego w decyzjach klinicznych.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="mt-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-4">
                    Wdrożone mechanizmy zgodności
                  </div>
                  <div className="space-y-3">
                    {aiActPoints.map((point) => (
                      <div key={point} className="flex items-center gap-3">
                        <CheckCircle className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                        <span className="text-sm text-surface-600">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/60 mb-4">
                    <FileCheck className="w-8 h-8 text-amber-600" />
                  </div>
                  <h4 className="text-primary-950 font-semibold">Certyfikacje i standardy</h4>
                  <p className="text-xs text-surface-400 mt-1">Wykorzystywana infrastruktura technologiczna</p>
                </div>
                <div className="space-y-3">
                  {certifications.map(({ name, desc, icon: Icon }) => (
                    <div
                      key={name}
                      className="flex items-center gap-4 rounded-xl border border-surface-200/80 bg-surface-50/40 p-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-surface-200 shadow-sm flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary-950">{name}</div>
                        <div className="text-xs text-surface-500 mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── INTEGRACJE I BEZPIECZEŃSTWO ── */}
      <section className="py-16 md:py-24">
        <Container size="default">
          <FadeIn>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                Infrastruktura
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Bezpieczne integracje i <span className="text-primary-500">komunikacja</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500">
                Dane przesyłane pomiędzy systemami są zabezpieczone szyfrowaniem. Dostęp ograniczony poprzez mechanizmy uwierzytelniania i klucze API.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Lock, label: "Szyfrowanie TLS/SSL", desc: "Wszystkie połączenia między systemami" },
              { icon: KeyRound, label: "Klucze API", desc: "Uwierzytelnianie każdego zapytania" },
              { icon: Monitor, label: "Monitoring 24/7", desc: "Ciągły nadzór infrastruktury" },
              { icon: Users, label: "Kontrola dostępu", desc: "Wielopoziomowe role i uprawnienia" },
            ].map(({ icon: Icon, label, desc }) => (
              <StaggerItem key={label}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100/80 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-primary-950">{label}</h4>
                  <p className="mt-1.5 text-xs text-surface-500 leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div className="mt-10 rounded-2xl border border-primary-200/60 bg-primary-50/30 p-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-100/80 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary-950 mb-1">Transfer danych poza EOG</h4>
                  <p className="text-sm text-surface-600 leading-relaxed">
                    Dane mogą być przekazywane wyłącznie zaufanym podmiotom technologicznym przy zachowaniu odpowiednich zabezpieczeń prawnych, w tym standardowych klauzul umownych (SCC) dla transferów poza Europejski Obszar Gospodarczy.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100/80 mb-6">
                <Shield className="w-7 h-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Bezpieczeństwo to nasz <span className="text-primary-500">priorytet</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Masz pytania o ochronę danych, zgodność z RODO lub AI Act? Chętnie wyjaśnimy wszystko bez technicznego żargonu.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/demo">
                  <Button size="lg">
                    Umów konsultację <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/kontakt">
                  <Button variant="outline" size="lg">
                    <Send className="h-4 w-4" /> Napisz do nas
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
