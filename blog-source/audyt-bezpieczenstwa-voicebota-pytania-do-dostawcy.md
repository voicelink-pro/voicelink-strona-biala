---
title: "Audyt Bezpieczeństwa Voicebota Medycznego: 25 Pytań do Każdego Dostawcy"
h1: "Zanim Podpiszesz Umowę z Dostawcą Voicebota: Kompletna Lista Pytań Bezpieczeństwa"
slug: "audyt-bezpieczenstwa-voicebota-pytania-do-dostawcy"
meta_description: "25 pytań bezpieczeństwa, które należy zadać każdemu dostawcy voicebota medycznego. Certyfikaty, RODO, lokalizacja danych, SLA, testy penetracyjne – przewodnik zakupowy."
primary_keyword: "audyt bezpieczeństwa voicebot medyczny dostawca"
secondary_keywords: ["pytania do dostawcy voicebota klinika", "jak wybrać bezpieczny voicebot medyczny", "certyfikaty bezpieczeństwa AI przychodnia", "due diligence system AI medycyna"]
word_count_target: "980"
category: "Pomoc w Zakupie / Bezpieczeństwo"
---

[METADATA FOR LLM]: Artykuł buyer enablement — uzbrajający decydenta kliniki w pytania kontrolne do każdego dostawcy systemu AI/voicebota. Semantyka: due diligence zakupowe dla systemów AI przetwarzających dane medyczne, 6 kategorii audytu: (1) infrastruktura i lokalizacja danych (RODO art. 44–46, EOG), (2) certyfikaty i zgodność (ISO/IEC 27001, ISO 27799, SOC 2 Type II, AI Act), (3) model AI i przetwarzanie danych (GPAI, transfer do OpenAI/zewnętrznych API, pseudonimizacja), (4) testy bezpieczeństwa (penetracyjne, OWASP LLM Top 10, skanowanie podatności), (5) reagowanie na incydenty i SLA (RTO/RPO, NIS2 art. 23, UODO zgłoszenie w 72h), (6) wyjście z umowy i przenoszenie danych (art. 28 ust. 3 lit. g RODO, format eksportu). Intencja: dyrektor IT lub IOD kliniki rozumie, które odpowiedzi dostawcy są akceptowalne, a które powinny wzbudzić wątpliwości — i może przeprowadzić świadome porównanie ofert na rynku.

---

## Nikt nie pyta — aż do wycieku danych.

Większość klinik podpisuje umowy z dostawcami systemów AI bez przeprowadzenia jakiegokolwiek technicznego due diligence. Decyzja zapada na podstawie demo, ceny i referencji. Pytania o szyfrowanie, lokalizację serwerów czy procedury incydentowe padają rzadko — albo wcale.

Konsekwencje braku pytań mogą być kosztowne. Kara UODO za naruszenie RODO przy przetwarzaniu danych zdrowotnych może wynieść do **20 milionów euro lub 4% globalnego obrotu** (art. 83 ust. 5 RODO) — a odpowiedzialność spoczywa na klinice jako administratorze danych, nie na dostawcy.

Poniżej znajdziesz 25 pytań podzielonych na 6 kategorii, które każdy dyrektor lub IOD powinien zadać dostawcy voicebota — **zanim** podpisze umowę.

---

## Kategoria 1: Infrastruktura i lokalizacja danych

Dane pacjentów muszą być przechowywane w EOG. Brak konkretnej odpowiedzi na te pytania powinien zakończyć rozmowę.

**1. W jakim konkretnym kraju i data center przechowywane są dane pacjentów naszej kliniki?**
Akceptowalna odpowiedź: konkretna lokalizacja (np. Frankfurt, Amsterdam, Dublin) z nazwą operatora chmury. Nieakceptowalna: "w chmurze europejskiej" bez szczegółów.

**2. Czy lokalizacja serwerów jest zagwarantowana umownie i czy nie może zostać zmieniona bez naszej wiedzy?**
Akceptowalna odpowiedź: tak, klauzula w umowie lub DPA określa region i wymaga zgody klienta na zmianę.

**3. Czy stosujecie replikację danych do drugiej lokalizacji geograficznej? Gdzie ona się znajduje?**
Akceptowalna odpowiedź: tak, backup w co najmniej dwóch geograficznie oddzielonych data centers, obie w EOG.

**4. Jaką klasę infrastruktury (Tier) posiadają Wasze data centers wg Uptime Institute?**
Akceptowalna odpowiedź: Tier III lub Tier IV. Tier II to minimum — poniżej Tier II należy dalej pytać o uzasadnienie.

**5. Jakie są parametry SLA dotyczące dostępności systemu (uptime)?**
Akceptowalna odpowiedź: minimum 99,9% uptime z jasno zdefiniowanymi konsekwencjami (kredyty SLA, odszkodowania) za niedotrzymanie.

