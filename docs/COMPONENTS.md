# Components

## Page Components

### `app/page.tsx` — Home Page

Renders the hero section with:
1. Greeting heading with wave animation emoji
2. Intro paragraph (`.lede`) — "Senior software engineer with 10+ years of experience, transitioning into AI-powered application development."
3. `<Poem>` component for the poem content
4. "Recent Posts" section showing the 2 most recent blog posts

**Key decisions:**
- Reads `content/hero.mdx` server-side via `readMDXFile()`
- Uses `getBlogPosts().slice(0, 2)` for recent posts
- Blog posts are `<Link>` elements with `className="card block"`
- Vertical rhythm: `h1 (mb-6)` → `lede (mt-3)` → `Poem (mt-4, mb-10)` → `Recent Posts (mt-10)`

### `app/blog/page.tsx` — Blog Listing

Renders all published blog posts as cards, sorted by date. Same card layout as the home page's "Recent Posts" section.

### `app/skills/page.tsx` — Skills

Renders skill groups from `app/lib/skills.ts` (static data).

### `app/photos/page.tsx` — Photo Gallery

Renders photos from `public/photos/`.

## UI Components

### `app/components/poem.tsx`

Renders poem content with stanza-aware layout.

**How it works:**
1. Splits content by `\n\n` (double newline = stanza break)
2. Each stanza wrapped in a `<div>` with `space-y-3` (12px between stanzas)
3. Lines within a stanza split by `\n`, each wrapped in `<p className="leading-relaxed">`
4. Accepts `className` prop for outer margin control

**Styling:**
- `text-[var(--color-dim)]` — muted, dark text
- `italic` — italic font style
- `space-y-3` — 12px gap between stanzas

### `app/components/nav.tsx` — Navbar

Server component that renders:
- Site logo/title (links to home)
- Navigation links: Home, Blog, Skills, Resume
- Admin link (conditionally rendered when authenticated)
- Theme switcher (dark/light toggle)

**Note:** The Resume link points to a "fake" blog post path (`/blog/fake-post-just-to-make-a-link-to-my-cv`) that serves the CV PDF.

### `app/components/footer.tsx`

Renders:
- Avocado emoji copyright line
- Social links (GitHub, LinkedIn, Email) as icons

**Note:** Uses Tailwind v4 shorthand syntax `text-(--color-muted)` which is the recommended way to reference theme tokens in utility classes.

### `app/components/badge.tsx`

Renders a "New" badge for recent blog posts (posts less than 1 week old).

### `app/components/theme-switch.tsx`

Client component that toggles dark/light mode.

### `app/components/update-last-seen.tsx`

Displays "last updated" timestamp for the home page.

### `app/components/mdx.tsx`

MDX renderer that handles:
- Custom links (internal → `<Link>`, external → `<a>`)
- Rounded images with blur-up placeholder
- Code syntax highlighting via `sugar-high`
- Custom components: `<Caption>`, `<Figure>`, `<ImageGrid>`, `<Tweet>`, `<YouTube>`

## Content

### `content/hero.mdx`

The home page's poem and intro text. Parsed as raw text (no MDX rendering) and passed to the `<Poem>` component.

Frontmatter:
```yaml
title: About Eddie
```

Body: Free-form poem text. Stanza breaks are `\n\n`, line breaks within a stanza are `\n`.

### Blog Posts (`content/*.mdx`)

Each blog post has frontmatter:
```yaml
title: Post Title
publishedAt: 2024-01-15
isDraft: false
summary: Brief description
tags: tag1, tag2
image: /path/to/image.png  # optional
```
