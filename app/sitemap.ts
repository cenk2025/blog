import { locales } from "@/lib/i18n";
import { createPublicClient } from "@/lib/supabase/public";
import { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

// Re-generate hourly so new posts appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/blog", "/categories", "/about", "/contact"];
  
  const supabase = createPublicClient();
  const { data: rawPosts } = await supabase.from("posts").select("slug, published_at");
  const posts = rawPosts || [];

  const localizedStatic = locales.flatMap((locale) =>
    staticRoutes.map((route) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        route === "" ? "weekly" : "monthly";
      return {
        url: `${siteUrl}/${locale}${route}`,
        changeFrequency,
        priority: route === "" ? 1 : 0.7
      };
    })
  );

  const localizedPosts = locales.flatMap((locale) =>
    posts.map((post: { slug: string; published_at: string }) => ({
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      lastModified: post.published_at,
      changeFrequency: "monthly" as const,
      priority: 0.65
    }))
  );

  return [...localizedStatic, ...localizedPosts];
}
