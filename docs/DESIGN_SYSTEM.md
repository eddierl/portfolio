# Design System

## Theme Tokens (Tailwind v4 `@theme`)

All design tokens are registered in `app/globals.css` inside a `@theme` block. This is Tailwind v4's recommended approach — it makes tokens available both as Tailwind utilities and as CSS custom properties.

### Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-ink` | `#ffffff` | `#0a0a0a` | Page background |
| `--color-panel` | `#f5f5f5` | `#ffffff07` | Card backgrounds, chips |
| `--color-border` | `#e5e7eb` | `#ffffff1a` | Borders, grid lines |
| `--color-text` | `#0a0a0a` | `#e8efec` | Primary text |
| `--color-dim` | `#525252` | `#b3c2bd` | Secondary/lede text |
| `--color-muted` | `#737373` | `#8b9a95` | Meta text (blog dates) |
| `--color-accent` | `#5a9a52` | `#8bc34a` | **Primary accent (green)** |
| `--color-accent-dim` | `#4a7c42` | `#66bb6a` | Muted accent |
| `--color-glow` | `#66bb6a` | `#9ccc65` | Background glow gradient |
| `--color-popover` | `#ffffff` | `#0a0a0a` | Tooltip/popover bg |
| `--color-popover-foreground` | `#0a0a0a` | `#fafafa` | Tooltip text |

### Syntax Highlighting

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-sh-class` | `#2d5e9d` | `#4c97f8` | Code class names |
| `--color-sh-identifier` | `#354150` | `white` | Code identifiers |
| `--color-sh-string` | `#007f7a` | `#0fa295` | String literals |
| `--color-sh-keyword` | `#e02518` | `#f47067` | Keywords |
| `--color-sh-comment` | `#a19595` | `#a19595` | Comments |
| `--color-sh-property` | `#e25a1c` | `#e25a1c` | Properties |
| `--color-sh-entity` | `#e25a1c` | `#e25a1c` | HTML entities |
| `--color-sh-sign` | `#8996a3` | `#8996a3` | Punctuation |
| `--color-sh-jsxliterals` | `#6266d1` | `#6266d1` | JSX literals |

## Variable Naming Convention

**All CSS custom properties follow the `--color-*` prefix.** This is mandatory for Tailwind v4 `@theme` to register them as utilities.

```css
/* ✅ Correct — registered in @theme */
--color-accent: #5a9a52;

/* ❌ Wrong — not registered, breaks Tailwind utilities */
--accent: #5a9a52;
```

When referencing these variables in CSS, always use the full name:

```css
/* ✅ Correct */
color: var(--color-accent);
background: var(--color-panel);

/* ❌ Wrong — shorthand names don't exist */
color: var(--accent);
```

In Tailwind arbitrary values, use the same full names:

```tsx
// ✅ Correct
className="text-(--color-text)"
className="bg-panel"

// ❌ Wrong
className="text-(--text)"
```

## Custom CSS Classes

| Class | Purpose |
|-------|---------|
| `.card` | Blog post / skill container with border, padding, hover effect |
| `.skill-chip` | Inline skill badge with rounded corners |
| `.badge-new` | "New" indicator for recent posts |
| `.section-heading` | Section titles (e.g., "Recent Posts", "Skills") |
| `.blog-meta` | Blog post metadata (reading time, date) |
| `.eyebrow` | Small uppercase accent label |
| `.hero h1` | Home page heading with wave animation |
| `.hero .lede` | Intro paragraph (max 42ch width) |
| `.glow` | Background radial gradient |
| `.grid-bg` | Background grid pattern |
| `.toaster` | Sonner toast notifications |

## Responsive Design

- Content max-width: `800px` (`.content-max`)
- Lede text: `clamp(1rem, 2.2vw, 1.2rem)`, max `42ch`
- Hero heading: `clamp(2.25rem, 6vw, 3.5rem)`
- Grid background: `48px` spacing, masked by radial gradient

## Dark Mode

Dark mode is toggled via the `.dark` class (set on `<html>`). The `.dark` block in `globals.css` overrides all token values. It must be **outside** the `@theme` block (Tailwind v4 requirement).

## Typography

- Uses `@tailwindcss/typography` plugin for blog content
- Custom `leading-relaxed` on poem lines
- `text-wrap: balance` on titles
- Reduced motion respected via `prefers-reduced-motion`
