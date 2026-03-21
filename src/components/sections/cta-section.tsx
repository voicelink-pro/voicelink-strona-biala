"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";
import { trackCTAClick } from "@/lib/analytics";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export function CTASection({
  title = "Gotowy, aby usprawnić swoją recepcję?",
  description = "Umów bezpłatne demo i zobacz, jak VoiceLink może działać w Twojej placówce. Bez zobowiązań, bez konfiguracji.",
  primaryCTA = { text: "Umów bezpłatne demo", href: "/demo" },
  secondaryCTA = { text: "Skontaktuj się z nami", href: "/kontakt" },
}: CTASectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-surface-200/80 bg-white px-8 py-16 sm:px-16 sm:py-20 text-center shadow-[var(--shadow-card)]">
            <div className="relative">
              <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-lg text-surface-500 max-w-xl mx-auto leading-relaxed">
                {description}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3.5">
                <Link
                  href={primaryCTA.href}
                  onClick={() =>
                    trackCTAClick(primaryCTA.text, "cta-section", primaryCTA.href)
                  }
                >
                  <Button size="lg">
                    {primaryCTA.text}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                {secondaryCTA && (
                  <Link
                    href={secondaryCTA.href}
                    onClick={() =>
                      trackCTAClick(secondaryCTA.text, "cta-section", secondaryCTA.href)
                    }
                  >
                    <Button variant="outline" size="lg">
                      {secondaryCTA.text}
                    </Button>
                  </Link>
                )}
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-surface-400 text-sm">
                <Phone className="h-3.5 w-3.5" />
                <span>Przetestuj recepcję AI:</span>
                <a
                  href="tel:+48732098417"
                  className="text-primary-950 font-medium hover:text-primary-500 transition-colors"
                >
                  +48 732 098 417
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
