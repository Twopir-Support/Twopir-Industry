# Twopir Industry Pages

WordPress-ready industry pages for [twopirconsulting.com](https://twopirconsulting.com), built as
single Custom HTML block body fragments.

## Layout

```
Industry Pages/
  Legal.html          reference build — the template every other industry page starts from
  SaaS.html           Salesforce for SaaS & Technology
redesign/
  homepage.html       design source — tokens, type scale, component idioms
scripts/
  generate_schema.py  regenerates a page's FAQPage JSON-LD from its visible accordion
  verify_page.py      static checks: CSS integrity, scoping, schema, claims, a11y
  verify_browser.js   Chromium checks: overflow, accordions, computed type scale
docs/
  saas-build-report.md   build, preservation and SEO/AEO report for SaaS.html
```

## Publishing a page

Paste the file into a **Custom HTML block**, never the visual editor — the visual editor injects
paragraph and line-break tags inside `<style>` and breaks the CSS outright.

Meta title, description and canonical live in the SEO plugin, not the fragment. The values for each
page are in the comment block at the top of its file.

## Verifying before publish

```sh
cd "Industry Pages"
python3 ../scripts/verify_page.py            # run from the directory holding the page
node ../scripts/verify_browser.js            # needs harness.html; see the script header
```

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
