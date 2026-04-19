import { cn } from "@/lib/utils";

export default function BentoGrid({ children, className }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5", className)}>
      {children}
    </div>
  );
}
