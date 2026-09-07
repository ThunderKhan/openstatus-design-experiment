# Homepage Audit Synthesis

## 1. Experiment context

This document is Step 11 of the controlled homepage-design experiment. It synthesizes three independent audits of the exact same finished Step 7 homepage implementation:

- Step 7 application commit: `f8dc912d8a71ff718c7f25bf605914384e74d882` — `style(web): polish homepage visual details`
- Step 8: Web Design Guidelines audit
- Step 9: independent technical/design audit
- Step 10: independent React / Next.js Best Practices audit

The independence constraint used while producing Steps 8–10 is intentionally over for this synthesis. The three reports were compared directly, and the Step 7 implementation was inspected where necessary to adjudicate disagreements.

No application remediation is performed here. The purpose is to normalize findings, evaluate evidence, preserve runtime uncertainty where it genuinely exists, and produce a remediation backlog rather than a fourth audit.

Repository comparison confirms that the three commits after Step 7 changed only the three audit documents. The application source under discussion therefore remains the Step 7 implementation.

## 2. Source audits

### Web Design Guidelines

Methodology: rule-oriented interface review based on the installed Web Design Guidelines methodology used in Step 8. It emphasized accessibility conventions, focus behavior, motion rules, navigation/state, touch policy, dark-mode/browser integration, localization robustness, images, and explicit interface anti-patterns.

Original findings: **7** (`WDG-001` through `WDG-007`).

Original severity distribution: 1 P2, 6 P3. It also recorded 7 browser checks that were deliberately not promoted to findings.

### Audit

Methodology: broad code-level technical/design audit used in Step 9, with explicit scoring across accessibility, performance, theming, responsive design, and implementation integrity. It was more willing to calculate contrast/state implications directly from source tokens and to treat semantic structure as a release-quality concern.

Original findings: **9** (`AUD-001` through `AUD-009`).

Original severity distribution: 2 P1, 7 P2. It also recorded 14 runtime-only checks.

### React / Next.js Best Practices

Methodology: React/Next.js implementation review used in Step 10, prioritized around waterfalls, client bundle size, server work, data flow, hydration, rendering cost, effects, and resource loading.

Original findings: **4** (`RBP-001` through `RBP-004`).

Original severity distribution: 3 P2, 1 P3. It also recorded 6 runtime-only checks and deliberately declined to convert several source observations into guaranteed performance defects without measurement.

Across the three source reports there are 20 finding IDs. One pair (`AUD-007` and `RBP-003`) describes the same underlying hero-image priority defect, yielding **19 normalized concerns**.

## 3. Cross-audit executive summary

The synthesis uses evidence rather than vote count. A finding is not accepted merely because multiple audits mentioned it, and a specialized finding is not discounted merely because only one methodology could reasonably detect it.

| Metric | Count |
| --- | ---: |
| Normalized concerns | 19 |
| Exact corroboration | 1 |
| Partial corroboration | 4 |
| Unique | 12 |
| Disagreement | 2 |
| Measurement required | 6 |
| FIX | 6 |
| FIX IF LOW-RISK | 3 |
| MEASURE FIRST | 6 |
| DEFER | 2 |
| REJECT | 2 |

The highest-confidence release-clean blockers are not the performance hypotheses. They are the accessibility/correctness items that source establishes directly: skip navigation, weak authored focus-state contrast, theme-selector state semantics/perception, incomplete reduced-motion coverage in shared shell interactions, the missing primary navigation landmark, and the customer-proof section's missing heading relationship.

The strongest cross-methodology performance signal is the hero light/dark priority behavior. Source proves both mutually exclusive hero image instances inherit the same priority/preload intent; runtime evidence is still required before claiming duplicate transfer bytes or a measurable LCP regression.

## 4. Normalized issue registry

| SYN ID | Underlying Concern | Source Findings | Relationship | Synthesis Severity | Confidence | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| SYN-001 | No skip link to the repeated main content region | WDG-001 | UNIQUE | HIGH | HIGH | FIX |
| SYN-002 | Hero entrance animates `clip-path` without measured runtime harm | WDG-002 | DISAGREEMENT + RUNTIME-DEPENDENT | VERIFY FIRST | MEASUREMENT REQUIRED | MEASURE FIRST |
| SYN-003 | Shared Button uses `transition-all` | WDG-003 | UNIQUE | LOW | HIGH | DEFER |
| SYN-004 | Route/domain-like technical identifiers are not protected from auto-translation | WDG-004 | UNIQUE | LOW | MEDIUM | FIX IF LOW-RISK |
| SYN-005 | No theme-aware browser `theme-color` metadata | WDG-005 | UNIQUE | LOW | HIGH | FIX IF LOW-RISK |
| SYN-006 | FAQ open state is not encoded in the URL | WDG-006 | UNIQUE | OPTIONAL | HIGH | REJECT |
| SYN-007 | No site-wide `touch-action` / tap-highlight policy | WDG-007 | UNIQUE | OPTIONAL | MEDIUM | REJECT |
| SYN-008 | Authored focus indicator contrast is too weak in light mode | AUD-001 | PARTIAL CORROBORATION | HIGH | HIGH | FIX |
| SYN-009 | Theme selector lacks robust programmatic and visual selected state | AUD-002 | UNIQUE | HIGH | HIGH | FIX |
| SYN-010 | Reduced-motion handling does not cover shared shell menus/dialogs/carets/loading | AUD-003 | UNIQUE | MEDIUM | HIGH | FIX |
| SYN-011 | Some touch targets are below the audit methodology's 44px target | AUD-004 | PARTIAL CORROBORATION + RUNTIME-DEPENDENT | LOW | MEDIUM | FIX IF LOW-RISK |
| SYN-012 | Primary site navigation lacks a navigation landmark | AUD-005 | UNIQUE | MEDIUM | HIGH | FIX |
| SYN-013 | Customer-proof section has no heading/accessible section name | AUD-006 | DISAGREEMENT | MEDIUM | HIGH | FIX |
| SYN-014 | Both light and dark hero images inherit critical priority/preload intent | AUD-007, RBP-003 | EXACT CORROBORATION + RUNTIME-DEPENDENT | VERIFY FIRST | MEASUREMENT REQUIRED | MEASURE FIRST |
| SYN-015 | Screenshot `sizes="100vw"` may cause oversized responsive-image selection | AUD-008 | PARTIAL CORROBORATION + RUNTIME-DEPENDENT | VERIFY FIRST | MEASUREMENT REQUIRED | MEASURE FIRST |
| SYN-016 | `ui.sh` UI Picker is unconditionally present in the root production path | AUD-009 | PARTIAL CORROBORATION + RUNTIME-DEPENDENT | VERIFY FIRST | MEASUREMENT REQUIRED | MEASURE FIRST |
| SYN-017 | CmdK/search implementation is eagerly present in the initial client graph | RBP-001 | UNIQUE + RUNTIME-DEPENDENT | VERIFY FIRST | MEASUREMENT REQUIRED | MEASURE FIRST |
| SYN-018 | Screenshot zoom client code/hydration is eager for all homepage evidence images | RBP-002 | UNIQUE + RUNTIME-DEPENDENT | VERIFY FIRST | MEASUREMENT REQUIRED | MEASURE FIRST |
| SYN-019 | Immutable content/image metadata uses synchronous filesystem reads during render/build evaluation | RBP-004 | UNIQUE | LOW | HIGH | DEFER |

