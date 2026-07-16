# SEO Audit — Duces Capital (ducescapital.co.za)

**Site type:** Jekyll static site (South African bond origination / property finance)
**Audit date:** 2026-07-16
**Scope:** Technical SEO, on-page SEO, structured data, content, performance/Core Web Vitals, measurement.

Findings are graded **P1 (fix first / high impact)**, **P2 (should fix)**, **P3 (nice to have / polish)**.
Line references point at the source templates, not the generated `_site/` output.

---

## Executive summary

The site has a **solid technical SEO foundation** — clean per-page titles/descriptions, canonical tags, Open Graph + Twitter cards, a valid `jekyll-sitemap`, `robots.txt`, `lang="en-ZA"`, exactly one `<h1>` per page, and image `alt` text throughout. Article content is genuinely good (FAQ-style, keyword-aligned to SA search intent).

The biggest gaps are **(1) no analytics/measurement installed**, **(2) structured-data left on the table** (no Article/FAQ/Breadcrumb/AggregateRating schema despite content that is perfect for it), **(3) a weak homepage H1**, and **(4) untuned image/LCP performance** that will hurt Core Web Vitals. None of these are structural — they're additive wins.

| Area | Status |
|------|--------|
| Crawlability / indexing | 🟢 Good |
| Titles & meta descriptions | 🟢 Good |
| Structured data | 🟡 Under-used |
| On-page (headings/content) | 🟡 One weak H1, thin internal linking |
| Performance / CWV | 🟡 LCP & CLS not tuned |
| Analytics / measurement | 🔴 Missing |
| Social / Open Graph | 🟢 Present, minor polish |

---

## 1. Measurement & analytics

### P1 — No analytics or tag manager is installed
`_includes/head.html:1-3` contains only a commented-out Google tag placeholder. The generated pages contain **no** `gtag.js`, GA4, or GTM. There is currently **no way to measure organic traffic, conversions, or which content ranks/converts.**
- Install GA4 (or GTM) in `head.html`. Track key conversions: Apply Now clicks, WhatsApp clicks, calculator usage, contact form submits.
- Google Search Console is already verified (`google4f22d1bb559c3def.html`) — **link GSC to GA4** and confirm the sitemap is submitted in GSC.

### P2 — No conversion/event tracking on primary CTAs
The site's whole purpose is lead-gen (Apply Now, "Talk to an Advisor", WhatsApp `27786680551`). Without event tracking you can't optimise for SEO ROI. Add event tracking once GA4/GTM is in.

---

## 2. Structured data (schema.org)

The only structured data is a site-wide `FinancialService` block (`head.html:39-65`) rendered on **every** page. Good start, but several high-value schema types are missing.

### P1 — No `Article` / `BlogPosting` schema on blog posts
The three `_portfolio/*.md` articles output no article schema. Add `BlogPosting` (headline, description, image, author, `datePublished`, `dateModified`, publisher, `mainEntityOfPage`) to `_layouts/article.html`. Requires adding `date`/`last_modified` to article front matter (see §4).

### P1 — No `FAQPage` schema despite FAQ-rich content
`how-much-home-loan-can-i-qualify-for-south-africa.md` (and others) are structured as literal Q&A sections — ideal for FAQ rich results. There is even an abandoned `archive/seo/home-faq-schema.html`. Emit `FAQPage` JSON-LD from the article Q&A (and/or the homepage). This is one of the highest-ROI, lowest-effort wins here.

### P2 — `FinancialService` block can be strengthened
In `head.html:39-65`:
- `alternateName` is empty — remove or fill.
- Add `sameAs` with the social profiles already in the data file (`_data/sitetext.yml`: Instagram `instagram.com/ducescapital`, TikTok `tiktok.com/@ducescapital`).
- Add `geo` (lat/long), `openingHours`, `priceRange` (e.g. `"Free"` — service is no-cost), and `areaServed` as a country object.
- The `provider` → Organization nesting is unusual for a `FinancialService`; consider a top-level `Organization`/`LocalBusiness` node instead, or `parentOrganization`.
- Consider splitting: a single site-wide `Organization`/`LocalBusiness` node in `head.html`, plus page-specific schema (Article/FAQ/Breadcrumb) per template.

### P2 — No `BreadcrumbList` schema
Add breadcrumbs (Home › Blog › Article, Home › Calculators › X) as JSON-LD for breadcrumb rich results and clearer site hierarchy.

