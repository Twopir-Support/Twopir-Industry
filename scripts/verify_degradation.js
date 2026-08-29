/* Renders a page with its stylesheet deliberately broken and checks that
 * nothing collapses to the inherited size.
 *
 *   node ../scripts/verify_degradation.js Fintech.html   # from "Industry Pages"
 *
 * Two failure modes, both observed on the live site:
 *   no-tail    — the trailing !important alignment pass is dropped, so each
 *                base rule's own size has to stand on its own.
 *   no-tokens  — Autoptimize merges the duplicate #twopir-* selectors and
 *                drops the token rule, leaving every var(--*-fs-*) with no
 *                declaration behind it. An unresolvable var() is invalid at
 *                computed-value time, and for font-size that means INHERIT:
 *                the H1 falls back to the wrapper size and the page reads as
 *                one flat block. Every var() carrying a literal fallback is
 *                what this simulates the loss of.
 *
 * The assertion is deliberately not "the size is exactly N". It is "this
 * role is still visibly distinct from the wrapper's inherited size" — that
 * is the property that actually failed in production.
 */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const ROLES = ['hero-title', 'title', 'pain-item h3', 'svc-card h3', 'step h3', 'int-name'];

function detect(s) {
  const w = s.match(/<div id="(twopir-[a-z0-9-]+)"/);
  if (!w) return null;
  const p = s.match(new RegExp(`#${w[1]}\\s+\\.([a-z]{3})-`));
  return p ? { wrapper: w[1], p: p[1] } : null;
}

function write(name, body) {
  const out = path.resolve(name);
  fs.writeFileSync(out,
`<!doctype html><html><head><meta charset="utf-8">
<style>html { font-size: 10px; } body { margin: 0; font-family: Inter, sans-serif; }</style>
</head><body>\n${body}\n</body></html>`);
  return 'file://' + out;
}

(async () => {
  const targets = process.argv.slice(2).length
    ? process.argv.slice(2)
    : fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('harness')).sort();

  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  let fails = 0;

  for (const file of targets) {
    const src = fs.readFileSync(file, 'utf-8');
    const d = detect(src);
    if (!d) { console.log(`skip  ${file}`); continue; }
    const { wrapper, p } = d;
    console.log(`\n${'='.repeat(62)}\n  ${file}   #${wrapper} · .${p}-\n${'='.repeat(62)}`);

    const styles = [...src.matchAll(/<style>[\s\S]*?<\/style>/g)].map(m => m[0]);
    // no-tail: drop every style block after the first (the alignment passes)
    const noTail = styles.slice(1).reduce((acc, blk) => acc.replace(blk, ''), src);
    // no-tokens: delete the single token rule, exactly as the minifier did
    const noTokens = src.replace(new RegExp(`#${wrapper} \\{\\n  --${p}-bg:[\\s\\S]*?\\n\\}\\n`), '');

    for (const [name, body] of [['harness-no-tail.html', noTail], ['harness-no-tokens.html', noTokens]]) {
      const url = write(name, body);
      const ctx = await b.newContext({ viewport: { width: 1400, height: 900 } });
      await ctx.route('**/*', r => (/^https?:\/\//.test(r.request().url()) ? r.abort() : r.continue()));
      const pg = await ctx.newPage();
      await pg.goto(url, { waitUntil: 'domcontentloaded' });
      await pg.waitForTimeout(900);
      const t = await pg.evaluate(({ wrapper, p, roles }) => {
        const out = { roles: {} };
        roles.forEach(k => {
          const el = document.querySelector(`.${p}-${k}`);
          out.roles[k] = el ? parseFloat(getComputedStyle(el).fontSize) : null;
        });
        out.wrapper = parseFloat(getComputedStyle(document.getElementById(wrapper)).fontSize);
        out.scrollW = document.documentElement.scrollWidth;
        out.clientW = document.documentElement.clientWidth;
        return out;
      }, { wrapper, p, roles: ROLES });

      console.log(`\n── ${name}   (wrapper resolves to ${t.wrapper}px) ──`);
      for (const k of ROLES) {
        const v = t.roles[k];
        if (v === null) { console.log(`n/a   ${k.padEnd(14)} not on this page`); continue; }
        const ok = Math.abs(v - t.wrapper) > 0.5;
        console.log(`${ok ? 'PASS' : 'FAIL'}  ${k.padEnd(14)} ${v}px  (must differ from the inherited ${t.wrapper}px)`);
        if (!ok) fails++;
      }
      const noOv = t.scrollW <= t.clientW + 1;
      console.log(`${noOv ? 'PASS' : 'FAIL'}  no horizontal overflow   ${t.scrollW}/${t.clientW}`);
      if (!noOv) fails++;
      await ctx.close();
    }
  }

  console.log('\n' + (fails ? `  ${fails} FAILING` : '  DEGRADATION TESTS PASS — no collapse to the inherited size'));
  await b.close();
  process.exit(fails ? 1 : 0);
})();
