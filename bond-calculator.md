---
layout: page
title: Bond Repayment Calculator
description: "Calculate your monthly bond repayments. Enter property price and interest rate to estimate your monthly home loan payments."
background: white
hero_under_nav: true
hero_image: /assets/img/sections/duces-hero_3.jpg
hero_image_alt: "Homebuyer calculating monthly bond repayments"
hero_title: "Bond Repayment Calculator"
hero_paragraph: "Estimate your monthly home-loan repayment, total repayable amount, and interest."
---

{% include calc-hero.html %}
{% include bond-repayment-calculator.html %}

<script src="{{ '/assets/js/bond-repayment-calculator.js' | relative_url }}" defer></script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate monthly bond repayments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use our bond repayment calculator. Enter the property purchase price, deposit amount, and interest rate to calculate your monthly home loan payment."
      }
    },
    {
      "@type": "Question",
      "name": "What is the current prime interest rate in South Africa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The prime rate changes based on the South African Reserve Bank repo rate. Banks offer home-loan rates according to the applicant's credit and financial profile."
      }
    }
  ]
}
</script>
