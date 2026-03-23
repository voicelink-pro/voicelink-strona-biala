import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container, Section } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { siteContact } from "@/content/contact";

export const metadata: Metadata = generatePageMetadata({
  title: "Kontakt — Skontaktuj się z VoiceLink",
  description:
    "Masz pytania o VoiceLink? Skontaktuj się z naszym zespołem. Odpowiadamy w ciągu 24 godzin.",
  path: "/kontakt",
  keywords: ["kontakt VoiceLink", "VoiceLink telefon", "VoiceLink email"],
});

/** Kolejność pod siatką 2-kolumnową: email | tel. główny, adres | tel. testowy — oba telefony w jednej kolumnie pod sobą */
const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: siteContact.email,
    href: `mailto:${siteContact.email}`,
  },
  {
    icon: Phone,
    title: siteContact.phones[0].label,
    value: siteContact.phones[0].display,
    href: `tel:${siteContact.phones[0].tel}`,
  },
  {
    icon: MapPin,
    title: "Adres",
    value: siteContact.addressLine,
    href: undefined,
  },
  {
    icon: Phone,
    title: siteContact.phones[1].label,
    value: siteContact.phones[1].display,
    href: `tel:${siteContact.phones[1].tel}`,
  },
  {
    icon: Clock,
    title: "Godziny kontaktu",
    value: siteContact.hours,
    href: undefined,
  },
];

export default function KontaktPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Kontakt", href: "/kontakt" }]} />

      <Section background="white" className="pt-12 md:pt-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h1 className="text-3xl font-bold text-primary-950 sm:text-4xl lg:text-5xl">
                Skontaktuj się
                <br />
                <span className="text-primary-500">z nami</span>
              </h1>
              <p className="mt-6 text-lg text-surface-600 leading-relaxed">
                Masz pytania o VoiceLink? Chcesz omówić wdrożenie? Potrzebujesz informacji
                technicznych? Napisz do nas — odpowiadamy w ciągu 24 godzin.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-6">
                {contactInfo.map(({ icon: Icon, title, value, href }) => (
                  <div key={title} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                      <Icon className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-500">{title}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-primary-950 font-medium hover:text-primary-500 transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-primary-950 font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-xl bg-primary-50 border border-primary-100 p-6">
                <p className="text-sm font-semibold text-primary-950 mb-1">
                  Szukasz demo produktu?
                </p>
                <p className="text-sm text-surface-600">
                  Jeśli chcesz zobaczyć VoiceLink w akcji,{" "}
                  <a href="/demo" className="font-medium text-primary-500 hover:underline">
                    umów bezpłatne demo
                  </a>{" "}
                  — przygotujemy prezentację dopasowaną do Twojej placówki.
                </p>
              </div>
            </div>

            <div>
              <div className="rounded-2xl border border-surface-200 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
                <h2 className="text-xl font-semibold text-primary-950 mb-6">
                  Napisz do nas
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
