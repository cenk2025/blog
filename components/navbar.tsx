"use client";

import { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Cpu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  const links = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
    { label: dict.nav.categories, href: `/${locale}/categories` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.contact, href: `/${locale}/contact` }
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 px-3 pt-3"
    >
      <div
        className={cn(
          "mx-auto max-w-6xl rounded-2xl border px-4 py-3 backdrop-blur-2xl transition md:px-6",
          scrolled
            ? "border-black/10 bg-white/75 shadow-sm dark:border-white/20 dark:bg-canvas-dark/75 dark:shadow-card"
            : "border-black/5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.04]"
        )}
      >
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-gradient-to-br from-accent-cyan/20 to-accent-emerald/15 shadow-sm dark:border-white/20 dark:from-accent-cyan/40 dark:to-accent-emerald/35 dark:shadow-glow">
              <Cpu className="h-4 w-4 text-ink-light dark:text-ink-dark" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold tracking-wide text-ink-light dark:text-ink-dark">Futureframe</p>
              <p className="text-xs text-ink-light/60 dark:text-ink-dark/60">Tech Journal</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-black/5 bg-black/[0.02] p-1 lg:flex dark:border-white/10 dark:bg-white/[0.04]">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== `/${locale}` && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition",
                    active
                      ? "bg-black/5 text-ink-light dark:bg-white/15 dark:text-ink-dark"
                      : "text-ink-light/70 hover:bg-black/5 hover:text-ink-light dark:text-ink-dark/70 dark:hover:bg-white/10 dark:hover:text-ink-dark"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== `/${locale}` && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={`${link.href}-mobile`}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition",
                  active
                    ? "border-black/10 bg-black/5 text-ink-light dark:border-white/25 dark:bg-white/15 dark:text-ink-dark"
                    : "border-black/5 bg-black/[0.02] text-ink-light/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-dark/70"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
