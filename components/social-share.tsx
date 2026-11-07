"use client";

import { Check, Link2, Linkedin } from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";
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
    <div className="flex flex-col gap-4 rounded-[24px] bg-bg-alt p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[17px] font-semibold">{shareLabel}</p>
      <div className="flex flex-wrap gap-2">
        <ShareLink
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          label="LinkedIn"
          icon={<Linkedin className="h-4 w-4" />}
        />
        <ShareLink
          href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
          label="X"
          icon={<XIcon className="h-4 w-4" />}
        />
        <button
          type="button"
          onClick={async () => {
            if (!url) {
              return;
            }
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="btn btn-sm bg-surface text-fg shadow-sm hover:bg-fill"
        >
          {copied ? <Check className="h-4 w-4 text-brand" /> : <Link2 className="h-4 w-4" />}
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
    </div>
  );
}

function ShareLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="btn btn-sm bg-surface text-fg shadow-sm hover:bg-fill"
      aria-label={label}
    >
      {icon}
      {label}
    </a>
  );
}
