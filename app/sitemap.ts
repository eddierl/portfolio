import type { MetadataRoute } from "next";
import { CV_FILE_NAME } from "@/lib/constants";
import { metaData } from "./lib/config";
import { getBlogPosts } from "./lib/posts";

const BaseUrl = metaData.baseUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = getBlogPosts().map((post) => ({
    url: `${BaseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = [
    "/",
    "/blog",
    CV_FILE_NAME,
    //  "projects", "photos"
  ].map((route) => ({
    url: `${BaseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
