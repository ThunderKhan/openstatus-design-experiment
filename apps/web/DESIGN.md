# DESIGN.md

> Baseline extraction for `apps/web` in `ThunderKhan/openstatus-design-experiment`.
>
> This document is descriptive, not prescriptive. It records the visual and interaction language that exists in the repository at extraction time. Existing inconsistencies are preserved and called out rather than normalized or repaired.
>
> Evidence labels used below:
> - **Observed** — directly present in source, assets, route structure, or repository-local instructions.
> - **Inferred** — a higher-level rule derived from repeated observed patterns.
> - **Boundary** — explicitly outside this extraction.

## 0. Design North Star

**Observed:** The OpenStatus marketing application is a compact, technical, content-first interface built from monospace typography, one-pixel borders, restrained grayscale semantic colors, square geometry, and repeated `p-4` / `gap-px` spatial rhythms. It presents the product more like an inspectable technical publication or terminal-adjacent reference surface than a conventional SaaS landing page.

**Inferred:** The visual goal is **credible infrastructure software without decorative theater**. Information hierarchy comes from typography, borders, spacing, and content structure rather than gradients, floating cards, giant illustrations, or heavy animation. Product screenshots, tables, code, and textual evidence are treated as primary visual material.

A faithful reconstruction should feel:

- technical and editorial rather than promotional-first;
- dense enough to feel useful, but not cramped;
- deliberately rectangular and grid-based;
- mostly monochrome, with color reserved for semantic state, syntax, or a few explicit links;
- interactive through hover, focus, disclosure, search, theme switching, and live tool feedback rather than spectacle.

## 1. Design DNA

### 1.1 First impression

**Observed**

- Marketing pages are centered inside `max-w-5xl` and use `font-mono`.
- The global body uses Inter, but the landing shell deliberately switches the whole marketing surface to Commit Mono.
- Header and footer are constructed as bordered cell grids with `gap-px` and background-color seams.
- Main marketing content uses a custom `.prose` system rather than a large bespoke section library.
- Headings are modest in scale (`text-3xl` for `h1`, `text-2xl` for `h2`) and rely on weight/tracking instead of extreme size.
- Screenshots and article imagery are framed as evidence, usually with borders and controlled aspect ratios.
- Primary interactive tools reuse the same prose/grid language rather than looking like a separate dashboard.

### 1.2 Repeated visual signatures

**Observed**

1. `border-border` 1px separators.
2. `p-4` as the dominant cell/control inset.
3. `gap-px` to make adjacent elements read like a single technical matrix.
4. `rounded-none` on marketing CTAs, form controls, dropdowns, command palette, and toasts.
5. `hover:bg-muted` as the default interactive hover treatment.
6. `text-muted-foreground` for metadata, labels, secondary navigation, dates, captions, and shortcuts.
7. Monospace marketing chrome and content.
8. Native-looking textual affordances such as `[light]`, `[dark]`, `[system]`, `|`, `#`, keyboard shortcuts, and status-code labels.
9. Border-led section separation rather than large background-color bands.
10. Product screenshots, code, tables, and live measurements as the strongest visual accents.

### 1.3 Personality

**Inferred**

- Infrastructure-minded.
- Open-source and inspectable.
- Calm, literal, and developer-native.
- Slightly utilitarian on purpose.
- More “technical document with tools” than “marketing canvas with components.”

## 2. Source References and Scope

### 2.1 Repository-local instructions read

**Observed:** `apps/web/AGENTS.md` was read before extraction. Relevant constraints include keeping the existing in-app search implementation, preferring existing MDX components for content pages, and following repository-local conventions rather than introducing replacements.

**Observed:** `packages/ui/AGENTS.md` was inspected only because `apps/web` directly consumes `@openstatus/ui`. Its relevant contract is that `src/components/ui` contains stock shared primitives, while application-specific treatment belongs outside that primitive layer. No status-page blocks were used as design evidence.

### 2.2 Application architecture inspected

**Observed:** `apps/web` is a Next.js App Router application. Material visual sources include:

- `src/app/layout.tsx` — root fonts, theme provider, global toaster.
- `src/app/(landing)/layout.tsx` — marketing shell.
- `src/app/(docs)/layout.tsx` — docs shell.
- `src/styles/globals.css` — application prose rules, syntax colors, font aliases, animation aliases, Tailwind sources.
- `src/content/**` — header, footer, subnav, command palette, theme toggle, MDX components, content utilities.
- `src/app/(landing)/**` — marketing/list/detail/tool route templates.
- `src/data/content.ts` — navigation/content group definitions.
- `public/assets/**` — screenshots, customer imagery, article/changelog assets, logos, comparison imagery, checker imagery, OG material.
- `src/public/fonts/**` — locally loaded Cal Sans and Commit Mono files.
- `packages/ui/src/globals.css` — shared semantic color/radius tokens consumed by `apps/web`.
- directly imported `@openstatus/ui` primitives such as Button, Input, Select, DropdownMenu, Command, Dialog, and Toaster.

