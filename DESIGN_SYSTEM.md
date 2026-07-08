# Duces Capital Design System

## Architecture Notes

### Navigation

The primary navbar is data-driven. Edit `_data/navigation.yml` to change the
visible menu:

- `cta` controls the persistent "Apply Now" button in the navbar.
- `nav` controls the hamburger menu links and their order.
- `_includes/navbar.html` should only render the data; avoid hard-coding menu
  links in the include.

Use full site paths with trailing slashes for page URLs, for example
`/about/`, `/calculators/`, and `/blog/`.

### Blog index

The blog landing page is `blog.html` with `permalink: /blog/`. Keep it as an
HTML page because it contains raw HTML and Liquid includes. Converting it back
to Markdown can cause Kramdown to wrap include output, which may affect the
navbar/back-to-top markup and make CSS appear to load incorrectly.

### Assets

Page-level Sass is imported through `_assets/site.scss` and compiled into
`assets/bundle.css` by webpack. Run `npm run build` before deployment so the
compiled CSS/JS and generated Jekyll output are in sync.

## Section spacing

Vertical section padding creates the site's page rhythm. Apply it to the outer
section wrapper, not to cards or other components inside the section.

### Standard

- Spacious sections: `120px` top and bottom on desktop.
- Dense sections: `80px` top and bottom on desktop.
- Use the dense spacing for text-heavy grids, forms, tables, FAQs, and compact
  groups of cards.
- Use spacious spacing for editorial, promotional, and image-led sections that
  benefit from more breathing room.
- Hero, navigation, footer, and full-screen compositions may use purpose-built
  spacing rather than the section rhythm.

### Responsive tokens

| Context | Desktop | Tablet | Mobile |
| --- | ---: | ---: | ---: |
| Spacious | `120px` | `96px` | `64px` |
| Dense | `80px` | `72px` | `48px` |

The Sass tokens live in `_assets/base/_variables.scss`:

```scss
$section-padding-y-desktop
$section-padding-y-desktop-dense
$section-padding-y-tablet
$section-padding-y-tablet-dense
$section-padding-y-mobile
$section-padding-y-mobile-dense
```

Example:

```scss
.feature-section {
  padding: $section-padding-y-desktop 24px;
}

@media (max-width: 1024px) {
  .feature-section {
    padding-block: $section-padding-y-tablet;
  }
}

@media (max-width: 768px) {
  .feature-section {
    padding-block: $section-padding-y-mobile;
  }
}
```

Keep top and bottom padding equal by default. An asymmetric value should reflect
a specific visual relationship with an adjacent section, not compensate for
internal heading or grid margins.
