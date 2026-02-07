import { API_BASE, fetchJson, fromColumnar } from "@/lib/api";

const BLOG_LIST_URL = `${API_BASE}/blogs.json`;

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------
const sortByDate = (posts) =>
  [...posts].sort((a, b) => {
    const aDate = Date.parse(a.date);
    const bDate = Date.parse(b.date);
    if (Number.isNaN(aDate) || Number.isNaN(bDate)) {
      return b.date.localeCompare(a.date);
    }
    return bDate - aDate;
  });

// ---------------------------------------------------------------------------
// Normalisers
// ---------------------------------------------------------------------------
const normalizeListEntry = (entry) => ({
  slug: entry.slug ?? "",
  title: entry.title ?? "",
  date: entry.date ?? "",
  excerpt: entry.excerpt ?? "",
  content: "",
  tags: [],
  coverImage: null,
  // Preserve the `starred` flag from the API so the home page can filter
  // starred posts without fetching every individual blog detail.
  starred: Boolean(entry.starred),
});

const normalizeDetailEntry = (entry) => ({
  slug: entry.slug ?? "",
  title: entry.title ?? "",
  date: entry.date ?? "",
  excerpt: entry.excerpt ?? "",
  content: entry.content ?? "",
  tags: Array.isArray(entry.tags) ? entry.tags : [],
  coverImage: entry.coverImage ?? null,
  starred: Boolean(entry.starred),
});

// ---------------------------------------------------------------------------
// Columnar list → post array
// ---------------------------------------------------------------------------
const mapListToPosts = (payload) => {
  if (!payload) return [];

  // Use the shared fromColumnar helper for the common { columns, data } format.
  const rows = fromColumnar(payload);

  // If fromColumnar returned an array of objects we're done.
  if (Array.isArray(rows) && rows.length > 0 && typeof rows[0] === "object") {
    return sortByDate(rows.map(normalizeListEntry));
  }

  // Fallback: shouldn't normally happen.
  return [];
};

// ---------------------------------------------------------------------------
// Build-time cache
// ---------------------------------------------------------------------------
let blogListCache = null;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch the blog listing.
 *
 * @param {{ includeDetails?: boolean }} options
 *   - `includeDetails` – when `true`, fetches every individual post so that
 *     fields like `content`, `tags`, and `coverImage` are populated.
 */
export const getBlogPosts = async ({ includeDetails = false } = {}) => {
  if (!blogListCache) {
    const payload = await fetchJson(BLOG_LIST_URL, { throwOnError: false });
    blogListCache = mapListToPosts(payload);
  }
  const list = blogListCache;

  if (!includeDetails) return list;

  const detailedPosts = await Promise.all(
    list.map(async (post) => {
      if (!post.slug) return post;
      const detail = await getBlogPost(post.slug);
      return detail ?? post;
    }),
  );

  return sortByDate(detailedPosts);
};

/**
 * Fetch the blog listing and return only the starred (featured) posts
 * with full details.  Much cheaper than `getBlogPosts({ includeDetails: true })`
 * because it only fetches detail for the posts that are actually starred.
 */
export const getStarredBlogPosts = async () => {
  const list = await getBlogPosts();
  const starred = list.filter((post) => post.starred && post.slug);

  if (starred.length === 0) return [];

  const detailed = await Promise.all(
    starred.map(async (post) => {
      const detail = await getBlogPost(post.slug);
      return detail ?? post;
    }),
  );

  return sortByDate(detailed);
};

/**
 * Fetch a single blog post by slug.
 */
export const getBlogPost = async (slug) => {
  if (!slug) return null;

  const payload = await fetchJson(
    `${API_BASE}/${encodeURIComponent(slug)}.json`,
    { throwOnError: false },
  );
  if (!payload) return null;

  const normalized = normalizeDetailEntry(payload);
  return normalized.slug ? normalized : null;
};
