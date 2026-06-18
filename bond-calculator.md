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

<section class="three-calculators-section page-section" id="bond-repayment-calculator">
  <div class="three-calculators-page">
    <header class="three-calculators-header">
      <div class="three-calculators-header__eyebrow">Calculator</div>
      <h2 class="three-calculators-header__title">Calculate your bond repayment</h2>
      <p class="three-calculators-header__sub">
        Enter the property price, deposit, interest rate, and loan term to estimate your repayment.
      </p>
    </header>

    <div class="mb-calc">
      <div class="mb-calc__fields">
        <div class="mb-calc-field mb-calc-field--full">
          <label class="mb-calc-field__label" for="mb-r-price">Purchase price <span class="mb-calc-field__req">*</span></label>
          <div class="mb-calc-field__input-wrap">
            <span class="mb-calc-field__prefix">R</span>
            <input class="mb-calc-field__input" type="text" inputmode="numeric" id="mb-r-price" placeholder="0" data-currency-input>
          </div>
        </div>

        <div class="mb-calc-field">
          <label class="mb-calc-field__label" for="mb-r-deposit">Deposit</label>
          <div class="mb-calc-field__input-wrap">
            <span class="mb-calc-field__prefix">R</span>
            <input class="mb-calc-field__input" type="text" inputmode="numeric" id="mb-r-deposit" placeholder="0" data-currency-input>
          </div>
        </div>

        <div class="mb-calc-field">
          <label class="mb-calc-field__label" for="mb-r-rate">Interest rate <span class="mb-calc-field__req">*</span></label>
          <div class="mb-calc-field__input-wrap">
            <input class="mb-calc-field__input mb-calc-field__input--no-prefix" type="number" id="mb-r-rate" value="10.5" min="0" max="30" step="0.25">
            <span class="mb-calc-field__suffix">%</span>
          </div>
        </div>

        <div class="mb-calc-field mb-calc-field--full">
          <label class="mb-calc-field__label" for="mb-r-years">Loan term <span class="mb-calc-field__req">*</span></label>
          <div class="mb-calc-field__slider-wrap">
            <input class="mb-calc-field__slider" type="range" id="mb-r-years" min="5" max="30" step="5" value="20">
            <div class="mb-calc-field__slider-ticks" data-mb-repayment-ticks>
              <span>5 yrs</span>
              <span>10 yrs</span>
              <span>15 yrs</span>
              <span>20 yrs</span>
              <span>25 yrs</span>
              <span>30 yrs</span>
            </div>
          </div>
        </div>

        <button class="mb-calc-btn" type="button" id="mb-r-calc-btn">Calculate repayment</button>
      </div>

      <aside class="mb-calc-result" aria-live="polite">
        <div class="mb-calc-result__inner">
          <div class="mb-calc-result__tag">Results</div>
          <div class="mb-calc-result-item mb-calc-result-item--hero">
            <span class="mb-calc-result-item__label">Monthly repayment</span>
            <span class="mb-calc-result-item__value" id="mb-r-monthly">R 0</span>
          </div>
          <div class="mb-calc-result-divider"></div>
          <div class="mb-calc-result-item">
            <span class="mb-calc-result-item__label">Loan amount</span>
            <span class="mb-calc-result-item__value mb-calc-result-item__value--sm" id="mb-r-principal">R 0</span>
          </div>
          <div class="mb-calc-result-item">
            <span class="mb-calc-result-item__label">Total repayable</span>
            <span class="mb-calc-result-item__value mb-calc-result-item__value--sm" id="mb-r-total">R 0</span>
          </div>
          <div class="mb-calc-result-item">
            <span class="mb-calc-result-item__label">Total interest</span>
            <span class="mb-calc-result-item__value mb-calc-result-item__value--sm mb-calc-result-item__value--accent" id="mb-r-interest">R 0</span>
          </div>
          <p class="mb-calc-result__terms">This is an estimate only. Final affordability and bond approval are subject to bank assessment.</p>
        </div>
      </aside>
    </div>
  </div>
</section>

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
        "text": "The prime rate changes monthly based on the Reserve Bank repo rate. Banks typically offer home loan rates from prime minus 0.5% up to prime plus 2% depending on your credit profile."
      }
    }
  ]
}
</script>
