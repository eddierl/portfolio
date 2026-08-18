import { expect, test } from "@playwright/test";
import { getBlogPosts } from "../app/lib/posts";

test.describe("Homepage: Recent Posts", () => {
  test("shows the 2 most recent posts, sorted by date descending", async ({
    page,
  }) => {
    const allPosts = getBlogPosts();

    // The expected 2 most recent posts (sorted by publishedAt desc)
    const expectedPosts = [...allPosts]
      .sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime(),
      )
      .slice(0, 2);

    await page.goto("/");

    // Verify the "Recent Posts" section exists
    await expect(page.getByRole("heading", { name: "Recent Posts" })).toBeVisible();

    // Verify both expected posts are rendered
    for (const post of expectedPosts) {
      await expect(page.getByRole("heading", { name: post.metadata.title })).toBeVisible();
      await expect(page.locator(`a[href="/blog/${post.slug}"]`)).toBeVisible();
    }

    // Verify the posts are ordered newest first
    const postLinks = page.locator("section.hero a.card.block");
    const postTitles = await postLinks.allTextContents();

    expect(postTitles.length).toBe(2);
    expect(postTitles).toEqual([
      expectedPosts[0].metadata.title,
      expectedPosts[1].metadata.title,
    ]);
  });
});
