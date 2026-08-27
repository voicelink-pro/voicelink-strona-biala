"use client";

import { Phone } from "lucide-react";
import { CallLiveStatus } from "@/components/call/call-live-status";
import { type TestCallSource, useTestCall } from "@/components/call/use-test-call";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InlineTestCallFormProps {
  source: TestCallSource;
  title?: string;
  description?: string;
}

export function InlineTestCallForm({
  source,
  title = "Przetestuj asystenta głosowego VoiceLink",
  description = "Wpisz numer. Asystent oddzwoni i pokaże, jak brzmi rozmowa z pacjentem.",
}: InlineTestCallFormProps) {
  const call = useTestCall(source);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await call.startCall();
  }

  return (
    <div className="rounded-3xl border border-surface-200/80 bg-white px-6 py-8 shadow-[var(--shadow-card)] sm:px-10">
      {call.submitted ? (
        <div className="flex flex-col gap-4">
          <CallLiveStatus
            status={call.status}
            elapsed={call.elapsed}
            live={call.live}
            conversationId={call.conversationId}
          />
          <div className="flex justify-center">
            <Button type="button" variant="outline" onClick={call.reset}>
              Wpisz numer ponownie
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
          <p className="text-center text-lg font-bold text-primary-950">{title}</p>
          <p className="mt-2 text-center text-sm text-surface-500">{description}</p>
          <label htmlFor={`inline-call-phone-${source}`} className="mt-6 block text-sm font-medium text-primary-950">
            Numer telefonu
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id={`inline-call-phone-${source}`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="600 123 456"
              value={call.phone}
              disabled={call.pending}
              aria-invalid={call.error ? true : undefined}
              onChange={(event) => {
                call.setPhone(event.target.value);
                if (call.error) call.setError(null);
              }}
              className={cn(
                "h-12 w-full rounded-xl bg-surface-50 px-4 text-base text-primary-950 placeholder:text-surface-400 shadow-none outline-none ring-1 ring-transparent transition",
                "focus:bg-white focus:ring-2 focus:ring-primary-400/40",
                call.error && "ring-destructive/40"
              )}
            />
            <Button type="submit" size="lg" disabled={call.pending} className="h-12 shrink-0 rounded-xl px-6">
              <Phone />
              {call.pending ? "Łączenie…" : "Zadzwoń do mnie"}
            </Button>
          </div>
          {call.error ? (
            <p className="mt-2 text-sm text-destructive" role="alert">
              {call.error}
            </p>
          ) : (
            <p className="mt-2 text-xs text-surface-400">Polski numer komórkowy albo z +48. Rozmowa jest darmowa.</p>
          )}
        </form>
      )}
    </div>
  );
}
