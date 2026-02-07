import { getBasics } from "@/lib/resume";
import { getLastUpdated } from "@/lib/lastUpdated";

export default async function Footer() {
  const basics = await getBasics();
  const lastUpdated = getLastUpdated();

  return (
    <footer className="mx-auto w-full max-w-5xl px-4 pb-8 sm:px-6 md:px-10">
      <div className="border-t border-[var(--border)] pt-6 sm:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted)]">
          <span>Last updated {lastUpdated}</span>
          <span>&copy; {new Date().getFullYear()} {basics.name}</span>
        </div>
      </div>
    </footer>
  );
}
