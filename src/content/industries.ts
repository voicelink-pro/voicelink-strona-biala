import type { Industry } from "@/types/content";

export const industries: Industry[] = [
  {
    slug: "przychodnie",
    name: "Przychodnie",
    icon: "Stethoscope",
    shortDescription:
      "Automatyzacja obsługi telefonicznej w przychodniach POZ i specjalistycznych.",
    description:
      "VoiceLink pomaga przychodniom POZ i specjalistycznym obsługiwać dziesiątki telefonów dziennie bez angażowania dodatkowego personelu. AI odbiera połączenia, umawia wizyty i odpowiada na najczęstsze pytania pacjentów.",
    heroTitle: "AI Recepcja dla Przychodni",
    heroDescription:
      "Zautomatyzuj obsługę telefoniczną swojej przychodni. VoiceLink odbiera połączenia, umawia wizyty i odpowiada na pytania pacjentów — 24/7, bez kolejek na linii.",
    problems: [
      "Przeciążona recepcja i nieodebrane połączenia",
      "Kolejki telefoniczne frustrujące pacjentów",
      "Powtarzalne pytania zajmujące czas personelu",
      "Brak możliwości rejestracji poza godzinami pracy",
    ],
    benefits: [
      {
        title: "Zero nieodebranych połączeń",
        description:
          "AI odbiera każde połączenie — nawet w godzinach szczytu i po zamknięciu.",
      },
      {
        title: "Automatyczne umawianie wizyt",
        description:
          "Pacjenci umawiają wizyty telefonicznie bez czekania na połączenie z recepcją.",
      },
      {
        title: "Odciążona recepcja",
        description:
          "Personel skupia się na pacjentach w placówce, zamiast spędzać godziny przy telefonie.",
      },
      {
        title: "Oszczędność kosztów",
        description:
          "Redukcja kosztów obsługi telefonicznej nawet o 60% bez obniżenia jakości.",
      },
    ],
    stats: [
      { value: "85%", label: "połączeń obsłużonych automatycznie" },
      { value: "60%", label: "redukcja kosztów recepcji" },
      { value: "24/7", label: "dostępność dla pacjentów" },
    ],
    keywords: [
      "AI recepcja przychodnia",
      "voicebot przychodnia",
      "automatyzacja recepcji przychodnia",
      "obsługa telefoniczna przychodnia AI",
    ],
    metaTitle: "AI Recepcja dla Przychodni — VoiceLink",
    metaDescription:
      "Zautomatyzuj obsługę telefoniczną przychodni z VoiceLink. AI odbiera połączenia, umawia wizyty i obsługuje pacjentów 24/7.",
  },
  {
    slug: "kliniki",
    name: "Kliniki",
    icon: "Building2",
    shortDescription:
      "Profesjonalna obsługa telefoniczna AI dla klinik prywatnych i specjalistycznych.",
    description:
      "VoiceLink zapewnia klinikom prywatnym premium obsługę telefoniczną na miarę ich wizerunku. Inteligentna recepcja głosowa obsługuje pacjentów z najwyższym standardem.",
    heroTitle: "AI Recepcja dla Klinik",
    heroDescription:
      "Zapewnij pacjentom Twojej kliniki obsługę telefoniczną na najwyższym poziomie. VoiceLink obsługuje połączenia profesjonalnie i spójnie z wizerunkiem Twojej marki.",
    problems: [
      "Utrata potencjalnych pacjentów przez nieodebrane telefony",
      "Niespójny poziom obsługi telefonicznej",
      "Wysokie koszty utrzymania rozbudowanej recepcji",
      "Brak skalowalności obsługi w sezonie szczytu",
    ],
    benefits: [
      {
        title: "Premium obsługa pacjentów",
        description:
          "AI zapewnia spójny, profesjonalny poziom rozmowy przy każdym połączeniu.",
      },
      {
        title: "Skalowalność bez limitów",
        description:
          "Obsłuż 10 lub 1000 połączeń dziennie bez dodatkowego personelu.",
      },
      {
        title: "Integracja z systemami kliniki",
        description:
          "Połączenie z kalendarzem, CRM i systemami rezerwacyjnymi kliniki.",
      },
      {
        title: "Pełna kontrola i raportowanie",
        description:
          "Dokładne dane o każdym połączeniu, powodach kontaktu i obsłużonych sprawach.",
      },
    ],
    stats: [
      { value: "95%", label: "satysfakcji pacjentów" },
      { value: "3x", label: "więcej obsłużonych połączeń" },
      { value: "<30s", label: "średni czas odpowiedzi" },
    ],
    keywords: [
      "AI recepcja klinika",
      "voicebot klinika prywatna",
      "obsługa telefoniczna klinika AI",
      "inteligentna recepcja klinika",
    ],
    metaTitle: "AI Recepcja dla Klinik Prywatnych — VoiceLink",
    metaDescription:
      "Premium obsługa telefoniczna AI dla klinik prywatnych. VoiceLink zapewnia profesjonalną recepcję głosową 24/7.",
  },
  {
    slug: "gabinety-stomatologiczne",
    name: "Gabinety stomatologiczne",
    icon: "Smile",
    shortDescription:
      "AI recepcja dla gabinetów stomatologicznych — wizyty, przypomnienia, pytania.",
    description:
      "VoiceLink pomaga gabinetom stomatologicznym skutecznie zarządzać rejestracją pacjentów, przypomnieniami o wizytach i odpowiadaniem na pytania o zabiegi.",
    heroTitle: "AI Recepcja dla Gabinetów Stomatologicznych",
    heroDescription:
      "Usprawnij rejestrację pacjentów w gabinecie stomatologicznym. VoiceLink automatyzuje umawianie wizyt, odpowiada na pytania o zabiegi i wysyła przypomnienia.",
    problems: [
      "Recepcja zajęta obsługą pacjentów w gabinecie",
      "Dużo pytań o ceny i dostępność zabiegów",
      "Brak przypomnień powodujący no-shows",
      "Trudność w zarządzaniu wieloma lekarzami i grafikami",
    ],
    benefits: [
      {
        title: "Mniej nieobecności pacjentów",
        description:
          "Automatyczne przypomnienia o wizytach redukują no-shows nawet o 40%.",
      },
      {
        title: "Informacje o zabiegach 24/7",
        description:
          "Pacjenci mogą dowiedzieć się o zabiegach, cenach i przygotowaniu o każdej porze.",
      },
      {
        title: "Sprawna rejestracja",
        description:
          "AI umawia wizyty do konkretnych lekarzy, uwzględniając rodzaj zabiegu.",
      },
      {
        title: "Więcej czasu na pacjentów",
        description:
          "Personel koncentruje się na opiece w gabinecie, nie na telefonach.",
      },
    ],
    stats: [
      { value: "40%", label: "mniej nieobecności pacjentów" },
      { value: "70%", label: "pytań obsłużonych automatycznie" },
      { value: "2h", label: "dziennie zaoszczędzone na recepcji" },
    ],
    keywords: [
      "AI recepcja stomatolog",
      "voicebot dentysta",
      "rejestracja gabinet stomatologiczny AI",
      "automatyzacja gabinet stomatologiczny",
    ],
    metaTitle: "AI Recepcja dla Gabinetów Stomatologicznych — VoiceLink",
    metaDescription:
      "Zautomatyzuj rejestrację w gabinecie stomatologicznym. VoiceLink umawia wizyty, przypomina pacjentom i odpowiada na pytania 24/7.",
  },
  {
    slug: "gabinety-lekarskie",
    name: "Gabinety lekarskie",
    icon: "Heart",
    shortDescription:
      "Inteligentna recepcja AI dla gabinetów lekarzy rodzinnych i internistów.",
    description:
      "VoiceLink pomaga gabinetom lekarskim automatyzować rejestrację pacjentów, udzielać informacji o godzinach przyjęć i odpowiadać na najczęstsze pytania — bez obciążania personelu.",
    heroTitle: "AI Recepcja dla Gabinetów Lekarskich",
    heroDescription:
      "Zautomatyzuj obsługę telefoniczną swojego gabinetu. VoiceLink odbiera połączenia, umawia wizyty i odpowiada na pytania pacjentów — 24/7, bez zatrudniania dodatkowej recepcji.",
    problems: [
      "Lekarz sam odbiera telefony między wizytami",
      "Pacjenci nie mogą się dodzwonić w godzinach szczytu",
      "Brak rejestracji po godzinach pracy gabinetu",
      "Ręczne zarządzanie kalendarzem wizyt",
    ],
    benefits: [
      {
        title: "Automatyczna rejestracja",
        description:
          "Pacjenci umawiają wizyty telefonicznie o każdej porze — bez czekania.",
      },
      {
        title: "Lekarz skupia się na pacjentach",
        description:
          "Koniec z przerywaniem wizyt przez dzwoniący telefon.",
      },
      {
        title: "Informacje o gabinecie 24/7",
        description:
          "Godziny pracy, lokalizacja, wymagane dokumenty — AI odpowie na każde pytanie.",
      },
      {
        title: "Niski koszt wdrożenia",
        description:
          "Tańsze niż zatrudnienie dodatkowej osoby na recepcji.",
      },
    ],
    stats: [
      { value: "80%", label: "połączeń obsłużonych bez personelu" },
      { value: "45%", label: "oszczędności na obsłudze telefonicznej" },
      { value: "24/7", label: "dostępność rejestracji" },
    ],
    keywords: [
      "AI recepcja gabinet lekarski",
      "voicebot lekarz rodzinny",
      "automatyzacja gabinet internista",
      "recepcja AI gabinet",
    ],
    metaTitle: "AI Recepcja dla Gabinetów Lekarskich — VoiceLink",
    metaDescription:
      "Inteligentna recepcja głosowa dla gabinetów lekarskich. VoiceLink automatyzuje rejestrację i obsługę telefoniczną pacjentów 24/7.",
  },
  {
    slug: "centra-medyczne",
    name: "Centra medyczne",
    icon: "Hospital",
    shortDescription:
      "Kompleksowa automatyzacja obsługi telefonicznej dla dużych placówek medycznych.",
    description:
      "VoiceLink obsługuje złożone potrzeby centrów medycznych — od triażu telefonicznego, przez zarządzanie grafikami wielu specjalistów, po integrację z systemami HIS.",
    heroTitle: "AI Recepcja dla Centrów Medycznych",
    heroDescription:
      "Obsłuż setki połączeń dziennie bez rozbudowywania call center. VoiceLink integruje się z systemami HIS, zarządza rejestrami wielu oddziałów i zapewnia profesjonalną obsługę.",
    problems: [
      "Setki połączeń dziennie przeciążające recepcję",
      "Koordynacja grafików wielu oddziałów i specjalistów",
      "Wysokie koszty utrzymania rozbudowanego call center",
      "Nierównomierne obciążenie — szczyty i przestoje",
    ],
    benefits: [
      {
        title: "Skalowalność bez limitów",
        description:
          "Obsłuż 50 lub 500 jednoczesnych połączeń bez rozbudowy infrastruktury.",
      },
      {
        title: "Integracja z HIS",
        description:
          "Połączenie z systemami szpitalnymi, AMMS, mMedica, Clininet i innymi.",
      },
      {
        title: "Wielooddziałowy triaż",
        description:
          "AI kieruje pacjentów do właściwego oddziału na podstawie rozmowy.",
      },
      {
        title: "Redukcja kosztów call center",
        description:
          "Zmniejszenie kosztów obsługi telefonicznej nawet o 70%.",
      },
    ],
    stats: [
      { value: "500+", label: "połączeń dziennie obsługiwanych" },
      { value: "70%", label: "redukcja kosztów call center" },
      { value: "<15s", label: "średni czas odpowiedzi" },
    ],
    keywords: [
      "AI recepcja centrum medyczne",
      "voicebot szpital",
      "automatyzacja call center medyczny",
      "recepcja AI NZOZ",
    ],
    metaTitle: "AI Recepcja dla Centrów Medycznych — VoiceLink",
    metaDescription:
      "Kompleksowa automatyzacja obsługi telefonicznej dla centrów medycznych. VoiceLink obsługuje setki połączeń dziennie z integracją HIS.",
  },
  {
    slug: "placowki-specjalistyczne",
    name: "Placówki specjalistyczne",
    icon: "HeartPulse",
    shortDescription:
      "AI recepcja dla poradni specjalistycznych, centrów diagnostycznych i rehabilitacyjnych.",
    description:
      "VoiceLink obsługuje specyficzne potrzeby placówek specjalistycznych — od kierowania pacjentów do odpowiednich specjalistów, po informowanie o przygotowaniu do badań.",
    heroTitle: "AI Recepcja dla Placówek Specjalistycznych",
    heroDescription:
      "Inteligentna recepcja głosowa dopasowana do specyfiki Twojej placówki specjalistycznej. VoiceLink kieruje pacjentów, informuje o badaniach i zarządza rejestracją.",
    problems: [
      "Złożone ścieżki pacjentów wymagające triażu telefonicznego",
      "Skomplikowane grafiki wielu specjalistów",
      "Pytania o przygotowanie do specjalistycznych badań",
      "Konieczność obsługi skierowań i dokumentacji",
    ],
    benefits: [
      {
        title: "Inteligentny triaż telefoniczny",
        description:
          "AI kieruje pacjentów do właściwego specjalisty na podstawie rozmowy.",
      },
      {
        title: "Informacje o przygotowaniu do badań",
        description:
          "Pacjenci otrzymują dokładne instrukcje przygotowania do każdego badania.",
      },
      {
        title: "Zarządzanie wieloma specjalistami",
        description:
          "VoiceLink obsługuje grafiki wielu lekarzy i rodzajów wizyt jednocześnie.",
      },
      {
        title: "Profesjonalny wizerunek",
        description:
          "Spójna, profesjonalna obsługa buduje zaufanie pacjentów do placówki.",
      },
    ],
    stats: [
      { value: "90%", label: "trafność triażu telefonicznego" },
      { value: "50%", label: "mniej błędnych rejestracji" },
      { value: "24/7", label: "informacje o badaniach" },
    ],
    keywords: [
      "AI recepcja poradnia specjalistyczna",
      "voicebot centrum diagnostyczne",
      "automatyzacja rejestracji specjalista",
      "AI recepcja placówka medyczna",
    ],
    metaTitle: "AI Recepcja dla Placówek Specjalistycznych — VoiceLink",
    metaDescription:
      "Inteligentna recepcja głosowa dla poradni specjalistycznych. VoiceLink automatyzuje triaż, rejestrację i informowanie pacjentów.",
  },
];

export const industryByNavSlug: Record<string, string> = {
  "przychodnie": "przychodnie",
  "gabinety-lekarskie": "gabinety-lekarskie",
  "gabinety-stomatologiczne": "gabinety-stomatologiczne",
  "centra-medyczne": "centra-medyczne",
  "placowki-specjalistyczne": "placowki-specjalistyczne",
};

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
