"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getConsent, setConsent, restoreConsent } from "@/lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const existing = getConsent();
    if (existing) {
      restoreConsent();
    } else {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  function acceptAll() {
    setConsent({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
  }

  function acceptNecessary() {
    setConsent({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
  }

  function savePreferences() {
    setConsent({
      necessary: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    });
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-[100] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md"
          role="dialog"
          aria-label="Zgoda na pliki cookies"
        >
          <div className="rounded-2xl border border-surface-200/80 bg-white/95 backdrop-blur-xl p-5 shadow-[var(--shadow-elevated)]">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                <Cookie className="h-4 w-4 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-950 text-sm">
                  Pliki cookies
                </h3>
                <p className="mt-1 text-xs text-surface-500 leading-relaxed">
                  Używamy cookies do działania strony oraz opcjonalnych analitycznych i marketingowych.{" "}
                  <a href="/cookies" className="underline hover:text-primary-500">
                    Więcej
                  </a>
                </p>
              </div>
            </div>

            {showDetails && (
              <div className="mb-4 space-y-2.5 rounded-xl border border-surface-100 bg-surface-50/50 p-3.5">
                <label className="flex items-center gap-2.5 text-xs">
                  <input type="checkbox" checked disabled className="rounded accent-primary-600" />
                  <span className="font-medium text-primary-950">Niezbędne</span>
                  <span className="text-surface-400">— wymagane</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((p) => ({ ...p, analytics: e.target.checked }))
                    }
                    className="rounded accent-primary-600"
                  />
                  <span className="font-medium text-primary-950">Analityczne</span>
                  <span className="text-surface-400">— ruch na stronie</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences((p) => ({ ...p, marketing: e.target.checked }))
                    }
                    className="rounded accent-primary-600"
                  />
                  <span className="font-medium text-primary-950">Marketingowe</span>
                  <span className="text-surface-400">— reklamy</span>
                </label>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              {showDetails ? (
                <Button size="sm" onClick={savePreferences} className="flex-1">
                  Zapisz
                </Button>
              ) : (
                <>
                  <Button size="sm" onClick={acceptAll} className="flex-1">
                    Akceptuj
                  </Button>
                  <Button size="sm" variant="outline" onClick={acceptNecessary} className="flex-1">
                    Tylko niezbędne
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowDetails(true)}
                    className="text-xs"
                  >
                    Dostosuj
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
