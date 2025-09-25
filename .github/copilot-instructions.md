# Copilot Instructions for Nextfolio

This document provides guidance for AI coding agents working on the Nextfolio project. Follow these instructions to ensure consistency, maintainability, and adherence to project conventions.

## Project Overview

Nextfolio is a clean, fast, and lightweight portfolio template built with:

- **Next.js** for the framework
- **Tailwind CSS** for styling
- **Vercel** for deployment

Key features include MDX support, light/dark mode toggle, dynamic OG image generation, SEO optimization, dynamic feed generation, and interactive embeds.

## Key Directories and Files

- **`app/`**: Contains the main application components and pages.
  - `layout.tsx`: Defines the global layout.
  - `page.tsx`: The homepage.
  - `sitemap.ts`: Handles dynamic sitemap generation for SEO.
  - `robots.ts`: Configures the `robots.txt` file.
- **`components/`**: Houses reusable UI components like `badge.tsx`, `footer.tsx`, and `theme-switch.tsx`.
- **`content/`**: Stores MDX blog posts.
- **`lib/`**: Utility functions and configurations, such as `config.ts` for site metadata and `supabase.ts` for database integration.
- **`public/`**: Static assets like images and PDFs.
- **`scripts/`**: Automation scripts, e.g., `deploy.sh` for deployment.

## Development Workflow

1. **Install Dependencies**: Use `pnpm` for dependency management.

   ```bash
   pnpm install
   ```

2. **Start Development Server**:

   ```bash
   pnpm dev
   ```

   The server runs at [http://localhost:3000](http://localhost:3000).

3. **Build for Production**:

   ```bash
   pnpm build
   ```

4. **Run Tests** (if applicable):
   Add test commands here if tests are implemented.

## Project-Specific Conventions

- **Component Structure**: Components are small, composable, and live under `app/components` or `components/ui`.
- **Styling**: Use Tailwind CSS for all styling. Avoid inline styles unless absolutely necessary.
- **Routing**: Follow Next.js conventions for file-based routing. Dynamic routes are used for blog posts (`[slug]/page.tsx`).
- **MDX Content**: Blog posts are written in MDX and stored in the `content/` directory.
- **SEO**: Update `app/config.ts` and `app/sitemap.ts` for metadata and sitemap changes.

## Integration Points

- **Supabase**: Used for database interactions. Configuration is in `lib/supabase.ts`.
- **Vercel**: Deployment platform. Ensure `vercel.json` is configured if custom settings are needed.
- **Dynamic Feeds**: RSS, Atom, and JSON feeds are auto-generated.

## Examples of Common Patterns

- **Adding a New Component**:

  1. Create the component in `components/`.
  2. Use Tailwind CSS for styling.
  3. Export the component and import it where needed.

- **Adding a Blog Post**:

  1. Write the post in MDX format and save it in `content/`.
  2. Ensure the frontmatter includes `title`, `date`, and `description`.

- **Updating Metadata**:
  1. Modify `lib/config.ts` for global site settings.
  2. Update `app/sitemap.ts` for new routes.

## Guardrails for AI Agents

- **Read-First**: Propose edits before applying them.
- **Respect `.gitignore`**: Never commit ignored files or secrets.
- **Follow Conventions**: Adhere to the structure and patterns outlined above.
- **Log Actions**: Clearly log all changes and diffs.

For more details, refer to the [README.md](../README.md) or specific files in the codebase.

## Rules to follow

1. **KISS**: Keep it simple stupid
