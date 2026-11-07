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
    <div lang={locale} className="flex min-h-screen flex-col overflow-x-clip">
      <Navbar locale={locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
