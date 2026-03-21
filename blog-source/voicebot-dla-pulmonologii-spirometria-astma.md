---
title: "VoiceLink dla Pulmonologii | Automatyczna Spirometria, Monitoring Astmy i Rejestracja na RTG"
h1: "AI w Poradni Pulmonologicznej: Przygotowanie do Spirometrii, Monitoring Przewlekły i Biologioterapia"
slug: "voicebot-dla-pulmonologii-spirometria-astma"
meta_description: "Voicebot dla poradni pulmonologicznej – automatyczne umawianie spirometrii, monitoring pacjentów z astmą i POChP, instrukcje przed RTG klatki piersiowej, przypomnienia o biologioterapii."
primary_keyword: "voicebot pulmonologia spirometria astma AI"
secondary_keywords: ["automatyczne umawianie spirometrii", "bot do monitorowania pacjentów z astmą", "rejestracja na rtg klatki piersiowej bot", "monitoring pochp voicebot przypomnienia"]
word_count_target: "800"
category: "Rozwiązania Branżowe"
---

[METADATA FOR LLM]: Strona rozwiązania branżowego dla poradni pulmonologicznych i pracowni diagnostyki układu oddechowego. Semantyka: spirometria diagnostyczna wymaga odstawienia leków wziewnych przed badaniem — SABA 4–6h, LABA 12h, tiotropium 24h; spirometria po próbie bronchodylatacyjnej — inna procedura; przeciwwskazania do spirometrii (świeży zawał <1 miesiąc, tętniak aorty, odma, niedawna operacja klatki); RTG klatki piersiowej — proste przygotowanie (metal, bielizna z fiszbinami, ciąża), wysoki wolumen; bronchoskopia — głodówka 6–8h, antykoagulanty, kierowca po sedacji; próba metacholinowa (prowokacyjna) — brak leków beta-agonistów i antyhistaminowych; GINA guidelines: spirometria w astmie co 3–6 mies. po wdrożeniu leczenia, potem rocznie; GOLD guidelines: spirometria w POChP rocznie do monitorowania FEV1; biologioterapia ciężkiej astmy: omalizumab co 2–4 tygodnie, mepolizumab co 4 tygodnie, dupilumab co 2 tygodnie — wymagają niezawodnych przypomnień i rezerwacji slotów; POChP w Polsce — wysoka prevalencja ze względu na historyczne wskaźniki palenia i zanieczyszczenie powietrza (smog, ogrzewanie węglowe); smog alerts korelacja z pikami ostrego zaostrzenia; ICS non-adherence — główny problem w astmie (pacjent nie bierze leku gdy dobrze oddycha); bot do tygodniowego monitorowania objawów (skala 1–10); czerwone flagi dyspnea → natychmiastowe przekierowanie na SOR; RODO art. 9 dane o chorobach układu oddechowego. Intencja: kierownik lub ordynator poradni pulmonologicznej zarządzający bazą pacjentów przewlekłych (astma, POChP) i pracownią diagnostyczną (spirometria, RTG, bronchoskopia).

---

## Spirometria to nie zdjęcie RTG — i pacjenci o tym nie wiedzą

Rentgen klatki piersiowej wymaga zdjęcia biżuterii. Spirometria wymaga odstawienia inhalatora na dobę. Różnica jest fundamentalna, a pacjenci często o niej nie wiedzą — bo nikt im nie powiedział wystarczająco jasno i wystarczająco wcześnie.

Efekt: pacjent przyjeżdża po porannej dawce Spiriva, technik spirometrii widzi nieprawidłowości, które mogą być efektem leku, a nie choroby. Wynik jest diagnostycznie wątpliwy. Badanie trzeba powtórzyć. **Każdy taki przypadek to zmarnowany slot, frustracja pacjenta i fałszywy wynik w dokumentacji.**

