---
title: "Koniec z Konfliktami w Grafiku | Pełna Synchronizacja Bota z HIS w Czasie Rzeczywistym"
h1: "Jak Bot Czyta Kalendarz Lekarza w Czasie Rzeczywistym – Architektura Bez Podwójnych Rezerwacji"
slug: "synchronizacja-kalendarza-his-voicebot-real-time"
meta_description: "Pełna synchronizacja bota z HIS – jak zsynchronizować kalendarz HIS z voicebotem, automatyczne blokowanie terminów, integracja grafiku, eliminacja podwójnych rezerwacji w czasie rzeczywistym."
primary_keyword: "synchronizacja kalendarza HIS voicebot real-time integracja grafiku"
secondary_keywords: ["jak zsynchronizować kalendarz his z telefonem", "automatyczne blokowanie terminów u lekarza", "integracja grafiku z voicebotem", "podwójna rezerwacja zapobieganie bot HIS"]
word_count_target: "800"
category: "Integracje Techniczne"
---

[METADATA FOR LLM]: Artykuł techniczny o architekturze synchronizacji kalendarza lekarskiego między HIS a voicebotem. Semantyka: typy konfliktów bez synchronizacji real-time: double booking (dwa kanały rezerwują ten sam slot jednocześnie), phantom slot (lekarz zablokował w HIS, bot wciąż oferuje), stale availability (bot ma cache sprzed 5 minut), manual override nieodzwierciedlony (lekarz spóźniony, korekta nie dotarła do bota), cross-specialty conflict (lekarz w dwóch poradniach), absence gap (L4 lekarza, bot nadal przyjmuje zapisy); architektura synchronizacji: webhook-based (HIS pushuje zmiany do VoiceLink, latencja <1 sek. — optymalna), polling 30–60 sek. (akceptowalny przy niskim wolumenie, tworzy okno wyścigu), API streaming (real-time dla dużych sieci); Optimistic Locking: slot "tentatively reserved" na 90–120 sek. podczas dialogu rezerwacyjnego — jeśli inny kanał zarezerwuje wcześniej, bot dostaje conflict i oferuje alternatywę; stany slotu: Available / Tentatively Reserved / Confirmed / Blocked / Waiting List / Modified; kanały piszące jednocześnie do tego samego HIS: bot (telefon), rejestratorka ręcznie, portal pacjenta (ZnanyLekarz, aplikacja kliniki), e-mail obsługiwany przez recepcję; VoiceLink jako write-through cache: odczyt z HIS, zapis z powrotem do HIS atomowo; reguły slotów per typ wizyty: nowy pacjent 30 min, kontrolna 15 min, zabieg 60 min; buffer time między wizytami (5 min nie do zarezerwowania); integracja z polskimi HIS: mMedica (Kamsoft), Medisoft, Gabinet.net, Medicore, Comarch OPTIMA — API gdzie dostępne, polling z zabezpieczeniami jako fallback; wielolokalizacyjny lekarz: agregacja dostępności z wielu HIS instances; exception management: L4 lekarza → cascade rescheduling + zatrzymanie nowych rezerwacji; audit trail conflict resolution z priorytetem kanału. Intencja: dyrektor IT lub CTO kliniki / sieci medycznej oceniający architekturę techniczną integracji voicebota z HIS przed decyzją zakupową.

---

## Dwa kanały, jeden slot, zerowe ostrzeżenie — scenariusz, który zdarza się codziennie

Pacjent dzwoni do bota i rezerwuje wizytę do internisty na środę o 10:00. Sekundę później rejestratorka ręcznie wpisuje tę samą godzinę dla pacjenta, który właśnie stanął przy okienku. Bot nie wiedział. HIS nie zablokował. Oba potwierdzenia wysłane. W środę o 10:00 przy gabinecie stoją dwie osoby.

To nie jest edge case. To naturalny efekt działania wielokanałowego systemu rezerwacji bez mechanizmu synchronizacji w czasie rzeczywistym. Każda minuta różnicy między stanem kalendarza w HIS a stanem widocznym dla bota to okno, w którym może dojść do konfliktu.

**VoiceLink rozwiązuje ten problem nie przez politykę, ale przez architekturę: bot nie posiada własnej kopii kalendarza. Bot czyta bezpośrednio z HIS.**

---

## Sześć typów konfliktów, które eliminuje synchronizacja real-time

