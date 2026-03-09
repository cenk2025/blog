import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import type { ReactNode } from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://futureframe.example"),
  title: "Futureframe | Personal Technology Blog",
  description:
    "A premium personal technology blog about AI, software development, and future technologies.",
  alternates: {
    canonical: "/en"
  },
  openGraph: {
    title: "Futureframe",
    description:
      "A premium personal technology blog about AI, software development, and future technologies.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
