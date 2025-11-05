import { expect, test } from "@playwright/test";

test("admin login and view records", async ({ page }) => {
  //   test.setTimeout(5000);

  await page.goto("/admin");

  // Fill password
  await page.fill(
    'input[name="password"]',
    process.env.ADMIN_PASSWORD || "admin123"
  );

  // Submit form
  await page.click('button[type="submit"]');

  // Expect to be on /admin
  await expect(page).toHaveURL(/\/admin$/);

  // Expect to see records, i.e. table with rows
  await page.waitForSelector("table");

  // Check if tbody has tr
  const rows = await page.locator("tbody tr").count();
  expect(rows).toBeGreaterThan(0);
});
