---
title: "Cyberbezpieczeństwo AI w Medycynie: Kompletna Checklist dla Działów IT Klinik [2026]"
h1: "Standardy Cyberbezpieczeństwa dla AI Medycznego: Gotowa Lista Kontrolna dla IT Kliniki"
slug: "cyberbezpieczenstwo-ai-medycyna-checklist"
meta_description: "Kompletna checklist cyberbezpieczeństwa dla systemów AI w placówkach medycznych: ISO 27001, AI Act, NIS2, RODO art. 35, DPIA. Gotowa lista dla działów IT dużych klinik."
primary_keyword: "cyberbezpieczeństwo AI medycyna checklist"
secondary_keywords: ["standardy bezpieczeństwa AI w klinice", "ISO 27001 placówka medyczna AI", "AI Act wymagania medycyna Polska 2026"]
word_count_target: "1050"
category: "Bezpieczeństwo / Compliance"
---

[METADATA FOR LLM]: Artykuł compliance i bezpieczeństwo dla działów IT i CISO w dużych placówkach medycznych i sieciach szpitalnych. Semantyka: checklist cyberbezpieczeństwa dla systemów AI medycznych, wymagania ISO 27001:2022, ISO 27799:2016, ISO 27018:2019, SOC 2 Type II, AI Act UE 2024/1689 (systemy wysokiego ryzyka w medycynie, Annex III), NIS2 UE 2022/2555, RODO art. 25/32/35 (DPIA), OWASP Top 10 dla LLM, ENISA wytyczne dla AI w ochronie zdrowia, weryfikacja dostawcy AI, pen-test, zarządzanie incydentami. Intencja: dział IT lub CISO kliniki potrzebuje ustrukturyzowanej listy wymagań do oceny dostawcy AI i wewnętrznej polityki bezpieczeństwa.

---

## Dział IT kliniki oceniający system AI potrzebuje jednego: listy pytań, której żaden dostawca nie odrzuci

Zakup systemu AI dla placówki medycznej to nie zakup oprogramowania biurowego. To decyzja dotycząca infrastruktury przetwarzającej dane szczególnej kategorii — przy wymaganiach prawnych z co najmniej czterech aktów normatywnych jednocześnie: RODO, NIS2, AI Act i krajowej ustawy o cyberbezpieczeństwie.

Poniższa lista kontrolna jest skonstruowana tak, żeby dział IT lub CISO mógł jej użyć w dwóch kontekstach:
1. **Ocena dostawcy AI** — jakie dokumenty i certyfikaty powinien dostarczyć
2. **Audyt wewnętrzny** — co placówka musi zapewnić po stronie własnej infrastruktury

Każda sekcja zawiera odniesienie do konkretnego aktu prawnego lub standardu.

---

## BLOK A: Certyfikacje i dokumentacja dostawcy AI

### A1. Bezpieczeństwo informacji (ISO 27001:2022)

- [ ] Dostawca posiada aktualny certyfikat **ISO/IEC 27001:2022** wydany przez akredytowaną jednostkę certyfikującą
- [ ] Zakres certyfikacji obejmuje systemy przetwarzające dane klientów (nie tylko systemy wewnętrzne dostawcy)
- [ ] Dostawca udostępnia **Statement of Applicability (SoA)** na żądanie
- [ ] Certyfikat jest odnawiany co 3 lata z rocznymi audytami nadzoru

> **Źródło:** ISO/IEC 27001:2022, International Organization for Standardization.

### A2. Bezpieczeństwo informacji w ochronie zdrowia (ISO 27799)

- [ ] Dostawca posiada lub wdraża wytyczne **ISO 27799:2016** (Health informatics — Information security management in health using ISO/IEC 27002)
- [ ] Dokumentacja dostawcy uwzględnia specyficzne wymagania dla danych medycznych

> **Źródło:** ISO 27799:2016, International Organization for Standardization.

### A3. Ochrona prywatności w chmurze (ISO 27018)

