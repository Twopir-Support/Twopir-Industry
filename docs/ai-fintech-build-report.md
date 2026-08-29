# AIFintech.html — build report

`Industry Pages/AIFintech.html` — AI for Fintech.

**This is a restyle, not a rewrite.** The page copy is the copy from
`Ai_for_fintech_backup.html`; what changed is the presentation layer.

---

## 1 · Currency gate

Both reference files — `Legal_final.html` and `homepage_final.html` — are byte-identical to
the repo copies and pass all four points: 1400px wrap, ladder present with floor 0.85, 13
type tokens, zero `rem`. The source failed every one — **88 `rem` declarations**, no ladder,
no token layer, and a `.twopir-fintech` *class* wrapper.

**That class is a collision.** `Industry Pages/Fintech.html` already scopes itself to
`#twopir-fintech`. Had both blocks rendered on one URL, the id and class selectors would have
fought. This page is scoped to `#twopir-ai-fintech` with the `.taf-` prefix, so the two can
coexist.

The shell was derived from `Nonprofit.html`.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-fintech` class wrapper, unscoped `#hero`, `#pain`, `#usecases`… | `#twopir-ai-fintech`, every class `.taf-` |
| **88 `rem` declarations**, including inline `style="font-size: 2.2rem"` ledes | the shared `px` / `clamp()` scale — zero |
| Fraunces / DM Sans / DM Mono / Caveat webfonts | Bricolage Grotesque / Inter / JetBrains Mono |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon boxes on use-case cards | the design system's SVG icon tiles |
| ad-hoc `<style>` blocks | one token rule |
| its own BreadcrumbList + WebPage schema | BreadcrumbList + Service + FAQPage, matching every other page |
| no hero visual | the shared navy operating-model diagram, relabelled for the AI stack |

Measured at 1400×900, AIFintech and Legal resolve identically: 44.8px H1, 44px section
titles, 24px pain headings, 19px card titles, 15.4px body, 14px mono eyebrows.

**Legal's grid-bullet defect is fixed here.**

### Components added for this page's sections

This page needed more new components than any other in the set — it has no services grid, no
process rail, no proof pairs, and five section types nothing else uses.

- **`.taf-crumb-*`** — the visible breadcrumb. The only page in the set with one.
- **`.taf-answer`** — the AEO "Quick Answer" block. Set at the lede step, not body: it is the
  paragraph an answer engine is meant to lift whole, so it has to survive being pulled out of
  context.
- **`.taf-cite`** — source attributions under hero stats and pain items. Deliberately **not**
  the shell's `.taf-src`, which is an inline citation *link* in accent ink with an underline.
  These attributions are plain text, and styling non-links as links is a promise the page
  can't keep. First draft did reuse `.taf-src` and the citations rendered underlined; caught
  on the render pass.
- **`.taf-icp-*`** — three fact cards, role chips, and a qualifying list.
- **`.taf-uc-*`** — the twelve use-case cards, the densest component in the corpus: category
  chip, icon and title, keyword tag, context copy, one or two labelled lists, and sometimes a
  compliance note. Three-up would put the inner lists under ~180px each, so the card runs full
  width and splits internally instead. The problem column takes a muted marker and the AI
  column the accent, so the two lists still read as a pair.
- **`.taf-check-*`** — one component for both the Responsible AI grid and the outcomes grid.
- **`.taf-entity`** — the "Who Is Twopir Consulting?" entity-definition block.
- **`.taf-ind-grid`** — the six fintech segments reuse `.taf-int-item`; icon, name and
  description is the same shape as an integration tile, so only the grid changes.

No new tokens.

## 3 · Content preservation

