# CRASH Lab Design System

## Scope

This document describes the current-state frontend design system for the public
CRASH Lab website. It is a code-derived reference for shared styling
infrastructure, tokens, UI primitives, variant patterns, accessibility
practices, and known inconsistencies.

It is intentionally descriptive rather than aspirational.

- In scope: `app/(marketing)`, `app/globals.css`, `tailwind.config.ts`,
  `app/layout.tsx`, `lib/utils/cn.ts`, and shared component folders under
  `components/`.
- Out of scope: Sanity schemas, content modeling, SEO schema content,
  application logic, and refactor proposals beyond brief maintenance notes.
- Current implementation status: light-first marketing site with a shared token
  layer, shared utility classes, and a mix of reusable primitives plus
  highly-art-directed composite sections.

## Source Of Truth

### Core files

| Path                 | Role                         | Notes                                                                                                                                             |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/globals.css`    | Raw design token source      | Defines `:root` CSS variables, base styles, component utility classes, custom cursor, trust logo slideshow styles, and other global behaviors.    |
| `tailwind.config.ts` | Semantic Tailwind bridge     | Maps many CSS variables into semantic Tailwind color, font, radius, and shadow utilities; also defines a few fixed palettes directly in config.   |
| `app/layout.tsx`     | Font wiring and global shell | Loads `Space_Grotesk`, `Inter`, and `JetBrains_Mono` via `next/font/google` and binds them to `--font-display`, `--font-sans`, and `--font-mono`. |
| `lib/utils/cn.ts`    | Class composition helper     | Wraps `clsx` and `tailwind-merge` so shared components can compose Tailwind classes safely.                                                       |
| `postcss.config.js`  | Tailwind/PostCSS pipeline    | Tailwind and Autoprefixer only.                                                                                                                   |

### Shared component folders

| Path                  | Role                   | Notes                                                                                          |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| `components/ui`       | Primitive layer        | Reusable React primitives and small visual utilities.                                          |
| `components/layout`   | Shared shell/chrome    | Navbar, footer, mobile menu, brand mark, banner, and section-level error boundary.             |
| `components/sections` | Styled composites      | Reusable but visually opinionated sections and content modules used across the marketing site. |
| `components/blog`     | Blog-specific renderer | Blog content rendering helper that follows the same typography/color system.                   |
| `components/seo`      | Non-visual support     | Present in the repo, but not part of the visual design system.                                 |

## Tailwind Theme And Token Sources

The design system is primarily driven by CSS variables in `app/globals.css`.
Tailwind mostly exposes semantic aliases over those variables rather than owning
the token values itself.

### Tailwind content scanning

Tailwind scans:

- `./app/**/*.{ts,tsx}`
- `./components/**/*.{ts,tsx}`
- `./lib/**/*.{ts,tsx}`
- `./hooks/**/*.{ts,tsx}`
- `./types/**/*.{ts,tsx}`

### Tailwind theme extensions

| Theme area                 | Tailwind keys                                                                                     | Backing source                       | Notes                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------- | ------- | ---------------------------- | ------------- | ------------------------------------------------- |
| Fixed palette              | `navy.800`, `navy.900`                                                                            | hardcoded in `tailwind.config.ts`    | `#111d33`, `#0c1527`                                     |
| Fixed palette              | `steel.50` to `steel.700`                                                                         | hardcoded in `tailwind.config.ts`    | Supporting neutral blue-gray scale                       |
| Fixed palette              | `brand.blue`                                                                                      | hardcoded in `tailwind.config.ts`    | `#2f5f8d`                                                |
| Semantic background colors | `bg.primary`, `bg.surface`, `bg.elevated`                                                         | CSS variables                        | Produces utilities like `bg-bg-primary`                  |
| Semantic surface colors    | `surface.canvas`, `surface.panel`, `surface.shell`, `surface.strong`                              | CSS variables                        | Used heavily across buttons, panels, and layout sections |
| Semantic text colors       | `text.primary`, `text.secondary`, `text.tertiary`, `text.default`, `text.muted`, `text.on-strong` | CSS variables                        | Primary content color layer                              |
| Semantic border colors     | `border.DEFAULT`, `border.subtle`, `border.default`, `border.focus`                               | CSS variables                        | Feeds both border colors and focus rings                 |
| Semantic accent colors     | `accent.cyan`, `accent.orange`, `accent.green`, `accent.yellow`                                   | CSS variables                        | Used for emphasis, categories, and highlights            |
| Semantic status colors     | `status.neutral                                                                                   | info                                 | success                                                  | warning | error.{surface,border,text}` | CSS variables | Powers status badges, feedback, and domain badges |
| Fonts                      | `fontFamily.display`, `fontFamily.sans`, `fontFamily.mono`                                        | CSS variables from `app/layout.tsx`  | Bound to `Space Grotesk`, `Inter`, and `JetBrains Mono`  |
| Radii                      | `borderRadius.token-xs`, `token-sm`, `token-md`, `token-pill`                                     | CSS variables                        | Shared rounded corners and pill shapes                   |
| Shadows                    | `boxShadow.glow`, `panel`, `soft`                                                                 | CSS variables                        | Shared elevation and glow effects                        |
| Background image           | `backgroundImage.hero-grid`                                                                       | CSS variables inside gradient string | Decorative gradient mesh                                 |

