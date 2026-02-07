import { cn } from "@/lib/utils";

export function Card({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
