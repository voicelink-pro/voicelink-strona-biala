"use client";

import { useCallback } from "react";
import { trackCTAClick, trackFormStart, trackFormSubmit, trackDemoRequest } from "@/lib/analytics";

export function useAnalytics() {
  const ctaClick = useCallback(
    (ctaText: string, ctaLocation: string, ctaDestination: string) => {
      trackCTAClick(ctaText, ctaLocation, ctaDestination);
    },
    []
  );

  const formStart = useCallback(
    (formName: string, formLocation: string) => {
      trackFormStart(formName, formLocation);
    },
    []
  );

  const formSubmit = useCallback(
    (formName: string, formLocation: string, success: boolean) => {
      trackFormSubmit(formName, formLocation, success);
    },
    []
  );

  const demoRequest = useCallback(
    (industry?: string, companySize?: string) => {
      trackDemoRequest(industry, companySize);
    },
    []
  );

  return { ctaClick, formStart, formSubmit, demoRequest };
}
