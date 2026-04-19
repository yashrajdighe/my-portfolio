import { cn } from "@/lib/utils";

const variants = {
  default:
    "bg-white/[0.04] text-[var(--fg)] border border-[var(--border)] font-mono",
  outline: "text-[var(--fg)] border border-[var(--border)] bg-white/[0.02] font-mono",
};

export function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
