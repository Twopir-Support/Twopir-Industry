"""Regenerate a page's FAQPage JSON-LD from its visible accordion, in place.

    python3 ../scripts/generate_schema.py Fintech.html   # run from "Industry Pages"
    python3 ../scripts/generate_schema.py                # every *.html in the cwd

The visible accordion is the source of truth. Mismatched schema and
on-page text is an AEO risk and verify_page.py fails the build on it, so
edit the accordion and re-run this rather than hand-editing the JSON.

Only the FAQPage block is touched. BreadcrumbList and Service stay
hand-authored — they carry page-specific prose, not derived content.
"""
import re, json, html, sys, glob, os


def text_of(fragment):
    """Visible text of an HTML fragment, exactly as a reader sees it."""
    t = re.sub(r'<[^>]+>', '', fragment)
    t = html.unescape(t)
    return re.sub(r'\s+', ' ', t).strip()


def regenerate(path):
    s = open(path, encoding='utf-8').read()

    m = re.search(r'<div id="twopir-[a-z0-9-]+"', s)
    if not m:
        print(f"skip  {path}: no twopir wrapper"); return 0
    wrapper = m.group(0).split('"')[1]
    pm = re.search(rf'#{wrapper}\s+\.([a-z]{{3}})-', s)
    if not pm:
        print(f"skip  {path}: no class prefix"); return 0
    p = pm.group(1)

    rows = re.findall(
        rf'<button class="{p}-faq-btn".*?<span>(.*?)</span>.*?'
        rf'<div class="{p}-faq-panel-inner">\s*(.*?)\s*</div>',
        s, re.S)
    pairs = [(text_of(q), text_of(a)) for q, a in rows]
    if not pairs:
        print(f"skip  {path}: no FAQ accordion"); return 0
    for q, a in pairs:
        assert q and a, f"{path}: empty FAQ field"

    faqpage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in pairs
        ],
    }
    block = ('<script type="application/ld+json">\n'
             + json.dumps(faqpage, indent=2, ensure_ascii=False)
             + '\n</script>')

    existing = [b for b in re.findall(r'<script type="application/ld\+json">.*?</script>', s, re.S)
                if '"FAQPage"' in b]
    if len(existing) != 1:
        print(f"skip  {path}: expected 1 FAQPage block, found {len(existing)}"); return 0

    if existing[0] == block:
        print(f"ok    {os.path.basename(path)}: {len(pairs)} FAQ pairs already in sync")
        return 0

    open(path, 'w', encoding='utf-8').write(s.replace(existing[0], block))
    print(f"wrote {os.path.basename(path)}: {len(pairs)} FAQ pairs regenerated")
    for q, _ in pairs:
        print("   Q:", q[:76])
    return 1


targets = sys.argv[1:] or sorted(f for f in glob.glob('*.html')
                                 if not os.path.basename(f).startswith('harness'))
for t in targets:
    regenerate(t)
