import re, json, html, io

faq = open('body_09_faq_cta.html', encoding='utf-8').read()

def text_of(fragment):
    """Visible text of an HTML fragment, exactly as a reader sees it."""
    t = re.sub(r'<[^>]+>', '', fragment)
    t = html.unescape(t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t

rows = re.findall(
    r'<button class="tsa-faq-btn".*?<span>(.*?)</span>.*?'
    r'<div class="tsa-faq-panel-inner">\s*(.*?)\s*</div>',
    faq, re.S)

pairs = [(text_of(q), text_of(a)) for q, a in rows]
assert len(pairs) == 7, f"expected 7 FAQ rows, found {len(pairs)}"
for q, a in pairs:
    assert q and a, "empty FAQ field"

PAGE = "https://twopirconsulting.com/salesforce-for-saas/"

breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home",
     "item": "https://twopirconsulting.com/"},
    {"@type": "ListItem", "position": 2, "name": "Industries",
     "item": "https://twopirconsulting.com/industries/"},
    {"@type": "ListItem", "position": 3, "name": "Salesforce for SaaS & Technology",
     "item": PAGE}
  ]
}

service = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": PAGE + "#service",
  "name": "Salesforce for SaaS and Technology Companies",
  "serviceType": "Salesforce implementation and revenue operations for SaaS and technology companies",
  "provider": {"@id": "https://twopirconsulting.com/#organization"},
  "areaServed": ["US", "CA", "GB", "AE", "AU", "NZ"],
  "audience": {"@type": "Audience", "audienceType": "SaaS and Technology Companies"},
  "description": ("Twopir Consulting builds the Salesforce-based revenue infrastructure that SaaS and "
                  "technology companies run on - connecting product signals, subscription billing and CRM "
                  "into one operating model covering signup, activation, subscription, renewal and expansion."),
  "url": PAGE,
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "SaaS revenue operations services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": n}} for n in [
        "Product-Led Pipeline & Routing",
        "Subscription, CPQ & Billing Operations",
        "Retention, Renewals & Expansion",
        "Revenue Reporting & ARR Visibility",
        "Integration & Revenue Data Architecture",
        "Org Rescue & Scale Support",
      ]
    ]
  }
}

faqpage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": q,
     "acceptedAnswer": {"@type": "Answer", "text": a}}
    for q, a in pairs
  ]
}

def block(obj):
    return ('<script type="application/ld+json">\n'
            + json.dumps(obj, indent=2, ensure_ascii=False)
            + '\n</script>\n')

header = '''
<!-- ============================================================
     STRUCTURED DATA — SALESFORCE FOR SAAS & TECHNOLOGY
     BreadcrumbList + Service + FAQPage.

     • Service.provider points at the homepage Organization node
       (@id …/#organization). Organization is emitted ONCE, from the
       homepage — this page must never emit a second one. Keep the two
       @ids in sync or the provider reference will dangle.
     • No `offers`, price, rating or review appears anywhere below.
       Twopir Consulting sells the service, not Salesforce, Stripe or
       Zuora, and marking up a vendor's product as something offered
       here would misrepresent the page's main content.
     • QAPage is never used. It is only valid where users can submit
       answers, which is not what this section is.
     • FAQPage is a no-harm addition only: Google removed FAQ rich
       results for all sites in May 2026, so this produces no SERP
       snippet. It is kept because the page has a real FAQ section and
       the markup still helps machines parse it.
     • The FAQ block below was GENERATED from the visible accordion by
       scripts/generate_schema.py, so the two match word for word. If
       you edit a question or an answer in the accordion, re-run that
       script rather than editing this block by hand.
     • The URLs assume the /salesforce-for-saas/ permalink and the
       /industries/ parent. Confirm both before publishing.
     ============================================================ -->
'''

out = header + '\n' + block(breadcrumb) + '\n' + block(service) + '\n' + block(faqpage)
open('schema.html', 'w', encoding='utf-8').write(out)
print(f"generated schema for {len(pairs)} FAQ pairs")
for q, _ in pairs:
    print("  Q:", q[:78])