### 2.3 Route/surface families inspected

**Observed:** The design extraction covered the rendered patterns represented by:

- `/` — home.
- top-level product/main MDX pages via `(landing)/[slug]`.
- `/blog` and `/blog/[slug]`.
- `/changelog` and changelog detail/list patterns.
- `/compare` and comparison content patterns.
- `/customers` and customer content patterns.
- `/guides` and guide/category content patterns.
- `/oss-friends`.
- `/tooling` and `/tooling/[slug]`.
- `/use-case` and `/use-case/[slug]`.
- `/play` and interactive tool patterns, with `/play/checker` inspected in detail as the representative live-tool surface.
- `/docs/[[...slug]]` through the docs layout/header/navigation architecture.
- redirect-only social/convenience routes were recognized as nonvisual and not treated as separate design surfaces.

### 2.4 Explicit exclusions

**Boundary:** The following were not used to infer this marketing design system:

- `/status` implementation and status-page application visuals;
- dashboard application visuals at `app.openstatus.dev`;
- backend/API implementation beyond what is necessary to understand front-end interaction states;
- infrastructure;
- unrelated monorepo packages;
- status-page registry blocks under `packages/ui/src/components/blocks`.

A link from marketing navigation to an excluded surface is navigation evidence only, not design evidence for that destination.

## 3. Core Principles

### 3.1 Borders are structural, not decorative

**Observed:** Header, footer, grids, cards, tables, details, code blocks, image frames, keyboard hints, and many controls use borders. Adjacent cells frequently share a background seam through `bg-border` + `gap-px` rather than independent card shadows.

**Inferred:** Use borders to explain grouping and hierarchy before reaching for surface elevation or color blocks.

### 3.2 Content is the visual system

**Observed:** The home page itself is MDX-driven and composes `ButtonLink`, `Image`, `CustomerLogos`, `Grid`, `Details`, links, lists, and headings. Product pages use the same `CustomMDX` pipeline.

**Inferred:** New marketing composition should look like a continuation of the publishing system, not a separate collection of hero-specific widgets.

### 3.3 Square geometry is an application-level override

**Observed:** The shared `@openstatus/ui` Button is stock shadcn-style and defaults to `rounded-md`, but marketing `ButtonLink`, live-tool Button/Input/Select controls, dropdown content/items, command palette, theme controls, and toaster styling repeatedly override or avoid rounding.

**Inferred:** The marketing identity is intentionally more rectangular than the shared primitive library.

### 3.4 Color is semantic and scarce

**Observed:** The foundation is neutral light/dark semantic tokens. Strong colors appear for destructive/success/warning/info states, charts/syntax, and the hard-coded blue Dashboard link.

**Inferred:** A large colored decorative region would be anomalous unless it communicates state, data, or source material.

### 3.5 Interaction should feel immediate and legible

**Observed:** Hover states tend to become `bg-muted`; links change underline decoration or foreground; disclosures use native `<details>`; search is keyboard accessible; tools stream results into plain tables and toasts.

**Inferred:** Prefer visible state transitions over ornamental motion.

## 4. Foundations

### 4.1 Color system

The app imports `@openstatus/ui/globals`, so the shared semantic variables are the source of truth.

#### Light mode core tokens — observed exact values

| Token | Value | Typical role |
| --- | --- | --- |
| `--background` | `oklch(1 0 0)` | page/cell background |
| `--foreground` | `oklch(0.145 0 0)` | primary text |
| `--card` | `oklch(1 0 0)` | shared primitive cards |
| `--popover` | `oklch(1 0 0)` | overlays |
| `--primary` | `oklch(0.205 0 0)` | primary controls/selection |
| `--primary-foreground` | `oklch(0.985 0 0)` | text on primary |
| `--secondary` | `oklch(0.97 0 0)` | secondary surfaces |
| `--muted` | `oklch(0.97 0 0)` | hover/code/subtle surfaces |
| `--muted-foreground` | `oklch(0.556 0 0)` | metadata/secondary text |
| `--accent` | `oklch(0.97 0 0)` | shared primitive accent |
| `--destructive` | `oklch(0.577 0.245 27.325)` | errors / 5xx |
| `--border` | `oklch(0.922 0 0)` | structural separators |
| `--input` | `oklch(0.922 0 0)` | control borders/background logic |
| `--ring` | `oklch(0.708 0 0)` | focus rings |
| `--success` | `oklch(0.72 0.19 150)` | success / 2xx |
| `--warning` | `oklch(0.77 0.16 70)` | warning / 4xx |
| `--info` | `oklch(0.62 0.19 260)` | info / 3xx |

