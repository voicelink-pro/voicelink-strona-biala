"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Mic,
  PhoneCall,
  CalendarCheck,
  Clock,
  Building2,
  Heart,
  Smile,
  Hospital,
  Eye,
  Zap,
  FileText,
  Plug,
  Cpu,
  Play,
  Calculator,
  Tag,
  Users,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation, type NavItem } from "@/content/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { trackCTAClick } from "@/lib/analytics";

const iconMap: Record<string, LucideIcon> = {
  Mic,
  PhoneCall,
  CalendarCheck,
  Clock,
  Building2,
  Heart,
  Smile,
  Hospital,
  Eye,
  Zap,
  FileText,
  Plug,
  Cpu,
  Play,
  Calculator,
  Tag,
  Users,
  LayoutDashboard,
};

const sectionColorMap: Record<string, { iconBg: string; iconText: string; hoverBg: string }> = {
  "Usługi": {
    iconBg: "bg-primary-100/80",
    iconText: "text-primary-500",
    hoverBg: "hover:bg-primary-50/60",
  },
  "Dla placówek": {
    iconBg: "bg-accent-100/80",
    iconText: "text-accent-500",
    hoverBg: "hover:bg-accent-50/60",
  },
  "Jak to działa": {
    iconBg: "bg-pink-100/80",
    iconText: "text-pink-500",
    hoverBg: "hover:bg-pink-50/60",
  },
  "Cennik": {
    iconBg: "bg-emerald-100/80",
    iconText: "text-emerald-600",
    hoverBg: "hover:bg-emerald-50/60",
  },
  "O nas": {
    iconBg: "bg-primary-100/80",
    iconText: "text-primary-600",
    hoverBg: "hover:bg-primary-50/60",
  },
};

function DropdownIcon({ iconName, sectionLabel }: { iconName: string; sectionLabel: string }) {
  const Icon = iconMap[iconName];
  if (!Icon) return null;

  const colors = sectionColorMap[sectionLabel] || sectionColorMap["Usługi"];

  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
        colors.iconBg
      )}
    >
      <Icon className={cn("h-[18px] w-[18px]", colors.iconText)} />
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const handleMouseEnter = useCallback((href: string, hasChildren: boolean) => {
    if (!hasChildren) return;
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(href);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  const isActive = (item: NavItem) =>
    pathname === item.href ||
    (item.children && item.children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/")));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-surface-200/60 shadow-[var(--shadow-xs)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container size="wide">
        <nav className="flex h-16 items-center justify-between lg:h-[72px]" aria-label="Nawigacja główna">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center shrink-0"
            aria-label="VoiceLink — strona główna"
          >
            <Image
              src="/images/logo.png"
              alt="VoiceLink"
              width={320}
              height={80}
              className="h-16 w-auto transition-opacity duration-200 group-hover:opacity-80"
              sizes="160px"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-0.5">
            {mainNavigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label, !!item.children)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all duration-200 border",
                    isActive(item)
                      ? "text-primary-500 bg-primary-50/60 border-primary-200/60"
                      : "text-primary-950/85 bg-transparent border-transparent hover:border-surface-200 hover:bg-surface-50 hover:text-primary-950"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-200 text-primary-950/70",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Desktop Dropdown — light theme with icons */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 pt-2">
                    <div className="w-80 rounded-2xl border border-surface-200/80 bg-white p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]">
                      <div className="space-y-0.5">
                        {item.children.map((child) => {
                          const colors = sectionColorMap[item.label] || sectionColorMap["Usługi"];
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-all duration-150",
                                colors.hoverBg,
                                pathname === child.href && "bg-surface-50"
                              )}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.icon && (
                                <DropdownIcon iconName={child.icon} sectionLabel={item.label} />
                              )}
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-surface-900">
                                  {child.label}
                                </div>
                                {child.description && (
                                  <div className="mt-0.5 text-xs text-surface-500 leading-relaxed">
                                    {child.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-2.5">
            <Link
              href="/demo"
              onClick={() => trackCTAClick("Umów demo", "navbar", "/demo")}
            >
              <Button size="sm">Umów demo</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-surface-600 hover:bg-surface-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-surface-200/60 bg-white/95 backdrop-blur-xl",
          mobileOpen ? "max-h-[calc(100dvh-64px)] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 border-t-transparent"
        )}
      >
        <Container>
          <div className="py-4 space-y-1">
            {mainNavigation.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors border",
                        isActive(item)
                          ? "text-primary-500 bg-primary-50/70 border-primary-200/60"
                          : "text-primary-950/85 bg-transparent border-transparent hover:border-surface-200 hover:bg-surface-50"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 text-surface-400 transition-transform duration-200",
                          mobileExpanded === item.label && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200",
                        mobileExpanded === item.label ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="ml-1 space-y-0.5 pl-2">
                        {item.children.map((child) => {
                          const colors = sectionColorMap[item.label] || sectionColorMap["Usługi"];
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors",
                                colors.hoverBg,
                                pathname === child.href && "bg-surface-50"
                              )}
                            >
                              {child.icon && (
                                <DropdownIcon iconName={child.icon} sectionLabel={item.label} />
                              )}
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-surface-900">
                                  {child.label}
                                </div>
                                {child.description && (
                                  <div className="text-xs text-surface-500">
                                    {child.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors border",
                      pathname === item.href
                        ? "text-primary-500 bg-primary-50/70 border-primary-200/60"
                        : "text-primary-950/85 bg-transparent border-transparent hover:border-surface-200 hover:bg-surface-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 mt-2 border-t border-surface-100 flex flex-col gap-2.5">
              <Link
                href="/demo"
                onClick={() => trackCTAClick("Umów demo", "mobile-navbar", "/demo")}
              >
                <Button size="md" className="w-full">
                  Umów demo
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
