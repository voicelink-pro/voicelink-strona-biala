"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, ShieldCheck, SmilePlus, PhoneOff, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";
import { trackCTAClick } from "@/lib/analytics";

interface HeroSectionProps {
  badge?: string;
  title: string;
  highlight?: string;
  description: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  centered?: boolean;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  phone?: string;
}

export function HeroSection({
  badge,
  title,
  highlight,
  description,
  primaryCTA,
  secondaryCTA,
  centered = false,
  image,
  phone,
}: HeroSectionProps) {
  const hasImage = !!image;
  const layoutCentered = centered && !hasImage;

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-bg-hero" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary-100/30 blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-100/20 blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Decorative wave — thin on the left, expanding to the right */}
      <svg
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[500px] pointer-events-none"
        viewBox="0 0 900 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Górna linia fali */}
        <path d="M0 250 Q150 150 300 230 T600 200 T900 250" stroke="var(--color-primary-400)" strokeWidth="2.5" opacity="0.18" />
        {/* Wypełnienie z falowym dołem */}
        <path
          d="M0 250 Q150 150 300 230 T600 200 T900 250
             L900 380 Q750 420 600 390 T300 410 T0 370 Z"
          fill="url(#hero-wave-fill)"
        />
        {/* Dodatkowe linie fali */}
        <path d="M0 275 Q200 180 400 260 T800 230 T900 275" stroke="var(--color-primary-300)" strokeWidth="1.5" opacity="0.22" />
        <path d="M0 230 Q180 310 380 245 T750 285 T900 230" stroke="var(--color-accent-400)" strokeWidth="1.2" opacity="0.15" />
        {/* Dolna krawędź — delikatna fala zamykająca */}
        <path d="M0 370 Q150 410 300 390 T600 410 T900 380" stroke="var(--color-primary-300)" strokeWidth="1" opacity="0.1" />
        <defs>
          <linearGradient id="hero-wave-fill" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary-400)" stopOpacity="0" />
            <stop offset="35%" stopColor="var(--color-primary-400)" stopOpacity="0.04" />
            <stop offset="70%" stopColor="var(--color-primary-400)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-primary-300)" stopOpacity="0.18" />
          </linearGradient>
        </defs>
      </svg>

      <Container className="relative">
        <div
          className={
            hasImage
              ? "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              : layoutCentered
                ? "text-center mx-auto max-w-3xl"
                : "max-w-2xl"
          }
        >
          {/* Text content */}
          <div className={hasImage ? "" : ""}>
            {badge && (
              <FadeIn delay={0}>
                <Badge variant="primary" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
                  {badge}
                </Badge>
              </FadeIn>
            )}

            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                {title}
                {highlight && (
                  <>
                    {" "}
                    <span className="text-primary-500">{highlight}</span>
                  </>
                )}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className={`mt-6 text-lg leading-relaxed text-surface-500 sm:text-xl sm:leading-relaxed ${layoutCentered ? "max-w-xl mx-auto" : "max-w-xl"}`}>
                {description}
              </p>
            </FadeIn>

            {(primaryCTA || secondaryCTA) && (
              <FadeIn delay={0.3}>
                <div className={`mt-10 flex flex-wrap gap-3.5 ${layoutCentered ? "justify-center" : ""}`}>
                  {primaryCTA && (
                    <Link
                      href={primaryCTA.href}
                      onClick={() =>
                        trackCTAClick(primaryCTA.text, "hero", primaryCTA.href)
                      }
                    >
                      <Button size="lg" className="shadow-[var(--shadow-glow-primary)] hover:shadow-[0_0_50px_-8px_rgb(100_164_255_/0.4)] transition-shadow duration-300">
                        {primaryCTA.text}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {secondaryCTA && (
                    <Link
                      href={secondaryCTA.href}
                      onClick={() =>
                        trackCTAClick(secondaryCTA.text, "hero", secondaryCTA.href)
                      }
                    >
                      <Button variant="outline" size="lg">
                        {secondaryCTA.text}
                      </Button>
                    </Link>
                  )}
                </div>
              </FadeIn>
            )}

            {phone && (
              <FadeIn delay={0.4}>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100/80">
                    <Phone className="h-4 w-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-xs text-surface-400 font-medium">Przetestuj sam — zadzwoń do naszego asystenta AI</p>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-lg font-bold text-primary-950 hover:text-primary-500 transition-colors tracking-tight"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Image + floating badges */}
          {hasImage && (
            <FadeIn delay={0.3} className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-200/30 via-accent-200/20 to-transparent blur-2xl pointer-events-none" />
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width || 600}
                  height={image.height || 500}
                  className="relative w-full h-auto rounded-2xl"
                  priority
                />

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="absolute -left-4 top-6 sm:-left-8 z-10"
                >
                  <div className="flex items-center gap-2 rounded-xl border border-surface-200/80 bg-white/95 backdrop-blur-sm px-3 py-2 shadow-[var(--shadow-card)]">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                      <PhoneOff className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <span className="text-xs font-semibold text-primary-950 whitespace-nowrap">Zero kolejek</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="absolute -right-4 top-[20%] sm:-right-6 z-10"
                >
                  <div className="flex items-center gap-2 rounded-xl border border-surface-200/80 bg-white/95 backdrop-blur-sm px-3 py-2 shadow-[var(--shadow-card)]">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold text-primary-950 whitespace-nowrap">Naturalny głos</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="absolute -left-4 bottom-[22%] sm:-left-10 z-10"
                >
                  <div className="flex items-center gap-2 rounded-xl border border-surface-200/80 bg-white/95 backdrop-blur-sm px-3 py-2 shadow-[var(--shadow-card)]">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                      <ShieldCheck className="h-3.5 w-3.5 text-violet-600" />
                    </div>
                    <span className="text-xs font-semibold text-primary-950 whitespace-nowrap">RODO & AI Act</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.15, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="absolute -right-4 bottom-8 sm:-right-8 z-10"
                >
                  <div className="flex items-center gap-2 rounded-xl border border-surface-200/80 bg-white/95 backdrop-blur-sm px-3 py-2 shadow-[var(--shadow-card)]">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                      <SmilePlus className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <span className="text-xs font-semibold text-primary-950 whitespace-nowrap">Zadowoleni pacjenci</span>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          )}
        </div>
      </Container>
    </section>
  );
}
