# Nonprofit.html — build report

`Industry Pages/Nonprofit.html` — Salesforce for Nonprofits.

**This is a restyle, not a rewrite.** The page copy is the copy from
`nonprofit_backup.html`. What changed is the presentation layer: it now runs on the same
design system, tokens and type scale as `Legal.html` and the homepage finals.

---

## 1 · Currency gate

Both reference files are byte-identical to the repo copies, which pass all four points:
1400px wrap, ladder present with floor 0.85, 13 type tokens including `--fs-micro` and
`--fs-stat`, zero `rem`.

The source failed every one of them — a `.twopir-lf` wrapper, no scoping prefix, no ladder,
and **102 `rem` declarations**, which render at 62.5% under the theme's
`html { font-size: 10px }`.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-lf` wrapper, unscoped `#hero`, `#pain`, `#services`… | `#twopir-nonprofit`, every class `.tnp-` |
| **102 `rem` declarations** + inline `style="font-size: 2.2rem"` | the shared `px` / `clamp()` scale — zero `rem` |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| three ad-hoc `<style>` blocks | one token rule; nothing for the minifier to merge |
| no schema | BreadcrumbList + Service + FAQPage |
| no hero visual | the shared navy operating-model diagram, relabelled for the nonprofit stack |

Measured at 1400×900, Nonprofit and Legal resolve identically: 44.8px H1, 44px section
titles, 24px pain headings, 19px card titles, 15.4px body, 14px mono eyebrows.

**Legal's grid-bullet defect is fixed here** — `.tnp-svc-list li` uses a positioned
`::before` with `padding-left`, not `display: grid` with the diamond as a grid item.

### Components added for this page's sections

- **`.tnp-out-*`** — Operational Outcomes. Deliberately *not* a stat grid: this page's
  outcome "values" are short accent phrases ("↑ Donor Retention"), not figures, so they take
  the h4 step. Setting a five-word phrase at the 48px display step would break the row and
  invert the hierarchy.
- **`.tnp-who-*`** — Who We Serve, three-up. The source ran these six cards through the same
  four-column grid as the integrations, leaving a ragged row of two; three divides evenly and
  gives the longer descriptions a workable measure.
- **`.tnp-read-*`** — Further Reading. The whole card is the anchor, so the focus ring lands
  on the card rather than on a text fragment inside it.
- **`.tnp-hero-proof`** restyled to a stacked 2×2 grid — this page's metric labels are full
  sentences that break the baseline when wrapped inside Legal's inline chip row.

## 3 · Content preservation

All **164** text items in the source body are carried over verbatim, verified item by item.

Three deliberate exceptions, none of which change what the page says:

1. **`TwoPir` → `Twopir Consulting`** in body copy, matching the canonical entity name.
   Testimonial quotes keep the speaker's own shorter "Twopir".
2. **FAQ markup.** `<details>`/`<summary>` became the shared accordion. Question and answer
   text is identical; the `+` glyph became the animated SVG, and the control gained the ARIA
   wiring `<details>` did not have.
3. **Section id.** The source gave *Who We Serve* `id="integrations"` — the id the
   integrations section above already carried. Two elements shared one id, so both
   `aria-labelledby` references resolved to the first heading and assistive technology
   announced the wrong section name. Re-identified; the copy is unchanged.

The trust line's `500+` is bound to `.twopir-clients` so the live stats object drives it,
with the same text as the literal fallback.

## 4 · ⚠ Three content defects carried over from the source

All three are preserved verbatim, because the brief was to change styling and not content —
and because the fix in each case is real information I do not have. Each is flagged with a
comment at the point of use.

### 4.1 The hero CTA says "Real Estate"

```
Talk to a Real Estate Expert
```

The primary hero button on a nonprofit page. Almost certainly pasted from a real-estate page
and never rewritten. **This is the most visible of the three** — it is the first button a
visitor sees. The obvious replacement is something like "Talk to a Nonprofit Systems Expert",
matching the pattern used on the other industry pages.

### 4.2 Every client logo carries a law-firm `alt`

Seven logos, seven `alt` attributes naming law firms, on nonprofit logo files:

