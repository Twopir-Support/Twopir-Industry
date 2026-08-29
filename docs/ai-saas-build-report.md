# AISaaS.html — build report

`Industry Pages/AISaaS.html` — AI for SaaS & Technology Companies.

**This is a restyle, not a rewrite.** The page copy is the copy from `AI_for_SaaS.html`; what
changed is the presentation layer.

---

## 1 · Currency gate

Both reference files are byte-identical to the repo copies and pass. The source failed every
point — **86 `rem` declarations**, no ladder, no token layer, and a `.twopir-ai` *class*
wrapper.

**That class is a collision.** `.twopir-ai` is the dynamic stat class for the "AI Delivery"
credential chip used in the facts widget on every page in the corpus — the same defect
`AI_for_Law_Firms.html` had. This page is scoped to `#twopir-ai-saas` with the `.tas-` prefix.

The shell was derived from `AILawFirms.html`.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-ai` class wrapper, unscoped `#hero`, `#pain`, `#usecases`… | `#twopir-ai-saas`, every class `.tas-` |
| **86 `rem` declarations** | the shared `px` / `clamp()` scale — zero |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon boxes on 8 use-case cards | the design system's SVG icon tiles |
| no hero visual | the shared navy operating-model diagram, relabelled for the revenue AI stack |

Measured at 1400×900, AISaaS and Legal resolve identically.
**Legal's grid-bullet defect is fixed here.**

No new components and no new tokens.

## 3 · Content preservation

All **243** text items in the source body are carried over verbatim, verified item by item.

**One error caught by the parity check and corrected.** The first build wrote its own use-case
section heading and lede rather than the source's — "Eight Ways AI Reshapes *the Revenue Engine*"
against the source's "*Daily Revenue Operations*", and a rewritten supporting sentence. Both are
restored to the source wording. This is exactly the failure the item-by-item check exists to
catch, and it is the second time in this batch that it has caught a real content change rather
than an extraction artefact.

### Deliberate exceptions

1. **Partner credential expanded to the full verified name.** **Confirm the tier is current.**
2. **FAQ moved to the shared accordion.**
3. **Use-case emoji became SVG tiles.**
4. **The credentials list was flattened.** The source nested its credentials rows inside the
   engage list and left one item's closing tag unbalanced.
5. **`40+` and `500+`** are now `.twopir-*` spans.

## 4 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · 40+ team · founded 2014 · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | Salesforce Gold Partner and HubSpot Gold Partner in prose | ⚠ confirm current. **No partner language for Gainsight, ChurnZero, Mixpanel, Amplitude, Pendo, Zendesk, Intercom, Stripe, Chargebee, OpenAI, Anthropic or Microsoft** |
| **B — client outcomes** | none — the outcomes section is deliberately qualitative | ✅ its own lede refuses to hand over a fabricated percentage |
| **C — industry statistics** | 66%, 101%, 18mo, 3.5% | ✅ **the best-sourced page in the batch** — three of four name a publisher and a date (Salesforce State of Service Nov 2025, High Alpha 2025 SaaS Benchmarks, Recurly 2025) |
| **D — technical claims** | Agentforce, Einstein, Data Cloud, Breeze AI throughout | ⚠ re-verify at publish |

One citation is weaker than its neighbours: *"2026 B2B SaaS benchmark data"* names no publisher.
Pin it or drop the figure.

## 5 · Verification

- `verify_page.py` — **all 32 checks pass**.
- `verify_browser.js` — **all checks pass**. No horizontal overflow at any of 11 widths from
  1600px to 320px; accordion behaviour correct; computed type scale matches Legal; renders fully
  with JavaScript disabled.
- `verify_degradation.js` — **passes both failure modes**.

## 6 · Open items before publish

1. **Pin the "2026 B2B SaaS benchmark data" citation** — §4.
2. **Confirm "Gold" is the current partner tier** — §3.
3. **Cannibalisation.** `SaaS.html` (Salesforce for SaaS & Technology) is the platform-led page
   and this is the AI-led one. Each page links to the other, both link up to the industries
   parent. **Do not publish without those links.**
4. **The visible keyword tags** under each use-case title are SEO labels rendered as page
   furniture; worth removing before publish.
5. **"Page last updated July 2026"** is hardcoded.
6. **`/ai-for-saas/` — confirm the permalink**, add to `sitemap.xml`, submit in Search Console
   and Bing Webmaster Tools.
