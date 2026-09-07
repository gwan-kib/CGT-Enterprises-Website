# CGT Enterprises Website

<p align="center">
  <img src="src/assets/CGT%20Enterprises%20REV.png" alt="CGT Enterprises logo with a red pickup truck" width="280" />
</p>

A custom small-business website built for CGT Enterprises in Yellowknife, Northwest Territories. The site brings service information, customer feedback, and enquiries into one branded experience, with layouts tailored to desktop and mobile visitors.

I built the React and TypeScript frontend, its shared visual system, interactive components, and integration with a Google Apps Script endpoint for contact submissions and customer reviews. This repository showcases that implementation: a primarily one-page website with a separate privacy-policy page and a static production build.

## The experience

- **Service discovery:** A branded hero, business introduction, service and pricing cards, expandable FAQs, and direct contact links give visitors a path from browsing to making an enquiry.
- **Responsive navigation:** Desktop navigation highlights the current section, while mobile visitors use a collapsible menu. Anchor links scroll to content with an offset for the header.
- **Contact and review forms:** Controlled inputs, custom service selectors, an interactive star rating, field-level validation, and submission feedback guide visitors through each form.
- **Published customer feedback:** A draggable review carousel loads public reviews from the shared endpoint. Cards show ratings, service details, and dates; long reviews scroll within the card.
- **Consistent branding:** CGT imagery, Manrope typography, rounded Material Symbols, and shared red and neutral colors connect the navigation, cards, forms, and footer.

## Engineering decisions

### Keeping the interface maintainable

I organized React components around visible page sections, with shared components for repeated elements such as buttons, headings, cards, and form controls. Business, service, and navigation data live separately from rendering logic.

Fixed styling sits in semantic, section-specific CSS classes composed with Tailwind. Shared color and spacing values keep the design consistent while allowing each section to own its layout. This keeps component files focused on content, state, and interaction.

### Handling real form interactions

The forms handle more than the successful submission path. They validate input before sending, focus the first invalid field, prevent concurrent submissions, and respond to server validation, duplicate submissions, and request failures. Honeypot fields and persistent browser tokens are included in submission payloads to support server-side abuse handling.

The custom selector supports arrow-key navigation, Home and End, selection, Escape, outside clicks, and focus restoration. Form labels and error descriptions are connected programmatically, and submission status is reflected in the interface.

### Treating external data as untrusted

The public review loader checks the response structure and validates individual records before rendering them. It rejects invalid ratings and missing required content, preserves the feed's ordering, and provides loading, empty, and unavailable states. Date formatting also checks calendar validity.

Public review reads and form submissions share an environment-configured Apps Script endpoint. The frontend does not access Google Sheets directly, and submitting a review does not automatically add it to the public carousel. The integration code lives here; the external Apps Script service is configured separately.

### Matching technology to the project

React state and browser APIs handle navigation, forms, and carousel interaction. Vite builds both the main site and privacy-policy page as static entrypoints. The result fits a small-business website without requiring a frontend application server.

### Search and link previews

The homepage HTML contains a Yellowknife-specific title and service description, the `https://cgtenterprises.ca/` canonical URL, Open Graph metadata, and static LocalBusiness JSON-LD. The structured data matches the site's public phone, email, Facebook link, hours, and Yellowknife service area; it includes no street address or review ratings. Keep these static details in `index.html` aligned with `src/data/business.ts` when business information changes.

Vite copies `public/robots.txt`, `public/sitemap.xml`, and the branded social-preview image directly into the production root. The sitemap lists the homepage and `/privacy-policy.html`, which has its own canonical URL. Browser favicons use the original CGT PNG artwork. The hero uses a resized logo with explicit dimensions and eager loading; the About photograph remains lazy-loaded. Original branding files are retained. Page content continues to render through React, so crawlers need JavaScript to read the page sections.

## Stack

| Technology | What I used it for |
| --- | --- |
| React 19 and TypeScript | Component composition, typed content, controlled forms, and interaction state |
| Tailwind CSS 3 | Shared styling primitives composed in semantic CSS rules |
| Vite | Local development and static production builds |
| Google Apps Script integration | Contact and review submission requests, plus the public review feed |
| Material Symbols Rounded and Manrope | Consistent interface symbols and typography |
| ESLint and TypeScript strict mode | Static checks for the application source |

## Explore the implementation

- [Page composition](src/App.tsx) shows how the main sections fit together.
- [Navigation](src/components/layout/Header.tsx) contains section tracking and desktop/mobile menu behavior.
- [Custom selector](src/components/ui/CustomSelect.tsx) demonstrates keyboard interaction and focus management.
- [Review form](src/components/sections/ReviewFormSection.tsx) brings validation, rating state, and submission feedback together.
- [Public review loader](src/utils/reviews.ts) handles runtime validation and date formatting.
- [Design tokens](src/styles/tokens.css) and [shared styles](src/styles/shared.css) establish the reusable visual foundation.

## Quality and scope

The project includes lint, strict type-check, and production-build scripts: `npm run lint`, `npm run typecheck`, and `npm run build`. There is no automated test suite; visual and interaction checks are handled manually.

The work demonstrates translating a business website into reusable UI, developing a coherent visual system, managing asynchronous form state, validating external data, and keeping the implementation understandable at a small project's scale.