All **314** text items in the source body are carried over verbatim, verified item by item —
the largest page in the set. Remaining mismatches were extraction artefacts of markup
differences (the FAQ's decorative `+`, hero stat values and labels sharing one `<li>`), each
confirmed present in the rendered copy.

### One omission caught and fixed

The first build **dropped the visible breadcrumb** — `Home / Industries / AI for Fintech` —
because the shell has no breadcrumb component and nothing in the pipeline was looking for one.
The item-by-item parity check surfaced it; it is restored with its own component and mirrors
the BreadcrumbList JSON-LD.

### Deliberate exceptions

1. **Partner credential expanded to the full name.** The source writes "Salesforce Partner"
   and "HubSpot Partner" in prose twelve times. Per §2 and §14 of the page governance,
   `TWOPIR_STATS.salesforce`/`.hubspot` emit that short form **for the compact stat bar only**;
   everywhere else the verified credential is **"Salesforce Gold Partner"** / **"HubSpot Gold
   Partner"**, and the rule is explicit: *never shorten the credential outside the widget.*
   Seven prose occurrences now use the full name. The two trust badges keep the short form and
   are wrapped in `twopir-salesforce` / `twopir-hubspot` so they are the widget, dynamic like
   every other page. **This is the one change on this page that alters words a reader sees, so
   confirm the tier is current before publishing** — see §4.
2. **FAQ moved to the shared accordion**, gaining the ARIA wiring `<details>` did not have.
3. **Use-case emoji became SVG tiles.**
4. **The experience-section credentials list was flattened.** The source nested a second
   `why-engage-list` inside the first with an unbalanced closing tag.
5. **`40+` and `500+` in the entity paragraph** are now `.twopir-team` and `.twopir-clients`
   spans, so they track the live stats object rather than sitting as hardcoded prose.

## 4 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · 40+ team · founded 2014 · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | Salesforce Gold Partner and HubSpot Gold Partner, stated in prose seven times | ⚠ **confirm the tier is current.** This page asserts the credential far more prominently than any sibling. **No partner language for OpenAI, Anthropic, Microsoft, MuleSoft, Workato, Celigo, NetSuite or Intuit** — the page says we integrate them |
| **B — client outcomes** | none — the outcomes section is deliberately qualitative | ✅ **best-behaved page in the set.** Its own lede says *"we won't hand you a fabricated percentage before we've seen your systems"* |
| **C — industry statistics** | $200B–$340B, 50%, 83%, 90%, and "2.8 to 4.7 percent" | ✅ all four hero figures and both pain figures carry a named source (McKinsey, Mastercard, Feedzai) |
| **D — technical claims** | AI Agent, Agentforce, Einstein and Breeze AI capabilities throughout | ⚠ re-verify at publish — this is the fastest-moving surface on the site |

Two things this page does better than the rest of the corpus and should not lose in editing:
it **cites every industry statistic**, and it **refuses to invent an outcome percentage**.

Every use-case card that touches a regulated decision carries an explicit
human-in-the-loop caveat, and the Quick Answer block leads with "AI assists — it does not
independently make regulated credit, fraud, or compliance decisions." For a page about
automating lending and AML, that framing is the compliance posture, not decoration. Keep it.

## 5 · Verification

- `verify_page.py AIFintech.html` — **all 32 checks pass**.
- `verify_browser.js AIFintech.html` — **all checks pass**. No horizontal overflow at any of
  11 widths from 1600px to 320px; accordion behaviour correct; computed type scale matches
  Legal; renders fully with JavaScript disabled.
- `verify_degradation.js AIFintech.html` — **passes both failure modes**.

`scripts/verify_browser.js` gained three rows — `uc-card h3`, `uc-cols li` and `icp-v` — so
this page's type scale is asserted rather than skipped. It has no `svc-card`, `step` or
`svc-list`, which the suite previously reported as "not on this page", leaving three roles
untested. **The new `icp-v` row immediately caught a real bug:** `.taf-icp-v` is a `<p>`, so
the alignment pass's blanket body-font rule beat the component rule and the card values
rendered in Inter instead of Bricolage Grotesque. That is the exact failure that rule's own
comment warns about for card titles. Fixed by listing it as an exception.

## 6 · Open items before publish

1. **Confirm "Gold" is the current partner tier** — §3 and §4. This page states it seven
   times in prose; if the tier has changed, this is the page that most needs correcting.
2. **Cannibalisation against `/salesforce-for-fintech/`.** Two fintech pages now exist. This
   one is AI-led ("AI for fintech", lending automation, KYC, fraud triage); the other is
   platform-led ("Salesforce for fintech", partner portals, KYB onboarding, payments). That
   split is defensible, but it needs the internal-linking hierarchy to hold: each page should
   link to the other, and both should link up to the industries parent. **Do not publish this
   without those links** — two pages competing for "fintech" is exactly the failure mode the
   governance warns about.
3. **The visible keyword tags.** Each use-case card carries a bare keyword string under its
   title — "AI lending automation", "AI fraud detection", "HubSpot for fintech". These are SEO
   labels rendered as page furniture, not copy a reader benefits from. They are preserved
   verbatim, but they read as keyword stuffing to both a person and a spam classifier, and I
   would remove or reword them before publish. That is a content decision, so I have left it
   to you.
4. **`/ai-for-fintech/` — confirm the permalink**, add to `sitemap.xml`, submit in Search
   Console and Bing Webmaster Tools.
5. **"Page last updated August 2026"** in the CTA fine print is now a hardcoded date in the
   markup. It needs updating on every substantive edit or it becomes a freshness lie.
6. **Class-D claims re-verified at publish** — Agentforce, Einstein and Breeze AI move fast.
