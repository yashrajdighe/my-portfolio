import { execSync } from "node:child_process";

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
};

export const getLastUpdated = () => {
  try {
    const date = execSync("git log -1 --format=%cs", {
      cwd: process.cwd(),
    })
      .toString()
      .trim();
    if (date) return formatDate(date);
  } catch (error) {
    // Fallback to build time if git is unavailable.
  }
  return formatDate(new Date().toISOString());
};
