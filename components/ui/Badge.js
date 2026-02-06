import { cn } from "@/lib/utils";

const variants = {
  subtle: "bg-slate-900/60 text-slate-200 border border-slate-800",
  accent: "bg-emerald-400/15 text-emerald-100 border border-emerald-400/30",
  outline: "text-slate-200 border border-slate-700",
};

export function Badge({ children, variant = "subtle", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