## 5. Detailed adjudication

### SYN-001 — No skip link to the repeated main content region

**Sources:** `WDG-001`.

**What each audit said:** The Web Design Guidelines audit identified the absence of a skip link as its only P2 item. The broad Audit report did not elevate it, although it recognized the landing shell's `header`, `main`, and `footer` structure. React Best Practices did not cover this concern.

**Underlying source evidence:** `src/app/(landing)/layout.tsx` renders `<Header />`, `<SubNav />`, then `<main className="flex-1 px-4 py-4">`, with no preceding skip-to-content control and no stable main target id.

**Agreement/disagreement analysis:** This is a scope-specialized finding, not a vote-count issue. The absence is source-conclusive. The other audits' silence does not weaken it because neither was specifically optimized for bypass-block navigation ergonomics.

**Realistic impact:** Keyboard and switch users repeatedly traverse site chrome before reaching page-specific content. It does not make content unreachable, but it adds recurring navigation cost across the marketing site.

**Synthesis severity:** HIGH. This is an accessibility/correctness issue worth resolving before calling the shell release-clean.

**Confidence:** HIGH.

**Decision:** FIX.

**Recommended remediation or measurement:** Add a first-focusable skip link before repeated navigation and a stable target on `<main>`. Verify keyboard visibility and focus landing in both themes.

### SYN-002 — Hero `clip-path` animation is a rule divergence, not yet a measured performance defect

**Sources:** `WDG-002`; contrary interpretation in the Audit motion section and React Best Practices rendering section.

**What each audit said:** Web Design Guidelines treated any `clip-path` animation as a guideline violation because its preferred rule is transform/opacity-only motion. Audit explicitly stated that clip-path paint cost should remain a runtime check and did not call it jank. React Best Practices likewise called exact paint cost a profiling question rather than a source-confirmed React issue.

**Underlying source evidence:** `homepage-motion.module.css` animates `clip-path` in `hero-rail-in`, `hero-content-in`, and `hero-evidence-in`, together with opacity and one small translate. The sequence is one-time, 420–560ms, and disabled under `prefers-reduced-motion`.

**Agreement/disagreement analysis:** This is a genuine difference in evidence standard. All methodologies agree on the implementation fact. They disagree on whether rule divergence alone proves an actionable defect. Because the user-impact claim is specifically paint/compositing cost, runtime evidence is necessary.

**Realistic impact:** Could create avoidable paint work on low-end hardware, but the motion is short, bounded, non-continuous, and reduced-motion aware. Source alone does not show dropped frames, delayed interaction, or LCP harm.

**Synthesis severity:** VERIFY FIRST.

**Confidence:** MEASUREMENT REQUIRED.

**Decision:** MEASURE FIRST.

**Recommended remediation or measurement:** Profile cold-load hero animation at 390px and desktop widths under CPU throttling. Capture paint/composite events, long tasks, frame drops, and LCP timing. Only replace the reveal if the animation produces measurable instability or cost.

### SYN-003 — Shared Button uses `transition-all`

**Sources:** `WDG-003`.

**What each audit said:** Web Design Guidelines flagged `transition-all` as an explicit anti-pattern. Audit noted the homepage-local motion CSS is disciplined and did not elevate the inherited primitive behavior. React Best Practices did not treat it as material.

**Underlying source evidence:** `packages/ui/src/components/ui/button.tsx` includes `transition-all` in the base `buttonVariants` class. Homepage CTA/copy paths consume this shared primitive.

**Agreement/disagreement analysis:** The finding is technically correct. The question is value and change radius, not factual accuracy. The class lives in a shared package, so a seemingly tiny cleanup can affect consumers outside the homepage experiment.

**Realistic impact:** Current visible homepage harm is low. The main risk is future accidental animation of unrelated properties and less predictable state transitions.

**Synthesis severity:** LOW.

**Confidence:** HIGH.

**Decision:** DEFER.

**Recommended remediation or measurement:** If the shared UI package is later cleaned up, replace `transition-all` with an explicit property list after checking downstream consumers. Do not broaden Step 11/this experiment into a shared-primitive refactor solely for this item.

### SYN-004 — Technical identifiers are not protected from auto-translation

**Sources:** `WDG-004`.

**What each audit said:** Only Web Design Guidelines elevated this. The other audits did not cover browser translation robustness.

**Underlying source evidence:** `homepage.tsx` displays route/domain-like strings such as `/status-page`, `/uptime-monitoring`, `/tooling`, `/play/checker`, `/dashboard/monitor`, `/status-page/events`, and `status.yourcompany.com` as ordinary text without `translate="no"`.

**Agreement/disagreement analysis:** The source fact is clear, but practical impact exists only when browser/translation tooling would otherwise alter identifier-like strings. This is a robustness improvement, not a general accessibility defect.

**Realistic impact:** Low-frequency but plausible loss of trust/clarity if machine translation modifies technical evidence that should remain literal.

**Synthesis severity:** LOW.

**Confidence:** MEDIUM.

**Decision:** FIX IF LOW-RISK.

**Recommended remediation or measurement:** Apply `translate="no"` narrowly to code/path/domain identifiers, not surrounding prose. This should be a localized hardening change rather than a broad translation policy.

### SYN-005 — Missing theme-aware browser `theme-color`

**Sources:** `WDG-005`.

**What each audit said:** Web Design Guidelines identified missing browser-chrome integration. Audit discussed theming quality but did not elevate this metadata issue. React Best Practices did not cover it.

**Underlying source evidence:** Root/default metadata contains title, description, canonical, Twitter, and Open Graph data. No theme-aware theme-color configuration exists in `shared-metadata.ts` or `app/layout.tsx`.

**Agreement/disagreement analysis:** This is a valid convention-level gap with limited product impact.

**Realistic impact:** On supporting mobile browsers, browser chrome can visually mismatch the current light/dark page background.

**Synthesis severity:** LOW.

**Confidence:** HIGH.

**Decision:** FIX IF LOW-RISK.

