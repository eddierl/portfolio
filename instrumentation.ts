import * as Sentry from "@sentry/nextjs";

// Increase the default max listeners (10) to avoid warnings from Next.js,
// Sentry, and graphql-yoga registering close listeners on ServerResponse.
// See: https://nodejs.org/api/events.html#eventssetmaxlistenersn
// Only run in Node.js runtime — not available in Edge.
if (process.env.NEXT_RUNTIME === "nodejs") {
  process.setMaxListeners(20);
}

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