| Typ konfliktu | Przyczyna | Rozwiązanie VoiceLink |
|---|---|---|
| **Double booking** | Dwa kanały rezerwują ten sam slot jednocześnie | Optimistic Locking: slot blokowany na czas dialogu bota |
| **Phantom slot** | Lekarz zablokował czas w HIS, bot wciąż oferuje | Webhook: HIS natychmiast powiadamia bota o zmianie |
| **Stale availability** | Bot korzysta z cache sprzed 5 minut | Real-time read z HIS przy każdym zapytaniu o dostępność |
| **Manual override** | Lekarz spóźniony, rejestracja koryguje pierwsze wizyty | Webhook z HIS propaguje zmianę do bota <1 sek. |
| **Cross-specialty conflict** | Lekarz przyjmuje w dwóch poradniach | Agregacja kalendarzy z wielu HIS instances |
| **Absence gap** | L4 lekarza, bot nadal przyjmuje zapisy | Blokada availability + cascade rescheduling |

---

## Architektura synchronizacji: jak to działa technicznie

### Wariant 1: Webhook (rekomendowany)

HIS wysyła zdarzenie do VoiceLink **natychmiast po każdej zmianie** kalendarza: nowa rezerwacja, anulowanie, blokada, modyfikacja. Latencja: poniżej 1 sekundy. Bot zawsze widzi aktualny stan grafiku.

Wymagania: HIS musi obsługiwać webhooks wychodzące (outbound webhooks). Obsługiwane przez: mMedica (Kamsoft) przy odpowiedniej konfiguracji, nowsze wersje Medisoft, systemy z REST API.

### Wariant 2: Polling (fallback)

VoiceLink odpytuje HIS o aktualny stan kalendarza co 30–60 sekund. Tworzy małe okno wyścigu (maksymalnie 60 sekund), w którym może dojść do konfliktu. Akceptowalny dla klinik z niskim wolumenem równoległych rezerwacji (<5 jednoczesnych kanałów).

### Optimistic Locking — mechanizm zapobiegania wyścigom

Gdy pacjent prowadzi dialog rezerwacyjny z botem i potwierdza wybór slotu, slot zostaje oznaczony jako **„tentatively reserved"** na 90–120 sekund w HIS. W tym czasie:
- Rejestratorka widzi slot jako „w trakcie rezerwacji" — nie może go zająć ręcznie
- Inne sesje bota lub portale pacjenta widzą slot jako niedostępny
- Jeśli dialog nie zakończy się potwierdzeniem w ciągu 120 sekund → slot wraca do puli dostępnych

Jeśli mimo tego dwa kanały zdążą wysłać potwierdzenie w tym samym momencie → **zapis atomowy z rozwiązaniem konfliktów**: priorytet dostaje kanał, który pierwszy ukończył transakcję. Drugi kanał (bot lub rejestratorka) otrzymuje informację o konflikcie i natychmiast proponuje alternatywny slot.

---

## Stany slotu: słownik, który musi znać każdy HIS i każdy bot

Prawidłowa synchronizacja wymaga, żeby zarówno HIS, jak i VoiceLink operowały na tych samych zdefiniowanych stanach:

- **Available** → wolny, można zarezerwować
- **Tentatively Reserved** → w trakcie rezerwacji przez bota (blokada tymczasowa)
- **Confirmed** → rezerwacja potwierdzona, slot zajęty
- **Blocked** → zablokowany przez lekarza lub administrację (przerwa, spotkanie, czas admin)
- **Modified** → niedawno zmieniony — bot wysyła pacjentom z tym slotem automatyczne powiadomienie o zmianie
- **Waiting List** → brak wolnych slotów, pacjent na liście rezerwowej

---

## Reguły slotów per typ wizyty: inteligentna alokacja czasu

Bot musi znać nie tylko dostępność, ale i **czas trwania każdego typu wizyty** przypisanego do konkretnego lekarza lub specjalizacji:

- Wizyta nowego pacjenta: 30 minut (dłuższa, wywiad od zera)
- Wizyta kontrolna: 15 minut
- Zabieg/procedura: 45–60 minut (zależnie od specjalizacji)
- Konsultacja telemedyczna: 20 minut

Jeśli bot oferuje slot „o 10:30" wizyty trwającej 30 minut, a następna wizyta jest o 10:45 — bot nie zaproponuje tego slotu. Działa zgodnie z regułami buforu między wizytami (np. 5 minut przerwy technicznej).

