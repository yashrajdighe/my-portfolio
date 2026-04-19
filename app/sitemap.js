import { getBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

const baseUrl = "https://yashrajdighe.in";

const withTrailingSlash = (path) => {
  if (!path) return "/";
  return path.endsWith("/") ? path : `${path}/`;
};

export default async function sitemap() {
  const now = new Date();
  const blogPosts = await getBlogPosts();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/blogs", priority: 0.8, changeFrequency: "weekly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${withTrailingSlash(route.path)}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}${withTrailingSlash(`/blog/${post.slug}`)}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
