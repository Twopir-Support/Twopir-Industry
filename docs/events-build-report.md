# Events.html — build report

`Industry Pages/Events.html` — Salesforce for Events & Hospitality.

**This is a restyle, not a rewrite.** The page copy is the copy from
`Events__Hospitality.html`; what changed is the presentation layer.

---

## 1 · Currency gate

Both reference files — `Legal_final.html` and `homepage_final.html` — are byte-identical to
the repo copies and pass all four points: 1400px wrap, ladder present with floor 0.85, 13
type tokens, zero `rem`. The source failed every one — a `.twopir-eh` class wrapper with no
scoping prefix, no ladder, no token layer, and **86 `rem` declarations**, which render at
62.5% under the theme's `html { font-size: 10px }`.

The shell was derived from `Nonprofit.html`. This page has no proof, no Who We Serve and no
Further Reading section, so those three component blocks were removed rather than shipped as
dead rules; the backbone track and a richer outcome card were added in their place.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-eh` class wrapper, unscoped `#hero`, `#pain`, `#services`… | `#twopir-events`, every class `.teh-` |
| **86 `rem` declarations**, including four inline `style="font-size:2.2rem"` ledes | the shared `px` / `clamp()` scale — zero |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon boxes on service cards | the design system's SVG icon tiles |
| four ad-hoc `<style>` blocks, two prepended outside the wrapper | one token rule |
| no schema | BreadcrumbList + Service + FAQPage |
| no hero visual | the shared navy operating-model diagram, relabelled for the events stack |

Measured at 1400×900, Events and Legal resolve identically: 44.8px H1, 44px section titles,
24px pain headings, 19px card titles, 15.4px body, 14px mono eyebrows.

**Legal's grid-bullet defect is fixed here.**

### Components added for this page's sections

- **`.teh-bone-*`** — the eight-stage operating backbone. Legal's process rail is five
  columns; eight at that width gives each stage ~150px, putting the measure under 22
  characters. Four across on two rows keeps the measure honest and divides evenly.
- **`.teh-out-*`** — Business Outcomes. Unlike the nonprofit and real estate outcome cards,
  these values **are** figures ("3×", "40%"), so they take the stat step. The unit ("Faster",
  "Reduction") is a label, not part of the figure, so it sits beside the number in mono at the
  micro step rather than being set at 26px and competing with what it modifies.
- **`.teh-hero-proof`** on a 2×2 grid — the four hero labels are full sentences.

No new tokens.

## 3 · Content preservation

All **204** text items in the source body are carried over verbatim, verified item by item.
Fourteen first-pass mismatches were all extraction artefacts of markup differences; each was
confirmed present in the rendered copy.

Four deliberate exceptions:

1. **`TwoPir` → `Twopir Consulting`** throughout. This page has no testimonials, so every
   occurrence is body copy.
2. **FAQ moved to the shared accordion**, gaining the ARIA wiring `<details>` did not have.
3. **Service-card emoji became SVG tiles.**
4. **The Why Twopir credentials list was flattened.** The source nested a second
   `why-engage-list` inside the first and left one item's closing tag unbalanced, so the last
   three credentials rendered inside the preceding item. Item text is unchanged.

### One markup fix

The source's second hero button pointed at `#proof`. **There is no proof section on this
page** — the client-outcome section is `#outcomes` — so the anchor was dead and the button did
nothing. It targets the outcomes section here. The label, "Review Client Outcomes", is
unchanged, and it now goes where it says it goes.

## 4 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | the widget's generic `Salesforce Partner` chip, plus a `Salesforce Partner` badge in the segment strip | ⚠ confirm current. **No partner language for Eventbrite, Stripe, PayPal, DocuSign, Conga, Opera, Delphi, QuickBooks or Xero** — the page says we integrate them |
| **B — client outcomes** | hero 3× / 40% / 30% / 360°; outcomes 3×, 40%, 30%, Zero | ⚠ evidence not on file |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | ticketing, PMS and payment integration behaviour in §5/§8, FAQ 1–4 | ⚠ re-verify at publish |

The outcomes section's lede says the impact *"shows up in commercial performance"* and calls
these *"the outcomes events and hospitality businesses see"* — phrasing that asserts observed
results across clients. **This page carries no testimonial and no case study to support any of
it.** Of the eight pages built in this batch it is the only one making client-outcome claims
with no proof section at all, which makes the evidence requirement more pressing here, not
less.

## 5 · Verification

- `verify_page.py Events.html` — **all 32 checks pass**.
- `verify_browser.js Events.html` — **all checks pass**. No horizontal overflow at any of 11
  widths from 1600px to 320px; accordion behaviour correct; computed type scale matches Legal;
  renders fully with JavaScript disabled.
- `verify_degradation.js Events.html` — **passes both failure modes**.

## 6 · Open items before publish

1. **Logo `alt` attributes name law firms.** All six logos in the trust strip carry alts for
   *Social Justice Collaborative*, *Bernstein Liebhard LLP*, *LegalZoom*, *Weinberger Law
   Group* and *Sterling Law Offices* (twice), while the image files themselves are events and
   hospitality logos — Inspired Adventures, FoodieLand, Zarraffa, Cinemaequip. A screen reader
   on this page announces the wrong organisations. Carried over verbatim and flagged in the
   markup; **fix before publish.** The same defect is on the nonprofit and telecom pages.
2. **Evidence for the outcome figures** — §4. Sharper here than elsewhere: no proof section.
3. **No case study or testimonial anywhere on the page.** Every sibling page has at least one.
   Worth deciding whether to add one before launch rather than after.
4. **`/salesforce-for-events-and-hospitality/` — confirm the permalink**, add to
   `sitemap.xml`, submit in Search Console and Bing Webmaster Tools.
5. **Contextual inbound links** so the page does not launch as an orphan.
6. **Class-D claims re-verified at publish.**
