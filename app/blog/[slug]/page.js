import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";
import ScrollToTop from "@/components/ScrollToTop";

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
    <div className="min-h-screen blog-shell">
      <main className="mx-auto flex w-full max-w-4xl flex-col px-6 pb-24 pt-16 md:px-10">
        <Section className="pt-0">
          <MotionWrap>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-8">
              <time className="self-start md:self-auto">
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
              <Button href="/blogs/" variant="secondary" size="sm" className="self-start">
                Back to Blog
              </Button>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl md:text-4xl">
                {post.title}
              </h1>
            </div>
            {post.coverImage ? (
              <div className="mt-8">
                <img
                  src={post.coverImage}
                  alt={`${post.title} cover`}
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="630"
                  className="h-52 w-full object-contain sm:h-64 md:h-72"
                />
              </div>
            ) : null}
            <div
              className="blog-content mt-8 text-base leading-relaxed text-slate-200"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {post.tags.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </MotionWrap>
        </Section>
      </main>
      <ScrollToTop />
    </div>
  );
}
