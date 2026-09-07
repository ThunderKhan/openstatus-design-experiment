# Web Design Guidelines Audit

## 1. Audit scope

This is Step 8 of the controlled homepage-design experiment. The audit target is the marketing homepage `/` at Step 7 commit:

`f8dc912d8a71ff718c7f25bf605914384e74d882` — `style(web): polish homepage visual details`

The review is intentionally read-only with respect to application code. The audit covers the rendered homepage path and only the shared code required to understand that path's actual behavior, including:

- `apps/web/src/app/(landing)/layout.tsx`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/(landing)/page.tsx`
- `apps/web/src/content/homepage.tsx`
- `apps/web/src/content/homepage-motion.module.css`
- directly consumed homepage components such as `ButtonLink`, `CustomerLogos`, `Grid`, `CustomImage`, `ImageZoom`, `Details`, `CustomLink`, `Header`, `SubNav`, and the copy controls
- directly consumed shared primitives/tokens where necessary, especially the shared Button and global styles

Out of scope: pricing, docs, blog, changelog, compare pages, dashboard, status pages, backend, infrastructure, and unrelated applications.

Browser rendering was not available for this audit. Findings in Section 4 are therefore limited to issues that can be responsibly established from source. Render-dependent questions are isolated in Section 6 and are not presented as confirmed violations.

## 2. Methodology / guideline source

Only the installed `web-design-guidelines` Skill was used as the review methodology.

Skill identity:

- Name: `web-design-guidelines`
- Author: Vercel
- Version: `1.0.0`
- Skill source: `vercel-labs/agent-skills/skills/web-design-guidelines/SKILL.md`

The Skill explicitly requires this process:

1. Fetch the latest guidelines before each review.
2. Read the specified UI files.
3. Check them against all rules in the fetched guideline document.
4. Report findings with concrete file/location evidence.

Canonical guideline source fetched fresh for this Step 8 review:

`https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`

The fetched rules cover Accessibility, Focus States, Forms, Animation, Typography, Content Handling, Images, Performance, Navigation & State, Touch & Interaction, Safe Areas & Layout, Dark Mode & Theming, Locale & i18n, Hydration Safety, Hover & Interactive States, Content & Copy, and explicit anti-patterns.

The Skill's default output is terse `file:line` findings. This audit uses the experiment's requested expanded table while preserving the same rule/evidence discipline.

Intentional OpenStatus characteristics such as Commit Mono, square geometry, compact technical type, 11px metadata, route rails, asymmetric grids, and high information density were not treated as violations merely because they are unconventional. The audit only records a finding when a current guideline connects to concrete implementation evidence and a plausible user impact.

## 3. Executive summary

Overall assessment: **strong implementation with one medium-severity accessibility omission and a small set of low-severity guideline divergences.** The previous design stages produced especially solid semantics, focus treatment, responsive overflow handling, image behavior, and reduced-motion support.

| Metric | Count |
| --- | ---: |
| P0 | 0 |
| P1 | 0 |
| P2 | 1 |
| P3 | 6 |
| High-confidence actionable findings | 7 |
| Medium-confidence actionable findings | 0 |
| Low-confidence actionable findings | 0 |
| Render-dependent actionable findings | 0 |
| Browser checks still required | 7 |

No finding indicates a broken primary task, misleading product state, inaccessible navigation path, fabricated live data, or major responsive failure from source analysis.

## 4. Findings

| ID | Severity | Confidence | Area | Finding | Guideline | Evidence | User impact | Recommended remediation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| WDG-001 | P2 | HIGH | Accessibility / landmarks | **VIOLATION — repeated navigation has no skip link to main content.** | Accessibility: heading hierarchy should include a skip link for main content. | `apps/web/src/app/(landing)/layout.tsx` renders `<Header />`, `<SubNav />`, then `<main>`, but no first-focusable skip-to-content link or target id is present. Repository search also found no skip-link implementation. | Keyboard and switch users must traverse the repeated header/dropdown/search/copy controls before reaching the homepage content on every page visit. | Add a visually-hidden-until-focused skip link before the header and a stable target on `<main>`. |
| WDG-002 | P3 | HIGH | Motion / performance | **VIOLATION — hero entrance animates `clip-path` in addition to transform/opacity.** | Animation: animate `transform`/`opacity` only for compositor-friendly motion. | `apps/web/src/content/homepage-motion.module.css` keyframes `hero-rail-in`, `hero-content-in`, and `hero-evidence-in` animate `clip-path`. Reduced-motion correctly disables them, but the default path still animates a non-listed property. | The one-time hero entrance can require more painting/compositing work than the guideline's preferred transform/opacity path, especially on lower-end devices. | Preserve the same hierarchy while implementing the reveal with transform/opacity only, or benchmark and document a deliberate exception. |
| WDG-003 | P3 | HIGH | Motion / shared controls | **VIOLATION — the shared Button used by homepage CTAs includes `transition-all`.** | Animation / anti-patterns: never use `transition: all`; list properties explicitly. | `packages/ui/src/components/ui/button.tsx` includes `transition-all` in `buttonVariants`. `apps/web/src/content/mdx-components/button-link.tsx` renders homepage CTAs through that Button; homepage/sub-nav copy controls also consume it. | Future state/style changes may unexpectedly animate unrelated properties and create harder-to-predict interaction behavior. Current visible impact is likely small. | Replace the shared primitive's `transition-all` with the specific color/background/border/shadow/transform properties it actually needs, after checking other consumers. |
| WDG-004 | P3 | HIGH | Locale / i18n | **VIOLATION — technical identifiers are not protected from auto-translation.** | Locale & i18n: brand names, code tokens, and identifiers should use `translate="no"`. | `apps/web/src/content/homepage.tsx` renders operational identifiers such as `/uptime-monitoring`, `/status-page`, `/tooling`, `/play/checker`, `/dashboard/monitor`, `/status-page/events`, tool paths, and `status.yourcompany.com` as ordinary text without `translate="no"`. | Browser or translation-service auto-translation can alter route-like strings/domains, weakening their role as trustworthy technical evidence. | Mark route/path/domain/code-like spans with `translate="no"` while leaving prose translatable. |
| WDG-005 | P3 | HIGH | Dark mode / browser chrome | **VIOLATION — page metadata does not define a theme color matching the page background.** | Dark Mode & Theming: `<meta name="theme-color">` should match page background. | `apps/web/src/lib/metadata/shared-metadata.ts` defines title, description, canonical, Twitter, and Open Graph metadata but no theme-color/viewport theme configuration; repository search found no `themeColor` or `theme-color` implementation. | Supporting mobile browsers may render browser chrome that visually conflicts with the light/dark page background. | Add theme-aware `theme-color` metadata/viewport configuration consistent with the semantic background token. |
| WDG-006 | P3 | HIGH | Navigation & state / FAQ | **IMPROVEMENT — FAQ expanded state is not represented in the URL.** | Navigation & State: URL should reflect state; expanded panels are explicitly listed as state worth deep-linking. | `apps/web/src/content/mdx-components/details.tsx` uses native `<details id={slugify(summary)}>`; `Homepage` renders FAQ entries without URL/query synchronization of the `open` state. The id supports a location target but does not encode which panel is expanded. | A user cannot reliably share/reload the homepage with a specific FAQ answer preserved as open. | If FAQ deep-linking is a product goal, sync the open panel to a fragment/query parameter while keeping native disclosure semantics. |
| WDG-007 | P3 | HIGH | Touch & interaction | **IMPROVEMENT — touch-specific interaction CSS is only partially implemented.** | Touch & Interaction: use `touch-action: manipulation`; set `-webkit-tap-highlight-color` intentionally. | `apps/web/src/content/image-zoom.tsx` explicitly uses `touch-manipulation` on zoom controls, but homepage action links/tooling/customer links and the shared Button do not. Global styles do not define an intentional tap-highlight policy. | Touch feedback/gesture behavior can vary more between browsers than the guideline recommends; this is a minor consistency risk rather than a task blocker. | Apply a deliberate touch-action/tap-highlight policy to actionable controls after verifying that it preserves zoom and expected browser gestures. |

### Severity calibration

- `WDG-001` is P2 because it creates repeated keyboard-navigation friction but does not block access to the main content.
- All remaining findings are P3: they are real rule divergences or meaningful implementation improvements, but none currently prevents task completion.
- No P0/P1 finding is justified by the available source evidence.

## 5. Positive / passing patterns

1. **Semantic navigation and actions — PASS.** Homepage destinations use `<Link>`/`<a>` and action controls use real Buttons. No clickable `<div>` navigation was found in the audited homepage path.
2. **Heading structure — PASS.** The page has one primary `h1`, section `h2`s, and FAQ questions are rendered as semantic `h3`s inside native summaries via `Details(headingLevel={3})`.
3. **Visible focus replacement — PASS.** Step 7 explicitly gives `SectionActionLink`, tooling rows, and FAQ summaries `focus-visible` states. The shared Button uses `outline-none` only together with a replacement `focus-visible:ring-[3px]`, satisfying the guideline's exception.
4. **Native disclosure semantics — PASS.** FAQ entries use native `<details>/<summary>` rather than custom click-only disclosure widgets.
5. **Image alt and layout stability — PASS.** `CustomImage` supplies `alt`, resolves intrinsic dimensions, and renders Next.js `<Image width height>`, reducing CLS risk. The hero product screenshot is marked `priority`; below-fold images inherit Next Image's lazy-loading behavior.
6. **Decorative indicator semantics — PASS.** The square indicator in `ProductEvidenceFrame` and the header caret are explicitly `aria-hidden`.
7. **Reduced motion — PASS.** `homepage-motion.module.css` has a dedicated `prefers-reduced-motion: reduce` branch that disables authored hero/FAQ animation and spatial interaction movement while leaving content available.
8. **Explicit motion properties in homepage-local CSS — PASS.** The homepage motion module lists transition properties rather than using `transition: all`; the only `transition-all` issue comes from the inherited shared Button primitive.
9. **Content wrapping/overflow defense — PASS.** The responsive implementation uses `min-w-0`, `minmax(0,1fr)`, `overflow-wrap:anywhere`, stacked metadata rails, and narrow-screen grid changes to proactively handle long technical strings.
10. **Numeric typography — PASS.** The `28` measurement and monitoring-step counters use tabular numerals where numeric alignment matters.

## 6. Render-dependent checks

These are **not confirmed violations**. They require a real browser/runtime and are intentionally excluded from the actionable-finding count.

1. **Keyboard traversal / skip behavior**
   - Test Tab/Shift+Tab from page load through Header, dropdown menus, Cmd-K control, copy controls, primary CTAs, customer links, screenshot zoom controls, tooling rows, and FAQ summaries.
   - Verify focus remains clearly visible in both themes and is not clipped by 1px grid containers.

2. **Responsive overflow at 1440 / 1024 / 768 / 390 / 320 px**
   - Confirm no horizontal document scrollbar.
   - Stress path strings, long customer names, status-page metadata, and the 28-region support cells around breakpoint transitions.

3. **Touch target size and gesture behavior**
   - Measure header controls, customer links, tooling rows, screenshot zoom controls, and section actions on 390px/320px touch viewports.
   - Verify controls remain comfortably targetable despite compact technical density.

4. **Light/dark contrast and browser chrome**
   - Verify `border-border`, `bg-muted/20`, focus rings, customer hover states, and screenshot framing retain sufficient visible separation in light and dark mode.
   - Confirm the browser's address/status bar behavior given the missing theme-color metadata.

5. **Hero animation frame stability**
   - Profile the 420–560ms load sequence on a throttled/lower-end device.
   - Check whether `clip-path` animation causes paint spikes, dropped frames, or delayed interaction.

6. **Image zoom runtime semantics**
   - Inspect the third-party `react-medium-image-zoom` generated zoom/unzoom buttons for accessible names, logical focus movement, Escape behavior, and focus restoration.
   - Confirm the dark/light duplicated zoom trees expose only the active theme instance to accessibility APIs after hydration.

7. **11px metadata readability**
   - Verify route rails, instrument metadata, alert labels, and evidence labels remain legible at 100% and 200% zoom on actual displays.
   - This is an intentional visual choice and should only become a finding if rendered usability evidence supports it.

## 7. Accessibility observations

The source-level accessibility picture is generally strong.

Positive evidence includes semantic links/buttons, native disclosure markup, meaningful screenshot alt text, `aria-hidden` on decorative indicators, explicit keyboard-focus states from Step 7, and reduced-motion support.

The primary confirmed accessibility issue is `WDG-001`: no skip link exists before the repeated marketing navigation. This creates avoidable keyboard-navigation cost on every visit.

No source-verifiable evidence supports a P0 or P1 accessibility failure. Runtime testing is still required for third-party image-zoom focus behavior, actual contrast, 200% zoom behavior, and the complete tab order.

## 8. Interaction observations

- Navigation is implemented with Links/anchors rather than click handlers on non-interactive elements.
- Homepage section actions, tooling destinations, and FAQ disclosures all expose visible hover/focus treatment in source.
- The screenshot evidence remains genuine static product imagery; interaction is applied to the surrounding zoom mechanism rather than by recreating fake moving UI.
- The shared Button primitive's `transition-all` is the clearest interaction implementation divergence (`WDG-003`).
- Touch-specific policy is incomplete outside image zoom (`WDG-007`); actual usability impact needs device testing.
- No destructive action is present in the audited homepage path, so destructive confirmation rules are not applicable.
- No form inputs are present on the homepage itself, so form-label/autocomplete/inputmode rules are not applicable to the primary content path.

## 9. Responsive observations

Source analysis shows deliberate responsive adaptation rather than simple desktop stacking:

- metadata rails stack before becoming horizontal;
- hero capability cells preserve connected-grid behavior;
- customer proof becomes a connected two-column mobile matrix;
- tooling delays the 5/7 split until `lg`;
- real screenshots remain visible and shrink within `min-w-0` wrappers;
- the 28-region support cells stack at the narrowest widths;
- technical text uses explicit wrap/min-width defenses.

No confirmed source-level overflow violation was found. Actual horizontal-overflow, touch-target, and intermediate-breakpoint behavior remain browser checks because source inspection cannot establish pixel-level results.

The semantic DOM order remains consistent with the visual narrative; no responsive `order-*` reordering that could disturb keyboard order was identified in the homepage implementation.

## 10. Motion observations

The Step 4 motion system remains restrained and largely guideline-aligned:

- 120ms immediate feedback;
- 180ms state transitions;
- 420–560ms hero-only authored entrance;
- no continuous animation;
- explicit transition-property lists in homepage-local CSS;
- reduced-motion disables nonessential animation and spatial movement;
- content is present in the DOM and does not depend on animation to become understandable.

The one confirmed motion guideline divergence is `WDG-002`: the hero reveal also animates `clip-path`, while the current guideline calls for transform/opacity-only animation. Because the animation is short, one-time, and disabled under reduced motion, severity remains P3 pending real performance evidence.

The inherited shared Button `transition-all` is tracked separately as `WDG-003`.

## 11. Prioritized remediation order

No remediation was implemented in Step 8. Suggested order if a later stage chooses to act:

1. **WDG-001 — add a skip link** (P2, accessibility).
2. **WDG-003 — replace shared Button `transition-all` with explicit properties** (P3, predictable interaction/motion).
3. **WDG-002 — remove or justify hero `clip-path` animation** (P3, motion/performance).
4. **WDG-004 — protect technical identifiers with `translate="no"`** (P3, i18n robustness).
5. **WDG-005 — define theme-color metadata** (P3, theming/browser chrome).
6. **WDG-006 — consider URL synchronization for FAQ expanded state** (P3, deep-linking/state).
7. **WDG-007 — establish deliberate touch-action/tap-highlight behavior** (P3, touch consistency).

## 12. Final verdict

**YES, WITH MINOR REMEDIATION**

The Step 7 homepage meets a strong production interface-quality bar in its semantic structure, content hierarchy, responsive source strategy, focus treatment, image handling, and reduced-motion behavior. The audit found no blockers or high-severity defects.

The missing skip link is the only medium-severity issue and should be addressed before calling keyboard-navigation ergonomics fully resolved. The remaining findings are low-severity guideline compliance or robustness improvements rather than evidence that the design direction or implementation is materially unsound.

Because no browser runtime was available, this verdict is conditional on the render-dependent checks in Section 6 passing.