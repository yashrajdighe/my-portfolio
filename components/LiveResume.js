"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import ResumeDownload from "@/components/ResumeDownload";

function RoleCard({ role }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="group/role">
      {/* Clickable header */}
      <div
        className="flex cursor-pointer items-start justify-between gap-3"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded(!expanded);
          }
        }}
      >
        <div className="min-w-0 flex-1">
          {/* Title + Company + Location */}
          <h3 className="text-base font-semibold text-[var(--foreground)]">
            {role.position}
          </h3>
          <p className="mt-0.5 text-sm text-[var(--muted)]">
            {role.name}
            {role.location ? (
              <span className="text-[var(--muted)]/70"> &middot; {role.location}</span>
            ) : null}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Badge variant="outline" className="hidden sm:inline-flex">
            {role.startDate} &ndash; {role.endDate}
          </Badge>
          <svg
            viewBox="0 0 20 20"
            className={`h-4 w-4 shrink-0 text-[var(--muted)] transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Date visible on mobile (below title) */}
      <p className="mt-1 text-xs text-[var(--muted)] sm:hidden">
        {role.startDate} &ndash; {role.endDate}
      </p>

      {/* Key Impact -- always visible, highlighted */}
      <div className="mt-3 border-l-3 border-[var(--accent)] pl-3">
        <p className="text-sm leading-relaxed text-[var(--muted)] italic">
          {role.keyImpact}
        </p>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-5">
          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {role.techStack.map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
          </div>

          {/* Highlights */}
          <div className="mt-5 space-y-2.5 text-sm leading-relaxed text-[var(--muted)]">
            {role.highlights.map((item) => (
              <div key={item} className="flex gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

export default function LiveResume({ work, resumeDownload }) {
  const now = new Date();

  const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

  const parseDate = (dateStr) => {
    if (dateStr === "Present") return now;
    const [mon, year] = dateStr.split(" ");
    return new Date(parseInt(year), MONTHS[mon]);
  };

  const monthsBetween = (start, end) =>
    end.getFullYear() * 12 + end.getMonth() - (start.getFullYear() * 12 + start.getMonth());

  const formatDuration = (totalMonths) => {
    const y = Math.max(0, Math.floor(totalMonths / 12));
    const m = Math.max(0, totalMonths % 12);
    if (y === 0) return `${m} month${m === 1 ? "" : "s"}`;
    return `${y} year${y === 1 ? "" : "s"} ${m} month${m === 1 ? "" : "s"}`;
  };

  // Separate professional and internship roles
  const internRoles = work.filter((r) => /intern/i.test(r.position));
  const professionalRoles = work.filter((r) => !/intern/i.test(r.position));

  // Professional experience: earliest professional start date to now
  let professionalMonths = 0;
  if (professionalRoles.length > 0) {
    const earliest = professionalRoles.reduce((min, r) => {
      const d = parseDate(r.startDate);
      return d < min ? d : min;
    }, parseDate(professionalRoles[0].startDate));
    professionalMonths = monthsBetween(earliest, now);
  }

  // Internship: sum of each internship role's duration (inclusive of end month)
  let internshipMonths = 0;
  for (const role of internRoles) {
    const duration = monthsBetween(parseDate(role.startDate), parseDate(role.endDate));
    // +1 to include the end month for completed roles
    internshipMonths += role.endDate === "Present" ? duration : duration + 1;
  }

  const experienceLabel = formatDuration(professionalMonths);
  const internshipLabel = formatDuration(internshipMonths);

  return (
    <div>
      {/* Experience header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Total Experience
            </p>
            <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">
              {experienceLabel}
            </p>
          </div>
          {internshipMonths > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                + Internship
              </p>
              <p className="mt-1 text-lg font-semibold text-[var(--muted)]">
                {internshipLabel}
              </p>
            </div>
          )}
        </div>
        {resumeDownload ? (
          <ResumeDownload
            label={resumeDownload.label}
            variant="secondary"
            size="md"
          />
        ) : null}
      </div>

      {/* Role cards */}
      <div className="space-y-4">
        {work.map((role) => (
          <RoleCard key={`${role.name}-${role.position}`} role={role} />
        ))}
      </div>
    </div>
  );
}
