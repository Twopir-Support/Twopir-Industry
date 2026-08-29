# Healthcare.html — build report

`Industry Pages/Healthcare.html` — Salesforce for Healthcare.

**This is a restyle, not a rewrite.** The page copy is the copy from the healthcare page
supplied. What changed is the presentation layer: it now runs on the same design system,
tokens and type scale as `Legal.html` and the homepage finals.

---

## 1 · What changed

The source page was pre-design-system: a `trust-wide-box` block, a `#fsl-` logo marquee
with its own stylesheet, then an unscoped `.twopir-lf` document using `rem` sizing, emoji
icon badges, inline `style="font-size: 2.2rem"` attributes and a serif/sans pairing that
does not match the rest of the site. `rem` sizing breaks outright under the live theme's
`html { font-size: 10px }`.

| Was | Is |
|---|---|
| `.twopir-lf` wrapper, unscoped `#hero`, `#pain`, `#services`… | `#twopir-healthcare` wrapper, every class `.thc-` |
| `rem` + inline `font-size` attributes | the shared `px` / `clamp()` type scale |
| serif headings, `1.5rem` body | Bricolage Grotesque / Inter / JetBrains Mono, same as Legal |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon badges on service cards | the design system's SVG icon tiles |
| three separate ad-hoc `<style>` blocks | one token rule + the shared sheet |
| no schema | BreadcrumbList + Service + FAQPage |
| no hero visual | the shared operating-model diagram, relabelled for the healthcare stack |

Measured at 1400×900, Healthcare and Legal resolve identically: 44.8px H1, 44px section
titles, 24px pain headings, 19px card titles, 15.4px body, 14px mono eyebrows.

## 2 · Content preservation

All 123 text items in the source body — every heading, paragraph, service list item,
process step, integration, outcome, audience card, testimonial, case study, metric and FAQ
answer — are carried over verbatim. Verified by extracting every `<li>`, `<h3>`, `<p>`,
`<summary>` and FAQ answer from the source and matching each against the rebuild.

Three deliberate exceptions, none of which change what the page says:

1. **`TwoPir` → `Twopir Consulting`.** The canonical company name. The source used `TwoPir`
   throughout; the entity fact set and every other page use `Twopir Consulting`.
   Inconsistent naming across pages lowers entity confidence.
2. **FAQ markup.** `<details>`/`<summary>` became the design system's accordion. Question
   and answer text is identical; only the control changed, and it gained the ARIA wiring
   `<details>` did not have. The `+` glyph became the accordion's animated SVG.
3. **Service card icons.** Emoji became the design system's SVG icon tiles, matching Legal.
   Emoji are kept where the design system itself uses them — the pain cards, the audience
   cards and the integration cards.

The trust line's `500+` is now bound to `.twopir-clients` so the live stats object drives
it, with `500+` as the literal fallback a non-JS crawler sees. Same text, wired to the
mechanism the rest of the site uses.

## 3 · Design-system compliance

- One bare `#twopir-healthcare` rule — token rule, wrapper styling and scaling-ladder
  defaults folded together, following `SaaS.html`. Legal ships three, which is exactly what
  Autoptimize merges and drops.
- Every `var()` carries a literal fallback; the degradation harness confirms no type role
  collapses to the inherited size under either failure mode.
- `px` / `clamp()` only. No `rem`. `overflow-x: clip` on the wrapper. All six keyframes
  renamed to the `thc` prefix.
- **Legal's grid-bullet defect is fixed here** — `.thc-svc-list li` uses a positioned
  `::before` with `padding-left`, not `display: grid` with the diamond as a grid item.

### Components added for this page's sections

Legal has no equivalent of two of this page's sections:

- **`.thc-metric-*`** — the Operational Outcomes stat grid. This is where `--thc-fs-stat`
  finally earns its place: Legal declares that display-sized step and never uses it, which
  is why the token reads as an orphan there. Here the value *is* the content.
