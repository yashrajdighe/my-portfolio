"use client";

import { useEffect, useState } from "react";
import Tile from "@/components/bento/Tile";

function parseTimeZone(tz) {
  if (!tz || typeof tz !== "string") return undefined;
  const s = tz.trim();
  if (!s || s === "—") return undefined;
  // Common IANA ids contain "/" or are UTC offsets handled by Intl loosely
  try {
    Intl.DateTimeFormat(undefined, { timeZone: s });
    return s;
  } catch {
    /* fall through */
  }
  // Try common abbreviations → still use local if unknown
  return undefined;
}

export default function SignalTile({ contact }) {
  const [now, setNow] = useState(() => new Date());
  const iana = parseTimeZone(contact?.timezone);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = iana
    ? now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: iana,
      })
    : now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

  const locale =
    typeof navigator !== "undefined" ? navigator.language : "en-US";

  return (
    <Tile label="signal">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className="font-mono text-2xl tabular-nums tracking-tight text-[var(--fg)]"
            suppressHydrationWarning
          >
            {timeStr}
          </p>
          <p className="mt-1 font-mono text-[11px] text-[var(--muted)]" suppressHydrationWarning>
            {locale}
          </p>
          {contact?.timezone ? (
            <p className="mt-0.5 font-mono text-[10px] text-[var(--muted)] opacity-80">
              {contact.timezone}
            </p>
          ) : null}
        </div>
        <SignalBars />
      </div>
    </Tile>
  );
}

function SignalBars() {
  return (
    <svg
      className="h-10 w-10 shrink-0 text-[var(--accent)]"
      viewBox="0 0 40 40"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="4" y="22" width="6" height="12" rx="1" opacity="0.35" />
      <rect x="14" y="14" width="6" height="20" rx="1" opacity="0.55" />
      <rect x="24" y="8" width="6" height="26" rx="1" opacity="0.85" />
    </svg>
  );
}
