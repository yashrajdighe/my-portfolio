import Link from "next/link";
import { getResume } from "@/lib/resume";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";
import ScrollToTop from "@/components/ScrollToTop";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Certifications | Portfolio",
  description: "Verified credentials and professional certifications.",
};

export default async function CertificationsPage() {
  const resume = await getResume();
  const { basics, certifications } = resume;

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
                  <span className="font-medium text-[var(--foreground)]">Certifications</span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-8 border-b border-[var(--border)] pb-6">
              <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
                Verified Credentials
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Professional certifications and verified credentials.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <Card key={cert.name}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Shield icon */}
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[var(--accent)]/10">
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
                        <span className="h-0.5 w-0.5 rounded-full bg-[var(--border)]" />
                        <span>Expires {cert.expiry}</span>
                      </>
                    ) : null}
                  </div>
                  <a
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--link)] transition-colors hover:underline"
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
      </main>
      <ScrollToTop />
    </div>
  );
}
