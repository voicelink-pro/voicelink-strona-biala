import { SITE_NAME, SITE_URL } from "./utils";
import type { FAQItem } from "@/types/content";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description:
      "Inteligentna recepcja głosowa AI dla placówek medycznych. Automatyczna obsługa telefonów, umawianie wizyt i wsparcie pacjentów.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "kontakt@voicelink.pl",
      availableLanguage: ["Polish", "English"],
    },
    sameAs: [
      "https://www.linkedin.com/company/voicelink-ai",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function generateProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud-based",
    description:
      "Inteligentna recepcja głosowa AI dla placówek medycznych — automatyczna obsługa telefonów, umawianie wizyt, odpowiadanie na pytania pacjentów.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "PLN",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${service.url}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "PL",
    },
    serviceType: "AI Voice Assistant",
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  date: string;
  modifiedDate?: string;
  author: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.modifiedDate || article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
    image: article.image || `${SITE_URL}/images/og/blog-default.jpg`,
  };
}
