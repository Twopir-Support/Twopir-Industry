# SaaS.html — build report

`Industry Pages/SaaS.html` — Salesforce for SaaS & Technology.

**This is a restyle, not a rewrite.** The page copy is the copy from the SaaS page supplied.
What changed is the presentation layer: it now runs on the same design system, tokens and
type scale as `Legal.html` and the homepage finals.

> **This file replaces an earlier report.** The previous `SaaS.html` was a different page
> with entirely different copy — zero sentences in common with the source used here. It was
> retired when this page replaced it and remains in git history, along with its report.

---

## 1 · Currency gate

The page prompt requires confirming the reference pair is current before copying anything
from it. Checked, not assumed:

| | wrap | ladder | fs tokens | `--fs-micro` | `--fs-stat` | rem |
|---|---|---|---|---|---|---|
| `redesign/homepage.html` | **1400** | yes | **13** | yes | yes | **0** |
| `Industry Pages/Legal.html` | **1400** | yes | **13** | yes | yes | **0** |
| previous `SaaS.html` | 1180 | **NO** | 12 | **NO** | yes | 0 |
| supplied source page | 1180 | **NO** | 12 | **NO** | yes | **30** |

The reference pair passes on all four. Both SaaS artifacts failed it — the supplied source
also carried 30 `rem` declarations, which render at 62.5% under the theme's
`html { font-size: 10px }`. Neither was a valid base to copy from, so the page was rebuilt
on Legal's shell.

## 2 · What changed

| Was | Is |
|---|---|
| `tws-` prefix, 1180px wrap, no zoom ladder | Legal's shell: 1400px wrap, full ladder, floor 0.85 |
| 12 type tokens, no `--fs-micro` | the 13-token scale, diffed key-by-key against the homepage |
| **30 `rem` declarations** | `px` / `clamp()` only — zero |
| three bare `#twopir-saas` rules | one token rule; nothing for the minifier to merge |
| grid-based service-list bullets | positioned `::before` — Legal's defect, fixed here |
| no schema | BreadcrumbList + Service + FAQPage |
| stacked-chip hero panel | the shared navy operating-model diagram, relabelled for the SaaS lifecycle |

Measured at 1400×900, SaaS and Legal now resolve identically: 44.8px H1, 44px section
titles, 24px pain headings, 19px card titles, 15.4px body, 14px mono eyebrows.
`LEGACY_SCALE` in `verify_browser.js` is now empty — this page was its last entry.

## 3 · Content preservation

All **159** text items in the source body — every heading, paragraph, service list item,
lifecycle stage, integration, metric, testimonial, case study and FAQ answer — are carried
over verbatim, verified item by item.

Three deliberate exceptions, none of which change what the page says:

1. **`Twopir` → `Twopir Consulting`** on first reference in body copy, matching the canonical
   entity name used across the site. Testimonial quotes keep the speaker's own wording.
2. **FAQ markup** already used the button + panel pattern; it now uses the shared component
   so the accordion mechanics and ARIA wiring match the rest of the family. Text unchanged.
3. **The scroll-progress bar** (`.tws-progress`, `role="presentation" aria-hidden="true"`)
   was dropped. It is decorative chrome carrying no content, it has no equivalent anywhere
   else in the family, and its JS is not part of the shared tail.

### Section map

| # | Section | Status | Note |
|---|---|---|---|
| 1 | Hero | [redesigned] | Navy SVG operating-model panel replaces the stacked-chip version, matching the family. Same four layers, same labels. |
| 2 | Outcome stats band | [redesigned] | New component. Padded once, ~7:1 band. |
| 3 | Trust band | [kept] | Logos + credential chips on the shared trust card. |
| 4 | The Real Problem | [kept] | 8 cards. |
| 5 | What Twopir Builds | [kept] | On the shared philosophy block. |
| 6 | Core Capabilities | [kept] | 6 service cards. |
| 7 | Customer Lifecycle | [redesigned] | New component. Seven stages on a **four**-column track, not seven across — seven in one row gives each step ~170px and puts the measure under 25 characters a line. |
| 8 | Integration Ecosystem | [kept] | 12 cards on the shared 4-up integration grid. |
| 9 | Client Outcomes | [kept] | 2 testimonial + case-study pairs. |
| 10 | Why Twopir | [kept] | 5 items + callout with the `.twopir-*` stat chips. |
| 11 | Who We Work With | [redesigned] | New component. Feature-tier icon frame sized from the **diagonal** of the rotated diamond. |
| 12 | FAQ | [kept] | 8 questions. |
| 13 | Closing CTA | [kept] | On the shared dark CTA. |

## 4 · Open items before publish

1. **Both case-study links ship with an empty `href` in the source.** An `<a href="">` is a
   focusable control that reloads the page, so they are rendered as inert labels
   (`.tws-cs-link--todo`) with a `TODO` comment at each. Supply the live URLs or delete the
   elements.
2. **Evidence for the outcome figures.** The stats band (35%+, 2×, 90+, 18%), the lifecycle
   metrics (48hrs, 3.2×, 60%, 92%) and the six case-study metrics (41%, +19pts, 55%; 3.1×,
   8 days, $2.4M) are Class-B claims. The two case studies are anonymised to
   segment/stage/ARR, and the testimonials to first-name-plus-initial. Confirm the
   documented evidence and, where a client is identifiable, approval.
3. **`/salesforce-for-saas/` — confirm the permalink**, add to `sitemap.xml`, submit in
   Search Console and Bing Webmaster Tools.
4. **Contextual inbound links** so the page does not launch as an orphan — at minimum from
   `/industries-we-serve/`.
5. **Client logos** — Hey Market, Platform9, Mitratech, Spinify and Fix Stream are carried
   over from the source, on Twopir's own HubSpot CDN. Confirm usage permissions.
6. **Class-D claims re-verified at publish** — platform capabilities move.

### Claims classification

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | "Salesforce Certified"; "deeply certified across the Salesforce platform" | ⚠ verify the certification wording is current. **No partner language is used for Stripe, Zuora, Chargebee, Segment, Gainsight, ChurnZero, Marketo, Outreach or Salesloft** — the page says we integrate them |
| **B — client outcomes** | 14 figures, above | ⚠ evidence not on file; links empty |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | integration behaviour in §8 and FAQ 1/2/5 | ⚠ re-verify at publish |

## 5 · Verification

Run from `Industry Pages/`:

- `verify_page.py SaaS.html` — **all checks pass**.
- `verify_browser.js SaaS.html` — **all checks pass**, now asserted rather than reported. No
  horizontal overflow at any of 11 widths from 1600px to 320px; accordion opens, closes and
  is exclusive; computed type scale matches Legal exactly; H1 and below-fold content reach
  full opacity with JavaScript disabled; `500+` readable in the served HTML.
- `verify_degradation.js SaaS.html` — **passes both failure modes**.

All four industry pages now pass the browser suite against the same type-scale table.
