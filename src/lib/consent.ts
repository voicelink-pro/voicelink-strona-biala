import type { ConsentState } from "@/types/analytics";

const CONSENT_KEY = "voicelink_consent";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setConsent(consent: Omit<ConsentState, "timestamp">) {
  if (typeof window === "undefined") return;

  const state: ConsentState = {
    ...consent,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));

  document.cookie = `voicelink_consent=${encodeURIComponent(JSON.stringify(state))}; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Lax`;

  updateGTMConsent(state);
}

export function updateGTMConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(arguments as unknown as Record<string, unknown>);
    };
  }

  window.gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
}

export function restoreConsent() {
  const existing = getConsent();
  if (existing) {
    updateGTMConsent(existing);
  }
}