**Recommended remediation or measurement:** Add light/dark theme-color configuration using the current Next.js-supported viewport/metadata mechanism and verify mobile browser chrome in both themes.

### SYN-006 — FAQ open state is not encoded in the URL

**Sources:** `WDG-006`.

**What each audit said:** Web Design Guidelines framed this as an improvement if FAQ deep-linking is a product goal. Audit explicitly praised native FAQ semantics. React Best Practices found no relevant state-architecture problem.

**Underlying source evidence:** `Details` renders native `<details id={slugify(summary)} open={open}>`. FAQ entries have stable ids but no client synchronization between `open` state and fragment/query state.

**Agreement/disagreement analysis:** The finding is an example of a guideline being more prescriptive than the product requirement. A native FAQ does not inherently need URL-synchronized expanded state to be production quality.

**Realistic impact:** Users cannot reload/share a URL that guarantees a particular FAQ remains open. The existing id still provides a targetable anchor.

**Synthesis severity:** OPTIONAL.

**Confidence:** HIGH about the implementation; low product necessity.

**Decision:** REJECT.

**Recommended remediation or measurement:** No change unless product requirements explicitly call for deep-linkable persisted disclosure state.

### SYN-007 — Missing broad touch-action / tap-highlight policy

**Sources:** `WDG-007`.

**What each audit said:** Web Design Guidelines preferred `touch-action: manipulation` and an explicit tap-highlight policy across actionable controls. Audit instead focused on physical target size, which is a different concern. React Best Practices did not cover touch CSS policy.

**Underlying source evidence:** `image-zoom.tsx` explicitly applies `touch-manipulation` to zoom/unzoom controls. Global styles and most homepage actions do not define a universal touch-action/tap-highlight policy.

**Agreement/disagreement analysis:** This must not be merged with SYN-011. Touch-action policy and physical hit-area size concern different failure modes. The source shows inconsistency, but not a demonstrated usability defect.

**Realistic impact:** Browser-specific gesture/tap feedback may vary, but default browser behavior is not inherently wrong. A global tap-highlight override can itself reduce useful feedback if applied carelessly.

**Synthesis severity:** OPTIONAL.

**Confidence:** MEDIUM.

**Decision:** REJECT.

**Recommended remediation or measurement:** Preserve default platform behavior unless device testing reveals a specific gesture problem. Do not add a global policy merely to satisfy a style rule.

### SYN-008 — Focus styling exists, but its authored contrast is too weak

**Sources:** `AUD-001`; related Web Design Guidelines focus pass/runtime check.

**What each audit said:** Audit calculated that the light `--ring` token and especially `ring/50` do not provide a 3:1 non-text contrast signal against the light background. Web Design Guidelines correctly observed that focus-visible replacements exist and therefore did not flag missing focus styling; it separately listed rendered focus contrast as a browser check.

**Underlying source evidence:** Shared tokens define light `--ring: oklch(0.708 0 0)` against white `--background`. Shared Button and homepage rows use combinations such as `focus-visible:border-ring`, `focus-visible:ring-ring/50`, and `focus-visible:ring-[3px]`. Homepage FAQ and tooling/action controls reuse the same weak ring family.

**Agreement/disagreement analysis:** There is no contradiction between “focus-visible styling exists” and “the resulting visual focus indicator is too low contrast.” The former is an implementation-presence check; the latter is a perceptibility threshold check. Audit supplied the more specific evidence.

**Realistic impact:** Keyboard and low-vision users can have difficulty locating current focus, including on primary and repeated controls.

**Synthesis severity:** HIGH.

**Confidence:** HIGH. Source token values establish the core problem; browser verification should confirm the final rendered combinations rather than decide whether the issue exists.

**Decision:** FIX.

**Recommended remediation or measurement:** Strengthen the authored focus state so its adjacent contrast meets the intended threshold in both themes. Runtime-check all homepage focusable controls after the token/style change.

### SYN-009 — Theme selector selected state is not robustly exposed

**Sources:** `AUD-002`.

**What each audit said:** Audit found both a programmatic-state and visual-state problem. Web Design Guidelines did not elevate the control despite reviewing theming. React Best Practices treated theme state/hydration as structurally reasonable but did not audit accessibility semantics.

**Underlying source evidence:** `theme-toggle.tsx` renders three ordinary buttons with `data-active={theme === ...}` and `bg-muted` for the active state. There is no `aria-pressed`, radio semantics, `aria-checked`, or named group. The selected cue is the low-contrast `muted` background against the page background.

**Agreement/disagreement analysis:** This is specialized accessibility evidence, not invalidated by the other audits' silence.

**Realistic impact:** Screen-reader users cannot query the selected theme from the control itself, and low-vision users may struggle to perceive the selected option visually.

**Synthesis severity:** HIGH.

**Confidence:** HIGH.

**Decision:** FIX.

**Recommended remediation or measurement:** Use a named mutually exclusive selection pattern (radio/radiogroup or an equivalent button pattern with explicit pressed state) and a clearly perceivable selected-state cue. Verify light/dark/system selection with keyboard and a screen reader.

### SYN-010 — Reduced-motion coverage stops at the bespoke homepage layer

**Sources:** `AUD-003`; related positive observations in WDG and RBP.

**What each audit said:** Audit found that homepage-local motion honors `prefers-reduced-motion` but shared header dropdown, copy-button caret, dialog animation, and loading spinner paths remain active. Web Design Guidelines praised the homepage motion module's reduced-motion branch. React Best Practices likewise recognized that the page motion and zoom image transitions include reduced-motion handling.

**Underlying source evidence:** `homepage-motion.module.css` disables hero/FAQ/spatial transforms under reduced motion. In contrast, `header.tsx` and `copy-button.tsx` retain `duration-300` rotation; shared `dropdown-menu.tsx` retains fade/zoom/slide animations; shared `dialog.tsx` retains fade/zoom transitions; `cmdk.tsx` uses `animate-spin` while loading.

**Agreement/disagreement analysis:** This is another boundary distinction rather than contradiction. The bespoke motion implementation is good; the complete user journey still crosses shared motion paths that do not consult the preference.

**Realistic impact:** A user who has explicitly requested reduced motion can still encounter nonessential zoom/slide/rotation in primary shell interactions.

**Synthesis severity:** MEDIUM.

**Confidence:** HIGH.

**Decision:** FIX.

**Recommended remediation or measurement:** Add reduced-motion variants to the specific shared shell animations used by `/`, preserving necessary state/loading feedback. Verify the resulting behavior with the OS/browser preference enabled.

### SYN-011 — Some controls are below the audit methodology's 44px touch target

**Sources:** `AUD-004`; Web Design Guidelines runtime touch-target check.

