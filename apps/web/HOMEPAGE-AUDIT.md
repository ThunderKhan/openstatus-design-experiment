# OpenStatus Homepage Audit

## 1. Scope

This audit covers only the finished Step 7 marketing homepage at `/` in `apps/web`, plus directly consumed shared code needed to determine its actual behavior.

Primary implementation inspected:

- `apps/web/src/content/homepage.tsx`
- `apps/web/src/content/homepage-motion.module.css`
- `apps/web/src/app/(landing)/page.tsx`
- `apps/web/src/app/(landing)/layout.tsx`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/styles/globals.css`
- `apps/web/src/content/pages/home.mdx` for homepage metadata/FAQ source
- directly consumed header, sub-navigation, footer, theme, image-zoom, MDX, button, dropdown, dialog, grid, link, and token primitives
- `apps/web/AGENTS.md`
- `apps/web/DESIGN.md`

The audit deliberately excludes pricing, docs, blog, changelog, compare pages, dashboard, status-page applications, backend, infrastructure, and unrelated packages except where a shared primitive is directly consumed by the homepage shell.

`apps/web/WEB-DESIGN-GUIDELINES-AUDIT.md` was quarantined. Its contents were not opened, searched, read, summarized, or compared while producing this independent audit. Only repository metadata needed to establish the Step 7/Step 8 change boundary was inspected.

No application remediation is implemented in this step.

## 2. Methodology

The installed `audit` Skill was used as the sole design-audit methodology. No other installed design Skill was intentionally invoked.

The Skill defines a code-level technical audit rather than a design critique. Its five scored dimensions were applied directly:

1. **Accessibility** — contrast, motion sensitivity, ARIA/state, keyboard/focus behavior, semantic HTML/landmarks, headings, alt text, and control accessibility.
2. **Performance** — image optimization, expensive animation, unnecessary client work/imports, render cost, and avoidable resource loading.
3. **Theming** — semantic tokens, hard-coded colors, light/dark behavior, and theme switching.
4. **Responsive Design** — fixed sizing, touch targets, overflow risk, text scaling, and breakpoint behavior.
5. **Implementation Integrity** — coherent product-specific implementation, repeated shortcuts, design-system drift, and false-positive rejection.

The Skill's 0–4 score is retained for each dimension, with its rating bands. The experiment's required P0–P3 severity and HIGH/MEDIUM/LOW confidence labels are overlaid on actionable findings.

Every candidate finding was subjected to the requested false-positive control: concrete source evidence was required; documented choices in `DESIGN.md` were treated as intentional unless they created measurable accessibility, usability, performance, responsive, or maintainability harm. In particular, Commit Mono, compact 11px technical metadata, route rails, square geometry, one-pixel borders, high information density, asymmetric composition, and restrained motion were not treated as defects merely for being unconventional.

### Detector and runtime boundary

The `audit` Skill calls for its bundled deterministic detector. This execution environment did not expose the native detector engine or a runnable browser checkout of this repository, so no detector-generated result is claimed. Detector-relevant source patterns were instead verified directly in context, and render-dependent questions are isolated in §12 rather than asserted as defects.

Likewise, no reliable browser renderer for this experimental repository was available. Exact clipping, rendered focus appearance, physical touch feel, animation smoothness, layout behavior at a specific viewport, LCP/CLS values, and actual network transfer sizes are therefore not claimed without source-conclusive evidence.

The Skill's usual follow-on command recommendations were intentionally omitted because this experiment forbids using the other design Skills during this stage and explicitly requires audit-only output.

## 3. Executive summary

### Implementation Integrity Verdict

**PASS — coherent and product-specific.** The homepage consistently expresses the documented OpenStatus system: operational route rails, compact technical hierarchy, semantic one-pixel structure, real product evidence, explicit monitoring/status-page language, and breakpoint-specific connected layouts. The source does not read as interchangeable generic SaaS markup. One isolated production-integrity concern remains: the global `ui.sh` UI Picker script is shipped unconditionally (AUD-009).

### Audit Health Score

| # | Dimension | Score | Key finding |
|---|---|---:|---|
| 1 | Accessibility | 2/4 | Author-supplied focus indicators and the theme-selection state have source-confirmed contrast/state issues. |
| 2 | Performance | 3/4 | Image handling is generally strong, but the hero theme pair can both receive priority and all zoomable screenshots advertise `100vw`. |
| 3 | Responsive Design | 3/4 | Defensive responsive CSS is extensive; a few shared controls remain below the Skill's 44px touch-target criterion. |
| 4 | Theming | 3/4 | Semantic tokens and light/dark assets are strong; the selected theme state is not robustly perceivable/programmatic. |
| 5 | Implementation Integrity | 3/4 | Strong product specificity; one unconditional design-tool script leaks into the production shell. |
| **Total** |  | **14/20** | **Good — address the weak dimensions before calling the homepage release-clean.** |

Overall assessment: the Step 7 homepage is structurally strong, responsive-minded, and unusually disciplined about product-specific implementation. It is not release-clean under the `audit` Skill because two source-confirmed accessibility defects map to WCAG AA/A requirements, followed by seven localized P2 issues.

- **P0:** 0
- **P1:** 2
- **P2:** 7
- **P3:** 0
- **Total findings:** 9
- **HIGH confidence:** 7
- **MEDIUM confidence:** 2
- **LOW confidence:** 0
- **Runtime-only verification checks:** 14

Highest priority: fix the authored focus-indicator contrast (AUD-001), expose and visually strengthen the active theme state (AUD-002), then complete reduced-motion coverage across the shared shell (AUD-003) and remove redundant hero-image priority behavior (AUD-007).

## 4. Findings

| ID | Severity | Confidence | Category | Area | Finding | Evidence | User Impact | Remediation |
|---|---|---|---|---|---|---|---|---|
| AUD-001 | P1 | HIGH | ACCESSIBILITY | Keyboard focus indicators | Author-supplied focus indicators do not reach the 3:1 non-text contrast threshold in light mode. | `packages/ui/src/globals.css` defines light `--ring: oklch(0.708 0 0)` and `--background: oklch(1 0 0)`; `apps/web/src/styles/globals.css` applies `outline-ring/50`; shared `Button` and homepage focusable rows use `focus-visible:border-ring` plus `focus-visible:ring-ring/50`. From the declared tokens, full `ring` is approximately 2.59:1 against the light background and `ring/50` approximately 1.54:1. WCAG 2.2 SC 1.4.11 requires 3:1 for authored visual information used to identify component states such as focus. | Keyboard and low-vision users can receive a materially weak authored indication of current focus on primary CTAs and other homepage controls. This is a release-level accessibility defect even though the interaction remains operable. | Increase the focus indicator's adjacent contrast to at least 3:1 in both themes (for example through an appropriate focus token, opacity, outline/border combination, or other non-color state cue) and verify every homepage control with keyboard focus. |
| AUD-002 | P1 | HIGH | ACCESSIBILITY | Footer theme selector | The selected theme is neither programmatically exposed nor visually distinguished with sufficient non-text contrast. | `apps/web/src/content/theme-toggle.tsx` sets only `data-active={theme === ...}` on three ordinary buttons; there is no `aria-pressed`, `aria-checked`, radio semantics, or group label. The active style is only `bg-muted`. From shared tokens, `muted` versus `background` is approximately 1.09:1 in light mode and 1.31:1 in dark mode, far below the 3:1 state-indicator threshold. | Screen-reader users cannot query which theme is selected, and low-vision users may not be able to distinguish the active option visually. This affects a user-settable state and conflicts with WCAG 2.2 SC 1.4.11 and the programmatic-state expectation of SC 4.1.2. | Model the three choices as one named mutually exclusive control (`radiogroup`/radio or an equivalent accessible pattern), expose selection with `aria-checked`/`aria-pressed`, and provide a selected-state cue that reaches required contrast without changing the documented visual language. |
| AUD-003 | P2 | HIGH | ACCESSIBILITY | Reduced motion across homepage shell | Reduced-motion handling is complete for the bespoke homepage motion module but not for shared menus/dialogs used on `/`. | `homepage-motion.module.css` disables hero/FAQ transforms and shortens scoped transitions under `prefers-reduced-motion`. In contrast, `header.tsx` and `copy-button.tsx` retain 300ms caret rotation; shared `dropdown-menu.tsx` retains fade/zoom/slide `animate-in/out`; shared `dialog.tsx` retains 200ms fade/zoom; `cmdk.tsx` can still show `animate-spin`. None of those paths includes a reduced-motion alternative. | Users who explicitly request reduced motion still encounter zoom, slide, rotation, and transient spinning in primary navigation/search interactions. The page-level preference is therefore only partially respected. | Add intentional reduced-motion variants to the shared menu/dialog/caret/loading paths used by the homepage, preserving state visibility rather than globally disabling useful feedback. |
| AUD-004 | P2 | HIGH | RESPONSIVE | Touch targets in sub-navigation/search controls | Several inherited interactive controls are smaller than the `audit` Skill's 44×44px touch-target criterion. | Shared `Button` defaults to `h-9` (36px). `CopyDropdownButton` uses that default height for both the copy control and dropdown trigger; the surrounding `ButtonGroup` padding is not part of either clickable target. The command dialog's close control and scope-clear control also have icon-sized content without an explicit 44px minimum. | Touch users have smaller hit areas for secondary but real homepage controls, increasing mis-taps on phones and at high zoom. | Give these controls an actual interactive box of at least 44×44 CSS px (or an equivalent expanded hit area) while retaining the compact visual treatment. Runtime-check the command dialog's icon-only controls after remediation. |
| AUD-005 | P2 | HIGH | ACCESSIBILITY | Primary navigation landmark | The primary site navigation is not exposed as a navigation landmark. | `apps/web/src/content/header.tsx` renders a `<header>` whose direct children are the logo/home link, Radix dropdown triggers, Pricing, search, and Dashboard. There is no `<nav>` or `role="navigation"` around the primary navigation set. | Screen-reader landmark navigation can reach the banner but cannot identify or jump specifically to the site's primary navigation region. | Preserve the existing connected-grid layout while marking the primary navigation set with a semantic `<nav>` and a concise accessible label where needed. |
| AUD-006 | P2 | HIGH | ACCESSIBILITY | Customer proof / heading hierarchy | The customer-proof section is a `<section>` without a heading in the document outline. | `Trust()` in `homepage.tsx` renders `<section>` followed by two `<p>` labels (`/customers` and the customer statement) and `CustomerLogos`; unlike the subsequent monitoring, incident, tooling, network, and FAQ sections, it has no `h2`. | Users navigating by headings skip an important proof section, and the `section` has no heading-derived accessible name. | Promote the existing customer-section title to a real `h2` while keeping its current visual styling, or provide an equivalent heading/`aria-labelledby` relationship without altering art direction. |
| AUD-007 | P2 | HIGH | PERFORMANCE | Hero screenshot preload / dark-mode image pair | The hero's light and dark screenshot instances both inherit the high-priority image prop, so the hidden theme variant can compete for early loading. | The hero `ProductEvidenceFrame` passes `priority` to `CustomImage`. `CustomImage` forwards the remaining props to `ZoomableImage`, which renders two Next `<Image>` instances (light and dark) and spreads the same props into both. `statuspage-meow.dark.png` exists, so this is a real two-asset pair. The app uses Next 16.3.0; Next's image guidance warns against priority/eager loading for CSS theme pairs because both variants can load. | An above-the-fold resource that is invisible in the current theme can consume early bandwidth and compete with the actual LCP candidate, especially on constrained connections. | Ensure only the theme-relevant hero asset receives high fetch priority/preload. Use a theme/media-aware image strategy rather than forwarding one priority prop to both rendered variants. |
| AUD-008 | P2 | MEDIUM | PERFORMANCE | Responsive screenshot sizing hints | Zoomable screenshots always advertise `sizes="100vw"` even when their layout is capped or only occupies a fraction of the viewport. | `ZoomableImage` hard-codes `sizes="100vw"` on both images. The landing shell is capped at `max-w-5xl`, and monitoring/incident screenshots live in `lg:col-span-7` of a 12-column grid. At desktop widths those images are materially narrower than the viewport. | The browser can choose a larger Next Image candidate than the rendered slot requires, increasing image transfer and decode work. The exact excess depends on viewport/DPR and must be measured at runtime. | Pass layout-aware `sizes` values from the evidence frame/use site (including the `max-w-5xl` cap and split-column desktop widths) and verify selected `srcset` candidates in DevTools. |
| AUD-009 | P2 | MEDIUM | IMPLEMENTATION | Global production script | A third-party UI inspection/design tool is loaded unconditionally from the root layout. | `apps/web/src/app/layout.tsx` includes `<Script src="https://ui.sh/ui-picker.js" />` with no environment or route gate. `ui.sh` describes the UI Picker as tooling for inspecting/selecting interface regions during agent/design work, not core OpenStatus visitor functionality. | Every homepage visit can incur an extra third-party request/script execution and inherits a nonessential third-party execution/supply-chain dependency. Exact bytes and main-thread cost require runtime measurement. | Gate the picker to development or an explicit internal/experiment mode, or otherwise keep it out of the normal production visitor path. |

No P3 findings were retained. Candidate low-impact aesthetic and style preferences were discarded rather than padded into the report.

## 5. Accessibility

The accessibility foundation is better than the finding count alone suggests. The root document declares `lang="en"`; the landing shell provides `header`, `main`, and `footer` landmarks; primary actions are real links/buttons; FAQ disclosure uses native `<details>/<summary>`; FAQ entries render real `h3` headings beneath the FAQ `h2`; screenshot images carry non-empty alternative text; and the homepage's custom rows/summaries intentionally define focus-visible behavior.

The two release-level issues are state perception rather than missing interactivity: authored focus indication is under the 3:1 non-text contrast threshold in light mode (AUD-001), and the theme selector exposes neither a robust visual selected state nor a programmatic selected state (AUD-002).

Reduced motion is only partially end-to-end (AUD-003). The bespoke homepage module is careful, but header dropdowns, the copy dropdown, and the command dialog inherit shared motion that ignores the preference.

Semantically, the page outline is generally sound, but the primary navigation has no navigation landmark (AUD-005) and the customer-proof `section` has no heading (AUD-006).

The documented 11px technical metadata was explicitly checked rather than automatically flagged. With the declared neutral tokens, light-mode `muted-foreground` against the white background is approximately 4.73:1 and the dark equivalent approximately 7.63:1, so the font size alone is not a source-confirmed WCAG text-contrast failure. Readability at text zoom remains a runtime check.

## 6. Responsive / layout

No source-conclusive horizontal-overflow or breakpoint-collapse defect was found in the Step 7 homepage.

Strengths include repeated `min-w-0`, `minmax(0,1fr)`, `overflow-wrap:anywhere`, `break-words`, mobile-first stacks, 360px/`sm`/`md`/`lg` transitions, and breakpoint-specific border joining. The same DOM is generally adapted rather than duplicated, which also protects keyboard/source order.

The concrete responsive issue is hit-area sizing (AUD-004): the shared 36px default button height remains on the sub-navigation copy controls, and compact icon-only controls in search do not establish a 44px target.

Actual 320px, 390px, 640–900px, 768px, and 1024px behavior still requires rendering. In particular, the 3-column header at narrow widths, 768px customer/evidence transitions, 1024px 12-column compositions, long route strings, screenshot frames, and connected borders should be visually verified before closure.

## 7. Interaction

The homepage uses appropriate native or mature primitive behavior in most places:

- primary actions are links, not click handlers on generic containers;
- header menus use Radix dropdown primitives;
- command search uses a Radix dialog/cmdk interaction model, with an `sr-only` dialog title and explicit input autofocus;
- FAQ disclosure is native `<details>/<summary>` rather than a custom div accordion;
- screenshot zoom uses an explicit zoom component with hidden-theme instances marked `aria-hidden`/`inert` after theme resolution;
- homepage-specific row interactions provide hover and focus states, and fine-pointer-only transforms avoid manufacturing hover motion on touch devices.

The interaction concerns are the weak authored focus contrast (AUD-001), incomplete selected-state semantics on the theme controls (AUD-002), incomplete reduced-motion coverage (AUD-003), and undersized touch targets in secondary controls (AUD-004).

Runtime verification is still required for exact tab order, focus restoration when dropdowns/dialogs close, Escape behavior, touch dismissal, image-zoom keyboard behavior, and rendered focus visibility in both themes.

## 8. Performance

The homepage composition itself is server-rendered and contains no page-specific scroll listener, parallax system, continuous background animation, or JavaScript-driven responsive layout. Most below-the-fold screenshots retain Next Image's lazy-loading path, and local image dimensions are resolved so the images have intrinsic width/height information.

Three concrete performance concerns remain:

1. **AUD-007:** the priority hero image is duplicated across light/dark image trees and the priority prop reaches both variants.
2. **AUD-008:** `sizes="100vw"` overstates the rendered screenshot width in capped/split layouts.
3. **AUD-009:** the root layout loads the external ui.sh UI Picker script unconditionally.

The footer's 60-second status query was reviewed but not promoted to a finding: it serves a visible live-status function, has a one-minute stale/refetch interval, and is not a meaningful performance defect on source evidence alone.

No layout-thrashing loop, unbounded `will-change`, layout-property animation, or homepage-specific high-frequency event listener was found.

## 9. Motion

The Step 7 motion vocabulary is technically disciplined inside `homepage-motion.module.css`:

- 120ms interaction feedback;
- 180ms state changes;
- 420–560ms hero-only entrance motion;
- transforms/opacity/clip-path rather than animated layout dimensions;
- no scroll reveal system, parallax, spring physics, or continuous hero animation;
- hover transforms are gated behind `(hover: hover) and (pointer: fine)`;
- `prefers-reduced-motion` removes hero/FAQ motion, resets transforms/clip paths, and preserves immediate state feedback rather than hiding content.

The issue is boundary completeness, not the page module itself. Shared dropdown/dialog/caret/loading animations remain active under reduced motion (AUD-003). That should be treated as an end-to-end shell defect, not as a criticism of the documented homepage motion vocabulary.

Animation smoothness and any clip-path paint cost are runtime checks only; source evidence does not justify calling them janky.

## 10. Theme / visual-system implementation

The homepage uses the shared semantic token layer consistently for background, foreground, muted, border, primary, and state-oriented surfaces. The light/dark token sets are real OKLCH theme values rather than one-off homepage literals. Product screenshots have actual `.dark` siblings and the zoom wrapper excludes the inactive theme instance from accessibility interaction after mount.

The documented hard-coded blue Dashboard link and semantic status colors were not treated as design-system drift because `DESIGN.md` records these as known/meaningful exceptions.

The main theming defect is AUD-002: selection is represented only by a low-contrast `bg-muted` change and is not exposed programmatically. The image-pair implementation also creates a performance consequence when the hero forwards priority to both variants (AUD-007), even though the visual dark-mode mechanism itself is coherent.

No source-confirmed light/dark text-contrast failure was found for the intentional small technical metadata.

## 11. Positive findings

1. **Strong product-specific implementation integrity.** Monitoring regions, incident communication, tooling paths, customer proof, and real OpenStatus screenshots are structurally integrated rather than added as generic decorative cards.
2. **Responsive defenses are pervasive.** `min-w-0`, `minmax(0,1fr)`, explicit wrapping, and breakpoint-aware grid/border changes materially reduce common narrow-layout failure modes.
3. **The bespoke motion layer is restrained and intentional.** It uses bounded timings, no scroll spectacle, fine-pointer hover gating, and a real reduced-motion branch.
4. **FAQ semantics are strong.** Native disclosure controls are preserved and each FAQ item participates in the heading hierarchy through a real `h3` inside `summary`.
5. **Homepage actions use semantic controls.** CTAs are links/buttons; interactive rows are links; no click-only generic divs were found in the audited homepage sections.
6. **Image layout stability is considered.** Local screenshots use Next Image with filesystem-derived intrinsic dimensions, reducing the risk of image-induced layout shift.
7. **Dark-mode screenshot behavior is intentional.** Real light/dark raster variants exist instead of applying destructive CSS filters, and inactive zoom trees are made `inert`/`aria-hidden` after theme resolution.
8. **Text token contrast is generally sound.** The source-defined muted text colors clear normal-text AA contrast in both themes, so the compact metadata is not automatically an accessibility failure.
9. **No homepage-specific continuous client animation or scroll listener exists.** The primary content composition remains a server component and responsive behavior is CSS-driven.
10. **Documented unconventional choices survived independent scrutiny.** Commit Mono, operational rails, square geometry, one-pixel separators, technical density, and restrained decoration were not found to create a source-confirmed quality defect by themselves.

## 12. Runtime verification checklist

The following **14 runtime-only checks** remain. They are checks, not additional confirmed findings.

1. **1440px / light mode:** verify no horizontal overflow; inspect hero/evidence frame alignment, connected borders, focus appearance, and selected image candidates.
2. **1440px / dark mode:** verify dark screenshot selection and use the Network panel to confirm whether both hero theme variants preload/fetch.
3. **1024px:** verify the `lg` transition for 12-column hero/monitoring/incident/tooling layouts, border joins, and route-rail wrapping.
4. **900px:** verify tablet restructuring between `md` and `lg`, especially tooling rows and screenshot framing.
5. **768px:** test the exact `md` transition for customer grid, trust composition, network section, and border joining.
6. **640px:** test the exact `sm` transition for hero evidence cells, metadata rail, CTA grouping, and header density.
7. **390px:** verify CTA width, two-column technical facts/customers, long path wrapping, screenshot frames, and no accidental x-scroll.
8. **320px:** stress the three-column header, command-search cell, long route strings, FAQ summaries, and global horizontal overflow.
9. **Keyboard-only:** traverse the whole page in DOM order; verify every focus indicator, dropdown/menu key behavior, dialog focus trap/restoration, FAQ toggling, and screenshot zoom controls.
10. **Touch:** measure/test the copy controls, command scope-clear and close controls, menu triggers/items, FAQ summaries, and screenshot zoom/dismiss gestures.
11. **Reduced motion:** enable OS/browser `prefers-reduced-motion`; verify hero/FAQ motion is removed and quantify the remaining header/dropdown/dialog/spinner motion identified in AUD-003.
12. **200% browser zoom:** verify reflow without two-dimensional page scrolling, clipped controls, hidden technical labels, or inaccessible screenshot/FAQ content.
13. **Light/dark/system switching:** verify visual state, screen-reader announcement of selection, system-theme changes, dark image swaps, and absence of focus loss during hydration/theme change.
14. **Performance trace/network:** measure LCP/CLS, selected image `srcset` widths, duplicate hero-theme requests, ui-picker transfer/execution, and any long-task cost from the interactive shell.

## 13. Prioritized remediation order

1. **AUD-001 — P1:** establish a WCAG-conforming authored focus indication across homepage controls.
2. **AUD-002 — P1:** make the selected theme state programmatic and sufficiently perceivable.
3. **AUD-003 — P2:** complete reduced-motion behavior across shared dropdown/dialog/caret/loading paths used by `/`.
4. **AUD-007 — P2:** stop the inactive hero theme image from receiving competing high-priority loading behavior.
5. **AUD-009 — P2:** remove or gate the unconditional production UI Picker script.
6. **AUD-004 — P2:** enlarge compact interactive hit areas to the audit Skill's 44px target criterion.
7. **AUD-005 — P2:** expose primary navigation as a navigation landmark.
8. **AUD-006 — P2:** give the customer-proof section a real heading/accessible name.
9. **AUD-008 — P2:** make screenshot `sizes` reflect their actual capped and split-column layout widths.

No remediation was implemented in this step.

## 14. Final verdict

**MATERIAL REMEDIATION RECOMMENDED**

The homepage is coherent, responsive-minded, and close to production quality, but two source-confirmed accessibility issues affect authored interaction-state perception and map to WCAG requirements. The remaining P2 findings are localized and do not justify a blocking verdict, but the P1 focus/theme-state defects should be addressed before treating the homepage as release-clean.