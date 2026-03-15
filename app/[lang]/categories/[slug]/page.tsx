import { PostCard } from "@/components/post-card";
import { SectionHeader } from "@/components/section-header";
import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { createPublicClient } from "@/lib/supabase/public";
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
    return {};
  }

  const supabase = createPublicClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) {
    return {
      title: "Category Not Found"
    };
  }

  return {
    title: `${category.translations[lang]?.name || category.slug} | Futureframe`,
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
  const supabase = createPublicClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) {
    notFound();
  }

  const { data: rawPosts } = await supabase
    .from("posts")
    .select("*")
    .eq("category_id", category.id)
    .order("published_at", { ascending: false });

  const sortedPosts =
    rawPosts?.map((p) => ({
      slug: p.slug,
      coverImage: p.cover_image || "/images/covers/ai-systems.svg",
      author: p.author,
      publishedAt: p.published_at,
      readingTime: p.reading_time,
      tags: p.tags || [],
      featured: p.featured,
      category: p.category_id,
      translations: p.translations
    })) || [];

  return (
    <div>
      <SectionHeader 
        title={category.translations[locale]?.name || category.slug} 
        subtitle={category.translations[locale]?.description || ""} 
      />
      
      {sortedPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedPosts.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              locale={locale}
              readLabel={dict.blog.readArticle}
              minuteLabel={dict.blog.minRead}
              priority={index < 2}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-ink-light/70 dark:text-ink-dark/70">
            {locale === "fi" ? "Tässä kategoriassa ei ole vielä julkaisuja." : "No posts found in this category."}
          </p>
        </div>
      )}
    </div>
  );
}
