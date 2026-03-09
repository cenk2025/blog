/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ImageUpload } from "./image-upload";

export function PostForm({
  initialData,
  categories
}: {
  initialData?: any;
  categories: any[];
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    slug: initialData?.slug || "",
    author: initialData?.author || "Cenk Yakinlar",
    reading_time: initialData?.reading_time || 5,
    category_id: initialData?.category_id || "",
    featured: initialData?.featured || false,
    cover_image: initialData?.cover_image || "",
    bottom_image: initialData?.bottom_image || "",
    enTitle: initialData?.translations?.en?.title || "",
    enExcerpt: initialData?.translations?.en?.excerpt || "",
    enContent: initialData?.translations?.en?.content?.join("\n\n") || "",
    fiTitle: initialData?.translations?.fi?.title || "",
    fiExcerpt: initialData?.translations?.fi?.excerpt || "",
    fiContent: initialData?.translations?.fi?.content?.join("\n\n") || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const postPayload = {
      slug: formData.slug,
      author: formData.author,
      reading_time: formData.reading_time,
      category_id: formData.category_id || null,
      featured: formData.featured,
      cover_image: formData.cover_image,
      bottom_image: formData.bottom_image,
      translations: {
        en: {
          title: formData.enTitle,
          excerpt: formData.enExcerpt,
          content: formData.enContent.split("\n\n")
        },
        fi: {
          title: formData.fiTitle,
          excerpt: formData.fiExcerpt,
          content: formData.fiContent.split("\n\n")
        }
      }
    };

    if (initialData?.id) {
      // Update
      const { error } = await supabase
        .from("posts")
        .update(postPayload)
        .eq("id", initialData.id);

      if (!error) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        alert(error.message);
      }
    } else {
      // Insert
      const { error } = await supabase.from("posts").insert([postPayload]);

      if (!error) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        alert(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Settings */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">URL Slug</label>
          <input
            required
            type="text"
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="my-new-post"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <select
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.category_id}
            onChange={(e) =>
              setFormData({ ...formData, category_id: e.target.value })
            }
          >
            <option value="">No Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.slug}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Author</label>
          <input
            required
            type="text"
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Reading Time (mins)
          </label>
          <input
            required
            type="number"
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.reading_time}
            onChange={(e) =>
              setFormData({ ...formData, reading_time: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) =>
              setFormData({ ...formData, featured: e.target.checked })
            }
            className="rounded border-black/10 bg-white/50 dark:border-white/10 dark:bg-white/[0.02]"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Featured Post (Show on Home)
          </label>
        </div>
        <div className="col-span-full grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Cover Image (Top)</label>
            <ImageUpload
              value={formData.cover_image}
              onChange={(url) => setFormData({ ...formData, cover_image: url })}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Bottom Image (16:9)</label>
            <ImageUpload
              value={formData.bottom_image}
              onChange={(url) => setFormData({ ...formData, bottom_image: url })}
            />
          </div>
        </div>
      </div>

      <hr className="border-black/5 dark:border-white/10" />

      {/* English Content */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold">English Content</h3>
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            required
            type="text"
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.enTitle}
            onChange={(e) => setFormData({ ...formData, enTitle: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Excerpt</label>
          <textarea
            required
            rows={2}
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.enExcerpt}
            onChange={(e) =>
              setFormData({ ...formData, enExcerpt: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Content (Markdown supported, empty lines for paragraphs)
          </label>
          <textarea
            required
            rows={10}
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 font-mono text-sm dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.enContent}
            onChange={(e) =>
              setFormData({ ...formData, enContent: e.target.value })
            }
          />
        </div>
      </div>

      <hr className="border-black/5 dark:border-white/10" />

      {/* Finnish Content */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold">Finnish Content</h3>
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            required
            type="text"
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.fiTitle}
            onChange={(e) => setFormData({ ...formData, fiTitle: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Excerpt</label>
          <textarea
            required
            rows={2}
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.fiExcerpt}
            onChange={(e) =>
              setFormData({ ...formData, fiExcerpt: e.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Content</label>
          <textarea
            required
            rows={10}
            className="w-full rounded-lg border border-black/10 bg-white/50 px-4 py-2 font-mono text-sm dark:border-white/10 dark:bg-white/[0.02]"
            value={formData.fiContent}
            onChange={(e) =>
              setFormData({ ...formData, fiContent: e.target.value })
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
          {loading ? "Saving..." : initialData ? "Save Changes" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
