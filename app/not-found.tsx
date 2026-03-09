import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="mb-3 text-sm uppercase tracking-[0.28em] text-accent-cyan">404</p>
      <h1 className="font-display text-4xl font-semibold text-ink-light dark:text-ink-dark md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 text-ink-light/70 dark:text-ink-dark/70">
        The content you are looking for does not exist.
      </p>
      <Link
        href="/en"
        className="mt-8 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm text-ink-light transition hover:bg-white/[0.1] dark:text-ink-dark"
      >
        Back to home
      </Link>
    </main>
  );
}
