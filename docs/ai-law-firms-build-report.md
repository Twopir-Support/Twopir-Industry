# AILawFirms.html — build report

`Industry Pages/AILawFirms.html` — AI for Law Firms.

**This is a restyle, not a rewrite.** The page copy is the copy from
`AI_for_Law_Firms.html`; what changed is the presentation layer.

---

## 1 · Currency gate

Both reference files are byte-identical to the repo copies and pass all four points. The
source failed every one — **86 `rem` declarations**, no ladder, no token layer, and a
`.twopir-ai` *class* wrapper.

**That class is a collision.** `.twopir-ai` is the dynamic stat class for the "AI Delivery"
credential chip, used in the facts widget on every page in the corpus. A wrapper sharing that
name would have inherited the chip's styling and, worse, been picked up by any script keyed to
the stat classes. This page is scoped to `#twopir-ai-legal` with the `.tal-` prefix.

The shell was derived from `AIFintech.html`, which is a sibling of this page — same author,
same section vocabulary — so the crumb, AEO block, citation, ICP, use-case, check-list and
entity components carried over unchanged.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-ai` class wrapper, unscoped `#hero`, `#pain`, `#usecases`… | `#twopir-ai-legal`, every class `.tal-` |
| **86 `rem` declarations** | the shared `px` / `clamp()` scale — zero |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon boxes on use-case cards | the design system's SVG icon tiles |
| its own BreadcrumbList + WebPage schema | BreadcrumbList + Service + FAQPage, matching every other page |
| no hero visual | the shared navy operating-model diagram, relabelled for the legal AI stack |

Measured at 1400×900, AILawFirms and Legal resolve identically: 44.8px H1, 44px section
titles, 24px pain headings, 19px card titles, 15.4px body, 14px mono eyebrows.

**Legal's grid-bullet defect is fixed here.**

### One component added

**`.tal-tile-*`** — the eight practice areas carry an icon and a name and **no description**,
unlike the fintech page's segments. An integration card would leave a hole where the copy
should be, so they take a compact centred tile instead: icon above name, both optically
centred, four across. The tile name is pinned to the `sm` step past the alignment pass — it is
a short label, not a card title, and the blanket `h4` rule would have set it at 19px.

No new tokens.

## 3 · Content preservation

All **240** text items in the source body are carried over verbatim, verified item by item.
Remaining mismatches were extraction artefacts of markup differences, each confirmed present
in the rendered copy.

### Deliberate exceptions

1. **Partner credential expanded to the full verified name.** The source writes "Salesforce
   Partner" / "HubSpot Partner" in prose. Per §2 and §14 of the page governance, that short
   form is emitted by `TWOPIR_STATS` for the compact stat bar **only**; everywhere else the
   credential is "Salesforce Gold Partner" / "HubSpot Gold Partner", never shortened outside
   the widget. Five prose occurrences of each now carry the full name; the trust badges and
   the facts row keep the short form and are wrapped in `twopir-salesforce` /
   `twopir-hubspot` so they *are* the widget. **Confirm the tier is current before
   publishing.**
2. **FAQ moved to the shared accordion**, gaining ARIA wiring `<details>` did not have.
3. **Use-case emoji became SVG tiles.**
4. **The credentials list was flattened.** The source nested a second `why-engage-list` inside
   the first and left one item's closing tag unbalanced, so the last three credentials
   rendered inside the preceding item.
5. **`40+` and `500+` in the entity paragraph** are now `.twopir-team` and `.twopir-clients`
   spans, and the trust strip's `500+` / `12+` / regions row likewise, so they track the live
   stats object rather than sitting as hardcoded prose.

## 4 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · 40+ team · founded 2014 · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | Salesforce Gold Partner and HubSpot Gold Partner in prose | ⚠ confirm the tier is current. **No partner language for Clio, Actionstep, NetDocuments, iManage, OpenAI, Anthropic or Microsoft** — the page says we integrate them |
| **B — client outcomes** | none — the outcomes section is deliberately qualitative | ✅ its own lede says *"we won't hand you a fabricated percentage before we've seen your systems"* |
| **C — industry statistics** | 37%, 83%, 74%, 4× | ⚠ **three of the four cite "Clio Legal Trends Report" without a year or edition, and one cites "2026 client experience benchmarks", which names no publisher at all.** A citation a reader cannot follow is not a citation — pin the edition and add links before publish |
| **D — technical claims** | Agentforce, Einstein and Breeze AI capabilities throughout | ⚠ re-verify at publish |

The page's compliance framing is strong and should survive editing: every use case says AI
drafts and an attorney reviews, the document-generation card carries "no exceptions", and the
Quick Answer leads with attorney review. For a page about automating legal work, that is the
professional-responsibility posture, not decoration.

## 5 · Verification

- `verify_page.py AILawFirms.html` — **all 32 checks pass**.
- `verify_browser.js AILawFirms.html` — **all checks pass**. No horizontal overflow at any of
  11 widths from 1600px to 320px; accordion behaviour correct; computed type scale matches
  Legal; renders fully with JavaScript disabled.
- `verify_degradation.js AILawFirms.html` — **passes both failure modes**.

## 6 · Open items before publish

1. **Pin the research citations** — §4. "Clio Legal Trends Report" needs an edition year and
   a link; "2026 client experience benchmarks" needs a named publisher or should be cut.
2. **Confirm "Gold" is the current partner tier** — §3.
3. **Cannibalisation.** `Legal.html` (Salesforce for law firms) is the platform-led page and
   this is the AI-led one. Same split as fintech, same requirement: each page links to the
   other, both link up to the industries parent. **Do not publish without those links.**
4. **The visible keyword tags** under each use-case title — "Legal intake automation", "AI
   legal workflow", "HubSpot for law firms" — are SEO labels rendered as page furniture, not
   copy a reader benefits from. Preserved verbatim; worth removing before publish.
5. **The CTA links to `/case-studies`** without a trailing slash, unlike every other link on
   the page. Confirm the permalink.
6. **"Page last updated July 2026"** is hardcoded and becomes a freshness lie if not
   maintained.
7. **`/ai-for-law-firms/` — confirm the permalink**, add to `sitemap.xml`, submit in Search
   Console and Bing Webmaster Tools.
