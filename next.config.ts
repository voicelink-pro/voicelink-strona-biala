import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    // WebP zamiast AVIF — przy tej samej wadze pliku często lepsza wierność kolorów/szczegółów na zdjęciach.
    formats: ["image/webp"],
    // Pełna skala + duże ekrany / Retina (wcześniej obcięte rozmiary obniżały rozdzielczość dostarczaną do przeglądarki).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Next 16 domyślnie dopuszcza tylko quality 75 — bez tego wyższe `quality` na <Image> są obcinane.
    qualities: [75, 80, 85, 90, 92, 95, 100],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://tagmanager.google.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.clarity.ms",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.clarity.ms",
            "frame-src https://www.googletagmanager.com https://consentcdn.cookiebot.com",
          ].join("; ") + ";",
        },
      ],
    },
  ],
};

export default nextConfig;
