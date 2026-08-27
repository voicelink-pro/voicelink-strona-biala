import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InlineTestCallForm } from "@/components/call/inline-test-call-form";
import { SavingsCalculator } from "@/components/calculator/savings-calculator";
import { TestVoiceLinkDialog } from "@/components/calculator/test-voicelink-dialog";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";

const contextStats = [
  {
    value: "168 h",
    desc: "Tyle godzin pracy odpowiada jednemu etatowi recepcji w miesiącu — to punkt odniesienia dla odzyskanej przepustowości",
  },
  {
    value: "15–30%",
    desc: "Średni wskaźnik no-show w ochronie zdrowia. Kalkulator zakłada spadek tego wskaźnika do 3% po wdrożeniu VoiceLink",
  },
  {
    value: "~5–6 min",
    desc: "Średni czas obsługi połączenia w sektorze medycznym. Koszt rozmowy liczymy z tego czasu, nie z całego etatu",
  },
];

const synergyPoints = [
  {
    title: "Odzyskany czas recepcji",
    desc: "VoiceLink przejmuje część ruchu telefonicznego. Zespół odzyskuje godziny na pacjentów w placówce, dokumentację i sprawy, które wymagają człowieka.",
  },
  {
    title: "Potencjalnie odzyskany przychód",
    desc: "Przypomnienia i potwierdzenia wizyt sprowadzają no-show do 3%. Odzyskany przychód to różnica między obecnym wskaźnikiem a tym celem.",
  },
  {
    title: "Dodatkowa warstwa recepcji",
    desc: "VoiceLink nie jest narzędziem do redukcji etatów. Zwiększa przepustowość zespołu bez rekrutacji i bez założenia, że ktokolwiek odejdzie.",
  },
];

interface SavingsCalculatorPageProps {
  showTopCallForm?: boolean;
  showBreadcrumbs?: boolean;
  showLandingHeader?: boolean;
}

