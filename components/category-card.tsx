"use client";

import { Locale } from "@/lib/i18n";
import { Category } from "@/lib/types";
import { motion } from "framer-motion";
import { BookOpenCheck, Code2, Cpu, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

const iconMap = {
  Sparkles,
  Code2,
  TrendingUp,
  Cpu,
  BookOpenCheck
};

export function CategoryCard({
  category,
  locale,
  index = 0
}: {
  category: Category;
  locale: Locale;
  index?: number;
}) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Sparkles;
  const content = category.translations[locale];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        href={`/${locale}/categories/${category.key}`}
        className="block h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]"
      >
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-accent-cyan/30 bg-accent-cyan/15 text-accent-cyan">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-lg font-semibold text-ink-light dark:text-ink-dark">{content.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-light/70 dark:text-ink-dark/70">
          {content.description}
        </p>
      </Link>
    </motion.div>
  );
}
