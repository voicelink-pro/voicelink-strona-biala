"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Zap,
  SendHorizonal,
  PhoneForwarded,
  CalendarClock,
  Globe,
  UserRoundCheck,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "primary" | "accent";
}

const capabilities: Capability[] = [
  {
    icon: MessageCircle,
    title: "Naturalna rozmowa",
    description:
      "AI prowadzi płynny dialog po polsku — rozumie kontekst, intencje i potoczny język pacjentów. Nie brzmi jak robot.",
    accent: "primary",
  },
  {
    icon: Zap,
    title: "Odpowiedź w 2 sekundy",
    description:
      "Pacjent nie czeka. AI odbiera połączenie natychmiast i od pierwszej sekundy prowadzi rozmowę.",
    accent: "accent",
  },
  {
    icon: SendHorizonal,
    title: "Potwierdzenie SMS",
    description:
      "Po umówieniu wizyty pacjent automatycznie otrzymuje SMS z datą, godziną, adresem i instrukcjami.",
    accent: "primary",
  },
  {
    icon: PhoneForwarded,
    title: "Potwierdzenie telefoniczne",
    description:
      "Przed wizytą AI dzwoni do pacjenta z przypomnieniem i prośbą o potwierdzenie — redukuje no-shows o 40%.",
    accent: "accent",
  },
  {
    icon: CalendarClock,
    title: "Zarządzanie rezerwacjami",
    description:
      "Umawianie, przesuwanie i odwoływanie wizyt w jednej rozmowie. AI aktualizuje kalendarz w czasie rzeczywistym.",
    accent: "primary",
  },
  {
    icon: Globe,
    title: "Rozmowa w wielu językach",
    description:
      "Pacjent mówi po polsku, ukraińsku lub angielsku — AI automatycznie rozpoznaje język i kontynuuje rozmowę.",
    accent: "accent",
  },
  {
    icon: UserRoundCheck,
    title: "Przekierowanie do człowieka",
    description:
      "Gdy sytuacja tego wymaga, AI płynnie przekazuje rozmowę do pracownika recepcji — z pełnym kontekstem.",
    accent: "primary",
  },
  {
    icon: BookOpen,
    title: "Baza wiedzy placówki",
    description:
      "AI ma dostęp do informacji o Twojej placówce — godziny, lekarze, zabiegi, cennik, dojazd. Udziela sprawdzonych odpowiedzi.",
    accent: "accent",
  },
];

const accentStyles = {
  primary: {
    iconBg: "bg-primary-100/80",
    iconText: "text-primary-500",
    border: "border-primary-200",
  },
  accent: {
    iconBg: "bg-accent-100/80",
    iconText: "text-accent-500",
    border: "border-accent-200",
  },
};

function CapabilityShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % capabilities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const cap = capabilities[active];
  const style = accentStyles[cap.accent];
  const Icon = cap.icon;

  return (
    <div>
      {/* Main card */}
      <div className={`relative overflow-hidden rounded-2xl border ${style.border} bg-white p-8 sm:p-10 shadow-[var(--shadow-card-hover)] min-h-[260px] flex flex-col justify-center`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.iconBg} mb-6`}>
              <Icon className={`h-7 w-7 ${style.iconText}`} />
            </div>
            <h3 className="text-xl font-bold text-primary-950">{cap.title}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-surface-500 max-w-md">
              {cap.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute top-6 right-6 text-xs font-medium text-surface-300">
          {String(active + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center gap-2 mt-5">
        {capabilities.map((c, idx) => {
          const s = accentStyles[c.accent];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(idx)}
              className={`h-2 rounded-full transition-all duration-400 ${
                idx === active
                  ? `w-8 ${idx === active && c.accent === "primary" ? "bg-primary-500" : "bg-accent-500"}`
                  : "w-2 bg-surface-200 hover:bg-surface-300"
              }`}
              aria-label={`Pokaż: ${c.title}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function IntegrationsGrid() {
  return (
    <Section background="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Card showcase — left */}
          <FadeIn delay={0.1}>
            <CapabilityShowcase />
          </FadeIn>

          {/* Text — right */}
          <div>
            <FadeIn>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                Możliwości
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Co potrafi nasz asystent
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 text-[17px] leading-relaxed text-surface-600">
                Nasz asystent głosowy AI to nie prosty voicebot. To inteligentny system obsługi, który prowadzi naturalne rozmowy, rozumie kontekst medyczny i realizuje zadania w czasie rzeczywistym.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-4 text-[17px] leading-relaxed text-surface-600">
                Od odebrania połączenia, przez umówienie wizyty, po wysłanie potwierdzenia SMS — wszystko dzieje się automatycznie, w jednej rozmowie, bez udziału personelu.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: "8", label: "kluczowych funkcji" },
                  { value: "3", label: "języki obsługi" },
                  { value: "<2s", label: "czas reakcji" },
                  { value: "40%", label: "mniej no-shows" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center rounded-xl bg-white border border-surface-200/80 p-4">
                    <div className="text-2xl font-bold text-primary-500">{value}</div>
                    <div className="text-xs text-surface-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