### P3 — No `AggregateRating` / `Review` schema
The site advertises "1000+ Successful Approvals", "100% Client Satisfaction" and has a testimonials section (`_data/testimonials.yml`). If these map to genuine, verifiable reviews, `AggregateRating`/`Review` can earn star rich results. **Only add if defensible** — fabricated ratings violate Google's policies.

### P3 — Calculator pages could use `WebApplication` / `HowTo` schema
Minor; the calculator tools could be marked up as `WebApplication` or `SoftwareApplication`.

---

## 3. On-page SEO

### P1 — Homepage H1 is weak and keyword-poor
`_data/sitetext.yml` → `header.title: "HOW MUCH DO YOU QUALIFY FOR?"` renders as the homepage `<h1>` (`_includes/hero.html:11-13`). It contains **no** primary keyword, brand, service, or location. The homepage front matter title ("Home Loans & Bond Origination South Africa") is strong — the H1 should echo that intent.
- Rework to something like *"Home Loans & Bond Origination in South Africa"* with the current question as a supporting subtitle.
- Note `header.text` is empty (`""`) — the hero subtitle is blank; add supporting copy with secondary keywords.

### P2 — Thin internal linking between content
- Articles only link back to `/blog/` (`_layouts/article.html:10, 21-23`). Add contextual cross-links: article → related article, article → relevant calculator, article → Apply Now.
- Consider related-posts on article pages and links from calculator pages into the guides. Internal linking spreads authority and improves crawl/dwell.

### P2 — Titles & descriptions: verify length and uniqueness
Templating is good (`head.html:8-15`, per-page `title`/`description` with site fallback). Spot-check every page's rendered `<title>` (aim ≤ ~60 chars incl. `| Duces Capital`) and meta description (~140–160 chars). All audited pages have a `description` in front matter — keep that discipline for any new page.