### Tailwind plugins

- `@tailwindcss/forms`
- `@tailwindcss/typography`

These are active in `tailwind.config.ts`. The site uses them most clearly
through form controls and the `prose` class in
`components/sections/PortableTextContent.tsx`.

### Tailwind helper

`lib/utils/cn.ts` defines:

```ts
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

This helper is part of the styling infrastructure because shared components
depend on it to compose conditional classes without duplicate Tailwind utilities.

## CSS Variable System

All documented variables below come from the `:root` block in `app/globals.css`.
There are no alternate theme scopes or dark-mode overrides in the current code.

### Shape and motion tokens

| Variable                    | Value    | Notes                                                                                         |
| --------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `--radius-xs`               | `8px`    | Mapped to `rounded-token-xs`                                                                  |
| `--radius-sm`               | `12px`   | Mapped to `rounded-token-sm`                                                                  |
| `--radius-md`               | `16px`   | Mapped to `rounded-token-md`                                                                  |
| `--radius-lg`               | `9999px` | Mapped to `rounded-token-pill`                                                                |
| `--motion-duration-instant` | `150ms`  | Defined, but not promoted into Tailwind theme                                                 |
| `--motion-duration-fast`    | `300ms`  | Defined, but most motion still uses literal durations in class names or Framer Motion configs |
| `--motion-duration-normal`  | `500ms`  | Defined, but not centrally consumed                                                           |

### Core color tokens

| Variable                       | Value                     | Notes                                                   |
| ------------------------------ | ------------------------- | ------------------------------------------------------- |
| `--color-bg-primary`           | `#fafaf8`                 | Backing source for `bg-bg-primary`                      |
| `--color-bg-surface`           | `#ffffff`                 | Backing source for `bg-bg-surface`                      |
| `--color-bg-elevated`          | `#f3f4f6`                 | Backing source for `bg-bg-elevated`                     |
| `--color-bg-overlay`           | `rgba(15, 23, 42, 0.2)`   | Defined directly in CSS; not mapped into Tailwind       |
| `--color-border`               | `#e5e7eb`                 | Backing source for `border-border`                      |
| `--color-border-subtle`        | `#eef2f7`                 | Backing source for `border-border-subtle`               |
| `--color-text-primary`         | `#0f172a`                 | Backing source for `text-text-primary`                  |
| `--color-text-secondary`       | `#6b7280`                 | Backing source for `text-text-secondary`                |
| `--color-text-tertiary`        | `#94a3b8`                 | Backing source for `text-text-tertiary`                 |
| `--color-text-inverse`         | `#ffffff`                 | Defined directly in CSS; not exposed via Tailwind alias |
| `--color-accent-cyan`          | `#234c6a`                 | Backing source for `text-accent-cyan` and related uses  |
| `--color-accent-cyan-muted`    | `rgba(35, 76, 106, 0.1)`  | Used in backgrounds and decorative gradients            |
| `--color-accent-orange`        | `#ea580c`                 | Accent/orange highlight                                 |
| `--color-accent-orange-muted`  | `rgba(234, 88, 12, 0.08)` | Decorative muted orange surface                         |
| `--color-accent-green`         | `#059669`                 | Accent/success green                                    |
| `--color-accent-green-muted`   | `rgba(5, 150, 105, 0.08)` | Decorative muted green surface                          |
| `--color-accent-yellow`        | `#b45309`                 | Accent/warning yellow                                   |
| `--color-accent-yellow-muted`  | `rgba(180, 83, 9, 0.1)`   | Decorative muted yellow surface                         |
| `--color-accent-yellow-border` | `rgba(180, 83, 9, 0.18)`  | Defined directly in CSS; not mapped into Tailwind       |
| `--color-surface-canvas`       | `#fafaf8`                 | Backing source for `bg-surface-canvas`                  |
| `--color-surface-panel`        | `#ffffff`                 | Backing source for `bg-surface-panel`                   |
| `--color-surface-shell`        | `#234c6a`                 | Backing source for `bg-surface-shell`                   |
| `--color-surface-strong`       | `#234c6a`                 | Backing source for `bg-surface-strong`                  |
| `--color-text-default`         | `#0f172a`                 | Backing source for `text-text-default`                  |
| `--color-text-muted`           | `#6b7280`                 | Backing source for `text-text-muted`                    |
| `--color-text-on-strong`       | `#ffffff`                 | Backing source for `text-text-on-strong`                |
| `--color-border-default`       | `#e5e7eb`                 | Backing source for `border-border-default`              |
| `--color-border-focus`         | `#234c6a`                 | Backing source for `border-border-focus`                |
| `--color-focus-ring`           | `rgba(35, 76, 106, 0.18)` | Used directly in form focus box-shadows                 |
| `--color-overlay-scrim`        | `rgba(15, 23, 42, 0.5)`   | Used by `MobileMenu` overlay                            |

