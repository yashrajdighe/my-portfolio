"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/Section";
import MotionWrap from "@/components/MotionWrap";

const renderStarContent = (detail) => {
  if (Array.isArray(detail)) {
    return (
      <div className="mt-1.5 space-y-1.5">
        {detail.map((item, index) => (
          <div key={`${index}-${item}`} className="flex gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    );
  }
  return <p className="mt-1.5">{detail}</p>;
};

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <div
        className="flex cursor-pointer items-start justify-between gap-4"
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
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-base font-semibold text-[var(--foreground)]">
            {project.name}
          </h3>
          <Badge>{project.tagline}</Badge>
        </div>
        <svg
          viewBox="0 0 20 20"
          className={`h-5 w-5 shrink-0 text-[var(--muted)] transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Tech badges always visible */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.map((item) => (
          <Badge key={item} variant="outline">
            {item}
          </Badge>
        ))}
      </div>

      {/* Expandable STAR details */}
      {expanded && (
        <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)] sm:mt-6 sm:gap-5 md:grid-cols-2 md:gap-8">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Situation
              </p>
              {renderStarContent(project.situation)}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Task
              </p>
              {renderStarContent(project.task)}
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Action
              </p>
              {renderStarContent(project.action)}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Result
              </p>
              {renderStarContent(project.result)}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function ProjectStarSection({ projects }) {
  return (
    <MotionWrap>
      <SectionHeading
        eyebrow="Projects"
        title="Architecture & Delivery"
        description="Structured outcomes in S.T.A.R. format. Click to expand details."
      />
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </MotionWrap>
  );
}
