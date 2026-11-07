import { cn } from "@/lib/utils";
import Link from "next/link";

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  action,
  as: Heading = "h2",
  className
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  action?: { label: string; href: string };
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl">
        {eyebrow && <p className="t-eyebrow mb-3">{eyebrow}</p>}
        <Heading className={Heading === "h1" ? "t-headline" : "t-title"}>{title}</Heading>
        {subtitle && <p className="t-sub mt-4">{subtitle}</p>}
      </div>
      {action && (
        <Link href={action.href} className="link-more shrink-0 text-[17px]">
          {action.label}
        </Link>
      )}
    </div>
  );
}
