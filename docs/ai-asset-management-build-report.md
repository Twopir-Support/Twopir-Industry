# AIAssetManagement.html — build report

`Industry Pages/AIAssetManagement.html` — AI for Asset Management.

**This is a restyle, not a rewrite.** The page copy is the copy from
`AI_for_Asset_Management.html`; what changed is the presentation layer.

---

## 1 · Currency gate

Both reference files are byte-identical to the repo copies and pass all four points. The
source failed every one — **87 `rem` declarations**, no ladder, no token layer, and a
`.twopir-asset` class wrapper. This page is scoped to `#twopir-ai-asset` with the `.tam-`
prefix.

The shell was derived from `AIFintech.html`, a sibling of this page, so the crumb, AEO block,
citation, ICP, use-case, check-list and entity components carried over unchanged.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-asset` class wrapper, unscoped `#hero`, `#pain`, `#usecases`… | `#twopir-ai-asset`, every class `.tam-` |
| **87 `rem` declarations** | the shared `px` / `clamp()` scale — zero |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon boxes on use-case cards | the design system's SVG icon tiles |
| its own BreadcrumbList + WebPage schema | BreadcrumbList + Service + FAQPage |
| no hero visual | the shared navy operating-model diagram, relabelled for the investor stack |

Measured at 1400×900, AIAssetManagement and Legal resolve identically: 44.8px H1, 44px section
titles, 24px pain headings, 19px card titles, 15.4px body, 14px mono eyebrows.

**Legal's grid-bullet defect is fixed here.**

### Components added

- **`.tam-tile-*`** — the twelve firm types carry an icon and a name and no description, so
  they take a compact centred tile rather than an integration card. The tile name is pinned to
  the `sm` step past the alignment pass.
- **`.tam-uc-tags` / `.tam-uc-tag`** — capability tags pinned under a use-case card, above a
  hairline rule.
- **`.tam-pill-row` / `.tam-pill`** — a chip row standing in for a bullet list where every
  item is two or three words (the investor-communication card).
- **`.tam-rel-*`** — the Related Reading cluster.

All three chip shapes reuse the ICP chip's geometry, so the page has one chip idiom rather
than four.

No new tokens.

## 3 · Content preservation

All **303** text items in the source body are carried over verbatim, verified item by item.
Remaining mismatches were extraction artefacts of markup differences, each confirmed present
in the rendered copy.

### Deliberate exceptions

1. **Partner credential expanded to the full verified name** — same rule and same treatment as
   the other AI pages. Five prose occurrences of each; badges and the facts row keep the short
   form inside the widget spans. **Confirm the tier is current before publishing.**
2. **The hero figures are now wired to the stat classes.** Unlike its AI siblings, this page's
   hero numbers are class A **company** facts — 12+ years, 500+ clients, 40+ team — sourced to
   "Twopir Consulting" rather than to external research. They are `.twopir-years`,
   `.twopir-clients` and `.twopir-team` spans here, so they track the live stats object
   instead of drifting as hardcoded prose. The trust strip and entity paragraph likewise.
3. **FAQ moved to the shared accordion.**
4. **Use-case emoji became SVG tiles.**
5. **The two back-to-back credentials lists were flattened** into the shared engage + facts
   pattern.

## 4 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · 40+ team · founded 2014 · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | Salesforce Gold Partner and HubSpot Gold Partner in prose | ⚠ confirm the tier is current. **No partner language for BlackRock Aladdin, SimCorp, Charles River, Bloomberg, FactSet, Morningstar, eFront, SS&C, Envestnet, Refinitiv, Dow Jones or LexisNexis** — the page says we integrate them, which is the correct framing |
| **B — client outcomes** | none — the outcomes section is deliberately qualitative | ✅ its own lede says *"we won't hand you a fabricated percentage before we've seen your systems"* |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | Financial Services Cloud, Data Cloud, Agentforce capabilities throughout | ⚠ re-verify at publish |

**One claim needs checking before publish.** FAQ 2 says AI onboarding cuts "onboarding time
from days to hours". That is a class B outcome claim stated as fact, and it sits on a page
that otherwise refuses to quantify outcomes. Either evidence it or soften it to match the
rest of the page.

The governance framing is otherwise strong and should survive editing: the Quick Answer leads
with "investment professionals retain full judgment and final approval", the compliance card
carries "every compliance action is logged and traceable — no exceptions", and the fund
performance agent is explicit that it pulls only from approved internal systems.

## 5 · Verification

- `verify_page.py AIAssetManagement.html` — **all 32 checks pass**.
- `verify_browser.js AIAssetManagement.html` — **all checks pass**. No horizontal overflow at
  any of 11 widths from 1600px to 320px; accordion behaviour correct; computed type scale
  matches Legal; renders fully with JavaScript disabled.
- `verify_degradation.js AIAssetManagement.html` — **passes both failure modes**.

## 6 · Open items before publish

1. **The Related Reading cluster is twelve topic names with no links behind them.** The source
   shipped them as plain `<div>`s, and they are rendered here as labelled cards rather than
   anchors, because styling a non-link as a link promises a destination the page cannot
   deliver. **Either wire them to real URLs or cut the section** — a "cluster" that links
   nowhere does nothing for topical authority, which is the section's stated purpose.
2. **Breadcrumb parent is inconsistent with its siblings.** This page parents under
   `/salesforce/`; AI for Fintech and AI for Law Firms parent under `/industries/`. Carried
   over as-is, but the AI cluster should settle on one parent.
3. **Three-way overlap on wealth and asset management.** `/salesforce-for-fintech/` and
   `/ai-for-fintech/` both name wealth and asset management among the segments they serve, and
   this page is entirely about that segment. Three pages competing for the same buyer is the
   failure mode the governance warns about. **Settle the hierarchy and add cross-links before
   publishing.**
4. **The "days to hours" claim in FAQ 2** — §4.
5. **Confirm "Gold" is the current partner tier** — §3.
6. **The visible keyword tags** under each use-case title are SEO labels rendered as page
   furniture; worth removing before publish.
7. **"Page last updated July 2026"** is hardcoded and becomes a freshness lie if not
   maintained.
8. **`/ai-for-asset-management/` — confirm the permalink**, add to `sitemap.xml`, submit in
   Search Console and Bing Webmaster Tools.
