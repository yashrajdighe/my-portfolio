import { getBasics } from "@/lib/resume";
import { getLastUpdated } from "@/lib/lastUpdated";

export default async function Footer() {
  const basics = await getBasics();
  const lastUpdated = getLastUpdated();

  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 md:px-8">
      <div className="border-t border-[var(--border)] pt-6 sm:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[var(--muted)] sm:text-xs">
          <span>
            status: <span className="text-[var(--fg)]">online</span>
            <span className="text-[var(--border-strong)]"> · </span>
            built {lastUpdated}
          </span>
          <span>&copy; {new Date().getFullYear()} {basics.name}</span>
        </div>
      </div>
    </footer>
  );
}
