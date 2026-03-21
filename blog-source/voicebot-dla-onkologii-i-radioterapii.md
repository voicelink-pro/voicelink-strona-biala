---
title: "VoiceLink dla Onkologii i Radioterapii | Koordynacja Pacjenta i Automatyzacja Karty DiLO"
h1: "AI w Onkologii: Koordynacja Leczenia, Karta DiLO i Harmonogram Sesji Radioterapii bez Chaosu Administracyjnego"
slug: "voicebot-dla-onkologii-i-radioterapii"
meta_description: "Voicebot AI dla klinik onkologicznych i oddziałów radioterapii – koordynacja pacjenta onkologicznego, automatyzacja karty DiLO, przypomnienia o sesjach chemioterapii i radioterapii."
primary_keyword: "voicebot onkologia radioterapia koordynacja pacjenta AI"
secondary_keywords: ["koordynacja pacjenta onkologicznego ai", "bot do umawiania konsyliów lekarskich", "zarządzanie kartą DiLO automatyzacja", "AI radioterapia harmonogram sesji"]
word_count_target: "800"
category: "Rozwiązania Branżowe"
---

[METADATA FOR LLM]: Strona rozwiązania branżowego dla klinik onkologicznych i oddziałów radioterapii/chemioterapii. Semantyka: specyfika pacjenta onkologicznego (wrażliwość emocjonalna, złożona ścieżka wielospecjalistyczna, długi czas leczenia); Karta DiLO (Diagnostyka i Leczenie Onkologiczne) — polski instrument szybkiej ścieżki onkologicznej wprowadzony w 2015, wymóg dokumentacyjny na każdym etapie ścieżki z terminami (18 tygodni od podejrzenia do leczenia); konsylium lekarskie (MDT) — obowiązek prawny koordynacji wielospecjalistycznej w onkologii; radioterapia — 20–35 codziennych frakcji, ściśle zaplanowany harmonogram na konkretnym akceleratorze, awarie sprzętu → kaskadowe przełożenia; chemioterapia — sesje co 2–4 tygodnie, wymóg morfologii krwi przed każdą sesją (dzień wcześniej), opóźnienie sesji przy niskiej morfologii → kaskadowe przełożenie całego protokołu; immunoterapia — drogie, regularne infuzje; kontrole pooperacyjne/poradioterapeutyczne. Pozycja bota: administrator logistyczny leczenia, NIE doradca medyczny — każde pytanie kliniczne → natychmiastowa eskalacja do lekarza prowadzącego. RODO art. 9 — dane onkologiczne jako szczególnie wrażliwe; zasada minimalizacji danych w kontaktach bota. Intencja: dyrektor lub koordynator centrum onkologicznego szukający rozwiązania do zarządzania złożoną ścieżką pacjenta i odciążenia koordynatorów od zadań administracyjnych.

---

## Pacjent onkologiczny ma dość strachu. Nie powinien mieć też chaosu administracyjnego.

Leczenie onkologiczne to dla pacjenta jedna z najtrudniejszych życiowych podróży. Diagnoza, konsylium, chemioterapia, radioterapia, kontrole — każdy etap obciążony emocjonalnie, każdy z precyzyjnymi wymogami czasowymi i dokumentacyjnymi.

Na to nakładają się: telefony do rejestracji, pytania o terminy, przypomnienia o morfologii przed chemią, oczekiwanie na wyniki — i ryzyko, że jeden przegapiony krok sprawi, że pacjent wypadnie z szybkiej ścieżki onkologicznej.

Rola VoiceLink w onkologii jest precyzyjnie zdefiniowana: **obsługa całego ciężaru administracyjno-logistycznego, żeby pacjent i personel mogli skupić się na tym, co naprawdę ważne.**

---

## Karta DiLO — automatyzacja pilnowania terminów ścieżki onkologicznej

