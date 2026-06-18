---
layout: page
title: Transfer Cost Calculator
description: "Calculate registration and transfer costs for South African property transactions. Estimate legal fees, transfer duties, and bond costs."
background: white
hero_under_nav: true
hero_image: /assets/img/sections/duces-hero_3.jpg
hero_image_alt: "Homebuyer planning property transfer costs"
hero_title: "Transfer Cost Calculator"
hero_paragraph: "Calculate your estimated bond registration and property transfer costs before you buy."
---

{% include calc-hero.html %}
{% include transfer-cost-calculator.html %}
{% include transfer-cost-guide.html %}

<script src="{{ '/assets/js/transfer-cost-calculator.js' | relative_url }}" defer></script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are transfer costs when buying property in South Africa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Transfer costs are the once-off tax, legal and registration expenses needed to move a property into the buyer's name. They can include transfer duty, transfer attorney fees, deeds-office charges and bond registration costs."
      }
    },
    {
      "@type": "Question",
      "name": "Are transfer costs part of my deposit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. A deposit reduces the amount borrowed for the property. Transfer costs are separate once-off expenses unless a bank specifically agrees to finance some of them."
      }
    },
    {
      "@type": "Question",
      "name": "Do I pay transfer duty on every home?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Under the rates effective from 1 April 2026, no transfer duty is charged on a property valued at R1.21 million or less. Other legal and registration costs may still apply."
      }
    },
    {
      "@type": "Question",
      "name": "Who pays transfer duty to SARS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The buyer is responsible for the transfer duty, but the conveyancer normally submits the declaration and pays SARS electronically on the buyer's behalf."
      }
    },
    {
      "@type": "Question",
      "name": "Can VAT and transfer duty apply to the same property sale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A property sale is generally subject to either VAT or transfer duty, not both. A conveyancer should confirm which treatment applies to the transaction."
      }
    }
  ]
}
</script>
