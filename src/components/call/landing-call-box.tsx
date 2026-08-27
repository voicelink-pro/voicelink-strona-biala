"use client";

import { useRef } from "react";
import {
  CalendarCheck,
  Car,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Tag,
} from "lucide-react";
import { CallLiveStatus } from "@/components/call/call-live-status";
import { useTestCall } from "@/components/call/use-test-call";
import { Button } from "@/components/ui/button";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const CAPABILITIES = [
  {
    icon: CalendarCheck,
    title: "Umów się na wizytę",
    desc: "Powiedz kiedy i do kogo. Asystent poprowadzi rezerwację jak recepcja.",
  },
  {
    icon: MapPin,
    title: "Zapytaj o placówkę",
    desc: "Adres, godziny otwarcia, który gabinet i co zabrać ze sobą.",
  },
  {
    icon: Car,
    title: "Dojazd i parking",
    desc: "Jak dojechać, gdzie zaparkować, czy jest winda albo wejście od podwórza.",
  },
  {
    icon: Tag,
    title: "Ceny usług",
    desc: "Ile kosztuje konsultacja, badanie albo zabieg — bez czekania w kolejce.",
  },
];

const PROMPTS = [
  "Chcę umówić się na czwartek po 16:00",
  "Jak dojechać do placówki?",
  "Ile kosztuje pierwsza wizyta?",
  "Czy mogę przełożyć termin?",
];

const BUBBLES = [
  { text: "Umów mnie na kontrolę", from: "user" as const, className: "landing-prompt-1" },
  { text: "Jasne, jaki dzień pasuje?", from: "assistant" as const, className: "landing-prompt-2" },
  { text: "Gdzie jest parking?", from: "user" as const, className: "landing-prompt-3" },
  { text: "Ile kosztuje wizyta?", from: "user" as const, className: "landing-prompt-4" },
];

function SpeechBubble({
  text,
  from,
  className,
}: {
  text: string;
  from: "user" | "assistant";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "landing-prompt",
        from === "user" ? "landing-prompt-user" : "landing-prompt-assistant",
        className
      )}
    >
      {text}
    </span>
  );
}