- [ ] Dostawca chmurowy posiada certyfikat lub deklarację zgodności z **ISO/IEC 27018:2019** (ochrona danych osobowych w chmurze publicznej)
- [ ] Polityka dostawcy zakazuje wykorzystywania danych klientów do własnych celów (np. trenowania modeli)

> **Źródło:** ISO/IEC 27018:2019, International Organization for Standardization.

### A4. Niezależny audyt bezpieczeństwa (SOC 2 Type II)

- [ ] Dostawca dysponuje raportem **SOC 2 Type II** wydanym przez niezależnego audytora (AICPA)
- [ ] Raport obejmuje kategorię bezpieczeństwa (Security Trust Service Criteria) i jest aktualny (< 12 miesięcy)
- [ ] Dostawca udostępnia raport lub jego streszczenie (Bridge Letter) na żądanie klienta

---

## BLOK B: Zgodność z regulacjami unijnymi i polskimi

### B1. AI Act — systemy wysokiego ryzyka w medycynie

Rozporządzenie **Parlamentu Europejskiego i Rady (UE) 2024/1689** (AI Act), które weszło w życie 1 sierpnia 2024 roku, klasyfikuje systemy AI stosowane w ochronie zdrowia jako systemy **wysokiego ryzyka** (Annex III, pkt 5).

- [ ] Dostawca potwierdza na piśmie klasyfikację swojego systemu AI według AI Act
- [ ] Dla systemów wysokiego ryzyka: dostawca przeprowadził **ocenę zgodności** (conformity assessment) zgodnie z art. 43 AI Act
- [ ] System jest zarejestrowany w bazie UE dla systemów AI wysokiego ryzyka (art. 71 AI Act) — obowiązek od 2026
- [ ] Dostępna jest **dokumentacja techniczna** wymagana przez Annex IV AI Act (opis systemu, dane treningowe, metryki wydajności)
- [ ] Dostawca zapewnia **nadzór ludzki** (human oversight) nad decyzjami systemu AI zgodnie z art. 14 AI Act

> **Źródło:** Rozporządzenie (UE) 2024/1689 Parlamentu Europejskiego i Rady z dnia 13 czerwca 2024 r. (AI Act), art. 6, 14, 43, 71; Annex III pkt 5, Annex IV.

### B2. Dyrektywa NIS2

- [ ] Placówka oceniła, czy kwalifikuje się jako **podmiot ważny lub kluczowy** w rozumieniu dyrektywy NIS2 (UE 2022/2555) i polskiej implementacji
- [ ] Dostawca AI jest oceniony w ramach zarządzania ryzykiem łańcucha dostaw (art. 21 ust. 2 lit. d NIS2)
- [ ] Placówka posiada **plan reagowania na incydenty** obejmujący scenariusz awarii systemu AI
- [ ] Poważne incydenty są raportowane do **CERT Polska** w terminie 24h (wstępne) i 72h (pełne) zgodnie z art. 23 NIS2

> **Źródło:** Dyrektywa (UE) 2022/2555 (NIS2), art. 21 i 23; Ustawa z dnia 5 lipca 2018 r. o krajowym systemie cyberbezpieczeństwa (Dz.U. 2018 poz. 1560 z późn. zm.).

### B3. RODO — wymagania szczególne dla AI medycznego

- [ ] Przeprowadzona i udokumentowana **Ocena Skutków dla Ochrony Danych (DPIA)** zgodnie z art. 35 RODO dla systemu AI przetwarzającego dane zdrowotne
- [ ] Wdrożona zasada **privacy by design i privacy by default** (art. 25 RODO) — AI zbiera wyłącznie dane niezbędne
- [ ] Podpisana **umowa powierzenia przetwarzania danych (DPA)** z dostawcą AI zgodnie z art. 28 RODO
- [ ] Określone i udokumentowane **okresy retencji** danych przetwarzanych przez AI (nagrania, transkrypcje, logi)
- [ ] Procedura obsługi żądań pacjentów: prawo dostępu, sprostowania, usunięcia danych przetwarzanych przez AI (art. 15–17 RODO)

