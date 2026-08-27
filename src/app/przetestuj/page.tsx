import { Phone } from "lucide-react";
import { LandingCallBox } from "@/components/call/landing-call-box";

export default function PrzetestujPage() {
  return (
    <div className="relative isolate min-h-full overflow-hidden">
      <div className="landing-sky" />
      <div className="landing-orb landing-orb-a" />
      <div className="landing-orb landing-orb-b" />
      <div className="landing-orb landing-orb-c" />
      <div className="landing-rings" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-up text-sm font-semibold text-primary-600">
            Usłysz to, zanim wdrożysz
          </p>
          <h1 className="animate-fade-up mt-3 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Asystent głosowy VoiceLink
            <span className="block text-primary-500">zadzwoni do Ciebie</span>
          </h1>
          <p className="animate-fade-up mx-auto mt-5 max-w-2xl text-base leading-relaxed text-surface-500 sm:text-lg">
            Nie czytaj o voicebocie. Porozmawiaj z nim. Umów wizytę, zapytaj o dojazd,
            ceny albo godziny — tak, jak zrobiłby to pacjent przy pierwszym kontakcie.
          </p>
          <div className="animate-fade-up mt-7 flex justify-center lg:hidden">
            <a
              href="#wpisz-numer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 active:bg-primary-700"
            >
              <Phone className="size-4" />
              Przetestuj
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-5xl flex-1 pb-10 sm:mt-14">
          <LandingCallBox />
        </div>

        <p className="mt-auto pb-2 text-center text-xs text-surface-400">
          Wpisując numer, prosisz o jednorazowe połączenie demo. Nie zapisujemy Cię na newsletter.
        </p>
      </div>
    </div>
  );
}