| Image file | `alt` says |
|---|---|
| `YANA-Logo-1.webp` | Social Justice Collaborative |
| `download (1).jpg` | Bernstein Liebhard LLP |
| `images (4).png` | LegalZoom |
| `logo (2).png` | Weinberger Law Group |
| `WFS_Logo_2020.png` | Weinberger Law Group1 |
| `Root_Capital_25_Years_Logo.webp` | Weinberger Law Group11 |
| `Adventure Scientists 15 Years 1.png` | Weinberger Law Group11 |

A screen reader on this page announces "LegalZoom" and "Weinberger Law Group11". Four of the
filenames identify the real organisation (YANA, WFS, Root Capital, Adventure Scientists);
three do not, so correcting them needs someone who knows which logos these are. The duplicate
loop copies are marked `alt=""` and `aria-hidden`, which is correct — only the first seven
need real names.

### 4.3 Outcome figures have no evidence on file

Hero: 3× / 60% / 40% / 1. Case studies: 47%, 8hrs, 3× and 100%, 12hrs, 4. The two case
studies are attributed to "Conservation Alliance" and "Youth Services Foundation" with
first-name-plus-initial testimonials, and both "Read Full Case Study" links point at a
service page and a blog post rather than a case study. Confirm the documented evidence and,
where a client is identifiable, approval.

### Claims classification

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | the widget's generic `Salesforce Partner` / `HubSpot Partner` chips; "Built On & Certified In" over a product list | ⚠ confirm the certification wording. **No partner language for Raisely, Classy, Brickwork, GiveLively, Accounting Seed, QuickBooks, Xero or Mailchimp** — the page says we integrate them |
| **B — client outcomes** | the figures in 4.3 | ⚠ evidence not on file |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | NPSP vs Nonprofit Cloud in FAQ 2; integration behaviour in §7 | ⚠ **re-verify at publish** — the NPSP/Nonprofit Cloud comparison in particular moves with Salesforce's roadmap |

## 5 · SEO / AEO

- **Intent:** commercial investigation. Primary keyword *Salesforce for nonprofits*.
- **Question coverage:** definition (hero + FAQ 1), problem (§3, eight items), comparison
  (FAQ 2, NPSP vs Nonprofit Cloud; FAQ 7 vs a standard partner), implementation (§7 + FAQ 4/5),
  decision (§9 audience cards + FAQ 3/6), outcome (§8).
- **Entity relationship map**, explicit in the copy: `Twopir Consulting → nonprofits (growing,
  established, multi-chapter, education, health and human services, advocacy) → fragmented
  donor, grant and program systems → operating infrastructure → Salesforce Nonprofit Cloud →
  Raisely / Classy / Brickwork / Accounting Seed / Marketing Cloud → donors → stewardship →
  grants → programs → board reporting`.
- **Lifecycle named in the sector's own vocabulary** — constituents, gifts, pledges, soft
  credit, moves management, stewardship, grant lifecycle, fund utilization.
- **Internal links:** the Further Reading section carries three contextual links to Twopir
  blog guides, and the proof section links to `/salesforce-nonprofit-cloud/`.
- **Schema:** BreadcrumbList + Service + FAQPage. No second Organization node, no QAPage, no
  `offers` / price / rating. The FAQ block is generated from the visible accordion and matches
  it word for word.

## 6 · Verification

Run from `Industry Pages/`:

- `verify_page.py Nonprofit.html` — **all checks pass**.
- `verify_browser.js Nonprofit.html` — **all checks pass**. No horizontal overflow at any of
  11 widths from 1600px to 320px; accordion opens, closes and is exclusive; computed type
  scale matches Legal exactly; H1 and below-fold content reach full opacity with JavaScript
  disabled; `500+` readable in the served HTML.
- `verify_degradation.js Nonprofit.html` — **passes both failure modes**.

## 7 · Open items before publish

1. **Fix the hero CTA** — §4.1. Most visible of the three.
2. **Fix the seven logo `alt` attributes** — §4.2. Three need someone who knows the logos.
3. **Evidence for the outcome figures**, and real case-study links — §4.3.
4. **`/salesforce-for-nonprofits/` — confirm the permalink**, add to `sitemap.xml`, submit in
   Search Console and Bing Webmaster Tools.
5. **Contextual inbound links** so the page does not launch as an orphan — at minimum from
   `/industries-we-serve/`.
6. **Client logo usage permissions** — confirm current.
7. **Class-D claims re-verified at publish**, especially the NPSP / Nonprofit Cloud comparison.
