import { cn } from "@/lib/utils";

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.485 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.485 17.523 2 12 2Z"
      />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9H7.12v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function DevIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.172h.701a.731.731 0 0 0 .468-.175c.155-.132.233-.338.233-.615V10.7c.001-.277-.077-.483-.233-.617ZM19.77 1.627H4.23A2.268 2.268 0 0 0 1.959 3.9v16.188a2.271 2.271 0 0 0 2.272 2.283H19.77a2.275 2.275 0 0 0 2.272-2.283V3.9a2.272 2.272 0 0 0-2.272-2.273Zm-9.884 11.687c0 .773-.477 1.945-1.997 1.942H5.937V8.777h2.003c1.466 0 1.946 1.17 1.947 1.945l-.001 2.592Zm4.267-3.338h-2.271v.955h1.383v1.287h-1.383v.959h2.271v1.289H12.1a.74.74 0 0 1-.712-.727V8.02c0-.017.002-.033.004-.049a.74.74 0 0 1 .708-.668h2.052l.001 1.29v.002Zm4.943 4.169c-.492 1.148-1.373.919-1.766 0l-1.8-6.058h1.437l1.25 4.788 1.245-4.788h1.438l-1.804 6.058Z" />
    </svg>
  );
}

function MediumIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12ZM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12Z" />
    </svg>
  );
}

function StackOverflowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m17.36 20.2v-5.38h1.79v7.18h-17.15v-7.18h1.79v5.38zm-13.57-3.59h12.5v1.79h-12.5zm.41-3.81 12.16 2.53.37-1.74-12.16-2.53zm1.62-4.19 11.37 5.31.76-1.61-11.37-5.31zm3.13-4.03 9.61 8.01 1.14-1.37-9.61-8.01zm6.34-5.58-1.46 1.06 7.06 9.49 1.46-1.06z" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function resolveIcon(network) {
  const key = (network || "").toLowerCase();
  if (key.includes("github")) return GitHubIcon;
  if (key.includes("linkedin")) return LinkedInIcon;
  if (key.includes("twitter") || key === "x") return TwitterIcon;
  if (key.includes("dev.to") || key === "dev")return DevIcon;
  if (key.includes("medium")) return MediumIcon;
  if (key.includes("stack")) return StackOverflowIcon;
  return GlobeIcon;
}

/**
 * Derive a distinguishing label from a profile entry. When multiple profiles
 * share the same network (e.g. two GitHub accounts), we want each tooltip /
 * aria-label to be unique — prefer an explicit `label` or `username`, otherwise
 * extract the trailing path segment from the URL.
 */
function resolveTitle(profile) {
  if (profile.label) return `${profile.network} · ${profile.label}`;
  if (profile.username) return `${profile.network} · ${profile.username}`;
  try {
    const url = new URL(profile.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const handle = segments[segments.length - 1];
    if (handle) return `${profile.network} · ${handle}`;
  } catch {
    /* ignore malformed URLs */
  }
  return profile.network;
}

const LINK_CLASS =
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40";

export default function SocialLinks({ profiles = [], email, className, iconClassName }) {
  const hasAny = (profiles && profiles.length > 0) || Boolean(email);
  if (!hasAny) return null;

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="group"
      aria-label="Social links"
    >
      {profiles.map((p, idx) => {
        const Icon = resolveIcon(p.network);
        const title = resolveTitle(p);
        return (
          <a
            key={`${p.network}-${p.url}-${idx}`}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
            title={title}
            aria-label={title}
          >
            <Icon className={cn("h-[18px] w-[18px]", iconClassName)} />
          </a>
        );
      })}
      {email ? (
        <a
          href={`mailto:${email}`}
          className={LINK_CLASS}
          title="Email"
          aria-label="Email"
        >
          <MailIcon className={cn("h-[18px] w-[18px]", iconClassName)} />
        </a>
      ) : null}
    </div>
  );
}
