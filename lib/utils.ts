import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string, locale: "en" | "fi") {
  const localeTag = locale === "fi" ? "fi-FI" : "en-US";
  return new Intl.DateTimeFormat(localeTag, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}
