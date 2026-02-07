import { cn } from "@/lib/utils";

const variants = {
  default: "bg-[#F2F3F3] text-[var(--foreground)] border border-[var(--border)]",
  outline: "text-[var(--foreground)] border border-[var(--border)] bg-transparent",
};

export function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
