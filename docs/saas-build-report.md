# Salesforce for SaaS & Technology — build report

Target page `https://twopirconsulting.com/salesforce-for-saas/`
Deliverable `Industry Pages/SaaS.html` — WordPress Custom HTML block body fragment
Template `Industry Pages/Legal.html` · Design source `redesign/homepage.html`

---

## 0 · Read this first — the live page could not be retrieved

**The "before editing" section inventory and the preservation checklist could not be produced,
because this session cannot reach the target page.** The network egress proxy governing this
environment returns `403` on `CONNECT twopirconsulting.com:443`, for `curl` and for the fetch tool
alike, and does the same for every third-party mirror tried (`crm.consulting`). The proxy's own
status endpoint records the denial:

```
{"kind":"connect_rejected",
 "detail":"gateway answered 403 to CONNECT (policy denial or upstream failure)",
 "host":"twopirconsulting.com:443"}
```

This is an environment policy, not a bad URL — the page is live, and the guidance for a policy
denial is to report the blocked host rather than route around it. The repository was also empty, so
there was no local copy.

### What that means for RULE 1

RULE 1 requires that every heading, paragraph, bullet, statistic, logo, testimonial, case study and
FAQ on the existing page carries over. With no access to that page, **nothing could be carried
over.** The two options were to stop with nothing delivered, or to build the page and be exact about
what is authored versus preserved. Having flagged the blocker and been told the page is live, this
build takes the second option.

So this is a **complete, production-ready page built to the specification** — full design system,
hero and SVG, all thirteen sections, schema, SEO/AEO, verified — whose **copy is newly authored**
rather than preserved. RULE 1's prohibitions were still treated as absolute:

- **No invented testimonials.** There are none on the page.
- **No invented client outcomes, statistics, case studies or company names.** There are none.
- Every number on the page is a **Class-A Twopir company fact** from the canonical set, rendered
  through the `.twopir-*` class + fallback pattern.

### What you need to do to finish the preservation pass

Send the current page — full HTML, or just the visible copy. Then, in one pass:

1. Every original heading, paragraph, bullet, stat, logo, badge, testimonial, case study, FAQ and
   CTA gets reconciled against this build, and the preservation checklist gets produced properly.
2. The testimonial/case-study slot in section 10 gets filled — the markup is already styled and the
   insertion point is marked in the file with `⚠ CASE STUDY / TESTIMONIAL SLOT`.
3. The trust strip gets its real client logos, and the marquee primitive replaces the badge row.

Anything on the live page that this build does not cover is **missing, not rejected.**

---

## 1 · Sections built, in order

| # | Section | Background | Primitive | Legal equivalent |
|---|---|---|---|---|
| 1 | Hero — SaaS revenue operating model | own | hero + three-layer SVG | yes (re-labelled) |
| 2 | Trust strip | `--bg` | pill badge row | yes (marquee → badge row) |
| 3 | Where growth breaks inside a SaaS business | `--bg-alt` | pain grid | yes |
| 4 | **The revenue lifecycle — seven stages** | `--bg` | numbered step cards + spine | **no — new** |
| 5 | Philosophy | `--bg-alt` | philosophy panel | yes |
| 6 | What we build | `--bg` | service cards | yes |
| 7 | **Which system owns which part of the stack** | `--bg-alt` | comparison `<table>` in a card | **no — new** |
| 8 | Connected infrastructure | `--bg` | integration grid | yes |
| 8b | **Security & compliance** | inside §8 | bordered callout, mono label | **no — new** |
| 9 | Engagement model | `--bg-alt` | numbered step cards | yes |
| 10 | What changes | navy | **stat grid + signal list** | reshaped |
| 11 | Why Twopir | `--bg` | why list + sticky callout | yes |
| 12 | FAQ | `--bg-alt` | accordion | yes |
| 13 | CTA | navy | CTA panel + internal-link row | yes |

Backgrounds alternate `--bg` / `--bg-alt` down the page with the two navy panels as the accents,
so every new section slots into the existing rhythm.

---

## 2 · New-section report

