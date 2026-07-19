# CGT Enterprises Website

iThis repository contains a responsive, one-page website wireframe for CGT Enterprises. It establishes the site's section order, visual hierarchy, reusable design system, and potential image placement without publishing unconfirmed business content.

## Website overview

The current page includes:

- A sticky header with direct anchor navigation, a desktop contact action, and a compact horizontally scrollable mobile navigation row.
- Full-viewport Hero, About, Services and Pricing, Customer Reviews, Leave a Review, FAQ, and Contact sections.
- A footer with repeated page navigation and a clear prototype-status note.
- Clearly labelled placeholder copy, pricing, contact details, reviews, and image areas.
- Static review and contact form layouts with read-only fields and disabled buttons.
- Native FAQ disclosure controls with one example expanded on initial load.
- An accessible Services carousel with direct card selection, Previous and Next controls, circular wrapping, active-service status, and a single-card mobile layout.
- Responsive layouts for a 16:9 laptop or desktop display and the approved 1170 x 2532 mobile target.

The interface is intentionally a structural wireframe. It does not submit forms, store reviews, call external services, or display real customer or business information.

## Design and accessibility

- Manrope provides the complete type hierarchy through one centrally loaded webfont and a system fallback stack.
- Semantic colour tokens cover brand, surface, text, border, action, focus, and feedback roles.
- Shared spacing, content-width, radius, shadow, control-size, and motion tokens keep sections consistent.
- Reusable React components provide section containers, headings, buttons, cards, labelled fields, and image placeholders.
- Every major section uses at least the viewport height and stacks into a single-column mobile layout without changing the content order.
- Semantic landmarks, logical heading levels, a skip link, labelled controls, native disclosure elements, minimum touch targets, and visible focus styles support keyboard and assistive-technology use.
- Reduced-motion preferences disable smooth scrolling and shorten transitions.
- The Services carousel uses native buttons, a polite position announcement, focus restoration after direct card selection, and motion-free reduced-motion behavior.

## Technology stack

| Technology | Role |
| --- | --- |
| React | Composes the one-page interface from typed layout, section, and reusable UI components. |
| TypeScript | Provides explicit content and component types with strict compiler checks. |
| Vite | Runs the local development server and produces the static production build. |
| Tailwind CSS | Supplies utility composition inside semantic, section-specific stylesheets. |
| PostCSS and Autoprefixer | Process and improve browser compatibility for the stylesheet bundle. |
| ESLint | Checks TypeScript and React source for correctness and maintainability issues. |

No additional UI, form, carousel, or icon dependencies are used.

## Project structure

```text
.
|-- public/                    # Browser-level static files
|-- src/
|   |-- assets/images/        # Approved CGT brand assets
|   |-- components/
|   |   |-- layout/           # Header, footer, and section container
|   |   |-- sections/         # One component per visible page section
|   |   `-- ui/               # Reusable buttons, cards, fields, headings, and placeholders
|   |-- data/                 # Typed navigation, business, and service placeholder data
|   |-- styles/
|   |   |-- layout/           # Header and footer styles
|   |   |-- sections/         # Styles grouped by visible section
|   |   |-- shared.css        # Global elements and reusable component styles
|   |   `-- tokens.css        # Colour, typography, spacing, and interaction tokens
|   |-- App.tsx               # One-page section composition
|   |-- index.css             # Central Tailwind and stylesheet entrypoint
|   `-- main.tsx              # React application entrypoint
|-- eslint.config.js
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
|-- tsconfig.app.json
|-- tsconfig.node.json
`-- vite.config.ts
```

## Local development

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`, as required by the installed Vite version.
- npm.

### Installation

```bash
git clone https://github.com/gwan-kib/CGT-Enterprises-Website.git
cd CGT-Enterprises-Website
npm install
npm run dev
```

No environment variables are required by the current implementation. Local `.env` files are excluded from version control.

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run lint` | Check the repository with ESLint. |
| `npm run typecheck` | Run TypeScript project checks without emitting application files. |
| `npm run build` | Type-check the project and create a static build in `dist/`. |
| `npm run preview` | Serve the production build locally. |

## Verification

The source is checked with:

```bash
npm run lint
npm run typecheck
npm run build
```

There is no automated test suite in the repository. Responsive presentation and keyboard interaction are verified manually alongside the lint, strict TypeScript, and production-build checks.

## Technical contributions

The implementation demonstrates:

- Translating a visual brief into a responsive, semantic React page architecture.
- Separating typed content, component structure, design tokens, shared patterns, and section-specific styling.
- Building reusable UI only where the wireframe repeats a genuine pattern.
- Implementing a data-driven circular carousel without adding a UI dependency or duplicating hidden services.
- Creating static form compositions that show the intended layout without implying working submission behaviour.
- Designing desktop and high-density mobile layouts with fluid grids, controlled widths, full-height sections, and accessible touch targets.
- Maintaining contrast-tested semantic colours and a fluid Manrope typography scale.
- Keeping the dependency surface small while using native disclosure controls for simple interactions.

## Lessons learned

- A wireframe can establish hierarchy and rhythm without committing to final content or imagery.
- Semantic tokens make brand colours safer to use consistently across light, dark, action, focus, and feedback contexts.
- Native HTML controls can provide accessible baseline behaviour with less code and fewer dependencies.
- Centralized reusable styles keep React components focused on structure, content, and accessibility.
- Placeholder states must be explicit so a prototype never implies that a submission workflow or business claim is complete.
- Documentation remains trustworthy when every statement can be verified against the current checkout.
