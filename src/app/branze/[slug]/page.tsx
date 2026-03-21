import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { Container, Section } from "@/components/ui/container";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { industries, getIndustryBySlug } from "@/content/industries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return generatePageMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/branze/${slug}`,
    keywords: industry.keywords,
  });
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Branże", href: "/branze" },
          { name: industry.name, href: `/branze/${slug}` },
        ]}
      />

      <HeroSection
        badge={industry.name}
        title={industry.heroTitle}
        description={industry.heroDescription}
        primaryCTA={{ text: "Umów demo", href: "/demo" }}
        secondaryCTA={{ text: "Jak to działa", href: "/jak-to-dziala" }}
      />

      {/* Problems */}
      <Section background="light">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
              Wyzwania, z którymi się mierzysz
            </h2>
            <ul className="mt-8 space-y-4">
              {industry.problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3 text-surface-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                  {problem}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
              Jak VoiceLink pomaga
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {industry.benefits.map(({ title, description }) => (
              <Card key={title} hover>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent-400 mt-0.5 shrink-0" />
                  <div>
                    <CardTitle className="text-base">{title}</CardTitle>
                    <CardDescription className="mt-1">{description}</CardDescription>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section background="dark">
        <Container>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {industry.stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-bold text-primary-300">{value}</div>
                <div className="mt-2 text-sm text-surface-300">{label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Other industries */}
      <Section background="light">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-primary-950 mb-8">
            Inne branże
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {industries
              .filter((i) => i.slug !== slug)
              .map((i) => (
                <Link key={i.slug} href={`/branze/${i.slug}`}>
                  <Button variant="outline" size="sm">
                    {i.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title={`Chcesz wdrożyć VoiceLink w swojej placówce?`}
        description="Każde wdrożenie projektujemy indywidualnie. Umów bezpłatne demo dopasowane do specyfiki Twojej branży."
      />
    </>
  );
}
