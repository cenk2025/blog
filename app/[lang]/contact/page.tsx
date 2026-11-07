import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { authorLinkedIn, siteName } from "@/lib/site";
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
    title: `${dict.contactPage.eyebrow} | ${siteName}`,
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
    <section className="section bg-bg-alt">
      <div className="container-apple">
        <div className="max-w-3xl">
          <p className="t-eyebrow">{dict.contactPage.eyebrow}</p>
          <h1 className="t-headline mt-3">{dict.contactPage.title}</h1>
          <p className="t-sub mt-5">{dict.contactPage.description}</p>
          <a href={`mailto:${dict.contactPage.emailValue}`} className="btn btn-primary mt-8">
            {dict.contactPage.cta}
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <ContactItem label={dict.contactPage.emailLabel}>
            <a href={`mailto:${dict.contactPage.emailValue}`} className="hover:text-brand">
              {dict.contactPage.emailValue}
            </a>
          </ContactItem>
          <ContactItem label="LinkedIn">
            <a href={authorLinkedIn} target="_blank" rel="noreferrer" className="hover:text-brand">
              Cenk Yakinlar
            </a>
          </ContactItem>
          <ContactItem label={dict.contactPage.locationLabel}>{dict.contactPage.locationValue}</ContactItem>
          <ContactItem label={dict.contactPage.collaborationLabel}>
            {dict.contactPage.collaborationValue}
          </ContactItem>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] bg-surface p-7 shadow-card md:p-8">
      <p className="text-[15px] font-semibold text-fg-2">{label}</p>
      <p className="mt-2 text-[21px] font-semibold leading-snug tracking-[-0.02em] text-fg">{children}</p>
    </div>
  );
}
