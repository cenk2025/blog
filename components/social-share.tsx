"use client";

import { Check, Copy, Linkedin, Share2, Twitter } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export function SocialShare({
  title,
  shareLabel,
  copyLabel,
  copiedLabel
}: {
  title: string;
  shareLabel: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-ink-light dark:text-ink-dark">
        <Share2 className="h-4 w-4 text-accent-cyan" />
        {shareLabel}
      </h3>
      <div className="flex flex-wrap gap-2">
        <ShareLink
          href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
          label="X"
          icon={<Twitter className="h-4 w-4" />}
        />
        <ShareLink
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          label="LinkedIn"
          icon={<Linkedin className="h-4 w-4" />}
        />
        <button
          type="button"
          onClick={async () => {
            if (!url) {
              return;
            }
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-xs text-ink-light/70 transition hover:border-accent-cyan/40 hover:text-accent-cyan dark:text-ink-dark/70"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
    </div>
  );
}

function ShareLink({
  href,
  label,
  icon
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-xs text-ink-light/70 transition hover:border-accent-cyan/40 hover:text-accent-cyan dark:text-ink-dark/70"
      aria-label={label}
    >
      {icon}
      {label}
    </Link>
  );
}
