"use client";

import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";

export function AboutProduct() {
  return (
    <Section background="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <FadeIn>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
                O VoiceLink
              </span>
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Inteligentna recepcja głosowa stworzona dla medycyny
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 text-[17px] leading-relaxed text-surface-600">
                VoiceLink to inteligentna recepcja głosowa, która automatycznie odbiera połączenia, rozmawia z pacjentami i rejestruje wizyty — bez kolejek, bez oczekiwania i bez nieodebranych telefonów.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-4 text-[17px] leading-relaxed text-surface-600">
                System rozumie naturalny język pacjentów, dopasowuje odpowiednie specjalizacje i integruje się z kalendarzem placówki, aby w czasie rzeczywistym sprawdzić dostępność i zarezerwować termin.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-4 text-[17px] leading-relaxed text-surface-600">
                Działa 24/7, obsługuje wiele połączeń jednocześnie i odciąża recepcję, pozwalając zespołowi skupić się na pacjentach na miejscu.
              </p>
            </FadeIn>
          </div>

          {/* Image */}
          <FadeIn delay={0.2} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-200/30 via-accent-200/20 to-transparent blur-2xl pointer-events-none" />
              <Image
                src="/images/telefon.png"
                alt="VoiceLink — inteligentna recepcja głosowa"
                width={500}
                height={600}
                className="relative w-full h-auto"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
