import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { HeroSection } from "@/components/sections/hero-section";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { generateFAQSchema } from "@/lib/schema";
import { faqItems, getFAQByCategory } from "@/content/faq";

export const metadata: Metadata = generatePageMetadata({
  title: "FAQ — Najczęściej zadawane pytania",
  description:
    "Odpowiedzi na najczęściej zadawane pytania o VoiceLink — produkt, wdrożenie, bezpieczeństwo, cennik i więcej.",
  path: "/faq",
  keywords: [
    "VoiceLink FAQ",
    "AI recepcja pytania",
    "voicebot medyczny pytania",
  ],
});

export default function FAQPage() {
  const productFAQ = getFAQByCategory("product");
  const implementationFAQ = getFAQByCategory("implementation");
  const securityFAQ = getFAQByCategory("security");
  const pricingFAQ = getFAQByCategory("pricing");

  return (
    <>
      <JsonLd data={generateFAQSchema(faqItems)} />

      <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} />

      <HeroSection
        badge="FAQ"
        title="Najczęściej zadawane"
        highlight="pytania"
        description="Odpowiedzi na pytania, które najczęściej słyszymy od właścicieli, managerów i osób decyzyjnych w placówkach medycznych."
        centered
      />

      <FAQAccordion
        items={productFAQ}
        title="O produkcie"
        background="light"
      />

      <FAQAccordion
        items={implementationFAQ}
        title="O wdrożeniu"
      />

      <FAQAccordion
        items={securityFAQ}
        title="O bezpieczeństwie"
        background="light"
      />

      <FAQAccordion items={pricingFAQ} title="O cenniku" />

      <CTASection
        title="Nie znalazłeś odpowiedzi?"
        description="Skontaktuj się z nami — chętnie odpowiemy na Twoje pytanie osobiście."
        primaryCTA={{ text: "Skontaktuj się", href: "/kontakt" }}
        secondaryCTA={{ text: "Umów demo", href: "/demo" }}
      />
    </>
  );
}
