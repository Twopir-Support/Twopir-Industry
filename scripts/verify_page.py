import re, html, json, sys
s=open('SaaS.html',encoding='utf-8').read()
css=''.join(re.findall(r'<style>(.*?)</style>',s,re.S))
nc=re.sub(r'/\*.*?\*/','',css,flags=re.S)
fails=[]
def chk(name, cond, detail=''):
    print(f"{'PASS' if cond else 'FAIL'}  {name}" + (f"   {detail}" if detail else ''))
    if not cond: fails.append(name)

print("── CSS integrity ─────────────────────────────────────────")
chk("CSS braces balanced", nc.count('{')==nc.count('}'), f"{nc.count('{')}/{nc.count('}')}")
chk("exactly one bare #twopir-saas rule", len(re.findall(r'(?m)^#twopir-saas\s*\{',nc))==1)
chk("zero rem values", not re.findall(r'[:\s(]\d*\.?\d+rem\b', nc))
chk("every var() carries a fallback", not re.findall(r'var\(\s*--tsa-[a-z0-9-]+\s*\)', nc))
chk("overflow-x hidden then clip", re.search(r'overflow-x: hidden;\s*\n\s*overflow-x: clip;', nc) is not None)

print("\n── Autoptimize token-deletion simulation ─────────────────")
declared=set(re.findall(r'(--tsa-[a-z0-9-]+)\s*:',nc)); used=set(re.findall(r'var\(\s*(--tsa-[a-z0-9-]+)',nc))
chk("no undeclared token referenced", not (used-declared), str(sorted(used-declared)))
chk("no unused token declared", not (declared-used), str(sorted(declared-used)))
fs=[v for v in re.findall(r'font-size:\s*([^;}]+)[;}]',nc) if 'var(' in v]
chk("all font-size var() have literal fallbacks",
    all(re.search(r'var\(\s*--tsa-[a-z0-9-]+\s*,',v) for v in fs), f"{len(fs)} declarations")

print("\n── Scoping ───────────────────────────────────────────────")
nomedia=re.sub(r'@media[^{]*\{','',nc)
leaks=[]
for sel in re.findall(r'([^{}]+)\{[^{}]*\}',nomedia):
    for p_ in sel.split(','):
        p_=p_.strip()
        if not p_ or p_.startswith('@') or p_ in ('from','to') or re.match(r'^\d+%$',p_): continue
        if p_.startswith('#twopir-saas') or ':has(#twopir-saas)' in p_ or p_=='html': continue
        leaks.append(p_)
chk("no selector leaks outside the wrapper", not leaks, str(sorted(set(leaks))))
chk("the one global is scroll-behavior only",
    re.findall(r'(?m)^html\s*\{([^}]*)\}',nc)==[' scroll-behavior: auto !important; '])
chk("no bare *, body, p, h2 or .entry-content selectors",
    not re.findall(r'(?m)^\s*(\*|body|p|h[1-6]|\.entry-content)\s*[,{]',nc))

print("\n── Accessibility & structure ─────────────────────────────")
chk("exactly one <h1>", s.count('<h1')==1, str(s.count('<h1')))
order=[int(x) for x in re.findall(r'<h([1-4])[ >]',s)]
skips=[(order[i],order[i+1]) for i in range(len(order)-1) if order[i+1]-order[i]>1]
chk("no heading level skipped", not skips, str(skips))
btns=re.findall(r'<button class="tsa-faq-btn"[^>]*>',s)
chk("FAQ uses real <button>", len(btns)==7, str(len(btns)))
chk("every FAQ button has aria-expanded", all('aria-expanded' in b for b in btns))
chk("every FAQ button has aria-controls", all('aria-controls' in b for b in btns))
ctrl=re.findall(r'aria-controls="(tsa-fp\d)"',s); pans=re.findall(r'<div class="tsa-faq-panel" id="(tsa-fp\d)"',s)
chk("aria-controls targets all exist", set(ctrl)==set(pans) and len(ctrl)==7)
lbl=re.findall(r'aria-labelledby="([\w-]+)"',s); ids=set(re.findall(r'id="([\w-]+)"',s))
chk("every aria-labelledby target exists", all(l in ids for l in lbl),
    str([l for l in lbl if l not in ids]))
