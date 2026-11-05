import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    // Unit tests only. Playwright E2E specs live in tests/**.spec.ts
    // and are run separately via `pnpm test`.
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "tests"],
  },
});
