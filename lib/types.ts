import { Locale } from "@/lib/i18n";

export type CategoryKey = "ai" | "software" | "trends" | "future" | "tutorials";

export type LocalizedContent = {
  title: string;
  excerpt: string;
  content: string[];
};

export type BlogPost = {
  slug: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
  category: CategoryKey;
  translations: Record<Locale, LocalizedContent>;
};

export type Category = {
  key: CategoryKey;
  icon: string;
  translations: Record<Locale, { name: string; description: string }>;
};
