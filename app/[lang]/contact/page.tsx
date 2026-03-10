import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  const dict = getDictionary(lang);

  return {
    title: `${dict.contactPage.title} | Futureframe`,
    description: dict.contactPage.description,
    alternates: {
      canonical: `/${lang}/contact`
    }
  };
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <section className="rounded-[2rem] border border-white/15 bg-white/[0.04] p-8 shadow-card backdrop-blur-xl md:p-12">
      <h1 className="font-display text-4xl font-semibold text-ink-light dark:text-ink-dark md:text-5xl">
        {dict.contactPage.title}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink-light/75 dark:text-ink-dark/75">
        {dict.contactPage.description}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ContactItem label={dict.contactPage.emailLabel} value={dict.contactPage.emailValue} />
        <ContactItem
          label={dict.contactPage.locationLabel}
          value={dict.contactPage.locationValue}
        />
        <ContactItem
          label={dict.contactPage.collaborationLabel}
          value={dict.contactPage.collaborationValue}
        />
        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
          <p className="text-sm text-ink-light/65 dark:text-ink-dark/65">LinkedIn</p>
          <Link
            href="https://www.linkedin.com/in/cenk-yakinlar-7417385b/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-base text-accent-cyan"
          >
            linkedin.com/in/cenk-yakinlar-7417385b
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
      <p className="text-sm text-ink-light/65 dark:text-ink-dark/65">{label}</p>
      <p className="mt-2 text-base text-ink-light dark:text-ink-dark">{value}</p>
    </div>
  );
}
