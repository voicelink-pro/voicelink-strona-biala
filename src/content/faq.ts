import type { FAQItem } from "@/types/content";

export const faqItems: FAQItem[] = [
  {
    question: "Czy klienci rozpoznają, że rozmawiają z AI?",
    answer:
      "W większości przypadków nie. Nasi agenci AI używają najnowszej technologii syntezy mowy, która brzmi naturalnie i płynnie po polsku. Głos reaguje na kontekst rozmowy, robi naturalne pauzy i dostosowuje ton. Klienci często są zaskoczeni, gdy dowiadują się, że rozmawiali z AI.",
    category: "product",
  },
  {
    question: "Co się dzieje, gdy AI nie zna odpowiedzi?",
    answer:
      "Agent jest zaprogramowany, aby w trudnych sytuacjach grzecznie poinformować, że przekaże sprawę do odpowiedniej osoby. Może zapisać dane kontaktowe klienta i przekazać je Tobie, abyś mógł oddzwonić. Nigdy nie zgaduje ani nie podaje nieprawdziwych informacji.",
    category: "product",
  },
  {
    question: "Czy mogę przetestować przed zakupem?",
    answer:
      "Tak! Oferujemy bezpłatne demo, podczas którego możesz porozmawiać z przykładowym agentem AI i zobaczyć jak działa. Umów się na krótką rozmowę, a pokażemy Ci możliwości systemu dopasowane do Twojej branży.",
    category: "product",
  },
  {
    question: "Ile kosztuje wirtualna recepcja AI?",
    answer:
      "Cena zależy od zakresu funkcji i liczby połączeń. Składa się z jednorazowej opłaty wdrożeniowej oraz miesięcznego abonamentu. W porównaniu do zatrudnienia pracownika oszczędzasz nawet 70% kosztów, a system AI pracuje 24/7 bez urlopów i zwolnień. Skontaktuj się po indywidualną wycenę.",
    category: "pricing",
  },
  {
    question: "Czym VoiceLink różni się od zwykłych voicebotów?",
    answer:
      "VoiceLink to nie gotowy produkt z półki. Każde wdrożenie jest budowane indywidualnie pod konkretną placówkę — od scenariuszy rozmów, przez integrację z Twoim systemem rezerwacyjnym, po ton głosu i logikę działania. To dedykowana infrastruktura AI dopasowana do Twoich procesów, nie uniwersalny bot z gotowym skryptem.",
    category: "product",
  },
  {
    question: "Czy mam wgląd w rozmowy prowadzone przez AI?",
    answer:
      "Tak. W panelu VoiceLink Center masz dostęp do transkrypcji wszystkich rozmów, logów i szczegółowych statystyk. Możesz analizować jakość obsługi, sprawdzać co pacjenci pytają najczęściej i doskonalić działanie agenta.",
    category: "product",
  },
  {
    question: "Jak szybko agent odbiera połączenia?",
    answer:
      "Natychmiast. Agent odbiera każde połączenie w ułamku sekundy — klient nigdy nie usłyszy sygnału zajętości ani nie będzie czekał w kolejce. Może obsługiwać nieograniczoną liczbę połączeń jednocześnie, więc nawet w godzinach szczytu nikt nie zostanie pominięty.",
    category: "product",
  },
  {
    question: "Czy mogę zintegrować z własnym CRM i kalendarzem?",
    answer:
      "Tak! Integrujemy się z popularnymi systemami CRM, kalendarzami Google i Outlook, systemami rezerwacji oraz wieloma innymi narzędziami. Agent może automatycznie dodawać wizyty do kalendarza, tworzyć kontakty w CRM czy wysyłać potwierdzenia SMS. Wszystko konfigurujemy za Ciebie.",
    category: "implementation",
  },
  {
    question: "Czy VoiceLink jest zgodny z RODO?",
    answer:
      "Tak. System jest w pełni zgodny z RODO i przepisami o ochronie danych osobowych. Dane pacjentów są szyfrowane (AES-256), przechowywane na serwerach w UE i przetwarzane wyłącznie w celu realizacji usługi. Podpisujemy umowę powierzenia przetwarzania danych.",
    category: "security",
  },
  {
    question: "Jak zabezpieczone są dane pacjentów?",
    answer:
      "Stosujemy wielowarstwowe zabezpieczenia: szyfrowanie end-to-end połączeń, szyfrowanie AES-256 danych w spoczynku, kontrolę dostępu opartą na rolach oraz regularne audyty bezpieczeństwa. Transkrypcje i logi rozmów przechowujemy przez 30 dni, po czym są automatycznie usuwane.",
    category: "security",
  },
  {
    question: "Czy VoiceLink spełnia wymagania AI Act?",
    answer:
      "Tak. Nasze rozwiązanie jest klasyfikowane jako system AI niskiego ryzyka i spełnia wymogi transparentności — pacjent jest informowany, że rozmawia z asystentem AI. Monitorujemy zmiany regulacyjne i na bieżąco dostosowujemy system do nowych przepisów.",
    category: "security",
  },
];

export function getFAQByCategory(category: FAQItem["category"]): FAQItem[] {
  return faqItems.filter((item) => item.category === category);
}
