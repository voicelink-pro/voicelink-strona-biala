"use client";

import { useScrollDepth } from "@/hooks/use-scroll-depth";

export function ScrollTracker() {
  useScrollDepth();
  return null;
}
