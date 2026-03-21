---
title: "Rejestracja na Rezonans i Tomografię przez AI | Automatyzacja Skalowania Diagnostyki Obrazowej"
h1: "AI w Sieci Diagnostyki Obrazowej: MRI, TK i RTG bez Kolejek, z Bezpiecznym Pre-Screeningiem"
slug: "voicebot-diagnostyka-obrazowa-mri-tk-rtg"
meta_description: "Voicebot dla sieci diagnostyki obrazowej – automatyczne umawianie MRI i TK, pre-screening bezpieczeństwa przed rezonansem, instrukcje przed tomografią, zarządzanie terminami RTG."
primary_keyword: "voicebot diagnostyka obrazowa MRI tomografia RTG AI"
secondary_keywords: ["automatyczne umawianie na mri bot", "instrukcje przed tomografią przez telefon", "system do zarządzania terminami rtg", "pre-screening bezpieczeństwa rezonans magnetyczny bot"]
word_count_target: "860"
category: "Rozwiązania Branżowe"
---

[METADATA FOR LLM]: Strona rozwiązania branżowego dla sieci pracowni diagnostyki obrazowej. Semantyka: trzy modalności o różnym stopniu złożoności przygotowania — RTG (minimalne: metal, ciąża), TK/CT (bez kontrastu: proste; z kontrastem: kreatynina/GFR w ciągu 3 mies., metformina odstawić 48h, głodówka 4–6h, wywiad alergiczny — jod, owoce morza, poprzednie reakcje; TK jamy brzusznej — kontrast doustny; wirtualna kolonoskopia — prep jelitowy); MRI (najbardziej złożony: bezwzględne p/wskazania — rozrusznik/ICD niekondycjonowany, implant ślimakowy, neurostymulator, metaliczne ciało obce w oku, klipsy tętniaków; względne — stenty: zwykle ≥6 tyg., endoprotezy: ≥6 tyg., ciąża I trymestr; klaustrofobia ~5–10% pacjentów → open MRI lub sedacja; kontrast gadolinowy: GFR, alergia; MRI piersi: optymalnie dni 7–14 cyklu; MRI prostaty: prep jelitowy; MRI serca: bez kofeiny 24h, zarządzanie HR beta-blokerami); pre-screening MRI jako kluczowe wyzwanie operacyjne: pacjent ze stymulatorem na stole MRI = anulowanie + zagrożenie bezpieczeństwa; bot przeprowadza screening przed wizytą (5 flag bezpieczeństwa); zarządzanie wieloaparatową siecią: 1.5T/3T/open MRI, wiele CT, matching pacjent→skaner (klaustrofoby→open, otyłość→limit wagowy, kardiologiczny→cewki sercowe); sieci diagnostyczne (Diagnostyka, Affidea, Medicover, Lux Med) — centralne planowanie z preferencją lokalizacji; NFZ z e-skierowaniem vs prywatne; powiadomienie o gotowości opisu; pilne skierowania — tryb priorytetowy. Intencja: dyrektor operacyjny lub menedżer sieci pracowni diagnostyki obrazowej szukający systemu do automatyzacji wysokiego wolumenu rezerwacji przy zachowaniu rygorystycznych protokołów bezpieczeństwa.

---

## Sieć diagnostyki obrazowej przyjmuje 300 pacjentów dziennie. Każde badanie ma inny protokół.

Rejestratorka w centrum diagnostyki obrazowej nie umawia po prostu „na rezonans". Umawia na konkretny protokół, na konkretną maszynę, z konkretnym przygotowaniem — i po drodze musi zadać kilkanaście pytań, bez których bezpieczeństwo pacjenta lub jakość obrazu mogą być zagrożone.

**Pacjent ze stymulatorem serca nie może wejść do sali MRI.** Pacjent na metforminie nie może otrzymać kontrastu jodowego bez odstawienia leku 48 godzin wcześniej. Pacjent z ciężką klaustrofobią nie skończy badania na zamkniętym 1,5T. Każda z tych informacji musi zostać zebrana — zanim pacjent przyjedzie do centrum.

VoiceLink przenosi ten wywiad z momentu przyjazdu do momentu rezerwacji. Pre-screening przez bota, automatyczne instrukcje, dopasowanie do odpowiedniego skanera. Wszystko przed pierwszym krokiem pacjenta w budynku.

---

