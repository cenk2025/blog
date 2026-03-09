"use client";

import { Dictionary } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function NewsletterCard({ dict }: { dict: Dictionary }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-accent-cyan/20 via-white/[0.06] to-accent-emerald/20 p-7 shadow-card backdrop-blur-2xl md:p-10"
    >
      <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-accent-cyan/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-10 h-48 w-48 rounded-full bg-accent-emerald/30 blur-3xl" />

      <h3 className="font-display text-3xl font-semibold text-ink-light dark:text-ink-dark md:text-4xl">
        {dict.home.newsletterTitle}
      </h3>
      <p className="mt-4 max-w-2xl text-ink-light/75 dark:text-ink-dark/75">
        {dict.home.newsletterSubtitle}
      </p>

      <form className="mt-7 flex flex-col gap-3 sm:flex-row">
        <input
          aria-label="Email"
          type="email"
          placeholder={dict.home.newsletterPlaceholder}
          className="h-12 flex-1 rounded-full border border-white/20 bg-canvas-dark/70 px-5 text-sm text-ink-dark placeholder:text-ink-dark/50 outline-none transition focus:border-accent-cyan/70"
        />
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-accent-cyan/40 bg-accent-cyan/25 px-6 text-sm font-semibold text-ink-dark transition hover:border-accent-cyan hover:bg-accent-cyan/35"
        >
          {dict.home.newsletterButton}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </motion.div>
  );
}
