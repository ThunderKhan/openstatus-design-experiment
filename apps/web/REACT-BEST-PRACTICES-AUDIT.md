# React / Next.js Best Practices Audit

## 1. Scope

This Step 10 review evaluates only the React / Next.js implementation serving `/` in `apps/web`, plus directly consumed shared code that affects rendering, hydration, client boundaries, bundle behavior, images, resource loading, data flow, effects, or runtime cost.

Reviewed implementation surfaces include:

- `apps/web/src/app/(landing)/page.tsx`
- `apps/web/src/app/(landing)/layout.tsx`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/content/homepage.tsx`
- `apps/web/src/content/homepage-motion.module.css`
- directly consumed header, sub-navigation, footer, image, MDX, provider, search, theme, and shared UI code where it crosses the homepage render path
- `apps/web/package.json` and directly relevant workspace dependency versions
- `apps/web/AGENTS.md`
- `apps/web/DESIGN.md` only to understand intentional implementation/design constraints

The implementation under review is the Step 7 application state (`f8dc912d8a71ff718c7f25bf605914384e74d882`). Steps 8 and 9 are documentation-only stages.

The two earlier audit documents were quarantined during this review. Their contents were not read, searched, compared, or used to derive findings before this report was completed and committed:

- `apps/web/WEB-DESIGN-GUIDELINES-AUDIT.md`
- `apps/web/HOMEPAGE-AUDIT.md`

This is not a redesign, general accessibility audit, responsive-design audit, or generic React checklist. No application changes are proposed as completed work here.

### Runtime boundary

This environment provided repository/source inspection and Git history metadata, but not an interactive production browser, Chrome Network/Performance panels, Lighthouse, React Profiler, or a local production bundle build. Therefore this report does **not** claim exact route JS bytes, transfer bytes, LCP, CLS, selected responsive image candidates, duplicate network requests, hydration milliseconds, or main-thread timing. Questions requiring those measurements are isolated in Section 14.

## 2. Skill methodology

The sole review methodology intentionally applied was the installed **React Best Practices** Skill (`vercel-react-best-practices`, version 1.0.0), whose rules are organized into eight priority groups:

1. **Eliminating Waterfalls — CRITICAL** (`async-*`)
2. **Bundle Size Optimization — CRITICAL** (`bundle-*`)
3. **Server-Side Performance — HIGH** (`server-*`)
4. **Client-Side Data Fetching — MEDIUM-HIGH** (`client-*`)
5. **Re-render Optimization — MEDIUM** (`rerender-*`)
6. **Rendering Performance — MEDIUM** (`rendering-*`)
7. **JavaScript Performance — LOW-MEDIUM** (`js-*`)
8. **Advanced Patterns — LOW** (`advanced-*`)

The review followed that priority order rather than treating every rule equally. Candidate findings were accepted only when the current homepage graph contained concrete source evidence. Trivial static JSX, small maps, ordinary client components required by interaction, and speculative memoization advice were rejected. Where source proves a structure but not its measured cost, the report states that limitation and moves the quantitative question to runtime verification.

The actionable rules used by the final findings are:

- `bundle-dynamic-imports` — dynamically load substantial components not needed for initial render.
- `rendering-resource-hints` — reserve preload/resource priority for resources that are actually critical to the current render.
- `server-hoist-static-io` — avoid repeated static file/network I/O from request/render functions; hoist or otherwise cache immutable I/O.

No other installed design Skill was intentionally invoked for this stage.

## 3. Architecture summary

### Server / Client Component boundaries

The homepage content architecture is predominantly server-rendered:

- `src/app/(landing)/page.tsx` is a Server Component. It reads home-page frontmatter, creates JSON-LD, and renders `Homepage`.
- `src/content/homepage.tsx` is also a Server Component. Its section data is module-scoped and it contains no React state, effects, browser globals, or client directive.
- `src/app/(landing)/layout.tsx`, `Header`, and `Footer` are server compositions.

Client boundaries enter through specific shared features:

- root providers: theme, query/tRPC, URL-state adapter, analytics-related components, WebMCP, and toaster infrastructure;
- header interaction: Radix dropdown primitives, `LogoWithContextMenu`, and `CmdK`;
- sub-navigation: `SubNav` / copy dropdown;
- footer: `FooterStatus` and theme toggle;
- product screenshots: `CustomImage` crosses into client `ZoomableImage` / `ImageZoom`;
- FAQ MDX: `HighlightText` is a client island around server-rendered MDX content.

A Client Component provider receiving `children` does not by itself turn the server-rendered homepage body into a Client Component; the principal marketing sections remain server-rendered.

### Layout structure

`RootLayout` owns fonts, metadata-level application providers, analytics, toaster infrastructure, and global third-party scripts. The `(landing)` layout supplies the centered marketing shell, header, sub-navigation, main content region, and footer. `/` then renders structured data and the Step 7 homepage sections.

### Important client-side dependencies on the homepage path

The directly relevant client graph includes TanStack React Query/tRPC provider infrastructure, `cmdk`, Radix menu/dialog primitives, `next-themes`, `react-medium-image-zoom`, `sonner`, `nuqs`, OpenPanel (when configured), and Plausible integration. The application versions inspected include Next.js 16.3.0 and React 19.2.6.

### Image path

Homepage screenshots follow:

`Homepage` → `ProductEvidenceFrame` → server `CustomImage` → client `ZoomableImage` → two theme-specific `ImageZoom` trees → Next `<Image>`.

`CustomImage` reads intrinsic dimensions from disk and checks whether a `.dark` sibling exists. All three screenshots used on `/` have distinct dark variants. The hero screenshot passes `priority`; the two lower screenshots do not.

## 4. Executive summary

**Overall assessment:** The finished homepage has a strong React/Next.js foundation. The primary marketing composition remains on the server, there is no critical data-fetch waterfall, static content is not needlessly stateful, and interactive behavior is generally isolated. The main opportunities are narrower: interaction-only search and zoom code is paid for eagerly, the hero image priority is duplicated across mutually exclusive light/dark image trees, and immutable filesystem reads remain inside the server render/build path.

| Severity | Count |
| --- | ---: |
| P0 | 0 |
| P1 | 0 |
| P2 | 3 |
| P3 | 1 |

| Confidence | Count |
| --- | ---: |
| HIGH | 3 |
| MEDIUM | 1 |
| LOW | 0 |

**Runtime-only checks:** 6.

No source-confirmed blocking React problem, hydration mismatch, critical waterfall, missing cleanup leak, or repository-wide state architecture issue was found in scope.

## 5. Findings

| ID | Severity | Confidence | Skill Rule | Area | Finding | Evidence | Impact | Remediation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RBP-001 | P2 | MEDIUM | `bundle-dynamic-imports` — Dynamic Imports for Heavy Components | Header / command palette | The complete command-palette/search implementation is an eager homepage client dependency although its dialog/search UI is not needed until the user opens it. | `src/content/header.tsx` always renders `<CmdK />`. `src/content/cmdk.tsx` is a Client Component and eagerly imports the command/dialog primitives, `cmdk`, TanStack `useQuery`, `next-themes`, router code, icons, debounce support, and the full palette implementation even while `open === false`. The network query is correctly gated, but the code is not activation-gated. | Every homepage visitor hydrates the command-palette island and must make its initial client code available even if search is never opened. Exact added bytes and main-thread cost require bundle/runtime measurement. | Keep only the lightweight visible search trigger / shortcut entry path initially available and defer the dialog/search implementation plus search-only dependencies with a dynamic/conditional import that activates when the palette is requested. |
| RBP-002 | P2 | HIGH | `bundle-dynamic-imports` — Dynamic Imports for Heavy Components | Homepage screenshots / zoom | Interaction-only image zoom code is eagerly included and hydrated for every homepage evidence screenshot. | `src/content/mdx-components/custom-image.tsx` defaults to `ZoomableImage` whenever `disableZoom` is not set; all three homepage `ProductEvidenceFrame` calls use that default. `src/content/image-zoom.tsx` is a Client Component that imports `react-medium-image-zoom` at module load, uses `next-themes`, and mounts two `ImageZoom` subtrees per screenshot. | The screenshots require client hydration and the zoom library before any visitor expresses zoom intent. Three screenshot instances also execute the mounted-state effect and perform a post-mount state update. The exact JS weight/hydration time is measurement-dependent, but the eager client boundary is source-conclusive. | Preserve the server-rendered optimized image as the initial experience and defer the zoom implementation until zoom interaction is likely/requested, so the zoom dependency and related client state are not part of the unconditional screenshot path. |
| RBP-003 | P2 | HIGH | `rendering-resource-hints` — Use React DOM Resource Hints | Hero image / theme variants | The hero `priority` signal is forwarded to both mutually exclusive light and dark hero images, causing both distinct theme resources to be treated as preload candidates. | `Hero` passes `priority` to `ProductEvidenceFrame`; `CustomImage` forwards it through `...rest` to `ZoomableImage`; `ZoomableImage` spreads the same `rest` into both the light and dark Next `<Image>` instances. Both `/assets/landing/statuspage-meow.png` and `/assets/landing/statuspage-meow.dark.png` exist. In the repository's Next.js 16.3.0 implementation, `priority` is deprecated in favor of `preload` but still maps to image preload metadata (`preload: preload || priority`) and disables lazy loading. | The browser can be told that two different hero screenshots are critical even though only one theme is visible. That can spend early bandwidth and resource priority on the inactive theme and compete with the actually visible hero resource. Actual transfer/priority timing should still be verified in Network tooling. | Restructure theme-image loading so only the resource that can be the current hero receives critical preload/priority treatment. Keep the inactive theme resource non-critical/on-demand; when touching this code on Next 16, use the current `preload` API rather than extending deprecated `priority` usage. |
| RBP-004 | P3 | HIGH | `server-hoist-static-io` — Hoist Static I/O to Module Level | Server render/build path | Immutable homepage content and image metadata are read synchronously from the filesystem during component/page evaluation instead of being hoisted or cached. | `src/app/(landing)/page.tsx` calls `getHomePage()`, which reaches `parseFrontmatter()` and `fs.readFileSync()` for `home.mdx`. Each string-backed `CustomImage` also calls `getImageDimensions()`, whose implementation does `readFileSync()`, then performs an `existsSync()` check for the dark sibling. The homepage exercises this path for three evidence images. | Today the route has no request-specific dynamic data and is a strong static-prerender candidate, so the immediate consequence is primarily redundant build/static-render work rather than a proven per-request production slowdown. The same pattern becomes request-blocking if the route is made dynamic or reused in dynamic contexts. | Hoist/cache immutable frontmatter and image metadata/dark-variant lookup, or use build-time/static image metadata so repeated component evaluation does not reopen the same files. Preserve per-request reads only for data that can actually change per request. |

## 6. Server / Client Component analysis

The homepage's broad boundary is good: `page.tsx`, `homepage.tsx`, the landing layout, header composition, and footer composition remain Server Components. Static arrays such as hero facts, monitoring steps, incident features, and tooling links are module-scoped rather than rebuilt through state/effects.

The root does contain a relatively large client-provider envelope (`ThemeProvider`, `NuqsAdapter`, `TRPCReactQueryProvider`, Plausible integration) because shared site functionality needs those contexts. That does **not** mean the homepage JSX itself is client-rendered; server component output is passed through the provider boundary.

The most expensive-looking avoidable boundary in source is `CmdK` (RBP-001), because a hidden/on-demand feature brings its complete command/search stack into the initial interactive graph. The screenshot boundary is the second material case: static image evidence is wrapped in a client zoom implementation by default (RBP-002).

Other client islands appear proportionate to actual interaction:

- Radix navigation menus need client interaction.
- `SubNav` needs `usePathname` and browser clipboard actions.
- `FooterStatus` needs recurring live status updates.
- theme switching requires client theme state.
- `WebMcpProvider` is a tiny effect-only feature-detected client island.

No recommendation is made to eliminate client components wholesale.

## 7. Bundle / dependency observations

### Confirmed

- `CmdK` is an unconditional client entry on every landing header and imports multiple search/dialog/query dependencies before activation (RBP-001).
- `react-medium-image-zoom` is imported by the client image boundary used by every homepage screenshot (RBP-002).
- Shared UI imports are generally direct component paths such as `@openstatus/ui/components/ui/dropdown-menu` and `.../button`, not a single broad package barrel from the homepage code inspected.
- The homepage's own static section data is module-scoped and does not introduce runtime data libraries.

### Measurement boundary

No bundle analyzer or production `.next` output was available, so this audit does not assign byte counts to `cmdk`, Radix, React Query/tRPC, zoom, analytics, or provider chunks. RBP-001 is MEDIUM confidence specifically because its *magnitude* should be confirmed with the route's production client chunk graph.

The root-level React Query/tRPC provider is not reported as “unused”: `CmdK` and `FooterStatus` both consume TanStack Query on the homepage path.

## 8. Image and resource-loading observations

### What is handled well

- Homepage screenshots use Next `<Image>` rather than raw `<img>`.
- `CustomImage` supplies intrinsic width/height discovered from the source asset, which gives the browser an aspect ratio and reduces layout-instability risk.
- Only the hero frame requests `priority`; the lower monitoring and incident screenshots retain normal lazy behavior at the call site.
- The three homepage screenshot assets have explicit dark variants rather than attempting client-side pixel transformation.

### Actionable issue

RBP-003 is the strongest source-confirmed resource-priority issue: the hero's `priority` prop reaches **both** distinct theme image instances.

### Measurement-dependent observations

`ZoomableImage` hard-codes `sizes="100vw"` for both light and dark images. The rendered frames are constrained by the `max-w-5xl` shell and, for lower sections, by grid columns, so `100vw` may overstate the actual rendered width at some desktop breakpoints. Whether that materially selects oversized candidates must be checked with `currentSrc`, rendered width, DPR, and Network transfer data before calling it a confirmed defect.

Because both theme `<Image>` elements are present in the DOM, Network tooling should also verify what each browser actually requests for below-fold light/dark pairs. This report does not assume CSS-hidden lazy images are or are not transferred without measurement.

## 9. Rendering / hydration observations

No browser-only values are read during the server render of `Homepage`. No unstable random/time-generated values occur in the homepage component tree inspected, and no source-confirmed hydration mismatch was found.

The root `<html suppressHydrationWarning>` is consistent with a class-based theme provider and is not treated as a standalone defect.

`ZoomableImage` deliberately gates theme-dependent `aria-hidden` / `inert` values behind a `mounted` state. That avoids making the server guess the resolved theme, but it also guarantees one effect-driven state update per zoomable screenshot after mount. The rerender is folded into RBP-002 rather than duplicated as a separate low-value finding.

The homepage motion module uses CSS keyframes/transitions rather than a JavaScript motion runtime. It animates `opacity`, `transform`, and `clip-path`, and contains an explicit `prefers-reduced-motion` fallback. Exact paint cost of `clip-path` is a profiling question, not a source-confirmed React issue.

## 10. Data-fetching observations

The homepage does **not** perform meaningful critical dynamic data fetching in `page.tsx` or `Homepage`. `getHomePage()` is local filesystem content parsing, not a remote request. There is therefore no homepage hero/content fetch waterfall to optimize.

Two directly consumed client features fetch data:

1. **Command palette search** — `CmdK` uses TanStack Query, but its query is disabled until a corpus is pinned or the user has typed a query. No search API request is intentionally issued on initial homepage render. `placeholderData` keeps previous results while a new query is in flight.
2. **Footer status** — `FooterStatus` fetches the public OpenStatus status endpoint with `staleTime: 60000` and `refetchInterval: 60000`. This fetch is footer-level, begins client-side, and does not block server rendering of the homepage.

No source evidence of duplicate homepage data requests, sequential dependent fetches, or missed critical-request parallelization was found.

## 11. Effects / events / rerender observations

The inspected effects generally have bounded scope and cleanup:

- `CmdK` registers the global keyboard listener and removes it in cleanup.
- Its delayed reset timer is cleared both on reopening and effect cleanup.
- `FooterStatus` delegates polling lifecycle to TanStack Query.
- `WebMcpProvider` performs a one-shot feature detection and context registration; it does not leave an application-managed event listener behind.
- `HighlightText` traverses text only when a `q` search parameter exists, so it does no homepage DOM walk by default.

No finding is raised for tiny array maps, inline JSX, or static configuration filtering. The Skill does not justify `useMemo`, `useCallback`, or `React.memo` for the homepage's small server-side arrays.

The only repeated mount work considered material enough to mention is the zoom boundary: each screenshot sets `mounted` in an effect and rerenders once. That is part of RBP-002 because the more useful fix is to avoid eagerly hydrating interaction-only zoom, not to micro-optimize the state setter.

## 12. Third-party script observations

The root layout includes three notable third-party/analytics surfaces:

- `PlausibleProvider` for `openstatus.dev`.
- `OpenPanelComponent`, conditionally rendered only when `NEXT_PUBLIC_OPENPANEL_CLIENT_ID` is configured.
- `<Script src="https://ui.sh/ui-picker.js" />`, unconditionally present in the root layout.

The use of Next `<Script>` is preferable to a raw parser-blocking script. With no explicit strategy, Next's normal Script behavior is post-interactive rather than `beforeInteractive`, so this is **not** reported as a render-blocking script defect from source alone.

The `ui.sh` picker has no environment or route gate in `RootLayout`, so production Network verification should confirm its purpose, transfer/execution cost, and whether it is intended visitor-facing functionality. That question is kept in the runtime checklist instead of being promoted to a finding without evidence that the script is inappropriate in production.

OpenPanel is already environment-gated. No source-only claim is made about Plausible/OpenPanel transfer size or execution timing beyond the integration code inspected.

## 13. Positive practices

1. **Server-first homepage composition.** The route, landing layout, and Step 7 homepage body remain Server Components; static marketing sections are not unnecessarily moved into client state.
2. **Interactive islands are mostly localized.** Header/footer remain server compositions while menus, search, clipboard, status polling, theme controls, and WebMCP cross into client code only where interaction requires it.
3. **No critical homepage fetch waterfall.** Core hero/section content comes from local content data during server rendering; client search/status requests do not gate the initial page body.
4. **Search network work is activation-gated.** `CmdK` does not call `/api/search` on initial render; its TanStack query `enabled` condition waits for a pinned corpus or actual query.
5. **Footer polling uses query caching semantics.** `FooterStatus` uses a stable query key with one-minute `staleTime` and refetch interval instead of hand-rolled effects/timers.
6. **Event/timer cleanup is present.** `CmdK` removes its global key listener and clears its delayed reset timeout.
7. **Static data is hoisted.** Homepage facts, steps, feature rows, and tooling entries are module constants; there is no memoization cargo cult or derived-state duplication.
8. **Images have intrinsic dimensions and below-fold defaults.** Screenshot dimensions are supplied to Next Image, while only the hero is marked high priority at the call site.
9. **Motion does not require a JS animation library.** Homepage entrance/interaction motion is CSS-only and has a reduced-motion branch, avoiding an additional React animation runtime.
10. **WebMCP is narrow and feature-detected.** The tools array is module-scoped and the effect no-ops immediately on browsers without `navigator.modelContext`.

## 14. Runtime verification checklist

These checks require a production build/browser and were not converted into confirmed findings:

1. **Homepage client bundle composition.** Build production output and inspect route client chunks/bundle analyzer. Record initial JS attributable to `CmdK` and its command/dialog/query dependencies, then separately identify `react-medium-image-zoom` and the image client boundary. This would calibrate the magnitude of RBP-001 and RBP-002.
2. **Hero theme preloads.** Cold-load `/` in light and dark modes and inspect document preload links plus Network priority. Confirm whether both optimized `statuspage-meow` theme candidates begin as high-priority/preloaded resources and record bytes/timing. This validates the network magnitude of RBP-003.
3. **Responsive image candidate selection.** At representative mobile/tablet/desktop widths and DPRs, record each screenshot's rendered CSS width, `img.currentSrc`, candidate width, and transfer size. This proves or disproves whether `sizes="100vw"` materially over-selects candidates.
4. **Hidden theme image transfers.** On cold cache, count requests for light and dark versions of each below-fold screenshot while scrolling. Repeat after a theme switch. This determines whether the duplicated DOM tree creates duplicate image network work in supported browsers.
5. **Web Vitals and hydration profile.** On a production build, capture LCP/CLS plus a Performance/React profile of initial hydration. Identify the actual LCP element and quantify the zoom islands' mount/update cost; do not assume the hero screenshot is LCP from source alone.
6. **Third-party script validation.** In the production deployment, confirm whether `https://ui.sh/ui-picker.js` is intentionally user-facing, then record request timing, transfer bytes, execution time, and whether `afterInteractive` versus idle/conditional loading changes critical interaction metrics. If it is preview/design tooling rather than production functionality, that product fact would justify promoting the current observation to an actionable bundle finding.

## 15. Prioritized remediation order

1. **RBP-001 — Defer the command palette implementation.** This affects the global landing header and is the clearest opportunity to keep interaction-only libraries out of the unconditional initial client graph. Confirm bundle contribution first, then split the lightweight trigger from the heavy palette/search implementation.
2. **RBP-002 + RBP-003 — Simplify screenshot client/resource behavior.** Preserve server-rendered Next Images, progressively load zoom only when useful, and ensure only the active hero theme resource receives critical loading priority.
3. **RBP-004 — Cache/hoist immutable filesystem metadata.** Remove repeated synchronous reads/stats from render/build invocation paths after the user-facing bundle/resource work, because the current route appears statically renderable and the present production-request risk is therefore lower.

No application remediation is implemented by this audit.

## 16. Final verdict

**REACT IMPLEMENTATION STRONG WITH MINOR REMEDIATION**