#### Dark mode core tokens — observed exact values

| Token | Value |
| --- | --- |
| `--background` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.985 0 0)` |
| `--card` | `oklch(0.205 0 0)` |
| `--popover` | `oklch(0.205 0 0)` |
| `--primary` | `oklch(0.922 0 0)` |
| `--primary-foreground` | `oklch(0.205 0 0)` |
| `--secondary` | `oklch(0.269 0 0)` |
| `--muted` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `oklch(0.708 0 0)` |
| `--accent` | `oklch(0.269 0 0)` |
| `--destructive` | `oklch(0.704 0.191 22.216)` |
| `--border` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(1 0 0 / 15%)` |
| `--ring` | `oklch(0.556 0 0)` |

`--success`, `--warning`, and `--info` keep their light-mode values in dark mode.

**Observed:** The shared layer also defines chart and 17 rainbow tokens. They are available to data/visual components, but they are not the normal palette for marketing composition.

**Observed exceptions:**

- Dashboard navigation: `text-blue-700 dark:text-blue-400`.
- Syntax highlighting uses exact non-semantic colors, including light-mode `#2d5e9d`, `#354150`, `#8996a3`, `#007f7a`, `#e02518`, `#a19595`, `#6266d1`, `#e25a1c`; dark mode overrides only a subset (`#4c97f8`, white, `#f47067`, `#0fa295`).
- Checker status families map 1xx → muted foreground, 2xx → success, 3xx → info, 4xx → warning, 5xx → destructive.

### 4.2 Typography

#### Font families

**Observed:** Root layout loads:

- **Inter** via `next/font/google`, variable `--font-sans`; also applied as the body class.
- **Cal Sans SemiBold** locally, variable configured as `--font-cal`.
- **Commit Mono** locally in Regular, Italic, Bold, and Bold Italic, variable `--font-commit-mono`.

**Observed:** `@theme inline` maps Tailwind `font-mono` to `var(--font-commit-mono)`.

**Observed:** Marketing `(landing)` wraps the entire shell in `font-mono`.

**Observed:** Docs body wraps in `font-sans`, while `DocsHeader` explicitly switches its chrome back to `font-mono`.

#### Prose hierarchy

| Element | Observed utilities / behavior |
| --- | --- |
| body prose | `text-foreground/80` |
| first direct paragraph | `text-lg text-foreground/90 leading-8` |
| paragraph | `my-4 leading-7` |
| `h1` | `text-3xl`, `font-semibold`, `tracking-tight`, `mb-6`, balanced |
| `h2` | `text-2xl`, `font-semibold`, `tracking-tight`, `mt-12 mb-4 pt-8`, top border |
| `h3` | `text-xl`, `font-medium`, `tracking-tight`, `mt-8 mb-3` |
| `h4` | `text-lg`, `font-medium`, `tracking-tight`, `mt-6 mb-2` |
| strong | foreground + semibold |
| emphasized | foreground + italic |
| metadata | muted foreground, often text-sm |
| dates | muted + `tabular-nums` |
| code block | text-sm |

**Inferred:** Scale differences are intentionally restrained. The visual system does not rely on a 64–96px marketing headline.

### 4.3 Spacing rhythm

**Observed dominant spacing:**

- `p-4` — header cells, footer cells, grid cells, cards, details, table cells, large tool controls.
- `gap-4` — outer marketing shell and card grids.
- `gap-px` — connected grid seams.
- `gap-2` — compact control groups and inline tool actions.
- `px-4 py-4` — main marketing content.
- `my-4` — paragraphs, grids, figures, details, forms, table wrappers.
- `h2`: `mt-12 pt-8 mb-4` creates the largest recurring content-section break.

**Inferred:** The visual rhythm is based primarily around a 1rem content unit, with 0.5rem for local grouping and 1px for structural seams.

### 4.4 Layout widths and grids

**Observed:**

- Marketing shell: centered `max-w-5xl`, vertical flex, `min-h-screen`, `gap-4`.
- Marketing main: `flex-1 px-4 py-4`.
- Docs shell: centered `max-w-7xl`, `font-sans`.
- Docs content row: `gap-8 px-4 py-4`; desktop sidebar `w-56` at `lg` and above.
- A separate `.container` utility exists with `padding-inline: 2rem` and `max-width: 1400px` at very large widths, but it is not the defining landing-shell width.
- Generic MDX `Grid`: one column by default, `md:grid-cols-{1..5}` according to its `cols` prop.
- Header: `grid-cols-3` then `lg:grid-cols-6`.
- Footer: one column, `sm:grid-cols-2`, `md:grid-cols-3`.

### 4.5 Radius and geometry

**Observed shared primitive radius scale:**

