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

const API_BASE = "https://api.yashrajdighe.in";

const fetchJson = async (path) => {
  const response = await fetch(`${API_BASE}/${path}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load resume data: ${path}`);
  }
  return response.json();
};

export const getResume = async () => {
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
    fetchJson("hero"),
    fetchJson("summary"),
    fetchJson("impact-stats"),
    fetchJson("experience"),
    fetchJson("projects"),
    fetchJson("skills"),
    fetchJson("certifications"),
    fetchJson("education"),
    fetchJson("resume-download"),
    fetchJson("contact"),
  ]);

  const resume = {
    basics: hero,
    summary: summary.summary ?? summary,
    impactStats: impactStats.impactStats ?? impactStats,
    work: experience.work ?? experience,
    projects: projects.projects ?? projects,
    stack: skills.stack ?? skills,
    certifications: certifications.certifications ?? certifications,
    education: education.education ?? education,
    resumeDownload: resumeDownload.resumeDownload ?? resumeDownload,
    contact: contact.contact ?? contact,
  };

  return process.env.NODE_ENV !== "production" ? validateResume(resume) : resume;
};
