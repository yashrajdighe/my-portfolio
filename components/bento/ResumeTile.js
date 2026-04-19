import Tile from "@/components/bento/Tile";
import ResumeDownload from "@/components/ResumeDownload";
import { getLastUpdated } from "@/lib/lastUpdated";

export default function ResumeTile({ resumeDownload }) {
  const href = resumeDownload?.href ?? "/resume.pdf";
  const label = resumeDownload?.label ?? "Download resume";
  const downloadName =
    resumeDownload?.fileName ?? resumeDownload?.downloadName ?? "Yashraj_Dighe_Resume.pdf";
  const lastUpdated = getLastUpdated();

  return (
    <Tile label="resume" id="resume">
      <p className="text-sm text-[var(--muted)]">PDF · updated {lastUpdated}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <ResumeDownload label={label} href={href} downloadName={downloadName} size="sm" />
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[var(--link)] transition-colors hover:text-[var(--link-hover)] hover:underline"
        >
          View online
        </a>
      </div>
    </Tile>
  );
}
