"use client";

import { useEffect, useState } from "react";
import { normalizePhoneE164, type ConversationStatus } from "@/lib/elevenlabs";

export type TestCallSource = "kalkulator-test" | "lp-przetestuj" | "lp-kalkulator";

export const CALL_STATUS_COPY: Record<ConversationStatus, string> = {
  initiated: "Dzwoni…",
  "in-progress": "Rozmowa w toku",
  processing: "Podsumowanie rozmowy…",
  done: "Rozmowa zakończona",
  failed: "Połączenie nieudane",
};

export function formatCallTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function useTestCall(source: TestCallSource = "kalkulator-test") {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [status, setStatus] = useState<ConversationStatus>("initiated");
  const [elapsed, setElapsed] = useState(0);

  const live = submitted && (status === "initiated" || status === "in-progress");

  function reset() {
    setPhone("");
    setError(null);
    setSubmitted(false);
    setPending(false);
    setConversationId(null);
    setStatus("initiated");
    setElapsed(0);
  }

  useEffect(() => {
    if (!submitted || !live) return;

    const timer = window.setInterval(() => {
      setElapsed((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [submitted, live]);

  useEffect(() => {
    if (!submitted || !conversationId) return;
    if (status === "done" || status === "failed") return;

    let cancelled = false;

    async function poll() {
      try {
        const response = await fetch(`/api/test-call/${conversationId}`);
        const data = (await response.json().catch(() => ({}))) as {
          status?: ConversationStatus;
          durationSecs?: number;
        };
        if (cancelled || !response.ok || !data.status) return;

        setStatus(data.status);
        if (data.status === "done" || data.status === "failed") {
          setElapsed(data.durationSecs ?? 0);
        }
      } catch {
        // kolejna próba przy następnym pollu
      }
    }

    void poll();
    const interval = window.setInterval(() => {
      void poll();
    }, 2500);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [submitted, conversationId, status]);

  async function startCall() {
    const normalized = normalizePhoneE164(phone);

    if (!normalized) {
      setError("Podaj poprawny numer telefonu, np. 600 123 456.");
      return false;
    }

    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/test-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized, source }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        conversationId?: string | null;
      };

      if (!response.ok) {
        setError(data.error || "Nie udało się zainicjować połączenia.");
        return false;
      }

      setConversationId(data.conversationId ?? null);
      setStatus("initiated");
      setElapsed(0);
      setSubmitted(true);
      return true;
    } catch {
      setError("Brak połączenia z serwerem. Spróbuj ponownie.");
      return false;
    } finally {
      setPending(false);
    }
  }

  return {
    phone,
    setPhone,
    error,
    setError,
    submitted,
    pending,
    conversationId,
    status,
    elapsed,
    live,
    startCall,
    reset,
  };
}
