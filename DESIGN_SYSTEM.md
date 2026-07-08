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

- Standard sections use `80px` top and bottom from tablet up.
- Mobile sections use smaller values to preserve comfortable phone layouts.
- Use `.site-section` on standard outer section wrappers.
- Add `.site-section--dense` only when a section should keep the compact mobile
  rhythm.
- Use `.site-section--flush` only for sections that intentionally have no
  vertical rhythm.
- Do not apply global spacing to raw `section` elements. Every standard section
  must opt in with a spacing class.
- Use the same `80px` desktop/tablet rhythm for standard page sections.
- Hero, navigation, footer, and full-screen compositions may use purpose-built
  spacing rather than the section rhythm.

### Responsive tokens

| Context | Desktop | Tablet | Mobile |
| --- | ---: | ---: | ---: |
| Spacious | `80px` | `80px` | `64px` |
| Dense | `80px` | `80px` | `48px` |

The Sass tokens live in `_assets/base/_variables.scss`:

```scss
$section-padding-y-desktop
$section-padding-y-desktop-dense
$section-padding-y-tablet
$section-padding-y-tablet-dense
$section-padding-y-mobile
$section-padding-y-mobile-dense
```

The central mixin lives in `_assets/base/_mixins.scss`:

```scss
@include section-spacing(spacious);
@include section-spacing(dense);
```

The public utility classes live in `_assets/base/_page.scss`:

```scss
.site-section
.site-section--dense
.site-section--flush
```

Keep top and bottom padding equal by default. An asymmetric value should reflect
a specific visual relationship with an adjacent section, not compensate for
internal heading or grid margins.