**What each audit said:** Audit promoted several controls below a 44×44px target to P2. Web Design Guidelines did not call target sizing a source-confirmed violation and explicitly requested device measurement. Its separate WDG-007 concern was touch-action policy, not hit-area size.

**Underlying source evidence:** Shared Button default height is `h-9` (36px). `CopyDropdownButton` uses default Button sizing for its two clickable controls. The command scope-clear and dialog close controls are icon-oriented and do not establish a 44px minimum. Other homepage action links intentionally use `min-h-11` (44px).

**Agreement/disagreement analysis:** The factual size concern is partly source-supported, but 44px is the Audit methodology's preferred target, not a universal pass/fail threshold for every control under current WCAG target-size criteria. Runtime bounding boxes are still needed for some controls. This is therefore a hardening item, not a release-level defect on the evidence available.

**Realistic impact:** Smaller secondary hit areas can increase mis-taps on compact mobile layouts.

**Synthesis severity:** LOW.

**Confidence:** MEDIUM.

**Decision:** FIX IF LOW-RISK.

**Recommended remediation or measurement:** Measure actual clickable bounding boxes at 390px and 320px. Preserve compact visual geometry while expanding interaction boxes where it can be done without destabilizing the connected-grid layout.

### SYN-012 — Primary site navigation lacks a navigation landmark

**Sources:** `AUD-005`.

**What each audit said:** Audit found no `<nav>` or `role="navigation"` around the site's primary link/menu set. Web Design Guidelines praised semantic links/actions but did not specifically certify a navigation landmark. React Best Practices was out of scope.

**Underlying source evidence:** `header.tsx` renders one `<header>` containing logo, two Radix dropdown triggers, Pricing, CmdK, and Dashboard, but no `<nav>` wrapper/landmark for the primary navigation set.

**Agreement/disagreement analysis:** A set of semantic links/buttons is not equivalent to exposing a navigation landmark. The Web Design Guidelines “semantic navigation and actions” pass does not refute this narrower structural issue.

**Realistic impact:** Screen-reader landmark navigation can reach the banner but cannot directly identify/jump to the primary site navigation region.

**Synthesis severity:** MEDIUM.

**Confidence:** HIGH.

**Decision:** FIX.

**Recommended remediation or measurement:** Mark the primary site navigation set with semantic navigation markup and an accessible label if needed, while preserving the connected grid and DOM order.

### SYN-013 — Customer-proof section has no heading

**Sources:** `AUD-006`; conflicting Web Design Guidelines heading-structure pass.

**What each audit said:** Audit identified `Trust()` as a `<section>` whose visible labels are paragraphs rather than a heading. Web Design Guidelines reported the overall page heading structure as a pass, citing one `h1`, section `h2`s, and FAQ `h3`s.

**Underlying source evidence:** `Trust()` in `homepage.tsx` renders `<section>` and then `<p>/customers</p>` plus `<p>Teams use OpenStatus to make reliability visible.</p>`. Later major sections render explicit `h2`s. The Trust section itself has no heading-derived accessible name.

**Agreement/disagreement analysis:** This is an actual contradiction in audit conclusion, resolved by source inspection. The broad WDG heading pass was directionally true for most of the page but overgeneralized; the specific Audit finding is correct.

**Realistic impact:** Heading-navigation users can skip an important proof section, and the semantic `<section>` has no heading relationship.

**Synthesis severity:** MEDIUM.

**Confidence:** HIGH.

**Decision:** FIX.

**Recommended remediation or measurement:** Promote the existing customer-section statement/label to a semantic heading while retaining the current visual treatment, or create an equivalent `aria-labelledby` relationship.

### SYN-014 — Both hero theme images receive critical priority intent

**Sources:** `AUD-007`, `RBP-003`.

**What each audit said:** Audit and React Best Practices independently traced the same prop flow: hero `priority` enters `ProductEvidenceFrame`, passes through `CustomImage`, and is spread into both light and dark Next `<Image>` instances. Both warned that the inactive theme image can compete for early resources. React Best Practices was especially explicit that actual transfer/priority timing still needs Network verification.

**Underlying source evidence:** `homepage.tsx` passes `priority` only for the hero screenshot. `custom-image.tsx` forwards remaining image props into `ZoomableImage`. `image-zoom.tsx` spreads the same `...rest` into both light and dark `<Image>` instances. Distinct `.png` and `.dark.png` assets exist.

**Agreement/disagreement analysis:** This is the strongest exact corroboration in the experiment: two different methodologies identified substantially the same underlying implementation concern. However, source proves duplicated priority/preload intent, not guaranteed duplicate network transfer bytes, LCP regression, or browser scheduling harm.

**Realistic impact:** Potential early-bandwidth competition on constrained connections. The magnitude could range from negligible to meaningful depending on generated preload markup and browser behavior.

**Synthesis severity:** VERIFY FIRST.

**Confidence:** MEASUREMENT REQUIRED for meaningful user impact, although the prop duplication itself is source-conclusive.

**Decision:** MEASURE FIRST.

**Recommended remediation or measurement:** Cold-load light and dark themes with DevTools Network. Capture preload links, request count, request priority, transfer bytes, `currentSrc`, and LCP. If both theme assets are requested/treated as critical before LCP, redesign loading so only the potentially visible hero resource is critical.

### SYN-015 — `sizes="100vw"` may over-select screenshot candidates

**Sources:** `AUD-008`; React Best Practices measurement-dependent image observation.

**What each audit said:** Audit promoted the hard-coded `sizes="100vw"` behavior to a medium-confidence performance finding. React Best Practices independently noticed the same mismatch but deliberately kept it as a runtime observation because only `currentSrc`, DPR, rendered width, and transfer data can establish actual waste.

**Underlying source evidence:** `image-zoom.tsx` hard-codes `sizes="100vw"` on both image instances. The marketing shell is capped at `max-w-5xl`, and monitoring/incident screenshots occupy partial grid columns on desktop.

**Agreement/disagreement analysis:** The two methods agree on the source mismatch but use different thresholds for promoting it. This is partial corroboration plus a meaningful evidence-standard difference.

**Realistic impact:** The browser may choose a larger optimized image than the actual rendered slot requires, increasing transfer/decode cost. It may also choose an acceptably close candidate, making the optimization low-value.

**Synthesis severity:** VERIFY FIRST.

**Confidence:** MEASUREMENT REQUIRED.

**Decision:** MEASURE FIRST.

**Recommended remediation or measurement:** At representative viewport/DPR combinations, record rendered CSS width, `img.currentSrc`, candidate intrinsic width, and transfer size for each screenshot. Only author more precise `sizes` if the browser materially over-selects candidates.

