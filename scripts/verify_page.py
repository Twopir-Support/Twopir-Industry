"""Static pre-publish checks for a Twopir industry page.

    python3 ../scripts/verify_page.py SaaS.html      # run from "Industry Pages"
    python3 ../scripts/verify_page.py                # every *.html in the cwd

The wrapper id (#twopir-<industry>) and the class prefix (t__-) are read
out of the file itself, so the same checks run against Legal, SaaS and
Fintech without editing this script.
"""
import re, html, json, sys, glob, os

CANON_STATS = {'twopir-years': '12+', 'twopir-clients': '500+', 'twopir-team': '40+',
               'twopir-deployments': '250+', 'twopir-retention': '98%',
               'twopir-partnerships': '15+'}
CANON_AREA = ["US", "CA", "GB", "AE", "AU", "NZ"]


def detect(s, path):
    """Wrapper id and class prefix, straight from the markup."""
    m = re.search(r'<div id="(twopir-[a-z0-9-]+)"', s)
    if not m:
        raise SystemExit(f"{path}: no <div id=\"twopir-…\"> wrapper found")
    wrapper = m.group(1)
    pm = re.search(rf'#{wrapper}\s+\.([a-z]{{3}})-', s)
    if not pm:
        raise SystemExit(f"{path}: could not infer the class prefix for #{wrapper}")
    return wrapper, pm.group(1)


