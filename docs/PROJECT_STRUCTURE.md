# Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard (protected)
│   │   ├── [clientId]/page.tsx   # Admin content page
│   │   ├── actions.ts            # Server actions for admin
│   │   └── page.tsx              # Admin login/listing
│   ├── api/                      # API routes
│   │   ├── graphql/route.ts      # GraphQL endpoint
│   │   └── log/route.ts          # Logging endpoint
│   ├── blog/                     # Blog sections
│   │   ├── [slug]/page.tsx       # Individual blog post
│   │   └── page.tsx              # Blog listing (uses card class)
│   ├── components/               # Reusable UI components
│   │   ├── mdx.tsx               # MDX renderer with custom components
│   │   ├── nav.tsx               # Navbar with nav links
│   │   ├── footer.tsx            # Footer with social links
│   │   ├── poem.tsx              # Poem renderer (stanza-aware)
│   │   ├── skill-groups.tsx      # Skills display
│   │   ├── badge.tsx             # "New" badge component
│   │   ├── caption.tsx           # Image caption wrapper
│   │   ├── figure.tsx            # Figure/image wrapper
│   │   ├── tweet.tsx             # Tweet embed
│   │   ├── youtube.tsx           # YouTube embed
│   │   ├── image-grid.tsx        # Photo grid
│   │   ├── theme-switch.tsx      # Dark/light mode toggle
│   │   ├── update-last-seen.tsx  # "Last updated" indicator
│   │   └── cv/                   # CV/PDF generation components
│   ├── feed/[format]/route.ts    # RSS/Atom feed
│   ├── og/route.tsx              # Open Graph image generation
│   ├── globals.css               # Global styles + Tailwind @theme
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (hero + recent posts)
│   ├── skills/page.tsx           # Skills page
│   ├── photos/page.tsx           # Photo gallery
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   └── lib/                      # Business logic
│       ├── config.ts             # Site metadata & social links
│       ├── posts.ts              # MDX blog post reading/parsing
│       ├── skills.ts             # Skills data (static)
│       ├── drizzle/              # Database schema & client
│       ├── image/                # Image processing utilities
│       ├── jwt.ts                # JWT authentication
│       ├── neon.ts               # Neon database client
│       ├── supabase.ts           # Supabase client
│       ├── apollo-client.ts      # GraphQL client
│       └── types.ts              # Shared TypeScript types
├── content/                      # Blog posts & hero content (MDX)
│   ├── hero.mdx                  # Home page poem & intro text
│   └── *.mdx                     # Blog posts with frontmatter
├── public/                       # Static assets
│   ├── icons/                    # Tech stack SVG icons
│   ├── photos/                   # Photo gallery images
│   └── *.png / *.svg / *.webp    # Logo, OG image, CV, etc.
├── scripts/
│   └── deploy.sh                 # Vercel deployment script
├── tests/                        # Playwright E2E tests
├── types/
│   └── svg.d.ts                  # TypeScript declaration for SVG imports
└── docs/                         # This directory
```

## Key Concepts

- **MDX content** lives in `content/`. Blog posts are parsed via `app/lib/posts.ts` which reads frontmatter (`title`, `publishedAt`, `isDraft`, `summary`, `tags`) and renders content through the MDX renderer in `app/components/mdx.tsx`.
- **The hero section** (`content/hero.mdx`) is read on the server and rendered on the home page. It contains both the poem text and the intro paragraph.
- **Tailwind v4** is used via `@theme` in `app/globals.css`. All design tokens are registered there and consumed via Tailwind utilities (e.g., `text-accent`, `bg-panel`) or arbitrary values (e.g., `text-[var(--color-text)]`).
- **Server actions** in `app/admin/actions.ts` handle authenticated operations.
- **Static data** like skills is defined in `app/lib/skills.ts` as a TypeScript array.
