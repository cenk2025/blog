import type { Locale } from "@/lib/i18n";
import type { BlogPost } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  post: BlogPost;
  locale: Locale;
  readLabel: string;
  minuteLabel: string;
  priority?: boolean;
  /** "lead" = large horizontal story card used for the top article. */
  variant?: "default" | "lead";
};

export function PostCard({
  post,
  locale,
  readLabel,
  minuteLabel,
  priority = false,
  variant = "default"
}: PostCardProps) {
  const localized = post.translations[locale] ?? post.translations.en;
  const lead = variant === "lead";

  return (
    <article className="group h-full">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-[28px] bg-surface shadow-card transition duration-500 ease-apple hover:-translate-y-1",
          lead && "md:grid md:grid-cols-[1.25fr_1fr]"
        )}
      >
        <div className={cn("relative overflow-hidden bg-bg-alt", lead ? "aspect-[16/10] md:aspect-auto md:min-h-[440px]" : "aspect-[16/10]")}>
          <Image
            src={post.coverImage}
            alt={localized.title}
            fill
            priority={priority}
            sizes={lead ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"}
            className="object-cover transition duration-700 ease-apple group-hover:scale-[1.03]"
          />
        </div>

        <div className={cn("flex flex-1 flex-col", lead ? "p-7 md:p-10 md:justify-center" : "p-6 md:p-7")}>
          {post.tags[0] && <p className="t-eyebrow mb-3 text-[15px]">{post.tags[0]}</p>}

          <h3
            className={cn(
              "font-semibold text-fg [text-wrap:balance]",
              lead
                ? "text-[28px] leading-[1.1] tracking-[-0.025em] md:text-[40px]"
                : "text-[22px] leading-[1.18] tracking-[-0.02em]"
            )}
          >
            {localized.title}
          </h3>

          <p
            className={cn(
              "mt-3 text-fg-2 [text-wrap:pretty]",
              lead ? "line-clamp-4 text-[17px] leading-[1.5] md:text-[19px]" : "line-clamp-3 text-[17px] leading-[1.47]"
            )}
          >
            {localized.excerpt}
          </p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
            <p className="text-[15px] text-fg-3">
              {formatDate(post.publishedAt, locale)} · {post.readingTime} {minuteLabel}
            </p>
            <span className="link-more text-[15px]">{readLabel}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