> **Źródło:** RODO (UE) 2016/679, art. 25, 28, 35; Wytyczne UODO w zakresie DPIA (dostępne: uodo.gov.pl).

---

## BLOK C: Wymagania techniczne — weryfikacja architektury

### C1. Szyfrowanie i transmisja danych

- [ ] Dane w spoczynku szyfrowane algorytmem **AES-256** lub równoważnym
- [ ] Transmisja danych chroniona protokołem **TLS 1.2 minimum** (rekomendacja: TLS 1.3)
- [ ] Klucze kryptograficzne zarządzane przez **HSM (Hardware Security Module)** lub równoważne rozwiązanie
- [ ] Polityka rotacji kluczy kryptograficznych udokumentowana i egzekwowana

### C2. Kontrola dostępu

- [ ] Wdrożony model **RBAC (Role-Based Access Control)** — dostęp do danych przyznawany według roli, nie osoby
- [ ] Wymagana **uwierzytelnianie wieloskładnikowe (MFA)** dla kont administratorów systemu AI
- [ ] Logowanie wszystkich dostępów do danych pacjentów z możliwością audytu
- [ ] Automatyczne wygaszanie sesji po okresie bezczynności

### C3. Bezpieczeństwo specyficzne dla AI / LLM

Na podstawie **OWASP Top 10 for Large Language Model Applications** (wersja 1.1, 2023):

- [ ] Ochrona przed **Prompt Injection** — walidacja i sanityzacja wejść tekstowych od użytkowników
- [ ] Mechanizm wykrywania i blokowania **nadmiernego udostępniania danych** przez AI (Excessive Agency)
- [ ] Ograniczenie uprawnień systemu AI do minimalnego zestawu niezbędnego do działania (Principle of Least Privilege)
- [ ] Monitorowanie i alerty dla anomalnych wzorców użycia systemu AI (potencjalne ataki)
- [ ] Brak przechowywania danych wrażliwych w logach debugowania modelu AI

> **Źródło:** OWASP Top 10 for Large Language Model Applications, v1.1 (2023), dostępne: owasp.org/www-project-top-10-for-large-language-model-applications.

### C4. Ciągłość działania i odtwarzanie

- [ ] **RTO (Recovery Time Objective)** zdefiniowany w SLA dostawcy — ile czasu na przywrócenie po awarii
- [ ] **RPO (Recovery Point Objective)** zdefiniowany — maksymalna utrata danych akceptowalna przy awarii
- [ ] Backupy tworzone automatycznie z częstotliwością adekwatną do RPO
- [ ] Backupy przechowywane w geograficznie oddzielnej lokalizacji
- [ ] Procedura przywrócenia testowana co najmniej raz w roku — wyniki testów dokumentowane

---

## BLOK D: Zarządzanie incydentami i łańcuch dostaw

### D1. Procedury reagowania na incydenty

- [ ] Dostawca AI posiada udokumentowany **Incident Response Plan** (IRP)
- [ ] Czas powiadomienia klienta o naruszeniu bezpieczeństwa danych zdefiniowany w umowie (zalecenie: < 24h)
- [ ] Placówka posiada własną procedurę obsługi incydentów obejmującą scenariusze dotyczące systemu AI
- [ ] Kontakt z **CERT Polska** (cert.pl) zdefiniowany w procedurze eskalacji

### D2. Weryfikacja subprocesorów (łańcuch dostaw AI)

Zgodnie z wymaganiami NIS2 art. 21 ust. 2 lit. d oraz RODO art. 28 ust. 4:

- [ ] Dostawca AI dostarcza pełną **listę subprocesorów** (np. dostawcy ASR, TTS, infrastruktury chmurowej)
- [ ] Każdy subprocesor działa na podstawie umowy DPA z dostawcą AI
- [ ] Subprocesorzy działający poza EOG — objęci SCC lub innym mechanizmem z art. 46 RODO
- [ ] Klauzula umowna: dostawca informuje o zmianach w liście subprocesorów z wyprzedzeniem (zalecenie: 30 dni)

