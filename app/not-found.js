import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Nav from "@/components/Nav";

export const metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex-1">
      <Nav />

      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-20 pt-16 sm:px-6 md:px-10 md:pb-24 md:pt-20">
        <div className="flex flex-col items-center justify-center pt-16 text-center md:pt-28">
          {/* Error badge */}
          <span className="mb-4 inline-flex items-center rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--accent)] shadow-sm">
            404
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            Page Not Found
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)] md:text-base">
            The requested resource could not be located. It may have been moved, deleted, or the URL may be incorrect.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/">
              Back to Console
            </Button>
            <Button href="/blogs/" variant="secondary">
              View Blog
            </Button>
            <Button href="/contact/" variant="secondary">
              Contact
            </Button>
          </div>

          {/* Quick links panel */}
          <div className="mt-12 w-full max-w-lg rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            <div className="border-b border-[var(--border)] bg-[#F2F3F3] px-5 py-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Quick Links
              </span>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {[
                { label: "Home", href: "/", desc: "Return to the main console" },
                { label: "Experience", href: "/experience/", desc: "Work history and impact" },
                { label: "Projects", href: "/projects/", desc: "Architecture & delivery" },
                { label: "Blog", href: "/blogs/", desc: "Technical notes and deep dives" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between gap-4 px-5 py-3 transition-colors hover:bg-[#F2F3F3]"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-[var(--link)]">
                      {item.label}
                    </p>
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
          </div>
        </div>
      </main>
    </div>
  );
}
