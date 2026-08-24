const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  let fails = 0;
  const want = { h1:46, h2:38, painTitle:19, svcTitle:16, stepTitle:16, statVal:40, tableTh:16, noteH3:19 };
  for (const f of ['harness-no-tail.html','harness-no-tokens.html']) {
    console.log(`\n── ${f} ─────────────────────────────────`);
    const p = await b.newPage({ viewport:{width:1400,height:900} });
    await p.goto('file://'+path.resolve(f), { waitUntil:'load' });
    await p.waitForTimeout(1200);
    const t = await p.evaluate(() => {
      const g = s => { const e=document.querySelector(s); return e?parseFloat(getComputedStyle(e).fontSize):null; };
      return { h1:g('.tsa-hero-title'), h2:g('.tsa-title'), painTitle:g('.tsa-pain-item h3'),
               svcTitle:g('.tsa-svc-card h3'), stepTitle:g('.tsa-step h3'), statVal:g('.tsa-stat-val'),
               tableTh:g('.tsa-table tbody th'), noteH3:g('.tsa-note h3'),
               wrapper:parseFloat(getComputedStyle(document.getElementById('twopir-saas')).fontSize),
               scrollW:document.documentElement.scrollWidth, clientW:document.documentElement.clientWidth };
    });
    for (const [k,v] of Object.entries(want)) {
      // no-tail drops the !important pass, so the base rule's own size governs;
      // what must NEVER happen is a collapse to the inherited wrapper size.
      const ok = t[k] !== null && Math.abs(t[k] - t.wrapper) > 0.5 || Math.abs(t[k]-v) < 0.6;
      console.log(`${ok?'PASS':'FAIL'}  ${k.padEnd(10)} ${t[k]}px  (want ~${v}, wrapper ${t.wrapper})`);
      if (!ok) fails++;
    }
    const noOv = t.scrollW <= t.clientW + 1;
    console.log(`${noOv?'PASS':'FAIL'}  no horizontal overflow   ${t.scrollW}/${t.clientW}`);
    if (!noOv) fails++;
    await p.close();
  }
  console.log('\n' + (fails ? `  ${fails} FAILING` : '  DEGRADATION TESTS PASS — no collapse to the inherited size'));
  await b.close();
})();