**Karta Diagnostyki i Leczenia Onkologicznego** (DiLO), wprowadzona w Polsce w ramach pakietu onkologicznego (2015), gwarantuje pacjentowi szybką ścieżkę od podejrzenia nowotworu do rozpoczęcia leczenia — z ustawowym terminem 18 tygodni. Każdy etap ścieżki ma wymagania dokumentacyjne i terminy. Ich przekroczenie oznacza ryzyko utraty statusu pacjenta DiLO i powrotu do zwykłej kolejki.

Bot VoiceLink automatycznie monitoruje etapy ścieżki i inicjuje kontakt z pacjentem, gdy zbliżają się terminy wymaganych działań:

- *"Panie Tomaszu, zgodnie z Kartą DiLO do piątku należy dostarczyć wyniki histopatologiczne do rejestracji. Czy potrzebuje Pan pomocy z umówieniem wizyty?"*
- *"Pani Mario, konsylium zaplanowane jest na wtorek o 14:00. Proszę przynieść wszystkie dotychczasowe wyniki badań."*

Koordynator onkologiczny widzi w dashboardzie, którzy pacjenci mają niezrealizowane etapy DiLO — i jakie działanie bot podjął w ciągu ostatnich 48 godzin.

---

## Radioterapia: 30 sesji, 30 przypomnień, zero chaosu w harmonogramie

Leczenie radioterapeutyczne składa się typowo z **20–35 codziennych frakcji**, pięć dni w tygodniu, przez 4–7 tygodni. Każda sesja odbywa się na konkretnym akceleratorze liniowym, o konkretnej godzinie, z konkretnym ustawieniem.

To idealne zadanie dla automatyzacji opartej na silniku serii zabiegowych:

- Bot rezerwuje całą serię frakcji w jednej rozmowie, na podstawie przydziału sprzętu z systemu planowania leczenia (TPS)
- Codzienne przypomnienie SMS dzień przed sesją: *"Jutro o 9:30 Pani frakcja nr 14/30 w pracowni 2. Proszę pamiętać o pozycjonowaniu jak przy poprzednich sesjach."*
- W przypadku awarii technicznej lub serwisu akceleratora — bot natychmiast kontaktuje wszystkich pacjentów z danego dnia z propozycją zastępczego terminu lub informacją o przełożeniu

Szczególna wartość: pacjenci w trakcie radioterapii są często osłabieni, zmęczeni, z zaburzeniami koncentracji. Proste, regularne przypomnienie zmniejsza ryzyko opuszczenia sesji.

---

## Chemioterapia i immunoterapia — kaskadowe zarządzanie protokołem

Chemioterapia wymaga precyzyjnej sekwencji działań **przed każdą sesją infuzyjną**:

| Krok | Termin | Akcja bota |
|---|---|---|
| Morfologia krwi (CBC) | Dzień przed sesją | Przypomnienie o badaniu: *"Jutro morphologia — niezbędna przed chemioterapią"* |
| Odbiór wyniku morfologii | Rano w dniu sesji | Powiadomienie o gotowości wyników; eskalacja do pielęgniarki przy niskich wartościach |
| Potwierdzenie sesji | 2h przed infuzją | Automatyczne potwierdzenie lub obsługa przełożenia |
| Przełożenie przy niskiej morfologii | Automatyczne | Bot informuje pacjenta i blokuje slot do nowej daty |
| Kaskadowe przełożenie protokołu | Automatyczne | Sesje kolejne przesuwają się zgodnie z protokołem chemioterapii |

Nie ma ważniejszego zadania dla koordynatora chemioterapii niż upewnienie się, że pacjent przyszedł z prawidłową morfologią. Teraz robi to bot.

---

## Konsylium lekarskie — koordynacja wielospecjalistyczna

Konsylium onkologiczne (MDT — Multidisciplinary Team) jest w Polsce **obowiązkiem prawnym** przy planowaniu leczenia onkologicznego. Wymaga zebrania onkologa, chirurga, radioterapeuty i — zależnie od lokalizacji nowotworu — innych specjalistów w tym samym miejscu i czasie.

