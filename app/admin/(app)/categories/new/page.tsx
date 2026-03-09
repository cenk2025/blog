import { CategoryForm } from "../category-form";

export default function NewCategory() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Create New Category</h1>
      <div className="rounded-2xl border border-black/5 bg-white/50 p-6 dark:border-white/10 dark:bg-white/[0.02]">
        <CategoryForm />
      </div>
    </div>
  );
}
