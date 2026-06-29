---
layout: page
title: Deposit Savings Calculator
description: "Calculate how much you need to save for your home-loan deposit and estimate how long reaching your target may take."
background: white
hero_under_nav: true
permalink: /deposit-savings-calculator/
hero_image: /assets/img/sections/duces-calculators-hero.jpg
hero_image_alt: "Homebuyer planning savings for a property deposit"
hero_title: "Deposit Savings Calculator"
hero_paragraph: "Set a property deposit goal and build a practical monthly savings timeline."
---

{% include calc-hero.html %}
{% include deposit-savings-calculator.html %}

<script src="{{ '/assets/js/deposit-savings-calculator.js' | relative_url }}" defer></script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much deposit do I need for a home loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The required deposit depends on the property, lender and applicant profile. A larger deposit can reduce the amount borrowed and improve the strength of an application."
      }
    },
    {
      "@type": "Question",
      "name": "How long will it take to save for a house deposit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The timeline depends on your target deposit, current savings, monthly contributions and the return earned on those savings."
      }
    }
  ]
}
</script>
