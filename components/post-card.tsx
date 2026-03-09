"use client";

import type { Locale } from "@/lib/i18n";
import type { BlogPost } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PostCard({
  post,
  locale,
  readLabel,
  minuteLabel,
  priority = false,
  index = 0
}: {
  post: BlogPost;
  locale: Locale;
  readLabel: string;
  minuteLabel: string;
  priority?: boolean;
  index?: number;
}) {
  const localized = post.translations[locale];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="group h-full"
    >
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={localized.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-ink-light/65 dark:text-ink-dark/65">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {post.readingTime} {minuteLabel}
            </span>
          </div>

          <h3 className="font-display text-xl font-semibold leading-snug text-ink-light transition group-hover:text-accent-cyan dark:text-ink-dark">
            {localized.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-light/70 dark:text-ink-dark/70">
            {localized.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-xs text-ink-light/75 dark:text-ink-dark/75",
                  tag === "AI" && "border-accent-cyan/35 text-accent-cyan"
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan">
            {readLabel}
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
