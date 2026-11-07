"use client";

import { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { label: dict.nav.blog, href: `/${locale}/blog` },
    { label: dict.nav.categories, href: `/${locale}/categories` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.contact, href: `/${locale}/contact` }
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-line/60">
      <div className="container-wide flex h-14 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2.5" aria-label={dict.nav.home}>
          <Logo className="h-[22px] w-auto" />
          <span className="h-4 w-px bg-line" aria-hidden />
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-fg-2">
            {locale === "fi" ? "Blogi" : "Blog"}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[15px] transition-colors hover:text-fg",
                isActive(link.href) ? "font-medium text-fg" : "text-fg-2"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg transition hover:bg-fill md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container-wide border-t border-line/60 pb-6 pt-2 md:hidden">
          {links.map((link) => (
            <Link
              key={`${link.href}-mobile`}
              href={link.href}
              className={cn(
                "block border-b border-line/50 py-4 text-2xl font-semibold tracking-[-0.02em]",
                isActive(link.href) ? "text-fg" : "text-fg-2"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
