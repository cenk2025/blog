"use client";

import { Locale, locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <div className="inline-flex items-center rounded-full bg-fill p-0.5">
      {locales.map((targetLocale) => {
        const active = locale === targetLocale;

        return (
          <Link
            key={targetLocale}
            href={swapLocale(pathname, targetLocale)}
            hrefLang={targetLocale}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 text-[13px] font-semibold uppercase tracking-[0.02em] transition",
              active ? "bg-surface text-fg shadow-sm" : "text-fg-2 hover:text-fg"
            )}
          >
            {targetLocale}
          </Link>
        );
      })}
    </div>
  );
}
