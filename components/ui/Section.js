import { cn } from "@/lib/utils";

export function Section({ children, className, ...props }) {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "text-center items-center" : "items-start";
  return (
    <div className={cn("mb-10 flex flex-col gap-3", alignment)}>
      {eyebrow ? (
        <span className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm text-muted md:text-base">{description}</p>
      ) : null}
    </div>
  );
}
