/**
 * JSON-LD structured data generators for SEO.
 *
 * Each function returns a plain object that can be serialised into a
 * <script type="application/ld+json"> tag via the Next.js metadata API
 * or a manual <script> element.
 */

const SITE_URL = "https://yashrajdighe.in";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Wrap a JSON-LD object in a <script> tag suitable for embedding in JSX.
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Schema generators
// ---------------------------------------------------------------------------

/**
 * Schema.org `Person` — represents the portfolio owner.
 */
export const personSchema = (basics) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: basics?.name ?? "Yashraj Dighe",
  url: SITE_URL,
  jobTitle: basics?.label ?? "Senior Cloud/Platform Engineer",
  description:
    basics?.subheadline ??
    "Engineering scalable platforms, developer golden paths, and Kubernetes infrastructure with modern IaC.",
  email: basics?.email ?? undefined,
  sameAs: (basics?.profiles ?? [])
    .map((p) => p.url)
    .filter(Boolean),
});

/**
 * Schema.org `WebSite` — lets Google display sitelinks / site name.
 */
export const webSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Yashraj Dighe Portfolio",
  url: SITE_URL,
});

/**
 * Schema.org `ProfilePage` — marks the home page as a profile.
 */
export const profilePageSchema = (basics) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: basics?.name ?? "Yashraj Dighe",
  url: SITE_URL,
  mainEntity: personSchema(basics),
});

/**
 * Schema.org `BlogPosting` — for individual blog articles.
 */
export const blogPostingSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  datePublished: post.date,
  url: `${SITE_URL}/blog/${post.slug}/`,
  ...(post.coverImage ? { image: post.coverImage } : {}),
  author: {
    "@type": "Person",
    name: "Yashraj Dighe",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Person",
    name: "Yashraj Dighe",
    url: SITE_URL,
  },
  ...(post.tags?.length
    ? { keywords: post.tags.join(", ") }
    : {}),
});

/**
 * Schema.org `BreadcrumbList` — renders breadcrumbs in Google results.
 *
 * @param {Array<{ name: string, href: string }>} items
 *   Ordered breadcrumb items. `href` should be a path like `/experience/`.
 */
export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.href}`,
  })),
});

/**
 * Schema.org `ItemList` — for the blog listing page.
 */
export const blogListSchema = (posts) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: posts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/blog/${post.slug}/`,
    name: post.title,
  })),
});
