import { Dictionary, Locale } from "@/lib/i18n";
import { authorLinkedIn } from "@/lib/site";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const links = [
    { label: dict.nav.blog, href: `/${locale}/blog` },
    { label: dict.nav.categories, href: `/${locale}/categories` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.contact, href: `/${locale}/contact` }
  ];

  return (
    <footer className="bg-bg-alt">
      <div className="container-wide py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <Logo className="h-7 w-auto" />
            <p className="mt-4 text-[17px] font-semibold text-fg">{dict.footer.tagline}</p>
            <p className="mt-1 text-[15px] text-fg-2">{dict.footer.product} · Jyväskylä</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-[15px] sm:flex sm:gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-fg-2 transition hover:text-fg">
                {link.label}
              </Link>
            ))}
            <Link
              href="https://voon.fi"
              target="_blank"
              rel="noreferrer"
              className="text-fg-2 transition hover:text-fg"
            >
              voon.fi
            </Link>
          </nav>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-6 text-[14px] text-fg-3">
          <p>
            © {year} Cenk Yakinlar · VOON IQ. {dict.footer.rights}
          </p>
          <Link
            href={authorLinkedIn}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-2 transition hover:bg-fill hover:text-fg"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
