import { getResume } from "@/lib/resume";
import { getBlogPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import LiveResume from "@/components/LiveResume";
import MotionWrap from "@/components/MotionWrap";
import ResumeDownload from "@/components/ResumeDownload";
import CopyResumeLink from "@/components/CopyResumeLink";
import { getLastUpdated } from "@/lib/lastUpdated";
import ScrollToTop from "@/components/ScrollToTop";
import ProjectStarSection from "@/components/ProjectStarSection";

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
  const githubAccounts = basics.githubAccounts ?? [];
  const lastUpdated = getLastUpdated();
  const starredBlogs = (await getBlogPosts({ includeDetails: true })).filter(
    (post) => post.starred,
  );

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 pt-16 md:px-10">
        <header className="flex flex-col gap-10 md:gap-14">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-emerald-300/70">
            <span>{basics.label}</span>
            <span className="h-1 w-1 rounded-full bg-emerald-300/60" />
            <span>{basics.location.region}</span>
          </div>
          <MotionWrap className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl font-semibold text-slate-50 md:text-5xl">
                {basics.headline}
              </h1>
              <p className="text-lg text-slate-300 md:text-xl">
                {basics.subheadline}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="#resume">View Live Resume</Button>
                <ResumeDownload label={resume.resumeDownload.label} />
                <CopyResumeLink />
                <Button href="/blogs" variant="secondary">
                  Read Blogs
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted">
                <span>{basics.email}</span>
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                <span>{basics.phone}</span>
              </div>
              {githubAccounts.length ? (
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="uppercase tracking-[0.2em] text-slate-500">GitHub</span>
                  {githubAccounts.map((account, index) => (
                    <span key={account.username} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-slate-600" />
                      <a
                        href={`${account.url}`}
                        className="hover:text-emerald-100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {account.username}
                      </a>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <Card className="relative overflow-hidden">
              <div className="mb-3 inline-flex w-fit rounded-full border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 md:absolute md:right-4 md:top-4 md:mb-0">
                Architectural Clarity
              </div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-emerald-300/70">
                Platform Summary
              </h3>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {summary.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </Card>
          </MotionWrap>
          <MotionWrap className="grid gap-4 md:grid-cols-3">
            {impactStats.map((stat) => (
              <Card key={stat.label} className="glow-ring">
                <p className="text-2xl font-semibold text-emerald-200 md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                  {stat.label}
                </p>
              </Card>
            ))}
          </MotionWrap>
        </header>

        <Section id="resume">
          <MotionWrap>
            <SectionHeading
              eyebrow="Live Resume"
              title="Experience Snapshot & Delivery"
              description="Impact-driven role summaries with the technical depth behind each outcome."
            />
            <LiveResume work={work} resume={resume} />
          </MotionWrap>
        </Section>

        <Section>
          <MotionWrap>
            <SectionHeading
              eyebrow="Verification"
              title="Cloud Certifications"
              description="Verified credentials with renewal tracking."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {certifications.map((cert) => (
                <Card key={cert.name}>
                  <div className="flex flex-wrap items-start gap-2">
                    <h3 className="min-w-0 flex-1 text-lg font-semibold text-slate-100">
                      {cert.name}
                    </h3>
                    <Badge variant="accent" className="ml-auto w-fit shrink-0">
                      {cert.badge}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted">{cert.issuer}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                    <span>Issued: {cert.date}</span>
                    <span>Expires: {cert.expiry}</span>
                  </div>
                  <a
                    className="mt-4 inline-flex text-sm text-emerald-200 hover:text-emerald-100"
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Verify credential
                  </a>
                </Card>
              ))}
            </div>
          </MotionWrap>
        </Section>

        <Section>
          <ProjectStarSection projects={projects} />
        </Section>

        <Section>
          <MotionWrap>
            <SectionHeading
              eyebrow="Categorized Stack"
              title="Provisioning, Orchestration, Observability"
              description="A curated toolbelt aligned to platform reliability."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(stack).map(([category, tools]) => (
                <Card key={category}>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
                    {category}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <Badge key={tool}>{tool}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </MotionWrap>
        </Section>

        <Section>
          <MotionWrap>
            <SectionHeading
              eyebrow="Engineering Lab"
              title="Technical Deep Dives"
              description="Minimalist notes on performance, platform patterns, and golden paths."
            />
            <div className="grid gap-3">
              {starredBlogs.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="group"
                >
                  <Card className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-100 group-hover:text-emerald-100">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{post.excerpt}</p>
                    </div>
                    <span className="hidden sm:inline-flex">
                      <Badge variant="subtle" className="whitespace-nowrap">
                        {post.date}
                      </Badge>
                    </span>
                  </Card>
                </a>
              ))}
            </div>
          </MotionWrap>
        </Section>

        <Section id="contact">
          <MotionWrap>
            <SectionHeading
              eyebrow="Get In Touch"
              title="Let’s Build Something Reliable"
              description="Fastest way to reach me is email or LinkedIn. Share a short brief and I’ll respond within 24–48 hours."
            />
            <Card className="grid gap-4 md:grid-cols-2">
              <div className="flex h-full flex-col">
                <p className="text-sm text-slate-300">
                  Prefer a simple path? Use the buttons below or reply with the
                  essentials: project goal, timeframe, and current stack.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href={`mailto:${basics.email}`} variant="primary">
                    Email {basics.email}
                  </Button>
                  {linkedIn ? (
                    <Button href={linkedIn.url} variant="secondary">
                      Message on LinkedIn
                    </Button>
                  ) : null}
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted">
                  <span>{contact.availability}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-600" />
                  <span>{contact.timezone}</span>
                </div>
              </div>
              <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-300">
                <p className="text-emerald-200">Book a quick call</p>
                <p className="mt-2 text-xs text-muted">
                  Use Google Calendar to grab a slot for an intro and technical
                  alignment.
                </p>
                <div className="mt-4 space-y-2 text-xs text-slate-400">
                  <p>15–30 min focused sync</p>
                  <p>Walk through scope, goals, and constraints</p>
                  <p>Timezone: {contact.timezone}</p>
                </div>
                <div className="mt-5">
                  <Button
                    href="https://calendar.app.google/FVusmLYUTdkxdEKQA"
                    variant="primary"
                  >
                    Schedule via Google Calendar
                  </Button>
                </div>
              </div>
            </Card>
          </MotionWrap>
        </Section>

        <footer className="mt-4 text-xs text-muted">
          Last updated {lastUpdated}
        </footer>
      </main>
      <ScrollToTop />
    </div>
  );
}
