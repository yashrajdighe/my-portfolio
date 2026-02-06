import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-20 pt-20 sm:px-6 md:px-10 md:pb-24 md:pt-24">
        <Section className="pt-4 sm:pt-8">
          <MotionWrap>
            <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
              <SectionHeading
                eyebrow="Blog"
                title="Technical Notes"
                description="Deep dives and operational lessons in short, skimmable entries."
                className="mb-0"
              />
              <Button href="/" variant="ghost" size="sm" className="shrink-0">
                &larr; Back to Portfolio
              </Button>
            </div>

            <div className="mt-8 divide-y divide-[var(--border)] sm:mt-12">
              {posts.length ? (
                posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}/`} className="group block">
                    <div className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:py-6">
                      <div className="min-w-0 sm:flex-1">
                        <h3 className="text-sm font-medium text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] sm:text-base">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                          {post.excerpt}
                        </p>
                      </div>
                      <time className="shrink-0 text-xs text-[var(--muted)] sm:ml-8 sm:pt-1">
                        {post.date}
                      </time>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="py-12 text-center text-sm text-[var(--muted)]">
                  No blog posts yet. Check back soon.
                </p>
              )}
            </div>
          </MotionWrap>
        </Section>
      </main>
      <ScrollToTop />
    </div>
  );
}
