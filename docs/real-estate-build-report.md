# RealEstate.html — build report

`Industry Pages/RealEstate.html` — Salesforce for Real Estate.

**This is a restyle, not a rewrite.** The page copy is the copy from
`Real_Estate_backup.html`; what changed is the presentation layer.

---

## 1 · Currency gate

Both reference files — `Legal_final.html` and `homepage_final.html` — are byte-identical to
the repo copies and pass all four points: 1400px wrap, ladder present with floor 0.85, 13
type tokens, zero `rem`. The source failed every one — a `.twopir-lf` class wrapper with no
scoping prefix, no ladder, no token layer, and **108 `rem` declarations**, which render at
62.5% under the theme's `html { font-size: 10px }`.

The shell was derived from `Nonprofit.html`, whose section set (proof, outcomes, who) matches
this page almost exactly. Only Further Reading was dropped — this source has no such section.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-lf` class wrapper, unscoped `#hero`, `#pain`, `#services`… | `#twopir-realestate`, every class `.tre-` |
| **108 `rem` declarations**, including six inline `style="font-size: 2.2rem"` ledes | the shared `px` / `clamp()` scale — zero |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| **empty** service-card icon boxes | the design system's SVG icon tiles |
| three ad-hoc `<style>` blocks | one token rule |
| no schema | BreadcrumbList + Service + FAQPage |
| no hero visual | the shared navy operating-model diagram, relabelled for the real estate stack |

Measured at 1400×900, RealEstate and Legal resolve identically: 44.8px H1, 44px section
titles, 24px pain headings, 19px card titles, 15.4px body, 14px mono eyebrows.

**Legal's grid-bullet defect is fixed here.**

### Components added for this page's sections

- **`.tre-who-role`** — the audience cards label themselves with a job title ("Directors of
  Operations & COOs") rather than an icon. A title is a label, so it takes the mono eyebrow
  treatment; the inherited emoji frame was removed rather than filled with an invented glyph.
- **`.tre-hero-proof`** on a 2×2 grid — the four hero labels are full sentences.

No new tokens. `.tre-out-*` keeps the h4 step it has on the nonprofit page: this page's
outcome values mix figures ("3×", "60%") with words ("Same Day", "Scale"), and setting the
words at the display step would break the row.

## 3 · Content preservation

All **218** text items in the source body are carried over verbatim, verified item by item.
Seventeen first-pass mismatches were all extraction artefacts of markup differences; each was
confirmed present in the rendered copy.

Five deliberate exceptions:

1. **`TwoPir` → `Twopir Consulting`** throughout, **including inside both testimonial
   quotes.** This is a departure from the intent recorded on earlier pages, where the plan was
   to leave a speaker's shorter form alone. In practice no shipped page had ever exercised
   that exception — this is the first source whose quotes contain the company name at all —
   and the entity-consistency rule is a hard check across all eight pages. Leaving it would
   have made this the only page in the corpus spelling the brand two ways. Both testimonials
   are already anonymised to a role ("Director of Operations", "Managing Broker"), so no
   attributable individual is being requoted.
2. **FAQ moved to the shared accordion**, gaining ARIA wiring `<details>` did not have.
3. **Service-card icons.** The source's six icon boxes were literally empty
   (`<div class="icon-box" aria-hidden="true"></div>`), rendering as a blank tile above each
   heading. They carry the shared SVG tiles here.
4. **Process section paragraph moved below the rule.** The source placed it between the `<h2>`
   and the line/diamond rule, where it read as a caption rather than a lede. Text unchanged.
5. **The Why Twopir credentials list was flattened.** The source nested a second
   `why-engage-list` inside the first and left one item's closing tag unbalanced.
6. **A space added in the H1.** The source read `Because of<em>Broken Operations.</em>` with no
   space before the emphasis. Words unchanged.

## 4 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | the widget's generic `Salesforce Partner` chip | ⚠ confirm current. **No partner language for Propertybase, REDA, Dotloop, DocuSign, Accounting Seed, AscendixRE or Zillow** — the page says we integrate them |
| **B — client outcomes** | hero 3× / 40% / 100% / 60+; outcomes 3×, 60%, 40%, Same Day, 100%; case studies 3×, 65%, 100% and Same Day, 3 Days, 0 | ⚠ evidence not on file. Both testimonials are role-level and anonymised |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | Propertybase/REDA/Dotloop behaviour in §5 and FAQ 2, Agentforce and Einstein in FAQ 7 | ⚠ re-verify at publish |

**"60+ Real estate and property workflows designed and deployed"** is a countable claim about
our own delivery history, not a client outcome. It should be verifiable from internal
records — confirm the number before publish rather than treating it as marketing rounding.

## 5 · Verification

- `verify_page.py RealEstate.html` — **all 32 checks pass**.
- `verify_browser.js RealEstate.html` — **all checks pass**. No horizontal overflow at any of
  11 widths from 1600px to 320px; accordion behaviour correct; computed type scale matches
  Legal; renders fully with JavaScript disabled.
- `verify_degradation.js RealEstate.html` — **passes both failure modes**.

## 6 · Open items before publish

1. **Evidence for the outcome figures and the "60+ workflows" count** — §4.
2. **`/salesforce-for-real-estate/` — confirm the permalink**, add to `sitemap.xml`, submit in
   Search Console and Bing Webmaster Tools.
3. **Contextual inbound links** so the page does not launch as an orphan.
4. **Class-D claims re-verified at publish** — Agentforce capabilities move quickly.

Two things this page gets right that its siblings do not: **the logo `alt` attributes are
correct** — they name the real estate firms whose logos the image files actually are, the only
source in this batch of eight where that is true — and **both case-study links point at real
Twopir pages** for the engagements described.

Worth noting for the nonprofit page: this source is where its stray hero CTA came from. "Talk
to a Real Estate Expert" is correct **here** and wrong there.
