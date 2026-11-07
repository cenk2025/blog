import { ArticleBody } from "@/components/article-body";
import { PostCard } from "@/components/post-card";
import { SocialShare } from "@/components/social-share";
import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { getPost, getPosts } from "@/lib/posts";
import { authorLinkedIn, siteName, siteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  return []; // Rendered on demand since data comes from Supabase
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const translated = post.translations[lang] || post.translations.en;

  return {
    title: `${translated.title} | ${siteName}`,
    description: translated.excerpt,
    alternates: {
      canonical: `/${lang}/blog/${slug}`
    },
    openGraph: {
      title: translated.title,
      description: translated.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author]
    },
    twitter: {
      card: "summary_large_image",
      title: translated.title,
      description: translated.excerpt,
      images: [post.coverImage]
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
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const dict = getDictionary(locale);
  const translated = post.translations[locale] || post.translations.en;
  const morePosts = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: translated.title,
    description: translated.excerpt,
    image: post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: authorLinkedIn
    },
    publisher: {
      "@type": "Organization",
      name: "VOON IQ",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/voon-logo-color.png`
      }
    }
  };

  return (
    <>
      <article className="pb-20 pt-12 md:pb-28 md:pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <header className="container-read">
          <Link href={`/${locale}/blog`} className="text-[15px] font-medium text-brand hover:underline">
            ‹ {dict.article.backToBlog}
          </Link>
          {post.tags[0] && <p className="t-eyebrow mt-8">{post.tags[0]}</p>}
          <h1 className="mt-3 text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] [text-wrap:balance]">
            {translated.title}
          </h1>
          <p className="t-sub mt-5">{translated.excerpt}</p>

          <div className="mt-8 flex items-center gap-3 border-y border-line py-4">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <Image src="/images/author.jpg" alt={post.author} fill sizes="44px" className="object-cover" />
            </span>
            <div className="leading-tight">
              <p className="text-[17px] font-semibold">{post.author}</p>
              <p className="mt-0.5 text-[15px] text-fg-2">
                {formatDate(post.publishedAt, locale)} · {post.readingTime} {dict.blog.minRead}
              </p>
            </div>
          </div>
        </header>

        <div className="container-apple mt-10 md:mt-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-bg-alt md:rounded-[34px]">
            <Image
              src={post.coverImage}
              alt={translated.title}
              fill
              priority
              sizes="(max-width: 1068px) 100vw, 1068px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="container-read mt-12 md:mt-16">
          <ArticleBody paragraphs={translated.content ?? []} />

          {post.bottomImage && (
            <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-[28px]">
              <Image
                src={post.bottomImage}
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 700px"
                className="object-cover"
              />
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10">
            <SocialShare
              title={translated.title}
              shareLabel={dict.article.share}
              copyLabel={dict.article.copyLink}
              copiedLabel={dict.article.shareCopied}
            />
          </div>
        </div>
      </article>

      {morePosts.length > 0 && (
        <section className="section bg-bg-alt">
          <div className="container-wide">
            <h2 className="t-title mb-10">{dict.article.moreTitle}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {morePosts.map((p) => (
                <PostCard
                  key={p.slug}
                  post={p}
                  locale={locale}
                  readLabel={dict.blog.readArticle}
                  minuteLabel={dict.blog.minRead}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
