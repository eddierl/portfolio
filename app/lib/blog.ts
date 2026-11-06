import { readdirSync, readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { negate } from "es-toolkit";
import type { BlogPost, Metadata } from "./post-types";
import { redis } from "./redis";

// --- Internal helpers (same as posts.ts) ---

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match?.[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock?.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines?.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    if (!key) return;

    const value = valueArr
      .join(": ")
      .trim()
      .replace(/^['"](.*)['"]$/, "$1");

    //@ts-expect-error
    metadata[key.trim() as keyof Metadata] =
      String(value).toLowerCase() === "false" ? false : value;
  });

  // Default tags to empty string for posts missing the frontmatter key
  if (!metadata.tags) metadata.tags = "";
  return { metadata: metadata as Metadata, content };
}

function parseTags(tagsString: string | undefined): string[] {
  if (!tagsString) return [];
  return tagsString
    .split(",")
    .flatMap((t) => t.trim().toLowerCase().split(/\s+/))
    .filter((t) => t.length > 0);
}

function getMDXFiles(dir: string) {
  return readdirSync(dir).filter((file) => extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string): BlogPost[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(join(dir, file));
    const slug = basename(file, extname(file));
    const tags = parseTags(metadata.tags);

    return {
      metadata,
      slug,
      content,
      tags,
    };
  });
}

const isDraft = ({ metadata }: { metadata: Metadata }) => metadata.isDraft;
const isPublished = ({ metadata }: { metadata: Metadata }) =>
  new Date(metadata.publishedAt) <= new Date();
const isTechnical = ({ metadata }: { metadata: Metadata }) =>
  metadata.isTechnical ?? true; // default to true if not specified

function getPostsFromDisk(): BlogPost[] {
  return getMDXData(join(process.cwd(), "content"))
    .filter(negate(isDraft))
    .filter(isTechnical)
    .filter(isPublished);
}

// --- Public async API (Redis-cached) ---

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours

export async function getPosts(): Promise<BlogPost[]> {
  const posts = getPostsFromDisk();

  if (!redis) return posts;

  try {
    const cached = await redis.get<BlogPost[]>("blog:posts");
    if (cached) return cached;

    await redis
      .set("blog:posts", posts, { ex: CACHE_TTL_SECONDS })
      .catch(() => {});
  } catch {
    // Redis error → fall back to disk (already have posts)
  }

  return posts;
}

// Lightweight version: only reads frontmatter, skips full content.
// Used by layout and homepage where we only need metadata.
function getMDXDataLightweight(dir: string): Omit<BlogPost, "content">[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const rawContent = readFileSync(join(dir, file), "utf-8");
    const { metadata } = parseFrontmatter(rawContent);
    const slug = basename(file, extname(file));
    const tags = parseTags(metadata.tags);
    return { metadata, slug, tags };
  });
}

const isDraftLight = ({ metadata }: { metadata: Metadata }) => metadata.isDraft;
const isPublishedLight = ({ metadata }: { metadata: Metadata }) =>
  new Date(metadata.publishedAt) <= new Date();
const isTechnicalLight = ({ metadata }: { metadata: Metadata }) =>
  metadata.isTechnical ?? true;

export async function getPostsMetadata(): Promise<Omit<BlogPost, "content">[]> {
  const posts = getMDXDataLightweight(join(process.cwd(), "content"))
    .filter(negate(isDraftLight))
    .filter(isTechnicalLight)
    .filter(isPublishedLight);

  if (!redis) return posts;

  try {
    const cached = await redis.get<Omit<BlogPost, "content">[]>(
      "blog:posts:metadata",
    );
    if (cached) return cached;

    await redis
      .set("blog:posts:metadata", posts, { ex: CACHE_TTL_SECONDS })
      .catch(() => {});
  } catch {
    // Redis error → fall back to disk (already have posts)
  }

  return posts;
}

export async function getTags(): Promise<string[]> {
  const posts = await getPosts();
  const allTags = posts.flatMap((post) => post.tags);
  const tags = [...new Set(allTags)].sort();

  if (!redis) return tags;

  try {
    const cached = await redis.get<string[]>("blog:tags");
    if (cached) return cached;

    await redis
      .set("blog:tags", tags, { ex: CACHE_TTL_SECONDS })
      .catch(() => {});
  } catch {
    // Redis error → fall back to disk (already have tags)
  }

  return tags;
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getPosts();
  const byTag = posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );

  if (!redis) return byTag;

  try {
    const key = `blog:tag:${tag.toLowerCase()}`;
    const cached = await redis.get<BlogPost[]>(key);
    if (cached) return cached;

    await redis.set(key, byTag, { ex: CACHE_TTL_SECONDS }).catch(() => {});
  } catch {
    // Redis error → fall back to disk (already have byTag)
  }

  return byTag;
}

export async function getTagCount(tag: string): Promise<number> {
  const posts = await getPostsByTag(tag);
  return posts.length;
}
