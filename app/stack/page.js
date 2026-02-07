import Link from "next/link";
import { getResume } from "@/lib/resume";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";
import ScrollToTop from "@/components/ScrollToTop";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Tech Stack | Portfolio",
  description: "Curated toolbelt aligned to platform reliability.",
};

export default async function StackPage() {
  const resume = await getResume();
  const { basics, stack } = resume;

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
                  <span className="font-medium text-[var(--foreground)]">Stack</span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-8 border-b border-[var(--border)] pb-6">
              <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
                Tools &amp; Technologies
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Curated toolbelt aligned to platform reliability.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Object.entries(stack).map(([category, tools]) => (
                <Card key={category}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
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
      </main>
      <ScrollToTop />
    </div>
  );
}