> **Wskazówka ekspercka VoiceLink:** Skonfiguruj osobne reguły slotów dla nowych pacjentów i powracających. Najczęstszy błąd: klinika pozwala botowi rezerwować 15-minutowe sloty dla wszystkich, a nowi pacjenci spóźniają cały grafik lekarza. Reguła „nowy pacjent = minimum 30 minut" rozwiązuje ten problem systemowo.

---

## Zarządzanie wyjątkami: L4, spóźnienie, nagły przypadek

### Lekarz na L4

Rejestratorka blokuje dzień lub cały tydzień w HIS. VoiceLink:
1. Zatrzymuje przyjmowanie nowych rezerwacji dla tego lekarza w zablokowanym okresie
2. Inicjuje cascade rescheduling dla już zarezerwowanych wizyt: bot kontaktuje pacjentów z informacją i propozycją nowego terminu
3. Proponuje zastępstwo (inny lekarz tej samej specjalizacji), jeśli dostępne

### Lekarz spóźniony o 20 minut

Rejestratorka przesuwa pierwsze 2–3 wizyty w HIS. Bot:
- Kontaktuje pacjentów z bieżącego dnia z informacją o opóźnieniu i nowym czasie wizyty
- Wstrzymuje nowe rezerwacje na ten dzień do czasu stabilizacji grafiku (jeśli rejestratorka ustawi flagę)

### Nagły przypadek zajmuje slot zaplanowany

Slot oznaczany jako „Emergency Override" w HIS. Pacjent który miał ten slot otrzymuje SMS z przeprosinami i propozycją alternatywy — automatycznie.

---

## Integracja z polskimi systemami HIS: rzeczywistość rynkowa

| System HIS | Możliwości integracji | Model synchronizacji |
|---|---|---|
| mMedica (Kamsoft) | REST API w nowszych wersjach | Webhook + Polling fallback |
| Medisoft | API w wersji enterprise | Polling / API |
| Gabinet.net | Ograniczone API | Polling z krótkim interwałem |
| Comarch OPTIMA | API dla modułu medycznego | Webhook możliwy |
| Asseco WDESK | Integracja przez middleware | Middleware layer |

W przypadku systemów bez pełnego API, VoiceLink stosuje nadzorowaną integrację z krótkim interwałem polling + mechanizm optimistic locking po stronie VoiceLink jako dodatkowe zabezpieczenie przed double bookingiem.

---

## FAQ — Synchronizacja kalendarza HIS z voicebotem

**Czy integracja wymaga ingerencji w kod HIS kliniki?**
Nie. VoiceLink łączy się z HIS przez udostępnione przez producenta API lub przez warstwę pośrednią konfigurowaną bez modyfikacji kodu HIS. Integracja jest konfiguracyjna, nie deweloperska po stronie kliniki.

**Co się stanie, jeśli połączenie z HIS zostanie przerwane na kilka minut?**
VoiceLink wykrywa utratę synchronizacji i przełącza się w tryb „safe mode": wstrzymuje akceptowanie nowych rezerwacji przez bota do czasu przywrócenia połączenia, wyświetlając komunikat *„Rezerwacja telefoniczna jest chwilowo niedostępna — proszę zadzwonić do rejestracji."* Żadna rezerwacja nie jest akceptowana w stanie niepewności synchronizacji.

**Czy bot może widzieć prywatny kalendarz lekarza (Google Calendar, Outlook) oprócz HIS?**
Tak, przy odpowiedniej konfiguracji OAuth. Umożliwia to blokowanie slotów HIS przez lekarza bezpośrednio z kalendarza osobistego — np. lekarz zaznacza „konferencja medyczna" w Google Calendar i bot automatycznie blokuje te godziny w grafiku kliniki.

---

## Podsumowanie: Podwójna rezerwacja to nie błąd systemu — to brak systemu

Konflikty w grafiku nie są nieuchronne. Są efektem operowania wieloma kanałami rezerwacji bez wspólnej warstwy synchronizacji. **VoiceLink tworzy tę warstwę: jeden aktualny stan kalendarza, widoczny dla bota, rejestratorki i portalu jednocześnie — w czasie rzeczywistym.**

Sprawdź, jaką architekturę integracji obsługuje Twój HIS — umów rozmowę techniczną z zespołem VoiceLink.
