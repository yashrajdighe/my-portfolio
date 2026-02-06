import { cn } from "@/lib/utils";

export function Toggle({ leftLabel, rightLabel, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-4 rounded-full border border-slate-800 bg-slate-950/60 px-4 py-2 text-xs text-slate-200 transition hover:border-emerald-400/60"
      aria-pressed={checked}
    >
      <span className={cn(!checked && "text-emerald-200")}>{leftLabel}</span>
      <span className="relative inline-flex h-5 w-10 items-center rounded-full bg-slate-800">
        <span
          className={cn(
            "h-4 w-4 transform rounded-full bg-emerald-300 transition",
            checked ? "translate-x-5" : "translate-x-1"
          )}
        />
      </span>
      <span className={cn(checked && "text-emerald-200")}>{rightLabel}</span>
    </button>
  );
}
