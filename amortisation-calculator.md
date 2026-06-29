---
layout: page
title: Amortisation Calculator
description: "Calculate how your bond repayments are split between principal and interest over the life of your home loan."
background: white
hero_under_nav: true
permalink: /amortisation-calculator/
hero_image: /assets/img/sections/duces-calculators-hero.jpg
hero_image_alt: "Homebuyer reviewing a bond repayment schedule"
hero_title: "Amortisation Calculator"
hero_paragraph: "See how your monthly repayment reduces your balance and pays interest over time."
---

{% include calc-hero.html %}
{% include amortisation-calculator.html %}

<script src="{{ '/assets/js/amortisation-calculator.js' | relative_url }}" defer></script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is bond amortisation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bond amortisation shows how each payment is split between interest and principal. Early payments are mostly interest, with more principal being paid down over time."
      }
    },
    {
      "@type": "Question",
      "name": "What does an amortisation schedule show?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An amortisation schedule shows the opening loan balance, principal repaid, interest charged and closing balance for each period."
      }
    }
  ]
}
</script>
