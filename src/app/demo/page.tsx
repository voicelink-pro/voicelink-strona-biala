"use client";

import Link from "next/link";
import {
  PlayCircle,
  Phone,
  ClipboardList,
  Calculator,
  Mail,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { DemoForm } from "@/components/forms/demo-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Data ─── */

const demoFeatures = [
  { title: "Rozmowa na żywo z AI", desc: "Zadzwonimy do Ciebie z demonstracją — porozmawiasz z agentem AI skonfigurowanym pod Twoją branżę. Przekonasz się, jak naturalnie brzmi.", icon: Phone, color: "accent" as const },
  { title: "Wdrożenie klasy premium pod Twoją placówkę", desc: "Pokażemy, jak budujemy dedykowanego agenta AI pod Twój system rezerwacji, kalendarz lekarzy i specyfikę placówki. To nie gotowy produkt — to infrastruktura dopasowana do Ciebie.", icon: ClipboardList, color: "primary" as const },
  { title: "Indywidualna wycena", desc: "Otrzymasz konkretną wycenę i harmonogram wdrożenia — dostosowany do wielkości placówki, liczby integracji i złożoności scenariuszy.", icon: Calculator, color: "emerald" as const },
];

const stats = [
  { value: "15 min", label: "czas prezentacji" },
  { value: "0 zł", label: "bezpłatnie" },
  { value: "24h", label: "czas odpowiedzi" },
  { value: "0", label: "zobowiązań" },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  accent: { bg: "bg-accent-100/80", text: "text-accent-500" },
  primary: { bg: "bg-primary-100/80", text: "text-primary-500" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
};

/* ─── Page ─── */

export default function DemoPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Demo", href: "/demo" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Demo w akcji</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Zobacz VoiceLink <span className="text-primary-500">na żywo</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed">
                VoiceLink to nie gotowy voicebot — każde wdrożenie budujemy pod Twoją placówkę. Umów bezpłatną prezentację i przekonaj się, jak to działa. Bez zobowiązań.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── CO ZOBACZYSZ ── */}
      <section className="py-12 md:py-16">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Co Cię czeka</span>
              <h2 id="co-zobaczysz" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Co zobaczysz <span className="text-primary-500">na prezentacji?</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {demoFeatures.map(({ title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <h3 className="text-primary-950 font-semibold text-lg mb-2">{title}</h3>
                    <p className="text-surface-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {stats.map((s) => (
                <div key={s.label} className="text-center rounded-xl border border-surface-200/80 bg-white p-5 shadow-sm">
                  <div className="text-2xl md:text-3xl font-bold text-primary-500">{s.value}</div>
                  <div className="text-surface-400 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── FORMULARZ ── */}
      <section id="demo-form" className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Kontakt</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Umów <span className="text-primary-500">bezpłatną prezentację</span>
              </h2>
              <p className="mt-4 text-surface-500 text-lg max-w-2xl mx-auto">Wypełnij formularz, a skontaktujemy się z Tobą i pokażemy możliwości VoiceLink</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-3xl border border-surface-200/80 bg-white p-8 md:p-12 shadow-[var(--shadow-card)]">
              <DemoForm />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 text-center">
              <p className="text-surface-400 text-sm mb-4">Wolisz kontakt bezpośredni?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="tel:+48603076043" className="inline-flex items-center justify-center gap-2 text-surface-500 hover:text-primary-500 transition-colors text-sm">
                  <Phone className="w-4 h-4" /> +48 603 076 043
                </a>
                <span className="text-surface-300 hidden sm:inline">&bull;</span>
                <a href="mailto:kontakt@voicelink.pl" className="inline-flex items-center justify-center gap-2 text-surface-500 hover:text-primary-500 transition-colors text-sm">
                  <Mail className="w-4 h-4" /> kontakt@voicelink.pl
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
