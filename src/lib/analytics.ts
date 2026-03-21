import type { AnalyticsEvent } from "@/types/analytics";

export function pushEvent(eventData: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
}

export function trackCTAClick(
  ctaText: string,
  ctaLocation: string,
  ctaDestination: string
) {
  pushEvent({
    event: "cta_click",
    cta_text: ctaText,
    cta_location: ctaLocation,
    cta_destination: ctaDestination,
  });
}

export function trackFormStart(formName: string, formLocation: string) {
  pushEvent({
    event: "form_start",
    form_name: formName,
    form_location: formLocation,
  });
}

export function trackFormSubmit(
  formName: string,
  formLocation: string,
  success: boolean
) {
  pushEvent({
    event: "form_submit",
    form_name: formName,
    form_location: formLocation,
    success,
  });
}

export function trackDemoRequest(industry?: string, companySize?: string) {
  pushEvent({
    event: "demo_request",
    industry,
    company_size: companySize,
  });
}

export function trackOutboundClick(linkUrl: string, linkText: string) {
  pushEvent({
    event: "outbound_click",
    link_url: linkUrl,
    link_text: linkText,
  });
}

export function trackPhoneClick(phoneNumber: string) {
  pushEvent({
    event: "phone_click",
    phone_number: phoneNumber,
  });
}

export function trackEmailClick(emailAddress: string) {
  pushEvent({
    event: "email_click",
    email_address: emailAddress,
  });
}

export function trackFAQExpand(questionText: string) {
  pushEvent({
    event: "faq_expand",
    question_text: questionText,
  });
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WL4FWFZJ";
