import { createClient } from "@/lib/supabase/server";
import { PostForm } from "../post-form";
import { notFound } from "next/navigation";

export default async function EditPost({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("slug");

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Edit Post</h1>
      <div className="rounded-2xl border border-black/5 bg-white/50 p-6 dark:border-white/10 dark:bg-white/[0.02]">
        <PostForm initialData={post} categories={categories || []} />
      </div>
    </div>
  );
}
