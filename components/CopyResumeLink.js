"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-200 transition hover:border-emerald-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60";

export default function CopyResumeLink({ href = "/resume.pdf", className }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url = new URL(href, window.location.origin).toString();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className={cn(base, className)}
      onClick={handleCopy}
      aria-label="Copy resume link"
      title={copied ? "Copied!" : "Copy resume link"}
    >
      {copied ? "✅" : "🔗"}
    </button>
  );
}
