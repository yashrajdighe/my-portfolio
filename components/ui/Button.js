import { cn } from "@/lib/utils";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60";

const variants = {
  primary:
    "bg-emerald-400/15 text-emerald-100 border border-emerald-400/40 hover:bg-emerald-400/25",
  secondary:
    "bg-slate-900/50 text-slate-200 border border-slate-700 hover:border-emerald-400/60",
  ghost: "text-slate-200 hover:text-emerald-100",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (href) {
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
