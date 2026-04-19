import { getResume } from "@/lib/resume";
import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/NavBar";
import Hero from "@/components/hero/Hero";
import BentoGrid from "@/components/bento/BentoGrid";
import AboutTile from "@/components/bento/AboutTile";
import StackTile from "@/components/bento/StackTile";
import ResumeTile from "@/components/bento/ResumeTile";
import ContactTile from "@/components/bento/ContactTile";
import SignalTile from "@/components/bento/SignalTile";

export default async function Home() {
  const resume = await getResume();
  const { basics, summary, stack, resumeDownload, contact } = resume;

  return (
    <div className="flex-1">
      <NavBar />

      <main className="relative mx-auto max-w-6xl px-4 md:px-8">
        <Hero basics={basics} contact={contact} resumeDownload={resumeDownload} />

        <section className="mt-10 md:mt-16">
          <BentoGrid>
            <AboutTile basics={basics} summary={summary} stack={stack} />
            <StackTile stack={stack} />
            <ResumeTile resumeDownload={resumeDownload} />
            <ContactTile basics={basics} contact={contact} />
            <SignalTile contact={contact} />
          </BentoGrid>
        </section>
      </main>

      <ScrollToTop />
    </div>
  );
}