### Status tokens

| Variable                         | Value                     | Notes                              |
| -------------------------------- | ------------------------- | ---------------------------------- |
| `--color-status-neutral-surface` | `#f8fafc`                 | Neutral status background          |
| `--color-status-neutral-border`  | `#dbe1ea`                 | Neutral status border              |
| `--color-status-neutral-text`    | `#475569`                 | Neutral status text                |
| `--color-status-info-surface`    | `rgba(35, 76, 106, 0.1)`  | Info status background             |
| `--color-status-info-border`     | `rgba(35, 76, 106, 0.24)` | Info status border                 |
| `--color-status-info-text`       | `#234c6a`                 | Info status text                   |
| `--color-status-success-surface` | `rgba(5, 150, 105, 0.1)`  | Success status background          |
| `--color-status-success-border`  | `rgba(5, 150, 105, 0.24)` | Success status border              |
| `--color-status-success-text`    | `#047857`                 | Success status text                |
| `--color-status-warning-surface` | `rgba(180, 83, 9, 0.12)`  | Warning status background          |
| `--color-status-warning-border`  | `rgba(180, 83, 9, 0.24)`  | Warning status border              |
| `--color-status-warning-text`    | `#92400e`                 | Warning status text                |
| `--color-status-error-surface`   | `rgba(185, 28, 28, 0.08)` | Error status background            |
| `--color-status-error-border`    | `rgba(185, 28, 28, 0.22)` | Error status border                |
| `--color-status-error-text`      | `#b91c1c`                 | Error status text                  |
| `--color-status-error-ring`      | `rgba(185, 28, 28, 0.14)` | Used for invalid field focus rings |

### Feature-specific tokens

