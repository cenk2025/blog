import { PostCard } from "@/components/post-card";
import { SectionHeader } from "@/components/section-header";
import { getDictionary, isValidLocale, Locale } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
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
    title: `${dict.blog.eyebrow} | ${siteName}`,
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
  const posts = await getPosts();
  const [leadPost, ...rest] = posts;

  const cardProps = {
    locale,
    readLabel: dict.blog.readArticle,
    minuteLabel: dict.blog.minRead
  };

  return (
    <div className="section bg-bg-alt">
      <div className="container-wide">
        <SectionHeader as="h1" eyebrow={dict.blog.eyebrow} title={dict.blog.title} subtitle={dict.blog.subtitle} />

        {leadPost ? (
          <>
            <PostCard post={leadPost} variant="lead" priority {...cardProps} />
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <PostCard key={post.slug} post={post} priority={index < 2} {...cardProps} />
              ))}
            </div>
          </>
        ) : (
          <p className="t-sub py-20 text-center">{dict.blog.empty}</p>
        )}
      </div>
    </div>
  );
}