### SYN-016 — Unconditional `ui.sh` UI Picker in the root layout

**Sources:** `AUD-009`; React Best Practices third-party-script observation.

**What each audit said:** Audit treated the unconditional UI Picker as a production-integrity P2 finding. React Best Practices confirmed the same unconditional root `<Script>` but declined to call it a defect until product intent and runtime cost were known, noting that Next Script is not parser-blocking by default.

**Underlying source evidence:** `app/layout.tsx` unconditionally renders `<Script src="https://ui.sh/ui-picker.js" />`. OpenPanel is environment-gated; the UI Picker is not.

**Agreement/disagreement analysis:** The source structure is undisputed. The disagreement is threshold: Audit inferred that design-inspection tooling is inappropriate for ordinary production visitors; React Best Practices required confirmation of product intent and runtime magnitude before promotion. The synthesis keeps that uncertainty explicit.

**Realistic impact:** Possible nonessential third-party request, script execution, privacy/supply-chain surface, and initial-interaction cost. If the script is intentionally production-facing, the integrity argument weakens; if it is only experiment/design tooling, the case for gating is strong even if bytes are small.

**Synthesis severity:** VERIFY FIRST.

**Confidence:** MEASUREMENT REQUIRED.

**Decision:** MEASURE FIRST.

**Recommended remediation or measurement:** Confirm intended production purpose, then capture transfer bytes, execution time, and main-thread tasks in a production build. If it is not visitor functionality, gate/remove it regardless of whether performance cost is large.

### SYN-017 — CmdK/search implementation is eager in the initial client graph

**Sources:** `RBP-001`.

**What each audit said:** React Best Practices alone specialized enough to raise this. It noted that the search network request is correctly activation-gated, but the command/dialog/query code is imported and hydrated before the palette is opened.

**Underlying source evidence:** `header.tsx` always renders `<CmdK />`. `cmdk.tsx` is a Client Component importing cmdk, Radix command/dialog primitives, TanStack Query, theme/router code, icons, debounce support, and the full search implementation while `open` is initially false.

**Agreement/disagreement analysis:** This is a valid architectural observation, but the importance is bundle-size dependent. The other audits' silence is expected because they did not audit route JS composition.

**Realistic impact:** Potential unconditional JS download/parse/hydration cost for a feature many visitors never open.

**Synthesis severity:** VERIFY FIRST.

**Confidence:** MEASUREMENT REQUIRED.

**Decision:** MEASURE FIRST.

**Recommended remediation or measurement:** Inspect production route client chunks and browser code coverage. Record bytes attributable to CmdK/search dependencies plus parse/execute/hydration time. Defer the full implementation only if the measured contribution is material enough to justify added lazy-load complexity.

### SYN-018 — Screenshot zoom code/hydration is eager for all evidence images

**Sources:** `RBP-002`.

**What each audit said:** React Best Practices found that all three homepage screenshots default to client `ZoomableImage`, eagerly importing `react-medium-image-zoom`, mounting two theme-specific zoom trees per screenshot, and triggering one post-mount state update per screenshot. The design/audit reports considered image zoom behavior generally sound from an interaction/accessibility standpoint.

**Underlying source evidence:** `custom-image.tsx` defaults to zoom unless `disableZoom` is set. All three homepage evidence frames use that default. `image-zoom.tsx` is a Client Component importing the zoom library and `next-themes`; each instance sets `mounted` in an effect and renders light/dark zoom wrappers.

**Agreement/disagreement analysis:** This is not a claim that zoom is a bad product feature. `DESIGN.md` explicitly records zoom as baseline behavior. The question is whether the interaction code must be part of the unconditional initial client path.

**Realistic impact:** Potential extra route JS and hydration work. Magnitude is unknown; prematurely complicating image behavior could cost more maintainability than it saves.

**Synthesis severity:** VERIFY FIRST.

**Confidence:** MEASUREMENT REQUIRED.

**Decision:** MEASURE FIRST.

**Recommended remediation or measurement:** Use a production bundle analyzer and Performance/React profile to isolate the zoom library/client boundary. Record route JS contribution, mount/update time, and whether the screenshot island affects LCP/interaction. Preserve zoom behavior if a later lazy-loading change is justified.

### SYN-019 — Synchronous immutable filesystem reads in static render/build paths

**Sources:** `RBP-004`.

**What each audit said:** React Best Practices found synchronous file reads for homepage MDX and image metadata/dark-variant lookup. It already downgraded the issue because the route appears statically renderable, so the current cost is primarily build/static-render work rather than demonstrated per-request latency.

**Underlying source evidence:** `page.tsx` calls `getHomePage()`. `content/utils/read.ts` uses `fs.readFileSync()` for MDX frontmatter/content. `CustomImage` calls `getImageDimensions()`, which uses `readFileSync()`, and also uses `existsSync()` to check dark siblings. The homepage exercises that image path three times.

**Agreement/disagreement analysis:** Source conclusively shows synchronous I/O. The user-impact argument is weak in the current static route and becomes stronger only if the code runs per request/dynamic render.

**Realistic impact:** Small/redundant build-time work today; possible future request-blocking behavior if reused in dynamic contexts.

**Synthesis severity:** LOW.

**Confidence:** HIGH.

**Decision:** DEFER.

**Recommended remediation or measurement:** Consider caching/hoisting immutable content/image metadata in a broader server-build cleanup, especially before making the route dynamic. It is not a meaningful release blocker for this static homepage experiment.

## 6. Independently corroborated findings

The strongest exact cross-methodology signal is **SYN-014**, the hero light/dark priority propagation. Audit and React Best Practices independently traced the same prop path from the hero call site into both theme-specific image instances. That makes the implementation concern highly credible even though network impact still requires measurement.

Several concerns received weaker but useful partial corroboration:

- **SYN-008 — focus contrast:** Audit promoted it; Web Design Guidelines independently identified focus-ring contrast as something that still required rendered verification while separately confirming that focus-visible styling exists.
- **SYN-011 — touch targets:** Audit identified source-level 36px/icon controls; Web Design Guidelines independently requested physical target measurement. Its separate touch-action finding is not the same defect.
- **SYN-015 — responsive image sizes:** Audit promoted the `100vw` mismatch; React Best Practices noticed the same source condition but kept it measurement-dependent.
- **SYN-016 — ui.sh script:** Audit promoted it; React Best Practices independently confirmed the unconditional script and insisted on product-intent/runtime evidence before declaring it harmful.

Corroboration did not mechanically increase severity. In particular, SYN-014 remains VERIFY FIRST because two reports agreeing that a browser *may* perform redundant work does not prove actual duplicate transfer or user-visible regression.

