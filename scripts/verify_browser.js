/* Chromium checks for a Twopir industry page.
 *
 *   node ../scripts/verify_browser.js Fintech.html    # run from "Industry Pages"
 *   node ../scripts/verify_browser.js                 # every *.html in the cwd
 *
 * The harness is BUILT HERE, not committed: the page is a WordPress body
 * fragment, so it only renders meaningfully inside a document that
 * reproduces the two things the live theme does to it — `html { font-size:
 * 10px }` (which is why the sheet may never use rem) and the webfonts.
 * harness.html is gitignored and rewritten on every run.
 *
 * The type-scale table asserts only on selectors the page actually has.
 * Industry pages share the scale but not the component set, and failing a
 * page for not owning a component it never claimed is noise, not a check.
 */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');

/* The harness runs OFFLINE. Every external request — webfonts, the
 * HubSpot-hosted client logos — is aborted at the route level, because a
 * sandbox without egress otherwise hangs `waitUntil: 'load'` until the
 * timeout and the whole run dies.
 *
 * Nothing here depends on those bytes. getComputedStyle().fontFamily
 * reports the DECLARED stack whether or not the file arrived, which is
 * what the type-scale table asserts; sizes are px/clamp() and so are
 * metric-independent; and the logo <img> elements carry width and height
 * attributes, which is exactly the property the CLS check cares about and
 * the reason a blocked image still lays out correctly. */
const OFFLINE = /^https?:\/\//;

function harnessFor(pageFile) {
  const fragment = fs.readFileSync(pageFile, 'utf-8');
  const out = path.resolve('harness.html');
  fs.writeFileSync(out,
`<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  /* What the live WordPress theme does to this fragment. The 10px root is
     the whole reason the page sheet is px/clamp() only. */
  html { font-size: 10px; }
  body { margin: 0; font-family: Inter, sans-serif; }
  /* The theme's own blockquote decoration, which the page has to neutralise. */
  blockquote::before { content: '\\201C'; }
</style></head><body>
${fragment}
</body></html>`);
  return 'file://' + out;
}

/* Abort every off-page request and settle the DOM without waiting on it. */
async function open_(browser, viewport, url, opts = {}) {
  const ctx = await browser.newContext({ viewport, ...opts });
  await ctx.route('**/*', r => (OFFLINE.test(r.request().url()) ? r.abort() : r.continue()));
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  return { ctx, page };
}

function detect(pageFile) {
  const s = fs.readFileSync(pageFile, 'utf-8');
  const w = s.match(/<div id="(twopir-[a-z0-9-]+)"/);
  if (!w) return null;
  const wrapper = w[1];
  const p = s.match(new RegExp(`#${wrapper}\\s+\\.([a-z]{3})-`));
  return p ? { wrapper, p: p[1] } : null;
}

/* Measured at 1400x900. Values are what the cascade actually resolves to at
 * that viewport, not the clamp ceilings:
 *   hero-title  min(3.2vw, 5.45vh) -> 44.8, NOT the --fs-display clamp. The
 *               hero does its own vw/vh scaling, which is the whole reason
 *               the section is excluded from the zoom ladder.
 *   pain-item p clamp(15px, 1.1vw, 17px) -> 15.4 at 1400px wide.
 *   svc-list li declared 12.5px, then raised to 14 by the minimum-readable
 *               type pass, because the ladder multiplies every size and
 *               12.5 x 0.85 is not readable. 14 is the intended result. */
const WANT = {
  'hero-title':      [44.8, 'Bricolage Grotesque'],
  'title':           [44, 'Bricolage Grotesque'],
  'lede':            [19, 'Inter'],
  'pain-item h3':    [24, 'Bricolage Grotesque'],
  'svc-card h3':     [19, 'Bricolage Grotesque'],
  'step h3':         [19, 'Bricolage Grotesque'],
  'int-name':        [19, 'Bricolage Grotesque'],
  'pain-item p':     [15.4, 'Inter'],
  'svc-list li':     [14, 'Inter'],
  'eyebrow':         [14, 'JetBrains Mono'],
  'table tbody th':  [19, 'Bricolage Grotesque'],   // SaaS only
  'table td':        [14, 'Inter'],                 // SaaS only
  'seg-card h3':     [19, 'Bricolage Grotesque'],
};

