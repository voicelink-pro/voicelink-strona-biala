"use client";

import Link from "next/link";
import {
  Mic,
  PhoneCall,
  CalendarCheck,
  Clock,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const services = [
  {
    title: "Recepcjonistka AI",
    description: "Wirtualna recepcjonistka odbierająca połączenia 24/7. Umawia wizyty, odpowiada na pytania, przekierowuje pilne sprawy — bez kolejek i nieodebranych telefonów.",
    href: "/uslugi/recepcjonistka-ai",
    icon: Mic,
    badge: "Najpopularniejsza",
  },
  {
    title: "Automatyzacja rozmów",
    description: "Zautomatyzuj powtarzalne scenariusze telefoniczne: rejestrację wizyt, potwierdzenia, informacje o godzinach pracy i wyniki badań.",
    href: "/uslugi/automatyzacja-rozmow",
    icon: PhoneCall,
  },
  {
    title: "Rezerwacje online",
    description: "System rezerwacji wizyt zintegrowany z kalendarzem placówki. Pacjenci umawiają się telefonicznie — AI natychmiast sprawdza dostępność i zapisuje.",
    href: "/uslugi/rezerwacje-online",
    icon: CalendarCheck,
  },
  {
    title: "Obsługa klienta 24/7",
    description: "Całodobowy asystent AI odpowiadający na pytania pacjentów, informujący o usługach i eskalujący pilne sprawy do personelu.",
    href: "/uslugi/obsluga-klienta-247",
    icon: Clock,
  },
  {
    title: "Panel VoiceLink Center",
    description: "Zaawansowany panel analityczny: transkrypcje rozmów, statystyki, trendy i raporty ROI. Pełna kontrola nad asystentem AI.",
    href: "/uslugi/panel-voicelink-center",
    icon: LayoutDashboard,
  },
];

export default function UslugiPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Usługi", href: "/uslugi" }]} />

      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Usługi</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl">
                Kompleksowa <span className="text-primary-500">obsługa AI</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 leading-relaxed">
                Od recepcji głosowej po zaawansowaną analitykę — każda usługa VoiceLink jest budowana indywidualnie pod Twoją placówkę.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <StaggerContainer className="space-y-6">
            {services.map((s) => (
              <StaggerItem key={s.href}>
                <Link href={s.href} className="group block rounded-2xl border border-surface-200/80 bg-white p-8 md:p-10 transition-all hover:shadow-[var(--shadow-card-hover)] hover:border-primary-200">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary-100/80 flex items-center justify-center shrink-0">
                      <s.icon className="h-7 w-7 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-primary-950 group-hover:text-primary-500 transition-colors">{s.title}</h2>
                        {s.badge && <Badge variant="primary" className="text-[10px] px-2 py-0.5">{s.badge}</Badge>}
                      </div>
                      <p className="text-surface-500 leading-relaxed">{s.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-surface-300 group-hover:text-primary-500 transition-colors shrink-0 hidden md:block" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Nie wiesz od czego zacząć?
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Umów bezpłatne demo — pokażemy Ci które usługi najlepiej pasują do Twojej placówki.
              </p>
              <div className="mt-8">
                <Link href="/demo"><Button size="lg">Umów demo <ArrowRight className="h-4 w-4" /></Button></Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