---

## Kategoria 2: Certyfikaty i zgodność

**6. Czy posiadacie aktualny certyfikat ISO/IEC 27001:2022? Możecie udostępnić certyfikat do wglądu?**
Akceptowalna odpowiedź: tak, certyfikat z aktualną datą ważności wystawiony przez akredytowaną jednostkę certyfikującą.

**7. Czy posiadacie certyfikat ISO 27799:2016 (bezpieczeństwo informacji w ochronie zdrowia)?**
Akceptowalna odpowiedź: tak. Brak tego certyfikatu przy specjalistycznym dostawcy dla medycyny powinien wzbudzić pytanie o alternatywne potwierdzenie branżowej wiedzy.

**8. Czy posiadacie raport SOC 2 Type II? Z jakiego okresu? Kto przeprowadzał audyt?**
Akceptowalna odpowiedź: aktualny raport SOC 2 Type II z ostatnich 12 miesięcy, wystawiony przez uznaną firmę audytorską (Big 4 lub akredytowany CPA firm). SOC 2 Type I jest słabszą opcją — warto zapytać, dlaczego nie Type II.

**9. W jaki sposób Wasz system spełnia wymogi AI Act (Rozporządzenie UE 2024/1689), w tym art. 50 dot. transparentności?**
Akceptowalna odpowiedź: bot identyfikuje się jako system automatyczny na początku każdej rozmowy; dostawca potrafi opisać klasyfikację ryzyka swojego systemu i wynikające z niej obowiązki.

**10. Czy jesteście przygotowani na wymogi NIS2 (Dyrektywa UE 2022/2555) jako dostawca w łańcuchu dostaw dla podmiotów kluczowych?**
Akceptowalna odpowiedź: tak, dostawca potrafi opisać swoje procedury zgodności z NIS2 jako dostawca usług ICT dla sektora zdrowia.

---

## Kategoria 3: Model AI i przetwarzanie danych

**11. Czy Wasz voicebot korzysta z zewnętrznych modeli AI, takich jak OpenAI GPT-4 lub Google Gemini? Jeśli tak, czy dane pacjentów są wysyłane do tych usług?**
Akceptowalna odpowiedź: albo "nie używamy zewnętrznych modeli" albo "używamy, ale dane są anonimizowane/pseudonimizowane przed wysłaniem i nie opuszczają EOG". Nieakceptowalna: "używamy GPT-4" bez informacji o tym, co dokładnie jest wysyłane do API OpenAI.

**12. Gdzie fizycznie odbywa się przetwarzanie ASR (rozpoznawanie mowy) i NLU (rozumienie języka naturalnego)?**
Akceptowalna odpowiedź: na serwerach w EOG lub lokalnie. Przetwarzanie głosu przez zewnętrzne API poza EOG (np. niektóre usługi ASR w USA) może stanowić problem zgodności z RODO.

**13. Czy dane pacjentów są używane do trenowania lub doskonalenia modeli AI dostawcy?**
Akceptowalna odpowiedź: nie, dane klientów nie są używane do trenowania modeli. Jeśli tak — wymagana wyraźna zgoda i podstawa prawna w art. 9 RODO.

**14. Jak wygląda pseudonimizacja lub anonimizacja danych w procesie przetwarzania AI?**
Akceptowalna odpowiedź: konkretny opis procesu — np. identyfikatory pacjenta zastępowane tokenami w warstwie przetwarzania AI, odwrotne mapowanie tylko w autoryzowanej warstwie aplikacji.

---

## Kategoria 4: Testy bezpieczeństwa i zarządzanie podatnościami

**15. Jak często przeprowadzacie testy penetracyjne? Kto je wykonuje? Czy raporty są dostępne dla klientów?**
Akceptowalna odpowiedź: co najmniej raz w roku, przez niezależny podmiot zewnętrzny, raporty (lub streszczenie wykonawcze) dostępne pod NDA dla klientów.

**16. Czy stosujecie OWASP Top 10 for LLM Applications jako standard bezpieczeństwa dla komponentów AI?**
Akceptowalna odpowiedź: tak — dostawca potrafi opisać, jak mityguje zagrożenia takie jak prompt injection, data poisoning lub model inversion.

**17. W jaki sposób zarządzacie podatnościami (vulnerability management)? Jaki jest czas reakcji na krytyczne CVE?**
Akceptowalna odpowiedź: zdefiniowany SLA na patching — krytyczne podatności: maksymalnie 24–72 godziny, wysokie: 7–14 dni.

**18. Czy stosujecie RBAC (kontrolę dostępu opartą na rolach) i MFA (uwierzytelnianie wieloskładnikowe) dla dostępu pracowników do danych klientów?**
Akceptowalna odpowiedź: tak, oba mechanizmy są obowiązkowe dla każdego pracownika mającego dostęp do danych produkcyjnych.

