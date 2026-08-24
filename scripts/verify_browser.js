const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const url = 'file://' + path.resolve('harness.html');
  let fails = 0;
  const chk = (ok, name, detail='') => {
    console.log(`${ok?'PASS':'FAIL'}  ${name}${detail?'   '+detail:''}`);
    if (!ok) fails++;
  };

  // ── 1 · Horizontal overflow at every required width ─────────────
  console.log('── Horizontal overflow ───────────────────────────────────');
  for (const w of [1600, 1400, 1200, 1024, 900, 768, 620, 500, 435, 375, 320]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const over = [];
      const vw = de.clientWidth;
      document.querySelectorAll('#twopir-saas *').forEach(el => {
        const b = el.getBoundingClientRect();
        // ignore elements inside an intentional overflow-x:auto scroller
        if (el.closest('.tsa-table-wrap') || el.closest('.tsa-marquee')) return;
        if (b.right > vw + 1.5 || b.left < -1.5) {
          over.push({ t: el.tagName + '.' + ((el.className && el.className.baseVal !== undefined) ? el.className.baseVal : (el.className || '')).toString().split(' ')[0],
                      l: Math.round(b.left), r: Math.round(b.right) });
        }
      });
      return { scrollW: de.scrollWidth, clientW: de.clientWidth, bodyScrollW: document.body.scrollWidth, over: over.slice(0, 6) };
    });
    const ok = r.scrollW <= r.clientW + 1;
    chk(ok, `${String(w).padStart(4)}px  no page overflow`,
        `scrollW ${r.scrollW} / clientW ${r.clientW}` + (r.over.length ? `  culprits: ${JSON.stringify(r.over)}` : ''));
    await page.close();
  }

  // ── 2 · Accordion behaviour ─────────────────────────────────────
  console.log('\n── FAQ accordion ─────────────────────────────────────────');
  {
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(400);
    const first = page.locator('#tsa-fb1');
    await first.scrollIntoViewIfNeeded();
    const closed = await page.evaluate(() => document.getElementById('tsa-fp1').getBoundingClientRect().height);
    await first.click(); await page.waitForTimeout(500);
    const open = await page.evaluate(() => ({
      h: document.getElementById('tsa-fp1').getBoundingClientRect().height,
      aria: document.getElementById('tsa-fb1').getAttribute('aria-expanded'),
      cls: document.getElementById('tsa-fb1').parentNode.classList.contains('is-open'),
    }));
    chk(closed < 2, 'panel starts collapsed', `${closed.toFixed(1)}px`);
    chk(open.h > 40 && open.aria === 'true' && open.cls, 'panel opens on click',
        `${open.h.toFixed(1)}px, aria-expanded=${open.aria}`);
    await first.click(); await page.waitForTimeout(500);
    const reclosed = await page.evaluate(() => ({
      h: document.getElementById('tsa-fp1').getBoundingClientRect().height,
      aria: document.getElementById('tsa-fb1').getAttribute('aria-expanded') }));
    chk(reclosed.h < 2 && reclosed.aria === 'false', 'panel closes on second click',
        `${reclosed.h.toFixed(1)}px, aria-expanded=${reclosed.aria}`);
    // one-at-a-time
    await page.locator('#tsa-fb2').click(); await page.waitForTimeout(400);
    await page.locator('#tsa-fb3').click(); await page.waitForTimeout(400);
    const excl = await page.evaluate(() => ({
      two: document.getElementById('tsa-fb2').getAttribute('aria-expanded'),
      three: document.getElementById('tsa-fb3').getAttribute('aria-expanded') }));
    chk(excl.two === 'false' && excl.three === 'true', 'opening one closes the previous');
    await page.close();
  }

  // ── 3 · Computed type scale ─────────────────────────────────────
  console.log('\n── Computed type scale (theme sets html{font-size:10px}) ──');
  {
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(600);
    const t = await page.evaluate(() => {
      const g = sel => { const e = document.querySelector(sel); if (!e) return null;
        const cs = getComputedStyle(e);
        return { fs: parseFloat(cs.fontSize), ff: cs.fontFamily.split(',')[0].replace(/["']/g,''), color: cs.color }; };
      return {
        h1: g('.tsa-hero-title'), h2: g('.tsa-title'), lede: g('.tsa-lede'),
        painTitle: g('.tsa-pain-item h3'), svcTitle: g('.tsa-svc-card h3'),
        stepTitle: g('.tsa-step h3'), intName: g('.tsa-int-name'),
        body: g('.tsa-pain-item p'), sm: g('.tsa-svc-list li'),
        eyebrow: g('.tsa-eyebrow'), statVal: g('.tsa-stat-val'),
        shiftK: g('.tsa-shift-k'), noteH3: g('.tsa-note h3'),
        tableTh: g('.tsa-table tbody th'), tableTd: g('.tsa-table td'),
        stageTag: g('.tsa-stage-tag'), intFlow: g('.tsa-int-flow'),
        faqBtn: g('.tsa-faq-btn'),
      };
    });
    // 1400px viewport → vw units: 4vw=56 → display clamps to 46; 3vw=42 → h2 clamps to 38
    const want = {
      h1: [46, 'Bricolage Grotesque'], h2: [38, 'Bricolage Grotesque'],
      lede: [17, 'Inter'], painTitle: [19, 'Bricolage Grotesque'],
      svcTitle: [16, 'Bricolage Grotesque'], stepTitle: [16, 'Bricolage Grotesque'],
      intName: [16, 'Bricolage Grotesque'], body: [15, 'Inter'], sm: [13, 'Inter'],
      eyebrow: [12, 'JetBrains Mono'], statVal: [40, 'Bricolage Grotesque'],
      shiftK: [16, 'Bricolage Grotesque'], noteH3: [19, 'Bricolage Grotesque'],
      tableTh: [16, 'Bricolage Grotesque'], tableTd: [13, 'Inter'],
      stageTag: [11, 'JetBrains Mono'], intFlow: [11, 'JetBrains Mono'],
      faqBtn: [16, 'Inter'],
    };
    for (const [k, [fs, ff]] of Object.entries(want)) {
      const got = t[k];
      const ok = got && Math.abs(got.fs - fs) < 0.6 && got.ff === ff;
      chk(ok, `${k.padEnd(11)} ${fs}px ${ff}`, got ? `got ${got.fs}px ${got.ff}` : 'ELEMENT MISSING');
    }
    await page.close();
  }

  // ── 4 · Hero first-screen behaviour ─────────────────────────────
  console.log('\n── Hero first-screen ─────────────────────────────────────');
  for (const [w, h, expectFull] of [[1440, 900, true], [1440, 700, false], [880, 900, false]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(500);
    const r = await page.evaluate(() => {
      const hero = document.querySelector('.tsa-hero');
      const cs = getComputedStyle(hero);
      return { h: hero.getBoundingClientRect().height, minH: cs.minHeight,
               clipped: hero.scrollHeight > hero.clientHeight + 1,
               h1Op: getComputedStyle(document.querySelector('.tsa-hero-title')).opacity };
    });
    const claimsScreen = r.minH !== '0px' && r.minH !== 'auto';
    chk(claimsScreen === expectFull, `${w}x${h}  ${expectFull?'claims':'does not claim'} the first screen`,
        `min-height ${r.minH}, height ${Math.round(r.h)}`);
    chk(!r.clipped, `${w}x${h}  hero content not clipped`);
    await page.close();
  }

  // ── 5 · No-JS rendering (crawler view) ──────────────────────────
  console.log('\n── No-JS / crawler view ──────────────────────────────────');
  {
    const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 }, javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(1200);   // the hero entrance is a 600ms CSS fade
    const vis = await page.locator('.tsa-hero-title').evaluate(el => getComputedStyle(el).opacity).catch(()=>null);
    chk(vis === '1', 'H1 reaches full opacity with JS disabled', `opacity ${vis}`);
    const anyHidden = await page.locator('.tsa-section .tsa-fade').first()
      .evaluate(el => getComputedStyle(el).opacity).catch(()=>null);
    chk(anyHidden === '1', 'below-fold content visible with JS disabled', `opacity ${anyHidden}`);
    const statText = await page.locator('.tsa-hero-proof b').first().textContent();
    chk(statText.trim() === '500+', 'stat fallback text readable without JS', `"${statText.trim()}"`);
    await ctx.close();

    const rm = await browser.newContext({ viewport: { width: 1400, height: 900 },
                                          javaScriptEnabled: false, reducedMotion: 'reduce' });
    const rp = await rm.newPage();
    await rp.goto(url, { waitUntil: 'load' });
    const r2 = await rp.locator('.tsa-hero-title').evaluate(el => {
      const cs = getComputedStyle(el); return { op: cs.opacity, anim: cs.animationName }; });
    chk(r2.op === '1' && r2.anim === 'none',
        'reduced motion + no JS: H1 instant, no animation', `opacity ${r2.op}, animation ${r2.anim}`);
    await rm.close();
  }

  // ── 6 · Theme blockquote glyph neutralised ──────────────────────
  console.log('\n── Theme guard ───────────────────────────────────────────');
  {
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await page.goto(url, { waitUntil: 'load' });
    const bq = await page.evaluate(() => {
      const el = document.querySelector('#twopir-saas blockquote');
      if (!el) return 'no blockquote on this page';
      return getComputedStyle(el, '::before').content;
    });
    chk(bq === 'none' || bq === 'no blockquote on this page', 'blockquote::before tofu neutralised', String(bq));
    await page.close();
  }

  console.log('\n' + '='.repeat(60));
  console.log(fails ? `  ${fails} FAILING CHECK(S)` : '  ALL BROWSER CHECKS PASS');
  console.log('='.repeat(60));
  await browser.close();
  process.exit(fails ? 1 : 0);
})();
