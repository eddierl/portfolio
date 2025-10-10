# AGENTS.md

## Project Overview

This is a Next.js application built with React Server Components, Tailwind CSS, TypeScript, Supabase, and other modern web technologies. It leverages the App Router for routing and data fetching.

## Setup Commands

- **Install dependencies:** `pnpm install`
- **Run development server:** `pnpm dev`
- **Build for production:** `pnpm build`
- **Start production server:** `pnpm start`

## Development Guidelines

- **Code Style:** Adhere to ESLint and Prettier configurations.
- **Component Structure:** Prefer functional components with hooks. Avoid class-based components.
- **Styling:** Use Tailwind CSS for styling. Prioritize mobile-first design. Avoid inline CSS unless absolutely necessary.
- **TypeScript:** Use TypeScript for all components and logic. Define types and interfaces clearly.
- **Data Fetching:** Utilize Next.js's built-in data fetching mechanisms (e.g., `async/await` in Server Components, `fetch` in Client Components, or a dedicated data layer if applicable).
- **Client Components:** Minimize the use of `'use client'`. Wrap client components in `<Suspense>` with lightweight fallbacks. Use `next/dynamic` for non-critical client components with `ssr: false` when appropriate.
- **Images:** Optimize images using `next/image`, specifying `width`, `height`, and `loading="lazy"`.
- **Error Handling:** Implement `try-catch` blocks and provide fallback UI for error scenarios.
- **Performance:** Consider `React.memo` for performance optimization in client components and analyze bundle size regularly.
- **Commits:** Follow conventional commit format (e.g., `fix: resolve issue` or `feat: add feature`).

## Testing Instructions

- **Run all tests:** `pnpm test`

## Key Directories

- `app/`: Contains the App Router routes and page components.
- `components/`: Reusable React components.
- `lib/`: Utility functions and helper modules.
- `public/`: Static assets.
- `styles/`: Global styles or Tailwind CSS configuration.

## Common Workflows

- **Creating a new page:** Create a new folder within `app/` and add a `page.tsx` file.
- **Adding a new API route:** Create a new folder within `app/api/` and add a `route.ts` file.
- **Fetching data:** Use `fetch` directly in Server Components or dedicated data fetching libraries/utilities.

## Additional Notes

- Refer to the official Next.js documentation for detailed guidance on specific features and best practices.
- Ensure all commits pass CI checks before merging.

# Agents

This project uses AI agents to help with common maintenance and development tasks. Keep agents simple, safe, and focused. When in doubt, prefer read-only actions and require human approval for any write operations.

## Goals

- Keep content and UX consistent
- Automate repetitive tasks (formatting, link checks, sitemap/feed updates)
- Never leak secrets; never write binary artifacts

## Guardrails

- Read-first. Propose edits before applying
- Log actions to console with clear diff summaries
- Respect .gitignore and never commit secrets
- Use absolute paths when running commands

## Typical Agent Tasks

- Content: add blog post boilerplate, validate frontmatter, check broken links
- Housekeeping: update sitemap/robots/feed, optimize images
- Code: create small UI components, refactor duplicated code, add tests

## Conventions

- Components live under `app/components` or `components/ui`
- Prefer small, composable components with clear props
- Follow project TypeScript and formatting rules
- Componentization: Use components for every need that can be a component
- File Granularity: Do your best for not having files with more than 100 lines

## How to Ask an Agent

Describe:

1. What you want ("add a primary Button component")
2. Where it belongs (path)
3. Any constraints (variants, sizes)

The agent will:

- Propose a plan
- Implement minimal code
- Run lint checks
- Summarize changes
- At the end of each task, run build, then test, with lint running in parallel

## When stuck

- ask a clarifying question, propose a short plan
