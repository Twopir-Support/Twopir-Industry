# ProfessionalServices.html — build report

`Industry Pages/ProfessionalServices.html` — Salesforce for Professional Services &
Consulting Firms.

**This is a restyle, not a rewrite.** The page copy is the copy from
`professional_service.html`; what changed is the presentation layer.

---

## 1 · Currency gate

Both reference files are byte-identical to the repo copies, which pass all four points. The
source failed every one — a `.twopir-ps` class wrapper with no scoping prefix, no ladder, and
**114 `rem` declarations**.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-ps` class wrapper, unscoped sections | `#twopir-ps`, every class `.tps-` |
| **114 `rem` declarations** + inline `font-size` attributes | the shared `px` / `clamp()` scale — zero |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with ARIA wiring |
| emoji icon boxes on service cards | the design system's SVG icon tiles |
| three ad-hoc `<style>` blocks | one token rule |
| no schema | BreadcrumbList + Service + FAQPage |
| no hero visual | the shared navy operating-model diagram, relabelled for the firm stack |

Measured at 1400×900, ProfessionalServices and Legal resolve identically.

**Legal's grid-bullet defect is fixed here.**

### Components added for this page's sections

- **`.tps-firm-chip`** — the eight firm types. Name only, no description, so these are chips
  rather than cards: a card surface would promise a body that never arrives.
- **`.tps-life-*`** — the six lifecycle stages, three across on two rows. Six on Legal's
  five-column process rail would leave a single orphan on the second row.
- **`.tps-out-*`** — the six What Changes cards.
- **`.tps-hero-proof`** restyled to a 2×2 grid — the labels are full sentences.

## 3 · Content preservation

All **196** text items in the source body are carried over verbatim, verified item by item.

Four deliberate exceptions, none changing what the page says:

1. `TwoPir` → `Twopir Consulting` in body copy; testimonial quotes keep the speaker's form.
2. The FAQ moved to the shared accordion.
3. Service-card emoji became SVG tiles; emoji kept where the design system uses them.
4. **Heading level.** The source set the six lifecycle stage titles as `<h4>` directly under
   the section's `<h2>`, which skips a level and breaks the outline. They are `<h3>` here;
   the text is unchanged.

## 4 · ⚠ A near-duplicate page already exists

`https://twopirconsulting.com/salesforce-for-professional-services-consulting-firms/` is
live and covers the same subject. Publishing this block at a second professional-services
permalink would put two pages of the site in competition for the same query — the
cannibalisation failure the publishing rules call out.

**Decide one of two things before publishing:** replace the existing page's content with this
block at its current permalink, or publish here and 301 the old URL to it. Do not run both.
The SEO block at the top of the file carries the same warning.

## 5 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | the widget's generic `Salesforce Partner` chip | ⚠ confirm current. **No partner language for Asana, Monday.com, DocuSign, QuickBooks, Xero, HubSpot, Slack, Harvest, Tableau or Calendly** — the page says we integrate them |
| **B — client outcomes** | hero 45% / 60% / 3× / 360°; case studies 40%, 2×, 100% and 100%, 360°, 0 | ⚠ evidence not on file. Note that **both case studies link to engagements from other verticals** — the first to a personal-injury law firm automation case study, the second to a MeetMax events integration. Both are real published case studies, but neither is a consulting-firm engagement, so the section's framing ("professional services and advisory firm engagements") overstates what the links support |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | integration behaviour in §9 and FAQ 4 | ⚠ re-verify at publish |

## 6 · Verification

- `verify_page.py ProfessionalServices.html` — **all checks pass**.
- `verify_browser.js ProfessionalServices.html` — **all checks pass**. No horizontal overflow
  at any of 11 widths from 1600px to 320px; accordion behaviour correct; computed type scale
  matches Legal; renders fully with JavaScript disabled.
- `verify_degradation.js ProfessionalServices.html` — **passes both failure modes**.

## 7 · Open items before publish

1. **Resolve the duplicate page** — §4. Blocking.
2. **Evidence for the outcome figures**, and reconcile the two case-study links with the
   section's framing — §5.
3. **Confirm the permalink**, add to `sitemap.xml`, submit in Search Console and Bing.
4. **Contextual inbound links** so the page does not launch as an orphan.
