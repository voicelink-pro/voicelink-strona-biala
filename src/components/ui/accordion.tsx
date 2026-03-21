"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  trigger: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  onExpand?: (trigger: string) => void;
}

export function Accordion({ items, className, onExpand }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string, trigger: string) {
    const isOpening = openId !== id;
    setOpenId(isOpening ? id : null);
    if (isOpening && onExpand) {
      onExpand(trigger);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border transition-all duration-200",
              isOpen
                ? "border-primary-200/60 bg-primary-50/30 shadow-[var(--shadow-xs)]"
                : "border-surface-200/80 bg-white hover:border-surface-300/80"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.id, item.trigger)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-[15px] font-medium text-primary-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-xl"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <h3 className="pr-4 text-[15px] font-medium">{item.trigger}</h3>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-surface-400 transition-transform duration-200",
                  isOpen && "rotate-180 text-primary-500"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4">
                    <p className="text-[15px] text-surface-500 leading-relaxed pr-8">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
