import { Locale } from "@/lib/i18n";

export type LocalizedContent = {
  title: string;
  excerpt: string;
  content: string[];
};

export type BlogPost = {
  slug: string;
  coverImage: string;
  bottomImage?: string | null;
  author: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
  category: string | null;
  translations: Record<Locale, LocalizedContent>;
};

export type Category = {
  key: string;
  icon: string;
  translations: Record<Locale, { name: string; description: string }>;
};
