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

## How to Ask an Agent
Describe:
1) What you want ("add a primary Button component")
2) Where it belongs (path)
3) Any constraints (variants, sizes)

The agent will:
- Propose a plan
- Implement minimal code
- Run lint checks
- Summarize changes

 