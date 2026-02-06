import { cn } from "@/lib/utils";

export function Section({ children, className, ...props }) {
  return (
    <section className={cn("py-14 md:py-24", className)} {...props}>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }) {
  const alignment = align === "center" ? "text-center items-center" : "items-start";
  return (
    <div className={cn("mb-8 flex flex-col gap-2 sm:mb-12 sm:gap-3", alignment, className)}>
      {eyebrow ? (
        <span className="text-xs font-medium text-[var(--accent)]">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{description}</p>
      ) : null}
    </div>
  );
}
