import { test as base, expect } from "@playwright/test";
import { getBlogPosts } from "../app/lib/posts";

type Blog = ReturnType<typeof getBlogPosts>[number];

// 1. Extend the base test with a 'blog' fixture
interface BlogFixtures {
  blog: Blog;
}

const test = base.extend<BlogFixtures>({
  blog: [null as unknown as Blog, { option: true }],
});

const blogs = getBlogPosts();

// 2. Use an iterator (forEach) to define the tests
test.describe(`Blog Posts Integration`, () => {
  for (const currentBlog of blogs) {
    test.describe(`Post: ${currentBlog.slug}`, () => {
      // 3. Inject the specific blog data into the fixture for this test group
      test.use({ blog: currentBlog });

      test("should display correctly", async ({ page, blog }) => {
        // Navigate directly to the blog post using the fixture
        await page.goto(`/blog/${blog.slug}`);

        // Verify the title is correct and visible
        const titleLocator = page.locator("h1.title");
        await expect(titleLocator).toBeVisible();
        await expect(titleLocator).toHaveText(blog.metadata.title);

        // Verify basic structure of the post
        await expect(page.locator("article")).toBeVisible();

        // Verify reading time is present
        await expect(page.getByText(/min read/)).toBeVisible();

        // Verify published date is present
        await expect(page.locator("section div span").first()).toBeVisible();
      });
    });
  }
});
