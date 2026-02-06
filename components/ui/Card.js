import { cn } from "@/lib/utils";

export function Card({ children, className }) {
  return (
    <div
      className={cn(
        "surface rounded-2xl p-4 transition-colors duration-200 hover:border-[var(--accent)]/30 sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
