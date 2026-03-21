import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./utils";

interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  keywords = [],
  ogImage = "/images/og/default.jpg",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "" ? `${SITE_NAME} — Inteligentna Recepcja Głosowa AI` : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "AI recepcja",
      "inteligentna recepcja głosowa",
      "voicebot medyczny",
      "VoiceLink",
      ...keywords,
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
