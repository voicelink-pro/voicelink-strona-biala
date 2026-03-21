"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, Server, Lock, FileCheck, Eye, Timer, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const securityFeatures = [
  {
    icon: Lock,
    title: "Szyfrowanie end-to-end",
    description: "AES-256 w spoczynku, TLS 1.3 w transmisji. Dane chronione na każdym etapie.",
  },
  {
    icon: Server,
    title: "Infrastruktura w UE",
    description: "Serwery w centrach danych w Unii Europejskiej. Brak transferu poza EOG.",
  },
  {
    icon: Shield,
    title: "Zgodność z RODO",
    description: "Pełna zgodność z GDPR. Umowy DPA, minimalizacja danych, prawo do usunięcia.",
  },
  {
    icon: FileCheck,
    title: "Gotowość na AI Act",
    description: "System projektowany z uwzględnieniem wymogów europejskiego AI Act.",
  },
  {
    icon: Eye,
    title: "Audyty bezpieczeństwa",
    description: "Regularne audyty i testy penetracyjne. Ciągły monitoring infrastruktury.",
  },
  {
    icon: Timer,
    title: "Retencja danych 30 dni",
    description: "Transkrypcje i logi rozmów przechowywane przez 30 dni, po czym automatycznie usuwane. Pełna kontrola nad danymi.",
  },
];

export function SecurityHighlights() {
  return (
    <Section background="light">
      <Container>
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-500 mb-4">
              Bezpieczeństwo
            </span>
            <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
              Bezpieczeństwo na pierwszym miejscu
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
              Dane medyczne wymagają najwyższego poziomu ochrony.
              VoiceLink jest zbudowany z myślą o bezpieczeństwie od podstaw.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          {/* Features list — left */}
          <StaggerContainer className="space-y-5" delay={0.05}>
            {securityFeatures.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 border border-accent-100/50">
                    <Icon className="h-5 w-5 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-950 text-[15px]">{title}</h3>
                    <p className="mt-1.5 text-sm text-surface-500 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}

            <StaggerItem>
              <div className="pt-4">
                <Link href="/faq">
                  <Button variant="outline" size="md">
                    Dowiedz się więcej
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Image — right */}
          <FadeIn delay={0.2}>
            <div className="relative lg:scale-125 lg:origin-center">
              <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-accent-200/20 via-primary-200/10 to-transparent blur-2xl pointer-events-none" />
              <Image
                src="/images/security.png"
                alt="VoiceLink — bezpieczeństwo danych medycznych"
                width={1200}
                height={1200}
                className="relative w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
