import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { Metadata } from "next";
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
    title: `${dict.aboutPage.title} | Futureframe`,
    description: dict.aboutPage.description,
    alternates: {
      canonical: `/${lang}/about`
    }
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.04] p-8 shadow-card backdrop-blur-xl md:p-12">
      <h1 className="font-display text-4xl font-semibold text-ink-light dark:text-ink-dark md:text-5xl">
        {dict.aboutPage.title}
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-light/80 dark:text-ink-dark/80">
        {dict.aboutPage.description}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Stat value="7+" label={dict.aboutPage.stats.years} />
        <Stat value="120+" label={dict.aboutPage.stats.essays} />
        <Stat value="30K+" label={dict.aboutPage.stats.readers} />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
      <p className="font-display text-3xl text-accent-cyan">{value}</p>
      <p className="mt-1 text-sm text-ink-light/70 dark:text-ink-dark/70">{label}</p>
    </div>
  );
}