| Variable                        | Value                                                                                                                                                | Notes                                 |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `--color-cursor-fill`           | `rgba(15, 23, 42, 0.1)`                                                                                                                              | Custom cursor fill                    |
| `--color-cursor-border`         | `rgba(255, 255, 255, 0.9)`                                                                                                                           | Custom cursor inner border            |
| `--color-cursor-perimeter`      | `rgba(15, 23, 42, 0.18)`                                                                                                                             | Custom cursor outer ring source       |
| `--shadow-cursor`               | `0 0 0 1px var(--color-cursor-perimeter), 0 18px 40px rgba(15, 23, 42, 0.1)`                                                                         | Custom cursor shadow                  |
| `--radle-human-primary`         | `#0284c7`                                                                                                                                            | RadLE human bars/legend               |
| `--radle-human-secondary`       | `#0284c7`                                                                                                                                            | RadLE secondary human series          |
| `--radle-ai-primary`            | `#7c3aed`                                                                                                                                            | RadLE primary AI series               |
| `--radle-ai-secondary`          | `#7c3aed`                                                                                                                                            | RadLE secondary AI series             |
| `--radle-gap`                   | `#ea580c`                                                                                                                                            | RadLE gap series                      |
| `--radle-track`                 | `#e2e8f0`                                                                                                                                            | RadLE bar background track            |
| `--color-white`                 | `#ffffff`                                                                                                                                            | Direct-use helper token               |
| `--color-hero-mesh-secondary`   | `rgba(15, 23, 42, 0.05)`                                                                                                                             | Decorative hero mesh                  |
| `--color-card-gradient-surface` | `#ffffff`                                                                                                                                            | Defined for decorative gradients      |
| `--color-gradient-border-start` | `#ea580c`                                                                                                                                            | Decorative gradient start             |
| `--color-gradient-border-end`   | `#0284c7`                                                                                                                                            | Decorative gradient end               |
| `--navbar-bg-transparent`       | `transparent`                                                                                                                                        | Navbar state token                    |
| `--navbar-bg-solid`             | `rgba(250, 250, 248, 0.96)`                                                                                                                          | Navbar scrolled background            |
| `--navbar-border`               | `rgba(229, 231, 235, 0.92)`                                                                                                                          | Navbar scrolled border                |
| `--shadow-card`                 | `0 30px 80px rgba(15, 23, 42, 0.08)`                                                                                                                 | Defined, but not mapped into Tailwind |
| `--shadow-elevated`             | `0 4px 24px rgba(15, 23, 42, 0.12)`                                                                                                                  | Defined, but not mapped into Tailwind |
| `--shadow-panel`                | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 8px 30px 0px, rgba(35, 76, 106, 0.15) 0px 0px 40px 0px` | Backing source for `shadow-panel`     |
| `--shadow-soft`                 | `0 8px 24px rgba(15, 23, 42, 0.08)`                                                                                                                  | Backing source for `shadow-soft`      |
| `--shadow-glow`                 | `0 0 0 1px rgba(35, 76, 106, 0.12), 0 18px 40px rgba(35, 76, 106, 0.16)`                                                                             | Backing source for `shadow-glow`      |
| `--mesh-opacity`                | `0.06`                                                                                                                                               | Decorative mesh support               |
| `--logo-filter`                 | `none`                                                                                                                                               | Trust logo treatment                  |
| `--logo-filter-hover`           | `none`                                                                                                                                               | Trust logo hover treatment            |
| `--logo-opacity`                | `0.65`                                                                                                                                               | Trust logo default opacity            |
| `--logo-opacity-hover`          | `1`                                                                                                                                                  | Trust logo hover opacity              |

### Key observations

- The primary design token source is the CSS variable layer in `app/globals.css`.
- Tailwind exposes many of these variables semantically, but not all of them.
- Several variables are consumed directly via CSS or inline `style` props rather
  than through Tailwind utilities.
- There are no theme-specific overrides such as `[data-theme="dark"]` or
  alternate variable scopes.

## Typography And Spacing Conventions

Spacing is convention-based rather than tokenized. Radius and shadow are
tokenized; spacing is mostly repeated through shared Tailwind utility patterns.

### Typography conventions

| Pattern                | Common implementation                                        | Notes                                                                                           |
| ---------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Body default           | `font-sans text-text-default` on `body`                      | `font-sans` resolves to `Inter`                                                                 |
| Display headings       | `font-display`                                               | `Space Grotesk` for hero headings, section titles, and key display copy                         |
| Metric/meta typography | `font-mono`                                                  | `JetBrains Mono` for metrics, years, and technical labels                                       |
| Page hero headings     | `text-5xl lg:text-6xl`                                       | Common on page-level marketing routes such as About, News, Publications, Research, Join, People |
| Section headings       | `text-4xl lg:text-5xl`                                       | Common in content sections such as Problem, Proof, Collaborate, and featured panels             |
| Card/list titles       | `text-2xl` or `text-xl`                                      | Used in cards, preview lists, author blocks, and supporting modules                             |
| Eyebrow/meta labels    | `text-xs uppercase tracking-[0.18em]` to `tracking-[0.22em]` | Strong recurring convention across marketing surfaces                                           |
| Body copy              | `text-base leading-8` or `text-lg`                           | Long-form marketing/body text prefers relaxed line height                                       |

### Spacing and layout conventions

| Pattern                      | Common implementation                              | Notes                                                     |
| ---------------------------- | -------------------------------------------------- | --------------------------------------------------------- |
| Main content shell           | `mx-auto max-w-7xl px-6 lg:px-8`                   | Most shared sections use this exact container             |
| Narrow content widths        | `max-w-2xl`, `max-w-3xl`, `max-w-4xl`, `max-w-5xl` | Used to constrain headings, intros, and long-form content |
| Default section rhythm       | `py-8 lg:py-16`                                    | Most page sections and reusable sections start here       |
| Larger section rhythm        | `py-16 lg:py-24`                                   | Used on more prominent full-width sections                |
| Feature-heavy section rhythm | `py-24` or `py-28 lg:py-32`                        | Used where the section is more immersive or editorial     |
| Control sizing               | `h-11`, `h-12`, `px-4` to `px-7`                   | Shared controls mostly follow this pattern                |
| Pill shapes                  | `rounded-token-pill`                               | Common for buttons, badges, chips, and icon buttons       |

### Notable typography and spacing outliers

- `components/sections/PillarsSection.tsx` uses `font-serif` and many bespoke
  arbitrary values such as `text-[2rem]`, `text-[15.5px]`, and large custom
  dark-art-direction styles.
- `components/ui/Button.tsx` uses an `h-[58px]` large link size for some link
  variants.
- `components/sections/ContactPageForm.tsx` overrides button sizing and colors
  directly instead of using the base button styles unchanged.
- The codebase does not define spacing tokens. Repetition exists, but spacing is
  a convention, not a token system.

## Reusable UI Primitives

### `components/ui` inventory

| Component                    | Purpose                      | Notes                                                           |
| ---------------------------- | ---------------------------- | --------------------------------------------------------------- |
| `Button`                     | Primary action primitive     | Can render either `<button>` or `next/link` depending on `href` |
| `Badge`                      | Domain-specific status badge | Maps research/project statuses to status colors and labels      |
| `Card`                       | Minimal container wrapper    | Only adds `p-6`; it is not a full visual panel primitive        |
| `EmptyState`                 | Empty/error fallback block   | Used directly by `SectionErrorBoundary`                         |
| `MetricTile`                 | Metric display primitive     | Supports optional Lucide icon                                   |
| `ProofChip`                  | Small chip/pill primitive    | Supports filled and outline presentation                        |
| `PrincipalInvestigatorBadge` | Specialized identity badge   | App-specific, not a neutral generic primitive                   |
| `SectionLabel`               | Eyebrow + numbering label    | Encodes a recurring section intro pattern                       |
| `Skeleton`                   | Loading placeholder          | Visual placeholder with `animate-pulse`                         |
| `CustomCursor`               | Decorative interaction layer | Mounted globally in `app/layout.tsx`                            |
| `XIcon`                      | Icon utility                 | Used in footer and social links                                 |

### `components/ui/index.ts` barrel

The `components/ui` barrel exports:

- `Badge`
- `Button`
- `Card`
- `EmptyState`
- `MetricTile`
- `ProofChip`
- `PrincipalInvestigatorBadge`
- `SectionLabel`
- `Skeleton`

It does **not** export `CustomCursor` or `XIcon`, which are imported directly.

### Global CSS utility primitives

The site also relies on shared CSS utility classes from `app/globals.css`. These
are part of the design system even though they are not React components.

| Class                                                                         | Purpose                                       | Notes                                                 |
| ----------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| `.ui-focus-ring`                                                              | Focus-ring utility for canvas backgrounds     | Used on buttons, links, nav items, and shell controls |
| `.ui-focus-ring-panel`                                                        | Focus-ring utility for panel backgrounds      | Used on icon buttons/social links inside panels       |
| `.ui-panel`                                                                   | Opinionated panel container                   | More visually specific than the `Card` component      |
| `.ui-field`, `.ui-select`, `.ui-textarea`                                     | Shared form controls                          | Include hover, focus, and invalid-state styling       |
| `.ui-field-label`, `.ui-field-helper`, `.ui-field-error`, `.ui-field-success` | Shared field text styles                      | Used across form sections                             |
| `.ui-feedback`, `.ui-feedback--success`, `.ui-feedback--error`                | Feedback blocks                               | Shared status messaging containers                    |
| `.ui-chip`                                                                    | Neutral chip style                            | Generic chip/pill presentation                        |
| `.ui-status-badge`                                                            | Shared status badge base                      | Used by status-oriented badge-like components         |
| `.ui-choice-card`, `.ui-choice-pill`, `.ui-choice-control`                    | Multi-select and radio-style control patterns | Used in application/collaboration forms               |
| `.hero-mesh`                                                                  | Decorative background treatment               | Global reusable decorative class                      |

### Shared component layers beyond primitives

- `components/layout` is the shared navigation/chrome layer:
  `Navbar`, `MobileMenu`, `Footer`, `BrandMark`, `AnnouncementBanner`, and
  `SectionErrorBoundary`.
- `components/sections` is the reusable composite section layer. These are not
  neutral primitives; most are highly styled page modules.
- `components/blog/BlogContent.tsx` is a content renderer that applies the same
  typography and color system to structured blog content.

## Component Variants

Only a subset of shared components expose formal variants. In a few places,
domain-specific mappings behave like variants even when the API is not named
`variant`.

| Component             | Variant API                                                                                    | What changes                                                | Notes                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Button`              | `variant?: "primary" \| "secondary" \| "ghost" \| "outline"` and `size?: "sm" \| "md" \| "lg"` | Border, fill, text, hover state, sizing                     | Has separate class maps for native buttons and links; link styles are not identical to button styles |
| `ProofChip`           | `variant?: "filled" \| "outline"` and `size?: "sm" \| "md"`                                    | Surface treatment and padding/text size                     | Small, focused chip primitive                                                                        |
| `Badge`               | `status: ProjectStatus`                                                                        | Label and status tone                                       | Domain mapping over project statuses rather than a generic style prop                                |
| `TrustSignalsSection` | `variant?: "featured" \| "compact" \| "slideshow"`                                             | Layout, credential treatment, logo presentation             | `compact` is the default                                                                             |
| `PillarsSection`      | `variant: "summary" \| "detailed" \| "interactive"`                                            | Entire layout system, card structure, art direction         | These are effectively three distinct section designs under one API                                   |
| `RadleWidget`         | `variant?: "hero" \| "feature"` plus `compact?: boolean`                                       | Vertical rhythm, header/legend visibility, metric filtering | `compact` has the biggest visual effect; `variant` mainly adjusts padding                            |
| `LabMembersList`      | `variant?: "page" \| "project"`                                                                | Heading scale                                               | Uses local badge-tone mapping for member highlights                                                  |
| `BrandMark`           | `compact?: boolean`                                                                            | Gap, logo size, and text size                               | Boolean size variant rather than named enum                                                          |

