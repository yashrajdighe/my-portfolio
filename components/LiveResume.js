"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import ResumeDownload from "@/components/ResumeDownload";
import CopyResumeLink from "@/components/CopyResumeLink";

export default function LiveResume({ work, resume }) {
  const [deepView, setDeepView] = useState(false);
  const careerStart = new Date("2021-10-04");
  const now = new Date();
  const totalMonths =
    now.getFullYear() * 12 +
    now.getMonth() -
    (careerStart.getFullYear() * 12 + careerStart.getMonth());
  const years = Math.max(0, Math.floor(totalMonths / 12));
  const months = Math.max(0, totalMonths % 12);
  const experienceLabel = `${years} year${years === 1 ? "" : "s"} ${
    months
  } month${months === 1 ? "" : "s"}`;

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
            Total Experience
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-100">
            {experienceLabel}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle
            leftLabel="Quick View"
            rightLabel="Deep Technical View"
            checked={deepView}
            onChange={setDeepView}
          />
          <ResumeDownload
            label={resume.resumeDownload.label}
            variant="primary"
            size="md"
          />
          <CopyResumeLink />
        </div>
      </div>

      <div className="mt-10 space-y-10 border-l border-slate-800 pl-6">
        {work.map((role) => (
          <div key={`${role.name}-${role.position}`} className="relative">
            <span className="absolute -left-[34px] top-2 h-3 w-3 rounded-full bg-emerald-300 glow-ring" />
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-100">
                  {role.position}
                </h3>
                <p className="text-sm text-slate-300">{role.name}</p>
                <p className="text-xs text-muted">{role.location}</p>
              </div>
              <Badge variant="outline">
                {role.startDate} - {role.endDate}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-slate-300">{role.keyImpact}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {role.techStack.map((tool) => (
                <Badge key={tool}>{tool}</Badge>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              {(deepView ? role.highlights : role.quickHighlights).map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 rounded-full bg-emerald-300" />
                  <p>{item}</p>
                </div>
              ))}
              {!deepView && (
                <button
                  type="button"
                  onClick={() => setDeepView(true)}
                  className="inline-flex cursor-pointer items-center gap-2 text-xs text-emerald-300/70 transition hover:text-emerald-200"
                  aria-label="Switch to deep technical view"
                >
                  <span>More details</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-3 w-3"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
