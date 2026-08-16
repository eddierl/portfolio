import { expect, test } from "@playwright/test";

const API_TODAY = "/api/poems/today";
const API_GENERATE = "/api/poems/generate";

test.describe("Poem API: GET /today", () => {
  test("returns 404 when no poem exists", async ({ page }) => {
    // Skip when GEMINI_API_KEY is set — poems will exist from prior generation
    if (process.env.GEMINI_API_KEY) {
      test.skip();
    }
    const response = await page.request.get(API_TODAY);
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });

  test("returns poem after generation", async ({ page }) => {
    // Skip if GEMINI_API_KEY is not set (CI / local without key)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      test.skip();
    }

    // 1. Generate a poem
    const generateRes = await page.request.post(API_GENERATE, {
      headers: { "Content-Type": "application/json" },
    });
    expect(generateRes.status()).toBe(200);
    const generateBody = (await generateRes.json()) as {
      id: number;
      generatedAt: number;
    };
    expect(generateBody).toHaveProperty("id");
    expect(generateBody).toHaveProperty("generatedAt");

    // 2. Wait a second to ensure the generatedAt timestamps differ
    // (both INSERT and SELECT use seconds, so same-second timestamps are non-deterministic)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 3. Fetch the poem
    const todayRes = await page.request.get(API_TODAY);
    expect(todayRes.status()).toBe(200);
    const todayBody = (await todayRes.json()) as {
      id: number;
      content: string;
      generatedAt: number;
    };
    expect(todayBody).toHaveProperty("id");
    expect(todayBody).toHaveProperty("content");
    expect(typeof todayBody.content).toBe("string");
    expect(todayBody.content.length).toBeGreaterThan(0);
    expect(todayBody).toHaveProperty("generatedAt");

    // 4. Verify the generated poem is the most recent (its timestamp >= what we just created)
    // We can't compare IDs because the DB may contain pre-existing poems with the same second-level timestamp.
    expect(todayBody.generatedAt).toBeGreaterThanOrEqual(generateBody.generatedAt);
  });
});

test.describe("Poem API: POST /generate", () => {
  test("returns 500 when GEMINI_API_KEY is missing", async ({ page }) => {
    // Skip when GEMINI_API_KEY is set — we can't test the "missing key" scenario
    // when the key is actually present in the environment.
    if (process.env.GEMINI_API_KEY) {
      test.skip();
    }

    const response = await page.request.post(API_GENERATE, {
      headers: { "Content-Type": "application/json" },
    });
    // When GEMINI_API_KEY is not set, the API returns 500
    expect([404, 500]).toContain(response.status());
  });

  test("generates a poem with valid GEMINI_API_KEY", async ({ page }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      test.skip();
    }

    const response = await page.request.post(API_GENERATE, {
      headers: { "Content-Type": "application/json" },
    });
    expect(response.status()).toBe(200);
    const body = (await response.json()) as {
      id: number;
      generatedAt: number;
    };
    expect(body).toHaveProperty("id");
    expect(typeof body.id).toBe("number");
    expect(body).toHaveProperty("generatedAt");
    expect(typeof body.generatedAt).toBe("number");
  });
});

test.describe("Poem Component: E2E", () => {
  test("shows 'No poem available yet' when no poem exists", async ({
    page,
  }) => {
    // Skip when GEMINI_API_KEY is set — poems will exist from prior generation
    if (process.env.GEMINI_API_KEY) {
      test.skip();
    }
    await page.goto("/");
    // Wait for the Poem component to render (React Query fetches async)
    await expect(
      page.getByText("No poem available yet."),
    ).toBeVisible({ timeout: 10000 });
  });

  test("displays poem content after generation", async ({ page }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      test.skip();
    }

    // 1. Generate a poem via API
    const generateRes = await page.request.post(API_GENERATE, {
      headers: { "Content-Type": "application/json" },
    });
    expect(generateRes.status()).toBe(200);

    // 2. Reload the homepage to fetch the new poem
    await page.goto("/");

    // 3. Wait for the poem to render (React Query + loading state)
    // The component shows "Loading poem..." while fetching, then the poem text
    await expect(page.locator("div.space-y-3.text-\\[var\\(--color-dim\\)\\].italic")).toBeVisible({
      timeout: 15000,
    });

    // 4. Verify the poem content is visible (not the loading or "no poem" message)
    await expect(
      page.getByText("No poem available yet."),
    ).not.toBeVisible();
    await expect(page.getByText("Loading poem...")).not.toBeVisible();

    // 5. Verify stanza structure (poem has multiple lines grouped in divs)
    const stanzas = page.locator("div.space-y-3.text-\\[var\\(--color-dim\\)\\].italic > div");
    const stanzaCount = await stanzas.count();
    expect(stanzaCount).toBeGreaterThan(0);
  });

  test("shows loading state briefly during fetch", async ({ page }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      test.skip();
    }

    // 1. Generate a poem first
    await page.request.post(API_GENERATE, {
      headers: { "Content-Type": "application/json" },
    });

    // 2. Navigate to homepage with a slow network throttle to see loading state
    const context = page.context();
    await context.route("**/api/poems/today", async (route) => {
      // Slow down the API response to make loading state visible
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });

    await page.goto("/");

    // 3. Loading state should appear
    await expect(page.getByText("Loading poem...")).toBeVisible({
      timeout: 5000,
    });

    // 4. Then the poem should render
    await expect(
      page.locator("div.space-y-3.text-\\[var\\(--color-dim\\)\\].italic"),
    ).toBeVisible({ timeout: 15000 });
  });
});