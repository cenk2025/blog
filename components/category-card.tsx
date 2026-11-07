import { Locale } from "@/lib/i18n";
import { Category } from "@/lib/types";
import Link from "next/link";

export function CategoryCard({
  category,
  locale,
  count,
  countLabel
}: {
  category: Category;
  locale: Locale;
  count?: number;
  countLabel?: string;
}) {
  const content = category.translations[locale] ?? category.translations.en;

  return (
    <Link
      href={`/${locale}/categories/${category.key}`}
      className="group flex h-full flex-col rounded-[28px] bg-surface p-7 shadow-card transition duration-500 ease-apple hover:-translate-y-1 md:p-8"
    >
      <span className="mb-6 block h-1 w-10 rounded-full bg-grad" aria-hidden />
      <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.022em] text-fg">{content.name}</h3>
      <p className="mt-3 text-[17px] leading-[1.47] text-fg-2">{content.description}</p>
      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-[15px] text-fg-3">
          {typeof count === "number" && `${count} ${countLabel ?? ""}`}
        </span>
        <span className="link-more" aria-hidden />
      </div>
    </Link>
  );
}
