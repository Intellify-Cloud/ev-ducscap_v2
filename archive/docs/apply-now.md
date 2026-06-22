# Coding Requirements: "Speak to a Home Loan Expert" Lead Capture Form

## Overview

Build a single-page lead capture form for a home loan advisory service targeting South African homebuyers. The form collects journey context and contact details, then submits them for a callback from a loan specialist. Apply the existing design theme for all colours, typography, and component styles.

---

## Layout & Structure

The page is a single-column form card (max-width ~660px, centered). It contains:

1. **Page Header** — title, subtext, and a 3-icon feature strip
2. **Section 1: Home Buying Journey** — contextual dropdowns + price input
3. **Section 2: Contact Details** — personal info fields + message textarea
4. **Submit Block** — CTA button + security note
5. **Footer Trust Bar** — 3 value-prop columns
6. **Availability Notice** — single-line text at the bottom

---

## Section Specs

### 1. Page Header

- **Heading:** "Speak to a Home Loan Expert"
- **Subtext:** "Tell us a bit about your home buying journey and our experts will help you secure the best deal from South Africa's leading banks."
- **Feature Strip** (3 icons, right-aligned on desktop, wraps on mobile):
  - Shield icon — "Compare offers from leading banks"
  - People icon — "Expert guidance every step of the way"
  - House icon — "Helping you get home sooner"
  - Each icon sits above its label; use theme icon badge style

---

### 2. Section: Where are you in your home buying journey?

- **Section header:** icon badge (house), bold heading, subtext: "This helps us match you with the right solutions."
- **2-column grid** on desktop, single column on mobile

**Fields:**

| Label | Type | Required | Options |
|---|---|---|---|
| Have you found a property you'd like to buy? | Select dropdown | Yes | Yes / No |
| Have you made an offer on a home? | Select dropdown | Yes | Yes / No |
| Are you purchasing your first home? | Select dropdown | Yes | Yes / No |
| Estimated purchase price of the property you're interested in | Text input with prefix | Yes | Numeric, placeholder: `e.g. 1,500,000` |

- **Price field:** prefixed with "R" in a bordered box, full-width input to its right
- **Helper text** below price field: "This helps us determine the best options for you." — small, muted

---

### 3. Section: Your contact details

- **Section header:** icon badge (person), bold heading "Your contact details", subtext: "We'll be in touch to discuss your options."
- **2-column grid** for name and contact fields, single column on mobile

**Fields:**

| Label | Type | Required | Placeholder |
|---|---|---|---|
| First name | Text | Yes | "First name" |
| Last name | Text | Yes | "Last name" |
| Email address | Email | Yes | "name.surname@gmail.com" |
| Mobile number | Tel | Yes | "(000) 000-0000" |
| Message | Textarea | No | "Tell us about your home loan needs — are you buying, building, or refinancing? What is your approximate property value and deposit?" |

- Message textarea: full-width, ~4 rows tall, vertical resize only

---

### 4. Submit Block

- **Button:** full-width, uppercase label: "SUBMIT & EXPECT A CALLBACK" — use primary button style from theme
- **Security note** below button (centered): lock icon + "Your information is secure and will never be shared." — small, muted

---

### 5. Footer Trust Bar

Light background strip. 3 equal columns:

| Icon | Heading | Body |
|---|---|---|
| Phone/headset | We're here to help | "Our home loan specialists are ready to assist you." |
| Clock | Quick response | "We'll contact you within one business day." |
| Shield | No obligation | "It's free, with no obligation." |

---

### 6. Availability Notice

- Single centered line at the very bottom: "Our experts are available from 8am to 5pm, Monday to Friday excluding public holidays."
- Small, muted text

---

## Validation Rules

- All required fields (*) must be non-empty on submit
- Email must match a valid email pattern
- Mobile number must be numeric; accept SA formats like `0XX XXX XXXX` or `(000) 000-0000`
- Purchase price must be a positive number; strip non-numeric characters before validation
- Show inline error messages below each invalid field on submit attempt
- Required fields marked with a red asterisk (*) in the label

---

## Interaction & Behaviour

- On valid submit: replace form with a confirmation message or show a banner: "Thank you! A specialist will be in touch within one business day."
- On invalid submit: scroll to the first error field and focus it
- Button shows a loading state (spinner or "Submitting…") during async submission
- Dropdowns use a consistent custom chevron; no native OS arrow

---

## Responsive Behaviour

- **Desktop (≥768px):** 2-column grid for dropdowns and contact fields; feature strip icons inline
- **Mobile (<768px):** All fields stack to single column; feature strip icons wrap
- Form card padding: `24px` desktop, `16px` mobile

---

## Accessibility

- All inputs have associated `<label>` elements (not placeholders as labels)
- Error messages linked to inputs via `aria-describedby`
- Button has an accessible name
- Focus styles visible on all interactive elements
- Colour contrast meets WCAG AA for all text

---

## Tech Notes

- Framework: React (functional components + hooks) or plain HTML/CSS/JS
- No external form libraries required; native form handling is acceptable
- On submit, POST the form payload to `/api/leads` or `console.log` it if no backend is wired up