import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { integrations } from "@/content/integrations";
import { blogPosts } from "@/content/blog";

/**
 * Statyczne daty `lastModified` per-URL.
 * Aktualizuj tylko wtedy, gdy realnie zmienia się treść danej strony.
 * Dynamiczne `new Date()` przy każdym buildzie sygnalizuje Google spam-signal
 * i powoduje, że <lastmod> jest ignorowane dla całej witryny.
 */

const NEW_PAGES_DATE = "2026-05-22"; // dodane: bezpieczenstwo, inteligentne-przypomnienia, chatbot-voicelink, panel update
const LAST_GENERAL_UPDATE = "2026-05-15"; // ogólny refresh innych stron
const LEGAL_PAGES_DATE = "2025-09-01";

interface StaticPage {
  url: string;
  lastModified: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: StaticPage[] = [
    { url: SITE_URL, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "weekly", priority: 1.0 },

    // Usługi
    { url: `${SITE_URL}/uslugi`, lastModified: NEW_PAGES_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/uslugi/recepcjonistka-ai`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/uslugi/automatyzacja-rozmow`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/uslugi/rezerwacje-online`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/uslugi/obsluga-klienta-247`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/uslugi/inteligentne-przypomnienia`, lastModified: NEW_PAGES_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/uslugi/chatbot-voicelink`, lastModified: NEW_PAGES_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/uslugi/panel-voicelink-center`, lastModified: NEW_PAGES_DATE, changeFrequency: "monthly", priority: 0.8 },

    // Jak to działa
    { url: `${SITE_URL}/funkcje`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/jak-to-dziala`, lastModified: NEW_PAGES_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/jak-to-dziala/proces`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/jak-to-dziala/bezpieczenstwo`, lastModified: NEW_PAGES_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/technologia-ai`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.7 },

    // Branże
    { url: `${SITE_URL}/branze`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/branze/przychodnie`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/branze/kliniki`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/branze/gabinety-lekarskie`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/branze/gabinety-stomatologiczne`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/branze/gabinety-specjalistyczne`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/branze/centra-medyczne`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.7 },

    // Integracje
    { url: `${SITE_URL}/integracje`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.8 },

    // Cennik & Kalkulator
    { url: `${SITE_URL}/cennik`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/plany-cenowe`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/kalkulator-oszczednosci`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.7 },

    // Firma
    { url: `${SITE_URL}/o-nas`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/kontakt`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/demo`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "monthly", priority: 0.9 },

    // Treści
    { url: `${SITE_URL}/faq`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: LAST_GENERAL_UPDATE, changeFrequency: "weekly", priority: 0.7 },

    // Prawne
    { url: `${SITE_URL}/polityka-prywatnosci`, lastModified: LEGAL_PAGES_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/regulamin`, lastModified: LEGAL_PAGES_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified: LEGAL_PAGES_DATE, changeFrequency: "yearly", priority: 0.3 },
  ];

  const integrationPages = integrations.map((integration) => ({
    url: `${SITE_URL}/integracje/${integration.slug}`,
    lastModified: LAST_GENERAL_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const uniqueBlogPages = blogPosts
    .filter((post, index, self) => self.findIndex((p) => p.slug === post.slug) === index)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...integrationPages, ...uniqueBlogPages];
}
