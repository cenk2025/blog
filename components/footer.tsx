import { Dictionary, Locale } from "@/lib/i18n";
import { Github, Linkedin } from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";
import Link from "next/link";
import type { ReactNode } from "react";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center md:px-6">
        <div>
          <p className="font-display text-lg text-ink-light dark:text-ink-dark">Futureframe</p>
          <p className="mt-1 text-sm text-ink-light/65 dark:text-ink-dark/65">
            (c) {year} Cenk Yakinlar. {dict.footer.rights}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/contact`}
            className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm text-ink-light/75 transition hover:border-white/30 hover:text-ink-light dark:text-ink-dark/75 dark:hover:text-ink-dark"
          >
            {dict.nav.contact}
          </Link>
          <SocialIcon href="https://github.com" label="GitHub" icon={<Github className="h-4 w-4" />} />
          <SocialIcon
            href="https://www.linkedin.com/in/cenk-yakinlar-7417385b/"
            label="LinkedIn"
            icon={<Linkedin className="h-4 w-4" />}
          />
          <SocialIcon href="https://x.com" label="X" icon={<XIcon className="h-4 w-4" />} />
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  icon
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-ink-light/70 transition hover:border-accent-cyan/45 hover:text-accent-cyan dark:text-ink-dark/70"
    >
      {icon}
    </Link>
  );
}