- `--radius: 0.625rem`.
- `--radius-xs: calc(var(--radius) * 0.2)`.
- `--radius-sm: calc(var(--radius) * 0.6)`.
- `--radius-md: calc(var(--radius) * 0.8)`.
- `--radius-lg: var(--radius)`.
- `--radius-xl: calc(var(--radius) * 1.4)`.
- bare `.rounded`: `calc(var(--radius) * 0.4)`.

**Observed marketing treatment:** key marketing controls repeatedly use `rounded-none`; content boxes and shell cells are visually square because they do not opt into a radius.

**Inferred:** Do not mistake the shared primitive radius scale for the marketing application’s dominant geometry. The application-level language is square.

### 4.6 Borders and elevation

**Observed:**

- Standard separator: `border border-border`.
- Section border: `h2` uses `border-t border-border/60`.
- Blockquote: `border-l-2 border-foreground/50`.
- Figure images can combine a normal border with an inset-looking `outline outline-1 -outline-offset-1` using black/10 or white/10.
- Most shell/content blocks are flat.
- Exceptions include stock primitive `shadow-xs`, root toaster `shadow-lg`, and command palette dialog `shadow-2xl`.

**Inferred:** Elevation is exceptional and mostly reserved for portalled overlays or shared primitive defaults; connected page layout is border-led.

### 4.7 Icons and symbolic language

**Observed:**

- `@openstatus/icons` is the main icon source in search/theme interactions.
- `lucide-react` is present as a front-end dependency for iconography elsewhere in the app.
- Small icons are commonly around `size-4`; theme hydration placeholder icons are `h-6 w-6`.
- The header dropdown deliberately uses a text triangle `▲` at `text-[10px]` rather than requiring an icon component.
- Keyboard glyphs (`⌘K`) and bracketed textual controls (`[light]`) are part of the visual language.

## 5. Art Direction

### 5.1 Product imagery

**Observed:** Home and product content use actual interface screenshots such as assets under `public/assets/landing`. The home composition places screenshots directly inside prose and grid structures.

**Inferred:** Product UI is proof, not background decoration. Preserve legibility and framing.

### 5.2 Image component behavior

**Observed:** `CustomImage`:

- reads actual local dimensions when possible;
- falls back to `1200 × 630`;
- automatically looks for a sibling filename with `.dark` inserted before the extension;
- renders the dark asset only when it exists;
- is zoomable by default;
- supports `disableZoom`;
- uses a zoom backdrop based on `background/80` and a `16` zoom margin.

**Observed:** Figure imagery under prose uses an `aspect-video` crop with `object-cover`, border, and subtle outline. An `.img-fit` class opts out to intrinsic aspect ratio + `object-contain`.

**Observed:** Blog hero imagery is explicitly wrapped in a bordered `aspect-video` container and uses `object-contain`.

### 5.3 Asset families

**Observed:** Material asset directories include `alternatives`, `authors`, `changelog`, `checker`, `customers`, `landing`, `logos`, `og`, `partners`, and `posts`.

**Inferred:** The baseline accepts several content-specific image families, but does not unify them into a decorative illustration style. Their job is evidentiary/editorial.

## 6. Components

### 6.1 Marketing shell

**Structure:** `Header` → `SubNav` → `main` → `Footer`, with `gap-4` between shell regions.

**Observed:** The shell is `font-mono`, centered, `max-w-5xl`, and min-height screen.

### 6.2 Header

**Observed:**

- bordered grid with `bg-border`, `gap-px`, and background cells;
- 3 columns by default, 6 at `lg`;
- every cell gets `px-4 py-4`;
- children hover to `bg-muted`;
- content order: logo, Products dropdown, Resources dropdown, Pricing, Search, Dashboard;
- dropdown caret `▲` rotates 180° over `duration-300` when open;
- dropdown content aligns to trigger start with zero side/align offsets and `rounded-none`;
- dropdown items are `font-mono rounded-none px-2 py-3`;
- Dashboard is a hard-coded blue text exception.

### 6.3 Sub-navigation

**Observed:**

- horizontal flex with space-between;
- breadcrumbs are generated from URL segments excluding the current leaf;
- muted by default, foreground on hover;
- separator is literal ` | `;
- labels truncate;
- breadcrumb color transition is 150ms and honors `motion-reduce`;
- copy/dropdown action occupies the opposite side.

### 6.4 Footer

**Observed:**

- first region is a bordered cell grid: 1 → 2 → 3 columns across responsive breakpoints;
- section labels are muted;
- each link is a full-width block with muted hover background;
- bottom connected grid contains “Talk to the founders”, live footer status, and theme toggle;
- theme selector itself uses `bg-border` + `gap-px` and textual `[light]`, `[dark]`, `[system]` buttons.

### 6.5 ButtonLink / marketing CTA

