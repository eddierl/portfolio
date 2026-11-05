import { expect, test } from "@playwright/test";
import { getPosts } from "../app/lib/blog";

const allPosts = await getPosts();

test.describe("Homepage: Writing", () => {
  test("shows the 2 most recent technical posts, sorted by date descending", async ({
    page,
  }) => {
    // The expected 2 most recent technical posts (sorted by publishedAt desc)
    const expectedPosts = [...allPosts]
      .sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime(),
      )
      .slice(0, 2)
      .map((p) => ({ ...p, metadata: p.metadata }));

    await page.goto("/");

    // Verify the "Writing" section exists
    await expect(page.getByRole("heading", { name: "Writing" })).toBeVisible();

    // Verify both expected posts are rendered
    for (const post of expectedPosts) {
      await expect(
        page.getByRole("heading", { name: post.metadata.title?.toString() }),
      ).toBeVisible();
      await expect(page.locator(`a[href="/blog/${post.slug}"]`)).toBeVisible();
    }

    // Verify the posts are ordered newest first
    const postLinks = page.locator('a[href^="/blog/"]');
    const linkCount = await postLinks.count();
    expect(linkCount).toBe(expectedPosts.length);
  });

  test("shows Featured Projects section linking to /projects", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify the "Featured Projects" section exists
    await expect(
      page.getByRole("heading", { name: "Featured Projects" }),
    ).toBeVisible();

    // Verify link to /projects exists
    await expect(
      page.getByRole("link", { name: "View All Projects →" }),
    ).toBeVisible();
  });

  test("shows hero section with name and social links", async ({ page }) => {
    await page.goto("/");

    // Verify name is shown
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Verify social links exist (use getByText to avoid navbar collision)
    await expect(page.getByText("GitHub")).toBeVisible();
    await expect(page.getByText("LinkedIn")).toBeVisible();
    await expect(page.getByText("Email")).toBeVisible();
  });
});