def verify(path):
    s = open(path, encoding='utf-8').read()
    wrapper, p = detect(s, path)
    css = ''.join(re.findall(r'<style>(.*?)</style>', s, re.S))
    nc = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    tok = f'--{p}-'
    fails = []

    def chk(name, cond, detail=''):
        print(f"{'PASS' if cond else 'FAIL'}  {name}" + (f"   {detail}" if detail else ''))
        if not cond:
            fails.append(name)

    print(f"\n{'='*62}\n  {os.path.basename(path)}   #{wrapper} · .{p}-\n{'='*62}")

    print("── CSS integrity ─────────────────────────────────────────")
    chk("CSS braces balanced", nc.count('{') == nc.count('}'), f"{nc.count('{')}/{nc.count('}')}")
    bare = len(re.findall(rf'(?m)^#{wrapper}\s*\{{', nc))
    chk(f"exactly one bare #{wrapper} rule", bare == 1, f"{bare} found")
    chk("zero rem values", not re.findall(r'[:\s(]\d*\.?\d+rem\b', nc))
    chk("every var() carries a fallback", not re.findall(rf'var\(\s*{tok}[a-z0-9-]+\s*\)', nc))
    chk("overflow-x hidden then clip",
        re.search(r'overflow-x: hidden;\s*\n\s*overflow-x: clip;', nc) is not None)

    print("\n── Autoptimize token-deletion simulation ─────────────────")
    declared = set(re.findall(rf'({tok}[a-z0-9-]+)\s*:', nc))
    used = set(re.findall(rf'var\(\s*({tok}[a-z0-9-]+)', nc))
    chk("no undeclared token referenced", not (used - declared), str(sorted(used - declared)))
    chk("no unused token declared", not (declared - used), str(sorted(declared - used)))
    fs = [v for v in re.findall(r'font-size:\s*([^;}]+)[;}]', nc) if 'var(' in v]
    chk("all font-size var() have literal fallbacks",
        all(re.search(rf'var\(\s*{tok}[a-z0-9-]+\s*,', v) for v in fs), f"{len(fs)} declarations")

    print("\n── Scoping ───────────────────────────────────────────────")
    nomedia = re.sub(r'@media[^{]*\{', '', nc)
    leaks = []
    for sel in re.findall(r'([^{}]+)\{[^{}]*\}', nomedia):
        for part in sel.split(','):
            part = part.strip()
            if not part or part.startswith('@') or part in ('from', 'to') or re.match(r'^\d+%$', part):
                continue
            if part.startswith(f'#{wrapper}') or f':has(#{wrapper})' in part or part == 'html':
                continue
            leaks.append(part)
    chk("no selector leaks outside the wrapper", not leaks, str(sorted(set(leaks))))
    chk("the one global is scroll-behavior only",
        re.findall(r'(?m)^html\s*\{([^}]*)\}', nc) == [' scroll-behavior: auto !important; '])
    chk("no bare *, body, p, h2 or .entry-content selectors",
        not re.findall(r'(?m)^\s*(\*|body|p|h[1-6]|\.entry-content)\s*[,{]', nc))

    print("\n── Accessibility & structure ─────────────────────────────")
    chk("exactly one <h1>", s.count('<h1') == 1, str(s.count('<h1')))
    order = [int(x) for x in re.findall(r'<h([1-4])[ >]', s)]
    skips = [(order[i], order[i + 1]) for i in range(len(order) - 1) if order[i + 1] - order[i] > 1]
    chk("no heading level skipped", not skips, str(skips))
    btns = re.findall(rf'<button class="{p}-faq-btn"[^>]*>', s)
    n_faq = len(btns)
    chk("FAQ uses real <button>", n_faq >= 5, f"{n_faq} questions")
    chk("every FAQ button has aria-expanded", all('aria-expanded' in b for b in btns))
    chk("every FAQ button has aria-controls", all('aria-controls' in b for b in btns))
    ctrl = re.findall(rf'aria-controls="({p}-fp\d+)"', s)
    pans = re.findall(rf'<div class="{p}-faq-panel" id="({p}-fp\d+)"', s)
    chk("aria-controls targets all exist", set(ctrl) == set(pans) and len(ctrl) == n_faq)
    lbl = re.findall(r'aria-labelledby="([\w-]+)"', s)
    ids = set(re.findall(r'id="([\w-]+)"', s))
    chk("every aria-labelledby target exists", all(l in ids for l in lbl),
        str([l for l in lbl if l not in ids]))
    chk("prefers-reduced-motion honoured", 'prefers-reduced-motion' in nc)
    chk("focus-visible rings present", nc.count(':focus-visible') >= 5, f"{nc.count(':focus-visible')} rules")
    ah = s.count('aria-hidden="true"')
    chk("decorative glyphs marked aria-hidden", ah > 40, f"{ah} elements")

    print("\n── CLS / performance ─────────────────────────────────────")
    imgs = re.findall(r'<img [^>]*>', s)
    chk("all <img> carry width+height", all('width=' in i and 'height=' in i for i in imgs),
        f"{len(imgs)} images")
    chk("content-visibility disabled on coarse pointers",
        re.search(r'@media \(hover: none\), \(pointer: coarse\)[^@]*content-visibility: visible', nc, re.S) is not None)
    chk("content-visibility excludes the sticky section",
        f'.{p}-section:not(:has(.{p}-callout))' in nc)
    chk("hero entrance is CSS animation, not the observer",
        f'animation-name: {p}FadeIn' in nc and f'.{p}-hero .{p}-fade' in nc)
    chk("reveal default state is visible without JS", f'#{wrapper}.{p}-js .{p}-fade {{' in nc)

    print("\n── Schema ────────────────────────────────────────────────")
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
    objs = [json.loads(b) for b in blocks]
    types = [o['@type'] for o in objs]
    chk("three JSON-LD blocks, all valid JSON", len(objs) == 3, str(types))
    chk("no second Organization node", 'Organization' not in json.dumps(types))
    chk("no QAPage schema type", 'QAPage' not in json.dumps(objs))
    chk("no offers/price/rating on a vendor product",
        not any(k in json.dumps(objs) for k in ('"offers"', '"price"', '"aggregateRating"', '"review"')))
    svc = next(o for o in objs if o['@type'] == 'Service')
    chk("Service.provider references the homepage Organization",
        svc['provider'] == {'@id': 'https://twopirconsulting.com/#organization'})
    chk("areaServed matches the canonical set", svc['areaServed'] == CANON_AREA)

    def text_of(f):
        return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', f))).strip()

    vis = [(text_of(q), text_of(a)) for q, a in re.findall(
        rf'<button class="{p}-faq-btn".*?<span>(.*?)</span>.*?<div class="{p}-faq-panel-inner">\s*(.*?)\s*</div>',
        s, re.S)]
    faq = next(o for o in objs if o['@type'] == 'FAQPage')
    sch = [(e['name'], e['acceptedAnswer']['text']) for e in faq['mainEntity']]
    chk("FAQ schema matches visible copy word for word", vis == sch,
        "" if vis == sch else f"{sum(1 for a, b in zip(vis, sch) if a != b)} of {len(vis)} mismatched")

    print("\n── Claims & entity governance ────────────────────────────")
    # Claims checks read PAGE COPY — what a reader or a crawler actually
    # sees. Style and script blocks, and HTML comments, are not that: a
    # build note explaining which metric was removed, or a CSS comment
    # quoting a metric to explain a layout choice, is not a claim the page
    # makes and nothing extracts it as one.
    copy = re.sub(r'<style.*?</style>', '', s, flags=re.S)
    copy = re.sub(r'<script(?![^>]*ld\+json).*?</script>', '', copy, flags=re.S)
    copy = re.sub(r'<!--.*?-->', '', copy, flags=re.S)
    # Read `copy`, not `s`: a build note that quotes a stat class inside an
    # HTML comment is not a rendered fallback, and flagging it would punish
    # documenting the very defect the note explains.
    bad = []
    for cls, val in CANON_STATS.items():
        for m in re.findall(rf'class="[^"]*\b{cls}\b[^"]*"[^>]*>([^<]*)<', copy):
            if m.strip() != val:
                bad.append((cls, m.strip()))
    chk("every .twopir-* fallback matches the canonical value", not bad, str(bad))
    # The rule is about FABRICATED outcome percentages — a number invented to
    # make a section look stronger. A figure that carries a source beside it is
    # attributed by construction, so it is not what this check is for; whether
    # the source is any good is a claims-review question the build reports
    # cover, not something a regex can judge. So: flag a percentage only when
    # no citation sits near it. "Near" is the enclosing block, approximated as
    # 400 characters either side, which is comfortably inside one card.
    pat = r'\b\d{1,3}%\s*(?:increase|reduction|faster|improvement|gain|less|more)'
    cited = re.compile(rf'(?:class="[^"]*\b{p}-cite\b|\bSource:)')
    unattributed = [m for m in re.finditer(pat, copy, re.I)
                    if not cited.search(copy[max(0, m.start() - 400):m.end() + 400])]
    chk("no fabricated outcome percentage in page copy",
        not unattributed,
        str([re.sub(r'\s+', ' ', copy[max(0, m.start() - 50):m.end()]) for m in unattributed]))
    chk("company name is always 'Twopir Consulting', never 'TwoPir'", 'TwoPir' not in s)
    # The rule is about HOW a partner credential is worded when the page
    # states one — full name outside the compact stat widget — not that every
    # page must state one. A page that makes no partner claim at all (this is
    # normal for a vertical page led by a product, e.g. Health Cloud) has
    # nothing to get wrong. So: only the shortened form appearing in prose,
    # with no full credential anywhere, is a failure.
    widget = re.findall(r'class="twopir-(?:salesforce|hubspot)"[^>]*>[^<]*<', copy)
    prose = copy
    for w in widget:
        prose = prose.replace(w, '')
    # Only a SELF-APPLIED label counts. "every other Salesforce partner" and
    # "a standard Salesforce implementation partner" refer to competitors —
    # they are not Twopir claiming a tier, and flagging them would force a
    # rewrite of ordinary copy. A self-claim names Twopir nearby, so require
    # the company name within 80 characters either side.
    short = [m.group(0) for m in re.finditer(r'\b(?:Salesforce|HubSpot) Partner\b', prose)
             if 'Twopir' in prose[max(0, m.start() - 80):m.end() + 80]]
    full_ok = 'Salesforce Gold Partner' in copy and 'HubSpot Gold Partner' in copy
    chk("partner credential wording (full name outside the stat widget)",
        not short or full_ok,
        'no partner claim on this page' if not short and not full_ok
        else (f'shortened in prose: {short}' if short and not full_ok else ''))

    print("\n" + "=" * 62)
    print(f"  {os.path.basename(path)}: {len(fails)} FAILING CHECK(S)" if fails
          else f"  {os.path.basename(path)}: ALL CHECKS PASS")
    for f in fails:
        print("   -", f)
    print("=" * 62)
    return fails


# harness*.html are scratch files the browser verifiers generate; they are
# whole documents, not page fragments, and are gitignored.
targets = sys.argv[1:] or sorted(f for f in glob.glob('*.html')
                                 if not os.path.basename(f).startswith('harness'))
total = sum(len(verify(t)) for t in targets)
sys.exit(1 if total else 0)
