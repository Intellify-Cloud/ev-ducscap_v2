---
layout: default
title: Property Finance Insights
description: "Straightforward property finance guides and insights from Duces Capital."
permalink: /blog/
background: white
---

{% include navbar.html %}

{% assign blog = site.data.sitetext.blog %}

<main class="blog-page">
  <header class="blog-page__hero">
    <div class="blog-page__container">
      <p class="blog-page__eyebrow">{{ blog.eyebrow }}</p>
      <h1 class="blog-page__title">{{ blog.title }}</h1>
      <p class="blog-page__intro">{{ blog.intro }}</p>
    </div>
  </header>

  <section class="blog-page__library" aria-labelledby="article-library-title">
    <div class="blog-page__container">
      <div class="blog-page__section-heading">
        <p class="blog-page__eyebrow">{{ blog.library_eyebrow }}</p>
        <h2 id="article-library-title">{{ blog.library_title }}</h2>
      </div>

      <div class="blog-page__grid">
        {% for article in site.portfolio reversed %}
          {% assign article_image = article.caption.thumbnail | default: article.image %}
          {% assign article_summary = article.caption.subtitle | default: article.subtitle %}
          <article class="blog-card">
            <a class="blog-card__link" href="{{ article.url | relative_url }}" aria-label="{{ blog.read_more }}: {{ article.title }}">
              <div class="blog-card__media">
                {% if article_image %}
                  <img src="{{ article_image | relative_url }}" alt="{{ article.alt | default: article.title }}" loading="lazy">
                {% else %}
                  <span class="blog-card__monogram" aria-hidden="true">DC</span>
                {% endif %}
              </div>
              <div class="blog-card__body">
                <p class="blog-card__category">{{ blog.card_category }}</p>
                <h3 class="blog-card__title">{{ article.title }}</h3>
                {% if article_summary %}<p class="blog-card__summary">{{ article_summary }}</p>{% endif %}
                <span class="blog-card__cta">{{ blog.read_more }} <span aria-hidden="true">&rarr;</span></span>
              </div>
            </a>
          </article>
        {% endfor %}
      </div>
    </div>
  </section>
</main>
