"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Settings,
  Info,
  Calculator,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/motion";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/* ─── Helpers ─── */

function fmt(n: number) {
  return n.toLocaleString("pl-PL");
}

function InfoTooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex">
      <button type="button" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="w-[22px] h-[22px] rounded-full bg-surface-100 border border-surface-200 flex items-center justify-center cursor-help hover:bg-primary-50 hover:border-primary-200 transition-all flex-shrink-0">
        <Info className="w-3 h-3 text-surface-400" />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-[280px] p-3 bg-white border border-surface-200 rounded-xl shadow-[0_20px_40px_-8px_rgba(0,0,0,0.15)] z-50">
          {children}
        </div>
      )}
    </div>
  );
}

function Slider({ id, label, min, max, step, value, onChange, suffix, minLabel, maxLabel }: {
  id: string; label: string; min: number; max: number; step: number; value: number;
  onChange: (v: number) => void; suffix?: string; minLabel: string; maxLabel: string;
}) {
  const display = suffix ? `${fmt(value)}${suffix}` : fmt(value);
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label htmlFor={id} className="text-sm text-surface-600 font-medium">{label}</label>
        <span className="text-primary-950 font-bold text-lg bg-surface-50 px-3 py-1 rounded-lg border border-surface-200/60">{display}</span>
      </div>
      <input type="range" id={id} min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="calc-slider w-full" />
      <div className="flex justify-between text-xs text-surface-400 mt-1"><span>{minLabel}</span><span>{maxLabel}</span></div>
    </div>
  );
}

/* ─── Data ─── */

const contextStats = [
  { value: "6-9 tys. zł", color: "text-primary-950", desc: "Pełny koszt pracodawcy za jednego pracownika administracyjnego miesięcznie" },
  { value: "15-30%", color: "text-red-500", desc: "Średni wskaźnik no-show w ochronie zdrowia — to realne straty przychodu" },
  { value: "~6 min", color: "text-emerald-600", desc: "Średni czas obsługi połączenia w sektorze medycznym — przy setkach połączeń dziennie" },
];

const synergyPoints = [
  { color: "bg-accent-500", title: "Redukcja kosztów operacyjnych", desc: "Automatyzacja powtarzalnych połączeń (rezerwacje, FAQ, potwierdzenia) zmniejsza obciążenie recepcji nawet o 60-80%. To bezpośrednia oszczędność na etatach i nadgodzinach." },
  { color: "bg-primary-500", title: "Odzyskane przychody", desc: "Automatyczne przypomnienia i potwierdzenia wizyt redukują no-show z 20-30% do ~5%. Każda odzyskana wizyta to realny przychód, który wcześniej przepadał." },
  { color: "bg-gradient-to-br from-accent-500 to-primary-500", title: "Punkt synergii", desc: "Gdy oba efekty działają razem, ROI rośnie wykładniczo. Placówki z VoiceLink osiągają pełny zwrot z inwestycji już w pierwszym miesiącu." },
];

/* ─── Page ─── */

