import Link from "next/link";
import { getResume } from "@/lib/resume";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";
import ScrollToTop from "@/components/ScrollToTop";
import Nav from "@/components/Nav";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonLd";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Yashraj Dighe — email, LinkedIn, or schedule a call for cloud engineering, platform engineering, and DevOps consulting.",
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/" },
};

export default async function ContactPage() {
  const resume = await getResume();
  const { basics, contact } = resume;
  const linkedIn = basics.profiles.find((profile) => profile.network === "LinkedIn");

  return (
    <div className="flex-1">
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }])} />
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
                  <span className="font-medium text-[var(--foreground)]">Contact</span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-8 border-b border-[var(--border)] pb-6">
              <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
                Let&apos;s Work Together
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Share your project goal, timeframe, and current stack. I&apos;ll respond within 24-48 hours.
              </p>
            </div>

            {/* Contact card */}
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
              <div className="mx-auto max-w-lg text-center">
                <p className="mb-6 text-sm text-[var(--muted)]">
                  {contact.availability} &middot; {contact.timezone}
                </p>

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

                <p className="mt-8 text-xs text-[var(--muted)]">
                  Or email directly at{" "}
                  <a href={`mailto:${basics.email}`} className="text-[var(--link)] hover:underline">
                    {basics.email}
                  </a>
                </p>
              </div>
            </div>
          </MotionWrap>
        </Section>
      </main>
      <ScrollToTop />
    </div>
  );
}
