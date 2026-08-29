# Manufacturing.html — build report

`Industry Pages/Manufacturing.html` — Salesforce for Manufacturing & Industrial.

**This is a restyle, not a rewrite.** The page copy is the copy from
`manufac__industrial.html`; what changed is the presentation layer.

---

## 1 · Currency gate

Both reference files are byte-identical to the repo copies, which pass all four points:
1400px wrap, ladder present with floor 0.85, 13 type tokens including `--fs-micro` and
`--fs-stat`, zero `rem`. The source failed every one — a `.twopir-mfg` class wrapper with no
scoping prefix, no ladder, and **103 `rem` declarations**, which render at 62.5% under the
theme's `html { font-size: 10px }`.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-mfg` class wrapper, unscoped `#hero`, `#pain`, `#services`… | `#twopir-mfg`, every class `.tmf-` |
| **103 `rem` declarations** + inline `style="font-size: 2.2rem"` | the shared `px` / `clamp()` scale — zero |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon boxes on service cards | the design system's SVG icon tiles |
| three ad-hoc `<style>` blocks | one token rule |
| no schema | BreadcrumbList + Service + FAQPage |
| no hero visual | the shared navy operating-model diagram, relabelled for the manufacturing stack |

Measured at 1400×900, Manufacturing and Legal resolve identically: 44.8px H1, 44px section
titles, 24px pain headings, 19px card titles, 15.4px body, 14px mono eyebrows.

**Legal's grid-bullet defect is fixed here.**

### Components added for this page's sections

- **`.tmf-intro-*`** — the two-column Manufacturing Reality section.
- **`.tmf-inv-*`** — the inventory-visibility readout. It is an **illustration** of what the
  integration surfaces, not live data, so it is a `<figure>` with a `<figcaption>` and every
  row reads in order for a screen reader. The status pills carry their hue in a dot and
  border with the **label in ink**: `#e0961f` measures 2.36 on white and is a fill colour,
  never a text colour.
- **`.tmf-vert-*`** — the six manufacturing segments, with capability chips.
- **`.tmf-out-*`** — Business Outcomes. The "metric" is a phrase ("Faster Quotes"), not a
  figure, so it takes the mono eyebrow treatment rather than the display step.
- **`.tmf-hero-proof`** restyled to a 2×2 grid — the labels are full sentences.

**Two tokens added:** `--tmf-pos: #16916a` and `--tmf-neg: #c2453d`, both from the locked
palette in the page prompt. They are used only by the inventory status pills, where stock
state means something the brand blue cannot say. Not a second accent.

## 3 · Content preservation

All **193** text items in the source body are carried over verbatim, verified item by item.

Three deliberate exceptions: `TwoPir` → `Twopir Consulting` in body copy (testimonial quotes
keep the speaker's shorter form); the FAQ moved to the shared accordion, gaining ARIA wiring
`<details>` did not have; and service-card emoji became SVG tiles, with emoji kept where the
design system itself uses them (pain, segment and integration cards).

## 4 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | the widget's generic `Salesforce Partner` chip | ⚠ confirm current. **No partner language for SAP, Oracle, NetSuite, Epicor, Infor, Sage, Microsoft, MuleSoft, Boomi or ServiceMax** — the page says we integrate them |
| **B — client outcomes** | hero 60% / 45% / 3× / 360°; case studies 60%, 45%, 3× and 52%, 38%, 4× | ⚠ evidence not on file. Both testimonials are role-level and anonymised; both case-study links point at a service page and a blog guide rather than a case study |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | ERP integration behaviour in §6/§10, Manufacturing Cloud in FAQ 3 | ⚠ re-verify at publish |

The proof section's lede says *"Not claims — operational performance improvements measured
after go-live."* That sentence asserts measurement, so it needs the measurement on file
before publish.

## 5 · Verification

- `verify_page.py Manufacturing.html` — **all checks pass**.
- `verify_browser.js Manufacturing.html` — **all checks pass**. No horizontal overflow at any
  of 11 widths from 1600px to 320px; accordion behaviour correct; computed type scale matches
  Legal; renders fully with JavaScript disabled.
- `verify_degradation.js Manufacturing.html` — **passes both failure modes**.

## 6 · Open items before publish

1. **Evidence for the outcome figures** and the "measured after go-live" claim — §4.
2. **`/salesforce-for-manufacturing/` — confirm the permalink**, add to `sitemap.xml`, submit
   in Search Console and Bing Webmaster Tools.
3. **Contextual inbound links** so the page does not launch as an orphan.
4. **Class-D claims re-verified at publish** — Manufacturing Cloud capabilities move.