Four section shapes have no Legal equivalent. Each was built from an existing primitive, and
**every one of them uses only tokens already in the sheet** — no new hex value, radius, shadow or
font size was introduced. Two tokens the homepage defines but Legal never used (`--divider`,
`--radius-pill`) were added, into the single existing token rule.

### 4 · The revenue lifecycle → numbered step cards with a connecting spine

**Why it exists.** A SaaS industry page has to name its lifecycle in the industry's own vocabulary —
signup, activation, product-qualified, subscription, adoption, renewal, expansion. "Lead →
opportunity → closed won" is Salesforce vocabulary. Legal carries its lifecycle inside hero copy and
the services grid; for SaaS that is the page's main credibility and long-tail-coverage moment, so it
gets a section.

**Primitive.** `.tsa-step` reused wholesale. Added: `.tsa-process--spine::before`, a single
`--divider` gradient rule behind the row, desktop only — once the grid wraps to two or one column a
horizontal spine points at nothing, so it is hidden below 1100px. `.tsa-stage-num` is the accent
gradient circle; `.tsa-stage-tag` is the mono label already used elsewhere.

### 7 · Which system owns which part of the stack → real `<table>` on a card surface

**Why it exists.** Comparison and Decision are the two question classes an industry page most often
misses, and they are exactly what a SaaS buyer is searching. It also does the "keep three things
distinct" job explicitly: each row separates what the platform natively does, what Twopir Consulting
builds around it, and when it belongs at the centre.

**Primitive.** `.tsa-table-card` is the card idiom (`--surface`, `--border`, `--radius-card`,
`--shadow`); `.tsa-table-wrap` carries `overflow-x: auto` so the table scrolls **inside the card**
and the page never scrolls sideways. Header cells are mono on `--bg-alt`; row headers are the
display face at the h4 step. The closing `.tsa-table-note` answers the build-in-house comparison.

### 8b · Security & compliance → bordered callout on `--surface` with a mono label

**Why it exists.** SOC 2, GDPR and data residency are procurement gates for a SaaS buyer — their own
customers' security reviews reach the revenue systems. Restrained on purpose: no red, no warning
iconography, per the "restrained, not alarmist" rule.

**Primitive.** `.tsa-note` — `--surface` fill, `--border`, a 3px `--accent` left edge, `--radius-md`,
`--shadow`, mono `.tsa-note-k` label with the rotated-diamond bullet. The list uses the same diamond
bullet as `.tsa-svc-list`.

### 10 · What changes → navy stat grid + signal list

**Why it is reshaped rather than copied.** Legal runs testimonial + case-study pairs here, built from
two evidenced legal engagements. No evidenced SaaS client outcome was available, and the Class-B rule
is absolute: if the evidence does not exist, the number does not go on the page. So the section is
built from what *is* evidenced.

**Primitives.** `.tsa-stat-grid` on the navy panel — this is the page's single biggest proof moment,
which is the condition the spec sets for putting a stat grid on navy rather than `--bg-alt`.
Display-face number in `--accent` (correct here: it is 28–40px type on navy), Inter label. Below it
`.tsa-shift` is the signal-list primitive — bordered rows with an accent diamond — carrying Class-D
architectural claims stated as mechanism, never as a measured result.

**The testimonial and case-study slot is left marked in the file.** `.tsa-quote-card` and
`.tsa-cs-card` are already styled and need no new CSS.

---

## 3 · Design conversion note

The page keeps **its own structure**. It was not rebuilt out of homepage sections and it is not
Legal with the words swapped:

- **Its own section order and concepts.** Four sections Legal does not have; one reshaped; the trust
  strip uses a different primitive because the content is different.
- **Sections look different where the content is different.** The lifecycle carries a spine Legal has
  no equivalent of; the platform-fit section is a table, which appears nowhere else on either page;
  the proof section is a stat grid rather than quote/case pairs.
- **Nothing was copied wholesale from the homepage.** The homepage supplied tokens, type scale,
  button geometry, card treatment, the icon frame, the diamond bullet, the navy panel recipe and the
  motion — the design language. Not components.
- **What was inherited from Legal is engineering, not layout**: the scoping model, the
  Autoptimize-safe token rule, the builder resets, the full-bleed script, the ancestor-spacing walk,
  the hero's first-screen behaviour and the type-consistency pass.

