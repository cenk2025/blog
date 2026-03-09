"use client";

import { Locale, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const labels: Record<Locale, string> = {
  en: "English",
  fi: "Suomi"
};

const flags: Record<Locale, string> = {
  en: "🇬🇧",
  fi: "🇫🇮"
};

function swapLocale(pathname: string, targetLocale: Locale) {
  const segments = pathname.split("/");
  if (segments.length < 2) {
    return `/${targetLocale}`;
  }

  if (locales.includes(segments[1] as Locale)) {
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  }

  return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center rounded-full border border-black/5 bg-black/[0.02] p-1 backdrop-blur-xl dark:border-white/15 dark:bg-white/5">
      {locales.map((targetLocale) => {
        const active = locale === targetLocale;

        return (
          <Link
            key={targetLocale}
            href={swapLocale(pathname, targetLocale)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition",
              active
                ? "bg-black/10 text-ink-light shadow-sm dark:bg-white/20 dark:text-ink-dark dark:shadow-glow"
                : "text-ink-light/70 hover:text-ink-light dark:text-ink-dark/70 dark:hover:text-ink-dark"
            )}
          >
            <span>{flags[targetLocale]}</span>
            <span className="hidden sm:inline">{labels[targetLocale]}</span>
          </Link>
        );
      })}
    </div>
  );
}
