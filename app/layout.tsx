import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import type { ReactNode } from "react";
import "@/app/globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blog.voon.fi";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Futureframe | Personal Technology Blog",
    template: "%s | Futureframe"
  },
  description:
    "A premium personal technology blog about AI, software development, and future technologies.",
  keywords: ["AI", "Artificial Intelligence", "Software Engineering", "Tech Blog", "Future Technologies", "Web Development"],
  authors: [{ name: "Cenk Yakinlar", url: "https://www.linkedin.com/in/cenk-yakinlar-7417385b/" }],
  creator: "Cenk Yakinlar",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Futureframe",
    description: "A premium personal technology blog about AI, software development, and future technologies.",
    type: "website",
    siteName: "Futureframe",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Futureframe",
    description: "A premium personal technology blog about AI, software development, and future technologies.",
    creator: "@cenkyakinlar"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
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
