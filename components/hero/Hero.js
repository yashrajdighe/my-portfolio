import ResumeDownload from "@/components/ResumeDownload";
import { Button } from "@/components/ui/Button";

export default function Hero({ basics, contact, resumeDownload }) {
  const href = resumeDownload?.href ?? "/resume.pdf";
  const label = resumeDownload?.label ?? "Download resume";
  const downloadName =
    resumeDownload?.fileName ?? resumeDownload?.downloadName ?? "Yashraj_Dighe_Resume.pdf";

  const avail = contact?.availability ?? "";
  const online =
    avail &&
    avail !== "—" &&
    !/^unavailable|offline|n\/a/i.test(avail.trim());

  return (
    <header className="pt-20 pb-2 md:pt-24">
      <h1
        className="max-w-[20ch] font-semibold leading-[1.08] tracking-tight text-[var(--fg)]"
        style={{ fontSize: "clamp(2.25rem, 7vw, 4.25rem)" }}
      >
        {basics.name}
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg md:truncate">
        {basics.headline}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)] md:text-[15px]">
        <span
          className="inline-flex items-center gap-2"
          title={contact?.availability ?? ""}
        >
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500/90"
            style={{ opacity: online ? 1 : 0.35 }}
            aria-hidden
          />
          <span className="text-[var(--fg)]">{basics.label}</span>
          <span className="text-[var(--border-strong)]">·</span>
          <span>{contact?.timezone ?? "—"}</span>
        </span>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <ResumeDownload label={label} href={href} downloadName={downloadName} size="md" />
        <Button href="#contact" variant="secondary" size="md">
          Contact
        </Button>
        <Button href="/blogs/" variant="ghost" size="md">
          Read blog
        </Button>
      </div>
    </header>
  );
}