**Observed:** Wraps shared `Button`, defaults to outline + large size, then applies `h-auto rounded-none px-4 py-4 text-base no-underline!`. A caller can override variant, including primary/default.

**Observed:** Default shared Button still contributes variant semantics, focus treatment, disabled behavior, and possibly `shadow-xs`; the marketing wrapper changes shape and sizing rather than replacing the primitive.

### 6.6 Grid

**Observed:**

- one column until `md`;
- supports 1–5 columns at `md`;
- each child: border + `p-4`;
- border utilities remove duplicate top/left edges so the result reads as one connected matrix;
- first/last child prose margins are neutralized.

**Inferred:** This is one of the most important reconstruction primitives.

### 6.7 Card / LinkCard

**Observed:**

- Card: `border p-4`, optional medium foreground title.
- LinkCard: same border/padding, `hover:bg-muted`, no link underline, description at muted text-sm.
- CardGrid differs from connected `Grid`: `gap-4`, `sm:grid-cols-2`, so cards remain visibly separate.

### 6.8 Details / FAQ disclosure

**Observed:**

- native `<details>` and `<summary>`;
- `border p-4 my-4`;
- summary is medium foreground and gains `bg-muted` on hover;
- open state adds bottom margin to summary;
- optional `headingLevel` creates a real h2/h3/h4 inside summary while CSS neutralizes heading visuals to preserve the same appearance.

### 6.9 Content lists

**Observed:**

- list links remove underlines and use `hover:bg-muted`;
- item layout is stacked by default and row-based at `md`;
- date uses muted foreground + tabular numbers;
- title uses foreground + `tracking-tight` + truncation;
- optional category is muted and moves to the far edge on desktop.

### 6.10 Tables and code

**Observed:**

- tables are full-width, border-collapse, with borders on table/th/td;
- headers use `bg-muted/50`, medium weight, `p-4`;
- cells use `p-4`;
- captions are muted text-sm below the table;
- table wrapper scrolls horizontally;
- pre blocks are `bg-muted`, bordered, `rounded-none`, text-sm, horizontally scrollable with scrollbars visually hidden;
- inline code uses muted background + muted foreground with compact horizontal/vertical padding.

### 6.11 Command palette

**Observed:**

- header trigger shows “Search...” plus bordered `⌘K` hint;
- opens with Cmd/Ctrl+K;
- modal is monospace, `rounded-none`, top-positioned around 15% viewport, `p-0`, `shadow-2xl`;
- max width increases at `lg` and `xl`;
- command list max height rises from 50vh to 60vh at `lg`;
- input has a bottom-border strip and square geometry;
- loading uses a spinning icon;
- search is debounced 150ms;
- after close, search/scope state resets after 1 second unless reopened;
- supports direct navigation shortcuts and scoped corpus search;
- theme switching is available as a command.

### 6.12 Live tool form pattern

Representative surface: `/play/checker`.

**Observed:**

- still lives inside normal prose hierarchy;
- form grid: 3 columns → 4 at `sm` → 5 at `md`;
- select/input/submit use `rounded-none`, `p-4`, `text-base` and auto/full height;
- results render into the same prose table system;
- status families are tiny square color blocks, not pills;
- primary/secondary actions remain square and stretch with `flex-1`;
- progress/errors/success are reported through toasts and streamed row updates rather than an animated marketing visualization.

## 7. Motion & Interaction

### 7.1 Motion inventory

**Observed:**

- prose links: color/decoration transition, `duration-150`, motion-reduce disabled transition;
- subnav breadcrumbs: `duration-150`, motion-reduce disabled transition;
- header dropdown caret: `duration-300` rotation;
- shared accordion animation aliases: `0.2s ease-out` for height open/close;
- loading icon: `animate-spin`;
- shared Button: `transition-all` from the primitive layer;
- image zoom uses `react-medium-image-zoom`; timing is library-controlled and not redefined here;
- command dialog state is animated by shared dialog primitives, while the app explicitly controls positioning and reset timing.

### 7.2 Interaction state language

**Observed:**

| State | Typical treatment |
| --- | --- |
| hover on cell/link | `bg-muted` or foreground/underline emphasis |
| selected/open nav cell | `bg-muted` |
| active theme | `bg-muted` |
| focus on shared controls | `focus-visible:border-ring` + `ring-ring/50`, 3px ring from shared Button |
| disabled Button | pointer-events none + 50% opacity |
| destructive feedback | destructive semantic color |
| live loading | toast + spinning icon / progressive rows |

**Inferred:** Motion should explain state changes and loading, not create ambient spectacle.

## 8. Responsive Behavior

**Observed:** Responsive logic is layout-preserving rather than identity-changing.

### Marketing shell

