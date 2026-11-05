import { NextRequest } from "next/server";
import { describe, expect, test } from "vitest";
import { shouldProcessRequest } from ".";

const createRequest = (path: string, referer?: string) => {
  const request = new NextRequest(`https://erlich.dev${path}`);
  if (referer) request.headers.set("referer", referer);
  return request;
};

type PdfCase = [path: string, referer?: string];

describe("shouldProcessRequest", () => {
  describe("PDF requests are always processed", () => {
    test.each<PdfCase>([
      ["/cv.pdf", undefined],
      ["/media/cv.pdf", undefined],
      ["/cv.pdf?download=1", undefined],
      ["/cv.pdf", "https://erlich.dev/blog"],
      ["/cv.pdf", "http://localhost:3000/about"],
      ["/cv.pdf", "https://my-deploy.vercel.app"],
      ["/cv.pdf", "https://www.google.com/search?q=erlich"],
    ])("%s (referer: %s)", (path, referer) => {
      const result = shouldProcessRequest(createRequest(path, referer));
      expect(result).toBe(true);
    });
  });

  describe("page requests", () => {
    test("are processed on direct visits (no referer)", () => {
      const result = shouldProcessRequest(createRequest("/dashboard"));
      expect(result).toBe(true);
    });

    test.each([
      "https://www.google.com/search?q=erlich",
      "https://x.com/someone/status/123",
      "https://docs.python.org/3/library/http.html",
    ])("are processed for external referer %s", (referer) => {
      const result = shouldProcessRequest(createRequest("/blog", referer));
      expect(result).toBe(true);
    });

    test.each([
      "https://erlich.dev",
      "https://erlich.dev/blog?source=nav",
      "http://localhost:3000",
      "http://localhost:3000/dashboard",
      "https://my-deploy.vercel.app",
    ])("are ignored for own-origin referer %s", (referer) => {
      const result = shouldProcessRequest(createRequest("/dashboard", referer));
      expect(result).toBe(false);
    });
  });
});
