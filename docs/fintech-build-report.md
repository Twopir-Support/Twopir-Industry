# Fintech.html — build report

`Industry Pages/Fintech.html` — Salesforce for Fintech, built from the August 2026
`Legal_final` / `homepage_final` design sources, replacing the fintech page that was
live as a set of loose WordPress blocks.

---

## 1 · What this replaced

The source page was pre-design-system: a `trust-wide-box` block, a `#fsl-` logo
marquee with its own stylesheet, then an unscoped `#hero` / `#pain` / `#services`
document using `rem` sizing, emoji icon boxes, inline `style="font-size: 2.2rem"`
attributes, and no wrapper prefix at all. Nothing in it could be published alongside
Legal or SaaS without colliding.

Rebuilt as a single Custom HTML block scoped to `#twopir-fintech` / `.tfn-`, on the
same tokens, type scale and component idioms as the other two pages.

## 2 · Structure

| § | Section | Source |
|---|---|---|
| 1 | Hero + operating-model diagram | rewritten; SVG relabelled for the fintech stack, geometry unchanged |
| 2 | Trust strip | client logos preserved; credential badges corrected |
| 3 | Where fintech growth breaks | 8 source items consolidated to 6 for the 3-col grid |
| 4 | Our approach | source "solution" copy |
| 5 | What we build | 9 service cards, all preserved |
| 6 | Who we build for + lifecycle table | 6 segments preserved; **table is new** |
| 7 | Engagement model | 5 steps, preserved |
| 8 | Connected infrastructure | rewritten — see §5 below |
| 9 | Client outcomes | **substantially cut** — see §4 |
| 10 | Why Twopir | 5 items, preserved |
| 11 | FAQ | rewritten to 7 questions covering all six question classes |
| 12 | CTA + cluster links | rewritten |

Two components were added to the sheet: `.tfn-table*` (ported from `SaaS.html`) and
`.tfn-seg*` (new).

## 3 · Design-system compliance

- One bare `#twopir-fintech` rule. The token rule, the wrapper's own styling and the
  scaling-ladder defaults were folded together, following `SaaS.html` — Legal still
  carries three, which is exactly what Autoptimize merges and drops.
- Every `var()` carries a literal fallback; the degradation harness confirms no role
  collapses to the inherited size under either failure mode.
- `px` / `clamp()` only. No `rem`.
- `overflow-x: clip` on the wrapper, with `hidden` first as the fallback.
- All seven keyframes renamed to the `tfn` prefix.
- **Legal's grid-bullet defect is fixed here**: `.tfn-svc-list li` uses a positioned
  `::before` with `padding-left`, not `display: grid` with the diamond as a grid item.
  Identical rendering, and it no longer breaks when a list item contains an `<a>` or
  `<strong>`.

## 4 · Claims governance — what was removed

This is the substantive content change, and it is deliberate.

The source page carried **twelve outcome numbers with no evidence behind any of them**:

- Hero: `60%` reduction in onboarding cycle time · `3×` pipeline reporting accuracy ·
  `45%` faster partner activation.
- Three "case studies", each with three metrics (`3×`, `55%`, `18d`; `62%`, `40%`, `0`;
  `48%`, `100%`, `2.4×`). All three were anonymous, and **every "Read case study" link
  pointed at `/contact-us/`** — there was no case study to read.

