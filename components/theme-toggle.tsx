"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="h-10 w-10 rounded-full border border-black/5 bg-black/[0.02] dark:border-white/15 dark:bg-white/5"
      />
    );
  }

  const dark = resolvedTheme !== "light";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-black/[0.02] text-ink-light transition duration-300 hover:border-accent-cyan/60 hover:bg-black/5 dark:border-white/15 dark:bg-white/5 dark:text-ink-dark dark:hover:bg-white/10"
    >
      {dark ? (
        <Sun className="h-4 w-4 transition group-hover:rotate-12" />
      ) : (
        <Moon className="h-4 w-4 transition group-hover:-rotate-12" />
      )}
    </button>
  );
}
