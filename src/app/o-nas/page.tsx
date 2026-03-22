"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Zap,
  Settings,
  Shield,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Data ─── */

const teamMembers = [
  {
    name: "Karol",
    signature: "/images/podpisk.png",
    signatureKey: "karol",
    role: "Założyciel VoiceLink",
    badge: "Założyciel",
    color: "accent" as const,
    photo: "/images/karol.jpg",
    alt: "Karol — Założyciel VoiceLink",
    desc: "Prowadzi cały proces od pierwszego spotkania po zamknięcie wdrożenia. Odpowiada za stronę techniczną, konfigurację agenta i integracje — tak, żeby każda placówka dostała rozwiązanie",
    boldPart: "dopasowane do swoich potrzeb",
    descEnd: ".",
    tags: ["Technologia", "Wdrożenia", "Integracje", "Konfiguracja AI"],
  },
  {
    name: "Jan",
    signature: "/images/podpisj.png",
    signatureKey: "jan",
    role: "Co-Founder",
    badge: "Co-Founder",
    color: "primary" as const,
    photo: "/images/jan.jpg",
    alt: "Jan — Co-Founder VoiceLink",
    desc: "Kieruje sprzedażą i marketingiem oraz dba o relacje z klientami. Zapewnia, że od pierwszego kontaktu po długoletnią współpracę VoiceLink",
    boldPart: "spełnia oczekiwania i rozwija się razem z placówką",
    descEnd: ".",
    tags: ["Sprzedaż", "Marketing", "Relacje z klientami", "Strategia"],
  },
];

const colorMap = {
  accent: { badge: "bg-accent-50 border-accent-200/60 text-accent-600", role: "text-accent-500" },
  primary: { badge: "bg-primary-50 border-primary-200/60 text-primary-600", role: "text-primary-500" },
};

const values = [
  { icon: Users, color: "text-accent-500", bg: "bg-accent-50 border-accent-100", title: "Ludzkie podejście", desc: "AI nie zastępuje ludzi — daje im przestrzeń na to, co naprawdę ważne. Każde wdrożenie projektujemy z myślą o pacjentach i personelu." },
  { icon: Settings, color: "text-primary-500", bg: "bg-primary-50 border-primary-100", title: "Dopasowane rozwiązania", desc: "Nie sprzedajemy gotowego pudełka. Każdy asystent jest konfigurowany pod konkretną placówkę — jej procesy, specjalizacje i sposób pracy." },
  { icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100", title: "Zaufanie i transparentność", desc: "Działamy transparentnie — od cen, przez technologię, po efekty. Budujemy długoterminowe relacje oparte na realnych wynikach." },
];

/* ─── Page ─── */

export default function ONasPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "O nas", href: "/o-nas" }]} />
      {/* ── HERO + TEAM ── */}
      <section className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="text-center mb-10">
            <FadeIn>
              <Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">O nas</Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Poznaj zespół stojący <span className="text-primary-500">za VoiceLink</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed">
                Chcemy dokonać rewolucji w systemie obsługi pacjenta. Łączymy technologię z <span className="text-primary-950 font-medium">ludzkim podejściem</span>.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {teamMembers.map((m, idx) => {
              const c = colorMap[m.color];
              return (
                <FadeIn key={m.name} delay={idx * 0.15}>
                  <div className="group h-full transition-all duration-500 hover:-translate-y-2">
                    <div className="rounded-3xl border border-surface-200/80 bg-white overflow-hidden h-full flex flex-col shadow-[var(--shadow-card)]">
                      <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-t-3xl">
                        <Image src={m.photo} alt={m.alt} fill className="object-cover transition-transform duration-600 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 50%,rgba(10,10,15,0.85) 100%)" }} />
                        {m.signature && (
                          <div className={`absolute right-4 z-20 ${m.signatureKey === "karol" ? "-bottom-12" : "-bottom-2"}`}>
                            <Image src={m.signature} alt={`Podpis ${m.name}`} width={480} height={200} className={`${m.signatureKey === "karol" ? "h-44 sm:h-52" : "h-32 sm:h-40"} w-auto object-contain opacity-80 drop-shadow-lg`} />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                          <div className="inline-flex items-center rounded-full px-3 py-1 mb-2 bg-white/15 backdrop-blur-md border border-white/20">
                            <span className="text-xs text-white font-medium">{m.badge}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-white">{m.name}</h3>
                        </div>
                      </div>
                      <div className="p-6 pt-4 flex-1 flex flex-col">
                        <p className={`text-sm ${c.role} font-medium mb-3`}>{m.role}</p>
                        <p className="text-surface-500 leading-relaxed text-sm">
                          {m.desc} <strong className="text-primary-950">{m.boldPart}</strong>{m.descEnd}
                        </p>
                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                          {m.tags.map((t) => (
                            <span key={t} className="px-3 py-1 rounded-full text-xs font-medium border border-surface-200/80 bg-surface-50 text-surface-600">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── MISSION ── */}
      <section id="misja" className="py-12 md:py-16">
        <Container size="default">
          <FadeIn>
            <div className="rounded-3xl border border-primary-200/60 bg-gradient-to-br from-primary-50/30 to-accent-50/20 p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-primary-50 border border-primary-100">
                  <Zap className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-primary-950 mb-4">Nasza misja</h2>
                  <p className="text-surface-500 leading-relaxed text-lg">
                    Łączymy technologię z realnymi potrzebami placówek medycznych. Każdego dnia pracujemy nad tym, żeby obsługa telefoniczna była <strong className="text-primary-950">prostsza, szybsza i przyjemniejsza</strong> — zarówno dla pacjentów, jak i dla personelu. Budujemy AI, które nie zastępuje ludzi, ale daje im przestrzeń na to, co naprawdę ważne: opiekę nad pacjentem.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── VALUES ── */}
      <section id="co-nas-wyroznia" className="py-16 md:py-20">
        <Container size="default">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Wartości</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Co nas <span className="text-primary-500">wyróżnia</span>
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-6 shadow-sm h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${v.bg} border`}>
                    <v.icon className={`w-6 h-6 ${v.color}`} />
                  </div>
                  <h3 className="text-primary-950 font-semibold mb-2">{v.title}</h3>
                  <p className="text-surface-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── VISION IMAGE ── */}
      <section className="py-16 md:py-20">
        <Container size="narrow">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full blur-3xl opacity-10" style={{ background: "linear-gradient(135deg, var(--color-primary-300), var(--color-accent-300))", transform: "scale(0.7)" }} />
                <Image src="/images/szklo.webp" alt="VoiceLink — technologia głosu AI" width={384} height={384} className="relative z-10 w-64 sm:w-80 md:w-96 h-auto" />
              </div>
              <p className="text-lg text-surface-500 max-w-xl leading-relaxed">
                Trzymamy <span className="text-primary-950 font-medium">przyszłość komunikacji</span> w swoich rękach. Technologia głosowa AI, która zmienia sposób obsługi pacjentów.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Chcesz porozmawiać <span className="text-primary-500">o współpracy?</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">Umów bezpłatną rozmowę i dowiedz się, jak VoiceLink może pomóc Twojej placówce.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/demo"><Button size="lg">Umów rozmowę <ArrowRight className="h-4 w-4" /></Button></Link>
                <a href="tel:+48603076043">
                  <Button variant="outline" size="lg"><Phone className="h-4 w-4" /> +48 603 076 043</Button>
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
