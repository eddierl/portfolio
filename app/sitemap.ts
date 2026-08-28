import type { MetadataRoute } from "next";
import { CV_FILE_NAME } from "@/lib/constants";
import { metaData } from "./lib/config";
import { getBlogPosts } from "./lib/posts";

const BaseUrl = metaData.baseUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = getBlogPosts().map((post) => ({
    url: `${BaseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt ?? new Date().toISOString(),
  }));

  const now = new Date().toISOString().split("T")[0];
  const routes = [
    {
      url: `${BaseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${BaseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BaseUrl}/blog/tags`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${BaseUrl}/${CV_FILE_NAME}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [...routes, ...blogs];
}