## 7. Unique-but-important findings

Several single-methodology findings are more important than some corroborated ones:

- **SYN-001 (skip navigation)** is unique to Web Design Guidelines but directly affects repeated keyboard navigation.
- **SYN-009 (theme selected-state semantics)** is unique to Audit and is source-conclusive.
- **SYN-010 (reduced-motion shell coverage)** is unique as an actionable finding even though all reports praised the bespoke homepage motion layer.
- **SYN-012 (navigation landmark)** is a semantic accessibility issue that React performance methodology would not reasonably find.
- **SYN-017 (CmdK eager bundle)** and **SYN-018 (zoom eager hydration)** are unique to React Best Practices because they require client-graph reasoning rather than visual/interface auditing.

Conversely, uniqueness is not proof of importance. SYN-006 and SYN-007 are unique because they come from broad guideline policy, but the synthesis rejects them as production requirements without stronger product/runtime evidence.

## 8. Methodological disagreements

### Different scope

The clearest scope differences are expected rather than problematic. React Best Practices found CmdK, zoom hydration, and filesystem-I/O concerns that the interface-oriented audits were not designed to detect. Audit found selected-state semantics, navigation landmarks, and heading-outline issues outside React performance scope.

### Different threshold

**SYN-011 (44px touch targets):** Audit treats 44×44 as a preferred threshold strong enough for a P2 finding. Web Design Guidelines requested runtime measurement rather than asserting failure. The synthesis treats the concern as LOW hardening because some 36px controls are source-confirmed but 44px is not the only defensible conformance threshold.

**SYN-016 (ui.sh):** Audit treats “design inspection tool in root production layout” as enough for an implementation-integrity finding. React Best Practices requires confirmation that it is not intentional user-facing functionality and wants transfer/execution data. The synthesis adopts the stricter evidence standard before remediation.

### Different evidence standard

**SYN-002 (clip-path):** Web Design Guidelines treats transform/opacity-only as a normative animation rule. Audit and React Best Practices require profiling before calling the short one-time animation a performance problem. The synthesis keeps it measurement-dependent.

**SYN-015 (`sizes="100vw"`):** Audit sees the layout mismatch as sufficient for a medium-confidence finding. React Best Practices requires actual selected responsive candidates and bytes. The synthesis sides with measurement because responsive-image selection is browser/DPR dependent.

### Actual contradiction

**SYN-013 (customer heading):** Web Design Guidelines reported the page heading structure as a pass. Audit identified the customer-proof `<section>` as headingless. Source inspection resolves the contradiction in Audit's favor: most of the page has correct hierarchy, but the Trust section is the exception the broader pass statement missed.

### Apparent contradiction that is not one

**SYN-008 (focus):** Web Design Guidelines correctly observed that focus-visible styling exists. Audit correctly observed that the resulting focus colors are too weak. Presence and contrast quality are different questions; both statements can be true simultaneously.

## 9. Findings requiring runtime verification

The checks below consolidate overlapping runtime lists from all three reports instead of repeating them audit-by-audit.

| Check | Hypothesis | Tool/test | Viewport/environment | Metric/evidence | Pass/fail criterion | Resolves |
| --- | --- | --- | --- | --- | --- | --- |
| M-01 Hero theme resource loading | Both theme hero resources may be treated as critical before LCP | Production build, DevTools Network + Elements/preload inspection | Cold cache; light and dark; 390px and 1440px; representative DPRs | Preload links, request count, priority, start time, transfer bytes, `currentSrc`, LCP element/time | Pass if only the resource capable of being visible is treated as critical before LCP, or if duplicate priority produces no meaningful extra request/cost; fail if inactive theme consumes material early bandwidth/priority | SYN-014 |
| M-02 Responsive image candidate selection | `sizes="100vw"` may cause materially oversized candidates | DevTools console/Network | 390px DPR 2/3, 768px DPR 2, 1024px and 1440px DPR 1/2 | Rendered CSS width, required source pixels (`CSS width × DPR`), `currentSrc` width, transfer bytes | Flag when selected candidate is materially above the nearest reasonable candidate and the byte delta is nontrivial; do not fail merely because candidate width exceeds CSS width | SYN-015 |
| M-03 Initial JS and hydration ownership | CmdK and zoom may contribute meaningful unconditional client cost | Production build stats/bundle analyzer, Chrome Performance, React Profiler/code coverage | Cold load desktop and mid-tier mobile CPU throttling | Route initial JS, chunk ownership, unused initial code, parse/execute time, hydration/mount/update cost | Remediate only if the relevant island/dependency makes a material contribution relative to total route JS/hydration; avoid arbitrary byte thresholds without project budget context | SYN-017, SYN-018 |
| M-04 UI Picker production behavior | `ui.sh` may be nonessential production tooling with measurable cost | Production deployment Network/Performance plus product-owner intent check | Cold load desktop/mobile | Presence, strategy/timing, transfer bytes, execution time, long tasks, production purpose | Pass if intentionally required visitor functionality with acceptable cost; fail if it is experiment/design tooling on the normal production path | SYN-016 |
| M-05 Hero clip-path paint profile | The one-time clip-path reveal may cause expensive paint/frame instability | Chrome Performance with CPU throttling | 390px and 1440px; 4× CPU throttle or representative low-end device | Paint/composite events, frame drops, long tasks, LCP/interaction timing during 420–560ms sequence | Fail only if attributable paint/frame instability or material critical-path regression is observed; rule divergence alone is insufficient | SYN-002 |
| M-06 Focus/theme accessibility verification | Source-fixed focus and theme states must remain perceptible/programmatic in the rendered UI | Keyboard-only pass, browser accessibility tree, contrast measurement, screen reader | Light/dark/system; 100% and 200% zoom | Focus indicator contrast/visibility, selected-state semantics/name/value, focus order/restoration | Pass when every interactive control has a clearly visible authored focus state and theme selection is programmatically queryable and visually distinct | SYN-008, SYN-009 |
| M-07 Touch target geometry | Some compact controls may be unnecessarily hard to tap | DevTools element box measurement + physical touch test | 390px and 320px touch viewport | Actual clickable bounding box, spacing/overlap, mis-tap behavior | Treat 44px as a preferred hardening target, not an automatic production failure; at minimum ensure controls satisfy applicable accessibility target-size requirements and are reliably tappable | SYN-011 |
| M-08 Reduced-motion end-to-end behavior | Shared shell still exposes nonessential spatial motion when preference is enabled | OS/browser `prefers-reduced-motion`, keyboard/mouse interaction | Homepage light/dark; open header menus, CmdK, copy dropdown, image zoom | Remaining transform/zoom/slide/rotation/spin animation and whether it is essential feedback | Pass when nonessential spatial motion is removed/reduced while state changes and necessary progress feedback remain understandable | SYN-010 |
| M-09 Hidden theme screenshot transfer behavior | Below-fold duplicated theme DOM may or may not trigger both image transfers | Cold-cache Network while scrolling and switching theme | Mobile + desktop, light then dark and vice versa | Request count for light/dark lower screenshots, timing, bytes | No automatic failure unless hidden-theme transfers are redundant and material; use result to inform any broader image-loading redesign | Supports SYN-014/SYN-015/SYN-018 |

