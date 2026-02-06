import { cn } from "@/lib/utils";

export function Toggle({ leftLabel, rightLabel, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)]/40"
      aria-pressed={checked}
    >
      <span className={cn(!checked && "text-[var(--foreground)]")}>{leftLabel}</span>
      <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-zinc-800">
        <span
          className={cn(
            "h-3.5 w-3.5 transform rounded-full transition-transform duration-200",
            checked
              ? "translate-x-[18px] bg-[var(--accent)]"
              : "translate-x-1 bg-zinc-500"
          )}
        />
      </span>
      <span className={cn(checked && "text-[var(--foreground)]")}>{rightLabel}</span>
    </button>
  );
}
