import { SocialShare } from "@/components/social-share";
import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { createPublicClient } from "@/lib/supabase/public";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  return []; // We will render on demand for now since data comes from Supabase
}

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
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) {
    return {};
  }

  const translated = post.translations[lang] || post.translations["en"];

  return {
    title: `${translated.title} | Futureframe`,
    description: translated.excerpt,
    alternates: {
      canonical: `/${lang}/blog/${slug}`
    },
    openGraph: {
      title: translated.title,
      description: translated.excerpt,
      images: [{ url: post.cover_image || "/images/covers/ai-systems.svg" }],
      type: "article"
    }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const supabase = createPublicClient();
  const { data: rawPost } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!rawPost) {
    notFound();
  }

  const post = {
    slug: rawPost.slug,
    coverImage: rawPost.cover_image || "/images/covers/ai-systems.svg",
    bottomImage: rawPost.bottom_image || null,
    author: rawPost.author,
    publishedAt: rawPost.published_at,
    readingTime: rawPost.reading_time,
    tags: rawPost.tags || [],
    translations: rawPost.translations
  };

  const dict = getDictionary(locale);
  const translated = post.translations[locale] || post.translations["en"];

  return (
    <article className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        <Link
          href={`/${locale}/blog`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-ink-light/70 transition hover:text-accent-cyan dark:text-ink-dark/70"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.article.backToBlog}
        </Link>

        <h1 className="font-display text-balance text-4xl font-semibold leading-tight text-ink-light dark:text-ink-dark md:text-5xl">
          {translated.title}
        </h1>
        <p className="mt-4 text-lg text-ink-light/70 dark:text-ink-dark/70">{translated.excerpt}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-ink-light/65 dark:text-ink-dark/65">
          <span>
            {dict.article.by} {post.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {dict.article.published} {formatDate(post.publishedAt, locale)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4" />
            {post.readingTime} {dict.blog.minRead}
          </span>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={post.coverImage}
            alt={translated.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        <div className="mt-8 max-w-none">
          {translated.content?.map((paragraph: string) => (
            <p
              key={paragraph}
              className="mb-5 text-lg leading-relaxed text-ink-light/85 dark:text-ink-dark/85"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {post.bottomImage && (
          <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 shadow-lg">
            <Image
              src={post.bottomImage}
              alt={`${translated.title} bottom image`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags?.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-ink-light/75 dark:text-ink-dark/75"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <SocialShare
          title={translated.title}
          shareLabel={dict.article.share}
          copyLabel={dict.article.copyLink}
          copiedLabel={dict.article.shareCopied}
        />
      </aside>
    </article>
  );
}