export function LandingCallBox() {
  const call = useTestCall("lp-przetestuj");
  const formStarted = useRef(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const success = await call.startCall();
    trackFormSubmit("test-call", "lp-przetestuj", success);
  }

  return (
    <div className="relative lg:px-8 lg:py-7">
      {!call.submitted ? (
        <div className="mb-8 flex flex-col items-center gap-2 sm:mb-10 lg:hidden" aria-hidden>
          {BUBBLES.slice(0, 3).map((bubble, index) => (
            <SpeechBubble
              key={bubble.text}
              text={bubble.text}
              from={bubble.from}
              className={index % 2 === 0 ? "self-end" : "self-start"}
            />
          ))}
        </div>
      ) : null}

      {!call.submitted ? (
        <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block" aria-hidden>
          {BUBBLES.map((bubble) => (
            <SpeechBubble
              key={bubble.text}
              text={bubble.text}
              from={bubble.from}
              className={cn("landing-prompt-float", bubble.className)}
            />
          ))}
        </div>
      ) : null}

      <section className="relative z-10 overflow-hidden rounded-[2rem] bg-white shadow-[var(--shadow-elevated)] ring-1 ring-primary-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500" />
          <div className="absolute -right-16 -top-20 size-56 rounded-full bg-primary-100/70 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 size-48 rounded-full bg-accent-100/80 blur-3xl" />
        </div>

        {call.submitted ? (
          <div className="relative px-6 py-10 sm:px-12 sm:py-14">
            <CallLiveStatus
              size="hero"
              status={call.status}
              elapsed={call.elapsed}
              live={call.live}
              conversationId={call.conversationId}
            />
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-surface-500">
              Dźwięk słyszysz w telefonie. To okno pokazuje tylko status rozmowy.
            </p>
            <div className="mt-8 flex justify-center">
              <Button type="button" variant="outline" size="lg" onClick={call.reset}>
                Wpisz numer ponownie
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 grid gap-10 px-6 pt-10 pb-8 sm:px-10 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-12 lg:py-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary-400 opacity-60" />
                  <span className="relative size-2 rounded-full bg-primary-500" />
                </span>
                Asystent jest gotowy
              </div>
              <h2 className="mt-5 overflow-visible text-3xl font-extrabold leading-[1.2] tracking-tight text-primary-950 sm:text-4xl">
                Porozmawiaj z asystentem głosowym.{" "}
                <span className="text-primary-500">Teraz.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-surface-500 sm:text-lg">
                Wpisz numer i odbierz telefon. VoiceLink pokaże, jak prowadzi pacjenta:
                umawia wizytę, odpowiada o placówce, dojeździe i cenach — spokojnie,
                po polsku, bez skryptu z call center.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {CAPABILITIES.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl bg-surface-50 p-4 transition-colors hover:bg-primary-50/70"
                  >
                    <item.icon className="size-5 text-primary-500" />
                    <p className="mt-3 text-sm font-semibold text-primary-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-surface-500">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            <form
              id="wpisz-numer"
              onSubmit={handleSubmit}
              className="flex scroll-mt-24 flex-col justify-center rounded-[1.75rem] bg-primary-50/60 p-6 sm:p-8"
            >
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-[var(--shadow-glow-primary)]">
                <Phone className="size-7" />
              </div>
              <p className="mt-5 text-center text-lg font-bold text-primary-950">Zadzwoń do mnie</p>
              <p className="mt-2 text-center text-sm text-surface-500">
                Oddzwonimy w kilka sekund. Rozmowa jest darmowa i do niczego nie zobowiązuje.
              </p>

              <label htmlFor="landing-call-phone" className="mt-8 text-sm font-medium text-primary-950">
                Numer telefonu
              </label>
              <input
                id="landing-call-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="600 123 456"
                value={call.phone}
                disabled={call.pending}
                aria-invalid={call.error ? true : undefined}
                onFocus={() => {
                  if (formStarted.current) return;
                  formStarted.current = true;
                  trackFormStart("test-call", "lp-przetestuj");
                }}
                onChange={(event) => {
                  call.setPhone(event.target.value);
                  if (call.error) call.setError(null);
                }}
                className={cn(
                  "mt-2 h-14 w-full rounded-2xl bg-white px-5 text-lg text-primary-950 placeholder:text-surface-400 shadow-none outline-none ring-1 ring-transparent transition",
                  "focus:ring-2 focus:ring-primary-400/40",
                  call.error ? "ring-destructive/40" : "bg-white"
                )}
              />
              {call.error ? (
                <p className="mt-2 text-sm text-destructive" role="alert">
                  {call.error}
                </p>
              ) : (
                <p className="mt-2 text-xs text-surface-400">Polski numer komórkowy albo z +48.</p>
              )}

              <Button type="submit" size="xl" disabled={call.pending} className="mt-5 h-14 w-full rounded-2xl text-base">
                <Phone />
                {call.pending ? "Łączenie…" : "Zadzwoń do mnie"}
              </Button>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-surface-400">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5 text-primary-400" />
                  24/7
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-primary-400" />
                  Po polsku
                </span>
                <span>Jednorazowe demo</span>
              </div>
            </form>
          </div>
        )}

        {!call.submitted ? (
          <div className="relative border-t border-surface-100 px-6 py-5 sm:px-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-surface-400">
              Możesz powiedzieć na przykład
            </p>
            <div className="flex flex-wrap gap-2">
              {PROMPTS.map((prompt) => (
                <span
                  key={prompt}
                  className="rounded-full bg-surface-50 px-3.5 py-1.5 text-sm text-surface-600"
                >
                  {prompt}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
