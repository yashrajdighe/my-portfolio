"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blogs/" },
  { label: "Contact", href: "#contact" },
];

export default function Nav({ name = "Yashraj Dighe" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isBlogPage = pathname.startsWith("/blog");

  // On blog pages, hash links should point back to homepage sections
  const resolvedLinks = links.map((link) => {
    if (isBlogPage && link.href.startsWith("#")) {
      return { ...link, href: `/${link.href}` };
    }
    return link;
  });

  const isActive = (href) => {
    if (href === "/blogs/" && isBlogPage) return true;
    return false;
  };

  // Use Link for paths, <a> for hash-only anchors
  const NavLink = ({ href, className: cls, children, onClick }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={cls} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-10">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
        >
          {name}
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {resolvedLinks.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-[var(--foreground)]",
                isActive(link.href)
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted)]"
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:text-[var(--foreground)] md:hidden"
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
          <div className="absolute top-full right-0 left-0 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-1 px-6 py-4">
              {resolvedLinks.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]",
                    isActive(link.href)
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted)]"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
