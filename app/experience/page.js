import Link from "next/link";
import { getResume } from "@/lib/resume";
import { Section } from "@/components/ui/Section";
import LiveResume from "@/components/LiveResume";
import MotionWrap from "@/components/MotionWrap";
import ScrollToTop from "@/components/ScrollToTop";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Experience | Portfolio",
  description: "Work history, impact-driven summaries with technical depth.",
};

export default async function ExperiencePage() {
  const resume = await getResume();
  const { basics, work } = resume;

  return (
    <div className="flex-1">
      <Nav name={basics.name} />

      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-20 pt-16 sm:px-6 md:px-10 md:pb-24 md:pt-20">
        <Section className="pt-4 sm:pt-8">
          <MotionWrap>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[var(--muted)]">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link href="/" className="text-[var(--link)] hover:underline">Home</Link>
                </li>
                <li aria-hidden="true" className="text-[var(--border)]">/</li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Experience</span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-8 border-b border-[var(--border)] pb-6">
              <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
                Where I&apos;ve Worked
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Impact-driven summaries with technical depth behind each outcome.
              </p>
            </div>

            <LiveResume work={work} resumeDownload={resume.resumeDownload} />
          </MotionWrap>
        </Section>
      </main>
      <ScrollToTop />
    </div>
  );
}
