import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    unoptimized: true,
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
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://tagmanager.google.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://*.clarity.ms https://connect.facebook.net",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https: https://www.facebook.com",
            "font-src 'self' data:",
            "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://*.clarity.ms https://*.facebook.com https://connect.facebook.net",
            "frame-src https://www.googletagmanager.com https://consentcdn.cookiebot.com",
          ].join("; ") + ";",
        },
      ],
    },
  ],
};

export default nextConfig;