### Variant notes by component

#### `Button`

- Supports both native button and `Link` rendering based on whether `href` is
  passed.
- Link and button variants use different internal style maps:
  `controlVariantClasses` vs `linkVariantClasses`.
- Link variants use hardcoded colors and shadows in a few places, so the visual
  contract is not purely token-driven.

#### `Badge`

- Not a generic badge system.
- It is specifically a research/project status badge with four states:
  `published`, `active`, `seeking-collaborators`, and `completed`.

#### `PillarsSection`

- `summary` and `detailed` align more closely with the shared light theme.
- `interactive` is a heavily bespoke dark section with many local styles,
  arbitrary values, and its own visual language.

#### `RadleWidget`

- `variant="hero"` and `variant="feature"` mostly control padding.
- `compact={true}` removes the header, legend, and gap metrics and shifts the
  component toward an embedded/widget use case.

## Theme And Dark Mode Handling

This frontend does **not** currently implement a real dark-mode system.

### What exists

- `app/globals.css` sets `color-scheme: light;`
- There are no `dark:` Tailwind utilities in active frontend code.
- There is no `ThemeProvider`.
- There is no `prefers-color-scheme` handling.
- There are no alternate CSS variable scopes for dark mode.

### What the UI actually does

- The application is globally light-first.
- Several sections introduce local dark presentation with bespoke classes and
  raw color usage:
  - `components/layout/Footer.tsx`
  - `components/sections/PillarsSection.tsx` interactive mode
  - `components/sections/RadleDashboard.tsx`
  - dark CTA blocks in `app/(marketing)/about/page.tsx`

