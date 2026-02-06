const BLOG_LIST_API = "https://api.yashrajdighe.in/blogs.json";
const BLOG_DETAIL_BASE = "https://api.yashrajdighe.in";

const sortByDate = (posts) =>
  [...posts].sort((a, b) => {
    const aDate = Date.parse(a.date);
    const bDate = Date.parse(b.date);
    if (Number.isNaN(aDate) || Number.isNaN(bDate)) {
      return b.date.localeCompare(a.date);
    }
    return bDate - aDate;
  });

const normalizeListEntry = (entry) => ({
  slug: entry.slug ?? "",
  title: entry.title ?? "",
  date: entry.date ?? "",
  excerpt: entry.excerpt ?? "",
  content: "",
  tags: [],
  coverImage: null,
  starred: false,
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

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  return response.json();
};

const mapListToPosts = (payload) => {
  if (!payload) {
    return [];
  }
  const columns = Array.isArray(payload?.columns) ? payload.columns : [];
  const rows = Array.isArray(payload?.data) ? payload.data : [];
  const mapped = rows.map((row) => {
    if (!Array.isArray(row)) {
      return normalizeListEntry({});
    }
    const entry = {};
    columns.forEach((column, index) => {
      entry[column] = row[index];
    });
    return normalizeListEntry(entry);
  });
  return sortByDate(mapped);
};

export const getBlogPosts = async ({ includeDetails = false } = {}) => {
  const payload = await fetchJson(BLOG_LIST_API);
  const list = mapListToPosts(payload);

  if (!includeDetails) {
    return list;
  }

  const detailedPosts = await Promise.all(
    list.map(async (post) => {
      if (!post.slug) {
        return post;
      }
      const detail = await getBlogPost(post.slug);
      return detail ?? post;
    }),
  );

  return sortByDate(detailedPosts);
};

export const getBlogPost = async (slug) => {
  if (!slug) {
    return null;
  }
  const payload = await fetchJson(
    `${BLOG_DETAIL_BASE}/${encodeURIComponent(slug)}.json`,
  );
  if (!payload) {
    return null;
  }
  const normalized = normalizeDetailEntry(payload);
  return normalized.slug ? normalized : null;
};
