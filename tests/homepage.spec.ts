import { expect, test } from "@playwright/test";
import type { BlogPost } from "@/app/lib/post-types";
import { getPosts } from "../app/lib/blog";

function getTitles(posts: BlogPost[]): string[] {
  return posts.map((p) => p.metadata.title);
}

const allPosts = await getPosts();

test.describe("Homepage: Recent Posts", () => {
  test("shows the 2 most recent posts, sorted by date descending", async ({
    page,
  }) => {
    // The expected 2 most recent posts (sorted by publishedAt desc)
    const expectedPosts = [...allPosts]
      .sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime(),
      )
      .slice(0, 2)
      .map((p) => ({ ...p, metadata: p.metadata }));

    await page.goto("/");

    // Verify the "Recent Posts" section exists
    await expect(
      page.getByRole("heading", { name: "Recent Posts" }),
    ).toBeVisible();

    // Verify both expected posts are rendered
    for (const post of expectedPosts) {
      await expect(
        page.getByRole("heading", { name: post.metadata.title?.toString() }),
      ).toBeVisible();
      await expect(page.locator(`a[href="/blog/${post.slug}"]`)).toBeVisible();
    }

    // Verify the posts are ordered newest first
    const postHeadings = page.locator("section.hero h3.font-medium");
    const postTitles = await postHeadings.allTextContents();

    expect(postTitles).toEqual(getTitles(expectedPosts));
  });
});
