"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Bot } from "lucide-react";
import { Container } from "@/components/ui/container";
import { footerColumns, type FooterColumn } from "@/content/navigation";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";

function NavColumn({ groups }: { groups: FooterColumn[] }) {
  return (
    <div className="space-y-8">
      {groups.map((col) => (
        <div key={col.title}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-950 mb-4">
            {col.title}
          </h3>
          <ul className="space-y-3">
            {col.pages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-sm font-medium text-primary-950 transition-colors hover:text-primary-500"
                >
                  {page.label}
                </Link>
                {page.sections && page.sections.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5 pl-3 border-l border-surface-200">
                    {page.sections.map((section) => (
                      <li key={section.href}>
                        <Link
                          href={section.href}
                          className="text-[11px] text-surface-400 transition-colors hover:text-primary-500 leading-relaxed block py-0.5"
                        >
                          {section.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const col1 = footerColumns.filter((c) => c.title === "Usługi");
const col2 = footerColumns.filter((c) => c.title === "Dla placówek");
const col3 = footerColumns.filter((c) => c.title === "Jak to działa");
const col4 = footerColumns.filter(
  (c) => c.title === "Cennik" || c.title === "Firma" || c.title === "Prawne",
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-surface-200 bg-surface-50 overflow-hidden"
      role="contentinfo"
    >
      <Container size="wide" className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* Left — brand + contact */}
          <div>
            <Link href="/" className="group inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt="VoiceLink"
                width={280}
                height={72}
                className="h-14 w-auto transition-opacity duration-200 group-hover:opacity-70"
              />
            </Link>
            <p className="mt-4 text-sm text-surface-500 leading-relaxed max-w-xs">
              Inteligentna recepcja głosowa AI dla placówek medycznych.
              Odbieramy telefony, umawiamy wizyty, wspieramy pacjentów.
            </p>

            <div className="mt-6 space-y-2.5">
              <a
                href="tel:+48603076043"
                onClick={() => trackPhoneClick("+48603076043")}
                className="flex items-center gap-2.5 text-sm text-surface-500 hover:text-primary-500 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                +48 603 076 043
              </a>
              <a
                href="tel:+48732098417"
                onClick={() => trackPhoneClick("+48732098417")}
                className="flex items-center gap-2.5 text-sm text-surface-500 hover:text-primary-500 transition-colors"
              >
                <Bot className="h-3.5 w-3.5 shrink-0" />
                +48 732 098 417
                <span className="text-[10px] font-medium text-primary-500 bg-primary-50 rounded-full px-1.5 py-0.5 leading-none">
                  Test AI
                </span>
              </a>
              <a
                href="mailto:kontakt@voicelink.pl"
                onClick={() => trackEmailClick("kontakt@voicelink.pl")}
                className="flex items-center gap-2.5 text-sm text-surface-500 hover:text-primary-500 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                kontakt@voicelink.pl
              </a>
              <div className="flex items-center gap-2.5 text-sm text-surface-500">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                Łysomice, Polska
              </div>
            </div>
          </div>

          {/* Right — 4 nav columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-x-10">
            <NavColumn groups={col1} />
            <NavColumn groups={col2} />
            <NavColumn groups={col3} />
            <NavColumn groups={col4} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-surface-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-surface-400">
            &copy; {currentYear} VoiceLink. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-xs text-surface-400">
            Dane przechowywane w UE &middot; Zgodność z RODO i AI Act
          </p>
        </div>
      </Container>
    </footer>
  );
}