Runtime checks for general overflow, image-zoom keyboard semantics, and 11px readability remain useful release QA, but they are not promoted into new synthesis issues because no source finding established a defect there.

## 10. Recommended remediation backlog

### PHASE A — high-confidence accessibility / correctness

1. **SYN-008 — fix focus-indicator contrast.** Highest release-clean priority because source directly establishes weak authored focus-state contrast.
2. **SYN-009 — fix theme selector selected-state semantics and perception.** Expose selection programmatically and visually.
3. **SYN-001 — add skip navigation.** Low implementation complexity, repeated accessibility benefit.
4. **SYN-012 — add a primary navigation landmark.** Semantic shell correction with low visual risk.
5. **SYN-013 — give the Trust/customer section a heading relationship.** Preserve art direction while repairing document outline/section naming.
6. **SYN-010 — complete reduced-motion handling across the shared shell paths used by the homepage.**

### PHASE B — high-confidence implementation/performance

There is no source-only performance change strong enough to outrank Phase A. The one source-conclusive implementation smell in this category, SYN-019, is low-value on a static route and is deferred.

### PHASE C — low-risk guideline hardening

7. **SYN-004 — mark route/domain technical identifiers `translate="no"` where narrowly appropriate.**
8. **SYN-005 — add theme-aware browser theme-color integration.**
9. **SYN-011 — expand compact touch hit areas only where it can be done without destabilizing the connected-grid language.**

### PHASE D — measurement-dependent decisions

10. **SYN-014 — measure hero light/dark priority behavior, then fix if inactive-theme critical loading is real/material.**
11. **SYN-015 — measure responsive image candidate selection before authoring more complex `sizes`.**
12. **SYN-016 — verify UI Picker production intent and cost; gate/remove if it is experiment tooling.**
13. **SYN-017 — quantify CmdK route-JS/hydration contribution before splitting it.**
14. **SYN-018 — quantify zoom-library/client-boundary cost before introducing progressive loading.**
15. **SYN-002 — profile clip-path before replacing an intentional, bounded animation.**

### Deferred cleanup

16. **SYN-003 — shared Button `transition-all`.** Revisit in a shared UI cleanup, not as a homepage release blocker.
17. **SYN-019 — synchronous static filesystem reads.** Revisit if build cost matters or the route becomes dynamic.

SYN-006 and SYN-007 are rejected and should not enter the remediation backlog unless requirements change.

## 11. Findings to defer or reject

### DEFER

**SYN-003 — `transition-all`.** Valid anti-pattern, but current user impact is small and the primitive is shared beyond the homepage. Fixing it safely requires broader regression review than this experiment warrants.

**SYN-019 — static filesystem reads.** The source pattern is real, but the homepage is a strong static-render candidate. Current risk is mostly build-time redundancy, not proven per-request latency.

### REJECT

**SYN-006 — URL-synchronized FAQ state.** Native FAQ disclosure is production-quality without persisted URL state unless deep-linkable expansion is a real product requirement. This is an optional feature, not a defect.

**SYN-007 — broad touch-action/tap-highlight policy.** Default browser touch behavior is not inherently defective, and an indiscriminate tap-highlight policy can remove useful feedback. Address specific gesture problems if device testing finds them rather than enforcing a blanket rule.

## 12. Skill comparison

| Skill | Primary Strength | Unique Value | Blind Spots | Severity Style | Overall Role |
| --- | --- | --- | --- | --- | --- |
| Web Design Guidelines | Broad interface-convention coverage | Skip navigation, translation robustness, browser theme-color, URL-state/touch policy, explicit anti-pattern detection | Less deep on contrast math, bundle/runtime internals, and component-graph cost; can over-prescribe convention rules | Conservative numeric severity (mostly P3) but high confidence in rule violations | Fast breadth pass for interface standards and “small rule” omissions |
| Audit | Accessibility/theming/responsive/implementation-integrity depth | Focus contrast, selected-state semantics, reduced-motion boundary completeness, navigation landmark, heading-outline issue, production-tooling integrity | Less specialized on React bundle/server architecture; its 44px touch threshold can read stricter than minimum conformance | Most aggressive release-quality calibration (2 P1s, many P2s) | Main holistic release-readiness audit |
| React Best Practices | Client/server boundaries, bundle/resource loading, hydration, static I/O | CmdK eager graph, zoom hydration, exact resource-priority prop flow, filesystem I/O | Deliberately weak on semantic accessibility, visual conventions, and product art direction | Appropriately measurement-aware; avoids claiming exact perf harm without runtime data | Specialized implementation/performance audit |

### Pairwise complementarity

- **Web Design Guidelines + Audit — SOMEWHAT COMPLEMENTARY.** Both inspect interface/accessibility territory, but they operate at different depths. WDG catches broad convention gaps; Audit catches contrast/state/semantic details WDG can miss. Some overlap exists, so they are not fully orthogonal.
- **Audit + React Best Practices — HIGHLY COMPLEMENTARY.** They examine largely different failure classes. Their only strong overlap is image/resource behavior, which is useful because it produced the sole exact corroboration.
- **Web Design Guidelines + React Best Practices — HIGHLY COMPLEMENTARY.** One is interface-rule breadth, the other React/Next implementation structure. Their overlap is small and productive rather than redundant.

### Which would I keep in a real production workflow?

Keep **Audit** and **React Best Practices** for most production React/Next applications: together they cover release-facing accessibility/integrity and framework-level implementation cost.

Keep **Web Design Guidelines** when the product has a public-facing web interface and the team wants a systematic sweep for browser/interface conventions that broader audits often omit. It can potentially be skipped for highly constrained internal tools or projects with mature equivalent linting/checklists, provided those convention checks are genuinely covered elsewhere.

React Best Practices can be reduced or skipped only when the surface is essentially static/no-client-JS and framework performance architecture is trivial. Audit is the hardest of the three to justify skipping for a public production interface.

## 13. Earlier design-stage assessment

These conclusions are inferential. This experiment is not an ablation study, so the final state cannot prove which earlier Skill caused which positive outcome.

### frontend design

