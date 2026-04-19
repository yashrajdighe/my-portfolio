import { cn } from "@/lib/utils";

/**
 * Subtle bordered surface — editorial card, single accent on hover via .tile-hover.
 */
export default function Tile({ label, children, className, id }) {
  return (
    <article
      id={id}
      className={cn(
        "surface-card tile-hover relative overflow-hidden rounded-xl p-5 sm:p-6",
        className,
      )}
    >
      {label ? (
        <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
          {label}
        </p>
      ) : null}
      {children}
    </article>
  );
}