### Two template defects fixed, worth back-porting to Legal.html

1. **Two keyframes missing from the rename list.** Legal's own instructions name five keyframes to
   re-prefix. There are seven — `tlgScroll` and `tlgFadeIn` are absent from that list. Both were
   caught here; unnoticed, they ship a keyframe collision the moment two industry pages render on one
   URL. Corrected in this repo's README.
2. **A live `rem` in the hero H1.** `.tlg-hero-title` was `clamp(1.85rem, 3.05vw, 3rem)`. The
   consistency pass overrides it with `!important`, so the rendered size was right — but the `rem`
   was still in the source, and the theme sets `html { font-size: 10px }`. Under the exact Autoptimize
   failure the file is built to survive, a dropped tail block would have left the H1 at an 18.5px
   floor instead of 30px. Replaced here with the token plus a px literal.

### One hardening step beyond the template

Legal has **two** bare `#twopir-legal { }` rules — the token rule and the wrapper's own styling.
Autoptimize merging duplicate selectors is the documented cause of the original type-scale failure,
so leaving two is leaving the hazard in place. Here the wrapper's declarations were folded into the
token rule: **exactly one bare `#twopir-saas` rule exists in the file**, so there is nothing to merge
and nothing that can be dropped. On top of that, **all 326** remaining `var()` references were given
literal fallbacks, so the sheet computes correctly with every custom property deleted.

---

## 4 · SEO / AEO output

### Plugin values

| Field | Value |
|---|---|
| **Title tag** (54) | `Salesforce for SaaS Companies \| Twopir Consulting` |
| **Meta description** (156) | `Salesforce for SaaS and technology companies from Twopir Consulting: product signals, subscriptions, renewals and ARR reporting on one revenue architecture.` |
| **Slug** | `/salesforce-for-saas/` |
| **Canonical** | `https://twopirconsulting.com/salesforce-for-saas/` — confirm the permalink; keep https and the trailing slash consistent with the rest of the site |
| **Robots** | `index, follow` — nothing on this page is gated, client-named or sensitive, so no `noindex` |
| **Primary keyword** | Salesforce for SaaS companies |
| **Secondary** | SaaS revenue operations · Salesforce Stripe integration · subscription CRM · product-led growth Salesforce · SaaS ARR reporting · Salesforce Zuora integration · NRR reporting |
| **Intent class** | Commercial investigation |
| **Buyer** | VP/Head of RevOps, CRO, COO at a Series A–D SaaS company |
| **Page type** | Industry page → `Service` + `BreadcrumbList` |

**Heading hierarchy** — one H1, no level skipped (verified programmatically). Full outline is in the
comment block at the top of the file.

### ⚠ Cannibalisation — resolve before publishing

`https://twopirconsulting.com/salesforce-solutions-for-technology/` **already exists** and targets
the same buyer and the same intent. Two pages competing for "Salesforce for SaaS / technology" split
their own signals and neither wins. Pick one before launch:

- **(a)** 301 `/salesforce-solutions-for-technology/` → `/salesforce-for-saas/`, or
- **(b)** narrow that page to a genuinely different query (a Tier-2 product page, say Sales Cloud for
  technology companies) and link it here.

Do not launch both against the same intent. This is flagged in the file's header comment too.

### Question-class coverage

