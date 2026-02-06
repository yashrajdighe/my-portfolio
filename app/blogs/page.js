import { getBlogPosts } from "@/lib/blog";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen blog-shell">
      <main className="mx-auto flex w-full max-w-4xl flex-col px-6 pb-24 pt-16 md:px-10">
        <Section className="pt-0">
          <MotionWrap>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-8">
              <SectionHeading
                eyebrow="Blog"
                title="Platform Notes & Field Logs"
                description="Technical deep dives and operational lessons captured in short, skimmable entries."
              />
              <Button href="/" variant="secondary" size="sm" className="ml-auto self-start">
                Back to Portfolio
              </Button>
            </div>
            <div className="grid gap-4">
              {posts.length ? (
                posts.map((post) => (
                  <a key={post.slug} href={`/blog/${post.slug}/`} className="group">
                    <Card className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="md:min-w-0 md:flex-1">
                        <h3 className="text-base font-semibold text-slate-100 group-hover:text-emerald-100 sm:text-lg">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted sm:text-base">{post.excerpt}</p>
                      </div>
                      <time className="self-start whitespace-nowrap md:ml-6 md:self-auto md:shrink-0">
                        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5 text-slate-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 6V4m8 2V4M3.5 9.5h17m-15.5 0v8a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-8M6.5 12.5h3m-3 3h3m3-3h3m-3 3h3"
                            />
                          </svg>
                          {post.date}
                        </span>
                      </time>
                    </Card>
                  </a>
                ))
              ) : (
                <Card>
                  <p className="text-sm text-muted">No blog posts yet. Check back soon.</p>
                </Card>
              )}
            </div>
          </MotionWrap>
        </Section>
      </main>
    </div>
  );
}
