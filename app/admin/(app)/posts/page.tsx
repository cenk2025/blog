import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminPosts() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*, categories(slug)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/20 px-4 py-2 text-sm font-medium text-ink-dark transition hover:bg-accent-cyan/30"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white/50 dark:border-white/10 dark:bg-white/[0.02]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 bg-black/5 dark:border-white/10 dark:bg-white/[0.02]">
            <tr>
              <th className="px-6 py-4 font-medium">Title (EN)</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {posts?.map((post) => (
              <tr key={post.id} className="transition hover:bg-black/5 dark:hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-medium text-ink-light dark:text-ink-dark">
                  {post.translations?.en?.title || post.slug}
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-black/5 px-2.5 py-1 text-xs dark:bg-white/10">
                    {post.categories?.slug || "None"}
                  </span>
                </td>
                <td className="px-6 py-4 text-ink-light/70 dark:text-ink-dark/70">
                  {new Date(post.published_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="rounded p-2 text-ink-light/60 transition hover:bg-black/5 hover:text-ink-light dark:text-ink-dark/60 dark:hover:bg-white/10 dark:hover:text-ink-dark"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button className="rounded p-2 text-red-500/60 transition hover:bg-red-500/10 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-ink-light/60 dark:text-ink-dark/60">
                  No posts found. Create your first post!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