- Outer maximum width remains `max-w-5xl`; content gets fixed `px-4` in main.
- Header naturally wraps its six cells through a 3-column grid on smaller screens, becoming six columns at `lg`.
- Footer moves from 1 → 2 → 3 columns.
- Connected MDX grids collapse to one column until `md`.
- Content-list rows stack until `md`.
- Long text is frequently protected with `truncate`, `min-w-0`, and `text-nowrap` where appropriate.

### Docs

- Docs shell is wider (`max-w-7xl`).
- Desktop sidebar is hidden below `lg`; mobile navigation is shown instead.
- Main content remains flexible with `min-w-0`.
- Docs header uses 3 columns on small screens and 5 at `lg`; search spans three desktop columns.

### Command palette

- Dialog width expands at `lg` / `xl`.
- Result list maximum height increases at `lg`.

### Interactive checker

- Form columns progress from 3 → 4 → 5.
- URL field and submit span change with breakpoints to keep the control group usable without introducing a separate mobile component.

**Inferred:** Preserve the same border/grid language at every breakpoint; responsive behavior mostly changes column count, visibility, span, and stacking.

## 9. Page Composition Recipes

### 9.1 Home / product marketing page

1. Marketing shell (`Header`, `SubNav`, `main`, `Footer`).
2. `prose dark:prose-invert max-w-none` content root.
3. `h1` from page hero/title.
4. `text-lg` description or first paragraph.
5. Small CTA cluster using square `ButtonLink` variants.
6. Supporting sentence or metadata.
7. Product screenshot through `CustomImage`.
8. `h2` sections separated by top border and large top spacing.
9. Simple paragraphs, bullets, text links, and occasional connected `Grid`.
10. Product/customer evidence.
11. FAQ using bordered native `Details` blocks.

### 9.2 Editorial index page

1. Normal marketing shell.
2. Prose root.
3. Plain `h1`.
4. Optional category/filter controls.
5. Content list whose rows hover with muted background.
6. Date/title/category arranged stacked on small screens and inline on desktop.

### 9.3 Article/detail page

1. Prose root.
2. `h1`.
3. muted metadata.
4. Optional bordered `aspect-video` hero image.
5. MDX body with anchored headings, code, figures, lists, tables, details, cards/grids.
6. previous/next pagination where the route family provides it.

### 9.4 Interactive tool page

1. Same prose root and title/description as a content page.
2. Square, border-led control group.
3. Live state rendered in tables, semantic color blocks, and toasts.
4. Tool actions as square buttons.
5. Explanatory MDX continues below the tool.

### 9.5 Docs page

1. Wider `max-w-7xl` shell.
2. Monospace docs header.
3. Sans-serif body/navigation reading surface.
4. Desktop sidebar at `lg`, mobile nav below it.
5. Main documentation content uses the existing docs/MDX system rather than the marketing shell’s exact page width.

## 10. Content & Copy Presentation

**Observed:**

- Headings are direct and descriptive rather than slogan-heavy.
- Technical nouns are left explicit: API, CLI, Terraform, MCP, regions, status codes, SOC 2, response time.
- CTAs name the action (“Create Your Status Page”, “Global Speed Checker”, “Export to CSV”).
- Secondary UI copy often resembles developer tooling: `[light]`, `⌘K`, `[category]`, URL-shaped labels, status-code families.
- Lists and tables are accepted as first-class marketing presentation, not something hidden behind decorative cards.
- Prose list bullets are en-dash shaped via `list-style-type: "–  "`.
- Heading anchors expose `#` on hover.

**Inferred:** The writing and visual system reinforce each other: concrete technical claims should remain visually close to their proof (screenshot, table, code, link, or tool).

## 11. Implementation Tokens and Front-End Dependencies

### 11.1 Styling stack

**Observed:**

- Tailwind CSS v4 via `tailwindcss` + `@tailwindcss/postcss`.
- `@openstatus/ui/globals` imported into app globals.
- `tailwindcss-animate` plugin.
- `@tailwindcss/container-queries` plugin.
- Tailwind source scanning explicitly includes the shared `packages/ui` workspace and `@openstatus/react`.
- `clsx` / `tailwind-merge` style composition through local/shared `cn` utilities.
- `class-variance-authority` in shared primitives.

### 11.2 Interaction/rendering dependencies that materially affect the UI

**Observed:**

- `next` / `react` / `react-dom` — App Router and rendering foundation.
- `next-themes` — light/dark/system mode.
- `@openstatus/ui` — shared UI primitives and semantic token layer.
- `@openstatus/icons` — application icon set.
- `@openstatus/react` — shared OpenStatus React components included in Tailwind source scanning.
- `cmdk` — command/search palette behavior.
- `react-medium-image-zoom` — zoomable content imagery.
- `recharts` — chart rendering where content/tools use charts.
- `lucide-react` — additional icons.
- `shiki` / `sugar-high` — code/syntax presentation paths.
- `nuqs` — URL state for interactive tools such as checker.
- TanStack Query — search/loading state in command palette.

