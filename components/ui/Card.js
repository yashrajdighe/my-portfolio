import { cn } from "@/lib/utils";

export function Card({ children, className }) {
  return (
    <div
      className={cn(
        "surface rounded-3xl p-6 transition duration-300 hover:border-emerald-400/40 hover:shadow-emerald-400/10",
        className
      )}
    >
      {children}
    </div>
  );
}
