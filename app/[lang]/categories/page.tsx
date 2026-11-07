import { CategoryCard } from "@/components/category-card";
import { SectionHeader } from "@/components/section-header";
import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { getCategories, getPosts } from "@/lib/posts";
import { siteName } from "@/lib/site";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

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
    title: `${dict.categoriesPage.eyebrow} | ${siteName}`,
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
  const [categories, posts] = await Promise.all([getCategories(), getPosts()]);

  return (
    <div className="section bg-bg-alt">
      <div className="container-wide">
        <SectionHeader
          as="h1"
          eyebrow={dict.categoriesPage.eyebrow}
          title={dict.categoriesPage.title}
          subtitle={dict.categoriesPage.subtitle}
        />
        {categories.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.key}
                category={category}
                locale={locale}
                count={posts.filter((p) => p.category === category.id).length}
                countLabel={dict.categoriesPage.posts}
              />
            ))}
          </div>
        ) : (
          <p className="t-sub py-20 text-center">{dict.categoriesPage.empty}</p>
        )}
      </div>
    </div>
  );
}