The final implementation is repeatedly described as product-specific rather than generic SaaS markup. Real OpenStatus screenshots, technical route rails, operational terminology, connected grids, and native content structures remain coherent. This suggests the foundational design stage established a strong product-specific composition rather than a generic component template.

### high end visual design

The audits did not criticize the visual identity as decorative, generic, or inconsistent. The final page retains restrained technical hierarchy, asymmetric but controlled grids, product evidence, and semantic color. This suggests the visual refinement stage added distinctiveness without violating the repository's “credible infrastructure software without decorative theater” baseline.

### animate

The bespoke homepage motion system survived scrutiny well: bounded 120/180ms interaction timings, a one-time hero entrance, no scroll spectacle, fine-pointer hover gating, CSS rather than a JS animation runtime, and a real reduced-motion branch. The remaining concerns are narrow: clip-path requires profiling, and shared shell motion falls outside the bespoke module's reduced-motion coverage. That is evidence of generally successful motion design with incomplete end-to-end preference coverage.

### adapt

This is one of the clearest successes. All three reports describe extensive defensive responsive implementation: `min-w-0`, `minmax(0,1fr)`, `overflow-wrap:anywhere`, mobile-first stacking, breakpoint-specific border joining, preserved DOM order, and no source-confirmed horizontal-overflow failure. Runtime viewport testing is still necessary, but the source strongly suggests the adaptation stage did real work rather than simply shrinking desktop layout.

### normalize

The homepage consistently uses the semantic token layer, shared border/spacing grammar, square marketing geometry, and documented design-system exceptions. The audits found no broad visual-system drift. Remaining shared-layer mismatches (`transition-all`, focus token contrast, 36px default controls) show that normalization achieved consistency without proving every inherited primitive behavior was optimal.

### polish

Step 7 appears to have improved interaction-state coverage and semantic detail: visible `focus-visible` states exist, FAQ items use real `h3`s inside native summaries, decorative indicators are hidden from accessibility APIs, product evidence framing is deliberate, and image intrinsic dimensions are preserved. The focus-contrast and theme-selected-state findings show an important limitation of polish-by-inspection: adding a state is not the same as validating its contrast/semantics against accessibility thresholds.

## 14. Recommended final workflow

For a future real-world frontend project, the most efficient sequence suggested by this experiment is:

1. **Baseline/extract design contract — audit/document only.** Capture existing tokens, geometry, typography, content patterns, constraints, and intentional inconsistencies before redesign work.
2. **frontend design — modify code.** Establish information architecture, product-specific composition, content hierarchy, and core interaction semantics.
3. **high end visual design — modify code when the product calls for it.** Refine art direction without violating the baseline or introducing decorative drift. This stage is optional for utilitarian/internal surfaces.
4. **animate — modify code.** Add motion only after hierarchy and states are stable; include reduced-motion behavior at the same time.
5. **adapt — modify code.** Deliberately solve mobile/tablet/intermediate layout, overflow, touch, and DOM-order constraints.
6. **normalize — modify code.** Reconcile tokens, shared primitives, spacing, borders, and repeated patterns after responsive variants exist.
7. **polish — modify code.** Finalize focus/hover/active/selected/error/empty/loading states, copy, visual alignment, and semantic details.
8. **Production browser/build test — runtime only.** Before performance-oriented audit conclusions, collect representative viewport screenshots, keyboard/touch checks, reduced-motion behavior, bundle output, Network traces, Web Vitals, and accessibility-tree evidence.
9. **Web Design Guidelines audit — audit only, independent fresh chat.** Use for broad interface-rule/convention coverage. Run against the stable source and available browser evidence.
10. **Audit — audit only, independent fresh chat.** Use for holistic accessibility, responsive, theming, implementation integrity, and release-readiness judgment. Keep it quarantined from the previous report until synthesis.
11. **React Best Practices — audit only, independent fresh chat, ideally after production build/runtime evidence exists.** This minimizes speculative bundle/performance findings and lets the review attach real bytes/timings to client-boundary hypotheses.
12. **Synthesis — audit/document only, fresh chat with all reports available.** Normalize concerns, adjudicate contradictions, consolidate measurement plans, reject low-value prescriptions, and produce one ordered backlog.
13. **Remediation pass — modify code.** Fix high-confidence accessibility/correctness items first, then measured performance issues, then low-risk hardening.
14. **Post-remediation verification — runtime only.** Re-run the exact checks that justified changes; avoid rerunning every design stage unless remediation materially changed the system.

Fresh chats are most valuable for the independent audit stages because they reduce anchoring. Runtime/browser testing should happen before final performance decisions, not after speculative performance fixes.

## 15. Final synthesis verdict

### 1. Is the finished homepage fundamentally production-quality?

**Yes, fundamentally.** The implementation is coherent, product-specific, server-first, responsive-minded, semantically stronger than average, and disciplined about real product evidence, motion scope, and design-system consistency. None of the audits found a blocker, critical waterfall, major responsive collapse, fabricated state, or broken primary task.

### 2. What prevents calling it release-clean today?

A small set of high-confidence accessibility/correctness gaps: weak authored focus contrast, incomplete theme-selection semantics/perception, no skip link, no primary navigation landmark, the headingless customer-proof section, and incomplete reduced-motion coverage across shared shell interactions. These are more defensible release-clean blockers than the unmeasured performance hypotheses.

### 3. Which findings matter most?

First: SYN-008, SYN-009, SYN-001, SYN-012, SYN-013, and SYN-010. After those, the most important performance question is SYN-014 because it is the only exact independent corroboration and concerns the critical hero resource path.

### 4. Which findings are probably low-value?

SYN-006 (FAQ URL state) and SYN-007 (blanket touch-action/tap-highlight policy) should not become code without a real requirement/problem. SYN-003 (`transition-all`) and SYN-019 (static filesystem reads) are valid cleanup opportunities but low-value for this homepage release.

### 5. Was using all three audit methodologies worthwhile?

**Yes.** The overlap was limited enough to justify the cost. Audit and React Best Practices were especially complementary: one found release-facing accessibility/semantic issues while the other found client-graph/resource/server-I/O concerns. Web Design Guidelines contributed several convention-level gaps neither of the others surfaced, including the skip link and browser/i18n hardening items.

### 6. Which design Skills produced clearly complementary value?

The final evidence suggests the earlier design workflow was strongest where responsibilities were distinct: foundational/product-specific composition, visual art direction, purposeful motion, responsive adaptation, design-system normalization, and final interaction-state polish each left different positive traces in the implementation. The clearest success signal is the combination of strong product specificity, restrained motion, pervasive responsive defenses, and low design-system drift. The remaining defects are mostly threshold/semantic details and measurement-dependent performance questions rather than evidence that the earlier design stages fought one another.