| Class | Covered where | Status |
|---|---|---|
| **Definition** | Hero subtitle (first 3 sentences, quotable); FAQ 1 | ✅ |
| **Problem** | §3 Where growth breaks (6 items); FAQ 2 | ✅ |
| **Comparison** | §7 platform-fit table; the build-in-house note; FAQ 3 (Salesforce vs HubSpot) | ✅ |
| **Implementation** | §8 integration cards with data direction; §9 engagement model; FAQ 4 | ✅ |
| **Decision** | §7 "put it at the centre when…" column; FAQ 5 (stage + what's needed from the client) | ✅ |
| **Outcome** | §10 what changes; FAQ 7 | ✅ — but see the gap below |

**Gap — Outcome coverage is mechanism-only.** The page explains *what changes* and can defend every
sentence, but it carries **no measured client result** for the SaaS vertical: no percentage, no named
customer, no case study. Legal answers this class with two evidenced engagements. This one cannot,
because none was available.

**This gap is reported, not filled.** Writing a plausible-looking number here would be the exact
failure the claims rules exist to prevent. It is the single biggest content weakness of the page and
it closes the moment you supply one cleared SaaS engagement.

### Answer architecture

- The hero's first three sentences are a clean, quotable definition of the page's subject.
- Every section answers first, then explains.
- **What Twopir does / what the platform does / what the outcome is** are kept visibly distinct —
  most explicitly in §7, where those are literally three separate table columns, and in FAQ 1
  ("Salesforce provides the platform…; Twopir Consulting designs the lifecycle model on top of it").

### Entity relationship map — explicit in the copy

```
Twopir Consulting
  → SaaS and technology companies
  → fragmented GTM data across product, billing and CRM
  → revenue infrastructure
  → Salesforce (+ HubSpot)
  → Stripe / Zuora / Segment / Amplitude / NetSuite / Gainsight / Jira / Zendesk
  → signup → activation → product-qualified → subscription → adoption → renewal → expansion
  → ARR, NRR, expansion rate, churn visibility
```

Carried by the philosophy panel (problem + platform), §4 (lifecycle), §8 (integrations) and §10
(outcomes). Distinct from the Legal page at every node — different problem statement, different
lifecycle, different integrations.

### Integrations — all three required elements

Every one of the eight integration cards names **both platforms as the vendors name them**, states
**the business purpose**, and carries a `.tsa-int-flow` line giving **what moves, in which direction,
and who consumes it**. Example:

> **Salesforce + Zuora** — Carry negotiated contracts through amendment, proration and revenue
> recognition without finance rebuilding the deal by hand.
> *Salesforce → Zuora: quote, order and amendment. Zuora → Salesforce: active subscription, MRR,
> renewal date, billed amount. Consumed by RevOps, finance and the renewal owner.*

**Integration pages that should exist and don't** — each is a real cluster opportunity currently
answered only as a card here:

- `/salesforce-stripe-integration/`
- `/salesforce-zuora-integration/`
- `/salesforce-hubspot-integration/`
- `/salesforce-netsuite-integration/`
- `/salesforce-segment-integration/`

### Schema

Three blocks: `BreadcrumbList`, `Service`, `FAQPage`. All valid JSON, verified programmatically.

- `Service.provider` → `{"@id":"https://twopirconsulting.com/#organization"}`; `areaServed`
  `["US","CA","GB","AE","AU","NZ"]`.
- **No second `Organization` node** — that belongs to the homepage only.
- **No `QAPage`** anywhere.
- **No `offers`, `price`, `aggregateRating` or `review`** — Twopir sells the service, not Salesforce,
  Stripe or Zuora.
- `FAQPage` is a no-harm addition; Google removed FAQ rich results in May 2026, so it produces no
  SERP snippet. It was **generated from the visible accordion** by `scripts/generate_schema.py`, and
  a check confirms all 7 pairs match **word for word**. Re-run that script rather than hand-editing
  if the accordion copy changes.

### Internal links — all five types present

| Type | Links added |
|---|---|
| **Parent / category** | `/industries/` |
| **Sibling industry** | `/salesforce-for-law-firms/` · `/salesforce-for-professional-services-consulting-firms/` |
| **Supporting topical** | `/our-services/salesforce/` · `/mulesoft-integration/` · `/salesforce-support/` |
| **Conversion path** | `/#book-a-discovery-call` · `/contact-us/` |
| **External (verification)** | salesforce.com · stripe.com · zuora.com — in FAQ answers only, where they let a reader check a Class-D claim |

Links sit contextually in the body — in the philosophy panel, in two service cards, and in the
closing link row — not only in a nav.

**⚠ Inbound links still needed. This page launches as an orphan without them:**

1. `/industries/` — the parent must link down to it contextually, not just list it.
2. `/salesforce-for-law-firms/` — add a sibling link.
3. `/salesforce-for-professional-services-consulting-firms/` — add a sibling link.
4. `/our-services/salesforce/` — link from the industries or use-cases section.
5. `/consulting-services/` — link where verticals are described.
6. Any SaaS/subscription/RevOps blog post — the strongest contextual signal available.

**⚠ URLs I could not verify.** Egress was blocked, so no link on this page was confirmed to return
200. These four came from the Legal template or your brief rather than from a search result and
should be checked first: `/industries/`, `/salesforce-for-law-firms/`, `/contact-us/`,
`/#book-a-discovery-call`. The rest appeared in live search results.

### Claims classification

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · 40+ team · 250+ deployments · 98% retention · 15+ partnerships · founded 2014 · Pune & New Haven | ✅ Match the canonical set; all render via `.twopir-*` + literal fallback; verified programmatically |
| **A2 — vendor relationships** | "Salesforce Gold Partner", "HubSpot Gold Partner", "Celigo Partner" | ✅ Full credentials used outside the stat widget. The compact `.tsa-fact` chips keep the widget's generic `Salesforce Partner` / `HubSpot Partner` via `.twopir-salesforce` / `.twopir-hubspot`. **No partner language is used for Stripe, Zuora, Segment, Amplitude, NetSuite, Gainsight, Jira or Zendesk** — the page says we integrate them, never that we partner with them |
| **B — client outcomes** | **none** | ⚠ Deliberately absent. Nothing evidenced was available |
| **C — industry statistics** | **none** | ⚠ Deliberately absent. No unsourced benchmark was used to make a section look stronger |
| **D — technical claims** | Platform capabilities in §7 and §8; the amendment/proration/co-terming behaviour in FAQ 4 | ⚠ Written to be durable and vendor-checkable, but **re-verify at publish time** — platform capabilities move, and the SEO skill's own review date is August 2026 |

**Every factual sentence was read as if quoted alone.** The two places where that shaped the wording:

- §10's lede says *"The numbers below are ours, not a client's"* — so a model extracting a stat tile
  cannot present Twopir's retention rate as a client result.
- `98%` carries the label *"Client retention — the measure we hold ourselves to"* rather than a bare
  "98% retention", which alone could read as a customer's churn figure.

### Stats system

`window.TWOPIR_STATS` is **merged, not overwritten** — if the site already defines it (the homepage
does), that object wins key by key and this block only fills gaps. That matters because the
homepage's object does not currently define `deployments` or `retention`, and this page uses both.
Without the merge, either this page would clobber the site's values or those two keys would never
resolve.

**⚠ Flag:** `deployments` (250+) and `retention` (98%) are in the canonical fact set but **not in the
live homepage `TWOPIR_STATS` object.** Add them there so both pages read from one source. Until then
the literal fallbacks carry the correct values and non-JS crawlers see them either way.

---

## 5 · Verification

Three suites, all committed so they can be re-run before any future edit:
`scripts/verify_page.py` (static), `scripts/verify_browser.js` and `scripts/verify_degradation.js`
(both Chromium, against a harness that
reproduces the live theme — `html { font-size: 10px }`, an 87px header in flow, a boxed padded
`.entry-content` wrapper, global `h2`/`h3`/`li`/`button`/`th` restyles, and the
`blockquote::before` FontAwesome glyph).

### Static — 33/33 pass

- CSS braces balanced (501/501), no parse errors, two `<style>` blocks
- **Exactly one bare `#twopir-saas { }` rule** — nothing for Autoptimize to merge
- **Token-deletion simulation passes**: 46 tokens declared, 44 referenced, 0 undeclared,
  0 unused; all 91 `font-size: var()` declarations carry a literal fallback, as do all 326
  other `var()` references. Delete every custom property and the sheet still computes correctly
- Zero `rem` values anywhere in live CSS
- `overflow-x: hidden` then `clip` on the wrapper, in that order
- Zero selectors outside `#twopir-saas`; the only global is
  `html { scroll-behavior: auto !important }`; no bare `*`, `body`, `p`, `h2` or `.entry-content`
- One `<h1>`; no heading level skipped; 7 real `<button>` accordions each with `aria-expanded` and
  `aria-controls` resolving to a real panel; every `aria-labelledby` target exists; 63 decorative
  elements `aria-hidden`; 10 `:focus-visible` rules; `prefers-reduced-motion` honoured
- `content-visibility: auto` present, excluded from the sticky-callout section, disabled under
  `(hover: none), (pointer: coarse)`
- 3 JSON-LD blocks, all valid; no `Organization`, no `QAPage`, no `offers`/`price`/rating;
  `provider` and `areaServed` correct; **FAQ schema matches the visible accordion word for word**
- Every `.twopir-*` fallback matches the canonical fact set; no fabricated outcome percentage;
  "Twopir Consulting" exact everywhere, never "TwoPir"

### Browser — 34/34 pass

- **No horizontal page overflow at any of 1600 / 1400 / 1200 / 1024 / 900 / 768 / 620 / 500 / 435 /
  375 / 320px.** `scrollWidth === clientWidth` at every width. The comparison table scrolls inside
  its own card, as designed
- **Accordion works**: starts collapsed (0px), opens on click (135px, `aria-expanded=true`), closes
  on second click, and opening one closes the previous
- **Type scale resolves to the homepage's computed values** at 1400px, under the theme's
  `html { font-size: 10px }`: H1 46px Bricolage · H2 38px Bricolage · lede 16.8px Inter · pain title
  19px Bricolage · service/step/integration titles 16px Bricolage · body 14.7px Inter · sm 13px
  Inter · eyebrow 12px JetBrains Mono · stat 40px Bricolage · shift key 16px Bricolage · note H3 19px
  Bricolage · table header 16px Bricolage · table cell 13px Inter · stage tag and integration flow
  11px JetBrains Mono
  *(lede 16.8 and body 14.7 are the clamp's `vw` term at 1400px, below its max — correct.)*
- **Hero first-screen gates behave**: 1440×900 claims `100svh − 87px` (813px); 1440×700 falls back to
  natural height; 880×900 falls back to natural height. Content is never clipped in any case
- **No-JS crawler view**: below-fold content renders at opacity 1, the H1 entrance completes to
  opacity 1 without any JavaScript, and stat fallback text reads `500+`
- **Reduced motion + no JS**: H1 instantly opaque, `animation: none`

### Degradation test — both Autoptimize failure modes, in a real browser

`scripts/verify_degradation.js` renders the page twice with the sheet deliberately broken, and
checks that no heading collapses to the wrapper's inherited size (14.7px at 1400px) — which is
exactly what happened on the Legal deploy.

| Mode | What is removed | Result |
|---|---|---|
| **A** | The entire trailing `<style>` block (the consistency pass) — 389 `var()` references survive it | H1 46 · H2 38 · service/step titles 16 · stat 40 · table header 16 · note H3 19. **Nothing collapses.** Only the pain-card title differs, 16px instead of 19px, because the h3/h4 split lives in that block — graceful, not catastrophic |
| **B** | **Every custom-property declaration**, with all 424 `var()` references kept | H1 46 · H2 38 · pain title 19 · service/step 16 · stat 40 · table header 16 · note H3 19 — **every size exactly correct**, resolved entirely from the literal fallbacks |
| both | — | No horizontal overflow at 1400px in either mode |

Mode B is the requested sign-off simulation, run for real rather than reasoned about.

### A real bug the static checks could not have caught

Rendering the page surfaced a genuine CSS defect that no amount of brace-counting would have found.

`.tsa-svc-list li` and `.tsa-note-list li` used `display: grid; grid-template-columns: 14px 1fr`
with the diamond bullet as the first grid item. **Grid promotes every child of the item to its own
grid cell — including anonymous text nodes.** That works only while the `<li>` holds a single text
node, which is true of every item in Legal.html. It is not true here:

- Two service-list items carry an inline link (`<a>MuleSoft</a> and Celigo integration delivery`).
- All six compliance-callout items are `<strong>Label</strong> — explanation`.

In both cases the trailing text became a third grid item, placed on the next row inside the 14px
bullet column, and rendered **one word per line**. The compliance callout was unreadable.

Both rules now position the bullet absolutely with `padding-left: 24px` (the old 14px column plus
its 10px gap), which renders identically for plain-text items and is immune to however many inline
children an item has. Re-rendered and confirmed.

**This is the one defect that would have shipped had the build stopped at the static suite.** It is
also latent in `Legal.html` — that page is safe only because none of its list items happen to
contain an inline element. Adding one link to a service-list bullet there would reproduce it.

### One layout fix found by rendering, not by the checks

The hero proof row originally carried four metrics. Rendered at 1440px it wrapped 3+1, and because
the separator is an `li + li::before` diamond, the wrapped line opened with a leading diamond — it
reads as a rendering fault rather than a design. Reduced to three, which fit on one line at every
desktop width and wrap 2+1 on mobile. The entry removed is `98% client retention`, which now appears
only in the navy stat grid — the better home for it, since "98%" needs the qualifier "Client
retention — the measure we hold ourselves to" to be unambiguous, and the stat grid has room for it.
The brief allows 3–4 metrics in this row.

### Two test expectations that were wrong, not the page

Both showed up as failures on the first run and were corrected in the suite after checking the
design source:

1. **FAQ row font.** The test expected Bricolage; the page renders Inter. **Inter is correct** — the
   design system assigns Inter to "running copy, buttons, list items, FAQ rows", and Legal.html lists
   `.tlg-faq-btn` in the h4 *size* selector only, never in the display-face family selector.
2. **H1 opacity without JS.** The test sampled at 400ms and read 0.85. The hero entrance is a 600ms
   CSS fade; sampled after it completes, it is 1. The test now waits it out.

### One nuance worth your decision (not changed)

The hero entrance is a CSS `opacity: 0 → 1` animation, so **on the very first frame the H1 is at
opacity ~0**, reaching 1 at 600ms. It is never *gated on JavaScript* — which is the property the
design brief is protecting, and which this build satisfies — but Chrome's LCP algorithm ignores a
zero-opacity element, so LCP is recorded a fraction of a second later than first paint.

This is inherited behaviour: Legal.html animates its H1 the same way, and the brief prescribes a CSS
animation for the hero. **It was left at parity with the template rather than silently changed.** If
you want the LCP element to paint at full opacity on frame one, the change is to drop
`.tsa-hero-title` from the animated set and let the badge, rule, subtitle, CTA and stats keep the
stagger — one selector, no visual change to anything but the headline.

---

## 6 · Flagged, not fixed

| # | Item | Why it is flagged rather than resolved |
|---|---|---|
| 1 | **The live page's existing content** | Unreachable — egress policy blocks the domain. Nothing could be preserved. Send the page and it gets reconciled in one pass |
| 2 | **No SaaS client testimonial or case study** | None available, and Class-B evidence rules are absolute. The slot is styled and marked in the file. **This is the page's biggest content weakness** |
| 3 | **No measured Outcome-class result** | Same cause. The class is answered by mechanism only. Reported as a gap rather than filled with a plausible number |
| 4 | **No SaaS/technology client logos** | The trust strip uses the badge-row primitive instead of the marquee. Supply approved logos and the marquee, already in the stylesheet, replaces it |
| 5 | **`/salesforce-solutions-for-technology/` cannibalises this page** | It already exists and targets the same intent. Needs a 301 to this URL, or a narrowed target. A publishing decision, not a code change |
| 6 | **Four URLs unverified** | `/industries/`, `/salesforce-for-law-firms/`, `/contact-us/`, `/#book-a-discovery-call` — taken from the template and your brief; egress blocked confirmation. Check before publish |
| 7 | **Inbound links** | Six named in §4. The page is an orphan until at least the parent and one sibling link to it contextually |
| 8 | **Five integration pages don't exist** | Named in §4. Each is a real cluster opportunity currently answered only as a card |
| 9 | **`deployments` and `retention` missing from live `TWOPIR_STATS`** | Canonical facts with no key in the homepage object. The merge script and fallbacks handle it safely, but the backend should carry them |
| 10 | **Class-D platform claims need re-verification at publish** | Platform capabilities move; the publishing skill's own review date is August 2026 |
| 11 | **`--nav: 87px`** | Inherited from Legal as the measured live header height. Re-measure if the header has changed since |
| 12 | **Three Legal.html template defects** | The missing keyframe names, the `rem` H1 (§3), and the grid-based list bullet that breaks on any item containing an inline element (§5). All three fixed here; all three should be back-ported to Legal.html so the next industry page doesn't inherit them |
