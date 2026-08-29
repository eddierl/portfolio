import { expect, test } from "@playwright/test";
import { CV_FILE_NAME } from "@/lib/constants";

test.describe("Resume", () => {
  test("open new url when user going to old url", async ({ page }) => {
    // Navigating directly to a PDF makes the browser download it instead of
    // rendering it, which makes page.goto() reject with "Download is
    // starting". Expect the download and ignore only that rejection.
    const download = page.waitForEvent("download");
    const goto = page
      .goto("/Edward_Erlich_-_Senior_Software_Engineer_CV.pdf")
      .catch((error: Error) => {
        if (!error.message.includes("Download is starting")) {
          throw error;
        }
      });

    const file = await download;
    await goto;

    // The 308 redirect should land on the current CV file, which is then
    // downloaded. (page.url() stays "about:blank" because the navigation
    // never completes as a page load, so assert on the download URL instead.)
    expect(new URL(file.url()).pathname).toBe(CV_FILE_NAME);
    expect(file.suggestedFilename()).toBe(CV_FILE_NAME.slice(1));
  });
});
