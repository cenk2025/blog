/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function CategoryForm({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    slug: initialData?.slug || "",
    enName: initialData?.translations?.en?.name || "",
    enDescription: initialData?.translations?.en?.description || "",
    fiName: initialData?.translations?.fi?.name || "",
    fiDescription: initialData?.translations?.fi?.description || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      slug: formData.slug,
      translations: {
        en: {
          name: formData.enName,
          description: formData.enDescription
        },
        fi: {
          name: formData.fiName,
          description: formData.fiDescription
        }
      }
    };

    if (initialData?.id) {
      const { error } = await supabase
        .from("categories")
        .update(payload)
        .eq("id", initialData.id);

      if (!error) {
        router.push("/admin/categories");
        router.refresh();
      } else {
        alert(error.message);
      }
    } else {
      const { error } = await supabase.from("categories").insert([payload]);

      if (!error) {
        router.push("/admin/categories");
        router.refresh();
      } else {
        alert(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="mb-2 block text-sm font-medium">URL Slug</label>
        <input
          required
          type="text"
          className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="my-new-category"
        />
      </div>

      <hr className="border-black/5 dark:border-white/10" />

      {/* English */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold">English Info</h3>
        <div>
          <label className="mb-2 block text-sm font-medium">Name</label>
          <input
            required
            type="text"
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.enName}
            onChange={(e) => setFormData({ ...formData, enName: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            required
            rows={2}
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.enDescription}
            onChange={(e) =>
              setFormData({ ...formData, enDescription: e.target.value })
            }
          />
        </div>
      </div>

      <hr className="border-black/5 dark:border-white/10" />

      {/* Finnish */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold">Finnish Info</h3>
        <div>
          <label className="mb-2 block text-sm font-medium">Name</label>
          <input
            required
            type="text"
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.fiName}
            onChange={(e) => setFormData({ ...formData, fiName: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            required
            rows={2}
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.fiDescription}
            onChange={(e) =>
              setFormData({ ...formData, fiDescription: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          disabled={loading}
          type="submit"
          className="rounded-lg bg-accent-cyan/20 px-6 py-3 font-medium text-ink-dark transition hover:bg-accent-cyan/30 disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Save Changes" : "Create Category"}
        </button>
      </div>
    </form>
  );
}