### 11.3 Font token inconsistency — preserve as-is

**Observed:** Root layout configures Cal Sans with the variable name `--font-cal`, while `src/styles/globals.css` declares `--font-cal: var(--font-calsans)`. No inspected primary marketing composition relied on Cal Sans; the marketing shell uses `font-mono`.

**Observed:** The same `@theme` block declares `--font-sans` using `var(--font-sans)` as the leading source before system fallbacks, while the root font loader also provides `--font-sans`.

Do not “fix” or rename these aliases as part of baseline reproduction.

## 12. Do / Don’t

### Do — to reproduce the existing baseline

- Do center marketing content within `max-w-5xl`.
- Do use Commit Mono across the landing shell.
- Do make `p-4` the dominant cell/control padding.
- Do use 1px semantic borders as layout structure.
- Do join related cells with `bg-border` + `gap-px` where the existing components do.
- Do keep marketing controls square.
- Do use `hover:bg-muted` for cell-like interactions.
- Do use semantic foreground/muted colors before introducing literal colors.
- Do let prose, tables, code, screenshots, and details blocks carry the page.
- Do preserve dark-mode semantic token inversion and `.dark` image variants.
- Do keep responsive changes primarily to stacking/column count/span/visibility.
- Do preserve keyboard interaction, focus treatment, and native disclosure semantics already present.

### Don’t — because it would cease to be a baseline reconstruction

- Don’t introduce large gradients, glass effects, ambient glows, or decorative blobs.
- Don’t turn every section into an independently rounded card.
- Don’t inflate hero typography beyond the existing restrained hierarchy.
- Don’t replace border structure with soft drop-shadow layering.
- Don’t make status/data colors decorative.
- Don’t add background animation or scroll spectacle.
- Don’t convert content pages into bespoke React marketing sections when existing MDX primitives describe the pattern.
- Don’t unify the docs and marketing typography/widths; the divergence exists today.
- Don’t normalize the shared radius scale to zero globally; square geometry is achieved locally in the marketing app.
- Don’t change copy, accessibility semantics, responsive behavior, or primitive contracts while reproducing this baseline.

## 13. Anti-Slop Rules

These are **inferred reconstruction constraints from the existing site**, not redesign recommendations.

1. **No generic SaaS hero formula.** The baseline does not use a huge gradient headline, floating dashboard mockup, and three pill badges.
2. **No card soup.** Use connected grids, prose flow, lists, details, and tables; cards are occasional and plain.
3. **No gratuitous pills.** Status is represented with square blocks/text; controls are predominantly rectangular.
4. **No unexplained color.** Color should correspond to semantic state, syntax, data, or the known Dashboard-link exception.
5. **No fake depth.** Page structure should read through borders and spacing before shadows.
6. **No ornamental motion layer.** Existing motion is state- and feedback-oriented.
7. **No decorative stock art as a substitute for product evidence.** Prefer actual product screenshots, customer assets, technical diagrams, code, data, or content-specific photography.
8. **No typography cosplay.** The identity comes from real Commit Mono usage plus modest hierarchy, not random futuristic display fonts.
9. **No over-softening.** The square, technical geometry is a defining application-level choice.
10. **No visual detachment between marketing and tools.** A live tool should still look like the same publication/system.

## 14. Accessibility Baseline

This section records existing behavior; it does not propose accessibility changes.

**Observed:**

- Shared controls provide visible focus-ring behavior through `focus-visible` border/ring utilities.
- Shared Button disabled state prevents pointer interaction and lowers opacity.
- Prose and breadcrumb link transitions explicitly support `motion-reduce` in inspected styles.
- FAQ/disclosure uses native `<details>` / `<summary>`.
- `Details` can render real headings inside summary while neutralizing their appearance, preserving document outline semantics.
- Command palette has an `sr-only` dialog title and supports keyboard opening/navigation shortcuts.
- Scope-clear action in search has an explicit `aria-label`.
- Image components receive/propagate `alt`; figures can show captions.
- Dark/light/system theme is user-selectable.

**Boundary:** This baseline document does not certify WCAG conformance and does not alter any existing behavior.

## 15. Open Design Variables / Existing Inconsistencies

These are deliberately **not resolved** in this extraction.

