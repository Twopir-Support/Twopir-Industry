# AIRealEstate.html — build report

`Industry Pages/AIRealEstate.html` — AI for Real Estate.

**This is a restyle, not a rewrite.** The page copy is the copy from `AI_for_Real_Estate.html`;
what changed is the presentation layer.

---

## 1 · Currency gate

Both reference files are byte-identical to the repo copies and pass. The source failed every
point — **81 `rem` declarations**, no ladder, no token layer, and a `.twopir-legal` *class*
wrapper.

**That class is a collision, and a bad one.** `#twopir-legal` is the wrapper id of
`Legal.html` — the design source every page in this repository is built from. A real estate page
scoped to that name would have inherited the legal page's entire stylesheet wherever both
rendered. This page is scoped to `#twopir-ai-realestate` with the `.tar-` prefix.

The shell was derived from `AILawFirms.html`.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-legal` class wrapper, unscoped `#hero`, `#pain`, `#usecases`… | `#twopir-ai-realestate`, every class `.tar-` |
| **81 `rem` declarations** | the shared `px` / `clamp()` scale — zero |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon boxes on 8 use-case cards | the design system's SVG icon tiles |
| no hero visual | the shared navy operating-model diagram, relabelled for the brokerage AI stack |

Measured at 1400×900, AIRealEstate and Legal resolve identically.
**Legal's grid-bullet defect is fixed here.**

### One component added

**`.tar-uc-kw-foot`** — this source appends a comma-separated "Keywords:" list to the foot of
every use-case card, on top of the keyword tag the other AI pages carry. It is set as apparatus
— mono, xs step, muted, above a hairline — so it is preserved verbatim without competing with
the card it sits under. **`.tar-uc-num`** carries the source's "01 · " ordinal prefix at the
mono micro step; it is numbering, not part of the name.

No new tokens.

## 3 · Content preservation

All **247** text items in the source body are carried over verbatim, verified item by item.
This page has no ICP section and no hero statistics, so it is the shortest of the three.

### Two source defects fixed

1. **A dead hero anchor.** The second hero button pointed at `#use-cases`; the section id is
   `usecases`, so the anchor resolved to nothing and the button did nothing. It now targets the
   use-case section. The label is unchanged.
2. **Two wrong stat classes in the credentials row.** The client count was wrapped in
   `class="twopir-years"`, which would have rendered **"12+" where "500+" belongs** the moment
   the stats script ran, and the AI Delivery chip used a bare `class="twopir"` instead of
   `twopir-ai`. Both now use the right class; the text is unchanged. The first of these is a
   visible-wrong-number bug, not a cosmetic one.

### Deliberate exceptions

1. **Partner credential expanded to the full verified name.** **Confirm the tier is current.**
2. **FAQ moved to the shared accordion.**
3. **Use-case emoji became SVG tiles.**
4. **`12+` and `40+` in the entity paragraph** are now `.twopir-*` spans.

## 4 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · 40+ team · founded 2014 · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | Salesforce Gold Partner and HubSpot Gold Partner | ⚠ confirm current. **No partner language for PropertyBase, DocuSign, Adobe, Stripe, OpenAI, Anthropic or Microsoft** |
| **B — client outcomes** | none, and the outcomes lede is the most careful in the corpus: *"Directional outcomes our clients work toward … actual results vary by brokerage size, transaction volume, and starting systems"* | ✅ |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | Agentforce, Data Cloud, MLS and commission-disbursement behaviour | ⚠ re-verify at publish |

The compliance framing is the strongest of the three: every client-facing output is routed to a
**licensed** agent, the disclosure card carries "no exceptions", and the FAQ addresses fair
housing directly. For a page about automating regulated real estate work, that is the licensing
posture, not decoration. Keep it.

## 5 · Verification

- `verify_page.py` — **all 32 checks pass**.
- `verify_browser.js` — **all checks pass**. No horizontal overflow at any of 11 widths from
  1600px to 320px; accordion behaviour correct; computed type scale matches Legal; renders fully
  with JavaScript disabled.
- `verify_degradation.js` — **passes both failure modes**.

## 6 · Open items before publish

1. **The "Keywords:" footers.** Every use-case card ends with a comma-separated keyword list, on
   top of the keyword tag under the title — the most explicit SEO furniture in the corpus.
   Preserved verbatim, but they read as keyword stuffing to a reader and a spam classifier
   alike. **Strongly worth removing before publish.**
2. **Breadcrumb parent is inconsistent with its siblings.** This page parents under
   `/ai-in-salesforce/`; AI for Fintech, Law Firms, Manufacturing and SaaS parent under
   `/industries/`, and AI for Asset Management under `/salesforce/`. Three different parents
   across one cluster. Settle on one.
3. **Cannibalisation.** `RealEstate.html` (Salesforce for Real Estate) is the platform-led page
   and this is the AI-led one. Each links to the other, both link up to the parent.
4. **Confirm "Gold" is the current partner tier** — §3.
5. **The CTA's primary button points at `/#book-a-discovery-call`** — a homepage fragment —
   while every sibling page uses `/book-a-discovery-call/`. Confirm which is right.
6. **`/ai-for-real-estate/` — confirm the permalink**, add to `sitemap.xml`, submit in Search
   Console and Bing Webmaster Tools.
