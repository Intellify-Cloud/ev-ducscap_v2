---
layout: page
title: Bond Affordability Calculator
description: "Calculate how much you can afford for your home loan. Determine your bond qualification amount based on income and expenses."
background: white
hero_under_nav: true
hero_image: /assets/img/sections/duces-calculators-hero.jpg
hero_image_alt: "Homebuyer checking home-loan affordability"
hero_title: "Bond Affordability Calculator"
hero_paragraph: "Estimate the home-loan amount you may qualify for based on your income and monthly expenses."
---

{% include calc-hero.html %}
{% include bond-affordability-calculator.html %}

<script src="{{ '/assets/js/bond-affordability-calculator.js' | relative_url }}" defer></script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much can I afford to borrow for a bond?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use our affordability calculator to estimate your qualification amount. Factors include your income, expenses, credit record, and deposit. Banks typically require your monthly bond repayment to be no more than 30% of your gross income."
      }
    },
    {
      "@type": "Question",
      "name": "What is the maximum bond I can get in South Africa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Banks typically allow 3-4 times your annual gross income, but this varies based on your credit score, deposit, and financial profile. Pre-qualification gives you an accurate assessment."
      }
    }
  ]
}
</script>
