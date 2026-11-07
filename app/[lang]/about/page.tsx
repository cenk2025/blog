import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { siteName } from "@/lib/site";
import { Metadata } from "next";
import Image from "next/image";
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
    title: `${dict.aboutPage.eyebrow} | ${siteName}`,
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
  const numberFormat = new Intl.NumberFormat(locale === "fi" ? "fi-FI" : "en-US");

  const stats = [
    { value: 13939, label: dict.aboutPage.stats.skills },
    { value: 3039, label: dict.aboutPage.stats.occupations },
    { value: 28, label: dict.aboutPage.stats.languages }
  ];

  return (
    <>
      <section className="section">
        <div className="container-apple grid items-center gap-12 md:grid-cols-[1fr_340px] md:gap-16">
          <div>
            <p className="t-eyebrow">{dict.aboutPage.eyebrow}</p>
            <h1 className="t-headline mt-3">{dict.aboutPage.title}</h1>
            <p className="t-sub mt-6">{dict.aboutPage.description}</p>
            <div className="mt-8 space-y-5 text-[19px] leading-[1.6] text-fg">
              {dict.aboutPage.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <a href="https://voon.fi" target="_blank" rel="noreferrer" className="btn btn-primary mt-9">
              {dict.aboutPage.cta}
            </a>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[34px]">
            <Image src="/images/author.jpg" alt="Cenk Yakinlar" fill priority sizes="340px" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-black py-20 text-[#f5f5f7] md:py-28">
        <div className="container-apple grid gap-12 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className={i > 0 ? "sm:border-l sm:border-[#424245] sm:pl-10" : ""}>
              <p className="text-gradient text-[clamp(3rem,2rem+3vw,4.5rem)] font-semibold leading-none tracking-[-0.035em]">
                {numberFormat.format(stat.value)}
              </p>
              <p className="mt-3 text-[19px] font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="container-apple mt-12 text-[15px] text-[#a1a1a6]">
          SkillPath · <Link href="https://tyo.voon.fi" className="underline-offset-2 hover:underline">tyo.voon.fi</Link>
        </p>
      </section>
    </>
  );
}
