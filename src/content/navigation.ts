export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    label: "Usługi",
    href: "/uslugi/recepcjonistka-ai",
    children: [
      {
        label: "Recepcjonistka AI",
        href: "/uslugi/recepcjonistka-ai",
        description: "Wirtualna recepcjonistka 24/7",
        icon: "Mic",
      },
      {
        label: "Automatyzacja rozmów",
        href: "/uslugi/automatyzacja-rozmow",
        description: "Inteligentna obsługa połączeń",
        icon: "PhoneCall",
      },
      {
        label: "Rezerwacje online",
        href: "/uslugi/rezerwacje-online",
        description: "Automatyczne umawianie wizyt",
        icon: "CalendarCheck",
      },
      {
        label: "Obsługa klienta 24/7",
        href: "/uslugi/obsluga-klienta-247",
        description: "Bez przerw i dni wolnych",
        icon: "Clock",
      },
      {
        label: "Panel VoiceLink Center",
        href: "/uslugi/panel-voicelink-center",
        description: "Zaawansowany panel analityczny",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    label: "Dla placówek",
    href: "/branze",
    children: [
      {
        label: "Przychodnie i kliniki",
        href: "/branze/przychodnie",
        description: "POZ, specjalistyczne, wieloprofilowe",
        icon: "Building2",
      },
      {
        label: "Gabinety lekarskie",
        href: "/branze/gabinety-lekarskie",
        description: "Lekarze rodzinni, interniści",
        icon: "Heart",
      },
      {
        label: "Gabinety stomatologiczne",
        href: "/branze/gabinety-stomatologiczne",
        description: "Dentyści, ortodonci, chirurdzy",
        icon: "Smile",
      },
      {
        label: "Centra medyczne",
        href: "/branze/centra-medyczne",
        description: "Duże placówki, szpitale, NZOZ",
        icon: "Hospital",
      },
      {
        label: "Gabinety specjalistyczne",
        href: "/branze/placowki-specjalistyczne",
        description: "Okuliści, dermatolodzy, kardiolodzy",
        icon: "Eye",
      },
    ],
  },
  {
    label: "Jak to działa",
    href: "/jak-to-dziala",
    children: [
      {
        label: "Funkcje",
        href: "/funkcje",
        description: "Możliwości naszego AI",
        icon: "Zap",
      },
      {
        label: "Proces",
        href: "/jak-to-dziala/proces",
        description: "Proces krok po kroku",
        icon: "FileText",
      },
      {
        label: "Integracje",
        href: "/integracje",
        description: "Systemy medyczne",
        icon: "Plug",
      },
      {
        label: "Technologia AI",
        href: "/technologia-ai",
        description: "Jak działa nasza sztuczna inteligencja",
        icon: "Cpu",
      },
      {
        label: "Demo",
        href: "/demo",
        description: "Zobacz AI w akcji",
        icon: "Play",
      },
    ],
  },
  {
    label: "Cennik",
    href: "/cennik",
    children: [
      {
        label: "Kalkulator oszczędności",
        href: "/kalkulator-oszczednosci",
        description: "Oblicz ile zaoszczędzisz",
        icon: "Calculator",
      },
      {
        label: "Plany cenowe",
        href: "/plany-cenowe",
        description: "Indywidualny cennik wdrożenia",
        icon: "Tag",
      },
    ],
  },
  {
    label: "O nas",
    href: "/o-nas",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
  },
];

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterPage {
  label: string;
  href: string;
  sections?: FooterLink[];
}

