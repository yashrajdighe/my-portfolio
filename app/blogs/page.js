import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex-1">
      <Nav />

      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-20 pt-16 sm:px-6 md:px-10 md:pb-24 md:pt-20">
        <Section className="pt-4 sm:pt-8">
          <MotionWrap>
            {/* Breadcrumb — AWS Docs style */}
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[var(--muted)]">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link href="/" className="text-[var(--link)] hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-[var(--border)]">/</li>
                <li>
                  <span className="text-[var(--foreground)] font-medium">Blogs</span>
                </li>
              </ol>
            </nav>

            {/* Page header — AWS Docs style */}
            <div className="mb-8 border-b border-[var(--border)] pb-6">
              <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
                Technical Notes
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Deep dives and operational lessons in short, skimmable entries.
              </p>
            </div>

            {/* Post listing — AWS Docs style */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-sm">
              {/* Table header */}
              <div className="hidden border-b border-[var(--border)] bg-[#F2F3F3] px-5 py-2.5 sm:flex">
                <span className="flex-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  Title
                </span>
                <span className="w-28 shrink-0 text-right text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  Date
                </span>
              </div>

              {posts.length ? (
                <div className="divide-y divide-[var(--border)]">
                  {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}/`} className="group block">
                      <div className="flex flex-col gap-1 px-4 py-4 transition-colors hover:bg-[#F2F3F3] sm:flex-row sm:items-start sm:gap-4 sm:px-5">
                        <div className="min-w-0 sm:flex-1">
                          <h3 className="text-sm font-medium text-[var(--link)] group-hover:underline">
                            {post.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                            {post.excerpt}
                          </p>
                        </div>
                        <time className="shrink-0 text-xs text-[var(--muted)] sm:w-28 sm:pt-0.5 sm:text-right">
                          {post.date}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="py-12 text-center text-sm text-[var(--muted)]">
                  No blog posts yet. Check back soon.
                </p>
              )}
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Button href="/" variant="ghost" size="sm">
                &larr; Back to Portfolio
              </Button>
            </div>
          </MotionWrap>
        </Section>
      </main>
      <ScrollToTop />
    </div>
  );
}
