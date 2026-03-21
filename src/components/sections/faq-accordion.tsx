"use client";

import { Container, Section } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { trackFAQExpand } from "@/lib/analytics";
import type { FAQItem } from "@/types/content";

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  description?: string;
  background?: "white" | "light";
}

export function FAQAccordion({
  items,
  title = "Najczęściej zadawane pytania",
  description,
  background = "white",
}: FAQAccordionProps) {
  const accordionItems = items.map((item, i) => ({
    id: `faq-${i}`,
    trigger: item.question,
    content: item.answer,
  }));

  return (
    <Section background={background}>
      <Container size="narrow">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-surface-600">{description}</p>
          )}
        </div>

        <Accordion
          items={accordionItems}
          onExpand={(trigger) => trackFAQExpand(trigger)}
        />
      </Container>
    </Section>
  );
}
