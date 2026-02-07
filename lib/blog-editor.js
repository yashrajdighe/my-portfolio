/**
 * Shared constants and helpers used by both the blog write and import pages.
 */

export const IMPORT_STORAGE_KEY = "blog-import-payload";

export const inputClasses =
  "w-full rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--accent)]";

export const labelClasses = "text-xs font-semibold text-[var(--muted)]";

/**
 * Validate and normalise an imported blog post JSON payload.
 * Throws on invalid input so the caller can surface the error message.
 */
export const normalizeImportedPost = (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid JSON payload.");
  }
  const requiredFields = ["slug", "title", "date", "excerpt", "content"];
  requiredFields.forEach((field) => {
    if (!payload[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  });
  if (payload.tags && !Array.isArray(payload.tags)) {
    throw new Error("Tags must be an array.");
  }
  if (typeof payload.content !== "string") {
    throw new Error("Content must be a string.");
  }
  return {
    slug: payload.slug,
    title: payload.title,
    date: payload.date,
    excerpt: payload.excerpt,
    content: payload.content,
    tags: Array.isArray(payload.tags) ? payload.tags : [],
    coverImage: payload.coverImage || "",
    starred: Boolean(payload.starred),
  };
};