export function SavingsCalculatorPage({
  showTopCallForm = false,
  showBreadcrumbs = true,
  showLandingHeader = false,
}: SavingsCalculatorPageProps) {
  return (
    <>
      {showLandingHeader ? (
        <div className="flex items-center justify-between px-4 pt-6 sm:px-6 lg:px-8">
          <Image
            src="/images/logo.png"
            alt="VoiceLink"
            width={320}
            height={80}
            className="h-12 w-auto sm:h-14"
            sizes="140px"
            quality={92}
            priority
          />
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary-700/70">
            Asystent głosowy
          </p>
        </div>
      ) : null}

      {showBreadcrumbs ? (
        <Breadcrumbs
          items={[
            { name: "Cennik", href: "/cennik" },
            { name: "Kalkulator oszczędności", href: "/kalkulator-oszczednosci" },
          ]}
        />
      ) : null}

      {showTopCallForm ? (
        <section className="relative overflow-hidden pt-8 pb-2 md:pt-10">
          <Container>
            <InlineTestCallForm source="lp-kalkulator" />
          </Container>
        </section>
      ) : null}

      <section className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
                Kalkulator efektu VoiceLink
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Ile czasu recepcji <span className="text-primary-500">pochłania telefon?</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-surface-500">
                Sprawdź, ile czasu VoiceLink może uwolnić w codziennej pracy recepcji, aby zespół mógł skupić się na pacjentach i najważniejszych zadaniach. Zobacz, jaką część tego obciążenia może przejąć VoiceLink — i ile godzin zespołu odzyskasz{" "}
                <span className="font-medium text-primary-950">bez zwiększania zatrudnienia</span>.
              </p>
              <p className="mt-2 text-sm text-surface-400">
                Wynik rozdzielamy na odzyskany czas, wartość tego czasu i potencjalny przychód. Nic nie mieszamy w jedną
                „oszczędność na etatach”.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-12">
        <Container>
          <SavingsCalculator />
        </Container>
      </section>

      <section id="dlaczego-automatyzacja" className="py-16 md:py-20">
        <Container>
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="mb-4 inline-block text-xs font-semibold tracking-widest uppercase text-accent-500">
                Kontekst
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Dlaczego liczymy <span className="text-primary-500">czas, nie etaty?</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contextStats.map((stat) => (
              <FadeIn key={stat.value}>
                <div className="h-full rounded-2xl border border-surface-200/80 bg-white p-6 text-center">
                  <div className="mb-2 text-3xl font-bold text-primary-950">{stat.value}</div>
                  <div className="text-sm text-surface-500">{stat.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
                <svg viewBox="0 0 600 400" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent-400)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="var(--color-accent-400)" stopOpacity="0.08" />
                    </linearGradient>
                    <linearGradient id="cyanArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary-400)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="var(--color-primary-400)" stopOpacity="0.08" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="rgba(0,0,0,0.15)" />
                    </marker>
                  </defs>
                  <line x1="60" y1="340" x2="570" y2="340" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                  <line x1="60" y1="270" x2="570" y2="270" stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="4,6" />
                  <line x1="60" y1="200" x2="570" y2="200" stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="4,6" />
                  <line x1="60" y1="130" x2="570" y2="130" stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="4,6" />
                  <line x1="60" y1="340" x2="580" y2="340" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                  <line x1="60" y1="350" x2="60" y2="40" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                  <path
                    d="M60,340 C100,338 140,335 180,328 C220,318 260,300 300,268 C340,228 380,175 420,128 C460,90 500,65 540,50 L540,340 Z"
                    fill="url(#cyanArea)"
                    opacity="0.85"
                  />
                  <path
                    d="M60,340 C100,338 140,335 180,328 C220,318 260,300 300,268 C340,228 380,175 420,128 C460,90 500,65 540,50"
                    fill="none"
                    stroke="var(--color-primary-400)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M60,340 C100,339 140,337 180,334 C220,330 260,322 300,308 C340,290 380,268 420,248 C460,232 500,220 540,210 L540,340 Z"
                    fill="url(#purpleArea)"
                    opacity="0.85"
                  />
                  <path
                    d="M60,340 C100,339 140,337 180,334 C220,330 260,322 300,308 C340,290 380,268 420,248 C460,232 500,220 540,210"
                    fill="none"
                    stroke="var(--color-accent-400)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="300" cy="308" r="6" fill="var(--color-accent-500)" filter="url(#glow)">
                    <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="300" cy="308" r="3" fill="white" />
                  <rect x="155" y="270" width="130" height="28" rx="14" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
                  <text x="220" y="289" textAnchor="middle" fill="var(--color-accent-500)" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="500">
                    punkt synergii
                  </text>
                  <line x1="285" y1="288" x2="296" y2="305" stroke="rgba(139,92,246,0.3)" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="410" y="295" fill="var(--color-accent-500)" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" transform="rotate(-18, 430, 295)">
                    Odzyskany czas
                  </text>
                  <text x="380" y="165" fill="var(--color-primary-500)" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" transform="rotate(-32, 380, 165)">
                    Odzyskany przychód
                  </text>
                  <text x="460" y="42" fill="var(--color-primary-950)" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="600">
                    Efekt łączonej
                  </text>
                  <text x="460" y="60" fill="var(--color-primary-950)" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="600">
                    automatyzacji
                  </text>
                  <text x="80" y="365" fill="rgba(0,0,0,0.25)" fontFamily="Inter, sans-serif" fontSize="10" fontStyle="italic">
                    Wdrożenie VoiceLink
                  </text>
                  <text x="400" y="365" fill="rgba(0,0,0,0.25)" fontFamily="Inter, sans-serif" fontSize="10" fontStyle="italic">
                    Większa przepustowość
                  </text>
                  <text x="25" y="200" fill="rgba(0,0,0,0.2)" fontFamily="Inter, sans-serif" fontSize="10" transform="rotate(-90, 25, 200)">
                    Efekt
                  </text>
                </svg>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <span className="mb-4 inline-block text-xs font-semibold tracking-widest uppercase text-accent-500">
                  Efekt synergii
                </span>
                <h2 id="zrodla-oszczednosci" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Czas zespołu i przychód, <span className="text-primary-500">osobno policzone</span>
                </h2>
                <p className="mb-6 mt-4 leading-relaxed text-surface-500">
                  VoiceLink działa na dwóch frontach naraz. Wynik ekonomiczny pokazujemy jako sumę, ale każdą składową
                  widać osobno — żeby było wiadomo, co jest odzyskanym czasem, a co potencjalnym przychodem.
                </p>
                <div className="flex flex-col gap-5">
                  {synergyPoints.map((point) => (
                    <div key={point.title} className="flex items-start gap-4">
                      <div className="mt-1.5 size-3 shrink-0 rounded-full bg-primary-500" />
                      <div>
                        <h3 className="mb-1 font-semibold text-primary-950">{point.title}</h3>
                        <p className="text-sm leading-relaxed text-surface-500">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/demo">
                    <Button size="lg">
                      Zobacz jak wdrożyć u Ciebie <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 text-center shadow-[var(--shadow-card)] sm:px-16 sm:py-20">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Odzyskaj godziny recepcji <span className="text-primary-500">bez zwiększania zespołu</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-surface-500">
                Przetestuj system VoiceLink — asystent oddzwoni i pokaże, jak brzmi rozmowa z pacjentem.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <TestVoiceLinkDialog triggerClassName="" />
                <Link href="/plany-cenowe">
                  <Button variant="outline" size="lg">
                    Zobacz cennik
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
