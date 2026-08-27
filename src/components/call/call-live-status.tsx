import { CALL_STATUS_COPY, formatCallTimer } from "@/components/call/use-test-call";
import type { ConversationStatus } from "@/lib/elevenlabs";
import { cn } from "@/lib/utils";

interface CallLiveStatusProps {
  status: ConversationStatus;
  elapsed: number;
  live: boolean;
  conversationId: string | null;
  size?: "compact" | "hero";
}

export function CallLiveStatus({
  status,
  elapsed,
  live,
  conversationId,
  size = "compact",
}: CallLiveStatusProps) {
  const hero = size === "hero";

  return (
    <div
      className={cn(
        "flex flex-col items-center",
        hero ? "gap-6 px-4 py-8 sm:py-10" : "gap-4 rounded-xl bg-muted px-4 py-6"
      )}
    >
      <div className={cn("flex items-end gap-1.5", hero ? "h-14" : "h-10")} aria-hidden>
        {[0, 1, 2, 3, 4, 5, 6].slice(0, hero ? 7 : 5).map((bar) => (
          <span
            key={bar}
            className="rounded-full bg-primary"
            style={{
              width: hero ? "7px" : "6px",
              height: live ? `${12 + ((bar * 9) % 22)}px` : "8px",
              animation: live ? `pulse ${0.65 + bar * 0.1}s ease-in-out infinite alternate` : "none",
            }}
          />
        ))}
      </div>
      <div className="text-center">
        <p className={cn("font-semibold text-foreground", hero ? "text-lg" : "text-sm")}>
          {CALL_STATUS_COPY[status]}
        </p>
        <p
          className={cn(
            "font-mono tabular-nums tracking-tight text-foreground",
            hero ? "mt-3 text-5xl sm:text-6xl" : "mt-1 text-3xl"
          )}
        >
          {formatCallTimer(elapsed)}
        </p>
      </div>
      {conversationId ? (
        <p className="max-w-full truncate text-center font-mono text-xs text-muted-foreground">
          {conversationId}
        </p>
      ) : (
        <p className="text-center text-xs text-muted-foreground">
          Conversation ID pojawi się po potwierdzeniu połączenia.
        </p>
      )}
    </div>
  );
}
