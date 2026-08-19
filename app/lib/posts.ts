import fs from "node:fs";
import path from "node:path";
import { negate } from "es-toolkit";

import type { BlogPost, Metadata } from "./post-types";

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
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string): BlogPost[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
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

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "content"))
    .filter(negate(isDraft))
    .filter(isPublished);
}

export function getTags(): string[] {
  const allTags = getBlogPosts().flatMap((post) => post.tags);
  return [...new Set(allTags)].sort();
}

export function getPostsByTag(tag: string) {
  return getBlogPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export function getTagCount(tag: string): number {
  return getBlogPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  ).length;
}
