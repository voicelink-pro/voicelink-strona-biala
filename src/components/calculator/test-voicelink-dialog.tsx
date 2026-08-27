"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { CallLiveStatus } from "@/components/call/call-live-status";
import { CALL_STATUS_COPY, useTestCall } from "@/components/call/use-test-call";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface TestVoiceLinkDialogProps {
  triggerClassName?: string;
  triggerLabel?: string;
}

export function TestVoiceLinkDialog({
  triggerClassName = "w-full",
  triggerLabel = "Przetestuj system VoiceLink",
}: TestVoiceLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const call = useTestCall("kalkulator-test");

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) call.reset();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await call.startCall();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className={triggerClassName}>
          <Phone />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {call.submitted ? CALL_STATUS_COPY[call.status] : "Przetestuj system VoiceLink"}
          </DialogTitle>
          <DialogDescription>
            {call.submitted
              ? "Okno pokazuje status połączenia. Dźwięk słyszysz w telefonie."
              : "Podaj numer telefonu. Asystent VoiceLink oddzwoni i pokaże, jak brzmi rozmowa z pacjentem."}
          </DialogDescription>
        </DialogHeader>

        {call.submitted ? (
          <div className="flex flex-col gap-4">
            <CallLiveStatus
              status={call.status}
              elapsed={call.elapsed}
              live={call.live}
              conversationId={call.conversationId}
            />
            <DialogFooter>
              <Button type="button" onClick={() => handleOpenChange(false)}>
                Zamknij
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field data-invalid={call.error ? true : undefined} data-disabled={call.pending ? true : undefined}>
                <FieldLabel htmlFor="test-voicelink-phone">Numer telefonu</FieldLabel>
                <Input
                  id="test-voicelink-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="600 123 456"
                  value={call.phone}
                  disabled={call.pending}
                  className="border-0 bg-muted shadow-none focus:border-transparent focus:outline-none focus:ring-0"
                  onChange={(event) => {
                    call.setPhone(event.target.value);
                    if (call.error) call.setError(null);
                  }}
                  aria-invalid={call.error ? true : undefined}
                />
                <FieldDescription>Wystarczy polski numer komórkowy. Możesz też wpisać go z +48.</FieldDescription>
                {call.error ? <FieldError>{call.error}</FieldError> : null}
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button type="submit" disabled={call.pending}>
                {call.pending ? "Łączenie…" : "Zadzwoń do mnie"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
