import { getBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

const baseUrl = "https://yashrajdighe.in";

const withTrailingSlash = (path) => {
  if (!path) {
    return "/";
  }
  return path.endsWith("/") ? path : `${path}/`;
};

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = [
    "",
    "/experience",
    "/projects",
    "/stack",
    "/certifications",
    "/contact",
    "/blogs",
    "/blog",
    "/resume",
  ];
  const blogPosts = await getBlogPosts();

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${withTrailingSlash(route)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}${withTrailingSlash(`/blog/${post.slug}`)}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
