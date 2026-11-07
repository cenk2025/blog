import { AnimatedSection } from "@/components/animated-section";
import { CategoryCard } from "@/components/category-card";
import { HeroSection } from "@/components/hero-section";
import { NewsletterCard } from "@/components/newsletter-card";
import { PostCard } from "@/components/post-card";
import { SectionHeader } from "@/components/section-header";
import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { getCategories, getPosts } from "@/lib/posts";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        fi: "/fi"
      }
    }
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  const [leadPost, ...restPosts] = posts;
  const featuredPosts = restPosts.filter((post) => post.featured).slice(0, 2);
  const featuredSlugs = new Set(featuredPosts.map((p) => p.slug));
  const latestPosts = restPosts.filter((p) => !featuredSlugs.has(p.slug)).slice(0, 6);

  const cardProps = {
    locale,
    readLabel: dict.blog.readArticle,
    minuteLabel: dict.blog.minRead
  };

  return (
    <>
      <HeroSection locale={locale} dict={dict} />

      {leadPost && (
        <AnimatedSection className="section bg-bg-alt mt-16 md:mt-24">
          <div className="container-wide">
            <SectionHeader title={dict.home.featuredTitle} subtitle={dict.home.featuredSubtitle} />
            <PostCard post={leadPost} variant="lead" priority {...cardProps} />
            {featuredPosts.length > 0 && (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} {...cardProps} />
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      )}

      {latestPosts.length > 0 && (
        <AnimatedSection className="section">
          <div className="container-wide">
            <SectionHeader
              title={dict.home.latestTitle}
              subtitle={dict.home.latestSubtitle}
              action={{ label: dict.home.allPosts, href: `/${locale}/blog` }}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} {...cardProps} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {categories.length > 0 && (
        <AnimatedSection className="section bg-bg-alt">
          <div className="container-wide">
            <SectionHeader title={dict.home.categoriesTitle} subtitle={dict.home.categoriesSubtitle} />
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
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection className="section">
        <div className="container-apple grid items-center gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full md:w-full">
            <Image src="/images/author.jpg" alt="Cenk Yakinlar" fill sizes="280px" className="object-cover" />
          </div>
          <div>
            <p className="t-eyebrow">{dict.home.authorEyebrow}</p>
            <h2 className="t-title mt-3">{dict.home.authorTitle}</h2>
            <p className="t-sub mt-5">{dict.home.authorText}</p>
            <Link href={`/${locale}/about`} className="link-more mt-6 text-[17px]">
              {dict.home.authorCta}
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="pb-24 md:pb-32">
        <div className="container-wide">
          <NewsletterCard dict={dict} />
        </div>
      </AnimatedSection>
    </>
  );
}
