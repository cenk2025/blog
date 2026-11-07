"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

// Apple-style fade-up reveal (cubic-bezier(.28,.11,.32,1)), disabled for reduced motion.
export function AnimatedSection({
  children,
  delay = 0,
  className
}: PropsWithChildren<{ delay?: number; className?: string }>) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: [0.28, 0.11, 0.32, 1], delay }}
    >
      {children}
    </motion.section>
  );
}