### Practical implication

The site should be understood as:

- a light-theme site
- with local dark islands
- not a theme-switching design system

## Accessibility Patterns

The frontend includes several strong accessibility patterns, but they are not
fully centralized.

### Shared positive patterns

| Pattern                        | Implementation                                          | Examples                                                                           |
| ------------------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Focus visibility               | `.ui-focus-ring`, `.ui-focus-ring-panel`                | Buttons, links, nav items, social links, mobile menu actions                       |
| Form invalid state             | `aria-invalid`, `aria-describedby`, shared error styles | `ContactFormSection`, `JoinInterestForm`, `PartnerInterestForm`, `ContactPageForm` |
| Form status feedback           | `role="alert"` and `role="status"`                      | Shared form feedback blocks                                                        |
| Busy states                    | `aria-busy`                                             | Shared forms and some submit buttons                                               |
| Hidden trap field              | hidden honeypot with `tabIndex={-1}`                    | Shared form components                                                             |
| Menu/toggle state              | `aria-expanded`, `aria-haspopup`, `aria-controls`       | Navbar dropdowns, mobile menu, people/alumni toggle                                |
| Decorative content suppression | `aria-hidden="true"`                                    | Icons, decorative images, legends, visual-only blocks                              |
| Assistive-only content         | `sr-only`                                               | Trust logo slideshow exposes hidden descriptive content                            |
| Reduced motion support         | `@media (prefers-reduced-motion: reduce)`               | Disables smooth scroll and trust-logo marquee animation                            |
| Cursor escape hatch            | `[data-cursor="native"]`                                | Keeps native cursor behavior inside key interactive zones                          |