chk("prefers-reduced-motion honoured", 'prefers-reduced-motion' in nc)
chk("focus-visible rings present", nc.count(':focus-visible')>=5, f"{nc.count(':focus-visible')} rules")
ah=s.count('aria-hidden="true"')
chk("decorative glyphs marked aria-hidden", ah>40, f"{ah} elements")

print("\n── CLS / performance ─────────────────────────────────────")
imgs=re.findall(r'<img [^>]*>',s)
chk("all <img> carry width+height", all('width=' in i and 'height=' in i for i in imgs), f"{len(imgs)} images")
chk("content-visibility disabled on coarse pointers",
    re.search(r'@media \(hover: none\), \(pointer: coarse\)[^@]*content-visibility: visible',nc,re.S) is not None)
chk("content-visibility excludes the sticky section",
    '.tsa-section:not(:has(.tsa-callout))' in nc)
chk("hero entrance is CSS animation, not the observer",
    'animation-name: tsaFadeIn' in nc and '.tsa-hero .tsa-fade' in nc)
chk("reveal default state is visible without JS",
    '#twopir-saas.tsa-js .tsa-fade {' in nc)

print("\n── Schema ────────────────────────────────────────────────")
blocks=re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S)
objs=[json.loads(b) for b in blocks]
types=[o['@type'] for o in objs]
chk("three JSON-LD blocks, all valid JSON", len(objs)==3, str(types))
chk("no second Organization node", 'Organization' not in json.dumps(types))
chk("no QAPage schema type", 'QAPage' not in json.dumps(objs))
chk("no offers/price/rating on a vendor product",
    not any(k in json.dumps(objs) for k in ('"offers"','"price"','"aggregateRating"','"review"')))
svc=next(o for o in objs if o['@type']=='Service')
chk("Service.provider references the homepage Organization",
    svc['provider']=={'@id':'https://twopirconsulting.com/#organization'})
chk("areaServed matches the canonical set", svc['areaServed']==["US","CA","GB","AE","AU","NZ"])
def text_of(f): return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',f))).strip()
vis=[(text_of(q),text_of(a)) for q,a in re.findall(
    r'<button class="tsa-faq-btn".*?<span>(.*?)</span>.*?<div class="tsa-faq-panel-inner">\s*(.*?)\s*</div>',s,re.S)]
faq=next(o for o in objs if o['@type']=='FAQPage')
sch=[(e['name'],e['acceptedAnswer']['text']) for e in faq['mainEntity']]
chk("FAQ schema matches visible copy word for word", vis==sch,
    "" if vis==sch else f"{sum(1 for a,b in zip(vis,sch) if a!=b)} of {len(vis)} mismatched")

print("\n── Claims & entity governance ────────────────────────────")
canon={'twopir-years':'12+','twopir-clients':'500+','twopir-team':'40+',
       'twopir-deployments':'250+','twopir-retention':'98%','twopir-partnerships':'15+'}
bad=[]
for cls,val in canon.items():
    for m in re.findall(rf'class="[^"]*\b{cls}\b[^"]*"[^>]*>([^<]*)<',s):
        if m.strip()!=val: bad.append((cls,m.strip()))
chk("every .twopir-* fallback matches the canonical value", not bad, str(bad))
chk("no fabricated outcome percentage in page copy",
    not re.findall(r'\b\d{1,3}%\s*(?:increase|reduction|faster|improvement|gain|less|more)',s,re.I))
chk("company name is always 'Twopir Consulting', never 'TwoPir'", 'TwoPir' not in s)
chk("full credentials used outside the stat widget",
    'Salesforce Gold Partner' in s and 'HubSpot Gold Partner' in s)

print("\n"+"="*60)
print(f"  {len(fails)} FAILING CHECK(S)" if fails else "  ALL CHECKS PASS")
for f in fails: print("   -",f)
print("="*60)
sys.exit(1 if fails else 0)
