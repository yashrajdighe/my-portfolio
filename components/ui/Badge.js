import { cn } from "@/lib/utils";

const variants = {
  default: "bg-zinc-800/60 text-zinc-300 border border-zinc-700/50",
  outline: "text-zinc-300 border border-zinc-700",
};

export function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
