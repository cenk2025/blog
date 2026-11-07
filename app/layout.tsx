import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import type { ReactNode } from "react";
import "@/app/globals.css";

import { siteName, siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Cenk Yakinlar`,
    template: `%s | ${siteName}`
  },
  description:
    "Cenk Yakinlarin blogi tekoälystä, osaamisesta ja työn tulevaisuudesta. Kirjoituksia VOON IQ:n rakentamisesta Jyväskylästä.",
  keywords: ["tekoäly", "AI", "osaaminen", "työn tulevaisuus", "VOON IQ", "Talent Factory", "BizPulse"],
  authors: [{ name: "Cenk Yakinlar", url: "https://www.linkedin.com/in/cenk-yakinlar-7417385b/" }],
  creator: "Cenk Yakinlar",
  icons: {
    icon: "/brand/voon-mark-color.png",
    apple: "/brand/voon-mark-color.png"
  },
  openGraph: {
    title: siteName,
    description:
      "Cenk Yakinlarin blogi tekoälystä, osaamisesta ja työn tulevaisuudesta.",
    type: "website",
    siteName,
    images: [{ url: "/images/covers/default.jpg" }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    creator: "@cenkyakinlar"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fi" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