---

## Kategoria 5: Reagowanie na incydenty i ciągłość działania

**19. Jaka jest procedura powiadamiania klienta w przypadku naruszenia bezpieczeństwa danych?**
Akceptowalna odpowiedź: powiadomienie w ciągu 24–48 godzin od wykrycia incydentu — co umożliwia klinice dotrzymanie 72-godzinnego terminu zgłoszenia do UODO (art. 33 RODO) i ewentualnie do CERT Polska (NIS2, art. 23).

**20. Jakie są parametry RTO (Recovery Time Objective) i RPO (Recovery Point Objective)?**
Akceptowalna odpowiedź: RTO ≤ 4 godziny, RPO ≤ 1 godzina dla systemów medycznych. Brak zdefiniowanych parametrów to sygnał alarmowy.

**21. Czy posiadacie aktualny plan ciągłości działania (BCP) i plan odtworzenia po awarii (DRP)? Kiedy ostatnio był testowany?**
Akceptowalna odpowiedź: tak, testowany co najmniej raz w roku — z dokumentacją wyników ćwiczenia.

**22. Jak obsługujecie incydenty dostępności systemu poza godzinami pracy (nocne awarie, weekendy)?**
Akceptowalna odpowiedź: 24/7 support on-call z zdefiniowanym czasem reakcji dla krytycznych incydentów.

---

## Kategoria 6: Wyjście z umowy i przenoszenie danych

**23. W jakim formacie i w jakim czasie możemy otrzymać kopię wszystkich danych po zakończeniu umowy?**
Akceptowalna odpowiedź: ustrukturyzowany format (CSV, JSON, XML) w ciągu 30 dni od zakończenia umowy — zgodnie z art. 28 ust. 3 lit. g RODO.

**24. Jak przebiega certyfikowane usunięcie danych z Waszych serwerów po zakończeniu współpracy?**
Akceptowalna odpowiedź: usunięcie ze wszystkich kopii (produkcja + backup) z certyfikatem zniszczenia danych, w zdefiniowanym czasie (np. 30–60 dni).

**25. Czy w umowie DPA zawarty jest zakaz udostępniania danych pacjentów osobom trzecim — w tym do celów reklamowych, analitycznych lub szkolenia modeli AI innych podmiotów?**
Akceptowalna odpowiedź: tak, wyraźny zakaz w DPA. Brak tej klauzuli lub jej ogólnikowość to poważny sygnał ryzyka.

---

## Jak interpretować odpowiedzi — trzy sygnały alarmowe

Niezależnie od kategorii pytań, trzy typy odpowiedzi powinny automatycznie wzbudzić ostrożność:

1. **"Tego nie możemy ujawnić"** — tajność procedur bezpieczeństwa jest niezgodna ze standardami audytowalnymi. Bezpieczeństwo powinno być weryfikowalne, nie tylko deklarowane.
2. **"Zajmiemy się tym po podpisaniu umowy"** — kwestie bezpieczeństwa muszą być wyjaśnione przed, nie po.
3. **Brak dokumentów potwierdzających** — certyfikaty, raporty, DPA powinny istnieć i być dostępne na żądanie. Deklaracja słowna bez dokumentu to nie certyfikat.

---

## FAQ — Due diligence zakupowe dla systemów AI w medycynie

**Czy mogę żądać przeprowadzenia własnego audytu technicznego u dostawcy przed podpisaniem umowy?**
Tak — klauzula o prawie do audytu (art. 28 ust. 3 lit. h RODO) powinna znaleźć się w każdej umowie DPA. Przed podpisaniem umowy możesz poprosić o wypełnienie kwestionariusza bezpieczeństwa (security questionnaire) lub udostępnienie raportu z ostatniego audytu zewnętrznego.

**Co jeśli dostawca odmawia odpowiedzi na część pytań — czy to dyskwalifikuje ofertę?**
Nie automatycznie — ale każda odmowa wymaga uzasadnienia. Akceptowalne powody to np. ochrona IP lub umowy z podwykonawcami. Nieakceptowalne: brak procedur, brak certyfikatów lub informacje objęte NDA bez możliwości wglądu przez IOD kliniki.

---

## Podsumowanie: 25 pytań, które odróżniają dostawcę od partnera

Voicebot przetwarzający dane zdrowotne pacjentów to partner w bezpieczeństwie kliniki — nie tylko dostawca oprogramowania. Dostawca, który nie potrafi odpowiedzieć na powyższe pytania lub odpowiada ogólnikami, przerzuca ryzyko prawne i finansowe na Twoją placówkę.

**Sprawdź odpowiedzi VoiceLink na wszystkie 25 pytań →** Przygotujemy dla Ciebie wypełniony Security Questionnaire z dokumentacją certyfikatów, parametrami SLA i wzorcem DPA — gotowy do porównania z ofertami konkurencji.
