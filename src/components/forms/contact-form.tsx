"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useAnalytics } from "@/hooks/use-analytics";

const contactSchema = z.object({
  name: z.string().min(2, "Imię i nazwisko jest wymagane"),
  email: z.string().email("Podaj poprawny adres email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Temat jest wymagany"),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
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
      formStart("contact", "contact-page");
      startTracked.current = true;
    }
  }

  async function onSubmit(data: ContactFormData) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submit failed");

      formSubmit("contact", "contact-page", true);
      setSubmitted(true);
    } catch {
      formSubmit("contact", "contact-page", false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent-200 bg-accent-50 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-accent-600" />
        <h3 className="mt-4 text-xl font-semibold text-primary-950">
          Wiadomość wysłana!
        </h3>
        <p className="mt-2 text-surface-600">
          Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe, zazwyczaj w ciągu 24 godzin.
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
          id="contact-name"
          label="Imię i nazwisko"
          placeholder="Jan Kowalski"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="contact-email"
          label="Email"
          type="email"
          placeholder="jan@firma.pl"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          id="contact-phone"
          label="Telefon (opcjonalnie)"
          type="tel"
          placeholder="+48 000 000 000"
          {...register("phone")}
        />
        <Input
          id="contact-subject"
          label="Temat"
          placeholder="Temat wiadomości"
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>
      <Textarea
        id="contact-message"
        label="Wiadomość"
        placeholder="Opisz, w czym możemy Ci pomóc..."
        error={errors.message?.message}
        {...register("message")}
      />
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          "Wysyłanie..."
        ) : (
          <>
            Wyślij wiadomość
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
