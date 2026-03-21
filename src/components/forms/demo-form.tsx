"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAnalytics } from "@/hooks/use-analytics";

const demoSchema = z.object({
  firstName: z.string().min(2, "Imię jest wymagane"),
  lastName: z.string().min(2, "Nazwisko jest wymagane"),
  email: z.string().email("Podaj poprawny adres email"),
  phone: z.string().min(9, "Podaj poprawny numer telefonu"),
});

type DemoFormData = z.infer<typeof demoSchema>;

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { formStart, formSubmit } = useAnalytics();
  const startTracked = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
  });

  function handleFocusStart() {
    if (!startTracked.current) {
      formStart("demo", "demo-page");
      startTracked.current = true;
    }
  }

  async function onSubmit(data: DemoFormData) {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          subject: "Formularz demo — Strona Demo",
          message: `Proszę o kontakt w sprawie demo.\n\nImię: ${data.firstName}\nNazwisko: ${data.lastName}\nTelefon: ${data.phone}\nEmail: ${data.email}`,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Wystąpił błąd podczas wysyłania.");
      }

      formSubmit("demo", "demo-page", true);
      setSubmitted(true);
    } catch (err) {
      formSubmit("demo", "demo-page", false);
      setSubmitError(err instanceof Error ? err.message : "Nie udało się wysłać formularza. Spróbuj ponownie.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-10 text-center">
        <CheckCircle className="mx-auto h-14 w-14 text-emerald-500" />
        <h3 className="mt-5 text-2xl font-bold text-primary-950">
          Dziękujemy!
        </h3>
        <p className="mt-3 text-surface-500">
          Otrzymaliśmy Twoje dane. Oddzwonimy najszybciej jak to możliwe — zazwyczaj w ciągu kilku godzin.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={handleFocusStart}
      className="space-y-5"
      noValidate
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          id="demo-firstName"
          label="Imię"
          placeholder="Jan"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          id="demo-lastName"
          label="Nazwisko"
          placeholder="Kowalski"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>
      <Input
        id="demo-email"
        label="Email"
        type="email"
        placeholder="jan@placowka.pl"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        id="demo-phone"
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
            Umów bezpłatne demo
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
      <p className="text-xs text-surface-400 text-center">
        Wysyłając formularz, akceptujesz{" "}
        <a href="/polityka-prywatnosci" className="underline hover:text-primary-500">
          politykę prywatności
        </a>
        .
      </p>
    </form>
  );
}
