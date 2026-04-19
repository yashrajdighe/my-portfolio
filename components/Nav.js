"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SocialLinks from "@/components/nav/SocialLinks";

const links = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blogs/" },
];

/**
 * Always-present GitHub entries shown in the top-right nav across every page.
 * Merged with whatever `profiles` the page passes in — deduped by URL so the
 * upstream resume data won't render duplicates.
 */
const DEFAULT_NAV_PROFILES = [
  {
    network: "GitHub",
    label: "Personal",
    url: "https://github.com/yashrajdighe",
  },
  {
    network: "GitHub",
    label: "DevOps Hub",
    url: "https://github.com/yd-devops-hub",
  },
  {
    network: "Medium",
    url: "https://medium.com/@yashraj45dighe",
  },
];

function normalizeUrl(u) {
  if (!u) return "";
  return u.replace(/\/+$/, "").toLowerCase();
}

/** Single-icon networks: first entry wins (defaults before API) so canonical URLs override duplicates. */
function exclusiveSocialSlot(network) {
  const n = (network || "").toLowerCase();
  if (n.includes("github")) return null;
  if (n.includes("medium")) return "medium";
  if (n.includes("linkedin")) return "linkedin";
  if (n.includes("twitter") || n === "x") return "twitter";
  if (n.includes("dev.to") || n === "dev") return "devto";
  if (n.includes("stack")) return "stackoverflow";
  return null;
}

function mergeProfiles(primary = [], secondary = []) {
  const seenUrl = new Set();
  const seenSlot = new Set();
  const out = [];
  for (const p of [...primary, ...secondary]) {
    if (!p || !p.url) continue;
    const slot = exclusiveSocialSlot(p.network);
    if (slot) {
      if (seenSlot.has(slot)) continue;
      seenSlot.add(slot);
      out.push(p);
      continue;
    }
    const key = normalizeUrl(p.url);
    if (seenUrl.has(key)) continue;
    seenUrl.add(key);
    out.push(p);
  }
  return out;
}

export default function Nav({ name = "Yashraj Dighe", profiles = [], email }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/blogs/" && pathname.startsWith("/blog")) return true;
    if (href === "/" && pathname === "/") return true;
    return false;
  };

  const mergedProfiles = mergeProfiles(DEFAULT_NAV_PROFILES, profiles);
  const hasSocials = mergedProfiles.length > 0 || Boolean(email);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 md:px-8">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-[var(--fg)] transition-colors hover:text-[var(--accent)] sm:text-base"
        >
          {name}
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-[var(--fg)]"
                    : "text-[var(--muted)] hover:text-[var(--fg)]",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-3 right-3 h-[2px] origin-center rounded-sm bg-[var(--accent)] transition-transform duration-200",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  aria-hidden
                />
              </Link>
            ))}
          </div>

          {hasSocials ? (
            <>
              <span
                className="h-4 w-px bg-[var(--border)]"
                aria-hidden
              />
              <SocialLinks profiles={mergedProfiles} email={email} />
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {hasSocials ? (
            <SocialLinks profiles={mergedProfiles} email={email} />
          ) : null}
          <button
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--fg)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6h16.5" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen ? (
          <div className="absolute top-full right-0 left-0 border-b border-[var(--border)] bg-[var(--bg)]/98 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-0.5 px-4 py-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-white/[0.06] text-[var(--fg)]"
                      : "text-[var(--muted)] hover:bg-white/[0.04] hover:text-[var(--fg)]",
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
