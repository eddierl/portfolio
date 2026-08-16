import { expect, test } from "@playwright/test";

test.describe("Admin Page", () => {
  test("shows login form when not authenticated", async ({ page }) => {
    // 1. Navigate to /admin as a new user (no session/cookies)
    await page.goto("/admin");
    // 2. Observe the page content
    await expect(
      page.getByRole("heading", { name: /admin login/i }),
    ).toBeVisible();
    await expect(page.getByPlaceholder("Enter admin password")).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

  test("shows error on invalid password", async ({ page }) => {
    // 1. Navigate to /admin
    await page.goto("/admin");
    // 2. Enter an incorrect password in the password field
    await page.getByPlaceholder("Enter admin password").fill("wrongpassword");
    // 3. Click the Login button
    await page.getByRole("button", { name: /login/i }).click();
    // 4. Error message is displayed
    await expect(page.getByText(/invalid password/i)).toBeVisible();
    // 5. Login form remains visible
    await expect(page.getByPlaceholder("Enter admin password")).toBeVisible();
  });

  test("shows admin table after successful login", async ({ page }) => {
    // 1. Navigate to /admin
    await page.goto("/admin");
    // 2. Enter the correct admin password
    await page
      .getByPlaceholder("Enter admin password")
      .fill(process.env.ADMIN_PASSWORD || "admin123");
    // 3. Click the Login button
    await page.getByRole("button", { name: /login/i }).click();
    // 4. Admin dashboard is displayed
    await expect(page.getByRole("heading", { name: /^admin$/i })).toBeVisible();
    // 5. Logout button is present
    await expect(page.getByRole("button", { name: /logout/i })).toBeVisible();
    // 6. Table with columns is visible
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByText(/time/i)).toBeVisible();
    await expect(page.getByText(/^ua$/i)).toBeVisible();
    // await expect(page.getByText(/device/i)).toBeVisible();
    await expect(page.getByText(/geo/i)).toBeVisible();
    await expect(page.getByText(/clientId/i)).toBeVisible();
  });

  test("logout returns to login form", async ({ page }) => {
    // 1. Log in as admin
    await page.goto("/admin");
    await page
      .getByPlaceholder("Enter admin password")
      .fill(process.env.ADMIN_PASSWORD || "admin123");
    await page.getByRole("button", { name: /login/i }).click();
    // 2. Click the Logout button
    await page.getByRole("button", { name: /logout/i }).click();
    // 3. User is returned to the login form
    await expect(
      page.getByRole("heading", { name: /admin login/i }),
    ).toBeVisible();
    await expect(page.getByPlaceholder("Enter admin password")).toBeVisible();
  });
});