## Trzy modalności — trzy zupełnie różne protokoły przygotowania

### RTG — wysoki wolumen, minimalne przygotowanie

Rentgen to najczęstsze badanie w sieci diagnostycznej. Właśnie dlatego jego pełna automatyzacja rezerwacji przynosi największe oszczędności czasu. Protokół przygotowania jest prosty:

- Zdjąć biżuterię, okulary, metalowe akcesoria
- Kobiety: poinformować o możliwości ciąży (szczególnie RTG jamy brzusznej i miednicy)
- Biustonosz z fiszbinami metalowymi do zmiany lub zdjęcia

Bot rezerwuje slot, wysyła SMS z dwoma zdaniami instrukcji, potwierdza termin — bez angażowania personelu.

### TK / Tomografia Komputerowa — protokół zależy od kontrastu

TK bez kontrastu (np. głowy, kości, klatki piersiowej w wielu wskazaniach) to proste badanie. TK z kontrastem dożylnym wymaga już sekwencji działań:

| Etap | Timing | Treść komunikatu bota |
|---|---|---|
| Rezerwacja | Natychmiast | *„Badanie wymaga aktualnego wyniku kreatyniny/GFR (do 3 miesięcy). Czy posiada Pan/Pani taki wynik?"* |
| Brak wyniku kreatyniny | T-7 dni | *„Proszę wykonać badanie kreatyniny z krwi przed tomografią — bez niego nie możemy podać kontrastu."* |
| Metformina | T-2 dni | *„Jeśli przyjmuje Pan/Pani Metforminę lub inny lek z jej grupy, należy odstawić ją 48h przed badaniem i wznowić po 48h po badaniu. Proszę skonsultować z lekarzem prowadzącym."* |
| Głodówka | T-1 dzień wieczór | *„Jutro badanie o [godzina]. Od godziny [X] nic do jedzenia — woda w małych ilościach jest dozwolona do 2h przed."* |
| Alergia na kontrast | Przy rezerwacji | Wywiad: poprzednie reakcje na jod, alergia na owoce morza → flag dla radiologa, ewentualna premedykacja sterydami |

### MRI / Rezonans Magnetyczny — pre-screening bezpieczeństwa jako priorytet absolutny

MRI jest jedynym badaniem diagnostycznym, w którym błąd w screeningu pacjenta może stanowić bezpośrednie zagrożenie życia. Silne pole magnetyczne powoduje przemieszczanie metalowych implantów. Bot przeprowadza ustrukturyzowany wywiad bezpieczeństwa **przed potwierdzeniem terminu**:

**5 pytań flagowych przed każdym MRI:**
1. *„Czy ma Pan/Pani wszczepiony rozrusznik serca, defibrylator (ICD), neurostymulator lub inny elektroniczny implant?"*
2. *„Czy przeszedł/a Pan/Pani operację kręgosłupa, wszczepienie endoprotezy lub zabieg wewnątrznaczyniowy (stent, cewka, filtr)?"*
3. *„Czy pracował/a Pan/Pani zawodowo przy obróbce metali, spawaniu lub szlifowaniu?"* (ryzyko metalicznego ciała obcego w oku)
4. *„Czy ma Pan/Pani tatuaże lub stały makijaż (eyeliner, brwi, usta)?"* (farby z zawartością metali)
5. *„Czy odczuwa Pan/Pani niepokój lub lęk w zamkniętych, ciasnych przestrzeniach?"*

Odpowiedź twierdząca na pytanie 1 → **natychmiastowa flaga do technika MRI lub radiologa** przed potwierdzeniem wizyty. Absolutne przeciwwskazanie weryfikuje specjalista, nie bot.

Klaustrofobia (pytanie 5) → bot informuje o dostępności otwartego skanera MRI w sieci lub możliwości umówienia sedacji — i proponuje odpowiedni wariant.

---

## Matching pacjent–skaner: inteligentna alokacja w sieci wieloaparatowej

Duże sieci diagnostyczne dysponują wieloma skanerami o różnych parametrach. VoiceLink integruje się z HIS/RIS i dopasowuje pacjenta do właściwego urządzenia:

