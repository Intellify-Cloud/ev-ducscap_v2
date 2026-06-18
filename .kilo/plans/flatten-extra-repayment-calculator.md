# Flatten extra-repayment-calculator into standalone HTML page

## Goal

Replace `extra-repayment-calculator.md` with a standalone `extra-repayment-calculator.html` that:
- Uses Jekyll front matter + `_includes/calc-hero.html` for the hero
- Inlines the calculator widget (no separate include)
- Has its own external `_assets/layout/_extra-repayment-calculator.scss` and `_assets/js/extra-repayment-calculator.js`
- Moves superfluous duplicate/old calculator files to `archive/`

## Step 1: Create standalone `extra-repayment-calculator.html` (replaces `.md`)

- Root-level `.html` file with front matter (`layout: page`, title, description, SEO JSON-LD)
- `{% include calc-hero.html %}` for the hero banner (uses `page.hero_*` vars)
- Inline calculator `<section>` with these fields:
  - **Current bond debt** (R prefix, numeric, required)
  - **Remaining bond term** (select: 5–30 years in 5-year steps)
  - **Interest rate** (number input, % suffix, default 10.5)
  - **Repayment type** (select: "Once-off overpayment" / "Recurring monthly payment")
  - **Overpayment amount** (R prefix, numeric, default 0)
  - **Results**: Total loan amount, Total monthly repayment, Term reduced to (years), Loan amount reduced by (R)
- `<link>` to `/assets/layout/dist/_extra-repayment-calculator.css`
- `<script defer src="/assets/js/extra-repayment-calculator.js">`

## Step 2: Create `_assets/layout/_extra-repayment-calculator.scss`

- Extract styles from the new calculator component
- Follow existing `.mb-calc-*` / `.mb-transfer-*` naming and variable conventions from `_3calculators.scss`
- Import it in `_assets/site.scss`

## Step 3: Create `_assets/js/extra-repayment-calculator.js`

- Calculate monthly repayment using standard amortization formula
- Recalculate remaining term when extra payments are applied
- Calculate total interest saved and loan amount reduction
- Format currency with `R` prefix and `en-ZA` locale
- Currency formatting on input blur (same pattern as other calculators)
- Scope to a root container ID to avoid conflicts

## Step 4: Update `_assets/site.scss`

- ADD `@import "layout/extra-repayment-calculator.scss";`
- REMOVE `@import "layout/calculators.scss";` (the `.calculators-*` styles are being archived)

## Step 5: Move superfluous/duplicate files to `archive/`

| Current path | Archive destination | Reason |
|---|---|---|
| `_includes/calculators.html` | `archive/calculators-include.html` | Zero references; old component |
| `_includes/calculators2.html` | `archive/calculators2-include.html` | Zero references; old component |
| `_assets/layout/_calculators.scss` | `archive/_calculators.scss` | Old `.calculators-*` namespace, not imported/used |
| `_assets/layout/_calculators (2).scss` | `archive/_calculators-2.scss` | Duplicate/old styling, not imported |
| `_assets/layout/dist/_calculators.css` | `archive/_calculators.css` | Compiled output of old SCSS |

## Step 6: Cleanup

- Delete `extra-repayment-calculator.md` (replaced by `.html`)
- Verify no broken references to the moved files
