"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Phone,
  Terminal,
  Users,
  Database,
  BarChart3,
  MapPin,
  Shield,
  ClipboardList,
  Lock,
  Key,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

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
        <span className="font-semibold text-primary-950">{value}</span>
      </div>
      <div className="h-3 rounded-full bg-surface-200/60 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

/* ─── Data ─── */

const scaleStats = [
  { value: "1000+", label: "Połączeń miesięcznie do obsługi" },
  { value: "10+", label: "Poradni i specjalizacji" },
  { value: "3+", label: "Lokalizacji do zarządzania" },
  { value: "24/7", label: "Oczekiwana dostępność" },
];

const automationFeatures = [
  { title: "Routing po intencjach", desc: "AI rozpoznaje cel rozmowy i kieruje do właściwej poradni — bez ręcznej triage i przekierowań.", icon: Terminal },
  { title: "Segmentacja pacjentów", desc: "Nowy pacjent, powracający, pilny, NFZ, prywatny — każda ścieżka obsługiwana osobno.", icon: Users },
  { title: "Obsługa wielu linii jednocześnie", desc: "Zero kolejek nawet przy peak hours. Każde połączenie obsłużone w czasie rzeczywistym.", icon: Phone },
  { title: "Integracja z centralnym CRM", desc: "Dane pacjenta trafiają automatycznie do systemu centralnego — bez podwójnego wprowadzania.", icon: Database },
  { title: "Raportowanie dla zarządu", desc: "Dashboardy, KPI, trendy, eksport — wszystko, czego potrzebuje zarząd do decyzji.", icon: BarChart3 },
  { title: "Multi-location", desc: "Obsługa wielu filii z jednego systemu — scentralizowany nadzór, zdecentralizowana obsługa.", icon: MapPin },
];

const analyticsStats = [
  { label: "Połączenia odebrane", value: "98.5%", fill: 98, color: "bg-emerald-500" },
  { label: "Średni czas rozmowy", value: "1m 52s", fill: 40, color: "bg-primary-500" },
  { label: "Rezerwacje przez AI", value: "340/mies.", fill: 72, color: "bg-accent-500" },
  { label: "Rozwiązane bez człowieka", value: "72%", fill: 72, color: "bg-amber-500" },
];

const securityFeatures = [
  { title: "RODO compliance", desc: "Pełna zgodność z przepisami ochrony danych osobowych w sektorze medycznym.", icon: Shield },
  { title: "Audyt trail", desc: "Pełna ścieżka audytowa — kto, kiedy i co. Wymagane w środowisku enterprise.", icon: ClipboardList },
  { title: "Szyfrowanie end-to-end", desc: "Dane przesyłane i przechowywane w sposób szyfrowany na każdym etapie.", icon: Lock },
  { title: "Kontrola uprawnień", desc: "Role-based access control — każdy użytkownik ma dostęp tylko do tego, co potrzebuje.", icon: Key },
];

/* ─── Page ─── */

export default function CentraMedycznePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Branże", href: "/branze" }, { name: "Centra medyczne", href: "/branze/centra-medyczne" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Dla placówek</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Centra <span className="text-primary-500">medyczne</span>
                <br /><span className="text-surface-400 text-3xl sm:text-4xl font-light">Duże placówki, szpitale i NZOZ</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Tysiące połączeń miesięcznie, wiele poradni i specjalizacji, kilka lokalizacji. <span className="text-primary-950 font-medium">VoiceLink skaluje się na poziomie enterprise</span> — automatyczny routing, integracje systemowe i raportowanie dla zarządu.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/demo"><Button size="lg"><Phone className="h-4 w-4" /> Poproś o demo</Button></Link>
                <a href="#skala"><Button variant="outline" size="lg">Poznaj rozwiązanie <ArrowDown className="h-4 w-4" /></Button></a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── SKALA OPERACYJNA ── */}
      <section id="skala" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Skala operacyjna</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Wymiary, które <span className="text-primary-500">rozumiemy</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">Duże placówki działają w zupełnie innej skali — VoiceLink jest na to gotowy.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {scaleStats.map(({ value, label }) => (
              <StaggerItem key={label}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-8 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">{value}</div>
                  <p className="text-surface-500 text-sm font-medium">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── AUTOMATYZACJA ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Systemowo</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Automatyzacja <span className="text-primary-500">na poziomie systemowym</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {automationFeatures.map(({ title, desc, icon: Icon }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/80 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-primary-950 mb-2">{title}</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── ANALYTICS ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Dane</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Dane i analityka w czasie rzeczywistym</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  Mierzalne metryki — od pierwszego dnia wdrożenia. Wszystko widoczne na jednym dashboardzie.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 rounded-2xl border border-primary-200/60 bg-primary-50/30 p-6">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-primary-950 font-medium mb-1">Badania branżowe</p>
                      <p className="text-xs text-surface-500 leading-relaxed">
                        Rosnące koszty administracyjne w ochronie zdrowia zwiększają presję na automatyzację. Automatyzacja ruchu telefonicznego to realne oszczędności operacyjne — <strong className="text-primary-950">mierzalne od pierwszego miesiąca</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <h4 className="font-semibold text-primary-950 mb-6 text-center">Typowe wyniki centrum medycznego</h4>
                <div className="space-y-5">
                  {analyticsStats.map((s) => <AnimatedBar key={s.label} {...s} />)}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── SECURITY ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4">Compliance</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Bezpieczeństwo <span className="text-primary-500">danych</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">W placówkach medycznych dane pacjentów wymagają najwyższych standardów ochrony.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {securityFeatures.map(({ title, desc, icon: Icon }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className="w-12 h-12 rounded-xl bg-amber-100/80 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-primary-950 mb-2">{title}</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Zautomatyzuj obsługę <span className="text-primary-500">na skalę enterprise</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Sprawdź, jak VoiceLink wspiera duże placówki medyczne, szpitale i NZOZ. Bezpłatne demo i analiza Twojej skali.
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