1. **Marketing mono vs docs sans.** Landing uses Commit Mono; docs body uses Inter/sans, but docs header returns to mono.
2. **Root body vs landing wrapper.** Body defaults to Inter; landing overrides with mono. Portalled UI must opt into mono when the baseline requires it. Command palette does; the global toaster styling does not explicitly do so.
3. **Cal Sans alias mismatch.** Root font loader defines `--font-cal`; app theme refers to `--font-calsans` as the source for `--font-cal`.
4. **Font-sans alias shape.** App theme declares `--font-sans` with `var(--font-sans)` as its first family while RootLayout also provides that variable.
5. **Shared radius vs marketing square geometry.** The shared UI layer has a proportional rounded scale and stock primitives such as Button are rounded by default; marketing frequently overrides them to `rounded-none` rather than changing the shared token.
6. **Multiple width systems.** Marketing uses `max-w-5xl`, docs use `max-w-7xl`, while a standalone `.container` utility reaches 1400px.
7. **Color exceptions.** Dashboard navigation uses hard-coded blue instead of the otherwise neutral semantic link treatment; syntax highlighting also uses literal colors.
8. **Syntax dark-mode partial override.** Dark mode replaces only some syntax variables; the remaining variables continue to inherit root values.
9. **Image fit differs by context.** Default prose figures crop to 16:9 `object-cover`; `.img-fit` opts into intrinsic/contain; blog hero explicitly uses contain inside an aspect-video frame.
10. **Elevation is not perfectly uniform.** Connected layout is flat, but stock buttons may retain `shadow-xs`, toaster uses `shadow-lg`, and command palette uses `shadow-2xl`.
11. **Motion timing is heterogeneous but restrained.** 150ms links/search debounce, 200ms accordion aliases, 300ms header caret, and a 1-second command-palette reset coexist.
12. **Two base token/style layers exist.** `apps/web/src/styles/globals.css` imports `@openstatus/ui/globals` and also reapplies base border/body rules locally.

## 16. Reconstruction QA Checklist

A reconstruction is visually faithful only if the answer to these checks is “yes” where applicable.

### Shell

- [ ] Marketing frame is centered at `max-w-5xl`.
- [ ] Marketing shell is Commit Mono.
- [ ] Header is a connected 1px-seam grid, not a floating navbar.
- [ ] Main content has `px-4 py-4`.
- [ ] Footer is a connected bordered grid with muted section labels.

### Hierarchy

- [ ] `h1` is restrained (`text-3xl`) rather than oversized.
- [ ] `h2` begins a new section with top border + `mt-12 pt-8`.
- [ ] Body prose uses foreground opacity/muted semantic color instead of many arbitrary gray literals.
- [ ] First/lead paragraph is only modestly enlarged.

### Geometry

- [ ] Marketing CTAs and tool controls are square.
- [ ] Connected grids collapse shared borders cleanly.
- [ ] Cards, details, tables, and code blocks use visible structural borders.
- [ ] Shadows are not used as the primary grouping mechanism.

### Interaction

- [ ] Hoverable cells become muted.
- [ ] Links retain the underline/decoration language where prose links are used.
- [ ] Keyboard search remains discoverable through `⌘K`.
- [ ] Theme controls preserve light/dark/system states.
- [ ] Live tools express progress and results using existing controls/tables/toasts.

### Imagery

- [ ] Product screenshots read as framed evidence.
- [ ] Figure aspect/fit matches the source context.
- [ ] Dark-specific images are used only when a `.dark` sibling exists.
- [ ] Zoom remains available by default through the existing image component.

### Responsive

- [ ] Header is 3 columns before `lg`, 6 at `lg`.
- [ ] Footer follows 1 → 2 → 3 columns.
- [ ] MDX Grid is one column before `md`.
- [ ] Content lists stack before `md`.
- [ ] Docs retain their separate `max-w-7xl` + responsive sidebar/mobile-nav behavior.

### Baseline integrity

- [ ] No design inconsistency listed in §15 was silently corrected.
- [ ] No new library, animation system, breakpoint behavior, or design token was introduced.
- [ ] No dashboard/status-page visual language was imported into this marketing baseline.

## 17. One-Paragraph Reconstruction Prompt

Recreate the OpenStatus `apps/web` marketing design as a compact developer-facing technical publication: center the landing shell at `max-w-5xl`, set the shell in Commit Mono, use a neutral semantic light/dark palette, make one-pixel `border-border` separators and `p-4` cells the main layout grammar, join header/footer/feature cells with `bg-border` + `gap-px`, keep marketing controls square with `rounded-none`, use muted backgrounds for hover and secondary surfaces, keep headings deliberately modest (`text-3xl` h1, bordered `text-2xl` h2 sections), and compose pages primarily from prose, connected grids, plain cards, native details, bordered tables/code, real product screenshots, and technical evidence. Preserve the existing Inter/sans docs-body divergence, semantic status colors, hard-coded blue Dashboard-link exception, dark image siblings, restrained 150–300ms state transitions, keyboard command palette, theme controls, and responsive stacking rules. Do not add gradients, glassmorphism, oversized hero typography, decorative card stacks, ambient animation, generalized pill UI, or extra visual polish that is not present in the baseline.
