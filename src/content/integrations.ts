import type { Integration } from "@/types/content";

export const integrations: Integration[] = [
  {
    slug: "kalendarz",
    name: "Kalendarze i grafiki",
    icon: "Calendar",
    category: "calendar",
    shortDescription:
      "Integracja z Google Calendar, Outlook i systemami grafikowania placówek medycznych.",
    description:
      "VoiceLink łączy się bezpośrednio z Twoim kalendarzem, widzi dostępne terminy i umawia wizyty w czasie rzeczywistym. Obsługuje Google Calendar, Microsoft Outlook oraz dedykowane systemy grafikowania placówek medycznych.",
    features: [
      "Synchronizacja w czasie rzeczywistym",
      "Automatyczne sprawdzanie dostępności",
      "Umawianie wizyt bez konfliktu terminów",
      "Obsługa wielu kalendarzy lekarzy",
      "Blokowanie terminów po umówieniu",
    ],
    keywords: [
      "integracja AI kalendarz",
      "voicebot google calendar",
      "automatyczne umawianie wizyt kalendarz",
    ],
    metaTitle: "Integracja z Kalendarzem — VoiceLink",
    metaDescription:
      "VoiceLink integruje się z Google Calendar, Outlook i systemami grafikowania. Automatyczne umawianie wizyt w czasie rzeczywistym.",
  },
  {
    slug: "systemy-rezerwacyjne",
    name: "Systemy rezerwacyjne",
    icon: "ClipboardList",
    category: "reservation",
    shortDescription:
      "Połączenie z popularnymi systemami rezerwacji medycznych — ZnanyLekarz, Booksy, Proassist i więcej.",
    description:
      "VoiceLink integruje się z systemami rezerwacji medycznych, z których już korzystasz. Dane o wizytach przepływają automatycznie, bez duplikacji i ręcznego wpisywania.",
    features: [
      "Integracja z ZnanyLekarz",
      "Połączenie z Proassist",
      "Obsługa Booksy i Calendesk",
      "Dwukierunkowa synchronizacja",
      "Brak duplikatów rezerwacji",
    ],
    keywords: [
      "integracja voicebot system rezerwacji",
      "AI znany lekarz integracja",
      "automatyczna rezerwacja wizyt",
    ],
    metaTitle: "Integracja z Systemami Rezerwacyjnymi — VoiceLink",
    metaDescription:
      "VoiceLink integruje się z ZnanyLekarz, Proassist, Booksy i innymi. Automatyczna rezerwacja wizyt bez duplikatów.",
  },
  {
    slug: "telefonia",
    name: "Systemy telefoniczne",
    icon: "Phone",
    category: "telephony",
    shortDescription:
      "Integracja z centralami telefonicznymi, SIP, VoIP i operatorami telekomunikacyjnymi.",
    description:
      "VoiceLink współpracuje z nowoczesnymi systemami telefonicznymi. Obsługuje SIP trunking, VoIP oraz integracje z operatorami telekomunikacyjnymi.",
    features: [
      "SIP trunking",
      "VoIP / WebRTC",
      "Integracja z PBX",
      "Obsługa wielu linii jednocześnie",
    ],
    keywords: [
      "integracja AI telefonia",
      "voicebot SIP",
      "AI centrala telefoniczna",
      "VoIP integracja AI",
    ],
    metaTitle: "Integracja z Telefonią — VoiceLink",
    metaDescription:
      "VoiceLink integruje się z centralami telefonicznymi, SIP, VoIP i PBX.",
  },
  {
    slug: "api",
    name: "API i webhooks",
    icon: "Code",
    category: "api",
    shortDescription:
      "REST API i webhooks do integracji z dowolnym systemem Twojej placówki.",
    description:
      "VoiceLink oferuje dokumentowane REST API i system webhooks, który pozwala na integrację z dowolnym systemem — od ERP, przez własne aplikacje, po systemy raportowania.",
    features: [
      "REST API z pełną dokumentacją",
      "Webhooks na zdarzenia w czasie rzeczywistym",
      "Autoryzacja OAuth 2.0",
      "Rate limiting i monitoring",
      "Sandbox do testów",
    ],
    keywords: [
      "voicelink API",
      "integracja API voicebot",
      "webhooks AI recepcja",
      "REST API recepcja medyczna",
    ],
    metaTitle: "API i Webhooks — VoiceLink",
    metaDescription:
      "REST API i webhooks VoiceLink — integruj inteligentną recepcję z dowolnym systemem Twojej placówki.",
  },
];

export function getIntegrationBySlug(slug: string): Integration | undefined {
  return integrations.find((i) => i.slug === slug);
}
