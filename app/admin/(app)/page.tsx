import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Basic counters for the dashboard
  const { count: postsCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });

  const { count: categoriesCount } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white/50 p-6 dark:border-white/10 dark:bg-white/[0.02]">
          <h2 className="text-sm font-medium text-ink-light/70 dark:text-ink-dark/70">
            Total Posts
          </h2>
          <p className="mt-2 font-display text-4xl font-bold">
            {postsCount || 0}
          </p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white/50 p-6 dark:border-white/10 dark:bg-white/[0.02]">
          <h2 className="text-sm font-medium text-ink-light/70 dark:text-ink-dark/70">
            Total Categories
          </h2>
          <p className="mt-2 font-display text-4xl font-bold">
            {categoriesCount || 0}
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-black/5 bg-white/50 p-8 text-center dark:border-white/10 dark:bg-white/[0.02]">
        <h3 className="font-display text-xl font-semibold">
          Welcome to Futureframe Admin
        </h3>
        <p className="mt-2 text-ink-light/70 dark:text-ink-dark/70">
          Use the sidebar to manage your blog posts and categories.
        </p>
      </div>
    </div>
  );
}
