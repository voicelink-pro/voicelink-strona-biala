import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { AboutProduct } from "@/components/sections/about-product";
import { JsonLd } from "@/components/json-ld";
import { generateProductSchema, generateFAQSchema } from "@/lib/schema";
import { faqItems } from "@/content/faq";

const ProblemSolution = dynamic(() => import("@/components/sections/problem-solution").then((m) => m.ProblemSolution));
const FeaturesGrid = dynamic(() => import("@/components/sections/features-grid").then((m) => m.FeaturesGrid));
const IntegrationsGrid = dynamic(() => import("@/components/sections/integrations-grid").then((m) => m.IntegrationsGrid));
const SecurityHighlights = dynamic(() => import("@/components/sections/security-highlights").then((m) => m.SecurityHighlights));
const IndustryCards = dynamic(() => import("@/components/sections/industry-cards").then((m) => m.IndustryCards));
const FAQAccordion = dynamic(() => import("@/components/sections/faq-accordion").then((m) => m.FAQAccordion));
const ContactSection = dynamic(() => import("@/components/sections/contact-section").then((m) => m.ContactSection));

const homepageFAQ = faqItems;

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/babcia.jpg"
        type="image/jpeg"
      />
      <JsonLd data={generateProductSchema()} />
      <JsonLd data={generateFAQSchema(homepageFAQ)} />

      <HeroSection
        badge="AI Recepcja Głosowa dla Medycyny"
        title="Inteligentny system obsługi pacjentów 24/7"
        description="Dedykowane rozwiązanie AI budowane pod Twoją placówkę. Odbiera połączenia, umawia wizyty i obsługuje pacjentów — 24/7, bez kolejek na linii. To nie gotowy voicebot — to infrastruktura dopasowana do Ciebie."
        primaryCTA={{ text: "Umów bezpłatne demo", href: "/demo" }}
        secondaryCTA={{ text: "Jak to działa", href: "/jak-to-dziala" }}
        image={{
          src: "/images/babcia.jpg",
          alt: "VoiceLink — inteligentny system obsługi pacjentów AI",
        }}
        phone="+48 732 098 417"
      />

      <TrustBar />

      <AboutProduct />

      <ProblemSolution />

      <FeaturesGrid />

      <IntegrationsGrid />

      <SecurityHighlights />

      <IndustryCards />

      <ContactSection />

      <FAQAccordion
        items={homepageFAQ}
        title="Najczęściej zadawane pytania"
        description="Odpowiedzi na pytania, które najczęściej słyszymy od właścicieli i managerów placówek medycznych."
        background="light"
      />
    </>
  );
}
