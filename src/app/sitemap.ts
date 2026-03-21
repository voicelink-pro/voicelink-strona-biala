import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { integrations } from "@/content/integrations";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },

    // Usługi
    { url: `${SITE_URL}/uslugi`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/uslugi/recepcjonistka-ai`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/uslugi/automatyzacja-rozmow`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/uslugi/rezerwacje-online`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/uslugi/obsluga-klienta-247`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/uslugi/panel-voicelink-center`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },

    // Jak to działa
    { url: `${SITE_URL}/funkcje`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/jak-to-dziala`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/jak-to-dziala/proces`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/technologia-ai`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },

    // Branże (statyczne strony)
    { url: `${SITE_URL}/branze`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/branze/przychodnie`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/branze/kliniki`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/branze/gabinety-lekarskie`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/branze/gabinety-stomatologiczne`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/branze/gabinety-specjalistyczne`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/branze/centra-medyczne`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },

    // Integracje
    { url: `${SITE_URL}/integracje`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },

    // Cennik & Kalkulator
    { url: `${SITE_URL}/cennik`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/plany-cenowe`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/kalkulator-oszczednosci`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },

    // Firma
    { url: `${SITE_URL}/o-nas`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE_URL}/kontakt`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/demo`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },

    // Treści
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },

    // Prawne
    { url: `${SITE_URL}/polityka-prywatnosci`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE_URL}/regulamin`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const integrationPages = integrations.map((integration) => ({
    url: `${SITE_URL}/integracje/${integration.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const uniqueBlogPages = blogPosts
    .filter((post, index, self) => self.findIndex((p) => p.slug === post.slug) === index)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...integrationPages, ...uniqueBlogPages];
}
