import { AnimatedSection } from "@/components/animated-section";
import { CategoryCard } from "@/components/category-card";
import { HeroSection } from "@/components/hero-section";
import { NewsletterCard } from "@/components/newsletter-card";
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
    title: dict.meta.title,
    description: dict.meta.description
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
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

  const { data: rawCategories } = await supabase.from("categories").select("*");

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

  const categories =
    rawCategories?.map((c) => ({
      key: c.slug,
      icon: "Sparkles", // default or mapped later
      translations: c.translations
    })) || [];

  const featuredPosts = sortedPosts.filter((post) => post.featured).slice(0, 3);
  const latestPosts = sortedPosts.slice(0, 6);

  return (
    <div className="space-y-16 md:space-y-20">
      <HeroSection locale={locale} dict={dict} />

      <AnimatedSection>
        <SectionHeader
          title={dict.home.featuredTitle}
          subtitle={dict.home.featuredSubtitle}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              locale={locale}
              readLabel={dict.blog.readArticle}
              minuteLabel={dict.blog.minRead}
              priority={index === 0}
              index={index}
            />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader title={dict.home.latestTitle} subtitle={dict.home.latestSubtitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              locale={locale}
              readLabel={dict.blog.readArticle}
              minuteLabel={dict.blog.minRead}
              index={index}
            />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeader
          title={dict.home.categoriesTitle}
          subtitle={dict.home.categoriesSubtitle}
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard key={category.key} category={category} locale={locale} index={index} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <NewsletterCard dict={dict} />
      </AnimatedSection>
    </div>
  );
}
