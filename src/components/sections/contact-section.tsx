"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  CheckCircle,
  Phone,
  Mail,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";
import { useAnalytics } from "@/hooks/use-analytics";

const contactSchema = z.object({
  firstName: z.string().min(2, "Imię jest wymagane"),
  lastName: z.string().min(2, "Nazwisko jest wymagane"),
  email: z.string().email("Podaj poprawny adres email"),
  phone: z.string().min(9, "Podaj poprawny numer telefonu"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactDetails = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+48 603 076 043",
    href: "tel:+48603076043",
    desc: "Pon–Pt, 9:00–17:00",
  },
  {
    icon: Bot,
    label: "Asystent AI (test)",
    value: "+48 732 098 417",
    href: "tel:+48732098417",
    desc: "Dostępny 24/7",
  },
  {
    icon: Mail,
    label: "Email",
    value: "kontakt@voicelink.pl",
    href: "mailto:kontakt@voicelink.pl",
    desc: "Odpowiadamy w ciągu 24h",
  },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { formStart, formSubmit } = useAnalytics();
  const startTracked = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  function handleFocusStart() {
    if (!startTracked.current) {
      formStart("contact-landing", "homepage-contact");
      startTracked.current = true;
    }
  }

  async function onSubmit(data: ContactFormData) {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          subject: "Formularz kontaktowy — Landing Page",
          message: `Proszę o kontakt.\n\nImię: ${data.firstName}\nNazwisko: ${data.lastName}\nTelefon: ${data.phone}\nEmail: ${data.email}`,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Wystąpił błąd podczas wysyłania.");
      }
      formSubmit("contact-landing", "homepage-contact", true);
      setSubmitted(true);
    } catch (err) {
      formSubmit("contact-landing", "homepage-contact", false);
      setSubmitError(err instanceof Error ? err.message : "Nie udało się wysłać formularza. Spróbuj ponownie.");
    }
  }

  return (
    <section id="kontakt" className="py-16 md:py-24">
      <Container>
        <FadeIn>
          <div className="rounded-3xl border border-surface-200/80 bg-white shadow-[var(--shadow-card)] overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left — info */}
              <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-gradient-to-br from-primary-50/40 to-accent-50/20">
                <h2 className="text-3xl font-bold text-primary-950 sm:text-4xl">
                  Porozmawiajmy o <span className="text-primary-500">Twojej placówce</span>
                </h2>
                <p className="mt-4 text-surface-500 leading-relaxed max-w-md">
                  Zostaw dane — oddzwonimy i przygotujemy bezpłatną analizę, jak VoiceLink może usprawnić Twoją recepcję.
                </p>

                <div className="mt-10 grid sm:grid-cols-2 gap-5">
                  {contactDetails.map(({ icon: Icon, label, value, href, desc }) => (
                    <div key={label} className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-surface-200/80 shadow-sm">
                        <Icon className="h-5 w-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-surface-400 uppercase tracking-wider">{label}</p>
                        {href ? (
                          <a href={href} className="text-primary-950 font-semibold text-sm hover:text-primary-500 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-primary-950 font-semibold text-sm">{value}</p>
                        )}
                        <p className="text-xs text-surface-400 mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-xl bg-white/80 border border-surface-200/60 p-4">
                  <p className="text-xs text-surface-400">
                    <span className="font-semibold text-primary-950">Bez zobowiązań</span> — bezpłatna konsultacja i analiza.
                  </p>
                </div>
              </div>

              {/* Right — form */}
              <div className="p-8 sm:p-12 lg:p-14 flex items-center">
                {submitted ? (
                  <div className="w-full rounded-2xl border border-emerald-200 bg-emerald-50/60 p-10 text-center">
                    <CheckCircle className="mx-auto h-14 w-14 text-emerald-500" />
                    <h3 className="mt-5 text-2xl font-bold text-primary-950">Dziękujemy!</h3>
                    <p className="mt-3 text-surface-500">
                      Otrzymaliśmy Twoje dane. Oddzwonimy najszybciej jak to możliwe — zazwyczaj w ciągu kilku godzin.
                    </p>
                  </div>
                ) : (
                  <div className="w-full">
                    <h3 className="text-xl font-semibold text-primary-950 mb-2">Zostaw kontakt</h3>
                    <p className="text-sm text-surface-400 mb-8">Oddzwonimy i odpowiemy na wszystkie pytania.</p>
                    <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFocusStart} className="space-y-5" noValidate>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          id="landing-firstName"
                          label="Imię"
                          placeholder="Jan"
                          error={errors.firstName?.message}
                          {...register("firstName")}
                        />
                        <Input
                          id="landing-lastName"
                          label="Nazwisko"
                          placeholder="Kowalski"
                          error={errors.lastName?.message}
                          {...register("lastName")}
                        />
                      </div>
                      <Input
                        id="landing-email"
                        label="Email"
                        type="email"
                        placeholder="jan@placowka.pl"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                      <Input
                        id="landing-phone"
                        label="Numer telefonu"
                        type="tel"
                        placeholder="+48 600 000 000"
                        error={errors.phone?.message}
                        {...register("phone")}
                      />
                      {submitError && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                          {submitError}
                        </div>
                      )}
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          "Wysyłanie..."
                        ) : (
                          <>
                            Wyślij zgłoszenie
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-surface-400 text-center">
                        Wysyłając formularz, akceptujesz{" "}
                        <a href="/polityka-prywatnosci" className="underline hover:text-primary-500">politykę prywatności</a>.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
