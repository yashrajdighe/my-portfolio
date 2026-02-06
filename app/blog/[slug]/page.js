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
    <div className="min-h-screen">
      <Nav />

      <main className="mx-auto flex w-full max-w-3xl flex-col px-4 pb-20 pt-20 sm:px-6 md:px-10 md:pb-24 md:pt-24">
        <Section className="pt-4 sm:pt-8">
          <MotionWrap>
            <div className="mb-6 flex items-center justify-between sm:mb-8">
              <time className="text-xs text-[var(--muted)]">
                {post.date}
              </time>
              <Button href="/blogs/" variant="ghost" size="sm">
                &larr; All Posts
              </Button>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl md:text-3xl lg:text-4xl">
              {post.title}
            </h1>

            {post.coverImage ? (
              <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)] sm:mt-8">
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

            <div
              className="blog-content mt-8 text-[15px] leading-relaxed text-[var(--muted)] sm:mt-10 sm:text-base"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length ? (
              <div className="mt-8 border-t border-[var(--border)] pt-5 sm:mt-10 sm:pt-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

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
