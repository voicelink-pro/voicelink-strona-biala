import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HeroSection } from "@/components/sections/hero-section";
import { CTASection } from "@/components/sections/cta-section";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { integrations, getIntegrationBySlug } from "@/content/integrations";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return integrations.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const integration = getIntegrationBySlug(slug);
  if (!integration) return {};

  return generatePageMetadata({
    title: integration.metaTitle,
    description: integration.metaDescription,
    path: `/integracje/${slug}`,
    keywords: integration.keywords,
  });
}

export default async function IntegrationPage({ params }: PageProps) {
  const { slug } = await params;
  const integration = getIntegrationBySlug(slug);
  if (!integration) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Integracje", href: "/integracje" },
          { name: integration.name, href: `/integracje/${slug}` },
        ]}
      />

      <HeroSection
        badge="Integracja"
        title={integration.name}
        description={integration.description}
        primaryCTA={{ text: "Umów demo", href: "/demo" }}
        secondaryCTA={{ text: "Wszystkie integracje", href: "/integracje" }}
      />

      <Section background="light">
        <Container size="narrow">
          <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl mb-8">
            Funkcje integracji
          </h2>
          <ul className="space-y-4">
            {integration.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-accent-600 shrink-0" />
                <span className="text-surface-700">{feature}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section background="white">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-primary-950 mb-8">
            Inne integracje
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations
              .filter((i) => i.slug !== slug)
              .map((i) => (
                <Link key={i.slug} href={`/integracje/${i.slug}`}>
                  <Button variant="outline" size="sm">
                    {i.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
