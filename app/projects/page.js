import Link from "next/link";
import { getResume } from "@/lib/resume";
import { Section } from "@/components/ui/Section";
import ProjectStarSection from "@/components/ProjectStarSection";
import MotionWrap from "@/components/MotionWrap";
import ScrollToTop from "@/components/ScrollToTop";
import Nav from "@/components/Nav";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonLd";

export const metadata = {
  title: "Projects",
  description:
    "Cloud infrastructure and platform engineering projects — architecture and delivery structured in S.T.A.R. format with Kubernetes, Terraform, and AWS.",
  alternates: { canonical: "/projects/" },
  openGraph: { url: "/projects/" },
};

export default async function ProjectsPage() {
  const resume = await getResume();
  const { basics, projects } = resume;

  return (
    <div className="flex-1">
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Projects", href: "/projects/" }])} />
      <Nav name={basics.name} />

      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-20 pt-16 sm:px-6 md:px-10 md:pb-24 md:pt-20">
        <Section className="pt-4 sm:pt-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[var(--muted)]">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="text-[var(--link)] hover:underline">Home</Link>
              </li>
              <li aria-hidden="true" className="text-[var(--border)]">/</li>
              <li>
                <span className="font-medium text-[var(--foreground)]">Projects</span>
              </li>
            </ol>
          </nav>

          <ProjectStarSection projects={projects} />
        </Section>
      </main>
      <ScrollToTop />
    </div>
  );
}
