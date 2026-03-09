import { CategoryCard } from "@/components/category-card";
import { SectionHeader } from "@/components/section-header";
import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
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
    title: `${dict.categoriesPage.title} | Futureframe`,
    description: dict.categoriesPage.subtitle,
    alternates: {
      canonical: `/${lang}/categories`
    }
  };
}

export default async function CategoriesPage({
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
  const supabase = await createClient();

  const { data: rawCategories } = await supabase.from("categories").select("*");
  const categories =
    rawCategories?.map((c) => ({
      key: c.slug,
      icon: "Sparkles",
      translations: c.translations
    })) || [];

  return (
    <div>
      <SectionHeader
        title={dict.categoriesPage.title}
        subtitle={dict.categoriesPage.subtitle}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => (
          <CategoryCard key={category.key} category={category} locale={locale} index={index} />
        ))}
      </div>
    </div>
  );
}