export default function KalkulatorPage() {
  const [calls, setCalls] = useState(50);
  const [calltime, setCalltime] = useState(5);
  const [employees, setEmployees] = useState(2);
  const [empcost, setEmpcost] = useState(7500);
  const [repetitive, setRepetitive] = useState(50);
  const [noshow, setNoshow] = useState(20);
  const [visitval, setVisitval] = useState(200);

  const callsMonthly = calls * 30;
  const monthlyCost = employees * empcost;
  const costPerCall = callsMonthly > 0 ? monthlyCost / callsMonthly : 0;
  const savingsPercent = (repetitive / 100) * 0.85;
  const monthlySavings = Math.round(monthlyCost * savingsPercent);
  const yearlySavings = monthlySavings * 12;

  const visitsPerMonth = callsMonthly * 0.4;
  const currentNoShowVisits = Math.round(visitsPerMonth * (noshow / 100));
  const reducedNoShowVisits = Math.round(visitsPerMonth * 0.05);
  const recoveredVisits = currentNoShowVisits - reducedNoShowVisits;
  const noShowLoss = currentNoShowVisits * visitval;
  const recoveredValue = recoveredVisits * visitval;

  const totalROI = yearlySavings + recoveredValue * 12;
  const aiCost = monthlyCost - monthlySavings;
  const reductionPercent = monthlyCost > 0 ? Math.round((monthlySavings / monthlyCost) * 100) : 0;
  const aiBarWidth = Math.max(5, monthlyCost > 0 ? Math.round((aiCost / monthlyCost) * 100) : 50);

  return (
    <>
      <Breadcrumbs items={[{ name: "Cennik", href: "/cennik" }, { name: "Kalkulator oszczędności", href: "/kalkulator-oszczednosci" }]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="text-center max-w-3xl mx-auto">
            <FadeIn><Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">Kalkulator ROI</Badge></FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Oblicz ile <span className="text-primary-500">zaoszczędzisz</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-surface-500 max-w-xl mx-auto leading-relaxed">
                Jeśli 50% Twoich rozmów to powtarzalne pytania, automatyzacja tej części to <span className="text-primary-950 font-medium">natychmiastowa redukcja kosztów operacyjnych</span>.
              </p>
              <p className="mt-2 text-sm text-surface-400">Przesuń suwaki poniżej — wyniki aktualizują się w czasie rzeczywistym</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="py-8 md:py-12">
        <Container>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* LEFT: Sliders */}
            <div className="lg:col-span-3">
              <FadeIn>
                <div className="rounded-3xl border border-surface-200/80 bg-white p-8 shadow-[var(--shadow-card)]">
                  <h3 className="text-xl font-semibold text-primary-950 mb-8 flex items-center gap-3">
                    <Settings className="w-6 h-6 text-accent-500" />
                    Dane Twojej placówki
                  </h3>
                  <div className="space-y-8">
                    <Slider id="calls" label="Połączenia dziennie" min={5} max={5000} step={5} value={calls} onChange={setCalls} minLabel="5" maxLabel="5 000" />
                    <Slider id="calltime" label="Średni czas rozmowy (min)" min={1} max={15} step={0.5} value={calltime} onChange={setCalltime} minLabel="1 min" maxLabel="15 min" />
                    <Slider id="employees" label="Pracownicy recepcji" min={1} max={50} step={1} value={employees} onChange={setEmployees} minLabel="1" maxLabel="50+" />
                    <Slider id="empcost" label="Koszt pracownika brutto/mies. (zł)" min={4000} max={12000} step={500} value={empcost} onChange={setEmpcost} suffix=" zł" minLabel="4 000 zł" maxLabel="12 000 zł" />
                    <Slider id="repetitive" label="% połączeń powtarzalnych (FAQ/rezerwacje)" min={10} max={100} step={5} value={repetitive} onChange={setRepetitive} suffix="%" minLabel="10%" maxLabel="100%" />

                    <div className="border-t border-surface-200/60" />
                    <p className="text-xs text-surface-400 uppercase tracking-wider font-medium">Dane medyczne (opcjonalnie)</p>

                    <Slider id="noshow" label="Aktualny % no-show" min={5} max={70} step={1} value={noshow} onChange={setNoshow} suffix="%" minLabel="5%" maxLabel="70%" />
                    <Slider id="visitval" label="Średnia wartość wizyty (zł)" min={50} max={1000} step={25} value={visitval} onChange={setVisitval} suffix=" zł" minLabel="50 zł" maxLabel="1 000 zł" />
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* RIGHT: Results */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.15}>
                <div className="lg:sticky lg:top-28 space-y-5">
                  {/* Obecne koszty */}
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm text-surface-500 font-medium uppercase tracking-wider">Obecne koszty</h4>
                      <InfoTooltip>
                        <p className="text-xs text-surface-500 leading-relaxed"><strong className="text-primary-950">Koszt obsługi telefonu</strong> = liczba pracowników recepcji x koszt brutto pracownika.</p>
                        <p className="text-xs text-surface-500 leading-relaxed mt-1.5"><strong className="text-primary-950">Koszt jednej rozmowy</strong> = koszt miesięczny / liczba rozmów w miesiącu.</p>
                        <p className="text-xs text-surface-500 leading-relaxed mt-1.5"><strong className="text-primary-950">Straty z no-show</strong> = szacunkowa liczba nieodwołanych wizyt x średnia wartość wizyty.</p>
                      </InfoTooltip>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center"><span className="text-surface-500 text-sm">Koszt obsługi telefonu / mies.</span><span className="text-primary-950 font-bold text-lg tabular-nums">{fmt(monthlyCost)} zl</span></div>
                      <div className="h-px bg-surface-200/60" />
                      <div className="flex justify-between items-center"><span className="text-surface-500 text-sm">Koszt jednej rozmowy</span><span className="text-primary-950 font-bold tabular-nums">{costPerCall.toFixed(2).replace(".", ",")} zl</span></div>
                      <div className="h-px bg-surface-200/60" />
                      <div className="flex justify-between items-center"><span className="text-surface-500 text-sm">Straty z no-show / mies.</span><span className="text-red-500 font-bold tabular-nums">{fmt(noShowLoss)} zl</span></div>
                    </div>
                  </div>

                  {/* Oszczednosci */}
                  <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/30 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm text-emerald-600 font-medium uppercase tracking-wider">Oszczędności z VoiceLink</h4>
                      <InfoTooltip>
                        <p className="text-xs text-surface-500 leading-relaxed"><strong className="text-primary-950">Oszczędność miesięczna</strong> = koszt recepcji x (% powtarzalnych x 0.85). Zakładamy, że AI obsłuży 85% rozmów powtarzalnych.</p>
                        <p className="text-xs text-surface-500 leading-relaxed mt-1.5"><strong className="text-primary-950">Odzyskane wizyty</strong> = wizyty, które wcześniej przepadały jako no-show. VoiceLink redukuje no-show do ~5%.</p>
                      </InfoTooltip>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center"><span className="text-surface-500 text-sm">Oszczędność miesięczna</span><span className="text-emerald-600 font-bold text-xl tabular-nums">{fmt(monthlySavings)} zl</span></div>
                      <div className="h-px bg-emerald-200/40" />
                      <div className="flex justify-between items-center"><span className="text-surface-500 text-sm">Oszczędność roczna</span><span className="text-emerald-600 font-bold text-2xl tabular-nums">{fmt(yearlySavings)} zl</span></div>
                      <div className="h-px bg-emerald-200/40" />
                      <div className="flex justify-between items-center"><span className="text-surface-500 text-sm">Odzyskane wizyty / mies.</span><span className="text-accent-500 font-bold text-lg tabular-nums">{fmt(recoveredVisits)}</span></div>
                      <div className="h-px bg-emerald-200/40" />
                      <div className="flex justify-between items-center"><span className="text-surface-500 text-sm">Wartosc odzyskanych wizyt</span><span className="text-accent-500 font-bold tabular-nums">{fmt(recoveredValue)} zl</span></div>
                    </div>
                  </div>

                  {/* Porownanie */}
                  <div className="rounded-2xl border border-surface-200/80 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm text-surface-500 font-medium uppercase tracking-wider">Porównanie kosztów</h4>
                      <InfoTooltip>
                        <p className="text-xs text-surface-500 leading-relaxed"><strong className="text-primary-950">Tradycyjna obsługa</strong> = pełny koszt recepcji.</p>
                        <p className="text-xs text-surface-500 leading-relaxed mt-1.5"><strong className="text-primary-950">Koszt po wdrożeniu AI</strong> = pozostałe koszty kadrowe za pracowników obsługujących złożone sprawy, których AI nie przejmie.</p>
                      </InfoTooltip>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1"><span className="text-surface-500">Tradycyjna obsługa</span><span className="text-primary-950 font-medium">{fmt(monthlyCost)} zl</span></div>
                        <div className="h-4 rounded-full bg-surface-200/60 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-300 transition-all duration-700" style={{ width: "100%" }} /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1"><span className="text-surface-500">Koszt recepcji po wdrożeniu AI</span><span className="text-emerald-600 font-medium">{fmt(aiCost)} zl</span></div>
                        <div className="h-4 rounded-full bg-surface-200/60 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700" style={{ width: `${aiBarWidth}%` }} /></div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 text-center">
                      <span className="text-emerald-600 font-bold text-lg">{reductionPercent}%</span>
                      <span className="text-surface-500 text-sm"> redukcji kosztów</span>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="rounded-2xl border border-primary-200/60 bg-gradient-to-br from-primary-50/40 to-accent-50/30 p-6">
                    <div className="text-center">
                      <p className="text-surface-500 text-sm mb-2">Łączna wartość ROI rocznie</p>
                      <div className="text-4xl font-bold text-primary-500 tabular-nums">{fmt(totalROI)} zl</div>
                      <p className="text-surface-400 text-xs mt-2">oszczędności + odzyskane wizyty</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href="/demo">
                    <Button size="lg" className="w-full"><Phone className="h-5 w-5" /> Umów bezpłatną analizę</Button>
                  </Link>
                  <p className="text-center text-xs text-surface-400">Bezpłatna analiza ruchu telefonicznego Twojej placówki</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CONTEXT ── */}
      <section id="dlaczego-automatyzacja" className="py-16 md:py-20">
        <Container size="default">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Kontekst</span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                Dlaczego automatyzacja <span className="text-primary-500">się opłaca?</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {contextStats.map((s) => (
              <FadeIn key={s.value}>
                <div className="rounded-2xl border border-surface-200/80 bg-white p-6 text-center h-full">
                  <div className={`text-3xl font-bold ${s.color} mb-2`}>{s.value}</div>
                  <div className="text-surface-500 text-sm">{s.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── SYNERGY ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="rounded-3xl border border-surface-200/80 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <svg viewBox="0 0 600 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-accent-400)" stopOpacity="0.5" /><stop offset="100%" stopColor="var(--color-accent-400)" stopOpacity="0.08" /></linearGradient>
                    <linearGradient id="cyanArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary-400)" stopOpacity="0.5" /><stop offset="100%" stopColor="var(--color-primary-400)" stopOpacity="0.08" /></linearGradient>
                    <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="rgba(0,0,0,0.15)" /></marker>
                  </defs>
                  <line x1="60" y1="340" x2="570" y2="340" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                  <line x1="60" y1="270" x2="570" y2="270" stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="4,6" />
                  <line x1="60" y1="200" x2="570" y2="200" stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="4,6" />
                  <line x1="60" y1="130" x2="570" y2="130" stroke="rgba(0,0,0,0.04)" strokeWidth="1" strokeDasharray="4,6" />
                  <line x1="60" y1="340" x2="580" y2="340" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                  <line x1="60" y1="350" x2="60" y2="40" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                  <path d="M60,340 C100,338 140,335 180,328 C220,318 260,300 300,268 C340,228 380,175 420,128 C460,90 500,65 540,50 L540,340 Z" fill="url(#cyanArea)" opacity="0.85" />
                  <path d="M60,340 C100,338 140,335 180,328 C220,318 260,300 300,268 C340,228 380,175 420,128 C460,90 500,65 540,50" fill="none" stroke="var(--color-primary-400)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M60,340 C100,339 140,337 180,334 C220,330 260,322 300,308 C340,290 380,268 420,248 C460,232 500,220 540,210 L540,340 Z" fill="url(#purpleArea)" opacity="0.85" />
                  <path d="M60,340 C100,339 140,337 180,334 C220,330 260,322 300,308 C340,290 380,268 420,248 C460,232 500,220 540,210" fill="none" stroke="var(--color-accent-400)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="300" cy="308" r="6" fill="var(--color-accent-500)" filter="url(#glow)"><animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" /></circle>
                  <circle cx="300" cy="308" r="3" fill="white" />
                  <rect x="155" y="270" width="130" height="28" rx="14" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
                  <text x="220" y="289" textAnchor="middle" fill="var(--color-accent-500)" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="500">punkt synergii</text>
                  <line x1="285" y1="288" x2="296" y2="305" stroke="rgba(139,92,246,0.3)" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="430" y="295" fill="var(--color-accent-500)" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" transform="rotate(-18, 430, 295)">Redukcja kosztów</text>
                  <text x="380" y="165" fill="var(--color-primary-500)" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" transform="rotate(-32, 380, 165)">Odzyskane przychody</text>
                  <text x="460" y="42" fill="var(--color-primary-950)" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="600">Efekty łączonej</text>
                  <text x="460" y="60" fill="var(--color-primary-950)" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="600">automatyzacji</text>
                  <text x="80" y="365" fill="rgba(0,0,0,0.25)" fontFamily="Inter, sans-serif" fontSize="10" fontStyle="italic">Wdrożenie VoiceLink</text>
                  <text x="440" y="365" fill="rgba(0,0,0,0.25)" fontFamily="Inter, sans-serif" fontSize="10" fontStyle="italic">Pełna optymalizacja!</text>
                  <text x="25" y="200" fill="rgba(0,0,0,0.2)" fontFamily="Inter, sans-serif" fontSize="10" transform="rotate(-90, 25, 200)">Oszczędności</text>
                </svg>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-4">Efekt synergii</span>
                <h2 id="zrodla-oszczednosci" className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Dwa źródła oszczędności, <span className="text-primary-500">jeden system</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed mb-6">
                  VoiceLink generuje oszczędności na dwóch frontach jednocześnie. Efekty nie sumują się — one <strong className="text-primary-950">mnożą się</strong>.
                </p>
                <div className="space-y-5">
                  {synergyPoints.map((sp) => (
                    <div key={sp.title} className="flex items-start gap-4">
                      <div className={`w-3 h-3 rounded-full ${sp.color} mt-1.5 flex-shrink-0`} />
                      <div>
                        <h4 className="text-primary-950 font-semibold mb-1">{sp.title}</h4>
                        <p className="text-surface-500 text-sm leading-relaxed">{sp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/demo"><Button size="lg">Zobacz jak wdrożyć u Ciebie <ArrowRight className="h-4 w-4" /></Button></Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Nie zostawiaj pieniędzy <span className="text-primary-500">na stole</span>
              </h2>
              <p className="mt-4 text-surface-500 max-w-xl mx-auto">Umów bezpłatną analizę ruchu telefonicznego i dowiedz się, ile dokładnie możesz zaoszczędzić.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/demo"><Button size="lg">Umów bezpłatną analizę <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link href="/plany-cenowe"><Button variant="outline" size="lg">Zobacz cennik</Button></Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
