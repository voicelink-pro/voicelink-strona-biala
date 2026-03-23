"use client";

import Link from "next/link";
import {
  Mic,
  PhoneCall,
  CalendarCheck,
  Clock,
  LayoutDashboard,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface ServiceLink {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const allServices: ServiceLink[] = [
  { title: "Recepcjonistka AI", description: "Wirtualna recepcjonistka obsługująca połączenia 24/7.", href: "/uslugi/recepcjonistka-ai", icon: Mic },
  { title: "Automatyzacja rozmów", description: "Zautomatyzuj powtarzalne scenariusze telefoniczne.", href: "/uslugi/automatyzacja-rozmow", icon: PhoneCall },
  { title: "Rezerwacje online", description: "Automatyczne umawianie wizyt z kalendarzem placówki.", href: "/uslugi/rezerwacje-online", icon: CalendarCheck },
  { title: "Obsługa klienta 24/7", description: "Całodobowy asystent AI dla pacjentów.", href: "/uslugi/obsluga-klienta-247", icon: Clock },
  { title: "Panel VoiceLink Center", description: "Analityka, statystyki i raporty w jednym miejscu.", href: "/uslugi/panel-voicelink-center", icon: LayoutDashboard },
];

interface RelatedServicesProps {
  currentHref: string;
  maxItems?: number;
}

export function RelatedServices({ currentHref, maxItems = 3 }: RelatedServicesProps) {
  const related = allServices.filter((s) => s.href !== currentHref).slice(0, maxItems);

  return (
    <section className="py-16 md:py-24 bg-surface-50">
      <Container>
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">Powiązane usługi</h2>
            <p className="mt-4 text-surface-500">Sprawdź co jeszcze VoiceLink może zrobić dla Twojej placówki.</p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid sm:grid-cols-3 gap-5">
          {related.map((s) => (
            <StaggerItem key={s.href}>
              <Link href={s.href} className="block rounded-2xl border border-surface-200/80 bg-white p-7 h-full transition-all hover:shadow-[var(--shadow-card-hover)] hover:border-primary-200 group">
                <s.icon className="h-8 w-8 text-primary-500 mb-4" />
                <h3 className="text-[15px] font-semibold text-primary-950 mb-2 group-hover:text-primary-500 transition-colors">{s.title}</h3>
                <p className="text-sm text-surface-500">{s.description}</p>
                <span className="mt-4 inline-flex items-center text-sm text-primary-500 font-medium">
                  Dowiedz się więcej <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
