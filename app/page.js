import Link from "next/link";
import { getResume } from "@/lib/resume";
import { getBlogPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import LiveResume from "@/components/LiveResume";
import MotionWrap from "@/components/MotionWrap";
import ResumeDownload from "@/components/ResumeDownload";
import { getLastUpdated } from "@/lib/lastUpdated";
import ScrollToTop from "@/components/ScrollToTop";
import ProjectStarSection from "@/components/ProjectStarSection";
import Nav from "@/components/Nav";

export default async function Home() {
  const resume = await getResume();
  const {
    basics,
    summary,
    impactStats,
    work,
    projects,
    stack,
    certifications,
    contact,
  } = resume;
  const linkedIn = basics.profiles.find((profile) => profile.network === "LinkedIn");
  const lastUpdated = getLastUpdated();
  const starredBlogs = (await getBlogPosts({ includeDetails: true })).filter(
    (post) => post.starred,
  );

  return (
    <div className="min-h-screen">
      <Nav name={basics.name} />

      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-20 pt-20 sm:px-6 md:px-10 md:pb-24 md:pt-24">
        {/* Hero */}
        <header className="flex flex-col gap-4 pt-8 sm:gap-6 md:pt-20">
          <MotionWrap>
            <p className="text-sm text-[var(--muted)]">{basics.label}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-6xl">
              {basics.headline}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:mt-4 sm:text-lg md:text-xl">
              {basics.subheadline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <ResumeDownload label={resume.resumeDownload.label} />
              <Button href="#contact" variant="ghost">
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
              <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:grid-cols-1 lg:gap-6">
                {impactStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
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

        {/* Experience */}
        <Section id="experience">
          <MotionWrap>
            <SectionHeading
              eyebrow="Experience"
              title="Where I've Worked"
              description="Impact-driven summaries with technical depth behind each outcome."
            />
            <LiveResume work={work} resumeDownload={resume.resumeDownload} />
          </MotionWrap>
        </Section>

        {/* Projects */}
        <Section id="projects">
          <ProjectStarSection projects={projects} />
        </Section>

        {/* Tech Stack */}
        <Section>
          <MotionWrap>
            <SectionHeading
              eyebrow="Stack"
              title="Tools & Technologies"
              description="Curated toolbelt aligned to platform reliability."
            />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Object.entries(stack).map(([category, tools]) => (
                <Card key={category}>
                  <p className="mb-3 text-xs font-medium text-[var(--accent)]">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tools.map((tool) => (
                      <Badge key={tool}>{tool}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </MotionWrap>
        </Section>

        {/* Certifications */}
        <Section>
          <MotionWrap>
            <SectionHeading
              eyebrow="Certifications"
              title="Verified Credentials"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <Card key={cert.name}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Shield icon */}
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                        <svg
                          viewBox="0 0 20 20"
                          className="h-4 w-4 text-[var(--accent)]"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.75Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-[var(--foreground)]">
                          {cert.name}
                        </h3>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {cert.badge}
                    </Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)]">
                    <span>Issued {cert.date}</span>
                    {cert.expiry ? (
                      <>
                        <span className="h-0.5 w-0.5 rounded-full bg-zinc-600" />
                        <span>Expires {cert.expiry}</span>
                      </>
                    ) : null}
                  </div>
                  <a
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent)]/80"
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verify credential
                  </a>
                </Card>
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
              <div className="space-y-1">
                {starredBlogs.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="group block"
                  >
                    <div className="flex items-start justify-between gap-4 rounded-xl px-1 py-3 transition-colors hover:bg-[var(--surface)]">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)]">
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

        {/* Contact */}
        <Section id="contact">
          <MotionWrap>
            <div className="mx-auto max-w-xl text-center">
              <SectionHeading
                eyebrow="Contact"
                title="Let's Work Together"
                description="Share your project goal, timeframe, and current stack. I'll respond within 24-48 hours."
                align="center"
              />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button href={`mailto:${basics.email}`}>
                  Email Me
                </Button>
                {linkedIn ? (
                  <Button href={linkedIn.url} variant="secondary">
                    LinkedIn
                  </Button>
                ) : null}
                <Button
                  href="https://calendar.app.google/FVusmLYUTdkxdEKQA"
                  variant="secondary"
                >
                  Schedule a Call
                </Button>
              </div>
              <p className="mt-6 text-xs text-[var(--muted)]">
                {contact.availability} &middot; {contact.timezone}
              </p>
            </div>
          </MotionWrap>
        </Section>

        {/* Footer */}
        <footer className="border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:pt-8">
          Last updated {lastUpdated}
        </footer>
      </main>
      <ScrollToTop />
    </div>
  );
}
