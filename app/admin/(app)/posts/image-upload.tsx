"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";

export function ImageUpload({
  value,
  onChange,
  bucket = "blog-images",
  folder = "posts"
}: {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
}) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onChange(data.publicUrl);
    } catch (error: unknown) {
      alert("Error uploading image: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative aspect-[16/9] w-full max-w-xl overflow-hidden rounded-xl border border-white/10">
          <Image src={value} alt="Uploaded image" fill className="object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition hover:bg-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex aspect-[16/9] w-full max-w-xl cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-white/50 text-ink-light/60 transition hover:bg-black/5 dark:border-white/10 dark:bg-white/[0.02] dark:text-ink-dark/60 dark:hover:bg-white/5">
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <Upload className="mb-2 h-6 w-6" />
              <span className="text-sm font-medium">Click to upload image</span>
              <span className="text-xs opacity-70">16:9 recommended</span>
            </>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={loading}
          />
        </label>
      )}
    </div>
  );
}
