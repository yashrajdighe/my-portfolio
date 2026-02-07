import Link from "next/link";
import { getResume } from "@/lib/resume";
import { getStarredBlogPosts } from "@/lib/blog";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";

import ScrollToTop from "@/components/ScrollToTop";
import Nav from "@/components/Nav";

export default async function Home() {
  const resume = await getResume();
  const { basics, summary, impactStats } = resume;
  const starredBlogs = await getStarredBlogPosts();

  return (
    <div className="flex-1">
      <Nav name={basics.name} />

      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-20 pt-16 sm:px-6 md:px-10 md:pb-24 md:pt-20">
        {/* Hero */}
        <header className="flex flex-col gap-4 pt-8 sm:gap-6 md:pt-16">
          <MotionWrap>
            <p className="text-sm font-medium text-[var(--muted)]">{basics.label}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-6xl">
              {basics.headline}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:mt-4 sm:text-lg md:text-xl">
              {basics.subheadline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <Button href="/experience/">View Experience</Button>
              <Button href="/contact/" variant="ghost">
                Get in Touch &rarr;
              </Button>
            </div>
          </MotionWrap>
        </header>

        {/* About & Stats */}
        <Section>
          <MotionWrap>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
              <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                {summary.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
              {/* Stats panel - AWS dashboard widget style */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:grid-cols-1 lg:gap-4">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-center shadow-sm lg:text-left">
                    <p className="text-xl font-bold text-[var(--accent)] sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] text-[var(--muted)] sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrap>
        </Section>

        {/* Quick-nav cards — AWS Console service dashboard style */}
        <Section>
          <MotionWrap>
            <SectionHeading
              eyebrow="Console"
              title="Quick Navigation"
            />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                { label: "Experience", href: "/experience/", desc: "Work history and impact" },
                { label: "Projects", href: "/projects/", desc: "Architecture & delivery in STAR format" },
                { label: "Tech Stack", href: "/stack/", desc: "Tools & technologies" },
                { label: "Certifications", href: "/certifications/", desc: "Verified credentials" },
                { label: "Blog", href: "/blogs/", desc: "Technical deep dives & notes" },
                { label: "Contact", href: "/contact/", desc: "Get in touch" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                >
                  <h3 className="text-sm font-semibold text-[var(--link)] group-hover:underline">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">{item.desc}</p>
                </Link>
              ))}
            </div>
          </MotionWrap>
        </Section>

        {/* Featured Blog Posts */}
        {starredBlogs.length > 0 && (
          <Section>
            <MotionWrap>
              <SectionHeading
                eyebrow="Featured"
                title="From the Blog"
                description="Recent technical deep dives and operational notes."
              />
              <div className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                {starredBlogs.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="group block"
                  >
                    <div className="flex items-start justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-[#F2F3F3] sm:px-5">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-[var(--link)] group-hover:underline">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--muted)]">{post.excerpt}</p>
                      </div>
                      <span className="hidden shrink-0 pt-0.5 text-xs text-[var(--muted)] sm:block">
                        {post.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Button href="/blogs/" variant="ghost" size="sm">
                  View all posts &rarr;
                </Button>
              </div>
            </MotionWrap>
          </Section>
        )}


      </main>
      <ScrollToTop />
    </div>
  );
}
