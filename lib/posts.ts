import type { Category, BlogPost } from "@/lib/types";
import { samplePosts, sampleCategories } from "@/lib/sample-data";
import { createPublicClient } from "@/lib/supabase/public";

export const defaultCover = "/images/covers/default.jpg";

// Topic photos for posts that were published without their own cover.
const coverFallbacks: Record<string, string> = {
  "I-Am-a-Genius": "/images/covers/genius.jpg",
  "Talent-Factory": "/images/covers/talent-factory.jpg",
  "The-Joy-of-Feeling-St-pid": "/images/covers/feeling-stupid.jpg"
};

const legacyCovers = new Set(["/images/covers/ai-systems.svg"]);

const hasSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

type PostRow = {
  id?: string;
  slug: string;
  cover_image: string | null;
  bottom_image?: string | null;
  author: string;
  published_at: string;
  reading_time: number;
  tags: string[] | null;
  featured: boolean;
  category_id: string | null;
  translations: BlogPost["translations"];
};

type CategoryRow = {
  id: string;
  slug: string;
  translations: Category["translations"];
};

export function resolveCover(slug: string, cover: string | null | undefined) {
  if (cover && !legacyCovers.has(cover)) {
    return cover;
  }
  return coverFallbacks[slug] ?? defaultCover;
}

export function mapPost(p: PostRow): BlogPost {
  return {
    slug: p.slug,
    coverImage: resolveCover(p.slug, p.cover_image),
    bottomImage: p.bottom_image || null,
    author: p.author,
    publishedAt: p.published_at,
    readingTime: p.reading_time,
    tags: p.tags || [],
    featured: p.featured,
    category: p.category_id,
    translations: p.translations
  };
}

function mapCategory(c: CategoryRow): Category & { id: string } {
  return {
    id: c.id,
    key: c.slug,
    icon: "Sparkles",
    translations: c.translations
  };
}

export async function getPosts(categoryId?: string): Promise<BlogPost[]> {
  if (!hasSupabase) {
    return samplePosts.filter((p) => !categoryId || p.category === categoryId);
  }

  const supabase = createPublicClient();
  let query = supabase.from("posts").select("*").order("published_at", { ascending: false });
  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }
  const { data } = await query;
  return (data as PostRow[] | null)?.map(mapPost) ?? [];
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!hasSupabase) {
    return samplePosts.find((p) => p.slug === slug) ?? null;
  }

  const supabase = createPublicClient();
  const { data } = await supabase.from("posts").select("*").eq("slug", slug).single();
  return data ? mapPost(data as PostRow) : null;
}

export async function getCategories() {
  if (!hasSupabase) {
    return sampleCategories;
  }

  const supabase = createPublicClient();
  const { data } = await supabase.from("categories").select("*");
  return (data as CategoryRow[] | null)?.map(mapCategory) ?? [];
}

export async function getCategory(slug: string) {
  if (!hasSupabase) {
    return sampleCategories.find((c) => c.key === slug) ?? null;
  }

  const supabase = createPublicClient();
  const { data } = await supabase.from("categories").select("*").eq("slug", slug).single();
  return data ? mapCategory(data as CategoryRow) : null;
}
