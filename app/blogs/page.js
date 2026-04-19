import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import NavBar from "@/components/NavBar";
import ScrollToTop from "@/components/ScrollToTop";
import Tile from "@/components/bento/Tile";
import { JsonLd, blogListSchema, breadcrumbSchema } from "@/lib/jsonLd";

export const metadata = {
  title: "Blog",
  description:
    "Technical blog by Yashraj Dighe — deep dives into cloud engineering, Kubernetes, AWS, CI/CD, platform engineering, and operational lessons.",
  alternates: { canonical: "/blogs/" },
  openGraph: { url: "/blogs/" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex-1">
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Blog", href: "/blogs/" }])} />
      <JsonLd data={blogListSchema(posts)} />
      <NavBar />

      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-20 pt-16 sm:px-6 md:px-8 md:pb-24 md:pt-20">
        <Section className="pt-4 sm:pt-8">
          <p className="mb-4 font-mono text-xs text-[var(--muted)]">
            <span className="text-[var(--fg)]">cd</span> ~/blogs
          </p>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl md:text-5xl">
              Writing
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
              Deep dives and operational lessons in short, skimmable entries.
            </p>
          </div>

          <Tile>
            <div className="hidden border-b border-[var(--border)] pb-3 sm:flex">
              <span className="flex-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                Title
              </span>
              <span className="w-28 shrink-0 text-right font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                Date
              </span>
            </div>

            {posts.length ? (
              <div className="divide-y divide-[var(--border)]">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}/`} className="group block">
                    <div className="flex flex-col gap-1 px-0 py-4 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-start sm:gap-4 sm:py-4">
                      <div className="min-w-0 sm:flex-1">
                        <h3 className="text-sm font-medium text-[var(--link)] group-hover:underline">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                          {post.excerpt}
                        </p>
                      </div>
                      <time className="shrink-0 font-mono text-xs text-[var(--muted)] sm:w-28 sm:pt-0.5 sm:text-right">
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
          </Tile>

          <div className="mt-8">
            <Button href="/" variant="ghost" size="sm">
              &larr; Back to Portfolio
            </Button>
          </div>
        </Section>
      </main>
      <ScrollToTop />
    </div>
  );
}
