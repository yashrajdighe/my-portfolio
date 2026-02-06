import { cn } from "@/lib/utils";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

const variants = {
  primary:
    "bg-[var(--accent)] text-zinc-950 hover:bg-[var(--accent)]/85",
  secondary:
    "border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)]",
};

const sizes = {
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

export default function ResumeDownload({
  label = "Download Resume",
  variant = "primary",
  size = "md",
  className,
  href = "/resume.pdf",
  downloadName = "Yashraj_Dighe_Resume.pdf",
}) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      href={href}
      download={downloadName}
    >
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
      </svg>
      {label}
    </a>
  );
}
