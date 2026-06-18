---
layout: page
title: Art Deco Design System Reference
description: "Complete reference for the Art Deco design system components, typography, and utilities."
---

<div class="container mx-auto p-6">

  <!-- TYPOGRAPHY EXAMPLES -->
  <section class="section-container">
    <div class="section-header-centered">
      <h1 class="h1">Typography System</h1>
      <p class="section-subheading">Fluid, responsive heading scales built for dramatic impact</p>
    </div>

    <div class="mt-5">
      <h2 class="h2">Heading Levels</h2>
      <p class="lead">Each heading scale automatically adapts to screen size using CSS clamp().</p>
      
      <div class="mt-4">
        <h1 class="h1">H1 — Page Dominating Title</h1>
        <p class="text-muted">font-size: clamp(2rem, 7vw, 4rem) | uppercase | letter-spacing: 0.08em</p>
      </div>

      <div class="mt-4">
        <h2 class="h2">H2 — Major Section Title</h2>
        <p class="text-muted">font-size: clamp(1.75rem, 5vw, 3rem)</p>
      </div>

      <div class="mt-4">
        <h3 class="h3">H3 — Subsection Title</h3>
        <p class="text-muted">font-size: clamp(1.5rem, 3vw, 2.25rem) | color: gold</p>
      </div>

      <div class="mt-4">
        <h4 class="h4">H4 — Card & Box Title</h4>
        <p class="text-muted">font-size: clamp(1.25rem, 2vw, 1.75rem)</p>
      </div>

      <div class="mt-4">
        <h5 class="h5">H5 — Label & Accent</h5>
        <p class="text-muted">font-size: clamp(1rem, 1.5vw, 1.35rem)</p>
      </div>

      <div class="mt-4">
        <h6 class="h6">H6 — Small Title & Widget Header</h6>
        <p class="text-muted">font-size: clamp(0.9rem, 1.2vw, 1.1rem)</p>
      </div>
    </div>

    <div class="mt-5">
      <h2 class="h2">Display Typography</h2>
      <p class="lead">Maximum theatrical impact for hero sections and feature blocks.</p>

      <div class="mt-4">
        <p class="display-xl">Display XL — Hero/Banner</p>
        <p class="text-muted">font-size: clamp(3rem, 12vw, 6rem)</p>
      </div>

      <div class="mt-4">
        <p class="display-lg">Display LG — Large Feature</p>
        <p class="text-muted">font-size: clamp(2.25rem, 8vw, 4rem)</p>
      </div>

      <div class="mt-4">
        <p class="display-md">Display MD — Emphasis Text</p>
        <p class="text-muted">font-size: clamp(1.75rem, 5vw, 2.75rem)</p>
      </div>

      <div class="mt-4">
        <p class="display-sm">Display SM — Accent/Highlight</p>
        <p class="text-muted">color: gold | letter-spacing: 0.1em</p>
      </div>
    </div>

    <div class="mt-5">
      <h2 class="h2">Body Typography</h2>
      
      <div class="mt-4">
        <p class="lead">This is a lead paragraph — larger and emphasized for key messages or introductions. Use for hero text beneath headings.</p>
        <p class="text-muted">font-size: clamp(1.1rem, 2vw, 1.35rem) | font-weight: 300</p>
      </div>

      <div class="mt-4">
        <p>This is standard body text. It's comfortable to read with proper line-height and letter-spacing. Use for all content paragraphs and descriptions.</p>
        <p class="text-muted">font-size: 1rem | line-height: 1.75</p>
      </div>

      <div class="mt-4">
        <p><small>This is small text — used for captions, labels, and secondary information.</small></p>
        <p class="text-muted">font-size: 0.85rem | color: pewter</p>
      </div>

      <div class="mt-4">
        <blockquote>
          <p>"Art Deco is maximalist restraint—every element is intentional, ornamental, yet precisely placed."</p>
          <cite>Design System Philosophy</cite>
        </blockquote>
      </div>
    </div>

    <div class="mt-5">
      <h2 class="h2">Text Decorations & Effects</h2>

      <div class="mt-4">
        <p class="text-underline-dramatic">Text with dramatic underline</p>
      </div>

      <div class="mt-4">
        <p class="text-overline">Text with overline accent</p>
      </div>

      <div class="mt-4">
        <p class="text-shadow-gold">Text with gold shadow effect</p>
      </div>

      <div class="mt-4">
        <p>Text with <mark>highlighting and gold accent</mark> for important terms.</p>
      </div>
    </div>
  </section>

  <!-- TEXT COLOR UTILITIES -->
  <section class="section-container">
    <div class="section-header-centered">
      <h2 class="h2">Text Color Utilities</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <p class="text-champagne">text-champagne — Primary readable text</p>
      <p class="text-gold">text-gold — Gold accent text</p>
      <p class="text-pewter">text-pewter — Secondary/muted text</p>
      <p class="text-midnight">text-midnight — Midnight blue</p>
      <p class="text-muted">text-muted — Disabled or hint text</p>
      <p class="text-error">text-error — Error messages</p>
    </div>
  </section>

  <!-- LETTER SPACING -->
  <section class="section-container">
    <div class="section-header-centered">
      <h2 class="h2">Letter Spacing (Tracking)</h2>
      <p class="section-subheading">Control typography hierarchy and emphasis with tracking utilities</p>
    </div>

    <div class="mt-5 space-y-4">
      <p class="tracking-tighter text-uppercase">tracking-tighter (−0.02em) — Condensed</p>
      <p class="tracking-tight text-uppercase">tracking-tight (−0.01em) — Tight</p>
      <p class="tracking-normal text-uppercase">tracking-normal (0em) — Normal</p>
      <p class="tracking-wide text-uppercase">tracking-wide (0.05em) — Wide</p>
      <p class="tracking-wider text-uppercase">tracking-wider (0.1em) — Wider</p>
      <p class="tracking-widest text-uppercase">tracking-widest (0.2em) — Widest</p>
    </div>
  </section>

  <!-- CARDS EXAMPLE -->
  <section class="section-container">
    <div class="section-header-centered">
      <h2 class="h2">Card Components</h2>
      <p class="section-subheading">Ready-to-use card variants with Art Deco styling</p>
    </div>

    <div class="card-grid mt-5">
      <div class="card-art-deco">
        <div class="card-header-art-deco">
          <h4 class="card-title-art-deco">Feature Card</h4>
        </div>
        <div class="card-body-art-deco">
          <p>Standard card with gold border, corner brackets, and theatrical hover state.</p>
        </div>
      </div>

      <div class="card-feature">
        <div class="feature-icon">
          <i class="fas fa-star"></i>
        </div>
        <h4 class="feature-title">Feature Icon Card</h4>
        <p class="feature-description">Card with rotated diamond icon container and centered layout.</p>
      </div>

      <div class="card-stat">
        <div class="stat-number">24</div>
        <div class="stat-label">Award Winning Team</div>
      </div>
    </div>
  </section>

  <!-- SECTION HEADERS -->
  <section class="section-container">
    <div class="section-header-centered">
      <h2 class="h2">Section Header Variants</h2>
      <p class="section-subheading">Multiple styles for visual variety across sections</p>
    </div>

    <div class="mt-5 space-y-6">
      <div>
        <div class="section-header-centered">
          <h3 class="h3">Centered Header</h3>
          <p class="section-subheading">With decorative side lines</p>
        </div>
      </div>

      <div>
        <div class="section-header-left">
          <h3 class="h3">Left-Aligned Header</h3>
          <p class="section-subheading">With vertical left bar accent</p>
        </div>
      </div>

      <div>
        <div class="section-header-accent">
          <h3 class="h3">Header with Accent Bar</h3>
          <p class="section-subheading">Bright gold bar on left side</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FORMS EXAMPLE -->
  <section class="section-container">
    <div class="section-header-centered">
      <h2 class="h2">Form Components</h2>
      <p class="section-subheading">Elegant underline inputs with theatrical focus states</p>
    </div>

    <div class="mt-5 max-w-2xl mx-auto">
      <form>
        <div class="form-group-elegant">
          <label class="form-label" for="example-input">Input Label</label>
          <input type="text" class="form-control" id="example-input" placeholder="Type here...">
          <div class="form-text">Helper text appears below the input</div>
        </div>

        <div class="form-group-elegant">
          <label class="form-label" for="example-textarea">Textarea</label>
          <textarea class="form-control" id="example-textarea" placeholder="Enter your message..."></textarea>
        </div>

        <div class="form-check mt-4">
          <input class="form-check-input" type="checkbox" id="example-check">
          <label class="form-check-label" for="example-check">
            Accept terms and conditions
          </label>
        </div>

        <button type="submit" class="btn btn-primary mt-5">Submit Form</button>
      </form>
    </div>
  </section>

  <!-- UTILITY EXAMPLES -->
  <section class="section-container">
    <div class="section-header-centered">
      <h2 class="h2">Utility Classes</h2>
      <p class="section-subheading">Helper classes for spacing, display, and common patterns</p>
    </div>

    <div class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 border border-gold">
        <h4 class="h5 mb-2">Spacing</h4>
        <p class="text-sm">m-1 through m-6, p-1 through p-6</p>
      </div>

      <div class="p-4 border border-gold">
        <h4 class="h5 mb-2">Display</h4>
        <p class="text-sm">d-flex, d-grid, d-none, flex utilities</p>
      </div>

      <div class="p-4 border border-gold">
        <h4 class="h5 mb-2">Sizing</h4>
        <p class="text-sm">w-full, h-full, max-w-*, aspect-*</p>
      </div>

      <div class="p-4 border border-gold">
        <h4 class="h5 mb-2">Background</h4>
        <p class="text-sm">bg-*, bg-gradient-*, bg-transparent</p>
      </div>

      <div class="p-4 border border-gold">
        <h4 class="h5 mb-2">Shadows & Glows</h4>
        <p class="text-sm">shadow-sm, shadow-md, shadow-gold</p>
      </div>

      <div class="p-4 border border-gold">
        <h4 class="h5 mb-2">Animations</h4>
        <p class="text-sm">animate-fadeIn, animate-slideUp, etc.</p>
      </div>
    </div>
  </section>

  <!-- DECORATIVE ELEMENTS -->
  <section class="section-container">
    <div class="section-header-centered">
      <h2 class="h2">Decorative Elements</h2>
      <p class="section-subheading">Non-generic visual elements for Art Deco aesthetic</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
      <div>
        <h4 class="h4 mb-4">Diamond Icons</h4>
        <div class="diamond-icon">
          <i class="fas fa-shield-alt"></i>
        </div>
        <p class="text-center text-sm text-muted mt-3">Rotated 45° container</p>
      </div>

      <div>
        <h4 class="h4 mb-4">Corner Brackets</h4>
        <div class="p-6 bg-charcoal border border-gold card-corner-brackets" style="min-height: 150px; display: flex; align-items: center; justify-content: center;">
          <p class="text-center">L-shaped corner decorations on hover</p>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <h4 class="h4 mb-4">Section Dividers</h4>
      <p>Horizontal divider:</p>
      <div class="divider-line"></div>
      <p class="mt-4">Thick divider:</p>
      <div class="divider-line divider-thick"></div>
    </div>
  </section>

  <!-- CLOSING SECTION -->
  <section class="section-container">
    <div class="section-header-centered">
      <h2 class="h2">Ready to Use</h2>
      <p class="section-subheading">All components are production-ready and fully responsive</p>
    </div>

    <div class="mt-5 text-center">
      <p class="lead">This design system provides a complete, cohesive foundation for building Art Deco interfaces. All components follow consistent design tokens, motion principles, and accessibility standards.</p>
    </div>
  </section>

</div>

<style>
  .space-y-4 > * + * { margin-top: 1rem; }
  .space-y-6 > * + * { margin-top: 1.5rem; }
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: 1fr; }
  @media (min-width: 768px) {
    .md\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
    .md\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  }
  .gap-4 { gap: 1rem; }
  .gap-6 { gap: 1.5rem; }
</style>