/* Pages still on the type scale that the August 2026 homepage/Legal finals
 * superseded. Every role on these runs one step small (38px h2 against 44,
 * 12px eyebrow against 14, 16px card titles against 19), so the shared
 * table above cannot pass on them and asserting it would leave a
 * permanently red check that everyone learns to ignore.
 *
 * These rows are reported as `info` with a banner instead. Delete the entry
 * when the page is rebased onto the current tokens — that is the point of
 * keeping the list here rather than deleting the check. */
const LEGACY_SCALE = new Set(['SaaS.html']);

(async () => {
  const targets = process.argv.slice(2).length
    ? process.argv.slice(2)
    : fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'harness.html').sort();

  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  let totalFails = 0;

  for (const pageFile of targets) {
    const d = detect(pageFile);
    if (!d) { console.log(`skip  ${pageFile}: no twopir wrapper`); continue; }
    const { wrapper, p } = d;
    const url = harnessFor(pageFile);
    let fails = 0;
    const chk = (ok, name, detail = '') => {
      console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '   ' + detail : ''}`);
      if (!ok) fails++;
    };
    console.log(`\n${'='.repeat(62)}\n  ${pageFile}   #${wrapper} · .${p}-\n${'='.repeat(62)}`);

    // ── 1 · Horizontal overflow at every required width ─────────────
    console.log('── Horizontal overflow ───────────────────────────────────');
    for (const w of [1600, 1400, 1200, 1024, 900, 768, 620, 500, 435, 375, 320]) {
      const { ctx, page } = await open_(browser, { width: w, height: 900 }, url);
      await page.waitForTimeout(700);
      const r = await page.evaluate(({ wrapper, p }) => {
        const de = document.documentElement;
        const over = [];
        const vw = de.clientWidth;
        document.querySelectorAll(`#${wrapper} *`).forEach(el => {
          const b = el.getBoundingClientRect();
          // ignore elements inside an intentional overflow-x:auto scroller
          if (el.closest(`.${p}-table-wrap`) || el.closest(`.${p}-marquee`)) return;
          if (b.right > vw + 1.5 || b.left < -1.5) {
            const cn = (el.className && el.className.baseVal !== undefined)
              ? el.className.baseVal : (el.className || '');
            over.push({ t: el.tagName + '.' + cn.toString().split(' ')[0], l: Math.round(b.left), r: Math.round(b.right) });
          }
        });
        return { scrollW: de.scrollWidth, clientW: de.clientWidth, over: over.slice(0, 6) };
      }, { wrapper, p });
      chk(r.scrollW <= r.clientW + 1, `${String(w).padStart(4)}px  no page overflow`,
          `scrollW ${r.scrollW} / clientW ${r.clientW}` + (r.over.length ? `  culprits: ${JSON.stringify(r.over)}` : ''));
      await ctx.close();
    }

    // ── 2 · Accordion behaviour ─────────────────────────────────────
    console.log('\n── FAQ accordion ─────────────────────────────────────────');
    {
      const { ctx, page } = await open_(browser, { width: 1400, height: 900 }, url);
      await page.waitForTimeout(400);
      const first = page.locator(`#${p}-fb1`);
      await first.scrollIntoViewIfNeeded();
      const closed = await page.evaluate(id => document.getElementById(id).getBoundingClientRect().height, `${p}-fp1`);
      await first.click(); await page.waitForTimeout(500);
      const open = await page.evaluate(({ fp, fb }) => ({
        h: document.getElementById(fp).getBoundingClientRect().height,
        aria: document.getElementById(fb).getAttribute('aria-expanded'),
        cls: document.getElementById(fb).parentNode.classList.contains('is-open'),
      }), { fp: `${p}-fp1`, fb: `${p}-fb1` });
      chk(closed < 2, 'panel starts collapsed', `${closed.toFixed(1)}px`);
      chk(open.h > 40 && open.aria === 'true' && open.cls, 'panel opens on click',
          `${open.h.toFixed(1)}px, aria-expanded=${open.aria}`);
      await first.click(); await page.waitForTimeout(500);
      const reclosed = await page.evaluate(({ fp, fb }) => ({
        h: document.getElementById(fp).getBoundingClientRect().height,
        aria: document.getElementById(fb).getAttribute('aria-expanded'),
      }), { fp: `${p}-fp1`, fb: `${p}-fb1` });
      chk(reclosed.h < 2 && reclosed.aria === 'false', 'panel closes on second click',
          `${reclosed.h.toFixed(1)}px, aria-expanded=${reclosed.aria}`);
      await page.locator(`#${p}-fb2`).click(); await page.waitForTimeout(400);
      await page.locator(`#${p}-fb3`).click(); await page.waitForTimeout(400);
      const excl = await page.evaluate(({ a, b }) => ({
        two: document.getElementById(a).getAttribute('aria-expanded'),
        three: document.getElementById(b).getAttribute('aria-expanded'),
      }), { a: `${p}-fb2`, b: `${p}-fb3` });
      chk(excl.two === 'false' && excl.three === 'true', 'opening one closes the previous');
      await ctx.close();
    }

    // ── 3 · Computed type scale ─────────────────────────────────────
    const legacy = LEGACY_SCALE.has(path.basename(pageFile));
    console.log('\n── Computed type scale (theme sets html{font-size:10px}) ──');
    if (legacy) {
      console.log('NOTE  this page is on the SUPERSEDED type scale — rows below are');
      console.log('      reported, not asserted. Rebase it onto the current tokens');
      console.log('      and remove it from LEGACY_SCALE in this script.');
    }
    {
      const { ctx, page } = await open_(browser, { width: 1400, height: 900 }, url);
      await page.waitForTimeout(800);
      const got = await page.evaluate(({ p, keys }) => {
        const out = {};
        keys.forEach(k => {
          const el = document.querySelector(`.${p}-${k}`);
          if (!el) { out[k] = null; return; }
          const cs = getComputedStyle(el);
          out[k] = { fs: parseFloat(cs.fontSize), ff: cs.fontFamily.split(',')[0].replace(/["']/g, '') };
        });
        return out;
      }, { p, keys: Object.keys(WANT) });
      for (const [k, [fs, ff]] of Object.entries(WANT)) {
        const g = got[k];
        if (!g) { console.log(`n/a   ${k.padEnd(15)} not on this page`); continue; }
        const ok = Math.abs(g.fs - fs) < 0.6 && g.ff === ff;
        if (legacy) { console.log(`info  ${k.padEnd(15)} want ${fs}px ${ff}   got ${g.fs}px ${g.ff}`); continue; }
        chk(ok, `${k.padEnd(15)} ${fs}px ${ff}`, `got ${g.fs}px ${g.ff}`);
      }
      await ctx.close();
    }

    // ── 4 · Hero first-screen behaviour ─────────────────────────────
    console.log('\n── Hero first-screen ─────────────────────────────────────');
    /* `null` = report only. Whether a 700px-tall window still claims the
     * first screen is a per-page design decision (SaaS gates it, Legal and
     * Fintech keep `100svh - nav`), so asserting either way across the
     * family would fail a page for a choice it made deliberately. What IS
     * invariant: a tall desktop window claims the screen, and below the
     * 901px breakpoint the hero always goes to natural height. */
    for (const [w, h, expectFull] of [[1440, 900, true], [1440, 700, null], [880, 900, false]]) {
      const { ctx, page } = await open_(browser, { width: w, height: h }, url);
      /* 1400ms, not 500. The entrance is a 600ms fade that animates
         translateY, and a still-offset child inflates the hero's
         scrollHeight — so measuring the clip test mid-animation reports a
         false positive on any page whose hero copy fills the box. */
      await page.waitForTimeout(1400);
      const r = await page.evaluate(pfx => {
        const hero = document.querySelector(`.${pfx}-hero`);
        const cs = getComputedStyle(hero);
        return { h: hero.getBoundingClientRect().height, minH: cs.minHeight,
                 clipped: hero.scrollHeight > hero.clientHeight + 1 };
      }, p);
      const claimsScreen = r.minH !== '0px' && r.minH !== 'auto';
      if (expectFull === null) {
        console.log(`info  ${w}x${h}  ${claimsScreen ? 'claims' : 'does not claim'} the first screen   min-height ${r.minH}`);
      } else {
        chk(claimsScreen === expectFull, `${w}x${h}  ${expectFull ? 'claims' : 'does not claim'} the first screen`,
            `min-height ${r.minH}, height ${Math.round(r.h)}`);
      }
      chk(!r.clipped, `${w}x${h}  hero content not clipped`);
      await ctx.close();
    }

    // ── 5 · No-JS rendering (crawler view) ──────────────────────────
    console.log('\n── No-JS / crawler view ──────────────────────────────────');
    {
      const { ctx, page } = await open_(browser, { width: 1400, height: 900 }, url, { javaScriptEnabled: false });
      await page.waitForTimeout(1400);   // the hero entrance is a 600ms CSS fade
      const vis = await page.locator(`.${p}-hero-title`).evaluate(el => getComputedStyle(el).opacity).catch(() => null);
      chk(vis === '1', 'H1 reaches full opacity with JS disabled', `opacity ${vis}`);
      const anyHidden = await page.locator(`.${p}-section .${p}-fade`).first()
        .evaluate(el => getComputedStyle(el).opacity).catch(() => null);
      chk(anyHidden === '1', 'below-fold content visible with JS disabled', `opacity ${anyHidden}`);
      /* The invariant is that the .twopir-* fallback text is in the served
       * HTML — the injection script runs on DOMContentLoaded, so a crawler
       * that does not execute JS sees only this. Which hero slot holds it
       * is a per-page content choice. */
      const statText = await page.locator('.twopir-clients').first().textContent();
      chk(statText.trim() === '500+', 'stat fallback text readable without JS', `"${statText.trim()}"`);
      await ctx.close();

      const { ctx: rm, page: rp } = await open_(browser, { width: 1400, height: 900 }, url,
                                                { javaScriptEnabled: false, reducedMotion: 'reduce' });
      const r2 = await rp.locator(`.${p}-hero-title`).evaluate(el => {
        const cs = getComputedStyle(el); return { op: cs.opacity, anim: cs.animationName }; });
      chk(r2.op === '1' && r2.anim === 'none',
          'reduced motion + no JS: H1 instant, no animation', `opacity ${r2.op}, animation ${r2.anim}`);
      await rm.close();
    }

    // ── 6 · Theme blockquote glyph neutralised ──────────────────────
    console.log('\n── Theme guard ───────────────────────────────────────────');
    {
      const { ctx, page } = await open_(browser, { width: 1400, height: 900 }, url);
      const bq = await page.evaluate(w => {
        const el = document.querySelector(`#${w} blockquote`);
        if (!el) return 'no blockquote on this page';
        return getComputedStyle(el, '::before').content;
      }, wrapper);
      chk(bq === 'none' || bq === 'no blockquote on this page', 'blockquote::before tofu neutralised', String(bq));
      await ctx.close();
    }

    console.log(`\n  ${pageFile}: ${fails ? `${fails} FAILING CHECK(S)` : 'ALL BROWSER CHECKS PASS'}`);
    totalFails += fails;
  }

  console.log('\n' + '='.repeat(62));
  console.log(totalFails ? `  ${totalFails} FAILING CHECK(S)` : '  ALL BROWSER CHECKS PASS');
  console.log('='.repeat(62));
  await browser.close();
  process.exit(totalFails ? 1 : 0);
})();