### Representative patterns in code

- Form controls in shared forms use `aria-invalid`, error IDs, and
  `aria-describedby` consistently.
- `TrustSignalsSection` handles duplicated slideshow content carefully by using
  `aria-hidden` and `tabIndex={-1}` on repeated logos while exposing a
  screen-reader-only list of logo names.
- `MobileMenu` and `Navbar` expose expansion state with `aria-expanded`.
- `PeopleDirectory` uses `aria-controls` and `aria-expanded` for the alumni
  reveal.
- `CustomCursor` is disabled on coarse pointers and avoids overriding the native
  cursor in declared safe zones.

### Accessibility gaps and caveats

- Some focus treatments are shared via utility classes, while other links use
  handwritten `focus-visible:` strings inline. The behavior is often good, but
  it is not fully standardized.
- `TeamSocialLinks` uses a `div` with `role="list"` and anchors with
  `role="listitem"` instead of semantic `ul`/`li`.
- The navbar uses menu roles for dropdown content, but the overall interaction
  pattern is still closer to a styled hover/focus nav than a fully managed menu
  system.

## Inconsistencies And Gaps

The current frontend is coherent, but not fully normalized.

### Token and styling inconsistencies

- Semantic tokens and raw values are mixed.
  - Examples: `Button` link variants use hardcoded colors and shadows,
    `HeroSection` uses an inline radial-gradient string, and
    `AnnouncementBanner` uses `style={{ backgroundColor: "#101729" }}`.
