import Link from "next/link";
import { Button } from "@/components/ui/Button";
import NavBar from "@/components/NavBar";
import Tile from "@/components/bento/Tile";

export const metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex-1">
      <NavBar />

      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-20 pt-16 sm:px-6 md:px-8 md:pb-24 md:pt-20">
        <div className="flex flex-col items-center justify-center pt-16 text-center md:pt-28">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Error
          </p>
          <h1 className="mt-2 text-5xl font-semibold tracking-tight text-[var(--fg)] sm:text-6xl md:text-7xl">
            404
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--muted)] md:text-base">
            This page doesn&apos;t exist or may have moved. Try home or the blog index.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/">Back home</Button>
            <Button href="/blogs/" variant="secondary">
              Blogs
            </Button>
          </div>

          <Tile className="mt-12 w-full max-w-lg">
            <div className="border-b border-[var(--border)] pb-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                Quick links
              </span>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {[
                { label: "Home", href: "/", desc: "Profile & work" },
                { label: "Blogs", href: "/blogs/", desc: "Technical notes" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between gap-4 py-3 transition-colors first:pt-0 last:pb-0 hover:text-[var(--accent)]"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-[var(--link)]">{item.label}</p>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">{item.desc}</p>
                  </div>
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 shrink-0 text-[var(--muted)]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </Tile>
        </div>
      </main>
    </div>
  );
}
