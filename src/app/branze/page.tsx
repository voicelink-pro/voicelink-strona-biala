"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Heart,
  Smile,
  Hospital,
  Eye,
  MessageSquare,
  Link2,
  Users,
  CalendarClock,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Data ─── */

const facilityTypes = [
  {
    href: "/branze/przychodnie",
    title: "Przychodnie i kliniki",
    desc: "POZ-y, przychodnie specjalistyczne i wieloprofilowe kliniki. Duży wolumen połączeń, wielu lekarzy, różne specjalizacje — AI radzi sobie ze złożonością i kieruje pacjentów do właściwych gabinetów.",
    icon: Building2,
    color: "primary" as const,
  },
  {
    href: "/branze/gabinety-lekarskie",
    title: "Gabinety lekarskie",
    desc: "Lekarze rodzinni, interniści, pediatrzy. Mniejsze praktyki, w których recepcja to często jedna osoba. AI odciąża ją od rutynowych telefonów, dając czas na bezpośrednią obsługę pacjentów.",
    icon: Heart,
    color: "pink" as const,
  },
  {
    href: "/branze/gabinety-stomatologiczne",
    title: "Gabinety stomatologiczne",
    desc: "Dentyści, ortodonci, chirurdzy stomatologiczni. Specyfika wizyt, często pilne przypadki i przypomnienia o kontrolach — asystent AI zarządza tym sprawnie i bez pomyłek.",
    icon: Smile,
    color: "emerald" as const,
  },
  {
    href: "/branze/centra-medyczne",
    title: "Centra medyczne",
    desc: "Duże placówki wielooddziałowe, szpitale, NZOZ-y. Setki połączeń dziennie, wielu specjalistów, skomplikowane procesy — AI skaluje się razem z placówką bez dodatkowych etatów.",
    icon: Hospital,
    color: "accent" as const,
  },
  {
    href: "/branze/placowki-specjalistyczne",
    title: "Gabinety specjalistyczne",
    desc: "Okuliści, dermatolodzy, kardiolodzy, fizjoterapeuci i inni specjaliści. Specyficzne pytania pacjentów i unikalne procesy rezerwacji — AI konfigurowany pod konkretną specjalizację.",
    icon: Eye,
    color: "amber" as const,
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; nodeBg: string }> = {
  primary: { bg: "bg-primary-100/80", text: "text-primary-500", border: "border-primary-200", nodeBg: "bg-primary-50" },
  pink: { bg: "bg-pink-100/80", text: "text-pink-500", border: "border-pink-200", nodeBg: "bg-pink-50" },
  emerald: { bg: "bg-emerald-100/80", text: "text-emerald-600", border: "border-emerald-200", nodeBg: "bg-emerald-50" },
  accent: { bg: "bg-accent-100/80", text: "text-accent-500", border: "border-accent-200", nodeBg: "bg-accent-50" },
  amber: { bg: "bg-amber-100/80", text: "text-amber-600", border: "border-amber-200", nodeBg: "bg-amber-50" },
};

const customizationItems = [
  { title: "Scenariusze rozmów", desc: "Dopasowane do Twojego profilu", icon: MessageSquare, color: "primary" as const },
  { title: "Integracje", desc: "Z Twoim systemem rezerwacji", icon: Link2, color: "accent" as const },
  { title: "Specjalizacje", desc: "Wiedza o Twoich lekarzach", icon: Users, color: "pink" as const },
  { title: "Reguły grafiku", desc: "Umawianie wg Twoich zasad", icon: CalendarClock, color: "emerald" as const },
];

/* ─── Page ─── */

export default function DlaPlacowekPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Branże", href: "/branze" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Dla placówek medycznych</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Rozwiązanie dla <span className="text-primary-500">każdej placówki</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed">
                Niezależnie od wielkości i specjalizacji — VoiceLink dostosowuje się do procesów Twojej placówki. Od jednoosobowego gabinetu po wielooddziałowe centrum medyczne.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── NETWORK GRAPHIC ── */}
      <section className="py-16 md:py-20">
        <Container size="default">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-[var(--shadow-card)] max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30" />
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <span className="text-primary-500 text-[10px] font-medium uppercase tracking-widest">Zasięg VoiceLink w Polsce</span>
                </div>
                <div className="relative mx-auto" style={{ maxWidth: 420, height: 340 }}>
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50%" y1="8%" x2="20%" y2="35%" stroke="rgba(100,164,255,0.2)" strokeWidth="1" strokeDasharray="6,4" />
                    <line x1="50%" y1="8%" x2="80%" y2="30%" stroke="rgba(100,164,255,0.15)" strokeWidth="1" strokeDasharray="6,4" />
                    <line x1="20%" y1="35%" x2="28%" y2="65%" stroke="rgba(100,164,255,0.12)" strokeWidth="1" strokeDasharray="6,4" />
                    <line x1="80%" y1="30%" x2="72%" y2="60%" stroke="rgba(100,164,255,0.12)" strokeWidth="1" strokeDasharray="6,4" />
                    <line x1="28%" y1="65%" x2="50%" y2="88%" stroke="rgba(100,164,255,0.12)" strokeWidth="1" strokeDasharray="6,4" />
                    <line x1="72%" y1="60%" x2="50%" y2="88%" stroke="rgba(100,164,255,0.12)" strokeWidth="1" strokeDasharray="6,4" />
                    <line x1="20%" y1="35%" x2="72%" y2="60%" stroke="rgba(100,164,255,0.06)" strokeWidth="1" strokeDasharray="3,8" />
                    <line x1="80%" y1="30%" x2="28%" y2="65%" stroke="rgba(100,164,255,0.06)" strokeWidth="1" strokeDasharray="3,8" />
                  </svg>

                  {/* Centra medyczne */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-accent-100/80 border-2 border-accent-200 flex items-center justify-center shadow-sm">
                      <Hospital className="w-5 h-5 text-accent-500" />
                    </div>
                    <span className="text-primary-950 text-[10px] font-medium mt-1.5 whitespace-nowrap">Centra medyczne</span>
                  </div>
                  {/* Przychodnie */}
                  <div className="absolute left-[6%] top-[28%] flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary-100/80 border-2 border-primary-200 flex items-center justify-center shadow-sm">
                      <Building2 className="w-5 h-5 text-primary-500" />
                    </div>
                    <span className="text-primary-950 text-[10px] font-medium mt-1.5 whitespace-nowrap">Przychodnie</span>
                  </div>
                  {/* Gabinety lekarskie */}
                  <div className="absolute right-[6%] top-[23%] flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-pink-100/80 border-2 border-pink-200 flex items-center justify-center shadow-sm">
                      <Heart className="w-5 h-5 text-pink-500" />
                    </div>
                    <span className="text-primary-950 text-[10px] font-medium mt-1.5 whitespace-nowrap">Gabinety lekarskie</span>
                  </div>
                  {/* Stomatologiczne */}
                  <div className="absolute left-[14%] top-[58%] flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100/80 border-2 border-emerald-200 flex items-center justify-center shadow-sm">
                      <Smile className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-primary-950 text-[10px] font-medium mt-1.5 whitespace-nowrap">Stomatologiczne</span>
                  </div>
                  {/* Specjalistyczne */}
                  <div className="absolute right-[10%] top-[53%] flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100/80 border-2 border-amber-200 flex items-center justify-center shadow-sm">
                      <Eye className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-primary-950 text-[10px] font-medium mt-1.5 whitespace-nowrap">Specjalistyczne</span>
                  </div>
                  {/* VoiceLink */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[82%] flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary-200/40 animate-ping" style={{ animationDuration: "3s" }} />
                      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 border-2 border-primary-200 flex items-center justify-center overflow-hidden shadow-sm">
                        <Image src="/images/logo.png" alt="VoiceLink" width={500} height={500} quality={90} className="w-10 h-10 object-contain" />
                      </div>
                    </div>
                    <span className="text-primary-500 text-[10px] font-medium mt-1.5">VoiceLink</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── TYPY PLACÓWEK ── */}
      <section className="py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Dopasowany do Ciebie</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Wybierz swój <span className="text-primary-500">typ placówki</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-2xl mx-auto">Każdy typ placówki ma inne potrzeby. Kliknij, aby zobaczyć jak VoiceLink działa w Twoim przypadku.</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-5 mb-5">
            {facilityTypes.slice(0, 3).map(({ href, title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={href}>
                  <Link href={href} className="block rounded-2xl border border-surface-200/80 bg-white p-8 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent group">
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mb-6`}>
                      <Icon className={`h-7 w-7 ${c.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-950 mb-3">{title}</h3>
                    <p className="text-surface-500 text-sm leading-relaxed mb-6">{desc}</p>
                    <span className="text-primary-500 text-sm font-medium group-hover:text-primary-600 transition-colors inline-flex items-center gap-1">
                      Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {facilityTypes.slice(3).map(({ href, title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={href}>
                  <Link href={href} className="block rounded-2xl border border-surface-200/80 bg-white p-8 h-full transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:border-transparent group">
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mb-6`}>
                      <Icon className={`h-7 w-7 ${c.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-950 mb-3">{title}</h3>
                    <p className="text-surface-500 text-sm leading-relaxed mb-6">{desc}</p>
                    <span className="text-primary-500 text-sm font-medium group-hover:text-primary-600 transition-colors inline-flex items-center gap-1">
                      Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── DOPASOWANIE ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">Indywidualne podejście</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Dopasowanie do <span className="text-primary-500">Twojej placówki</span>
              </h2>
              <p className="mt-6 text-surface-500 leading-relaxed max-w-2xl mx-auto">
                VoiceLink nie oferuje rozwiązania „one size fits all". Każde wdrożenie jest konfigurowane indywidualnie — od scenariuszy rozmów, przez integracje z systemem rezerwacyjnym, po specjalizacje lekarzy i reguły umawiania wizyt.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {customizationItems.map(({ title, desc, icon: Icon, color }) => {
              const c = colorMap[color];
              return (
                <StaggerItem key={title}>
                  <div className="rounded-xl border border-surface-200/80 bg-white p-5 text-center h-full transition-all hover:shadow-[var(--shadow-card-hover)]">
                    <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`w-5 h-5 ${c.text}`} />
                    </div>
                    <h4 className="text-primary-950 text-sm font-medium mb-1">{title}</h4>
                    <p className="text-surface-400 text-xs">{desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Nie wiesz, który typ <span className="text-primary-500">pasuje do Ciebie?</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">
                Porozmawiajmy — doradzimy najlepsze rozwiązanie dla Twojej placówki.
              </p>
              <div className="mt-8">
                <Link href="/demo"><Button size="lg">Umów bezpłatną konsultację <ArrowRight className="h-4 w-4" /></Button></Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