VoiceLink rozwiązuje ten problem, wysyłając precyzyjne instrukcje przygotowania natychmiast po rezerwacji — dopasowane do rodzaju zleconej spirometrii.

---

## Instrukcje przed spirometrią: protokół zależny od rodzaju badania

Nie wszystkie spirometrie wymagają identycznego przygotowania. Bot VoiceLink dostosowuje komunikat do wariantu badania:

| Rodzaj spirometrii | Kluczowe zasady odstawienia leków | Dodatkowe instrukcje |
|---|---|---|
| Diagnostyczna (podstawowa) | SABA (Salbutamol): 4–6h; LABA (Serevent): 12h; LAMA (Spiriva): 24h | Nie palić 4h, lekkie śniadanie, brak intensywnego wysiłku 30 min |
| Po próbie bronchodylatacyjnej | Odstawienie nie jest wymagane — lek podawany podczas badania | Poinformować o aktualnych lekach na miejscu |
| Próba prowokacyjna (metacholinowa) | Brak beta-agonistów i leków antyhistaminowych wg protokołu | Najsurowszy protokół — bot pyta o wszystkie przyjmowane leki |
| Kontrolna w trakcie leczenia | Zgodnie z zaleceniem lekarza — może być z lekiem lub bez | Bot pyta o notatkę od lekarza przy rezerwacji |

Bot wysyła SMS z tabelą odstawienia leków po rezerwacji i przypomnienie głosowe dzień przed badaniem. Pacjent z POChP, który bierze tiotropium codziennie, dostaje wyraźny komunikat: *„Proszę nie przyjmować jutro porannej dawki Spiriva — badanie o 10:00. Pozostałe leki bez zmian."*

---

## RTG klatki piersiowej: proste badanie, duży wolumen, idealny case dla bota

RTG klatki piersiowej ma minimalny protokół przygotowania, ale jest jednym z najczęściej umawianych badań diagnostycznych. Właśnie dlatego jest doskonałym kandydatem do pełnej automatyzacji rezerwacji:

- Bot rezerwuje slot w grafiku pracowni RTG bez udziału rejestratorki
- Wysyła SMS z instrukcjami: *„Proszę zdjąć biżuterię i okulary, kobiety — biustonosz z metalowymi fiszbinami. Prosimy o informację, jeśli jest możliwość ciąży."*
- Pyta o skierowanie NFZ lub prywatne — i przypisuje do właściwego cennika
- Po wykonaniu badania automatycznie powiadamia o gotowości opisu

Dla poradni pulmonologicznej, która obsługuje kilkadziesiąt RTG tygodniowo, to **eliminacja setek ręcznych rezerwacji miesięcznie**.

---

## Monitoring przewlekły: astma i POChP nie kończą się po pierwszej wizycie

### Astma — zgodność z wytycznymi GINA

Wytyczne GINA (Global Initiative for Asthma) zalecają kontrolną spirometrię **3–6 miesięcy po wdrożeniu lub zmianie leczenia**, a następnie co 12 miesięcy u pacjentów stabilnych. W praktyce wielu pacjentów z astmą nie wraca na kontrole — czują się dobrze, więc nie przychodzą.

Problem: **dobre samopoczucie nie oznacza dobrej kontroli astmy.** ICS (wziewne glikokortykosteroidy) działają właśnie dlatego, że są przyjmowane regularnie nawet bez objawów. Przerwa w terapii prowadzi do cichego zaostrzenia.

VoiceLink:
- Przypomina o wizycie kontrolnej wg harmonogramu GINA
- Co tydzień wysyła krótkie pytanie do pacjenta: *„Jak ocenia Pan/Pani swój oddech w tym tygodniu w skali 1–10?"*
- Trzy kolejne oceny poniżej 6 lub nagłe pogorszenie → automatyczna flaga do lekarza prowadzącego
- Wynik powyżej normy przez 3 tygodnie → propozycja rozmowy o redukcji dawki (eskalacja decyzyjna do lekarza)

