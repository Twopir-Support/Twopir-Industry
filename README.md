# Twopir Industry Pages

WordPress-ready industry pages for [twopirconsulting.com](https://twopirconsulting.com), built as
single Custom HTML block body fragments.

## Layout

```
Industry Pages/
  Legal.html          reference build — the template every other industry page starts from
  SaaS.html           Salesforce for SaaS & Technology
  Fintech.html        Salesforce for Fintech
  Healthcare.html     Salesforce for Healthcare
  Nonprofit.html      Salesforce for Nonprofits
  Manufacturing.html  Salesforce for Manufacturing & Industrial
  ProfessionalServices.html  Salesforce for Professional Services
redesign/
  homepage.html       design source — tokens, type scale, component idioms
scripts/
  generate_schema.py  regenerates a page's FAQPage JSON-LD from its visible accordion
  verify_page.py      static checks: CSS integrity, scoping, schema, claims, a11y
  verify_browser.js   Chromium checks: overflow, accordions, computed type scale
  verify_degradation.js  renders the page with the sheet deliberately broken, both
                         Autoptimize failure modes, and checks nothing collapses
docs/
  saas-build-report.md         build, preservation and SEO/AEO report for SaaS.html
  fintech-build-report.md      the same for Fintech.html — a restyle of the live page
                               onto the design system, with the copy preserved
  healthcare-build-report.md   the same for Healthcare.html; section 4 records a
                               blocking content defect carried over from the source
  nonprofit-build-report.md    the same for Nonprofit.html; section 4 records three
  manufacturing-build-report.md          the same for Manufacturing.html
  professional-services-build-report.md  the same for ProfessionalServices.html;
                               section 4 records a duplicate live page
```

All four scripts take a page filename, or default to every page in the directory.
They read the wrapper id and class prefix out of the file itself, so nothing needs
editing per page.

## Publishing a page

Paste the file into a **Custom HTML block**, never the visual editor — the visual editor injects
paragraph and line-break tags inside `<style>` and breaks the CSS outright.

Meta title, description and canonical live in the SEO plugin, not the fragment. The values for each
page are in the comment block at the top of its file.

## Verifying before publish

```sh
cd "Industry Pages"
python3 ../scripts/verify_page.py             # every page; or name one, e.g. Fintech.html
node ../scripts/verify_browser.js
node ../scripts/verify_degradation.js
```

`verify_browser.js` and `verify_degradation.js` build their own `harness.html` — the
page is a body fragment, so it only renders meaningfully inside a document that
reproduces what the live theme does to it (`html { font-size: 10px }`). The harness
files are gitignored and rewritten on every run. Both scripts run **offline**: every
external request is aborted at the route level, so a sandbox without egress does not
hang on the webfonts or the HubSpot-hosted client logos.

`verify_page.py` runs the Autoptimize token-deletion simulation, confirms the FAQ JSON-LD matches
the visible accordion word for word, and checks every `.twopir-*` stat fallback against the
canonical company fact set.

## Spinning up a new industry page

Start from `Industry Pages/Legal.html` and change five things:

1. **Identifiers** — `#twopir-legal` → `#twopir-<industry>`, then `tlg-` → `t<xx>-`.
   The keyframes carry the prefix too. There are **seven**, not the five Legal's own comment
   lists: `tlgPulse`, `tlgLive`, `tlgFlow`, `tlgSpin`, `tlgMarquee`, **`tlgScroll`** and
   **`tlgFadeIn`**. Missing the last two ships a keyframe collision.
2. **Content** — headings, copy, cards, stats, testimonials, FAQ.
3. **Hero diagram** — swap the SVG node labels for the industry's own systems and vocabulary.
   Keep the 560×548 viewBox and the layer geometry.
4. **Schema** — breadcrumb names, Service name/description, FAQ pairs. Regenerate the FAQ block
   with `scripts/generate_schema.py` rather than editing it by hand.
5. **SEO values** — the plugin block at the top of the file.

### What must not change

- The type scale and the colour tokens. They come from the homepage and they are what makes the
  pages read as one site.
- **One token rule.** Every custom property is declared in a single `#twopir-<industry> { }` rule,
  and every `var()` carries a literal fallback. Autoptimize merges duplicate selectors and will
  silently drop one — that is what broke the type scale on the first live deploy.
  `SaaS.html` goes further than `Legal.html` here: the wrapper's own styling was folded into the
  token rule so exactly one bare `#twopir-*` rule exists and there is nothing left to merge.
- `px` / `clamp()` sizing only, never `rem`. The live theme sets `html { font-size: 10px }`.
- `overflow-x: clip` on the wrapper, not `hidden` — `hidden` turns the wrapper into a scroll
  container and breaks the sticky callout.

### Current state of the three pages

| | Type scale | One-token rule | Grid-bullet defect | Static checks |
|---|---|---|---|---|
| `Legal.html` | current (Aug 2026 final) | ✗ three bare rules | ✗ present | 3 failing |
| `SaaS.html`  | current | ✓ | ✓ fixed | pass |
| `Fintech.html` | current | ✓ | ✓ fixed | pass |
| `Healthcare.html` | current | ✓ | ✓ fixed | pass |
| `Nonprofit.html` | current | ✓ | ✓ fixed | pass |
| `Manufacturing.html` | current | ✓ | ✓ fixed | pass |
| `ProfessionalServices.html` | current | ✓ | ✓ fixed | pass |

Two pieces of known debt, both recorded in the tooling rather than hidden:

- **`SaaS.html` is on the type scale the finals replaced** — 38px h2 against 44,
  12px eyebrow against 14, 16px card titles against 19. `verify_browser.js` names it
  in `LEGACY_SCALE` and reports those rows instead of asserting them. Remove the entry
  when the page is rebased onto the current tokens.
- **`Legal.html` fails three static checks** (three bare `#twopir-legal` rules,
  and two orphan tokens). It is the uploaded design source, so it is carried as-is rather
  than edited here.

`LEGACY_SCALE` in `verify_browser.js` is now empty — every page asserts against the same
type-scale table.

### Known defects in Legal.html, fixed in every page built since

Back-port these before building the next page from `Legal.html`:

1. **Keyframe rename list is incomplete** — see above. `tlgScroll` and `tlgFadeIn` are missing.
2. **`rem` in the hero H1** — `.tlg-hero-title` is `clamp(1.85rem, 3.05vw, 3rem)`. The tail pass
   overrides it, so it renders correctly today, but the theme sets `html { font-size: 10px }` and a
   dropped tail block would leave the H1 at an 18.5px floor.
3. **Grid-based list bullets break on inline children** — still present in the
   current `Legal.html`. `.tlg-svc-list li` uses
   `display: grid; grid-template-columns: 14px 1fr` with the diamond as the first grid item. Grid
   promotes *every* child, anonymous text nodes included, to its own cell. The moment a list item
   contains an inline element (`<a>`, `<strong>`), the trailing text lands in the 14px bullet
   column and renders one word per line. Use an absolutely-positioned `::before` with
   `padding-left: 24px` instead — identical rendering, no fragility.
