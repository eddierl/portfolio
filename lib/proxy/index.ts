import type { NextRequest } from "next/server";

const ignorePatterns = [
  "erlich.dev",
  "http://localhost",
  "vercel.app",
] as const;

export const shouldProcessRequest = (request: NextRequest) => {
  const url = new URL(request.url);

  const isPdf = url.pathname.endsWith(".pdf");
  const referer = request.headers.get("referer");

  // Ignore traffic coming from our own origins: internal navigation
  // (own domain, local dev, preview deployments) should not be logged.
  const isOwnOrigin =
    referer !== null &&
    ignorePatterns.some((pattern) => referer.includes(pattern));

  // Everything else is processed: PDFs (always, even from our own
  // site), direct visits (no referer) and external referrers.
  return isPdf || !isOwnOrigin;
};