The publishing skill names this pattern explicitly ("no `3× faster onboarding`,
`40% fewer manual handoffs` … unless it comes from a documented client outcome"), and
`SaaS.html` set the precedent of reporting the gap rather than filling it. All twelve
are gone.

**What replaced them:** one real, published, linkable engagement —
[Salesforce CPQ and Multi-Tool Integrations for Efficient Sales Operations](https://twopirconsulting.com/case-study/salesforce-cpq-and-multi-tool-integrations-for-efficient-sales-operations/),
a mid-market North American fintech, carrying its own reported figures (35% pipeline
growth, 30% faster high-value lead identification, 25% lead-scoring accuracy
improvement). The hero now carries company facts via `.twopir-*` classes instead of
invented metrics.

The three testimonials were kept in substance but re-attributed at role + company-profile
level (`Head of Revenue Operations · US-based B2B payments platform · Series B`), matching
Legal's convention, and the one embedded numeric claim ("time-to-active dropped by almost
two months") was dropped — quoted alone, it reads as a Twopir outcome claim.

### Claims classification

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · areaServed | ✅ canonical set, via `.twopir-*` + literal fallbacks |
| **A2 — vendor relationships** | Salesforce Gold Partner, HubSpot Gold Partner | ✅ full credentials outside the stat widget; the `.tfn-fact` chips keep the widget's generic wording. **No partner language for Stripe, Adyen, MuleSoft, DocuSign, NetSuite or QuickBooks** — the page says we integrate them |
| **B — client outcomes** | the one linked case study | ✅ published and linked; a reader can check it |
| **C — industry statistics** | none | ⚠ deliberately absent — no unsourced benchmark was used to thicken a section |
| **D — technical claims** | platform capabilities in §8 and FAQ 4/5 | ⚠ written to be vendor-checkable, but **re-verify at publish** |

FAQ 5 deliberately stops short on compliance: it states what Salesforce provides and
says the control framework stays with the client's compliance and legal teams. Quoted
alone, it cannot be read as Twopir certifying a regulatory position.

## 5 · SEO / AEO

- **Intent:** commercial investigation. Primary keyword *Salesforce for fintech*.
- **Query this page wins that no existing page wins:** the fintech vertical and its
  KYB-onboarding / partner-channel long tail. `/salesforce-for-law-firms/` and
  `/sales-operations/` cover neither.
- **Question coverage:** definition (hero + FAQ 1), problem (§3 + FAQ 2), comparison
  (FAQ 3, Salesforce vs HubSpot as the core), implementation (§8 + FAQ 4), decision
  (§6 segments + FAQ 5/6), outcome (lifecycle table + FAQ 7).
- **Entity relationship map**, explicit in the copy:
  `Twopir Consulting → fintech (payments, lending, wealthtech, BaaS, InsurTech) →
  fragmented onboarding, channel and lifecycle data → commercial infrastructure →
  Salesforce (+ HubSpot) → Stripe / Adyen / KYC-KYB / MuleSoft / DocuSign / NetSuite →
  acquire → onboard → activate → expand → renew → activation time, channel
  contribution, net revenue retention`.
- **Lifecycle named in the industry's own vocabulary**, stage by stage, in a real
  `<table>` — and the table keeps *what the platform does*, *what Twopir builds* and
  *what leadership sees* in three separate columns, so nothing implies Twopir authored
  a Salesforce feature.
- **Integrations** each carry both platforms, the business purpose, and the direction
  data actually moves.
- **Internal links:** parent (`/industries-we-serve/`), sibling
  (`/salesforce-for-law-firms/`, `/sales-operations/`), supporting
  (`/salesforce-integration/`), conversion (`/contact-us/`, `#book-a-discovery-call`),
  plus the case-study link. External verification links to salesforce.com and stripe.com
  sit in FAQ answers.
- **Schema:** BreadcrumbList + Service + FAQPage. No second Organization node, no
  QAPage, no `offers` / price / rating on a vendor product. The FAQ block is generated
  from the visible accordion by `scripts/generate_schema.py` and matches it word for word.

## 6 · Verification

All three scripts, run from `Industry Pages/`:

- `verify_page.py Fintech.html` — **all checks pass** (CSS integrity, the Autoptimize
  token-deletion simulation, scoping, a11y and heading order, CLS, schema, claims).
- `verify_browser.js Fintech.html` — **all checks pass**. No horizontal overflow at any
  of 11 widths from 1600px to 320px; accordion opens, closes and is exclusive; the
  computed type scale matches the finals at 1400×900; the H1 and below-fold content
  reach full opacity with JavaScript disabled; `500+` is readable in the served HTML.
- `verify_degradation.js Fintech.html` — **passes both failure modes**. With the tail
  `!important` pass dropped and with the token rule deleted, every heading role stays
  visibly distinct from the inherited wrapper size.

## 7 · Open items before publish

1. **`/salesforce-for-fintech/` does not exist yet.** The slug and canonical in the
   file are placeholders; no page currently occupies that permalink. Confirm it, add it
   to `sitemap.xml`, and submit in Search Console and Bing Webmaster Tools.
2. **The page needs contextual inbound links** so it does not launch as an orphan —
   at minimum from `/industries-we-serve/`, and ideally from the fintech case study.
3. **Client logos and the named-client reference.** The Fortis, Aspire, RentMoola,
   Patriot Capital and Fundit logos are carried over from the page that was live, on
   Twopir's own HubSpot CDN. Confirm the usage permissions are current before republishing.
4. **Testimonials need evidence on file.** They were carried over from the previous
   page and re-attributed; confirm each has a real source and, where a client is
   identifiable, approval.
5. **Class-D claims re-verified at publish** — platform capabilities move, and the
   publishing skill's own review date is August 2026.
6. **Only one evidenced fintech engagement exists.** The outcome section is thinner
   than Legal's for that reason alone. It closes the moment a second cleared fintech
   case study is available.
