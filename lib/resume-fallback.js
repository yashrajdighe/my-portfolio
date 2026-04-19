/**
 * Minimal resume payload used when the portfolio API is unreachable
 * (offline dev, firewall, or outage). Must satisfy `validateResume` in resume.js.
 */
export const FALLBACK_RESUME = {
  basics: {
    name: "Yashraj Dighe",
    label: "Senior Cloud/Platform Engineer",
    headline: "Portfolio (offline)",
    subheadline:
      "Live resume data could not be loaded. Check your network or API availability.",
    email: "",
    url: "https://yashrajdighe.in",
    profiles: [
      {
        network: "GitHub",
        label: "Personal",
        url: "https://github.com/yashrajdighe",
      },
      {
        network: "GitHub",
        label: "DevOps Hub",
        url: "https://github.com/yd-devops-hub",
      },
      {
        network: "Medium",
        url: "https://medium.com/@yashraj45dighe",
      },
    ],
  },
  summary: [
    "Resume content is served from api.yashrajdighe.in. When that service is unreachable, this placeholder copy is shown instead.",
  ],
  work: [],
  projects: [],
  stack: {
    Cloud: ["AWS"],
    Platform: ["Kubernetes"],
  },
  impactStats: [],
  certifications: [],
  education: [],
  resumeDownload: {
    label: "Download resume",
    href: "/resume.pdf",
  },
  contact: {
    availability: "—",
    timezone: "—",
  },
};
