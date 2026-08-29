# Fintech.html — build report

`Industry Pages/Fintech.html` — Salesforce for Fintech.

**This is a restyle, not a rewrite.** The page copy is the copy from the fintech page
that was live. What changed is the presentation layer: it now runs on the same design
system, tokens and type scale as `Legal.html` and the homepage finals.

---

## 1 · What changed

The source page was pre-design-system: a `trust-wide-box` block, a `#fsl-` logo marquee
with its own stylesheet, then an unscoped `#hero` / `#pain` / `#services` document using
`rem` sizing, emoji icon boxes, inline `style="font-size: 2.2rem"` attributes and no
wrapper prefix at all. Nothing in it could be published alongside Legal or SaaS without
colliding, and `rem` sizing breaks outright under the live theme's `html { font-size: 10px }`.

Rebuilt as a single Custom HTML block scoped to `#twopir-fintech` / `.tfn-`, on Legal's
tokens, type scale and component idioms.

| Was | Is |
|---|---|
| unscoped `#hero`, `#pain`, `#services`… | `#twopir-fintech` wrapper, every class `.tfn-` |
| `rem` + inline `font-size` attributes | the shared `px` / `clamp()` type scale |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon boxes on service cards | the design system's SVG icon tiles |
| three separate ad-hoc `<style>` blocks | one token rule + the shared sheet |
| no schema | BreadcrumbList + Service + FAQPage |
| no hero visual | the shared operating-model diagram, relabelled for the fintech stack |

## 2 · Content preservation

Every heading, paragraph, service list item, segment, process step, integration,
testimonial, case study, metric and FAQ answer is carried over from the source page.
Verified by diffing the normalised visible text of both files.

Four deliberate exceptions, none of which change what the page says:

1. **`TwoPir` → `Twopir Consulting`.** The canonical company name. The source page used
   `TwoPir` in body copy, testimonials and FAQ answers; the entity fact set and every
   other page on the site use `Twopir Consulting`. Inconsistent naming across pages
   actively lowers entity confidence, so this is a brand correction, not a copy edit.
2. **Section order.** `Who We Serve` (segments) now sits after `What We Build` rather
   than between services and process, so the page runs problem → approach → services →
   who it is for → how we engage → stack → proof → why → FAQ → CTA. No section was
   dropped or added.
3. **FAQ markup.** `<details>`/`<summary>` became the design system's accordion. Question
   and answer text is byte-identical; only the control changed, and it gained the ARIA
   wiring `<details>` did not have.
4. **Service card icons.** Emoji (`👥`, `✅`, `🤝`…) became the design system's SVG icon
   tiles, matching Legal. Emoji are kept where the design system itself uses them — the
   pain cards, the segment cards and the integration cards.

## 3 · Design-system compliance

- One bare `#twopir-fintech` rule. The token rule, the wrapper's own styling and the
  scaling-ladder defaults are folded together, following `SaaS.html`. Legal still carries
  three, which is exactly what Autoptimize merges and drops.
- Every `var()` carries a literal fallback; the degradation harness confirms no type role
  collapses to the inherited size under either failure mode.
- `px` / `clamp()` only. No `rem`.
- `overflow-x: clip` on the wrapper, with `hidden` first as the fallback.
- All six keyframes renamed to the `tfn` prefix.
- **Legal's grid-bullet defect is fixed here.** `.tfn-svc-list li` uses a positioned
  `::before` with `padding-left`, not `display: grid` with the diamond as a grid item, so
  it no longer renders one word per line when an item contains an inline element.

### Two components adapted for this page's content