export interface FooterColumn {
  title: string;
  pages: FooterPage[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Usługi",
    pages: [
      {
        label: "Recepcjonistka AI",
        href: "/uslugi/recepcjonistka-ai",
        sections: [
          { label: "Ile połączeń tracisz?", href: "/uslugi/recepcjonistka-ai#problem" },
          { label: "Typy połączeń", href: "/uslugi/recepcjonistka-ai#typy-polaczen" },
          { label: "Dostępność 24/7", href: "/uslugi/recepcjonistka-ai#dostepnosc" },
          { label: "Jakość rozmowy", href: "/uslugi/recepcjonistka-ai#jakosc" },
          { label: "Wsparcie zespołu", href: "/uslugi/recepcjonistka-ai#wsparcie-zespolu" },
          { label: "Inteligentny routing", href: "/uslugi/recepcjonistka-ai#routing" },
          { label: "Zbieranie danych", href: "/uslugi/recepcjonistka-ai#zbieranie-danych" },
          { label: "Naturalny głos", href: "/uslugi/recepcjonistka-ai#glos" },
          { label: "Raportowanie", href: "/uslugi/recepcjonistka-ai#raportowanie" },
        ],
      },
      {
        label: "Automatyzacja rozmów",
        href: "/uslugi/automatyzacja-rozmow",
        sections: [
          { label: "Co zautomatyzować?", href: "/uslugi/automatyzacja-rozmow#procesy" },
          { label: "Drzewko decyzji", href: "/uslugi/automatyzacja-rozmow#drzewko-decyzji" },
          { label: "Rezultaty", href: "/uslugi/automatyzacja-rozmow#rezultaty" },
        ],
      },
      {
        label: "Rezerwacje online",
        href: "/uslugi/rezerwacje-online",
        sections: [
          { label: "Co obejmuje?", href: "/uslugi/rezerwacje-online#co-obejmuje" },
          { label: "Potwierdzenia SMS", href: "/uslugi/rezerwacje-online#potwierdzenia" },
          { label: "Integracje", href: "/uslugi/rezerwacje-online#integracje" },
          { label: "Korzyści", href: "/uslugi/rezerwacje-online#korzysci" },
        ],
      },
      {
        label: "Obsługa klienta 24/7",
        href: "/uslugi/obsluga-klienta-247",
        sections: [
          { label: "Dostępność", href: "/uslugi/obsluga-klienta-247#dostepnosc" },
          { label: "Tematy rozmów", href: "/uslugi/obsluga-klienta-247#tematy" },
          { label: "Eskalacja", href: "/uslugi/obsluga-klienta-247#eskalacja" },
          { label: "Baza wiedzy", href: "/uslugi/obsluga-klienta-247#baza-wiedzy" },
          { label: "Porównanie", href: "/uslugi/obsluga-klienta-247#porownanie" },
        ],
      },
      {
        label: "Panel VoiceLink Center",
        href: "/uslugi/panel-voicelink-center",
        sections: [
          { label: "Funkcje panelu", href: "/uslugi/panel-voicelink-center#funkcje" },
          { label: "Interfejs", href: "/uslugi/panel-voicelink-center#interfejs" },
          { label: "Analityka", href: "/uslugi/panel-voicelink-center#analityka" },
          { label: "Tickety live", href: "/uslugi/panel-voicelink-center#tickety" },
          { label: "Tematy rozmów", href: "/uslugi/panel-voicelink-center#tematy-rozmow" },
          { label: "Trendy", href: "/uslugi/panel-voicelink-center#trendy" },
          { label: "ROI", href: "/uslugi/panel-voicelink-center#roi" },
        ],
      },
    ],
  },
  {
    title: "Dla placówek",
    pages: [
      {
        label: "Przychodnie i kliniki",
        href: "/branze/przychodnie",
        sections: [
          { label: "Wyzwania rejestracji", href: "/branze/przychodnie#wyzwania" },
        ],
      },
      {
        label: "Gabinety lekarskie",
        href: "/branze/gabinety-lekarskie",
        sections: [
          { label: "Wyzwania gabinetu", href: "/branze/gabinety-lekarskie#wyzwania" },
        ],
      },
      {
        label: "Gabinety stomatologiczne",
        href: "/branze/gabinety-stomatologiczne",
        sections: [
          { label: "Specyfika stomatologii", href: "/branze/gabinety-stomatologiczne#specyfika" },
        ],
      },
      {
        label: "Centra medyczne",
        href: "/branze/centra-medyczne",
        sections: [
          { label: "Skala i wymiary", href: "/branze/centra-medyczne#skala" },
        ],
      },
      {
        label: "Gabinety specjalistyczne",
        href: "/branze/placowki-specjalistyczne",
        sections: [
          { label: "Kwalifikacja pacjentów", href: "/branze/placowki-specjalistyczne#wstepna-kwalifikacja" },
          { label: "Specjalności", href: "/branze/placowki-specjalistyczne#specjalnosci" },
        ],
      },
    ],
  },
  {
    title: "Jak to działa",
    pages: [
      {
        label: "Funkcje",
        href: "/funkcje",
        sections: [
          { label: "Dostępność 24/7", href: "/funkcje#dostepnosc-247" },
          { label: "Wielokanałowość", href: "/funkcje#wielokanalowosc" },
          { label: "Rezerwacje AI", href: "/funkcje#rezerwacje-ai" },
          { label: "SMS", href: "/funkcje#sms" },
          { label: "Baza wiedzy", href: "/funkcje#baza-wiedzy" },
          { label: "Naturalny głos", href: "/funkcje#naturalny-glos" },
          { label: "Przekierowanie", href: "/funkcje#przekierowanie" },
          { label: "Wielojęzyczność", href: "/funkcje#wielojezycznosc" },
        ],
      },
      {
        label: "Proces wdrożenia",
        href: "/jak-to-dziala/proces",
        sections: [
          { label: "Krok po kroku", href: "/jak-to-dziala/proces#krok-po-kroku" },
          { label: "Wdrożenie", href: "/jak-to-dziala/proces#wdrozenie" },
          { label: "Efekt po wdrożeniu", href: "/jak-to-dziala/proces#efekt-wdrozenia" },
        ],
      },
      {
        label: "Integracje",
        href: "/integracje",
        sections: [
          { label: "Systemy", href: "/integracje#systemy" },
          { label: "Proces integracji", href: "/integracje#proces-integracji" },
          { label: "Bezpieczeństwo", href: "/integracje#bezpieczenstwo" },
        ],
      },
      {
        label: "Technologia AI",
        href: "/technologia-ai",
        sections: [
          { label: "Koniec IVR", href: "/technologia-ai#koniec-ivr" },
          { label: "Jak AI działa", href: "/technologia-ai#jak-dziala" },
          { label: "Automatyzacje", href: "/technologia-ai#automatyzacje" },
          { label: "Naturalny głos", href: "/technologia-ai#naturalny-glos" },
        ],
      },
      {
        label: "Demo",
        href: "/demo",
        sections: [
          { label: "Co zobaczysz?", href: "/demo#co-zobaczysz" },
          { label: "Formularz demo", href: "/demo#demo-form" },
        ],
      },
    ],
  },
  {
    title: "Cennik",
    pages: [
      {
        label: "Cennik",
        href: "/cennik",
        sections: [
          { label: "Narzędzia", href: "/cennik#narzedzia" },
          { label: "Model cenowy", href: "/cennik#model-cenowy" },
          { label: "Dlaczego warto", href: "/cennik#dlaczego-warto" },
        ],
      },
      {
        label: "Kalkulator oszczędności",
        href: "/kalkulator-oszczednosci",
        sections: [
          { label: "Dlaczego automatyzacja?", href: "/kalkulator-oszczednosci#dlaczego-automatyzacja" },
          { label: "Źródła oszczędności", href: "/kalkulator-oszczednosci#zrodla-oszczednosci" },
        ],
      },
      {
        label: "Plany cenowe",
        href: "/plany-cenowe",
        sections: [
          { label: "Porównanie", href: "/plany-cenowe#porownanie" },
          { label: "Dlaczego warto?", href: "/plany-cenowe#dlaczego-warto" },
        ],
      },
    ],
  },
  {
    title: "Firma",
    pages: [
      {
        label: "O nas",
        href: "/o-nas",
        sections: [
          { label: "Misja", href: "/o-nas#misja" },
          { label: "Co nas wyróżnia", href: "/o-nas#co-nas-wyroznia" },
        ],
      },
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Kontakt",
        href: "/kontakt",
      },
      {
        label: "FAQ",
        href: "/faq",
      },
    ],
  },
  {
    title: "Prawne",
    pages: [
      { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
      { label: "Regulamin", href: "/regulamin" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];
