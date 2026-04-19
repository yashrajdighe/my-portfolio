import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

const variants = {
  primary:
    "bg-[var(--accent)] font-semibold text-white shadow-sm hover:bg-[var(--accent-hover)] active:brightness-95",
  ghost:
    "relative pb-0.5 text-[var(--fg)] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--accent)] after:transition-transform hover:after:scale-x-100 hover:text-[var(--fg)]",
  secondary:
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] backdrop-blur-sm hover:border-[var(--border-strong)] hover:bg-white/[0.04]",
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
    if (download !== undefined) {
      return (
        <a className={classes} href={href} download={download} {...props}>
          {children}
        </a>
      );
    }

    if (isInternalPath(href)) {
      return (
        <Link className={classes} href={href} {...props}>
          {children}
        </Link>
      );
    }

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
