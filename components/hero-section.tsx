"use client";

import { Dictionary, Locale } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/[0.03] p-6 shadow-card backdrop-blur-2xl md:p-12">
      <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-accent-cyan/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent-emerald/25 blur-3xl" />

      <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-ink-dark/75">
            <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
            <span>Personal Technology Journal</span>
          </div>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink-light dark:text-ink-dark md:text-6xl">
            {dict.hero.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-light/75 dark:text-ink-dark/70 md:text-xl">
            {dict.hero.intro}
          </p>
          <p className="mt-4 max-w-2xl animate-shimmer bg-gradient-to-r from-accent-cyan via-ink-dark to-accent-emerald bg-[length:200%_auto] bg-clip-text text-xl font-semibold text-transparent md:text-2xl">
            {dict.hero.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/35 bg-accent-cyan/20 px-5 py-3 text-sm font-medium text-ink-dark transition hover:border-accent-cyan hover:bg-accent-cyan/30"
            >
              {dict.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/categories`}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-ink-dark/80 transition hover:bg-white/10"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto"
        >
          <div className="relative h-72 w-72 animate-float rounded-full p-[3px] md:h-[20rem] md:w-[20rem]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-cyan via-accent-amber to-accent-emerald opacity-80 blur-md" />
            <div className="relative h-full w-full overflow-hidden rounded-full border border-white/20 bg-canvas-dark/70">
              <Image
                src="/images/author.jpg"
                alt="Author portrait"
                fill
                priority
                sizes="(max-width: 768px) 18rem, 20rem"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