- Not all CSS variables are mapped into Tailwind, and not all visual styles use
  the mapped aliases.
- Dark sections frequently bypass semantic tokens and rely on raw values such as
  `bg-navy-900`, `text-white`, `border-white/10`, `text-slate-300`, and
  literal RGBA strings.

### Primitive-layer inconsistencies

- `Card` is a very small wrapper (`p-6`) and does not represent the full visual
  "card/panel" system.
- The more opinionated panel treatment lives in the global `.ui-panel` class
  instead of the `Card` component.
- `components/ui` mixes true primitives with app-specific utilities:
  `PrincipalInvestigatorBadge`, `CustomCursor`, and `XIcon`.
- `components/ui/index.ts` does not export every file in `components/ui`.

### Variant and composition inconsistencies

- `Button` behaves differently when rendered as a link versus a native button.
- `ContactPageForm` overrides `Button` styling directly with a bespoke class
  string instead of relying on shared variants alone.
- `PillarsSection` groups three substantially different visual systems under one
  `variant` prop, which is convenient but blurs the line between variants and
  separate components.
- `RadleWidget`'s `compact` prop changes more behavior than its `variant` prop.

### Typography and spacing inconsistencies

- Spacing is convention-based, not tokenized.
- Arbitrary values appear regularly, especially in highly art-directed sections:
  `text-[2rem]`, `text-[15.5px]`, `h-[58px]`, `tracking-[0.3em]`, and similar
  values.
- `PillarsSection` interactive mode uses `font-serif` rather than the shared
  `font-display` token path.

### Dependency and configuration drift

- `styled-components` is installed but not used in runtime frontend code.

## Maintenance Notes

- Treat `app/globals.css` as the raw token source. Add or edit CSS variables
  there first.
- Add semantic Tailwind mappings in `tailwind.config.ts` only when a token needs
  reusable utility access across the app.
- Prefer existing shared utilities and primitives before adding page-local
  hardcoded styles.
- If a component introduces variants, document:
  - the prop name
  - the accepted values
  - whether the variants are generic visual styles or domain-specific state maps
- If a new shared primitive is added under `components/ui`, update both this
  document and `components/ui/index.ts` if the primitive is meant to be exported
  through the barrel.
- If a real dark-mode system is added later, this document should be revised to
  cover theme switching, alternate CSS variable scopes, and any `dark:` utility
  strategy.

## Quick Summary

- Raw design tokens live in `app/globals.css`.
- Tailwind is the semantic utility layer on top of those tokens.
- Fonts are provided through `next/font/google` in `app/layout.tsx`.
- `components/ui` contains the primitive layer, but many visuals live in
  `components/sections` as styled composites.
- The site is light-first with bespoke dark sections, not true dark mode.
- Accessibility is handled thoughtfully in forms, focus states, and motion
  preferences, but some patterns remain partially standardized.
- The biggest current inconsistencies are hardcoded colors, arbitrary values,
  split card/panel abstractions, and a few overridden component styles.
