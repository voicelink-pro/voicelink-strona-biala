export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export type AnalyticsEvent =
  | { event: "cta_click"; cta_text: string; cta_location: string; cta_destination: string }
  | { event: "form_start"; form_name: string; form_location: string }
  | { event: "form_submit"; form_name: string; form_location: string; success: boolean }
  | { event: "demo_request"; industry?: string; company_size?: string }
  | { event: "outbound_click"; link_url: string; link_text: string }
  | { event: "scroll_depth"; percent_scrolled: number; page_path: string }
  | { event: "section_view"; section_id: string; page_path: string }
  | { event: "phone_click"; phone_number: string }
  | { event: "email_click"; email_address: string }
  | { event: "faq_expand"; question_text: string };

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}
