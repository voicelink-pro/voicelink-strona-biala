import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CookieDeclaration } from "./cookie-declaration";

export const metadata: Metadata = generatePageMetadata({
  title: "Polityka prywatności",
  description:
    "Polityka prywatności B4wood sp. z o.o. — usługa VoiceLink AI Secretary. Informacje o przetwarzaniu danych osobowych, RODO, cookies.",
  path: "/polityka-prywatnosci",
  noIndex: false,
});

const providers = [
  { name: "OpenAI", desc: "generowanie odpowiedzi AI" },
  { name: "ElevenLabs", desc: "generowanie głosu" },
  { name: "Gladia", desc: "transkrypcje rozmów" },
  { name: "Twilio", desc: "obsługa połączeń telefonicznych i SMS" },
  { name: "Google Cloud", desc: "infrastruktura serwerowa" },
  { name: "MySQL", desc: "baza danych" },
];

const rights = [
  "dostępu do danych",
  "sprostowania",
  "usunięcia",
  "ograniczenia przetwarzania",
  "przenoszenia danych",
  "wniesienia sprzeciwu",
  "wniesienia skargi do Prezesa UODO",
];

const security = [
  "szyfrowanie danych",
  "kontrolę dostępu",
  "segmentację infrastruktury",
  "logowanie dostępu i operacji",
  "regularne testy bezpieczeństwa",
];

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-surface-200/80 bg-white p-8 md:p-10 shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl md:text-2xl font-bold text-primary-950 mb-6 tracking-tight">
      {children}
    </h2>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start text-surface-600">
      <span className="text-primary-500 mr-3 mt-1 font-bold">•</span>
      <span>{children}</span>
    </li>
  );
}

export default function PolitykaPrywatnosciPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 gradient-bg-hero" />
        <Container className="relative">
          <div className="max-w-3xl">
            <Badge
              variant="primary"
              className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase"
            >
              Dokument prawny
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-primary-950 sm:text-4xl lg:text-5xl">
              Polityka{" "}
              <span className="text-primary-500">Prywatności</span>
            </h1>
            <p className="mt-4 text-surface-500">
              B4WOOD SP. Z O.O. — USŁUGA &ldquo;VOICELINK AI SECRETARY&rdquo;
            </p>
            <p className="mt-1 text-sm text-surface-400">
              Data aktualizacji: styczeń 2026
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <Container size="narrow">
          <div className="space-y-6">
            {/* Intro */}
            <SectionCard>
              <p className="text-surface-600 leading-relaxed">
                Niniejsza Polityka Prywatności określa zasady przetwarzania
                danych osobowych przez B4wood sp. z o.o., z siedzibą przy ul.
                Bukowej 21, 87-148 Łysomice, NIP: 8792746178
                (&ldquo;Administrator&rdquo;, &ldquo;my&rdquo;). Dokument
                dotyczy danych osobowych przetwarzanych w związku z korzystaniem
                z usługi VoiceLink – AI Secretary (sekretarki przychodzące oraz
                wychodzące) oraz korzystaniem z naszej strony internetowej i
                panelu klienta.
              </p>
            </SectionCard>

            {/* 1. Administrator */}
            <SectionCard>
              <SectionTitle>1. Kto jest administratorem danych?</SectionTitle>
              <p className="text-surface-600 mb-4 leading-relaxed">
                Administratorem danych osobowych jest:
              </p>
              <div className="rounded-xl bg-primary-50/50 border border-primary-200/60 p-6">
                <p className="text-primary-950 font-semibold mb-2">
                  B4wood sp. z o.o.
                </p>
                <p className="text-surface-600">ul. Bukowa 21</p>
                <p className="text-surface-600">87-148 Łysomice</p>
                <p className="text-surface-600 mb-4">NIP: 8792746178</p>
                <p className="text-surface-600">
                  E-mail:{" "}
                  <a
                    href="mailto:kontakt@voicelink.pl"
                    className="text-primary-500 hover:text-primary-600 font-medium"
                  >
                    kontakt@voicelink.pl
                  </a>
                </p>
              </div>
            </SectionCard>

            {/* 2. Jakie dane */}
            <SectionCard>
              <SectionTitle>2. Jakie dane przetwarzamy?</SectionTitle>

              <h3 className="text-lg font-semibold text-primary-950 mb-3">
                2.1. Dane klientów korzystających z usługi VoiceLink AI
                Secretary
              </h3>
              <p className="text-surface-600 mb-3 leading-relaxed">
                Przetwarzamy następujące dane klientów korzystających z usługi:
              </p>
              <ul className="list-none space-y-2 mb-6">
                <Bullet>imię i nazwisko,</Bullet>
                <Bullet>
                  dane do faktury (NIP, nazwa firmy, adres),
                </Bullet>
                <Bullet>dane logowania do panelu klienta,</Bullet>
                <Bullet>
                  adres e-mail, numer telefonu (kontaktowy),
                </Bullet>
                <Bullet>
                  dane techniczne związane z korzystaniem z panelu (np. adres
                  IP, logi systemowe).
                </Bullet>
              </ul>
              <p className="text-surface-400 italic leading-relaxed mb-8">
                Dane płatnicze nie są przez nas przetwarzane — nie korzystamy z
                zewnętrznych operatorów płatności.
              </p>

              <h3 className="text-lg font-semibold text-primary-950 mb-3">
                2.2. Dane osób kontaktujących się z naszymi klientami
              </h3>
              <p className="text-surface-600 mb-3 leading-relaxed">
                Przetwarzamy wyłącznie dane, które są niezbędne do wykonania
                usługi:
              </p>
              <ul className="list-none space-y-2 mb-6">
                <Bullet>numer telefonu rozmówcy,</Bullet>
                <Bullet>
                  imię i/lub nazwisko (jeśli zostanie podane),
                </Bullet>
                <Bullet>treść rozmowy,</Bullet>
                <Bullet>
                  nagranie rozmowy (jeśli nagrywanie zostało aktywowane przez
                  klienta),
                </Bullet>
                <Bullet>transkrypcja rozmowy,</Bullet>
                <Bullet>
                  treść SMS wysłanych i odebranych w ramach obsługi,
                </Bullet>
                <Bullet>dane firmowe przekazane w rozmowie.</Bullet>
              </ul>

              <div className="rounded-xl bg-amber-50/60 border border-amber-200/60 p-6">
                <p className="text-amber-700 font-semibold mb-2">WAŻNE:</p>
                <p className="text-surface-600 leading-relaxed">
                  Administrator nie przetwarza danych szczególnych kategorii
                  (tzw. danych wrażliwych). W szczególności usługa nie jest
                  przeznaczona do przetwarzania danych medycznych, zdrowotnych,
                  genetycznych, dotyczących pochodzenia etnicznego, poglądów
                  politycznych itp.
                </p>
              </div>
            </SectionCard>

            {/* 3. Cel i podstawy */}
            <SectionCard>
              <SectionTitle>3. Cel i podstawy przetwarzania</SectionTitle>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-primary-950 mb-3">
                    3.1. Realizacja usługi dla klienta
                  </h3>
                  <p className="text-surface-600 mb-3 leading-relaxed">
                    <span className="font-semibold text-primary-950">
                      Podstawa prawna:
                    </span>{" "}
                    art. 6 ust. 1 lit. b RODO – przetwarzanie niezbędne do
                    wykonania umowy.
                  </p>
                  <p className="text-surface-600 mb-3">Obejmuje to m.in.:</p>
                  <ul className="list-none space-y-2">
                    <Bullet>
                      odbieranie połączeń i prowadzenie rozmów przychodzących,
                    </Bullet>
                    <Bullet>
                      wykonywanie połączeń wychodzących na zlecenie klienta,
                    </Bullet>
                    <Bullet>tworzenie transkrypcji,</Bullet>
                    <Bullet>
                      wykonywanie akcji ustalonych przez klienta (np. umawianie
                      wizyt, tworzenie zamówień),
                    </Bullet>
                    <Bullet>
                      wysyłanie wiadomości SMS wyłącznie w ramach obsługi,
                    </Bullet>
                    <Bullet>
                      integrację z CRM klienta (jedynie przepływ danych –
                      Administrator ich nie przechowuje).
                    </Bullet>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary-950 mb-3">
                    3.2. Nagrywanie rozmów
                  </h3>
                  <p className="text-surface-600 mb-2 leading-relaxed">
                    Nagrywanie rozmów odbywa się wyłącznie na wyraźne polecenie
                    klienta.
                  </p>
                  <p className="text-surface-600 mb-2 leading-relaxed">
                    Klient jest zobowiązany do poinformowania swoich rozmówców o
                    nagrywaniu rozmów zgodnie z przepisami prawa.
                  </p>
                  <p className="text-surface-600 leading-relaxed">
                    <span className="font-semibold text-primary-950">
                      Podstawa prawna:
                    </span>{" "}
                    art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes
                    klienta.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary-950 mb-3">
                    3.3. Tworzenie transkrypcji rozmów
                  </h3>
                  <p className="text-surface-600 mb-2 leading-relaxed">
                    Tworzenie transkrypcji realizowane jest przy użyciu
                    zewnętrznych dostawców technologii (np. Gladia).
                  </p>
                  <p className="text-surface-600 leading-relaxed">
                    <span className="font-semibold text-primary-950">
                      Podstawa prawna:
                    </span>{" "}
                    art. 6 ust. 1 lit. b RODO – wykonanie umowy.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary-950 mb-3">
                    3.4. Automatyczne podejmowanie decyzji przez AI
                  </h3>
                  <p className="text-surface-600 mb-3 leading-relaxed">
                    Usługa może wykonywać działania obejmujące:
                  </p>
                  <ul className="list-none space-y-2 mb-3">
                    <Bullet>kwalifikację leadów,</Bullet>
                    <Bullet>umawianie spotkań,</Bullet>
                    <Bullet>przypisywanie rozmów do kategorii,</Bullet>
                    <Bullet>
                      podejmowanie działań wynikających z konfiguracji klienta.
                    </Bullet>
                  </ul>
                  <p className="text-surface-600 mb-2 leading-relaxed">
                    <span className="font-semibold text-primary-950">
                      Podstawa prawna:
                    </span>{" "}
                    art. 6 ust. 1 lit. b RODO – niezbędne do świadczenia usługi.
                  </p>
                  <p className="text-surface-400 italic leading-relaxed">
                    Nie stosujemy profilowania w rozumieniu art. 22 RODO.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* 4. Podmioty przetwarzające */}
            <SectionCard>
              <SectionTitle>
                4. Podmioty przetwarzające (dostawcy)
              </SectionTitle>
              <p className="text-surface-600 mb-4 leading-relaxed">
                W ramach świadczenia usługi korzystamy z podwykonawców
                technologicznych:
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {providers.map((p) => (
                  <div
                    key={p.name}
                    className="rounded-xl border border-surface-200/80 bg-surface-50/50 p-4"
                  >
                    <p className="text-primary-950 font-medium">• {p.name}</p>
                    <p className="text-surface-400 text-sm">{p.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-surface-600 mb-2 leading-relaxed">
                Wszyscy podwykonawcy stosują standardy bezpieczeństwa zgodne z
                RODO.
              </p>
              <p className="text-surface-600 leading-relaxed">
                Dane są hostowane w Polsce / na terenie UE.
              </p>
            </SectionCard>

            {/* 5. Okres przechowywania */}
            <SectionCard>
              <SectionTitle>5. Okres przechowywania danych</SectionTitle>
              <ul className="list-none space-y-3">
                {[
                  { label: "transkrypcje rozmów:", value: "30 dni" },
                  { label: "logi komunikacji:", value: "30 dni" },
                  {
                    label: "dane klientów w panelu:",
                    value: "do czasu rozwiązania umowy",
                  },
                  {
                    label: "dane techniczne (logi):",
                    value: "maksymalnie 30 dni",
                  },
                  {
                    label: "korespondencja e-mailowa:",
                    value:
                      "do 1 roku, chyba że przepisy wymagają inaczej",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start text-surface-600">
                    <span className="text-primary-500 mr-3 mt-1 font-bold">
                      •
                    </span>
                    <span>
                      <span className="font-semibold text-primary-950">
                        {item.label}
                      </span>{" "}
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            {/* 6. Odbiorcy danych */}
            <SectionCard>
              <SectionTitle>6. Odbiorcy danych</SectionTitle>
              <p className="text-surface-600 mb-4 leading-relaxed">
                Dane mogą być przekazywane:
              </p>
              <ul className="list-none space-y-2 mb-6">
                <Bullet>
                  podwykonawcom technologicznym (wymienionym wyżej),
                </Bullet>
                <Bullet>
                  firmom księgowym (wyłącznie dane do faktur),
                </Bullet>
                <Bullet>
                  podmiotom uprawnionym na podstawie przepisów prawa (np. sądom,
                  organom ścigania).
                </Bullet>
              </ul>
              <p className="text-primary-950 font-semibold leading-relaxed">
                Administrator nie sprzedaje żadnych danych osobowych.
              </p>
            </SectionCard>

            {/* 7. Prawa */}
            <SectionCard>
              <SectionTitle>
                7. Prawa osób, których dane dotyczą
              </SectionTitle>
              <p className="text-surface-600 mb-4 leading-relaxed">
                Każda osoba ma prawo do:
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {rights.map((r) => (
                  <div key={r} className="flex items-start text-surface-600">
                    <span className="text-primary-500 mr-3 mt-1">•</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
              <p className="text-surface-600 leading-relaxed">
                W sprawach dotyczących danych osobowych można się kontaktować
                pod adresem:{" "}
                <a
                  href="mailto:kontakt@voicelink.pl"
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  kontakt@voicelink.pl
                </a>
              </p>
            </SectionCard>

            {/* 8. Cookies */}
            <SectionCard>
              <SectionTitle>8. Cookies</SectionTitle>
              <p className="text-surface-600 leading-relaxed mb-6">
                Poniżej znajduje się szczegółowa deklaracja plików cookies
                używanych na naszej stronie:
              </p>
              <CookieDeclaration />
            </SectionCard>

            {/* 9. Przekazywanie poza EOG */}
            <SectionCard>
              <SectionTitle>
                9. Przekazywanie danych poza EOG
              </SectionTitle>
              <p className="text-surface-600 mb-4 leading-relaxed">
                Co do zasady dane nie są przekazywane poza Europejski Obszar
                Gospodarczy.
              </p>
              <p className="text-surface-600 mb-4 leading-relaxed">
                Jeśli dojdzie do przekazania danych (np. w ramach usług
                chmurowych), odbywa się ono na podstawie:
              </p>
              <ul className="list-none space-y-2">
                <Bullet>standardowych klauzul umownych (SCC),</Bullet>
                <Bullet>wiążących reguł korporacyjnych,</Bullet>
                <Bullet>
                  innych mechanizmów dopuszczonych przez RODO.
                </Bullet>
              </ul>
            </SectionCard>

            {/* 10. Zabezpieczenia */}
            <SectionCard>
              <SectionTitle>10. Zabezpieczenia</SectionTitle>
              <p className="text-surface-600 mb-4 leading-relaxed">
                Stosujemy odpowiednie środki techniczne i organizacyjne, w tym:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {security.map((s) => (
                  <div key={s} className="flex items-start text-surface-600">
                    <span className="text-primary-500 mr-3 mt-1">•</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 11. Zmiany */}
            <SectionCard>
              <SectionTitle>11. Zmiany polityki</SectionTitle>
              <p className="text-surface-600 leading-relaxed">
                Administrator może aktualizować niniejszą politykę. O wszelkich
                zmianach poinformujemy poprzez publikację jej nowej wersji na
                stronie internetowej.
              </p>
            </SectionCard>

            {/* Back */}
            <div className="text-center pt-6">
              <Link href="/">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="h-4 w-4" /> Powrót do strony głównej
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
