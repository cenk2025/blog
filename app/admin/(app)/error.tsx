"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center p-12 text-center">
      <h2 className="mb-4 font-display text-2xl font-bold text-red-500">
        Something went wrong!
      </h2>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-black/5 px-4 py-2 transition hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
      >
        Try again
      </button>
    </div>
  );
}