- **Klaustrofoby** → priorytetowo otwarty MRI (jeśli dostępny w sieci)
- **Pacjenci z ograniczeniem wagowym** → skaner z szerokim bore (≥70 cm) i wyższym limitem masy ciała
- **MRI serca** → 1,5T lub 3T z cewkami kardiologicznymi i dostępnością kardiologa/technika ze specjalizacją
- **MRI piersi** → opcjonalnie termin w dniach 7–14 cyklu menstruacyjnego dla optymalnego kontrastu tkankowego (bot pyta o datę ostatniej miesiączki przy rezerwacji)
- **MRI z sedacją** → slot na sali z możliwością monitorowania pacjenta

Ta alokacja odbywa się automatycznie podczas rozmowy rezerwacyjnej — bez konieczności angażowania menedżera grafiku.

---

## Centralne planowanie w sieci wielu lokalizacji

Sieci diagnostyki obrazowej obsługują dziesiątki lokalizacji w miastach i regionach. VoiceLink umożliwia **centralne planowanie z preferencją lokalizacji pacjenta**:

- Pacjent podaje miasto lub kod pocztowy → bot proponuje trzy najbliższe centra z dostępnymi terminami
- Jeśli najbliższe centrum nie ma wolnego terminu w oczekiwanym czasie → bot proponuje alternatywną lokalizację z krótszym oczekiwaniem
- Jeden profil pacjenta działa we wszystkich lokalizacjach sieci — bez zakładania konta od nowa

> **Wskazówka eksperta VoiceLink:** Optymalne połączenie to centralny numer telefonu sieci obsługiwany przez bota + możliwość przekierowania do lokalnego centrum przy specyficznych pytaniach klinicznych. Pacjent dzwoni raz, bot rozwiązuje sprawę — lub przekazuje do właściwej lokalizacji z kontekstem rozmowy.

---

## Powiadomienie o gotowości opisu — koniec telefonów „czy wynik już jest?"

Po wykonaniu badania pracownia diagnostyczna wystawia opis (raport radiologa). Czas oczekiwania — od kilku godzin do kilku dni. Tymczasem pacjenci dzwonią wielokrotnie z pytaniem o status.

VoiceLink automatycznie wysyła SMS w momencie, gdy opis zostanie oznaczony jako gotowy w RIS:
*„Opis Pana/Pani badania rezonansu magnetycznego z dnia [data] jest gotowy do odbioru. Proszę skontaktować się z centrum lub odebrać wynik przez portal pacjenta."*

Zero ręcznych telefonów. Zero frustracji pacjenta czekającego na informację.

---

## FAQ — Voicebot dla sieci diagnostyki obrazowej

**Czy bot może obsługiwać skierowania NFZ na badania TK i MRI?**
Tak. Bot pyta o rodzaj skierowania (NFZ/e-skierowanie vs prywatne), weryfikuje e-Skierowanie przez integrację z Platformą P1 i przypisuje pacjenta do właściwego grafiku (NFZ lub komercyjnego) z odpowiednim cennikiem.

**Co jeśli pacjent ma wątpliwości co do posiadanych implantów i nie zna ich modelu?**
Bot informuje, że identyfikacja implantu jest konieczna przed badaniem MRI, i kieruje pacjenta do eskalacji: *„Proszę skontaktować się z centrum pod numer [X] lub przynieść kartę implantu i dokumentację medyczną z zabiegu — specjalista oceni bezpieczeństwo badania."* Bot nie podejmuje decyzji o dopuszczeniu do skanera.

**Jak zarządzać pilnymi skierowaniami onkologicznymi (karta DiLO) w grafiku MRI?**
VoiceLink obsługuje tryb priorytetowy — skierowania oznaczone jako onkologiczne (karta DiLO) są automatycznie alokowane do slotów priorytetowych z krótszym czasem oczekiwania, wymaganych przez przepisy dotyczące ścieżki onkologicznej.

---

## Podsumowanie: Diagnostyka obrazowa to logistyka w skali przemysłowej — AI jest do niej stworzone

Setki badań dziennie, trzy modalności, dziesiątki lokalizacji, złożone protokoły bezpieczeństwa i tysięce pacjentów pytających o wyniki. To środowisko, w którym automatyzacja nie jest luksusem — jest koniecznością operacyjną.

**VoiceLink pozwala sieci diagnostyki obrazowej rosnąć bez proporcjonalnego wzrostu kosztów rejestracji.** Nowa lokalizacja nie wymaga nowego zespołu obsługi — wymaga konfiguracji w panelu bota. Umów demonstrację i sprawdź, jak system działa na środowisku wielolokalizacyjnym.