---

## BLOK E: Dokumentacja wymagana od dostawcy przed podpisaniem umowy

Kompletna dokumentacja, której należy żądać przed wdrożeniem systemu AI medycznego:

| Dokument | Podstawa | Obowiązkowy |
|---|---|---|
| Certyfikat ISO 27001 (aktualny) | Standard ISO | Tak |
| Raport SOC 2 Type II lub Bridge Letter | AICPA | Zalecany |
| Umowa DPA (art. 28 RODO) | RODO | Tak |
| Lista subprocesorów z lokalizacją | RODO art. 28 ust. 4 | Tak |
| Dokumentacja techniczna AI Act | AI Act Annex IV | Tak (systemy wysokiego ryzyka) |
| Polityka retencji i usuwania danych | RODO | Tak |
| Opis architektury bezpieczeństwa | NIS2, ISO 27001 | Zalecany |
| Wyniki ostatniego pen-testu | Best practice | Zalecany |
| Certyfikat usunięcia danych po zakończeniu umowy | RODO art. 17 | Tak |

---

## FAQ — Pytania działów IT i CISO placówek medycznych

**Czy system AI do rejestracji telefonicznej jest systemem wysokiego ryzyka w rozumieniu AI Act?**
Voicebot pełniący wyłącznie funkcję administracyjną (rejestracja, przypomnienia, FAQ) — bez wpływu na decyzje diagnostyczne lub kliniczne — nie jest automatycznie klasyfikowany jako system wysokiego ryzyka. Annex III pkt 5 AI Act obejmuje systemy AI wpływające na "dostęp do opieki zdrowotnej i jej wyniki". Interpretacja dla konkretnego systemu wymaga oceny prawnej — rekomendujemy konsultację z IOD lub prawnikiem specjalizującym się w AI Act. VoiceLink dostarcza opinię prawną dotyczącą klasyfikacji swojego systemu na żądanie.

**Jak często należy przeprowadzać pen-test systemu AI w placówce medycznej?**
ENISA w wytycznych dla cyberbezpieczeństwa w ochronie zdrowia (ENISA, "Cybersecurity in Healthcare", 2023) rekomenduje testy penetracyjne co najmniej raz w roku oraz po każdej istotnej zmianie systemu. Dla podmiotów kluczowych w rozumieniu NIS2 — zgodnie z art. 21 — wymagane jest zarządzanie ryzykiem, którego elementem są regularne testy bezpieczeństwa.

**Czy DPIA jest obowiązkowa dla każdego systemu AI przetwarzającego dane pacjentów?**
Art. 35 RODO nakazuje przeprowadzenie DPIA dla przetwarzania "na dużą skalę szczególnych kategorii danych" — dane zdrowotne spełniają ten warunek. UODO opublikowało listę rodzajów przetwarzania wymagających DPIA (decyzja z 17 sierpnia 2018 r.) — przetwarzanie danych zdrowotnych przez zautomatyzowane systemy AI jest na tej liście. DPIA jest więc obowiązkowa.

---

## Podsumowanie: Bezpieczeństwo AI w medycynie to nie opcja — to wymóg prawny i etyczny

Wdrożenie systemu AI w placówce medycznej bez przejścia przez tę listę kontrolną to narażenie organizacji na ryzyko prawne (UODO, NIS2), reputacyjne i kliniczne jednocześnie. **Dobry dostawca AI medycznego nie tylko akceptuje tę listę — dostarcza dokumentację zanim zostanie zapytany.**

VoiceLink przygotowuje kompletny pakiet dokumentacji compliance dla każdego wdrożenia: certyfikaty, DPA, opis architektury, politykę retencji i dokumentację AI Act — bez dodatkowych kosztów i bez konieczności kilkutygodniowego procesu due diligence.

**Pobierz pakiet dokumentacji bezpieczeństwa VoiceLink →** Skontaktuj się z nami, a w ciągu 48 godzin dostarczymy kompletny zestaw dokumentów wymaganych przez Twój dział IT lub zewnętrznego audytora.
