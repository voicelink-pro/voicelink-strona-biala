"use client";

import { useEffect, useRef } from "react";
import { pushEvent } from "@/lib/analytics";

export function useScrollDepth() {
  const milestones = useRef(new Set<number>());

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = Math.round((window.scrollY / scrollHeight) * 100);
      const thresholds = [25, 50, 75, 100];

      for (const threshold of thresholds) {
        if (percent >= threshold && !milestones.current.has(threshold)) {
          milestones.current.add(threshold);
          pushEvent({
            event: "scroll_depth",
            percent_scrolled: threshold,
            page_path: window.location.pathname,
          });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
