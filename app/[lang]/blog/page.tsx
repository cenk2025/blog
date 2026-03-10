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
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  const dict = getDictionary(lang);

  return {
    title: `${dict.blog.title} | Futureframe`,
    description: dict.blog.subtitle,
    alternates: {
      canonical: `/${lang}/blog`
    }
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const supabase = createPublicClient();

  const { data: rawPosts } = await supabase
    .from("posts")
    .select("*")
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
      <SectionHeader title={dict.blog.title} subtitle={dict.blog.subtitle} />
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
    </div>
  );
}
