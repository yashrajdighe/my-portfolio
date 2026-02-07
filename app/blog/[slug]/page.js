import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";
import ScrollToTop from "@/components/ScrollToTop";
import Nav from "@/components/Nav";

export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
};

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

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
                  <Link href="/blogs/" className="text-[var(--link)] hover:underline">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true" className="text-[var(--border)]">/</li>
                <li>
                  <span className="text-[var(--foreground)] font-medium">{post.title}</span>
                </li>
              </ol>
            </nav>

            {/* Article header — AWS Docs style */}
            <div className="mb-8 border-b border-[var(--border)] pb-6">
              <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl md:text-3xl lg:text-4xl">
                {post.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
                <time>{post.date}</time>
                {post.tags.length > 0 && (
                  <>
                    <span className="h-0.5 w-0.5 rounded-full bg-[var(--border)]" />
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Cover image */}
            {post.coverImage ? (
              <div className="mb-8 overflow-hidden rounded-lg border border-[var(--border)]">
                <img
                  src={post.coverImage}
                  alt={`${post.title} cover`}
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="630"
                  className="h-40 w-full object-contain sm:h-56 md:h-72"
                />
              </div>
            ) : null}

            {/* Article content — AWS Docs typography via .blog-content */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
              <div
                className="blog-content text-[15px] leading-relaxed sm:text-base"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags footer */}
            {post.tags.length ? (
              <div className="mt-8 border-t border-[var(--border)] pt-5 sm:mt-10 sm:pt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Navigation footer */}
            <div className="mt-6 border-t border-[var(--border)] pt-5 sm:mt-8 sm:pt-6">
              <Button href="/blogs/" variant="ghost" size="sm">
                &larr; Back to all posts
              </Button>
            </div>
          </MotionWrap>
        </Section>
      </main>
      <ScrollToTop />
    </div>
  );
}
