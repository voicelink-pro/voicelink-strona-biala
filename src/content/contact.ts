/**
 * Dane kontaktowe VoiceLink — jeden punkt prawdy dla strony /kontakt i stopki.
 */
export const siteContact = {
  email: "kontakt@voicelink.pl",
  /** Zgodnie z regulaminem / polityką prywatności (B4wood sp. z o.o.) */
  addressLine: "ul. Bukowa 21, 87-148 Łysomice",
  /** Krótszy wariant do stopki */
  addressShort: "Łysomice, Polska",
  hours: "Pon–Pt, 9:00–17:00",
  phones: [
    {
      label: "Telefon",
      display: "+48 603 076 043",
      tel: "+48603076043",
    },
    {
      label: "Telefon — linia testowa AI",
      display: "+48 732 098 417",
      tel: "+48732098417",
    },
  ],
} as const;
