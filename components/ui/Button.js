import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

const variants = {
  primary:
    "bg-[var(--accent)] text-[#16191F] font-semibold hover:bg-[var(--accent-hover)] shadow-sm",
  ghost:
    "text-[var(--link)] hover:text-[#005ea2] hover:underline",
  secondary:
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--link)] hover:text-[var(--link)] shadow-sm",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

function isInternalPath(href) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  download,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    // Download links always use a plain <a> (not Next.js <Link>).
    if (download !== undefined) {
      return (
        <a
          className={classes}
          href={href}
          download={download}
          {...props}
        >
          {children}
        </a>
      );
    }

    // Internal path links → next/link for client-side navigation
    if (isInternalPath(href)) {
      return (
        <Link className={classes} href={href} {...props}>
          {children}
        </Link>
      );
    }

    // External, mailto, hash-only, etc. → regular <a>
    const isExternal = /^https?:\/\//i.test(href);
    return (
      <a
        className={classes}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
