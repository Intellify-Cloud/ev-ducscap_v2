---
layout: page
title: Contact Duces Capital
description: "Contact Duces Capital for expert property finance guidance. Apply for a home loan, bond origination, or speak to a specialist about your property finance needs."
background: muted
---

{% include contact.html %}

{% if site.data.sitetext.contact.faq %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {% for item in site.data.sitetext.contact.faq %}
    {
      "@type": "Question",
      "name": {{ item.question | jsonify }},
      "acceptedAnswer": {
        "@type": "Answer",
        "text": {{ item.answer | jsonify }}
      }
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>
{% endif %}
