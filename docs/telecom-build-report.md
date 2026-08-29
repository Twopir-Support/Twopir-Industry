# Telecom.html — build report

`Industry Pages/Telecom.html` — Salesforce for Telecom & Infrastructure.

**This is a restyle, not a rewrite.** The page copy is the copy from
`Telecom__infra_backup.html`; what changed is the presentation layer.

---

## 1 · Currency gate

Both reference files — `Legal_final.html` and `homepage_final.html` — are byte-identical to
the repo copies and pass all four points: 1400px wrap, ladder present with floor 0.85, 13
type tokens including `--fs-micro` and `--fs-stat`, zero `rem` (their only `rem` hits are a
build comment and a `classList.remove` call). The source failed every one — a `.twopir-lf`
class wrapper with no scoping prefix, no ladder, no token layer, and **100 `rem`
declarations**, which render at 62.5% under the theme's `html { font-size: 10px }`.

The shell was derived from `Nonprofit.html`, the only page already carrying a Further Reading
section, with SaaS's seven-stage lifecycle track grafted in.

## 2 · What changed

| Was | Is |
|---|---|
| `.twopir-lf` class wrapper, unscoped `#hero`, `#pain`, `#services`… | `#twopir-telecom`, every class `.ttl-` |
| **100 `rem` declarations**, including four inline `style="font-size: 2.2rem"` ledes | the shared `px` / `clamp()` scale — zero |
| no zoom ladder | the full ladder, floor 0.85 |
| `<details>` / `<summary>` FAQ | button + panel accordion with `aria-expanded` / `aria-controls` |
| emoji icon boxes on service cards | the design system's SVG icon tiles |
| four ad-hoc `<style>` blocks, two of them prepended outside the wrapper | one token rule |
| no schema | BreadcrumbList + Service + FAQPage |
| no hero visual | the shared navy operating-model diagram, relabelled for the telecom stack |

Measured at 1400×900, Telecom and Legal resolve identically: 44.8px H1, 44px section titles,
24px pain headings, 19px card titles, 15.4px body, 14px mono eyebrows.

**Legal's grid-bullet defect is fixed here.**

### Components added for this page's sections

- **`.ttl-life-*`** — the seven-stage subscriber lifecycle, ported from SaaS. Legal's process
  rail is five columns; seven at that width gives each step ~170px, which puts the measure
  under 25 characters. Four across on two rows keeps the measure honest.
- **`.ttl-hero-proof`** on a 2×2 grid — the four hero labels are full sentences, and they
  break the inline chip row Legal uses for short ones.

No new tokens. Every value on this page already existed in the shared layer, so the token
rule is unchanged from the reference.

### Components removed

`.tnp-out-*` and `.tnp-who-*` came across with the shell but this page has no Operational
Outcomes or Who We Serve section, so both blocks were deleted rather than shipped as dead
rules. The SVG canvas class `.ttl-out` is a different thing and stays.

## 3 · Content preservation

All **248** text items in the source body are carried over verbatim, verified item by item —
every `<li>`, `<h3>`, `<p>`, `<summary>` and card label extracted from the source and matched
against the rebuild rather than trusting a diff. Sixteen items reported as unmatched on the
first pass were all extraction artefacts of markup differences (nested `<span>`s, the FAQ's
decorative `+` glyph, the `→` in link labels); each was confirmed present in the rendered
copy.

Four deliberate exceptions:

1. **`TwoPir` → `Twopir Consulting`** throughout. Unlike Healthcare and Manufacturing,
   neither testimonial quote on this page contains the company name, so there is no
   speaker's-form exception to preserve — every occurrence is body copy.
2. **FAQ moved to the shared accordion**, gaining the ARIA wiring `<details>` did not have.
3. **Service-card emoji became SVG tiles.** Two of the nine were wrong for their card in the
   source — a Latin cross (✝️) on *BSS/OSS Integration & System Architecture*, and the same
   hammer-and-wrench (🛠️) repeated on two unrelated cards. Emoji are kept where the design
   system itself uses them: pain, lifecycle and integration cards.
4. **The Why Twopir credentials list was flattened.** The source nested a second
   `why-engage-list` inside the first and left one item's closing tag unbalanced, so the last
   three credentials rendered inside the preceding item. Item text is unchanged.

## 4 · Claims

| Class | On this page | Status |
|---|---|---|
| **A — company facts** | 12+ years · 500+ clients · areaServed | ✅ canonical, via `.twopir-*` with literal fallbacks |
| **A2 — vendor relationships** | the widget's generic `Salesforce Partner` chip, plus a `Salesforce Partner` trust badge | ⚠ confirm current. **No partner language for Aria, Amdocs, Mavenir, Twilio, MuleSoft, Bill Express or TM Forum** — the page says we integrate or align to them |
| **B — client outcomes** | hero 5G / 60K / 6× / 360°; case studies 5G+, 60K, 6× and Live, AI, Zero | ⚠ evidence not on file. Both testimonials are role-level and anonymised ("CEO, Multi-Service Telecom Operator"; "Digital Transformation Team") |
| **C — industry statistics** | none | ✅ |
| **D — technical claims** | Communications Cloud, ODA alignment and Aria sync behaviour in §6/§8, FAQ 1–3 | ⚠ re-verify at publish |

Two claims need particular attention before publish:

- **"showcased at TM Innovate Americas 2024 … Their CEO co-presented with Salesforce's
  Product leadership"** (Why Twopir §02) is a specific, checkable, attributable event claim.
  It needs a source on file — a session listing, a recording, or written client sign-off.
- **"launched their market's first 5G network, expanded fiber to 60,000 homes, and introduced
  satellite TV"** (Why Twopir §05) is a class-B outcome claim about a named-in-all-but-name
  client. Same requirement.

Unlike the other five pages, this page has **no percentage figures at all**, so the fabricated-
percentage check is clean rather than merely passing.

## 5 · Verification

- `verify_page.py Telecom.html` — **all 32 checks pass**.
- `verify_browser.js Telecom.html` — **all checks pass**. No horizontal overflow at any of 11
  widths from 1600px to 320px; accordion behaviour correct; computed type scale matches
  Legal; renders fully with JavaScript disabled.
- `verify_degradation.js Telecom.html` — **passes both failure modes**.

## 6 · Open items before publish

1. **Logo `alt` attributes name law firms.** All six logos in the trust strip carry alts for
   *Social Justice Collaborative*, *Bernstein Liebhard LLP*, *LegalZoom*, *Weinberger Law
   Group* and *Sterling Law Offices* (twice), while the image files themselves are telecom
   and infrastructure logos — Kacific, Sure Power, Wireless Terminal Solutions, Affordable
   Solar. A screen reader on this page announces the wrong organisations. Carried over
   verbatim and flagged in the markup; **fix before publish.** This is the same defect the
   nonprofit page has.
2. **Evidence for the TM Innovate Americas and 5G/fiber/satellite claims** — §4.
3. **Evidence for the outcome figures** — §4.
4. **`/salesforce-for-telecom-and-infrastructure/` — confirm the permalink**, add to
   `sitemap.xml`, submit in Search Console and Bing Webmaster Tools.
5. **Contextual inbound links** so the page does not launch as an orphan.
6. **Class-D claims re-verified at publish** — Communications Cloud capabilities and the TM
   Forum ODA specification both move.

Unlike Professional Services, no near-duplicate page appears to be live for this vertical, and
unlike Healthcare and Professional Services, both case-study links point at genuine telecom
engagements: `/case-study/salesforce-for-telecommunication-excellence/` and the
Salesforce–Mavenir integration blog post.