Koordynacja terminów konsylium przez telefon to jeden z najbardziej czasochłonnych zadań administracyjnych w centrum onkologicznym. Bot VoiceLink:

- Wysyła zaproszenie do każdego specjalisty z potwierdzeniem dostępności
- Zbiera potwierdzenia przez SMS lub telefon zwrotny
- Informuje pacjenta o terminie i miejscu konsylium
- Przypomina o dostarczeniu dokumentacji (MRI, CT, PET, histopatologia) w określonym formacie

---

## Czego bot NIE robi — granica absolutna w onkologii

Onkologia to specjalność, w której granica między informacją administracyjną a informacją kliniczną jest szczególnie ważna. Voicebot VoiceLink nigdy nie:

- Komentuje wyników badań onkologicznych ani nie interpretuje markerów nowotworowych
- Informuje o rokowaniach, stadium choroby ani skuteczności leczenia
- Odpowiada na pytania o alternatywne metody leczenia lub interakcje leków
- Podejmuje decyzji o modyfikacji protokołu w przypadku działań niepożądanych

Każde pytanie kliniczne → natychmiastowe przekierowanie do lekarza prowadzącego lub pielęgniarki koordynującej. Bez wyjątków.

---

## RODO w onkologii — szczególna wrażliwość danych

Dane o chorobie nowotworowej należą do najbardziej wrażliwych informacji zdrowotnych w rozumieniu art. 9 RODO. VoiceLink przetwarza je zgodnie ze standardami:

- Zasada minimalizacji: bot zbiera i przetwarza wyłącznie dane niezbędne do koordynacji logistycznej
- Nagrania rozmów onkologicznych przechowywane w zaszyfrowanej, izolowanej przestrzeni
- Dostęp do danych: wyłącznie koordynator onkologiczny i lekarz prowadzący — nie rejestracja ogólna
- DPA (art. 28 RODO) z VoiceLink obejmuje specyficzne zabezpieczenia dla danych art. 9

---

## FAQ — AI w centrum onkologicznym

**Czy bot może obsługiwać pacjentów w bardzo złym stanie ogólnym?**
Bot jest dostępny dla pacjentów, którzy mogą prowadzić rozmowę telefoniczną. Dla pacjentów hospitalizowanych lub w bardzo ciężkim stanie — kontakt odbywa się przez opiekuna lub rodzinę (bot obsługuje rozmowy prowadzone przez osobę trzecią z upoważnienia pacjenta). Obsługa pełnomocnictwa do kontaktu medycznego wymaga jednorazowej konfiguracji w HIS.

**Jak bot obsługuje sytuacje, gdy pacjent płacze lub jest wyraźnie zestresowany?**
Moduł analizy nastroju VoiceLink wykrywa silne emocje w głosie i natychmiast eskaluje połączenie do koordynatora lub pielęgniarki onkologicznej — bez prób "prowadzenia" rozmowy emocjonalnej przez system AI.

**Czy system obsługuje koordynację między kilkoma ośrodkami (np. chemio w jednym, radio w drugim)?**
Tak — architektura wielooddziałowa VoiceLink pozwala na koordynację pacjenta między różnymi lokalizacjami, ze wspólnym kontekstem historii leczenia. Pacjent nie musi tłumaczyć swojej sytuacji od nowa w każdym ośrodku.

---

## Podsumowanie: Rak walczy z pacjentem. Administracja nie powinna.

Centrum onkologiczne, które automatyzuje koordynację DiLO, harmonogramowanie radioterapii i zarządzanie protokołem chemioterapii, odbiera swoim koordynatorom setki godzin miesięcznie pracy administracyjnej — i oddaje je na kontakt z pacjentem, wsparcie psychologiczne i prawdziwie ludzką opiekę.

**Wdróż VoiceLink w swoim centrum onkologicznym** i sprawdź, ile godzin tygodniowo Twoi koordynatorzy spędzają na zadaniach, które może przejąć system. Umów demonstrację.