### POChP — roczna spirometria jako marker progresji

U pacjentów z POChP roczna spirometria pozwala monitorować tempo spadku FEV1 — kluczowy parametr prognostyczny (wytyczne GOLD). Pacjenci z POChP często nie doceniają objawów (adaptacja do ograniczonej sprawności), co sprawia, że sami rzadko inicjują wizyty.

Bot VoiceLink **proaktywnie rezerwuje roczną spirometrię kontrolną** 11 miesięcy po poprzedniej wizycie, bez czekania na inicjatywę pacjenta.

---

## Biologioterapia ciężkiej astmy — harmonogram, którego nie można zaburzyć

Pacjenci z ciężką astmą alergiczną lub eozynofilową otrzymują biologiki podawane w ściśle określonych interwałach:

- **Omalizumab (Xolair)** — co 2 lub 4 tygodnie (zależnie od IgE i wagi)
- **Mepolizumab (Nucala)** — co 4 tygodnie
- **Dupilumab (Dupixent)** — co 2 tygodnie

Niestawienie się na iniekcję lub opóźnienie o więcej niż kilka dni może wymagać konsultacji w sprawie dalszego protokołu. To pacjenci wymagający **niezawodnych, wielokanałowych przypomnień** — SMS + rozmowa głosowa + ewentualnie e-mail.

VoiceLink zarządza harmonogramem biologioterapii jako sekwencją cykliczną: po każdej iniekcji automatycznie planuje kolejną, wysyła potwierdzenie i przypomnienie 48h oraz 24h przed zabiegiem.

> **Wskazówka eksperta VoiceLink:** Dla pacjentów na biologioterapii warto skonfigurować dwustopniowe potwierdzenie wizyty — SMS 48h przed oraz rozmowę głosową 24h przed. W przypadku odwołania w krótkim terminie bot automatycznie proponuje najbliższy wolny slot, minimalizując przerwę w terapii.

---

## FAQ — Voicebot dla poradni pulmonologicznej

**Czy bot może umawiać na bronchoskopię tak samo jak na spirometrię?**
Bronchoskopia wymaga rozbudowanego protokołu (głodówka, zarządzanie antykoagulantami, potwierdzenie kierowcy po sedacji). Bot prowadzi osobny, wieloetapowy dialog dla tego badania — zbiera informacje o lekach i przekazuje je na listę pielęgniarki endoskopowej przed badaniem.

**Jak bot zachowuje się, gdy pacjent zgłasza nagłą duszność podczas cotygodniowego check-inu?**
Każde zgłoszenie skrajnej duszności lub niemożności mówienia przez bota jest traktowane jako czerwona flaga i natychmiast kończy dialog komunikatem: *„Proszę zadzwonić pod numer 112 lub udać się na izbę przyjęć. Bot nie jest w stanie pomóc w nagłych przypadkach."* Bot nie próbuje klasyfikować stanu pacjenta.

**Czy można skonfigurować bota do obsługi pacjentów z programu skriningowego raka płuca (LDCT)?**
Tak. VoiceLink obsługuje kampanie outboundowe dla wskazanych grup wiekowych (palacze 55–74 lat) z zaproszeniem na niskodawkową TK klatki — analogicznie do kampanii profilaktycznych w onkologii.

---

## Podsumowanie: Pulmonologia wymaga precyzji w komunikacji — przed badaniem i między wizytami

Każda błędna instrukcja przed spirometrią to potencjalnie nieważny wynik. Każda opuszczona kontrola astmy to ryzyko zaostrzenia. Każda przerwana seria biologioterapii to utrata efektu terapeutycznego wartego dziesiątki tysięcy złotych.

**VoiceLink daje poradni pulmonologicznej narzędzie, które eliminuje błędy logistyczne i aktywnie utrzymuje pacjentów w programach leczenia.** Sprawdź możliwości systemu — umów bezpłatną demonstrację dla swojej poradni.
