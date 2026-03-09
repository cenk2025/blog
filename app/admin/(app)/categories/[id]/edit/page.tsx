import { createClient } from "@/lib/supabase/server";
import { CategoryForm } from "../../category-form";
import { notFound } from "next/navigation";

export default async function EditCategory({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (!category) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Edit Category</h1>
      <div className="rounded-2xl border border-black/5 bg-white/50 p-6 dark:border-white/10 dark:bg-white/[0.02]">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
