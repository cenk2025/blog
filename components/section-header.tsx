import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  className
}: {
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 md:mb-10", className)}>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-light dark:text-ink-dark md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-light/75 dark:text-ink-dark/70 md:text-base">
        {subtitle}
      </p>
    </div>
  );
}
