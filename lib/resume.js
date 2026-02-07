import { API_BASE, fetchJson, fromColumnar } from "@/lib/api";

// ---------------------------------------------------------------------------
// Validation (dev-only)
// ---------------------------------------------------------------------------
const requireField = (obj, key) => {
  if (!obj || obj[key] === undefined || obj[key] === null) {
    throw new Error(`Missing resume field: ${key}`);
  }
};

const requireArray = (obj, key) => {
  requireField(obj, key);
  if (!Array.isArray(obj[key])) {
    throw new Error(`Expected array for resume field: ${key}`);
  }
};

const validateResume = (data) => {
  requireField(data, "basics");
  requireArray(data, "summary");
  requireArray(data, "work");
  requireArray(data, "projects");
  requireField(data, "stack");
  requireArray(data, "impactStats");
  requireArray(data, "certifications");
  requireField(data, "resumeDownload");
  requireField(data, "contact");
  return data;
};

// ---------------------------------------------------------------------------
// API helper — thin wrapper around shared fetchJson for resume paths
// ---------------------------------------------------------------------------
const fetchResume = (path) =>
  fetchJson(`${API_BASE}/${path}.json`, { throwOnError: true });

// ---------------------------------------------------------------------------
// Build-time cache — resolved value is reused across all pages in one build
// ---------------------------------------------------------------------------
let resumeCache = null;

/**
 * Fetch the complete resume data (all 10 endpoints in parallel).
 * Cached at module level so the result is reused across every page that
 * imports it during a single static-export build.
 */
export const getResume = async () => {
  if (resumeCache) return resumeCache;

  const [
    hero,
    summary,
    impactStats,
    experience,
    projects,
    skills,
    certifications,
    education,
    resumeDownload,
    contact,
  ] = await Promise.all([
    fetchResume("hero"),
    fetchResume("summary"),
    fetchResume("impact-stats"),
    fetchResume("experience"),
    fetchResume("projects"),
    fetchResume("skills"),
    fetchResume("certifications"),
    fetchResume("education"),
    fetchResume("resume-download"),
    fetchResume("contact"),
  ]);

  const resume = {
    basics: hero,
    summary: fromColumnar(summary.summary ?? summary),
    impactStats: fromColumnar(impactStats.impactStats ?? impactStats),
    work: fromColumnar(experience.work ?? experience),
    projects: fromColumnar(projects.projects ?? projects),
    stack: skills.stack ?? skills,
    certifications: fromColumnar(
      certifications.certifications ?? certifications,
    ),
    education: fromColumnar(education.education ?? education),
    resumeDownload: resumeDownload.resumeDownload ?? resumeDownload,
    contact: contact.contact ?? contact,
  };

  resumeCache =
    process.env.NODE_ENV !== "production" ? validateResume(resume) : resume;
  return resumeCache;
};

/**
 * Lightweight fetch of just the hero / basics section.
 * Used by the Footer which only needs `basics.name` — avoids
 * triggering all 10 resume endpoint fetches.
 */
export const getBasics = async () => {
  // If the full resume is already cached, reuse it.
  if (resumeCache) return resumeCache.basics;
  const hero = await fetchResume("hero");
  return hero;
};
