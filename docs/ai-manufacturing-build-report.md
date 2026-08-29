# AIManufacturing.html — build report

`Industry Pages/AIManufacturing.html` — AI for Manufacturing.

**This is a restyle, not a rewrite.** The page copy is the copy from
`AI_for_Manufacturing_backup.html`; what changed is the presentation layer.

---

## 1 · Currency gate

Both reference files are byte-identical to the repo copies and pass all four points. The source
failed every one — **86 `rem` declarations**, no ladder, no token layer, and a `.twopir-mfg`
*class* wrapper, which collides with `Manufacturing.html`'s `#twopir-mfg` id. This page is
scoped to `#twopir-ai-mfg` with the `.tmg-` prefix.

The shell was derived from `AILawFirms.html`, so the crumb, AEO block, citation, ICP, use-case,
check-list, entity and tile components carried over unchanged.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-mfg` class wrapper, unscoped `#hero`, `#pain`, `#usecases`… | `#twopir-ai-mfg`, every class `.tmg-` |
| **86 `rem` declarations** | the shared `px` / `clamp()` scale — zero |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon boxes on 13 use-case cards | the design system's SVG icon tiles |
| no hero visual | the shared navy operating-model diagram, relabelled for the manufacturing AI stack |

Measured at 1400×900, AIManufacturing and Legal resolve identically.
**Legal's grid-bullet defect is fixed here.**

No new components and no new tokens — this page's section set is exactly the one the AI shell
already covers.

## 3 · Content preservation

All **291** text items in the source body are carried over verbatim, verified item by item.

### Deliberate exceptions

1. **Partner credential expanded to the full verified name** — the same governance rule applied
   to every AI page in the set. **Confirm the tier is current before publishing.**
2. **FAQ moved to the shared accordion**, gaining ARIA wiring `<details>` did not have.
3. **Use-case emoji became SVG tiles.**
4. **The credentials list was flattened** into the shared engage + facts pattern.
5. **`40+` and `500+` in the entity paragraph and trust strip** are now `.twopir-*` spans, so
   they track the live stats object rather than sitting as hardcoded prose.

## 4 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · 40+ team · founded 2014 · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | Salesforce Gold Partner and HubSpot Gold Partner in prose | ⚠ confirm current. **No partner language for NetSuite, SAP, Oracle, Epicor, Zendesk, ServiceNow, OpenAI, Anthropic or Microsoft** — the page says we integrate them |
| **B — client outcomes** | none — the outcomes section is deliberately qualitative | ✅ its own lede refuses to hand over a fabricated percentage |
| **C — industry statistics** | 72%, 10%, 45%, 48% | ⚠ see below |
| **D — technical claims** | Agentforce, Einstein, Breeze AI, ERP and MES behaviour throughout | ⚠ re-verify at publish |

**Two citation problems worth fixing before publish.** Two of the four hero figures and one pain
item cite *"2026 enterprise AI adoption research"*, which names no publisher — a reader cannot
follow it. And two pain items cite *"Twopir manufacturing operations research, 2026"*, which is
our own unpublished research; citing yourself as the authority for a claim about the market is
weaker than making the claim plainly, and it is not verifiable by anyone outside the company.
The Parsec citations are fine — named report, named year.

## 5 · Verification

- `verify_page.py` — **all 32 checks pass**.
- `verify_browser.js` — **all checks pass**. No horizontal overflow at any of 11 widths from
  1600px to 320px; accordion behaviour correct; computed type scale matches Legal; renders fully
  with JavaScript disabled.
- `verify_degradation.js` — **passes both failure modes**.

## 6 · Open items before publish

1. **Pin or drop the vague citations** — §4.
2. **Confirm "Gold" is the current partner tier** — §3.
3. **Cannibalisation.** `Manufacturing.html` (Salesforce for Manufacturing & Industrial) is the
   platform-led page and this is the AI-led one. Same split as fintech, legal and SaaS, same
   requirement: each page links to the other, both link up to the industries parent. **Do not
   publish without those links.**
4. **The visible keyword tags** under each use-case title — "AI Buyer Intent Scoring", "Smart
   Manufacturing AI" — are SEO labels rendered as page furniture, not copy a reader benefits
   from. Preserved verbatim; worth removing before publish.
5. **The CTA links to `/case-studies`** without a trailing slash, unlike every other link on the
   page. Confirm the permalink.
6. **"Page last updated July 2026"** is hardcoded and becomes a freshness lie if not maintained.
7. **`/ai-for-manufacturing/` — confirm the permalink**, add to `sitemap.xml`, submit in Search
   Console and Bing Webmaster Tools.
