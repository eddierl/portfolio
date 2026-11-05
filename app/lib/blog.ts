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

function getPostsFromDisk(): BlogPost[] {
  return getMDXData(join(process.cwd(), "content"))
    .filter(negate(isDraft))
    .filter(isPublished);
}

// --- Public async API (Redis-cached) ---

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const cached = await redis.get<BlogPost[]>("blog:posts");
    if (cached) return cached;

    const posts = getPostsFromDisk();

    // Fire-and-forget cache write; failure just means next request re-reads.
    await redis
      .set("blog:posts", posts, { ex: CACHE_TTL_SECONDS })
      .catch(() => {});

    return posts;
  } catch {
    // Redis error → fall back to disk
    return getPostsFromDisk();
  }
}

export async function getTags(): Promise<string[]> {
  try {
    const cached = await redis.get<string[]>("blog:tags");
    if (cached) return cached;

    const posts = await getPosts();
    const allTags = posts.flatMap((post) => post.tags);
    const tags = [...new Set(allTags)].sort();

    await redis
      .set("blog:tags", tags, { ex: CACHE_TTL_SECONDS })
      .catch(() => {});

    return tags;
  } catch {
    const posts = await getPosts();
    const allTags = posts.flatMap((post) => post.tags);
    return [...new Set(allTags)].sort();
  }
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const key = `blog:tag:${tag.toLowerCase()}`;
    const cached = await redis.get<BlogPost[]>(key);
    if (cached) return cached;

    const posts = await getPosts();
    const byTag = posts.filter((post) =>
      post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );

    await redis.set(key, byTag, { ex: CACHE_TTL_SECONDS }).catch(() => {});

    return byTag;
  } catch {
    const posts = await getPosts();
    return posts.filter((post) =>
      post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );
  }
}

export async function getTagCount(tag: string): Promise<number> {
  const posts = await getPostsByTag(tag);
  return posts.length;
}