### P3 — `<meta name="title">` is non-standard
`head.html:14` outputs `<meta name="title">`, which search engines ignore (the `<title>` tag is what matters, and it's correctly present at line 67). Harmless but redundant.

---

## 4. Content & articles

### P2 — Articles have no publish/modified dates
`_portfolio/*.md` front matter has no `date` or `last_modified`. As a result the sitemap `lastmod` for articles reflects build time, and no visible/structured freshness signal exists. Add `date:` (and update `last_modified:` on edits) — feeds both `BlogPosting` schema and sitemap freshness.

### P3 — Only three articles; expand the topic cluster
Content quality is high and well-targeted to SA queries ("how much home loan can I qualify for", "bond originator vs bank", "how interest rates affect repayments"). Build out the cluster: first-time buyer guides, deposit/transfer-cost explainers, self-employed home loans, refinancing/switching bonds — each interlinked and mapped to a calculator. `articles-outlines.md` exists but is empty; use it to plan.

### P3 — Match article topics to calculators
Each calculator (affordability, bond, transfer cost, extra repayment, deposit savings) deserves a supporting guide that links to it and vice-versa — strong intent-to-tool journeys that rank.

---

## 5. Performance / Core Web Vitals

### P1 — LCP hero image is not prioritised
The hero image (`_includes/hero.html:3-5`) is almost certainly the LCP element but is **not preloaded** and has **no `fetchpriority="high"`**. Add `fetchpriority="high"` to the hero `<img>` and/or a `<link rel="preload" as="image">` in `head.html`. Ensure the hero image is **not** lazy-loaded.

### P2 — Missing `width`/`height` on images (CLS risk)
Only 2 of ~18 images in `_includes` declare dimensions. Missing intrinsic dimensions cause layout shift. Add explicit `width`/`height` (or CSS `aspect-ratio`) to all content images.

### P2 — Serve next-gen image formats & responsive sizes
Images are JP/PNG (e.g. `social_916x509.jpg` is 135 KB, `duces-home-hero.jpg`). Provide WebP/AVIF and `srcset`/`sizes` for responsive delivery. Confirm hero and portfolio thumbnails are compressed.

### P2 — Render-blocking web fonts
`head.html:73-75` loads 4 Google Font families with many weights. `preconnect` is present (good), but audit which weights are actually used and trim; consider `font-display: swap` (the URL already has `&display=swap` ✅) and self-hosting to remove the third-party round-trip.

### P3 — Cache-busting via `?v={{ site.time }}`
`head.html:68-77` versions CSS/JS by build time, so every deploy busts cache for all assets. Fine for a small site; consider content-hash busting if asset caching becomes a concern.

### P3 — Run a Lighthouse / PageSpeed pass
After the above, measure LCP/CLS/INP on mobile with PageSpeed Insights and iterate against real numbers.

---

## 6. Social / Open Graph

Open Graph and Twitter tags are present and templated (`head.html:22-33`). Minor improvements:

### P2 — `og:image` dimensions and completeness
- `social_916x509.jpg` is **916×509**; the recommended OG size is **1200×630**. Undersized images can render poorly or be ignored.
- Add `og:image:width`, `og:image:height`, `og:image:alt`, `og:site_name`, and `og:locale` (`en_ZA`).
- Per-article OG images (use the article thumbnail) instead of one site-wide image would improve social CTR.

### P3 — Twitter tags use `property=` not `name=`
`head.html:29-33` use `<meta property="twitter:...">`. Twitter's spec expects `name="twitter:card"` etc. Most parsers tolerate it, but switching to `name=` is more correct.

---

## 7. Technical / crawl

### 🟢 Working well
- `robots.txt` present, allows all, references sitemap (`robots.txt:1-3`).
- `sitemap.xml` generated by `jekyll-sitemap` and lists all real pages.
- `<link rel="canonical">` with `index.html` stripped (`head.html:37`).
- `404.html` correctly set `noindex, nofollow` + `sitemap: false`.
- `lang="en-ZA"` on `<html>` (`_layouts/default.html:2`).
- Google Search Console verification file present.
- Clean, keyword-friendly permalinks (`/about/`, `/calculators/`, `/blog/:name/`).

### P2 — Confirm HTTPS + non-canonical host redirects
Ensure `http://` → `https://` and `www.` ↔ apex all 301-redirect to the canonical `https://ducescapital.co.za` (matches `_config.yml url`). Static-host/CDN config, not in-repo — verify on the live host.

### P3 — Exclude/guard non-content files from indexing
PHP endpoints (`send-mail.php`, `secret-contact-send.php`), `PHPMailer/`, and stray log files (`mail-debug.log`, `jekyll-serve*.log`) live in the repo root. Confirm they aren't published/crawlable, and that log files are git-ignored. `archive/` and `_drafts/` are correctly `exclude`d in `_config.yml:35-44`.

### P3 — Favicon / touch icons
Only `favicon.png` is referenced (`head.html:70`). Add `apple-touch-icon`, a `site.webmanifest`, and `theme-color` for better mobile/PWA presentation (minor SEO/UX signal).

---

## 8. Accessibility (SEO-adjacent)

Generally strong: `aria-label`s on nav/buttons, semantic `<nav>`/`<main>`/`<article>`/`<header>`, decorative dividers marked `aria-hidden`. Continue ensuring:
- All interactive controls are keyboard reachable (nav toggle uses `aria-expanded`/`aria-controls` ✅).
- Colour contrast on transparent-navbar pages meets WCAG AA.
- `alt` text stays descriptive (audited images have meaningful alt, e.g. hero, calculators, contact).

---

## Prioritised action list

**Do first (P1)**
1. Install GA4/GTM in `head.html`; link to Search Console; confirm sitemap submitted.
2. Add `BlogPosting` schema (article layout) + `FAQPage` schema (articles/homepage).
3. Rewrite the homepage H1 to lead with primary keyword; add hero subtitle copy.
4. Prioritise the LCP hero image (`fetchpriority="high"` / preload; ensure not lazy-loaded).

**Next (P2)**
5. Add `date`/`last_modified` to article front matter (enables schema + sitemap freshness).
6. Add `width`/`height` to all images; serve WebP/AVIF + `srcset`.
7. Strengthen `FinancialService` schema (`sameAs`, geo, hours, priceRange) and add `BreadcrumbList`.
8. Improve internal linking (article ↔ article ↔ calculator ↔ Apply).
9. OG image → 1200×630 + `og:site_name`/`og:locale`/`og:image:alt`; per-article OG images.
10. Verify HTTPS + host canonical redirects on the live server.

**Polish (P3)**
11. Expand the content cluster; pair each calculator with a guide.
12. `AggregateRating`/`Review` schema (only if genuinely substantiated).
13. Trim/​self-host fonts; add touch icons + web manifest + `theme-color`.
14. Ensure PHP/log files are non-indexable and git-ignored.

---

*Audit based on source templates and the generated `_site/` build in this repo. Items marked "verify on live host" depend on server/CDN config outside the repository.*
