"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="flex flex-1 items-center justify-center py-24">
      <Container size="narrow" className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
          <AlertTriangle className="h-10 w-10 text-red-400" />
        </div>
        <h1 className="mt-8 text-3xl font-bold text-primary-950 sm:text-4xl">
          Coś poszło nie tak
        </h1>
        <p className="mt-4 text-lg text-surface-600 max-w-md mx-auto">
          Przepraszamy za utrudnienia. Spróbuj odświeżyć stronę lub wróć później.
        </p>
        <div className="mt-8">
          <Button size="lg" onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            Spróbuj ponownie
          </Button>
        </div>
      </Container>
    </section>
  );
}
