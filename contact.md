---
layout: page
title: Contact Duces Capital
description: "Contact Duces Capital for expert property finance guidance. Apply for a home loan, bond origination, or speak to a specialist about your property finance needs."
background: muted
---

<div id="contact" class="contact-page">
  <div class="row">
    <div class="col-lg-12 text-center">
      <h1 class="section-heading text-uppercase">{{ site.data.sitetext.contact.page_title | default: site.data.sitetext.contact.title }}</h1>
      <p class="section-subheading text-muted">{{ site.data.sitetext.contact.text }}</p>
    </div>
  </div>

  <div class="contact-inner">
    <aside class="contact-details-card" aria-label="{{ site.data.sitetext.contact.details_label | default: 'Contact details' }}">
      <div class="contact-details-header">
        <i class="far fa-address-card contact-details-icon" aria-hidden="true"></i>
        <h2 class="contact-details-title">{{ site.data.sitetext.contact.details_title }}</h2>
      </div>

      <div class="contact-methods">
        {% for method in site.data.sitetext.contact.methods %}
        <a class="contact-method" href="{{ method.url }}" {% if method.url contains 'http' %}target="_blank" rel="noopener"{% endif %}>
          <span class="contact-method-icon">
            <i class="{{ method.icon }}" aria-hidden="true"></i>
          </span>
          <span>
            <strong>{{ method.title }}</strong>
            <span>{{ method.text }}</span>
          </span>
        </a>
        {% endfor %}
      </div>
      <p class="contact-details-note">{{ site.data.sitetext.contact.note }}</p>
    </aside>

    <aside class="team-hours-card contact-hours-card" aria-label="{{ site.data.sitetext.contact.hours_label | default: 'Office hours' }}">
      <div class="team-hours-header">
        <i class="far fa-clock team-hours-icon" aria-hidden="true"></i>
        <h2 class="team-hours-title">{{ site.data.sitetext.team.hours.title | default: "Office Hours" }}</h2>
      </div>

      <div class="team-hours-list">
        {% for item in site.data.sitetext.team.hours.list %}
        <p>{{ item }}</p>
        {% endfor %}
      </div>

      {% if site.data.sitetext.team.hours.note %}
      <div class="contact-hours-note">
        <i class="fas fa-info-circle" aria-hidden="true"></i>
        <span>{{ site.data.sitetext.team.hours.note }}</span>
      </div>
      {% endif %}
    </aside>
  </div>
</div>

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
