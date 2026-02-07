"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { label: "Experience", href: "/experience/" },
  { label: "Projects", href: "/projects/" },
  { label: "Stack", href: "/stack/" },
  { label: "Certifications", href: "/certifications/" },
  { label: "Blog", href: "/blogs/" },
  { label: "Contact", href: "/contact/" },
];

export default function Nav({ name = "Yashraj Dighe" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/blogs/" && pathname.startsWith("/blog")) return true;
    if (href !== "/" && pathname.startsWith(href.replace(/\/$/, ""))) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-[#37475A] bg-[var(--nav-bg)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 md:px-10">
        {/* AWS-style service name / branding */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--nav-text)] transition-colors hover:text-[var(--accent)]"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5 text-[var(--accent)]" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.75Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
          </svg>
          {name}
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "rounded px-3 py-1.5 text-sm transition-colors",
                isActive(link.href)
                  ? "bg-[#37475A] text-white"
                  : "text-[#D5DBDB] hover:bg-[#37475A] hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded text-[#D5DBDB] transition-colors hover:bg-[#37475A] hover:text-white md:hidden"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6h16.5"
              />
            )}
          </svg>
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full right-0 left-0 border-b border-[#37475A] bg-[var(--nav-bg)] md:hidden">
            <div className="flex flex-col gap-0.5 px-4 py-3">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "rounded px-3 py-2.5 text-sm transition-colors",
                    isActive(link.href)
                      ? "bg-[#37475A] text-white"
                      : "text-[#D5DBDB] hover:bg-[#37475A] hover:text-white"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
