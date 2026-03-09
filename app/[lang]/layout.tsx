import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { defaultLocale, getDictionary, isValidLocale, Locale, locales } from "@/lib/i18n";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fi: "/fi"
      }
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "fi" ? "fi_FI" : "en_US"
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-60 dark:opacity-100" />
      <Navbar locale={locale} dict={dict} />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-8 md:px-6">{children}</main>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Footer locale={locale} dict={dict} />
      </div>
    </div>
  );
}
