import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Regulamin",
  description:
    "Regulamin usługi VoiceLink AI Secretary — B4wood sp. z o.o. Warunki świadczenia usługi, rozliczenia, odpowiedzialność.",
  path: "/regulamin",
  noIndex: false,
});

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-surface-200/80 bg-white p-8 md:p-10 shadow-[var(--shadow-card)]">
      <h2 className="text-xl md:text-2xl font-bold text-primary-950 mb-6 tracking-tight">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-surface-600 leading-relaxed">{children}</p>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start text-surface-600">
      <span className="text-primary-500 mr-3 mt-1 font-bold">•</span>
      <span>{children}</span>
    </li>
  );
}

function Def({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-primary-950 font-semibold mb-1">{term}</p>
      {children}
    </div>
  );
}

export default function RegulaminPage() {
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
              <span className="text-primary-500">Regulamin</span>
            </h1>
            <p className="mt-4 text-surface-500">
              Usługa VoiceLink AI Secretary
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <Container size="narrow">
          <div className="space-y-6">
            {/* §1 */}
            <SectionCard title="§1. Definicje">
              <Def term="Usługodawca">
                <P>
                  – B4wood spółka z ograniczoną odpowiedzialnością z siedzibą w
                  Łysomicach, ul. Bukowa 21, 87-148 Łysomice, NIP 8792746178,
                  wpisana do rejestru przedsiębiorców KRS.
                </P>
              </Def>
              <Def term="Usługa">
                <p className="text-surface-600 mb-2 leading-relaxed">
                  – usługa wdrożenia oraz utrzymania systemu sztucznej
                  inteligencji pod nazwą &ldquo;AI Voice Receptionist&rdquo;,
                  pozwalająca na realizację wybranych procesów komunikacyjnych
                  klienta, takich jak:
                </p>
                <ul className="list-none space-y-2">
                  <Bullet>odbieranie połączeń telefonicznych,</Bullet>
                  <Bullet>wykonywanie połączeń wychodzących,</Bullet>
                  <Bullet>
                    odbieranie i wysyłanie wiadomości SMS,
                  </Bullet>
                  <Bullet>integracja z systemami CRM,</Bullet>
                  <Bullet>
                    automatyzacja procesów (np. rezerwacje, obsługa zapytań,
                    działania informacyjne),
                  </Bullet>
                  <Bullet>
                    inne funkcjonalności określone indywidualnie w umowie.
                  </Bullet>
                </ul>
              </Def>
              <Def term="Klient">
                <P>– przedsiębiorca korzystający z Usługi.</P>
              </Def>
              <Def term="Umowa">
                <P>
                  – indywidualna umowa wdrożeniowa zawierana między Usługodawcą
                  a Klientem, określająca zakres funkcjonalny i kosztowy usługi.
                </P>
              </Def>
              <Def term="System">
                <P>
                  – system sztucznej inteligencji skonfigurowany i utrzymywany
                  przez Usługodawcę na rzecz Klienta.
                </P>
              </Def>
            </SectionCard>

            {/* §2 */}
            <SectionCard title="§2. Zakres świadczonych usług">
              <P>
                Usługodawca świadczy Usługę polegającą na przygotowaniu,
                konfiguracji i utrzymaniu Systemu AI dopasowanego do potrzeb
                Klienta.
              </P>
              <P>
                Zakres funkcjonalny każdorazowo określa indywidualna umowa, a
                regulamin stanowi jej integralną część.
              </P>
              <P>
                Usługodawca świadczy wyłącznie usługę
                informatyczną/automatyzacji komunikacji. System nie stanowi
                samodzielnego produktu i nie jest udostępniany do instalacji
                przez Klienta.
              </P>
              <P>
                Klient przyjmuje do wiadomości, że poszczególne wdrożenia mogą
                różnić się zakresem funkcji w zależności od potrzeb i ustaleń.
              </P>
            </SectionCard>

            {/* §3 */}
            <SectionCard title="§3. Warunki świadczenia usługi">
              <P>
                Korzystanie z Usługi wymaga zawarcia pisemnej umowy
                wdrożeniowej.
              </P>
              <P>
                Minimalny okres współpracy wynosi{" "}
                <span className="font-semibold text-primary-950">
                  2 miesiące
                </span>
                , liczony od daty uruchomienia Systemu.
              </P>
              <P>
                Po zakończeniu okresu obowiązywania umowy, świadczenie Usługi
                wymaga zawarcia nowej umowy lub aneksu. Usługa nie odnawia się
                automatycznie.
              </P>
              <P>
                Usługodawca zapewnia wsparcie techniczne w dni robocze w
                godzinach{" "}
                <span className="font-semibold text-primary-950">
                  8:00–17:00
                </span>
                .
              </P>
            </SectionCard>

            {/* §4 */}
            <SectionCard title="§4. Model rozliczeń">
              <P>
                Klient uiszcza jednorazową opłatę wdrożeniową oraz miesięczną
                opłatę abonamentową, określoną w indywidualnej umowie.
              </P>
              <P>
                Usługodawca wystawia fakturę VAT, a płatność odbywa się w
                drodze przelewu bankowego.
              </P>
              <p className="text-surface-600 mb-3 leading-relaxed">
                W przypadku braku płatności Usługodawca może:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <Bullet>
                  wezwać Klienta do zapłaty z wyznaczeniem dodatkowego terminu,
                </Bullet>
                <Bullet>
                  zablokować dostęp do Usługi po bezskutecznym upływie terminu.
                </Bullet>
              </ul>
              <P>Odblokowanie Systemu może wymagać dodatkowej opłaty.</P>
            </SectionCard>

            {/* §5 */}
            <SectionCard title="§5. Dane i treści przetwarzane w ramach usługi">
              <p className="text-surface-600 mb-3 leading-relaxed">
                W ramach Usługi Usługodawca może przetwarzać dane podane przez
                Klienta, takie jak:
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                {[
                  "nazwy firm,",
                  "imiona i nazwiska,",
                  "numery telefonów, adresy e-mail,",
                  "transkrypcje rozmów, logi komunikacji.",
                ].map((t) => (
                  <div key={t} className="flex items-start text-surface-600">
                    <span className="text-primary-500 mr-3 mt-1">•</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <P>
                Dane są przechowywane i przetwarzane wyłącznie na terytorium
                Polski.
              </P>
              <P>
                Zakres, sposób i cel przetwarzania danych określa indywidualna
                umowa wdrożeniowa oraz umowa powierzenia (jeśli jest stosowana).
              </P>
              <P>
                Klient odpowiada za legalność udostępnianych danych oraz za
                treści i polecenia kierowane przez niego do Systemu.
              </P>
            </SectionCard>

            {/* §6 */}
            <SectionCard title="§6. Zasady korzystania z usługi">
              <p className="text-surface-600 mb-3 leading-relaxed">
                Zabronione jest wykorzystywanie Usługi do działań:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <Bullet>sprzecznych z prawem,</Bullet>
                <Bullet>
                  naruszających dobra osobiste osób trzecich,
                </Bullet>
                <Bullet>
                  stanowiących spam lub nielegalny telemarketing,
                </Bullet>
                <Bullet>
                  mogących narazić Usługodawcę na odpowiedzialność prawną.
                </Bullet>
              </ul>
              <P>
                Klient ponosi pełną odpowiedzialność za działania wykonywane
                przez System zgodnie z konfiguracją zleconą Usługodawcy.
              </P>
              <P>
                System może wykonywać połączenia i wysyłać SMS-y również na
                numery zagraniczne, jeśli Klient tego zażąda i pokryje koszty.
              </P>
            </SectionCard>

            {/* §7 */}
            <SectionCard title="§7. Odpowiedzialność">
              <p className="text-surface-600 mb-3 leading-relaxed">
                Usługodawca nie ponosi odpowiedzialności za:
              </p>
              <ul className="list-none space-y-2 mb-6">
                <Bullet>utracone korzyści Klienta,</Bullet>
                <Bullet>szkody pośrednie,</Bullet>
                <Bullet>
                  treść komunikacji realizowanej przez System w imieniu Klienta,
                </Bullet>
                <Bullet>
                  skutki błędnych poleceń przekazanych przez Klienta,
                </Bullet>
                <Bullet>
                  przerwy w działaniu wynikające z awarii zewnętrznych
                  operatorów telekomunikacyjnych i serwerowych.
                </Bullet>
              </ul>
              <div className="rounded-xl bg-primary-50/50 border border-primary-200/60 p-6">
                <p className="text-primary-950 font-semibold mb-2">
                  Ograniczenie odpowiedzialności
                </p>
                <p className="text-surface-600 leading-relaxed">
                  Odpowiedzialność Usługodawcy jest ograniczona do kwoty
                  jednego miesięcznego abonamentu obowiązującego Klienta.
                </p>
              </div>
              <P>
                Usługa jest świadczona z wykorzystaniem zewnętrznych narzędzi i
                integracji, a Usługodawca nie gwarantuje ich pełnej
                dostępności.
              </P>
            </SectionCard>

            {/* §8 */}
            <SectionCard title="§8. Reklamacje">
              <P>
                Klient może zgłosić reklamację drogą mailową na adres wskazany
                przez Usługodawcę.
              </P>
              <p className="text-surface-600 mb-3 leading-relaxed">
                Reklamacja powinna zawierać:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <Bullet>dane Klienta,</Bullet>
                <Bullet>opis problemu,</Bullet>
                <Bullet>datę wystąpienia,</Bullet>
                <Bullet>kontakt do osoby odpowiedzialnej.</Bullet>
              </ul>
              <P>
                Usługodawca rozpatruje reklamację w terminie{" "}
                <span className="font-semibold text-primary-950">
                  14 dni roboczych
                </span>
                .
              </P>
              <P>
                W przypadku potrzeby dodatkowych ustaleń, Usługodawca może
                zaproponować spotkanie lub rozmowę techniczną.
              </P>
            </SectionCard>

            {/* §9 */}
            <SectionCard title="§9. Rozwiązanie umowy">
              <P>
                Klient może wypowiedzieć umowę ze skutkiem natychmiastowym, przy
                czym zobowiązany jest do zapłaty pełnego abonamentu za
                rozpoczęty miesiąc.
              </P>
              <p className="text-surface-600 mb-3 leading-relaxed">
                Usługodawca może rozwiązać umowę ze skutkiem natychmiastowym,
                jeśli Klient:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <Bullet>narusza warunki regulaminu,</Bullet>
                <Bullet>nie uiszcza opłat,</Bullet>
                <Bullet>
                  wykorzystuje System niezgodnie z prawem.
                </Bullet>
              </ul>
              <P>
                Po rozwiązaniu Umowy Usługodawca wyłącza dostęp do Systemu, a
                Klient traci licencję.
              </P>
            </SectionCard>

            {/* §10 */}
            <SectionCard title="§10. Licencja i prawa autorskie">
              <P>
                Klient otrzymuje niewyłączną licencję na korzystanie z Systemu
                w okresie obowiązywania umowy.
              </P>
              <P>
                Po zakończeniu umowy licencja wygasa, a Usługodawca ma prawo
                wyłączyć funkcjonowanie Systemu.
              </P>
              <P>
                Usługodawca zachowuje pełne prawa własności intelektualnej do
                narzędzi, modeli, komponentów i konfiguracji wykorzystanych w
                Systemie.
              </P>
              <P>
                Usługodawca może wykorzystywać część rozwiązań, schematów i
                konfiguracji u innych klientów.
              </P>
            </SectionCard>

            {/* §11 */}
            <SectionCard title="§11. Prawo właściwe i jurysdykcja">
              <P>Regulamin podlega prawu polskiemu.</P>
              <P>
                Wszelkie spory będą rozpatrywane przez sąd właściwy dla
                siedziby Usługodawcy.
              </P>
              <P>
                Regulamin obowiązuje wyłącznie wobec Klientów prowadzących
                działalność na terytorium Polski.
              </P>
            </SectionCard>

            {/* §12 */}
            <SectionCard title="§12. Postanowienia końcowe">
              <P>Regulamin może zostać zmieniony przez Usługodawcę.</P>
              <P>
                W przypadku zmiany regulaminu Klient zostanie poinformowany z
                co najmniej{" "}
                <span className="font-semibold text-primary-950">
                  7-dniowym wyprzedzeniem
                </span>
                .
              </P>
              <P>
                W sprawach nieuregulowanych zastosowanie mają przepisy Kodeksu
                cywilnego.
              </P>
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
