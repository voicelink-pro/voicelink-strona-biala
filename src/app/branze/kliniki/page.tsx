"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Star,
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  CalendarCheck,
  Headphones,
  ArrowDown,
  Check,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

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

const problems = [
  { title: "Utrata potencjalnych pacjentów", desc: "Nieodebrane połączenia to utracone leady. Pacjent premium nie czeka — dzwoni do konkurencji.", icon: Phone, color: "red" as const },
  { title: "Niespójny poziom obsługi", desc: "Różne osoby na recepcji oznaczają różną jakość. Klinika premium wymaga premium obsługi przy każdym kontakcie.", icon: Star, color: "red" as const },
  { title: "Wysokie koszty recepcji", desc: "Rozbudowany zespół recepcyjny to kosztowne etaty, szkolenia i rotacja pracowników.", icon: TrendingUp, color: "red" as const },
  { title: "Brak skalowalności", desc: "W sezonie szczytu i przy kampaniach marketingowych recepcja się zapycha. Nie da się szybko zatrudnić i wyszkolić nowych osób.", icon: Users, color: "red" as const },
];

const solutions = [
  { title: "Premium obsługa każdego połączenia", desc: "AI zapewnia identycznie profesjonalny poziom rozmowy — niezależnie od pory dnia czy obciążenia.", icon: Sparkles, color: "emerald" as const },
  { title: "Skalowalność bez limitów", desc: "10 czy 1000 połączeń dziennie — AI obsłuży każde bez dodatkowych kosztów i etatów.", icon: TrendingUp, color: "emerald" as const },
  { title: "Integracja z systemami kliniki", desc: "Połączenie z Twoim kalendarzem, CRM i systemami rezerwacyjnymi. Wizyty lądują automatycznie w grafiku.", icon: CalendarCheck, color: "emerald" as const },
  { title: "Pełna kontrola i raporty", desc: "Transkrypcje, statystyki, trendy — dokładne dane o każdym połączeniu w panelu VoiceLink Center.", icon: BarChart3, color: "emerald" as const },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  red: { bg: "bg-red-100/80", text: "text-red-500" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
};

const premiumFeatures = [
  "Ton głosu dopasowany do wizerunku kliniki",
  "Obsługa VIP pacjentów z priorytetem",
  "Wielojęzyczna obsługa dla zagranicznych pacjentów",
  "Automatyczne follow-up po zabiegach",
  "Poufność i dyskrecja na najwyższym poziomie",
  "Dedykowana konfiguracja scenariuszy rozmów",
];

const dayStats = [
  { label: "Satysfakcja pacjentów", value: "95%", fill: 95, color: "bg-emerald-500" },
  { label: "Połączenia obsłużone", value: "100%", fill: 100, color: "bg-primary-500" },
  { label: "Średni czas odpowiedzi", value: "<30s", fill: 15, color: "bg-accent-500" },
  { label: "Konwersja leadów", value: "3x więcej", fill: 85, color: "bg-amber-500" },
];

export default function KlinikiPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Branże", href: "/branze" }, { name: "Kliniki prywatne", href: "/branze/kliniki" }]} />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Dla klinik prywatnych</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Kliniki <span className="text-primary-500">prywatne</span>
                <br /><span className="text-surface-400 text-3xl sm:text-4xl font-light">Premium obsługa na miarę Twojej marki</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl leading-relaxed">
                Pacjenci klinik prywatnych oczekują obsługi premium — natychmiastowej, profesjonalnej, dyskretnej. <span className="text-primary-950 font-medium">VoiceLink dostarcza ją przy każdym połączeniu</span>, budując wizerunek Twojej marki.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link href="/demo"><Button size="lg"><Phone className="h-4 w-4" /> Poproś o demo</Button></Link>
                <a href="#problemy"><Button variant="outline" size="lg">Poznaj rozwiązanie <ArrowDown className="h-4 w-4" /></Button></a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* PROBLEMY */}
      <section id="problemy" className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-4">Wyzwania</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Wyzwania klinik <span className="text-red-500">prywatnych</span>
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">Klinika premium wymaga premium obsługi. Ale utrzymanie tego poziomu na dużą skalę jest kosztowne.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 gap-5">
            {problems.map(({ title, desc, icon: Icon, color }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                  <div className={`w-12 h-12 rounded-xl ${colorMap[color].bg} flex items-center justify-center mb-5`}>
                    <Icon className={`h-6 w-6 ${colorMap[color].text}`} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-primary-950 mb-2">{title}</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ROZWIĄZANIA */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-4">Rozwiązanie</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                AI recepcja <span className="text-primary-500">na poziomie premium</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 gap-5">
            {solutions.map(({ title, desc, icon: Icon, color }) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent">
                  <div className={`w-12 h-12 rounded-xl ${colorMap[color].bg} flex items-center justify-center mb-5`}>
                    <Icon className={`h-6 w-6 ${colorMap[color].text}`} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-primary-950 mb-2">{title}</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* PREMIUM FEATURES + STATS */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Premium AI</span>
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Dlaczego kliniki wybierają VoiceLink</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 text-[17px] text-surface-600 leading-relaxed">
                  VoiceLink to nie gotowy voicebot. To dedykowana infrastruktura AI konfigurowana pod Twoją klinikę — ton głosu, scenariusze, integracje.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <ul className="mt-8 space-y-3">
                  {premiumFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-surface-600">{f}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <h3 className="font-semibold text-primary-950 mb-6 text-center">Efekty w klinikach prywatnych</h3>
                <div className="space-y-5">
                  {dayStats.map((s) => <AnimatedBar key={s.label} {...s} />)}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* POWIĄZANE USŁUGI */}
      <section className="py-16 md:py-24 bg-surface-50">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Powiązane usługi</h2>
              <p className="mt-4 text-surface-500">Sprawdź co jeszcze VoiceLink może zrobić dla Twojej kliniki.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "Recepcjonistka AI", desc: "Wirtualna recepcjonistka obsługująca połączenia 24/7.", href: "/uslugi/recepcjonistka-ai", icon: Headphones },
              { title: "Rezerwacje online", desc: "Automatyczne umawianie wizyt zintegrowane z kalendarzem.", href: "/uslugi/rezerwacje-online", icon: CalendarCheck },
              { title: "Panel VoiceLink Center", desc: "Analityka, transkrypcje i zarządzanie w jednym miejscu.", href: "/uslugi/panel-voicelink-center", icon: BarChart3 },
            ].map((s) => (
              <StaggerItem key={s.href}>
                <Link href={s.href} className="block rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all hover:shadow-[var(--shadow-card-hover)] hover:border-primary-200 group">
                  <s.icon className="h-8 w-8 text-primary-500 mb-4" />
                  <h3 className="text-[15px] font-semibold text-primary-950 mb-2 group-hover:text-primary-500 transition-colors">{s.title}</h3>
                  <p className="text-sm text-surface-500">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center text-sm text-primary-500 font-medium">
                    Dowiedz się więcej <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Podnieś standard obsługi. <span className="text-primary-500">Zyskaj więcej pacjentów.</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Sprawdź jak VoiceLink może usprawnić obsługę w Twojej klinice. Bezpłatne demo — indywidualnie pod Twoje potrzeby.
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