- **`.tfn-seg-*`** — the segments grid. Legal has no equivalent section.
- **`.tfn-hero-proof`** — restyled from Legal's inline chip row to a stacked 2×2 grid.
  Legal's metrics are three or four words (`40% Less manual admin · PI firms`) and flow
  as chips. This page's are full qualified sentences (`60% Reduction in customer
  onboarding cycle time through Salesforce workflow automation`) because the qualifier is
  what scopes the claim. Wrapped inside an inline row those sentences break the baseline
  and the diamond separators float between fragments. Stacking value over label is how
  the source page presented them and is the only layout legible at that text length.
- **`.tfn-quote-card`** — made a flex column with the attribution pushed to the bottom.
  This page's case-study cards carry the full engagement description, so they run taller
  than Legal's one-line versions and the quote card was left with dead space.

## 4 · Claims — open item, carried at the client's direction

The page carries twelve outcome numbers from the source page:

- **Hero** — `60%` onboarding cycle time reduction · `3×` pipeline reporting accuracy ·
  `45%` faster partner activation · `360°` cross-functional visibility.
- **Three case studies** — `3×` / `55%` / `18d`; `62%` / `40%` / `0`; `48%` / `100%` / `2.4×`.
- **FAQ 1** — "typically reducing onboarding cycle time by 40–60%".

**These need evidence on file before publish.** Under the publishing rules every client
outcome is a Class-B claim requiring documented evidence — what was measured, over what
period, against what baseline — and client approval where the client is identifiable.
Two specific things to resolve:

- The three case studies are anonymous and **every "Discuss a Similar Challenge" link
  points at `/contact-us/`**, so a reader cannot verify any of the nine figures. Legal's
  case studies link to published case studies; these do not, because no published fintech
  case study covers them.
- The testimonials are attributed to `Benjamin L.`, `Sara M.` and `Rahul K.` with company
  descriptors. Confirm each has a real source and approval.

There is one **published, linkable** fintech engagement that could back a case-study card
if you want verifiable proof on the page:
[Salesforce CPQ and Multi-Tool Integrations for Efficient Sales Operations](https://twopirconsulting.com/case-study/salesforce-cpq-and-multi-tool-integrations-for-efficient-sales-operations/)
— mid-market North American fintech, 250 employees; 35% pipeline growth, 30% faster
high-value lead identification, 25% lead-scoring accuracy improvement.

Other claims:

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · 40+ specialists · areaServed | ✅ canonical set, via `.twopir-*` + literal fallbacks |
| **A2 — vendor relationships** | Salesforce Gold Partner, HubSpot Gold Partner | ✅ full credentials outside the stat widget; the `.tfn-fact` chips keep the widget's generic wording. **No partner language for Stripe, Adyen, MuleSoft, DocuSign, Onfido, Jumio, Persona, Plaid, Chargebee, Recurly, Zuora, Zendesk, Intercom, Tableau or Looker** — the page says we integrate them |
| **B — client outcomes** | twelve figures, above | ⚠ **carried from the source page; evidence not on file** |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | platform capabilities in §8 and FAQ 1/2/4/5 | ⚠ vendor-checkable, but **re-verify at publish** |

Two further sentences to review, both carried over verbatim:

- FAQ 6: *"Response within 24 hours is guaranteed for all active engagements."* A
  guarantee, quoted out of context, is a contractual statement.
- FAQ 1: *"typically reducing onboarding cycle time by 40–60% in fintech environments
  we've built for."* Reads as a general benchmark rather than a scoped result.

## 5 · SEO / AEO

- **Intent:** commercial investigation. Primary keyword *Salesforce for fintech*.
- **Query this page wins that no existing page wins:** the fintech vertical and its
  KYB-onboarding / partner-channel long tail. `/salesforce-for-law-firms/` and
  `/sales-operations/` cover neither.
- **Question coverage:** definition (hero + FAQ 2), problem (§3), comparison (FAQ 2, FSC
  vs standard Sales/Service Cloud), implementation (§8 + FAQ 8), decision (§6 segments +
  FAQ 3/6), outcome (§9 + FAQ 1).
- **Entity relationship map**, explicit in the copy: `Twopir Consulting → fintech
  (payments, lending, wealthtech, BaaS, InsurTech, financial infrastructure) → fragmented
  onboarding, channel and lifecycle data → commercial infrastructure → Salesforce
  (+ HubSpot) → Stripe / KYC / MuleSoft / DocuSign / Chargebee → acquisition → onboarding
  → activation → expansion → renewal`.
- **Lifecycle named in the industry's own vocabulary** — KYB, time-to-active, deal
  registration, MRR/ARR, NRR, channel contribution.
- **Schema:** BreadcrumbList + Service + FAQPage. No second Organization node, no QAPage,
  no `offers` / price / rating on a vendor product. The FAQ block is generated from the
  visible accordion by `scripts/generate_schema.py` and matches it word for word.

## 6 · Verification

Run from `Industry Pages/`:

- `verify_page.py Fintech.html` — **all checks pass**.
- `verify_browser.js Fintech.html` — **all checks pass**. No horizontal overflow at any of
  11 widths from 1600px to 320px; accordion opens, closes and is exclusive; the computed
  type scale matches Legal exactly at 1400×900 (44.8px H1, 44px section titles, 24px pain
  headings, 19px card titles, 14px mono eyebrows); H1 and below-fold content reach full
  opacity with JavaScript disabled; `500+` readable in the served HTML.
- `verify_degradation.js Fintech.html` — **passes both failure modes**.

## 7 · Open items before publish

1. **Evidence for the twelve Class-B figures** and the two flagged FAQ sentences — §4.
2. **`/salesforce-for-fintech/` does not exist yet.** The slug and canonical in the file
   are placeholders. Confirm the permalink, add it to `sitemap.xml`, submit in Search
   Console and Bing Webmaster Tools.
3. **Contextual inbound links** so the page does not launch as an orphan — at minimum
   from `/industries-we-serve/`.
4. **Client logos.** Fortis, Aspire, RentMoola, Carden Group, Patriot Capital and Fundit
   are carried over from the live page, on Twopir's own HubSpot CDN. Confirm usage
   permissions are current.
5. **Class-D claims re-verified at publish** — platform capabilities move.
