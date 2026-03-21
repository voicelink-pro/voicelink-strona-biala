"use client";

import { useEffect, useRef } from "react";

export function CookieDeclaration() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const script = document.createElement("script");
    script.id = "CookieDeclaration";
    script.src =
      "https://consent.cookiebot.com/580f1935-30e2-42fc-8f2f-d8d4bc3ba5df/cd.js";
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-surface-600 text-sm [&_a]:text-primary-500 [&_a:hover]:text-primary-600 [&_table]:w-full [&_table]:text-xs [&_th]:text-left [&_th]:text-surface-400 [&_th]:py-2 [&_td]:py-2 [&_td]:border-b [&_td]:border-surface-100"
    />
  );
}
