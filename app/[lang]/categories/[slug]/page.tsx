import { PostCard } from "@/components/post-card";
import { SectionHeader } from "@/components/section-header";
import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { getCategory, getPosts } from "@/lib/posts";
import { siteName } from "@/lib/site";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const category = await getCategory(decodeURIComponent(slug));

  if (!category) {
    notFound();
  }

  return {
    title: `${category.translations[lang]?.name || category.key} | ${siteName}`,
    description: category.translations[lang]?.description,
    alternates: {
      canonical: `/${lang}/categories/${slug}`
    }
  };
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const category = await getCategory(decodeURIComponent(slug));

  if (!category) {
    notFound();
  }

  const posts = await getPosts(category.id);

  return (
    <div className="section bg-bg-alt">
      <div className="container-wide">
        <SectionHeader
          as="h1"
          eyebrow={dict.categoriesPage.eyebrow}
          title={category.translations[locale]?.name || category.key}
          subtitle={category.translations[locale]?.description || ""}
        />

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                locale={locale}
                readLabel={dict.blog.readArticle}
                minuteLabel={dict.blog.minRead}
                priority={index < 2}
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
