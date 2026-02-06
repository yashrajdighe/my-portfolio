import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60";

const variants = {
  primary:
    "bg-emerald-400/15 text-emerald-100 border border-emerald-400/40 hover:bg-emerald-400/25",
  secondary:
    "bg-slate-900/50 text-slate-200 border border-slate-700 hover:border-emerald-400/60",
};

const sizes = {
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

export default function ResumeDownload({
  label = "Download PDF",
  variant = "secondary",
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
      {label}
    </a>
  );
}