- **`.thc-who-*`** — the Who We Work With grid.
- **`.thc-hero-proof`** restyled from Legal's inline chip row to a stacked 2×2 grid. Legal's
  metrics are three or four words and flow as chips; this page's are full qualified
  sentences ("100% Operating visibility for leadership — one connected view of growth and
  performance"), which break the baseline when wrapped inside a chip row.
- **`.thc-quote-card`** made a flex column so it fills the taller cell the case-study cards
  create.

## 4 · ⚠ Pre-publish blocker — the testimonials are legal copy

**Both testimonial quotes in the Client Proof section describe legal work.** They appear to
have been pasted from the law firm page and never rewritten, yet they are attributed to
healthcare people:

| Attributed to | Quote describes |
|---|---|
| Rachel M., *Practice Director, Multi-Site Specialty Clinic* | "a robust, compliant, and scalable **legal operations platform** — connecting **case management**, document processing, and financial systems… how we run **case-to-cash** operations" |
| David K., *COO, Regional Group Practice* | "Automated mass billing and **matter management** minimized errors across our entire **legal workflow**" |

Both "Read Full Case Study" links also point at the legal case studies
(`/streamlining-case-to-cash-for-a-personal-injury-law-firm/` and
`/case-study/accounting-seed-and-salesforce-integrations/`).

Preserved verbatim because the brief was to change styling, not content — and the fix is
to supply real healthcare testimonials, not for me to invent replacements. A comment in the
markup flags it at the section. **This must be resolved before the page goes live**: a
clinic director quoted praising matter management is visible to every reader.

### Claims classification

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | `500+` clients via `.twopir-clients` | ✅ canonical, with literal fallback |
| **A2 — vendor relationships** | none claimed | ✅ the page names Salesforce products (Health Cloud, Flow, Data Cloud, MuleSoft) and integration targets (Epic, Cerner, Athenahealth, Kareo, Phreesia, Relatient, AdvancedMD, Waystar) without asserting partner status with any of them |
| **B — client outcomes** | hero 3× / 60% / 40% / 100%; outcomes grid 3× / 60% / 40% / 30% / 100%; case studies 5 / 70% / "1 View" and 3× / 58% / 42% | ⚠ **evidence not on file**, and the case-study cards are anonymous with legal links |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | HL7 FHIR, Epic/Cerner integration, HIPAA in FAQ 5 | ⚠ **re-verify at publish** |

One sentence worth review, carried verbatim: FAQ 5 states *"Salesforce Health Cloud is
HIPAA-compliant by design."* Quoted alone that reads as a compliance guarantee. Salesforce
supports HIPAA workloads under a BAA and with correct configuration; compliance is a shared
responsibility, not a property of the product. Worth a sentence acknowledging the BAA and
the customer's own controls.

## 5 · SEO / AEO

- **Intent:** commercial investigation. Primary keyword *Salesforce for healthcare*.
- **Query this page wins that no existing page wins:** the healthcare vertical and its
  Health Cloud / patient-intake / referral-management long tail.
- **Question coverage:** definition (hero + FAQ 1), problem (§3, eight items), comparison
  (FAQ 6), implementation (§7 + FAQ 4), decision (§10 audience cards + FAQ 3), outcome
  (§9 + FAQ 2).
- **Entity relationship map**, explicit in the copy: `Twopir Consulting → healthcare
  (multi-site groups, specialty clinics, ASCs, primary/urgent care, behavioral health) →
  disconnected intake, referral and scheduling systems → operational infrastructure →
  Salesforce Health Cloud → Epic / Cerner / Athenahealth / Phreesia / Waystar → inquiry →
  intake → scheduling → care delivery → reporting`.
- **Lifecycle named in the industry's own vocabulary** — inquiry, intake, registration,
  referral, scheduling, care coordination, revenue cycle.
- **Schema:** BreadcrumbList + Service + FAQPage. No second Organization node, no QAPage,
  no `offers` / price / rating on a vendor product. The FAQ block is generated from the
  visible accordion by `scripts/generate_schema.py` and matches it word for word.

## 6 · Verification

Run from `Industry Pages/`:

- `verify_page.py Healthcare.html` — **all checks pass**.
- `verify_browser.js Healthcare.html` — **all checks pass**. No horizontal overflow at any
  of 11 widths from 1600px to 320px; accordion opens, closes and is exclusive; the computed
  type scale matches Legal exactly at 1400×900; H1 and below-fold content reach full opacity
  with JavaScript disabled; `500+` readable in the served HTML.
- `verify_degradation.js Healthcare.html` — **passes both failure modes**.

## 7 · Open items before publish

1. **Replace the two legal testimonials and their case-study links** — §4. Blocking.
2. **Evidence for the outcome figures** — the hero four, the outcomes grid six, and the six
   case-study metrics.
3. **`/salesforce-for-healthcare/` does not exist yet.** Slug and canonical are
   placeholders. Confirm the permalink, add to `sitemap.xml`, submit in Search Console and
   Bing Webmaster Tools.
4. **Contextual inbound links** so the page does not launch as an orphan — at minimum from
   `/industries-we-serve/`.
5. **Client logos** — Magnus Health, HairLineInk Healthcare, Ideal Health Consulting,
   Aventria and Vinci are carried over from the source, on Twopir's own HubSpot CDN.
   Confirm usage permissions are current.
6. **The HIPAA sentence in FAQ 5** — §4.
7. **Class-D claims re-verified at publish** — EHR interoperability and platform
   capabilities move.
