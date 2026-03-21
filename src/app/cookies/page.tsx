import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container, Section } from "@/components/ui/container";

export const metadata: Metadata = generatePageMetadata({
  title: "Polityka cookies",
  description: "Informacje o plikach cookies używanych w serwisie VoiceLink.",
  path: "/cookies",
  noIndex: false,
});

export default function CookiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Cookies", href: "/cookies" }]} />
      <Section background="white">
        <Container size="narrow">
          <h1 className="text-3xl font-bold text-primary-950 sm:text-4xl mb-8">
            Polityka cookies
          </h1>
          <div className="prose prose-slate max-w-none">
            <p className="text-surface-600 leading-relaxed">
              Ostatnia aktualizacja: marzec 2026
            </p>

            <h2>1. Czym są cookies?</h2>
            <p>
              Cookies (ciasteczka) to małe pliki tekstowe przechowywane na Twoim urządzeniu
              przez przeglądarkę internetową. Pozwalają nam zapamiętać Twoje preferencje
              i analizować ruch na stronie.
            </p>

            <h2>2. Kategorie cookies</h2>

            <h3>Niezbędne (zawsze aktywne)</h3>
            <p>
              Cookies wymagane do prawidłowego działania strony. Obejmują zapamiętanie
              preferencji cookies, bezpieczeństwo sesji i podstawową funkcjonalność.
            </p>

            <h3>Analityczne (za zgodą)</h3>
            <p>
              Cookies pozwalające zrozumieć, jak użytkownicy korzystają z naszej strony.
              Używamy Google Analytics 4 do analizy ruchu. Dane są anonimizowane.
            </p>

            <h3>Marketingowe (za zgodą)</h3>
            <p>
              Cookies umożliwiające wyświetlanie dopasowanych reklam.
              Obejmują cookies Google Ads i narzędzia remarketingowe.
            </p>

            <h2>3. Zarządzanie cookies</h2>
            <p>
              Możesz zarządzać swoimi preferencjami cookies za pomocą banera wyświetlanego
              przy pierwszej wizycie lub w ustawieniach swojej przeglądarki.
            </p>

            <h2>4. Cookies używane na stronie</h2>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Czas życia</th>
                    <th>Cel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>voicelink_consent</td>
                    <td>Niezbędne</td>
                    <td>1 rok</td>
                    <td>Zapamiętanie preferencji cookies</td>
                  </tr>
                  <tr>
                    <td>_ga, _ga_*</td>
                    <td>Analityczne</td>
                    <td>2 lata</td>
                    <td>Google Analytics — analiza ruchu</td>
                  </tr>
                  <tr>
                    <td>_gid</td>
                    <td>Analityczne</td>
                    <td>24 godziny</td>
                    <td>Google Analytics — identyfikacja sesji</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>5. Kontakt</h2>
            <p>
              Pytania dotyczące cookies kieruj na:
              <br />
              Email: <a href="mailto:prywatnosc@voicelink.pl">prywatnosc@voicelink.pl</a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
