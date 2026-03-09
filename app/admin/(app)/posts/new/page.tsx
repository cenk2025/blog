import { createClient } from "@/lib/supabase/server";
import { PostForm } from "../post-form";

export default async function NewPost() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("slug");

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Create New Post</h1>
      <div className="rounded-2xl border border-black/5 bg-white/50 p-6 dark:border-white/10 dark:bg-white/[0.02]">
        <PostForm categories={categories || []} />
      </div>
    </div>
  );
}
